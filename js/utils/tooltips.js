import { glandData } from '../data/glands.js';

let tooltipDiv = null;

export function initTooltips() {
    // Crear elemento tooltip
    tooltipDiv = document.createElement('div');
    tooltipDiv.className = 'custom-tooltip';
    tooltipDiv.style.opacity = '0';
    document.body.appendChild(tooltipDiv);
    
    const svgElements = document.querySelectorAll('.gland-svg');
    svgElements.forEach(el => {
        const glandId = el.getAttribute('data-gland') || el.id;
        let realId = glandId;
        if (['paratiroides1','paratiroides2'].includes(glandId)) realId = 'paratiroides';
        if (['adrenal_left','adrenal_right'].includes(glandId)) realId = 'adrenal';
        if (['ovary_left','ovary_right'].includes(glandId)) realId = 'gonadas';
        
        if (glandData[realId]) {
            el.addEventListener('mouseenter', (e) => {
                tooltipDiv.textContent = glandData[realId].nombre;
                tooltipDiv.style.opacity = '1';
                updateTooltipPosition(e);
            });
            el.addEventListener('mousemove', updateTooltipPosition);
            el.addEventListener('mouseleave', () => {
                tooltipDiv.style.opacity = '0';
            });
        }
    });
}

function updateTooltipPosition(e) {
    if (!tooltipDiv) return;
    tooltipDiv.style.left = (e.clientX + 15) + 'px';
    tooltipDiv.style.top = (e.clientY - 30) + 'px';
}