import { glandData } from '../data/glands.js';

let currentGlandId = null;

export function updatePanel(glandId, activeTab = 'desc') {
    const gland = glandData[glandId];
    if (!gland) return;
    currentGlandId = glandId;

    const container = document.getElementById('panelContent');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    function renderTab(tabId) {
        let content = '';
        if (tabId === 'desc') content = `<p>${gland.descripcion}</p>`;
        else if (tabId === 'horm') content = `<p><strong>💊 Hormonas clave:</strong> ${gland.hormonas}</p>`;
        else if (tabId === 'curio') content = `<p>✨ ${gland.curiosidad}</p>`;
        container.innerHTML = content;
    }
    
    renderTab(activeTab);
    
    // Actualizar botones activos
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === activeTab) btn.classList.add('active');
    });
    
    // Guardar para cuando se cambie de pestaña
    window.currentGlandForTabs = glandId;
}

export function bindTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!window.currentGlandForTabs) {
                // Si no hay glándula seleccionada, mostrar mensaje
                document.getElementById('panelContent').innerHTML = '<div class="gland-card-placeholder">Selecciona una glándula primero</div>';
                return;
            }
            updatePanel(window.currentGlandForTabs, btn.dataset.tab);
        });
    });
}