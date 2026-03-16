// Elementos del DOM
const titleMonthYear = document.querySelector('.subtitle');
const calendarBody = document.getElementById('calendario-body');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

// Nombres de los meses en español
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let currentDate = new Date();

// Inicialización
function init() {
    const availableMonths = Object.keys(cronogramaData).sort();
    
    if (availableMonths.length === 0) {
        titleMonthYear.textContent = "No hay cronogramas disponibles";
        return;
    }

    // Determinar el mes a mostrar inicialmente
    const today = new Date();
    const currentMonthStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    
    let initialMonth = availableMonths[availableMonths.length - 1]; // Por defecto el calendario más nuevo
    
    // Si el mes actual exacto existe, mostramos ese
    if (availableMonths.includes(currentMonthStr)) {
        initialMonth = currentMonthStr;
    } else {
        // Sino, buscamos el más cercano hacia el pasado o usamos el último disponible si estamos en el futuro
        const pastMonths = availableMonths.filter(m => m <= currentMonthStr);
        if (pastMonths.length > 0) {
            initialMonth = pastMonths[pastMonths.length - 1];
        } else {
            initialMonth = availableMonths[0]; // Extraño, pero por salvaguarda
        }
    }

    const [year, month] = initialMonth.split('-');
    currentDate = new Date(year, parseInt(month) - 1, 1);
    
    renderCalendar();
    
    // Event Listeners para navegación
    btnPrev.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    btnNext.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

// Función principal de renderizado
function renderCalendar() {
    calendarBody.innerHTML = '';
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    
    // Actualizar Título
    titleMonthYear.textContent = `${monthNames[month]} ${year}`;
    
    // Habilitar/deshabilitar botones según disponibilidad de datos
    const availableMonths = Object.keys(cronogramaData).sort();
    const currentIndex = availableMonths.indexOf(monthKey);
    
    // Leer el objeto de datos del mes
    const monthDataObj = cronogramaData[monthKey] || {};
    const daysData = monthDataObj.dias || (Array.isArray(monthDataObj) ? monthDataObj : []);
    const feriadosDelMes = (monthDataObj.feriados && typeof monthDataObj.feriados === 'object') ? monthDataObj.feriados : {};

    // Primer día del mes (0 = Domingo, 1 = Lunes, etc.) - Ajustamos para que Lunes sea 0
    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1; // Ajuste Lunes-Domingo
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let currentWeek = document.createElement('tr');
    
    // Celdas vacías del inicio
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('td');
        emptyCell.className = 'empty-cell';
        currentWeek.appendChild(emptyCell);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayCell = document.createElement('td');
        dayCell.setAttribute('data-date', dateStr);
        
        
        const visualDate = new Date(year, month, day);
        if (visualDate.getDay() === 0 || visualDate.getDay() === 6) {
            dayCell.classList.add('weekend-cell');
        }
        
        // Detección de Feriado (Busca por número o string)
        const holidayDesc = feriadosDelMes[day] || feriadosDelMes[String(day)];
        if (holidayDesc) {
            dayCell.classList.add('holiday-cell');
            dayCell.setAttribute('data-tooltip', holidayDesc);
            dayCell.setAttribute('title', holidayDesc); // Respaldo nativo
        }
        
        // Buscar datos para este día
        const dayData = daysData.find(d => d.day === day);
        
        let contentHTML = `<div class="flex-col">`;
        contentHTML += `<span class="day-number">${day}</span>`;
        
        if (dayData && dayData.shifts) {
            dayData.shifts.forEach(shift => {
                const docName = doctorNames[shift.id] || shift.id;
                contentHTML += `<span class="name ${shift.id}">${docName}</span>`;
                if (shift.obs) {
                    contentHTML += `<span class="obs">${shift.obs}</span>`;
                }
            });
        }
        
        contentHTML += `</div>`;
        dayCell.innerHTML = contentHTML;
        
        currentWeek.appendChild(dayCell);
        
        // Si es domingo (índice 6) y no es el último día, cerramos fila y abrimos nueva
        if ((firstDay + day) % 7 === 0 && day !== daysInMonth) {
            calendarBody.appendChild(currentWeek);
            currentWeek = document.createElement('tr');
        }
    }
    
    // Celdas vacías del final para completar la semana
    const remainingEmptyCells = 7 - currentWeek.children.length;
    if (remainingEmptyCells > 0 && currentWeek.children.length > 0) {
        for (let i = 0; i < remainingEmptyCells; i++) {
            const emptyCell = document.createElement('td');
            emptyCell.className = 'empty-cell';
            currentWeek.appendChild(emptyCell);
        }
        calendarBody.appendChild(currentWeek);
    }

    // Aplicar atributos data-day para CSS de móvil
    const dayNamesForCSS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const rows = calendarBody.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
            cell.setAttribute('data-dayname', dayNamesForCSS[index]);
        });
    });

    // Calcular y actualizar estadísticas ocultas/visibles
    calcularYMostrarEstadisticas(daysData, daysInMonth, monthNames[month], year, month);
}

// ---- LOGICA DE ESTADISTICAS ----

const btnToggleStats = document.getElementById('btn-toggle-stats');
const statsPanel = document.getElementById('stats-panel');
const statsMonthTitle = document.getElementById('stats-month-title');
const statsGridContent = document.getElementById('stats-grid-content');

let statsVisible = false;

// Configurar estado inicial del botón
btnToggleStats.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg> Ver Estadísticas del Mes`;

btnToggleStats.addEventListener('click', () => {
    statsVisible = !statsVisible;
    if (statsVisible) {
        statsPanel.classList.add('active');
        btnToggleStats.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> Ocultar Estadísticas`;
    } else {
        statsPanel.classList.remove('active');
        btnToggleStats.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg> Ver Estadísticas del Mes`;
    }
});

// Helper para Feriados inter-mensuales
function getFeriadoStatus(y, m, d) {
    const date = new Date(y, m, d);
    const checkY = date.getFullYear();
    const checkM = date.getMonth();
    const checkD = date.getDate();
    const key = `${checkY}-${String(checkM + 1).padStart(2, '0')}`;
    const targetMonthObj = cronogramaData[key] || {};
    const targetFeriados = Array.isArray(targetMonthObj) ? {} : (targetMonthObj.feriados || {});
    return targetFeriados.hasOwnProperty(checkD);
}

function calcularYMostrarEstadisticas(daysData, totalDays, monthName, yearName, month) {
    const year = parseInt(yearName);
    statsMonthTitle.textContent = `Horas Asignadas - ${monthName} ${yearName}`;
    
    // Objeto para acumular estadísticas detalladas de cada doctor
    const stats = {};
    Object.keys(doctorNames).forEach(id => {
        stats[id] = {
            totalHours: 0,
            g24: 0, g18: 0, g6: 0,
            horasFindeReloj: 0,
            horasFeriadoReloj: 0,
            horasFindeAdmin: 0,
            horasFeriadoAdmin: 0
        };
    });
    
    // Procesar cada día secuencialmente para poder arrastrar horas
    for (let day = 1; day <= totalDays; day++) {
        const dayData = daysData.find(d => d.day === day);
        if (!dayData || !dayData.shifts || dayData.shifts.length === 0) continue;
        
        let pendingHours = 24; // Cada día tiene 24 horas a repartir
        let offsetHorasDelBloque = 0; // De 0 a 24

        // Procesar los turnos del día en orden
        dayData.shifts.forEach((shift, index) => {
            const docId = shift.id;
            if (!stats[docId]) return;

            let hoursAssigned = 0;
            if (shift.obs && shift.obs.includes("8 a 14")) hoursAssigned = 18; 
            else hoursAssigned = pendingHours;
            
            hoursAssigned = Math.min(hoursAssigned, pendingHours);
            
            if (hoursAssigned === 24) stats[docId].g24 += 1;
            else if (hoursAssigned === 18) stats[docId].g18 += 1;
            else if (hoursAssigned === 6) stats[docId].g6 += 1;

            stats[docId].totalHours += hoursAssigned;
            pendingHours -= hoursAssigned;

            // --- Lógica Exacta de Reloj 🕒 ---
            for (let h = 0; h < hoursAssigned; h++) {
                let horaBloque = offsetHorasDelBloque + h;
                let physD = (horaBloque < 4) ? (day - 1) : day; // Primeras 4hs (20 a 24) son physD=day-1
                let physicalDate = new Date(year, month, physD);
                
                if (physicalDate.getDay() === 0 || physicalDate.getDay() === 6) stats[docId].horasFindeReloj += 1;
                if (getFeriadoStatus(year, month, physD)) stats[docId].horasFeriadoReloj += 1;
            }
            
            // --- Lógica de Módulo Administrativo 🏥 ---
            // Todo el bloque pertenece conceptualmente al día que comenzó la guardia (day - 1 a las 20hs)
            let adminDate = new Date(year, month, day - 1);
            if (adminDate.getDay() === 0 || adminDate.getDay() === 6) stats[docId].horasFindeAdmin += hoursAssigned;
            if (getFeriadoStatus(year, month, day - 1)) stats[docId].horasFeriadoAdmin += hoursAssigned;

            offsetHorasDelBloque += hoursAssigned;
        });

        // Si quedaron horas pendientes en el bloque de 24h
        if (pendingHours > 0) {
            let nextDocAssigned = null;
            let iterDay = day + 1;
            
            while (iterDay <= totalDays && !nextDocAssigned) {
                const nextDayData = daysData.find(d => d.day === iterDay);
                if (nextDayData && nextDayData.shifts && nextDayData.shifts.length > 0) {
                    nextDocAssigned = nextDayData.shifts[0].id;
                }
                iterDay++;
            }

            // Asignar el resto del bloque de 24h (generalmente 6h)
            if (nextDocAssigned && stats[nextDocAssigned]) {
                const docId = nextDocAssigned;
                stats[docId].totalHours += pendingHours;
                
                if (pendingHours === 18) stats[docId].g18 += 1;
                else if (pendingHours === 6) stats[docId].g6 += 1;
                
                // --- Traspaso Lógica Reloj ---
                for (let h = 0; h < pendingHours; h++) {
                    let horaBloque = offsetHorasDelBloque + h;
                    let physD = (horaBloque < 4) ? (day - 1) : day;
                    let physicalDate = new Date(year, month, physD);
                    if (physicalDate.getDay() === 0 || physicalDate.getDay() === 6) stats[docId].horasFindeReloj += 1;
                    if (getFeriadoStatus(year, month, physD)) stats[docId].horasFeriadoReloj += 1;
                }
                
                // --- Traspaso Lógica Admin ---
                let adminDate = new Date(year, month, day - 1);
                if (adminDate.getDay() === 0 || adminDate.getDay() === 6) stats[docId].horasFindeAdmin += pendingHours;
                if (getFeriadoStatus(year, month, day - 1)) stats[docId].horasFeriadoAdmin += pendingHours;
            }
        }
    }

    // Dibujar en el DOM
    statsGridContent.innerHTML = '';
    let totalGeneral = 0;

    Object.keys(stats).forEach(docId => {
        const docStats = stats[docId];
        if (docStats.totalHours === 0) return; // No mostrar doctores sin horas este mes
        
        totalGeneral += docStats.totalHours;
        const name = doctorNames[docId] || docId;
        
        const card = document.createElement('div');
        card.className = `stat-card doctor-${docId}`;
        
        // Generar lista de detalles
        let breakdownHTML = `<div class="stat-breakdown" style="margin-top: 15px; text-align: left; font-size: 0.85rem; color: #4a5568; border-top: 1px solid #e2e8f0; padding-top: 10px;">`;
        if (docStats.g24 > 0) breakdownHTML += `<div>Guardias 24h: <strong>${docStats.g24}</strong></div>`;
        if (docStats.g18 > 0) breakdownHTML += `<div>Guardias 18h: <strong>${docStats.g18}</strong></div>`;
        if (docStats.g6 > 0) breakdownHTML += `<div>Guardias 6h: <strong>${docStats.g6}</strong></div>`;
        
        // Módulos de 24hs individuales (ya no de 12h)
        const modulosDoc = docStats.totalHours / 24;
        breakdownHTML += `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #cbd5e0;">
            Módulos (24h): <strong>${Math.floor(modulosDoc)}</strong>${modulosDoc % 1 !== 0 ? ' (y ' + (docStats.totalHours % 24) + 'h)' : ''}
        </div>`;
        
        // Bloque comparativo de opciones de horas premium (Reloj vs Administrativo)
        breakdownHTML += `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #cbd5e0; font-size: 0.8rem; line-height: 1.4;">
            <div style="margin-bottom: 5px;"><strong>Fines de Semana:</strong><br>Reloj Exacto: ${docStats.horasFindeReloj}h | Módulo Admin: ${docStats.horasFindeAdmin}h</div>
            <div><strong>Feriados Locales/Nac:</strong><br>Reloj Exacto: ${docStats.horasFeriadoReloj}h | Módulo Admin: ${docStats.horasFeriadoAdmin}h</div>
        </div>`;

        breakdownHTML += `</div>`;

        card.innerHTML = `
            <div class="stat-title">Dr/Dra. ${name}</div>
            <div class="stat-value">${docStats.totalHours}</div>
            <div class="stat-unit">Horas Totales</div>
            ${breakdownHTML}
        `;
        statsGridContent.appendChild(card);
    });

    // Tarjeta del total
    const modulos24h = totalGeneral / 24;

    const cardTotal = document.createElement('div');
    cardTotal.className = `stat-card`;
    cardTotal.style.borderTop = "4px solid #4a5568";
    cardTotal.innerHTML = `
        <div class="stat-title">Total Servicio</div>
        <div class="stat-value">${totalGeneral}</div>
        <div class="stat-unit">Horas Cubiertas</div>
        <div class="stat-breakdown" style="margin-top: 15px; text-align: left; font-size: 0.85rem; color: #4a5568; border-top: 1px solid #e2e8f0; padding-top: 10px;">
            <div>Módulos de 24h: <strong>${Math.floor(modulos24h)}</strong>${modulos24h % 1 !== 0 ? ' (y ' + (totalGeneral % 24) + 'h sueltas)' : ''}</div>
        </div>
    `;
    statsGridContent.appendChild(cardTotal);
}

// Iniciar app cuando cargue la página
document.addEventListener('DOMContentLoaded', init);
