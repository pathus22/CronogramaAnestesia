// Base de Datos Estática del Cronograma
// El formato de la clave mes debe ser "YYYY-MM" (por ejemplo: "2026-03" para marzo de 2026).
// Los doctores disponibles son identificados por un key "id", esto matchea las clases CSS (ej: "gonzalez", "paglia").

const cronogramaData = {
    "2026-01": { feriados: { 1: "Año Nuevo" }, dias: [] },
    "2026-02": { feriados: { 16: "Carnaval", 17: "Carnaval" }, dias: [] },
    "2026-03": {
        feriados: { 
            23: "Feriado con fines turísticos", 
            24: "Día Nacional de la Memoria por la Verdad y la Justicia" 
        },
        dias: [
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
    "2026-04": { feriados: { 2: "Día del Veterano y de los Caídos en la Guerra de Malvinas", 3: "Viernes Santo" }, dias: [] },
    "2026-05": { feriados: { 1: "Día del Trabajador", 25: "Día de la Revolución de Mayo" }, dias: [] },
    "2026-06": { feriados: { 15: "Paso a la Inmortalidad del Gral. Güemes", 20: "Paso a la Inmortalidad del Gral. Belgrano" }, dias: [] },
    "2026-07": { feriados: { 9: "Día de la Independencia", 10: "Feriado con fines turísticos" }, dias: [] },
    "2026-08": { feriados: { 17: "Paso a la Inmortalidad del Gral. San Martín" }, dias: [] },
    "2026-09": { feriados: {}, dias: [] },
    "2026-10": { feriados: { 12: "Día del Respeto a la Diversidad Cultural" }, dias: [] },
    "2026-11": { feriados: { 20: "Día de la Soberanía Nacional", 23: "Feriado con fines turísticos" }, dias: [] },
    "2026-12": { feriados: { 8: "Inmaculada Concepción", 25: "Navidad" }, dias: [] }
};

// Mapeo amigable de nombres para renderizado
const doctorNames = {
    "gonzalez": "Gonzalez",
    "paglia": "Paglia"
};
