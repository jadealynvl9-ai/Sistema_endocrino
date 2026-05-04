import { updatePanel, bindTabs } from './ui/panel.js';
import { initSearch } from './ui/search.js';
import { highlightSVG, setSelectedGland } from './utils/helpers.js';
import { initTooltips } from './utils/tooltips.js';
import { initTour } from './ui/tour.js';
import { glandData } from './data/glands.js';

// Inicializar eventos del SVG (con glow persistente)
function initSVG() {
    const svgElements = document.querySelectorAll('.gland-svg');
    svgElements.forEach(el => {
        const glandAttr = el.getAttribute('data-gland') || el.id;
        let targetId = glandAttr;
        if (['paratiroides1','paratiroides2'].includes(glandAttr)) targetId = 'paratiroides';
        if (['adrenal_left','adrenal_right'].includes(glandAttr)) targetId = 'adrenal';
        if (['ovary_left','ovary_right'].includes(glandAttr)) targetId = 'gonadas';
        
        if (glandData[targetId]) {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                updatePanel(targetId, 'desc');
                highlightSVG(targetId);
                setSelectedGland(targetId);
                window.currentGlandForTabs = targetId;
                // actualizar lista activa
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

// Arranque
document.addEventListener('DOMContentLoaded', () => {
    initSVG();
    bindTabs();
    initSearch();
    initDarkMode();
    initTooltips();
    initTour();
    // Seleccionar hipófisis por defecto
    updatePanel('hipofisis', 'desc');
    setSelectedGland('hipofisis');
    window.currentGlandForTabs = 'hipofisis';
    const defaultItem = document.querySelector('.gland-list-item[data-id="hipofisis"]');
    if(defaultItem) defaultItem.classList.add('active');
});