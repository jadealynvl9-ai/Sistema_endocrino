import { glandData } from '../data/glands.js';
import { updatePanel } from './panel.js';
import { highlightSVG, setSelectedGland } from '../utils/helpers.js';

export function initSearch() {
    const searchInput = document.getElementById('glandSearch');
    const clearBtn = document.getElementById('clearSearch');
    const glandListDiv = document.getElementById('glandList');
    
    function renderList(filter = '') {
        if (filter === '') {
            // mostrar todas normalmente
            const all = Object.entries(glandData);
            glandListDiv.innerHTML = all.map(([id, data]) => `
                <div class="gland-list-item" data-id="${id}">
                    <strong>${data.nombre}</strong>
                    <small>${data.descripcion.substring(0, 60)}...</small>
                </div>
            `).join('');
        } else {
            const filtered = Object.entries(glandData).filter(([id, data]) =>
                data.nombre.toLowerCase().includes(filter.toLowerCase()) ||
                data.hormonas.toLowerCase().includes(filter.toLowerCase())
            );
            if (filtered.length === 0) {
                glandListDiv.innerHTML = '<div class="gland-list-item">No hay resultados</div>';
                return;
            }
            // resaltar coincidencias
            glandListDiv.innerHTML = filtered.map(([id, data]) => {
                let nombreResaltado = data.nombre.replace(new RegExp(`(${filter})`, 'gi'), '<mark>$1</mark>');
                return `
                    <div class="gland-list-item" data-id="${id}">
                        <strong>${nombreResaltado}</strong>
                        <small>${data.descripcion.substring(0, 60)}...</small>
                    </div>
                `;
            }).join('');
        }
        
        // eventos de clic
        document.querySelectorAll('.gland-list-item[data-id]').forEach(el => {
            el.addEventListener('click', () => {
                const glandId = el.getAttribute('data-id');
                updatePanel(glandId, 'desc');
                highlightSVG(glandId);
                setSelectedGland(glandId);
                // marcar activo
                document.querySelectorAll('.gland-list-item').forEach(i => i.classList.remove('active'));
                el.classList.add('active');
                window.currentGlandForTabs = glandId;
                // limpiar búsqueda si se desea opcional
                // searchInput.value = '';
                // renderList('');
            });
        });
    }
    
    renderList('');
    searchInput.addEventListener('input', (e) => renderList(e.target.value));
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        renderList('');
        searchInput.focus();
    });
}