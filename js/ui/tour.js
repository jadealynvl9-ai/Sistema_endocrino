import { tourOrder, glandData } from '../data/glands.js';
import { updatePanel } from './panel.js';
import { highlightSVG, setSelectedGland } from '../utils/helpers.js';

let tourActive = false;
let tourIndex = 0;
let tourInterval = null;

export function initTour() {
    const tourBtn = document.getElementById('tourBtn');
    if (!tourBtn) return;
    
    function stopTour() {
        if (tourInterval) {
            clearInterval(tourInterval);
            tourInterval = null;
        }
        tourActive = false;
        tourBtn.textContent = '🎓 Tour';
        tourBtn.style.background = 'rgba(255,255,255,0.2)';
        // restaurar botón
    }
    
    function startTour() {
        if (tourActive) {
            stopTour();
            return;
        }
        tourActive = true;
        tourIndex = 0;
        tourBtn.textContent = '⏹️ Detener';
        tourBtn.style.background = '#ef4444';
        
        // mostrar primera glándula
        if (tourOrder.length) {
            showNextGland();
        }
        
        tourInterval = setInterval(() => {
            tourIndex++;
            if (tourIndex >= tourOrder.length) {
                stopTour();
                alert('Tour finalizado 🎉');
            } else {
                showNextGland();
            }
        }, 4000);
    }
    
    function showNextGland() {
        const glandId = tourOrder[tourIndex];
        if (!glandData[glandId]) return;
        updatePanel(glandId, 'desc');
        highlightSVG(glandId);
        setSelectedGland(glandId);
        // resaltar en lista
        document.querySelectorAll('.gland-list-item').forEach(i => i.classList.remove('active'));
        const listItem = document.querySelector(`.gland-list-item[data-id="${glandId}"]`);
        if(listItem) listItem.classList.add('active');
        window.currentGlandForTabs = glandId;
        // opcional: scroll suave al panel
        document.querySelector('.info-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    tourBtn.addEventListener('click', startTour);
}