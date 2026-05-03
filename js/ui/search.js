import { glandData } from '../data/glands.js';
import { updatePanel } from './panel.js';
import { highlightSVG } from '../utils/helpers.js';

export function initSearch() {
    const searchInput = document.getElementById('glandSearch');
    const glandListDiv = document.getElementById('glandList');
    
    function renderList(filter = '') {
        const filtered = Object.entries(glandData).filter(([id, data]) =>
            data.nombre.toLowerCase().includes(filter.toLowerCase())
        );
        if (filtered.length === 0) {
            glandListDiv.innerHTML = '<div class="gland-list-item">No hay resultados</div>';
            return;
        }
        glandListDiv.innerHTML = filtered.map(([id, data]) => `
            <div class="gland-list-item" data-id="${id}">
                <strong>${data.nombre}</strong>
                <small>${data.descripcion.substring(0, 60)}...</small>
            </div>
        `).join('');
        
        // Agregar eventos de clic a cada item
        document.querySelectorAll('.gland-list-item[data-id]').forEach(el => {
            el.addEventListener('click', () => {
                const glandId = el.getAttribute('data-id');
                updatePanel(glandId, 'desc');
                highlightSVG(glandId);
                // marcar activo visualmente
                document.querySelectorAll('.gland-list-item').forEach(i => i.classList.remove('active'));
                el.classList.add('active');
                window.currentGlandForTabs = glandId;
            });
        });
    }
    
    renderList('');
    searchInput.addEventListener('input', (e) => renderList(e.target.value));
}