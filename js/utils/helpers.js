export function highlightSVG(glandId) {
    // Mapeo especial para glándulas compuestas
    const mapping = {
        gonadas: ['ovary_left', 'ovary_right'],
        paratiroides: ['paratiroides1', 'paratiroides2'],
        adrenal: ['adrenal_left', 'adrenal_right']
    };
    
    let ids = mapping[glandId] || [glandId];
    
    ids.forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
            const originalStroke = elem.getAttribute('stroke');
            elem.style.filter = 'drop-shadow(0 0 6px gold)';
            elem.setAttribute('stroke', '#ffd966');
            setTimeout(() => {
                elem.style.filter = '';
                elem.setAttribute('stroke', originalStroke || '#333');
            }, 800);
        }
    });
}