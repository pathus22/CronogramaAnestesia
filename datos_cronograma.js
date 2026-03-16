// Base de Datos Estática del Cronograma
// El formato de la clave mes debe ser "YYYY-MM" (por ejemplo: "2026-03" para marzo de 2026).
// Los doctores disponibles son identificados por un key "id", esto matchea las clases CSS (ej: "gonzalez", "paglia").

const cronogramaData = {
    "2026-01": { feriados: [{day: 1, name: "Año Nuevo"}], dias: [] },
    "2026-02": { feriados: [{day: 16, name: "Carnaval"}, {day: 17, name: "Carnaval"}], dias: [] },
    "2026-03": {
        feriados: [{day: 23, name: "Feriado con Fines Turísticos"}, {day: 24, name: "Día Nacional de la Memoria por la Verdad y la Justicia"}],
        dias: [
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
    },
    // NOTA: Para añadir feriados locales (ej. Aniversario de San Vicente, ponerlo en el mes correspondiente separados por comas)
    // Ejemplo: Si hubiese feriado el 5 y 22 de Abril: { feriados: [{day: 2, name: ".."}, {day: 5, name: "Local"}], dias: [...] }
    "2026-04": { feriados: [{day: 2, name: "Día del Veterano y de los Caídos en Malvinas"}, {day: 3, name: "Viernes Santo"}], dias: [] },
    "2026-05": { feriados: [{day: 1, name: "Día del Trabajador"}, {day: 25, name: "Día de la Revolución de Mayo"}], dias: [] },
    "2026-06": { feriados: [{day: 15, name: "Paso a la Inmortalidad del Gral. Martín Miguel de Güemes"}, {day: 20, name: "Paso a la Inmortalidad del Gral. Manuel Belgrano"}], dias: [] },
    "2026-07": { feriados: [{day: 9, name: "Día de la Independencia"}, {day: 10, name: "Feriado con Fines Turísticos"}], dias: [] },
    "2026-08": { feriados: [{day: 17, name: "Paso a la Inmortalidad del Gral. José de San Martín"}], dias: [] },
    "2026-09": { feriados: [], dias: [] },
    "2026-10": { feriados: [{day: 12, name: "Día del Respeto a la Diversidad Cultural"}], dias: [] },
    "2026-11": { feriados: [{day: 20, name: "Día de la Soberanía Nacional"}, {day: 23, name: "Feriado con Fines Turísticos"}], dias: [] },
    "2026-12": { feriados: [{day: 8, name: "Día de la Inmaculada Concepción"}, {day: 25, name: "Navidad"}], dias: [] }
};

// Mapeo amigable de nombres para renderizado
const doctorNames = {
    "gonzalez": "Gonzalez",
    "paglia": "Paglia"
};
