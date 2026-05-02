const GLAND_DATA = {
    hipotalamo: {
        nombre: "Hipotálamo",
        desc: "Centro de regulación maestro. Conecta el sistema nervioso con el endocrino.",
        hormonas: "TRH, CRH, GnRH, GHRH, Somatostatina, Dopamina"
    },
    hipofisis: {
        nombre: "Hipófisis (Pituitaria)",
        desc: "Glándula principal que controla otras glándulas endocrinas.",
        hormonas: "GH, TSH, ACTH, FSH, LH, Prolactina, MSH, Vasopresina, Oxitocina"
    },
    pineal: {
        nombre: "Glándula Pineal",
        desc: "Regula los ritmos circadianos (sueño-vigilia).",
        hormonas: "Melatonina"
    },
    tiroides: {
        nombre: "Tiroides",
        desc: "Controla metabolismo, crecimiento y desarrollo.",
        hormonas: "T3 (Triyodotironina), T4 (Tiroxina), Calcitonina"
    },
    paratiroides: {
        nombre: "Paratiroides",
        desc: "Mantiene el equilibrio del calcio y fósforo en sangre.",
        hormonas: "Hormona Paratiroidea (PTH)"
    },
    timo: {
        nombre: "Timo",
        desc: "Maduración de linfocitos T (respuesta inmune). Activo en la infancia.",
        hormonas: "Timosina, Timopoyetina, Timulina"
    },
    adrenal: {
        nombre: "Suprarrenales (Adrenales)",
        desc: "Respuesta al estrés, metabolismo, presión arterial.",
        hormonas: "Corteza: Cortisol, Aldosterona. Médula: Adrenalina, Noradrenalina"
    },
    pancreas: {
        nombre: "Páncreas (Endocrino)",
        desc: "Regula los niveles de glucosa en sangre.",
        hormonas: "Insulina, Glucagón, Somatostatina, Polipéptido pancreático"
    },
    gonadas: {
        nombre: "Gónadas (Ovarios / Testículos)",
        desc: "Desarrollo sexual y reproducción.",
        hormonas: "Estrógenos, Progesterona, Testosterona, Inhibina"
    }
};

// Elementos del DOM
const dynamicContent = document.getElementById("dynamicGlandContent");
const glandListContainer = document.getElementById("glandListContainer");

// ========== FUNCIÓN PARA ACTUALIZAR EL PANEL PRINCIPAL ==========
function updateSelectedGland(glandId) {
    if (!GLAND_DATA[glandId]) return;

    const gland = GLAND_DATA[glandId];
    dynamicContent.innerHTML = `
        <h3 style="font-size:1.25rem; margin-bottom: 4px;">🧬 ${gland.nombre}</h3>
        <p style="margin: 8px 0 6px 0;">📖 ${gland.desc}</p>
        <div class="hormone-badge">
            💊 <strong>Hormonas:</strong> ${gland.hormonas}
        </div>
    `;

    // Resaltar en la lista de la derecha
    const allItems = document.querySelectorAll('.gland-item');
    allItems.forEach(item => {
        if (item.getAttribute('data-gland-id') === glandId) {
            item.classList.add('active-gland-list');
        } else {
            item.classList.remove('active-gland-list');
        }
    });
}

// ========== CONSTRUIR LISTA LATERAL (CLICKEABLE) ==========
function buildGlandList() {
    glandListContainer.innerHTML = "";
    for (const [id, data] of Object.entries(GLAND_DATA)) {
        const glandDiv = document.createElement("div");
        glandDiv.className = "gland-item";
        glandDiv.setAttribute("data-gland-id", id);
        glandDiv.innerHTML = `
            <div class="gland-name">🔹 ${data.nombre}</div>
            <div class="gland-desc">${data.desc.substring(0, 70)}${data.desc.length > 70 ? "…" : ""}</div>
        `;
        glandDiv.addEventListener("click", (e) => {
            e.stopPropagation();
            updateSelectedGland(id);
            highlightSVGbyGland(id);
        });
        glandListContainer.appendChild(glandDiv);
    }
}

// ========== RESALTADO TEMPORAL EN SVG (FEEDBACK VISUAL) ==========
function highlightSVGbyGland(glandId) {
    // Mapeo para casos especiales (varios elementos)
    if (glandId === "gonadas") {
        const g1 = document.getElementById("gonada_izq");
        const g2 = document.getElementById("gonada_der");
        if (g1) g1.style.filter = "drop-shadow(0 0 5px #facc15)";
        if (g2) g2.style.filter = "drop-shadow(0 0 5px #facc15)";
        setTimeout(() => {
            if (g1) g1.style.filter = "";
            if (g2) g2.style.filter = "";
        }, 700);
        return;
    }
    if (glandId === "adrenal") {
        const ad1 = document.getElementById("adrenal_izq");
        const ad2 = document.getElementById("adrenal_der");
        if (ad1) ad1.style.filter = "drop-shadow(0 0 5px orange)";
        if (ad2) ad2.style.filter = "drop-shadow(0 0 5px orange)";
        setTimeout(() => {
            if (ad1) ad1.style.filter = "";
            if (ad2) ad2.style.filter = "";
        }, 700);
        return;
    }
    if (glandId === "paratiroides") {
        const p1 = document.getElementById("paratiroides1");
        const p2 = document.getElementById("paratiroides2");
        if (p1) p1.style.filter = "drop-shadow(0 0 4px cyan)";
        if (p2) p2.style.filter = "drop-shadow(0 0 4px cyan)";
        setTimeout(() => {
            if (p1) p1.style.filter = "";
            if (p2) p2.style.filter = "";
        }, 700);
        return;
    }

    // General: buscar elemento por ID
    const element = document.getElementById(glandId);
    if (element) {
        element.style.filter = "drop-shadow(0 0 6px gold)";
        setTimeout(() => {
            element.style.filter = "";
        }, 700);
    }
}

// ========== ASIGNAR EVENTOS A LOS ELEMENTOS SVG ==========
function bindSVGEvents() {
    // Selecciona todos los elementos que tengan data-gland (círculos, elipses, paths)
    const svgInteractive = document.querySelectorAll('[data-gland]');
    svgInteractive.forEach(el => {
        const glandVal = el.getAttribute('data-gland');
        if (GLAND_DATA[glandVal]) {
            el.addEventListener('click', (event) => {
                event.stopPropagation();
                updateSelectedGland(glandVal);
                highlightSVGbyGland(glandVal);
            });
            // Hover efecto simple
            el.addEventListener('mouseenter', () => {
                el.style.stroke = "#ffd966";
                el.style.strokeWidth = "3";
            });
            el.addEventListener('mouseleave', () => {
                el.style.stroke = "";
                el.style.strokeWidth = "";
            });
        }
    });

    // También considerar elementos con ID directo y que estén en GLAND_DATA (por si faltó data-gland)
    const idsToCheck = Object.keys(GLAND_DATA);
    idsToCheck.forEach(id => {
        const elem = document.getElementById(id);
        if (elem && !elem.hasAttribute('data-gland')) {
            elem.addEventListener('click', (e) => {
                e.stopPropagation();
                updateSelectedGland(id);
                highlightSVGbyGland(id);
            });
            elem.addEventListener('mouseenter', () => {
                elem.style.stroke = "#ffd966";
                elem.style.strokeWidth = "3";
            });
            elem.addEventListener('mouseleave', () => {
                elem.style.stroke = "";
                elem.style.strokeWidth = "";
            });
        }
    });
}

// ========== INICIALIZAR TODO CUANDO EL DOM CARGUE ==========
document.addEventListener("DOMContentLoaded", () => {
    buildGlandList();     // genera la lista de la derecha
    bindSVGEvents();      // conecta los clicks en el SVG
    // Seleccionar por defecto la hipófisis para que no esté vacío
    updateSelectedGland("hipofisis");
    highlightSVGbyGland("hipofisis");
});


