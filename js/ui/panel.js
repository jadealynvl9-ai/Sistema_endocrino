import { glandData } from '../data/glands.js';
import { drawHormoneChart } from './charts.js';

let currentGlandId = null;

export function updatePanel(glandId, activeTab = 'desc') {
    const gland = glandData[glandId];
    if (!gland) return;
    currentGlandId = glandId;
    window.currentGlandForTabs = glandId;

    const container = document.getElementById('panelContent');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Animación: añadir clase y quitarla después (trigger reflow)
    container.style.animation = 'none';
    container.offsetHeight; // forzar reflow
    container.style.animation = 'fadeSlide 0.3s ease-out';
    
    function renderTab(tabId) {
        if (tabId === 'desc') {
            container.innerHTML = `<p>${gland.descripcion}</p>`;
        } else if (tabId === 'horm') {
            let hormList = gland.hormonas.split(',').map(h => h.trim());
            let hormHtml = `<p><strong>💊 Hormonas clave:</strong></p><ul>${hormList.map(h => `<li>${h}</li>`).join('')}</ul>`;
            // Añadir gráfico
            hormHtml += `<div class="hormone-chart"><canvas id="hormoneCanvas" width="250" height="100" class="chart-canvas"></canvas><p style="font-size:0.7rem; text-align:center;">Niveles relativos de secreción</p></div>`;
            container.innerHTML = hormHtml;
            // Dibujar gráfico después de insertar
            const canvas = document.getElementById('hormoneCanvas');
            if (canvas) drawHormoneChart(canvas, gland.niveles, hormList);
        } else if (tabId === 'curio') {
            container.innerHTML = `<p>✨ ${gland.curiosidad}</p>`;
        }
    }
    
    renderTab(activeTab);
    
    // Actualizar botones activos
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === activeTab) btn.classList.add('active');
    });
}

export function bindTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!window.currentGlandForTabs) {
                document.getElementById('panelContent').innerHTML = '<div class="gland-card-placeholder">Selecciona una glándula primero</div>';
                return;
            }
            updatePanel(window.currentGlandForTabs, btn.dataset.tab);
        });
    });
}