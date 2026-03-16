// Base de Datos Estática del Cronograma
// El formato de la clave mes debe ser "YYYY-MM" (por ejemplo: "2026-03" para marzo de 2026).
// Los doctores disponibles son identificados por un key "id", esto matchea las clases CSS (ej: "gonzalez", "paglia").

const cronogramaData = {
    "2026-03": [
        // Las fechas son índices 1-indexed. Se omite el tipo "guardia" como asunción predeterminada si falta,
        // pero se documenta { type: 'guardia' } como estándar visual.
        { day: 1, shifts: [ { id: "gonzalez" } ] },
        { day: 2, shifts: [ { id: "gonzalez" } ] },
        { day: 3, shifts: [ { id: "gonzalez", obs: "(hasta 20 hs)" } ] },
        { day: 4, shifts: [ { id: "paglia", obs: "(hasta 20 hs)" } ] },
        { day: 5, shifts: [ { id: "gonzalez" } ] },
        { day: 6, shifts: [ { id: "gonzalez", obs: "(hasta 20 hs)" } ] },
        { day: 7, shifts: [ { id: "gonzalez" } ] },
        { day: 8, shifts: [ { id: "gonzalez" } ] },
        { day: 9, shifts: [ { id: "gonzalez" } ] },
        { day: 10, shifts: [ { id: "gonzalez", obs: "(hasta 20 hs)" } ] },
        { day: 11, shifts: [ { id: "paglia", obs: "(hasta 20 hs)" } ] },
        { day: 12, shifts: [ { id: "gonzalez" } ] },
        { day: 13, shifts: [ { id: "gonzalez" } ] },
        { day: 14, shifts: [ { id: "gonzalez", obs: "(8 a 14)" }, { id: "paglia" } ] },
        { day: 15, shifts: [ { id: "paglia", obs: "(hasta 20 hs)" } ] },
        { day: 16, shifts: [ { id: "gonzalez" } ] },
        { day: 17, shifts: [ { id: "gonzalez", obs: "(hasta 20 hs)" } ] },
        { day: 18, shifts: [ { id: "paglia", obs: "(hasta 20 hs)" } ] },
        { day: 19, shifts: [ { id: "gonzalez" } ] },
        { day: 20, shifts: [ { id: "gonzalez" } ] },
        { day: 21, shifts: [ { id: "gonzalez" } ] },
        { day: 22, shifts: [ { id: "paglia" } ] },
        { day: 23, shifts: [ { id: "gonzalez" } ] },
        { day: 24, shifts: [ { id: "gonzalez", obs: "(hasta 20 hs)" } ] },
        { day: 25, shifts: [ { id: "paglia", obs: "(hasta 20 hs)" } ] },
        { day: 26, shifts: [ { id: "gonzalez" } ] },
        { day: 27, shifts: [ { id: "paglia", obs: "(hasta 20 hs)" } ] },
        { day: 28, shifts: [ { id: "paglia" } ] },
        { day: 29, shifts: [ { id: "paglia", obs: "(hasta 20 hs)" } ] },
        { day: 30, shifts: [ { id: "gonzalez" } ] },
        { day: 31, shifts: [ { id: "gonzalez", obs: "(hasta 20 hs)" } ] }
    ]
};

// Mapeo amigable de nombres para renderizado
const doctorNames = {
    "gonzalez": "Gonzalez",
    "paglia": "Paglia"
};
