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
    
    // Siempre permitimos navegar si queremos ver meses vacíos, o podemos restringirlo a solo los meses con datos.
    // Restringiendo a solo meses con datos:
    /*
    btnPrev.disabled = currentIndex <= 0;
    btnNext.disabled = currentIndex === -1 || currentIndex >= availableMonths.length - 1;
    */
    // Alternativa: Mostrar mes "Sin datos" si navegamos fuera de rango. Lo dejamos libre por ahora, asumiendo crecimiento orgánico.

    const daysData = cronogramaData[monthKey] || [];

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
}

// Iniciar app cuando cargue la página
document.addEventListener('DOMContentLoaded', init);
