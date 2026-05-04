export const glandData = {
    hipotalamo: {
        nombre: "Hipotálamo",
        descripcion: "Centro regulador maestro, conecta el sistema nervioso con el endocrino. Controla hambre, sed, temperatura y emociones.",
        hormonas: "TRH, CRH, GnRH, GHRH, somatostatina, dopamina",
        niveles: [8, 7, 6, 9, 4, 5], // valores relativos para gráfico
        curiosidad: "Aunque es parte del cerebro, funciona como una glándula porque produce hormonas que viajan a la hipófisis."
    },
    hipofisis: {
        nombre: "Hipófisis (Pituitaria)",
        descripcion: "Glándula principal que ordena a otras glándulas. Tiene dos lóbulos: anterior y posterior.",
        hormonas: "GH, TSH, ACTH, FSH, LH, prolactina, MSH, vasopresina, oxitocina",
        niveles: [9, 8, 7, 6, 5, 9, 4, 8, 7],
        curiosidad: "Se la llama 'la glándula maestra' porque regula casi todas las demás glándulas endocrinas."
    },
    pineal: {
        nombre: "Glándula Pineal",
        descripcion: "Regula los ritmos circadianos (sueño-vigilia) a través de la melatonina.",
        hormonas: "Melatonina",
        niveles: [6],
        curiosidad: "Tiene forma de piña (de ahí su nombre) y en algunas culturas se la asocia con el 'tercer ojo'."
    },
    tiroides: {
        nombre: "Tiroides",
        descripcion: "Controla el metabolismo, crecimiento y desarrollo. Requiere yodo para funcionar.",
        hormonas: "T3 (triyodotironina), T4 (tiroxina), calcitonina",
        niveles: [8, 8, 5],
        curiosidad: "Los trastornos tiroideos pueden causar desde bocio hasta cambios extremos de peso o estado de ánimo."
    },
    paratiroides: {
        nombre: "Paratiroides",
        descripcion: "Mantiene el equilibrio del calcio y fósforo en sangre, esencial para huesos y nervios.",
        hormonas: "Hormona paratiroidea (PTH)",
        niveles: [7],
        curiosidad: "Son cuatro glándulas diminutas del tamaño de un grano de arroz, ubicadas detrás de la tiroides."
    },
    timo: {
        nombre: "Timo",
        descripcion: "Maduración de linfocitos T (defensa inmune). Es muy activo en niños y se atrofia en adultos.",
        hormonas: "Timosina, timopoyetina",
        niveles: [5, 4],
        curiosidad: "El timo alcanza su tamaño máximo en la pubertad y luego se reemplaza por grasa."
    },
    adrenal: {
        nombre: "Suprarrenales (Adrenales)",
        descripcion: "Producen hormonas del estrés y regulan el metabolismo, la presión arterial y la respuesta de lucha/huida.",
        hormonas: "Corteza: cortisol, aldosterona. Médula: adrenalina, noradrenalina",
        niveles: [9, 8, 9, 8],
        curiosidad: "La médula suprarrenal es realmente una parte del sistema nervioso simpático."
    },
    pancreas: {
        nombre: "Páncreas (endocrino)",
        descripcion: "Regula la glucosa en sangre mediante insulina y glucagón.",
        hormonas: "Insulina, glucagón, somatostatina, polipéptido pancreático",
        niveles: [9, 8, 5, 4],
        curiosidad: "La diabetes ocurre cuando el páncreas no produce suficiente insulina o el cuerpo no la usa bien."
    },
    gonadas: {
        nombre: "Gónadas (Ovarios / Testículos)",
        descripcion: "Producen gametos y hormonas sexuales que desarrollan caracteres secundarios y controlan la reproducción.",
        hormonas: "Estrógenos, progesterona, testosterona, inhibina",
        niveles: [8, 6, 7, 4],
        curiosidad: "Aunque producen hormonas, también son órganos reproductores; son glándulas mixtas."
    }
};

// Orden de las glándulas para el tour guiado
export const tourOrder = [
    "hipotalamo",
    "hipofisis",
    "pineal",
    "tiroides",
    "paratiroides",
    "timo",
    "adrenal",
    "pancreas",
    "gonadas"
];