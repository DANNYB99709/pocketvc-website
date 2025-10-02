/* ===================================
   Multi-Select Widget Library
   Custom dropdown widgets for PocketVC forms
   =================================== */

// --- Custom multi-select dropdowns that mirror Flutter widgets ---
(function initVCDropdowns() {
    function createTrigger(labelText) {
        const trigger = document.createElement('button');
        trigger.type = 'button';
        // Match input styles (like Position field)
        trigger.className = 'w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-primary-900 focus:border-transparent text-left';
        trigger.innerHTML = `<span class="text-gray-400">${labelText}</span><svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`;
        return trigger;
    }

    function createPanel() {
        const panel = document.createElement('div');
        panel.className = 'absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3';
        panel.style.maxHeight = '320px';
        panel.style.overflow = 'auto';
        panel.style.display = 'none';
        return panel;
    }

    function wrapSelect(selectEl, placeholderText) {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative';
        selectEl.classList.add('hidden');
        selectEl.parentNode.insertBefore(wrapper, selectEl);
        wrapper.appendChild(selectEl);
        const trigger = createTrigger(placeholderText);
        const panel = createPanel();
        wrapper.appendChild(trigger);
        wrapper.appendChild(panel);
        // mark as initialized to avoid double-wrapping
        selectEl.setAttribute('data-pvc-init', '1');
        return { wrapper, trigger, panel };
    }

    function updateTriggerText(trigger, selections, placeholder) {
        const span = trigger.querySelector('span');
        if (!selections || selections.length === 0) {
            span.textContent = placeholder;
            span.className = 'text-gray-400';
            return;
        }
        span.textContent = selections.length <= 2 ? selections.join(', ') : `${selections.length} selected`;
        span.className = 'text-gray-700';
    }

    function initSimpleMultiSelect(selectName, placeholder, containerSelector = '#vc-fields') {
        const selectEl = document.querySelector(`${containerSelector} select[name="${selectName}"]`);
        if (!selectEl) return;
        if (selectEl.getAttribute('data-pvc-init') === '1') return; // already initialized
        const { trigger, panel } = wrapSelect(selectEl, placeholder);

        // Top controls
        const controls = document.createElement('div');
        controls.className = 'flex items-center justify-between mb-2';
        controls.innerHTML = `
            <button type=\"button\" class=\"text-sm text-blue-900 hover:underline\" data-action=\"select-all\">Select All</button>
            <div class=\"flex items-center gap-2\">
                <button type=\"button\" class=\"text-sm text-blue-900 hover:underline\" data-action=\"clear\">Clear All</button>
                <button type=\"button\" class=\"text-sm text-blue-900 hover:underline\" data-action=\"suggest\">Suggest</button>
            </div>`;
        panel.appendChild(controls);

        // Search
        const search = document.createElement('input');
        search.type = 'text';
        search.placeholder = 'Search…';
        search.className = 'w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg';
        panel.appendChild(search);

        // List
        const list = document.createElement('div');
        panel.appendChild(list);

        // Keep panel open when clicking inside it (checkboxes, labels, controls)
        panel.addEventListener('click', (ev) => ev.stopPropagation());

        function render(filter = '') {
            list.innerHTML = '';
            const options = Array.from(selectEl.options);
            options.forEach((opt, idx) => {
                if (!opt.value) return; // skip placeholder
                if (filter && !opt.text.toLowerCase().includes(filter.toLowerCase())) return;
                const row = document.createElement('label');
                row.className = 'flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer';
                row.innerHTML = `<input type=\"checkbox\" class=\"h-4 w-4\" ${opt.selected ? 'checked' : ''} data-index=\"${idx}\"><span class=\"text-base text-gray-500\">${opt.text}</span>`;
                list.appendChild(row);
            });
            // Update trigger text
            const selected = Array.from(selectEl.options).filter(o => o.selected && o.value).map(o => o.text);
            updateTriggerText(trigger, selected, placeholder);
        }

        panel.addEventListener('change', (e) => {
            const cb = e.target;
            if (cb && cb.matches('input[type="checkbox"][data-index]')) {
                const idx = Number(cb.getAttribute('data-index'));
                selectEl.options[idx].selected = cb.checked;
                const selected = Array.from(selectEl.options).filter(o => o.selected && o.value).map(o => o.text);
                updateTriggerText(trigger, selected, placeholder);
            }
        });

        search.addEventListener('input', () => render(search.value));

        controls.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            const action = btn.getAttribute('data-action');
            if (action === 'clear') {
                Array.from(selectEl.options).forEach(o => o.selected = false);
                render(search.value);
            } else if (action === 'select-all') {
                Array.from(selectEl.options).forEach(o => { if (o.value) o.selected = true; });
                render(search.value);
            } else if (action === 'suggest') {
                showSimpleSuggestDialog('New item', 'e.g., Add a new option', (val) => {
                    const exists = Array.from(selectEl.options).some(o => o.value.toLowerCase() === val.toLowerCase());
                    if (!exists) {
                        selectEl.add(new Option(val, val, true, true));
                        render(search.value);
                    }
                });
            }
        });

        // Toggle panel
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        });

        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target) && e.target !== trigger) {
                panel.style.display = 'none';
            }
        });

        render();
        // Re-render when options change (e.g., after dynamic Supabase load)
        if (!selectEl._pvcObserver) {
            const observer = new MutationObserver(() => {
                render(search.value || '');
            });
            observer.observe(selectEl, { childList: true, subtree: true });
            selectEl._pvcObserver = observer;
        }
    }

    function initHierarchicalTechSelect(selectName, placeholder, containerSelector = '#vc-fields') {
        const selectEl = document.querySelector(`${containerSelector} select[name="${selectName}"]`);
        if (!selectEl) return;
        if (selectEl.getAttribute('data-pvc-init') === '1') return;
        const { trigger, panel } = wrapSelect(selectEl, placeholder);

        // Controls
        const controls = document.createElement('div');
        controls.className = 'flex items-center justify-between mb-2';
        controls.innerHTML = `
            <div class="flex items-center gap-3">
                <button type="button" class="text-sm text-blue-900 hover:underline" data-action="toggle-expand">Expand All</button>
                <button type="button" class="text-sm text-blue-900 hover:underline" data-action="select-all">Select All</button>
            </div>
            <div class="flex items-center gap-2">
                <button type="button" class="text-sm text-blue-900 hover:underline" data-action=\"clear\">Clear All</button>
                <button type=\"button\" class=\"text-sm text-blue-900 hover:underline\" data-action=\"suggest\">Suggest</button>
            </div>`;
        panel.appendChild(controls);

        // Search
        const search = document.createElement('input');
        search.type = 'text';
        search.placeholder = 'Search sectors/subsectors…';
        search.className = 'w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg';
        panel.appendChild(search);

        // List container
        const list = document.createElement('div');
        panel.appendChild(list);

        let expandedAll = false;

        function getData() {
            const groups = Array.from(selectEl.querySelectorAll('optgroup'));
            return groups.map(g => ({
                label: g.label,
                options: Array.from(g.querySelectorAll('option')).map(o => ({ text: o.text, value: o.value, selected: o.selected }))
            }));
        }

        function syncBackToSelect() {
            // Already manipulated option.selected directly when clicking; nothing extra here.
            const selected = Array.from(selectEl.options).filter(o => o.selected && o.value).map(o => o.text);
            updateTriggerText(trigger, selected, placeholder);
        }

        function render(filter = '') {
            list.innerHTML = '';
            const data = getData();
            data.forEach((group, gi) => {
                // Group header
                const groupHeader = document.createElement('div');
                groupHeader.className = 'px-2 py-1 rounded hover:bg-gray-50';
                groupHeader.innerHTML = `
                    <div class="flex items-center justify-between" data-group="${gi}">
                        <div class="flex items-center gap-2">
                            <input type="checkbox" class="h-4 w-4" data-role="group-checkbox" ${group.options.every(o => o.selected) ? 'checked' : ''}>
                            <span class="text-base text-gray-500" data-role="sector-label">${group.label}</span>
                        </div>
                        <svg class="w-4 h-4 text-gray-500 cursor-pointer" data-role="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>`;
                list.appendChild(groupHeader);

                // Children list
                const children = document.createElement('div');
                children.className = 'ml-6 mt-1 mb-2';
                children.style.display = expandedAll ? 'block' : 'none';

                group.options.forEach((opt, oi) => {
                    if (filter && !(`${group.label} ${opt.text}`.toLowerCase().includes(filter.toLowerCase()))) return;
                    const row = document.createElement('label');
                    row.className = 'flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-50 cursor-pointer';
                    row.innerHTML = `<input type="checkbox" class="h-4 w-4" data-gi="${gi}" data-oi="${oi}" ${opt.selected ? 'checked' : ''}><span class="text-base text-gray-500">${opt.text}</span>`;
                    children.appendChild(row);
                });
                list.appendChild(children);
            });

            syncBackToSelect();
        }

        // Keep panel open when clicking inside
        panel.addEventListener('click', (ev) => ev.stopPropagation());

        list.addEventListener('click', (e) => {
            const header = e.target.closest('[data-group]');
            if (header) {
                const gi = Number(header.getAttribute('data-group'));
                const groupContainer = header.parentElement;
                const children = groupContainer.nextSibling;
                if (e.target.matches('input[data-role="group-checkbox"]')) {
                    // Toggle entire group using only the checkbox
                    const checked = e.target.checked;
                    const og = selectEl.querySelectorAll('optgroup')[gi];
                    og.querySelectorAll('option').forEach((o) => { o.selected = checked; });
                    render(search.value);
                } else if (e.target.matches('[data-role="sector-label"]') || e.target.closest('[data-role="chevron"]')) {
                    // Toggle expand/collapse only via label or chevron
                    children.style.display = children.style.display === 'none' ? 'block' : 'none';
                }
                // Clicks on header container do nothing else
            }
        });

        list.addEventListener('change', (e) => {
            const cb = e.target;
            if (cb && cb.matches('input[type="checkbox"][data-gi]')) {
                const gi = Number(cb.getAttribute('data-gi'));
                const oi = Number(cb.getAttribute('data-oi'));
                const og = selectEl.querySelectorAll('optgroup')[gi];
                const option = og.querySelectorAll('option')[oi];
                option.selected = cb.checked;
                // Update group header checkbox based on all children
                render(search.value);
            }
        });

        search.addEventListener('input', () => render(search.value));

        controls.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            const action = btn.getAttribute('data-action');
            if (action === 'toggle-expand') {
                expandedAll = !expandedAll;
                btn.textContent = expandedAll ? 'Collapse All' : 'Expand All';
                render(search.value);
            } else if (action === 'clear') {
                Array.from(selectEl.options).forEach(o => o.selected = false);
                render(search.value);
            } else if (action === 'select-all') {
                Array.from(selectEl.options).forEach(o => { if (o.value) o.selected = true; });
                render(search.value);
            } else if (action === 'suggest') {
                showSuggestDialog();
            }
        });

        function showSuggestDialog() {
            // Build modal elements
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4';
            modal.innerHTML = `
                <div class="absolute inset-0 bg-black/20"></div>
                <div class="relative bg-white rounded-xl shadow-xl w-full max-w-md p-5">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">Suggest</h3>
                        <button type="button" class="text-gray-500 hover:text-gray-700" data-role="close">✕</button>
                    </div>
                    <div class="flex gap-2 mb-4">
                        <button type="button" data-role="tab-sector" class="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 bg-gray-50">Sector</button>
                        <button type="button" data-role="tab-sub" class="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600">Subsector</button>
                    </div>
                    <div data-role="content-sector">
                        <div class="mb-3">
                            <label class="block text-sm font-medium text-gray-700 mb-1">New Sector</label>
                            <input type="text" data-role="new-sector" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-900 focus:border-transparent placeholder-gray-400" placeholder="e.g., Emerging AI Hardware" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">First Subsector</label>
                            <input type="text" data-role="new-sector-sub" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-900 focus:border-transparent placeholder-gray-400" placeholder="e.g., Neuromorphic DSP Chips" />
                        </div>
                        <div class="flex justify-end gap-2">
                            <button type="button" data-role="close" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">Cancel</button>
                            <button type="button" data-role="add-sector" class="px-4 py-2 rounded-lg bg-blue-900 text-white">Add</button>
                        </div>
                    </div>
                    <div data-role="content-sub" class="hidden">
                        <div class="mb-3">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Choose Sector</label>
                            <div data-role="sector-list" class="max-h-48 overflow-auto border border-gray-200 rounded-lg">
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">New Subsector</label>
                            <input type="text" data-role="new-sub" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-900 focus:border-transparent placeholder-gray-400" placeholder="e.g., Photonics co-processors" />
                        </div>
                        <div class="flex justify-end gap-2">
                            <button type="button" data-role="close" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">Cancel</button>
                            <button type="button" data-role="add-sub" class="px-4 py-2 rounded-lg bg-blue-900 text-white">Add</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            const close = () => { document.body.removeChild(modal); };
            modal.querySelectorAll('[data-role="close"]').forEach(btn => btn.addEventListener('click', close));
            modal.firstElementChild.addEventListener('click', close);

            // Tabs
            const tabSector = modal.querySelector('[data-role="tab-sector"]');
            const tabSub = modal.querySelector('[data-role="tab-sub"]');
            const contentSector = modal.querySelector('[data-role="content-sector"]');
            const contentSub = modal.querySelector('[data-role="content-sub"]');
            function activate(mode) {
                const on = 'px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 bg-gray-50';
                const off = 'px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600';
                if (mode === 'sector') {
                    tabSector.className = on; tabSub.className = off; contentSector.classList.remove('hidden'); contentSub.classList.add('hidden');
                } else { tabSub.className = on; tabSector.className = off; contentSub.classList.remove('hidden'); contentSector.classList.add('hidden'); }
            }
            tabSector.addEventListener('click', () => activate('sector'));
            tabSub.addEventListener('click', () => activate('sub'));
            activate('sector');

            // Populate sector list for subsector mode
            const sectorList = modal.querySelector('[data-role="sector-list"]');
            const sectorNames = Array.from(selectEl.querySelectorAll('optgroup')).map(g => g.label).sort((a,b)=>a.localeCompare(b));
            let selectedSector = sectorNames[0] || '';
            const renderSectorList = () => {
                sectorList.innerHTML = '';
                sectorNames.forEach(name => {
                    const item = document.createElement('button');
                    item.type = 'button';
                    item.className = `w-full text-left px-3 py-2 ${selectedSector === name ? 'bg-blue-50 text-blue-900' : 'hover:bg-gray-50'} border-b border-gray-100`;
                    item.textContent = name;
                    item.addEventListener('click', () => { selectedSector = name; renderSectorList(); });
                    sectorList.appendChild(item);
                });
            };
            renderSectorList();

            // Add actions
            modal.querySelector('[data-role="add-sector"]').addEventListener('click', () => {
                const sectorVal = modal.querySelector('[data-role="new-sector"]').value.trim();
                const subVal = modal.querySelector('[data-role="new-sector-sub"]').value.trim();
                if (!sectorVal || !subVal) return;
                let og = document.createElement('optgroup');
                og.label = sectorVal;
                og.appendChild(new Option(subVal, `${sectorVal}: ${subVal}`));
                selectEl.appendChild(og);
                render(search.value);
                close();
            });

            modal.querySelector('[data-role="add-sub"]').addEventListener('click', () => {
                const subVal = modal.querySelector('[data-role="new-sub"]').value.trim();
                if (!subVal || !selectedSector) return;
                let og = Array.from(selectEl.querySelectorAll('optgroup')).find(g => g.label === selectedSector);
                if (!og) { og = document.createElement('optgroup'); og.label = selectedSector; selectEl.appendChild(og); }
                og.appendChild(new Option(subVal, `${selectedSector}: ${subVal}`));
                render(search.value);
                close();
            });
        }

        // Toggle panel
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        });

        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target) && e.target !== trigger) {
                panel.style.display = 'none';
            }
        });

        render();
        // Re-render when optgroups/options change after async loads
        if (!selectEl._pvcObserver) {
            const observer = new MutationObserver(() => {
                render(search.value || '');
            });
            observer.observe(selectEl, { childList: true, subtree: true });
            selectEl._pvcObserver = observer;
        }
    }

    // Initialize all VC dropdowns
    initHierarchicalTechSelect('technologyTypes', 'Technology Type');
    initSimpleMultiSelect('investmentLocations', 'Geographic Location');
    initSimpleMultiSelect('investmentStages', 'Company Stage');
    initSimpleMultiSelect('trlStages', 'TRL Stage');

    // Startup dropdowns will be initialized after Supabase loads their data

    // Optional: dynamically load TRL options from Supabase
    async function loadTRLFromSupabase() {
        try {
            const SUPABASE_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
            const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
            const selectEl = document.querySelector('#vc-fields select[name="trlStages"]');
            if (!selectEl) return;
            if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('YOUR_')) {
                // No creds yet; initialize UI with existing static options
                initSimpleMultiSelect('trlStages', 'TRL Stage');
                return;
            }

            const client = window.pvcSupabase || (window.pvcSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
            const { data, error } = await client
                .from('technology_readiness_levels')
                .select('level_name, sort_rank')
                .order('sort_rank', { ascending: true });
            if (error) throw error;

            // Clear existing and populate
            selectEl.innerHTML = '';
            data.forEach(row => {
                const label = row && (row.level_name || row.name);
                if (label) {
                    const opt = new Option(label, label);
                    selectEl.add(opt);
                }
            });

            // Initialize custom UI after data ready
            initSimpleMultiSelect('trlStages', 'TRL Stage');
        } catch (e) {
            console.warn('Could not load TRL from Supabase yet:', e);
            // Fallback to existing static UI
            initSimpleMultiSelect('trlStages', 'TRL Stage');
        }
    }
    loadTRLFromSupabase();

    // Also load TRL into Startup
    (async function loadStartupTRL() {
        try {
            const SUPABASE_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
            const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
            const selectEl = document.querySelector('#startup-fields select[name="trlStages"]');
            if (!selectEl || !SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('YOUR_')) return;
            const client = window.pvcSupabase || (window.pvcSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
            const { data } = await client.from('technology_readiness_levels').select('level_name, sort_rank').order('sort_rank', { ascending: true });
            if (Array.isArray(data) && data.length) {
                selectEl.innerHTML = '';
                data.forEach(row => {
                    const label = row.level_name || row.name; if (!label) return;
                    selectEl.add(new Option(label, label));
                });
                initSimpleMultiSelect('trlStages', 'TRL Stage', '#startup-fields');
            }
        } catch {}
    })();

    // Load Company Stage from Supabase
    async function loadCompanyStageFromSupabase() {
        try {
            const SUPABASE_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
            const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
            const selectEl = document.querySelector('#vc-fields select[name="investmentStages"]');
            if (!selectEl) return;
            if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('YOUR_')) {
                initSimpleMultiSelect('investmentStages', 'Company Stage');
                return;
            }

            const client = window.pvcSupabase || (window.pvcSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
            // Adjust table/columns after you confirm names
            const { data, error } = await client
                .from('fundraising_stages')
                .select('stage_name, sort_rank')
                .order('sort_rank', { ascending: true });
            if (error) throw error;

            selectEl.innerHTML = '';
            data.forEach(row => {
                const label = row && (row.stage_name || row.name);
                if (label) selectEl.add(new Option(label, label));
            });

            initSimpleMultiSelect('investmentStages', 'Company Stage');
        } catch (e) {
            console.warn('Could not load Company Stage yet:', e);
            initSimpleMultiSelect('investmentStages', 'Company Stage');
        }
    }
    loadCompanyStageFromSupabase();
    // Also populate Startup Company Stage with same data
    (async function loadStartupCompanyStage() {
        try {
            const SUPABASE_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
            const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
            const selectEl = document.querySelector('#startup-fields select[name="investmentStages"]');
            if (!selectEl || !SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('YOUR_')) return;
            const client = window.pvcSupabase || (window.pvcSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
            const { data } = await client.from('fundraising_stages').select('stage_name, sort_rank').order('sort_rank', { ascending: true });
            if (Array.isArray(data) && data.length) {
                selectEl.innerHTML = '';
                data.forEach(row => { const label = row.stage_name || row.name; if (label) selectEl.add(new Option(label, label)); });
                initSimpleMultiSelect('investmentStages', 'Company Stage', '#startup-fields');
            }
        } catch {}
    })();

    // Load Investment Locations from Supabase
    async function loadLocationsFromSupabase() {
        try {
            const SUPABASE_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
            const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
            const selectEl = document.querySelector('#vc-fields select[name="investmentLocations"]');
            if (!selectEl) return;
            if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('YOUR_')) {
                initSimpleMultiSelect('investmentLocations', 'Geographic Location');
                return;
            }

            const client = window.pvcSupabase || (window.pvcSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
            // locations table: select name, order alphabetically
            const { data, error } = await client
                .from('locations')
                .select('name')
                .order('name', { ascending: true });
            if (error) throw error;

            selectEl.innerHTML = '';
            data.forEach(row => {
                const label = row && (row.name);
                if (label) selectEl.add(new Option(label, label));
            });

            initSimpleMultiSelect('investmentLocations', 'Geographic Location');
        } catch (e) {
            console.warn('Could not load Locations yet:', e);
            initSimpleMultiSelect('investmentLocations', 'Geographic Location');
        }
    }
    loadLocationsFromSupabase();
    // Also populate Startup Locations with same data
    (async function loadStartupLocations() {
        try {
            const SUPABASE_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
            const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
            const selectEl = document.querySelector('#startup-fields select[name="investmentLocations"]');
            if (!selectEl || !SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('YOUR_')) return;
            const client = window.pvcSupabase || (window.pvcSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
            const { data } = await client.from('locations').select('name').order('name', { ascending: true });
            if (Array.isArray(data) && data.length) {
                selectEl.innerHTML = '';
                data.forEach(row => { const label = row.name; if (label) selectEl.add(new Option(label, label)); });
                initSimpleMultiSelect('investmentLocations', 'Geographic Location', '#startup-fields');
            }
        } catch {}
    })();

    // Load Technology Type & Subsectors (hierarchical) from Supabase — single-table schema
    async function loadTechSubsectorsFromSupabase() {
        try {
            const SUPABASE_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
            const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
            const selectEl = document.querySelector('#vc-fields select[name="technologyTypes"]');
            if (!selectEl) return;
            if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('YOUR_')) {
                initHierarchicalTechSelect('technologyTypes', 'Technology Type');
                return;
            }

            const client = window.pvcSupabase || (window.pvcSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));

            console.log('[TechDropdown] Fetching deeptech_subsectors…');
            const { data, error } = await client
                .from('deeptech_subsectors')
                .select('sector, subsector')
                .order('sector', { ascending: true })
                .order('subsector', { ascending: true });
            if (error) {
                console.warn('[TechDropdown] Supabase error:', error);
                throw error;
            }

            if (!Array.isArray(data) || data.length === 0) {
                console.warn('[TechDropdown] deeptech_subsectors returned 0 rows');
                initHierarchicalTechSelect('technologyTypes', 'Technology Type');
                return;
            }
            console.log('[TechDropdown] rows:', data.length, 'example:', data[0]);

            // Build optgroups
            selectEl.innerHTML = '';
            const groups = new Map();
            data.forEach(r => {
                if (!r.sector || !r.subsector) return;
                if (!groups.has(r.sector)) groups.set(r.sector, []);
                groups.get(r.sector).push(r.subsector);
            });

            Array.from(groups.entries()).forEach(([sectorName, subs]) => {
                const og = document.createElement('optgroup');
                og.label = sectorName;
                subs.sort((a, b) => a.localeCompare(b)).forEach(name => og.appendChild(new Option(name, `${sectorName}: ${name}`)));
                selectEl.appendChild(og);
            });

            console.log('[TechDropdown] Built optgroups:', selectEl.querySelectorAll('optgroup').length);
            initHierarchicalTechSelect('technologyTypes', 'Technology Type');
        } catch (e) {
            console.warn('[TechDropdown] Could not load Technology Types/Subsectors yet:', e);
            initHierarchicalTechSelect('technologyTypes', 'Technology Type');
        }
    }
    loadTechSubsectorsFromSupabase();
    // Also build Startup Technology Types with the same data
    (async function loadStartupTech() {
        try {
            const SUPABASE_URL = window.SUPABASE_URL || 'YOUR_SUPABASE_URL';
            const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
            const selectEl = document.querySelector('#startup-fields select[name="technologyTypes"]');
            if (!selectEl || !SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_URL.includes('YOUR_')) return;
            const client = window.pvcSupabase || (window.pvcSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY));
            const { data, error } = await client.from('deeptech_subsectors').select('sector, subsector').order('sector', { ascending: true }).order('subsector', { ascending: true });
            if (error || !Array.isArray(data) || !data.length) return;
            selectEl.innerHTML = '';
            const groups = new Map();
            data.forEach(r => { if (!groups.has(r.sector)) groups.set(r.sector, []); groups.get(r.sector).push(r.subsector); });
            Array.from(groups.entries()).forEach(([sectorName, subs]) => {
                const og = document.createElement('optgroup'); og.label = sectorName;
                subs.sort((a,b)=>a.localeCompare(b)).forEach(n => og.appendChild(new Option(n, `${sectorName}: ${n}`)));
                selectEl.appendChild(og);
            });
            initHierarchicalTechSelect('technologyTypes', 'Technology Type', '#startup-fields');
        } catch {}
    })();
})();

function showSimpleSuggestDialog(labelText, placeholderText, onAdd) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="absolute inset-0 bg-black/20"></div>
        <div class="relative bg-white rounded-xl shadow-xl w-full max-w-md p-5">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Suggest</h3>
                <button type="button" class="text-gray-500 hover:text-gray-700" data-role="close">✕</button>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">${labelText}</label>
                <input type="text" data-role="value" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-900 focus:border-transparent placeholder-gray-400" placeholder="${placeholderText}" />
            </div>
            <div class="flex justify-end gap-2">
                <button type="button" data-role="close" class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">Cancel</button>
                <button type="button" data-role="add" class="px-4 py-2 rounded-lg bg-blue-900 text-white">Add</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const close = () => { document.body.removeChild(modal); };
    modal.querySelectorAll('[data-role="close"]').forEach(b => b.addEventListener('click', close));
    modal.firstElementChild.addEventListener('click', close);
    modal.querySelector('[data-role="add"]').addEventListener('click', () => {
        const val = modal.querySelector('[data-role="value"]').value.trim();
        if (!val) return;
        onAdd(val);
        close();
    });
}

// Initialize Startup simple multi-selects using the same UI
(function initStartupDropdowns() {
    // Location (uses icon input but we can still wrap the select)
    const startupLocation = document.querySelector('#startup-fields select[name="location"]');
    if (startupLocation && !startupLocation.getAttribute('data-pvc-init')) {
        // For startup location we use the same placeholder text
        initSimpleMultiSelect.bind(null)('location', 'Location');
    }
    const startupIndustry = document.querySelector('#startup-fields select[name="industry"]');
    if (startupIndustry && !startupIndustry.getAttribute('data-pvc-init')) {
        initSimpleMultiSelect.bind(null)('industry', 'Industry');
    }
    const startupStage = document.querySelector('#startup-fields select[name="stage"]');
    if (startupStage && !startupStage.getAttribute('data-pvc-init')) {
        initSimpleMultiSelect.bind(null)('stage', 'Company Stage');
    }
    const startupFunding = document.querySelector('#startup-fields select[name="fundingAmount"]');
    if (startupFunding && !startupFunding.getAttribute('data-pvc-init')) {
        initSimpleMultiSelect.bind(null)('fundingAmount', 'Funding Stage');
    }
})();

