import { glandData } from './data/glands.js';
import { updatePanel, bindTabs } from './ui/panel.js';
import { initSearch } from './ui/search.js';
import { highlightSVG } from './utils/helpers.js';

// Función para inicializar eventos del SVG
function initSVG() {
    const svgElements = document.querySelectorAll('.gland-svg');
    svgElements.forEach(el => {
        const glandId = el.getAttribute('data-gland') || el.id;
        if (glandData[glandId] || (glandId === 'paratiroides') || (glandId === 'adrenal') || (glandId === 'gonadas')) {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                let targetId = glandId;
                if (targetId === 'paratiroides1' || targetId === 'paratiroides2') targetId = 'paratiroides';
                if (targetId === 'adrenal_left' || targetId === 'adrenal_right') targetId = 'adrenal';
                if (targetId === 'ovary_left' || targetId === 'ovary_right') targetId = 'gonadas';
                updatePanel(targetId, 'desc');
                highlightSVG(targetId);
                window.currentGlandForTabs = targetId;
                // opcional: actualizar lista activa
                document.querySelectorAll('.gland-list-item').forEach(i => i.classList.remove('active'));
                const listItem = document.querySelector(`.gland-list-item[data-id="${targetId}"]`);
                if(listItem) listItem.classList.add('active');
            });
        }
    });
}

// Modo oscuro
function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', document.body.classList.contains('dark'));
    });
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
    }
}

// Inicio
document.addEventListener('DOMContentLoaded', () => {
    initSVG();
    bindTabs();
    initSearch();
    initDarkMode();
    // Seleccionar primera glándula por defecto (hipófisis)
    updatePanel('hipofisis', 'desc');
    window.currentGlandForTabs = 'hipofisis';
    highlightSVG('hipofisis');
    const defaultItem = document.querySelector('.gland-list-item[data-id="hipofisis"]');
    if(defaultItem) defaultItem.classList.add('active');
});