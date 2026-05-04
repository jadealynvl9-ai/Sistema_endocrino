// Eliminar resplandor anterior y poner el nuevo
let currentSelectedGlandId = null;

export function setSelectedGland(glandId) {
    // Quitar clase selected-gland de todos los elementos SVG con esa clase
    document.querySelectorAll('.gland-svg').forEach(el => {
        el.classList.remove('selected-gland');
    });
    // Mapeo para glándulas compuestas
    const mapping = {
        gonadas: ['ovary_left', 'ovary_right'],
        paratiroides: ['paratiroides1', 'paratiroides2'],
        adrenal: ['adrenal_left', 'adrenal_right']
    };
    let ids = mapping[glandId] || [glandId];
    ids.forEach(id => {
        const elem = document.getElementById(id);
        if (elem) elem.classList.add('selected-gland');
    });
    currentSelectedGlandId = glandId;
}

export function highlightSVG(glandId) {
    // Primero aplicamos glow persistente
    setSelectedGland(glandId);
    // Además, un efecto flash temporal (opcional)
    const mapping = {
        gonadas: ['ovary_left', 'ovary_right'],
        paratiroides: ['paratiroides1', 'paratiroides2'],
        adrenal: ['adrenal_left', 'adrenal_right']
    };
    let ids = mapping[glandId] || [glandId];
    ids.forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.style.filter = 'drop-shadow(0 0 6px gold)';
            setTimeout(() => {
                if (elem.classList.contains('selected-gland')) {
                    // no quitar el glow si sigue seleccionada
                } else {
                    elem.style.filter = '';
                }
            }, 400);
        }
    });
}