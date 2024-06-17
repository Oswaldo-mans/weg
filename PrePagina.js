document.addEventListener("DOMContentLoaded", function () {
    const currentTime = new Date().getHours();
    const greetingElement = document.querySelector(".greeting");
    const searchInput = document.querySelector('input[type="text"]');
    searchInput.addEventListener("input", filterProjects);

    if (currentTime < 12) {
        greetingElement.textContent =
            "BUENOS DÍAS ¿QUÉ PUEDO HACER POR TI EL DÍA DE HOY?";
    } else if (currentTime < 20) {
        greetingElement.textContent =
            "BUENAS TARDES, ¿QUÉ PUEDO HACER POR TI EL DÍA DE HOY?";
    } else {
        greetingElement.textContent =
            "BUENAS NOCHES, ¿QUÉ PUEDO HACER POR TI EL DÍA DE HOY?";
    }

    loadProjects();
});

function toggleDropdownMenu() {
    const dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.style.display !== "block"
        ? (dropdownContent.style.display = "block")
        : (dropdownContent.style.display = "none");
}

function showProjectbycliente() {
    const projectForm = document.getElementById("projectForm");
    projectForm.style.display = "flex";
}

function closeForm() {
    const projectForm = document.getElementById("projectForm");
    projectForm.style.display = "none";
}

function clearForm() {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
        input.value = "";
    });
}

function addProject(event) {
    event.preventDefault();

    const clientName = document.getElementById("clientName").value;
    const totalItems = parseInt(document.getElementById("totalItems").value);
    const clientOrder = document.getElementById("clientOrder").value;

    const options = [];
    const idItems = [];
    const idColumna = [];
    const difficulty = [];
    const date = [];
    const dateF = [];

    for (let i = 1; i <= totalItems; i++) {
        const optionValue = document.querySelector(`select[name="item-opcion-${i}"]`).value;
        options.push(optionValue);

        const idItemValue = parseInt(document.querySelector(`input[name="item-id-${i}"]`).value);
        idItems.push(idItemValue);

        const idColumnaValue = parseInt(document.querySelector(`input[name="columna-id-${i}"]`).value);
        idColumna.push(idColumnaValue);

        const difficultyValue = document.querySelector(`select[name="item-difficulty-${i}"]`).value;
        difficulty.push(difficultyValue);

        const dateValue = document.querySelector(`input[name="item-start-date-${i}"]`).value;
        date.push(dateValue);

        const dateFValue = document.querySelector(`input[name="item-start-dateF-${i}"]`).value;
        dateF.push(dateFValue);
    }

    const projectsContainer = document.getElementById("projectsContainer");

    if (clientName.trim() !== "" && !isNaN(totalItems) && totalItems > 0) {
        const projectWrapper = document.createElement("div");
        projectWrapper.className = "project-wrapper";

        const projectContainer = document.createElement("div");
        projectContainer.className = "project-item";

        const graficaContainer = document.createElement("div");
        graficaContainer.className = "grafica-item";

        const infoContainer = document.createElement("div");
        infoContainer.className = "info-item";

        const projectButton = document.createElement("button");
        projectButton.className = "project-button";
        projectButton.textContent = clientName;

        const infoButton = document.createElement("button");
        infoButton.className = "info-button";
        infoButton.textContent = "INFORMACIÓN";

        projectButton.addEventListener("click", () => openProjectWindow(clientName, totalItems, clientOrder, options, idItems, idColumna, difficulty, date, dateF));

        projectContainer.appendChild(projectButton);
        projectWrapper.appendChild(projectContainer);
        projectWrapper.appendChild(graficaContainer);
        projectWrapper.appendChild(infoContainer);
        infoContainer.appendChild(infoButton);

        projectsContainer.appendChild(projectWrapper);

        const projectCount = document.getElementById("projectCount");
        projectCount.textContent = parseInt(projectCount.textContent) + 1;

        saveProject(clientName, totalItems, clientOrder, options, idItems, idColumna, difficulty, date, dateF);

        closeForm();
        toggleDropdownMenu();

        openProjectWindow(clientName, totalItems, clientOrder, options, idItems, idColumna, difficulty, date, dateF);
    } else {
        alert("Por favor, ingresa el nombre del cliente y una cantidad válida de Items.");
    }
}

//CREACION DEL GANTT Y DEMAS EN UNA NUEVA PESTAÑA
function openProjectWindow(clientName, totalItems, clientOrder, options, idItems, idColumna, difficulty, date, dateF) {
    //ABRE UNA NUEVA VENTANA O PESTAÑA CON EL PROYECTO
    const newWindow = window.open("", "_blank");

    //CONTENIDO DE LA NUEVA VENTANA
    let newContent = `
        <html>
            <head>  
                <title>PROYECTO - ${clientName}</title>
                <script src="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.js"></script>
                <link rel="stylesheet" href="https://cdn.dhtmlx.com/gantt/edge/dhtmlxgantt.css">
                <link rel="stylesheet" href="Menu2.css">
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

                <style>
                    .gantt_grid_data .gantt_cell:nth-child(2),
                    .gantt_grid_data .gantt_cell:nth-child(5),
                    .gantt_grid_data .gantt_cell:nth-child(8),
                    .gantt_grid_data .gantt_cell:nth-child(10) {
                        border-right: 2px solid #0206f8;
                    }
                </style>
            </head>
            <body>
            
                <!-- NOMBRE DE LA PAGINA -->
                <div id="Titulo" class="g-container" >
                    <h1>CLIENTE: ${clientName} </h1>
                </div>            
                
                <!-- MENU INTERACTIVO -->
                <div id="MenuG" class="s-container" >
                    <div class="ganttM">
                        <ul>

                            <li id= "menu-gantt" style="--clr: #2483ff;">
                            <a href="#">
                                <i class="fa-solid fa-chart-gantt"></i>
                                <span>Gantt</span>
                            </a>
                            </li>
                
                            <li id="Kanba" style="--clr: #2483ff;">
                                <a href="#">
                                    <i class="fa-solid fa-users"></i>
                                    <span>Panel</span>
                                </a>
                            </li>
                
                            <li id="Graficos" style="--clr: #2483ff;">
                                <a href="#">
                                    <i class="fa-solid fa-chart-pie"></i>
                                    <span>Graficos</span>
                                </a>
                            </li>
                
                            <li id="Reportes" style="--clr: #2483ff;">
                                <a href="#">
                                    <i class="fa-solid fa-file"></i>
                                    <span>Reportes</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>

                <div id="gantt_chart" style="width: 100%; height: 85vh;"></div>
                <script>
                    gantt.config.xml_date = "%Y-%m-%d %H:%i";

                    // Configurar Lightbox para la edición de tareas
                    gantt.config.lightbox.sections = [
                        { name: "description", height: 70, map_to: "text", type: "textarea", focus: true },
                        { name: "time", height: 72, type: "duration", map_to: "auto" },
                        { name: "responsible", height: 20, map_to: "responsible", type: "select", options: [
                            { key: "INGENIERIA", label: "INGENIERIA" },
                            { key: "COMPRAS", label: "COMPRAS" },
                            { key: "PCP", label: "PCP" },
                            { key: "AREA", label: "AREA" }
                        ] }
                    ];

                    gantt.locale.labels.section_description = "Tarea";
                    gantt.locale.labels.section_time = "Duración";
                    gantt.locale.labels.section_responsible = "Responsable";

                    // CONFIGURAR EL NOMBRE DE LAS COLUMNAS EXISTENTES
                    gantt.config.columns = gantt.config.columns.map(column => {
                        switch (column.name) {
                            case "text":
                                return { name: "text", label: "ACTIVIDAD", tree: true, width: 300 };
                            case "start_date":
                                return { name: "start_date", label: "INICIO/REAL", align: "center", width: 72 };
                            case "duration":
                                return { name: "duration", label: "DURACIÓN", align: "center", width: 53 };
                            default:
                                return column;
                        }
                    });

                    //CHECKLIST
                    gantt.config.columns.unshift(
                        { 
                            name: "checklist", 
                            label: "☑", 
                            width: 25, 
                            template: function(task) {
                                return '<input type="checkbox" class="task-checkbox" data-task-id="' + task.id + '">';
                            }
                        }
                    );

                    // COLUMNA DE INICIO/IDEAL, NO SE ACTUALIZA
                    gantt.config.columns.push(
                        { name: "new_start_date", label: "INICIO/IDEAL", align: "center", width: 72, template: function(task) {
                            if (task.original_new_start_date) {
                                return gantt.templates.date_grid(task.original_new_start_date);
                            }
                            const NewStartDate = gantt.date.add(task.start_date, 0, "day");
                            task.original_new_start_date = NewStartDate;
                            return gantt.templates.date_grid(NewStartDate);
                        }},
                    );
                    // MOVER LA COLUMNA INICIO/IDEAL
                    gantt.config.columns.splice(2, 0, gantt.config.columns.pop());
    
                    // AGREGAR COLUMNA DE FECHA FIN/IDEAL, PERO QUE NO SE ACTUALICE
                    gantt.config.columns.push(
                        { name: "new_end_date", label: "FIN/IDEAL", align: "center", width: 72, template: function(task) {
                            // Usa la fecha de fin almacenada en la tarea, si existe
                            if (task.original_new_end_date) {
                                return gantt.templates.date_grid(task.original_new_end_date);
                            }
                            // Calcula y almacena la fecha de fin inicial
                            const NewendDate = gantt.calculateEndDate(gantt.calculateEndDate(task.start_date, task.duration - 1));
                            task.original_new_end_date = NewendDate;
                            return gantt.templates.date_grid(NewendDate);
                        }},
                    );
                    // MOVER LA COLUMNA FIN/IDEAL
                    gantt.config.columns.splice(3, 0, gantt.config.columns.pop());
    
                    // AGREGAR COLUMNA DE PROGRESO ESTABLECIDO - IDEAL
                    gantt.config.columns.push({
                        name: "establecido",
                        label: "IDEAL",
                        align: "center",
                        width: 60,
                        template: function(task) {
                            // Verificar si ya se ha calculado el progreso para esta tarea
                            if (task.hasOwnProperty('idealProgress')) {
                                return task.idealProgress + '%';
                            }
                    
                            if (task.$level === 0) {
                                // Es una tarea padre, calcular la suma del progreso de las subtareas
                                const subtasks = gantt.getChildren(task.id);
                                let totalProgress = 0;
                    
                                subtasks.forEach(subtaskId => {
                                    const subtask = gantt.getTask(subtaskId);
                                    const startDate = subtask.start_date;
                                    const endDate = new Date(subtask.end_date);
                                    endDate.setDate(endDate.getDate() - 1);
                    
                                    const today = new Date();
                                    const hour = today.getHours();
                    
                                    if (hour < 17) {
                                        today.setDate(today.getDate() - 0);
                                    }
                    
                                    const totalRealHours = calculateTotalHours(startDate, endDate);
                                    const elapsedRealHours = calculateTotalHours(startDate, today);
                    
                                    let taskPercentage = 100; // Porcentaje por defecto
                                    if (subtask.text.includes("Aceptación de proyecto")) {
                                        taskPercentage = 1;
                                    } else if (subtask.text.includes("Documentos para aprobación")) {
                                        taskPercentage = 5;
                                    } else if (subtask.text.includes("Aprobación - cliente")) {
                                        taskPercentage = 2;
                                    } else if (subtask.text.includes("Liberación - RIPA")) {
                                        taskPercentage = 4;
                                    } else if (subtask.text.includes("Analizar RIPA")) {
                                        taskPercentage = 1;
                                    }  else if (subtask.text.includes("Reporte de fecha RIPA")) {
                                        taskPercentage = 10;
                                    } else if (subtask.text.includes("Liberación - lista")) {
                                        taskPercentage = 16;
                                    } else if (subtask.text.includes("Liberación de WORKFLOW")) {
                                        taskPercentage = 1;
                                    } else if (subtask.text.includes("Analizar lista")) {
                                        taskPercentage = 1;
                                    } else if (subtask.text.includes("Reporte de fecha - lista")) {
                                        taskPercentage = 20;
                                    } else if (subtask.text.includes("Documentos para fabricación")) {
                                        taskPercentage = 6;
                                    } else if (subtask.text.includes("Asignación de rutas")) {
                                        taskPercentage = 1;
                                    } else if (subtask.text.includes("Fabricación")) {
                                        taskPercentage = 30;
                                    } else if (subtask.text.includes("Reporte de pruebas FAT")) {
                                        taskPercentage = 1;
                                    } else if (subtask.text.includes("Reporte de pruebas (Rutina o Dossier)")) {
                                        taskPercentage = 1;
                                    }
                    
                                    const progressPercentage = (elapsedRealHours / totalRealHours) * taskPercentage;
                                    totalProgress += Math.min(progressPercentage, taskPercentage);
                                });
                    
                                task.idealProgress = totalProgress.toFixed(2); // Almacenar el progreso calculado
                                return task.idealProgress + '%';
                            } else {
                                // Es una subtarea, calcular el progreso normal
                                const startDate = task.start_date;
                                const endDate = new Date(task.end_date);
                                endDate.setDate(endDate.getDate() - 1);
                    
                                const today = new Date();
                                const hour = today.getHours();
                    
                                if (hour < 17) { // Ajuste la hora según tu preferencia
                                    today.setDate(today.getDate() - 0);
                                }
                    
                                const totalRealHours = calculateTotalHours(startDate, endDate);
                                const elapsedRealHours = calculateTotalHours(startDate, today);
                    
                                let taskPercentage = 100; // Porcentaje por defecto
                                if (task.text.includes("Aceptación de proyecto")) {
                                    taskPercentage = 1;
                                } else if (task.text.includes("Documentos para aprobación")) {
                                    taskPercentage = 5;
                                } else if (task.text.includes("Aprobación - cliente")) {
                                    taskPercentage = 2;
                                } else if (task.text.includes("Liberación - RIPA")) {
                                    taskPercentage = 4;
                                } else if (task.text.includes("Analizar RIPA")) {
                                    taskPercentage = 1;
                                } else if (task.text.includes("Reporte de fecha RIPA")) {
                                    taskPercentage = 10;
                                } else if (task.text.includes("Liberación - lista")) {
                                    taskPercentage = 16;
                                } else if (task.text.includes("Liberación de WORKFLOW")) {
                                    taskPercentage = 1;
                                } else if (task.text.includes("Analizar lista")) {
                                    taskPercentage = 1;
                                } else if (task.text.includes("Reporte de fecha - lista")) {
                                    taskPercentage = 20;
                                } else if (task.text.includes("Documentos para fabricación")) {
                                    taskPercentage = 6;
                                } else if (task.text.includes("Asignación de rutas")) {
                                    taskPercentage = 1;
                                } else if (task.text.includes("Fabricación")) {
                                    taskPercentage = 30;
                                } else if (task.text.includes("Reporte de pruebas FAT")) {
                                    taskPercentage = 1;
                                } else if (task.text.includes("Reporte de pruebas (Rutina o Dossier)")) {
                                    taskPercentage = 1;
                                }
                    
                                const progressPercentage = (elapsedRealHours / totalRealHours) * taskPercentage;
                                task.idealProgress = Math.min(progressPercentage, taskPercentage).toFixed(2); // Almacenar el progreso calculado
                                return task.idealProgress + '%';
                            }
                        }
                    });
                    // MOVER LA COLUMNA IDEAL
                    gantt.config.columns.splice(4, 0, gantt.config.columns.pop());

                    // AGREGAR NUEVA COLUMNA DE FIN/REAL, PARA QUE SE ACTUALICE
                    gantt.config.columns.push(
                        { name: "end_date", label: "FIN/REAL", align: "center", width: 80, template: function(task) {
                            const endDate = gantt.calculateEndDate(task.start_date, task.duration);
                            endDate.setDate(endDate.getDate() - 1);

                            // Ajustar la fecha si cae en domingo
                            if (endDate.getDay() === 0) {
                                endDate.setDate(endDate.getDate() - 2);
                            }

                            return gantt.templates.date_grid(endDate);
                        }},
                    );
                    gantt.config.columns.splice(7, 0, gantt.config.columns.pop());

                    // AGREGAR NUEVA COLUMNA DE AVANCE REAL, PARA QUE SE ACTUALICE
                    gantt.config.columns.push(
                        { 
                            name: "real", 
                            label: "REAL", 
                            align: "center", 
                            width: 60, 
                            template: function(task) {
                                if (task.$level === 0) {
                                    // Es una tarea padre, calcular la suma del progreso de las subtareas
                                    const subtasks = gantt.getChildren(task.id);
                                    let totalProgress = 0;
                    
                                    subtasks.forEach(subtaskId => {
                                        const subtask = gantt.getTask(subtaskId);
                                        const startDate = subtask.start_date;
                                        const endDate = new Date(subtask.end_date);
                                        endDate.setDate(endDate.getDate() - 1);
                    
                                        const today = new Date();
                                        const hour = today.getHours();
                    
                                        if (hour < 17) {
                                            today.setDate(today.getDate() - 1);
                                        }
                    
                                        const totalRealHours = calculateTotalHours(startDate, endDate);
                                        const elapsedRealHours = calculateTotalHours(startDate, today);
                    
                                        let taskPercentage = 100; // Porcentaje por defecto
                                        if (subtask.text.includes("Aceptación de proyecto")) {
                                            taskPercentage = 1;
                                        } else if (subtask.text.includes("Documentos para aprobación")) {
                                            taskPercentage = 5;
                                        } else if (subtask.text.includes("Aprobación - cliente")) {
                                            taskPercentage = 2;
                                        } else if (subtask.text.includes("Liberación - RIPA")) {
                                            taskPercentage = 4;
                                        } else if (subtask.text.includes("Analizar RIPA")) {
                                            taskPercentage = 1;
                                        } else if (subtask.text.includes("Reporte de fecha RIPA")) {
                                            taskPercentage = 10;
                                        } else if (subtask.text.includes("Liberación - lista")) {
                                            taskPercentage = 16;
                                        } else if (subtask.text.includes("Liberación de WORKFLOW")) {
                                            taskPercentage = 1;
                                        } else if (subtask.text.includes("Analizar lista")) {
                                            taskPercentage = 1;
                                        } else if (subtask.text.includes("Reporte de fecha - lista")) {
                                            taskPercentage = 20;
                                        } else if (subtask.text.includes("Documentos para fabricación")) {
                                            taskPercentage = 6;
                                        } else if (subtask.text.includes("Asignación de rutas")) {
                                            taskPercentage = 1;
                                        } else if (subtask.text.includes("Fabricación")) {
                                            taskPercentage = 30;
                                        } else if (subtask.text.includes("Reporte de pruebas FAT")) {
                                            taskPercentage = 1;
                                        } else if (subtask.text.includes("Reporte de pruebas (Rutina o Dossier)")) {
                                            taskPercentage = 1;
                                        }
                    
                                        const progressPercentage = (elapsedRealHours / totalRealHours) * taskPercentage;
                                        totalProgress += Math.min(progressPercentage, taskPercentage);
                                    });
                    
                                    return totalProgress.toFixed(2) + '%';
                                } else {
                                    // Es una subtarea, calcular el progreso normal
                                    const startDate = task.start_date;
                                    const endDate = new Date(task.end_date);
                                    endDate.setDate(endDate.getDate() - 1);
                    
                                    const today = new Date();
                                    const hour = today.getHours();
                    
                                    if (hour < 17) { // Ajuste la hora según tu preferencia
                                        today.setDate(today.getDate() - 1);
                                    }
                    
                                    const totalRealHours = calculateTotalHours(startDate, endDate);
                                    const elapsedRealHours = calculateTotalHours(startDate, today);
                    
                                    let taskPercentage = 100; // Porcentaje por defecto
                                    if (task.text.includes("Aceptación de proyecto")) {
                                        taskPercentage = 1;
                                    } else if (task.text.includes("Documentos para aprobación")) {
                                        taskPercentage = 5;
                                    } else if (task.text.includes("Aprobación - cliente")) {
                                        taskPercentage = 2;
                                    } else if (task.text.includes("Liberación - RIPA")) {
                                        taskPercentage = 4;
                                    } else if (task.text.includes("Analizar RIPA")) {
                                        taskPercentage = 1;
                                    } else if (task.text.includes("Reporte de fecha RIPA")) {
                                        taskPercentage = 10;
                                    } else if (task.text.includes("Liberación - lista")) {
                                        taskPercentage = 16;
                                    } else if (task.text.includes("Liberación de WORKFLOW")) {
                                        taskPercentage = 1;
                                    } else if (task.text.includes("Analizar lista")) {
                                        taskPercentage = 1;
                                    } else if (task.text.includes("Reporte de fecha - lista")) {
                                        taskPercentage = 20;
                                    } else if (task.text.includes("Documentos para fabricación")) {
                                        taskPercentage = 6;
                                    } else if (task.text.includes("Asignación de rutas")) {
                                        taskPercentage = 1;
                                    } else if (task.text.includes("Fabricación")) {
                                        taskPercentage = 30;
                                    } else if (task.text.includes("Reporte de pruebas FAT")) {
                                        taskPercentage = 1;
                                    } else if (task.text.includes("Reporte de pruebas (Rutina o Dossier)")) {
                                        taskPercentage = 1;
                                    }
                    
                                    const progressPercentage = (elapsedRealHours / totalRealHours) * taskPercentage;
                                    return Math.min(progressPercentage, taskPercentage).toFixed(2) + '%';
                                }
                            }
                        }
                    );
                    
                    gantt.config.columns.splice(8, 0, gantt.config.columns.pop());

                    // AGREGAR LA COLUMNA DE "RESPONSABLE"
                    gantt.config.columns.push(
                        { name: "responsible", label: "RESPONSABLE", align: "center", width: 85, template: function(task) {
                            return task.responsible || "";
                        }}
                    );
                    // MOVER LA COLUMNA RESPONSABLE
                    gantt.config.columns.splice(9, 0, gantt.config.columns.pop());

                    //PARA CONFIGURAR EL ANCHO DE LA COLUMNA "ACTIVIDAD"
                    const taskNameColumn = gantt.config.columns.find(column => column.name === "text");
                    taskNameColumn.width = 300;

                    // MAPEO DE RESPONSABLE POR TAREA
                    const taskResponsibles = {
                        INGENIERIA: ["Fermin Flores", "Antonio"],
                        COMPRAS: ["Orbelin", "Cinthya", "Saul", "Ariana", "Daniela"],
                        PCP: ["Janet"],
                        PROCESOS: ["Erik"],
                        AREA: ["Fermin Flores", "Antonio", "Orbelin", "Cinthya", "Saul", "Ariana", "Daniela", "Janet", "Erik"]
                    };

                    const options = ${JSON.stringify(options)};
                    const idItems = ${JSON.stringify(idItems)};
                    const date = ${JSON.stringify(date)};
                    const dateF = ${JSON.stringify(dateF)};

                    function calculateEndDateWithoutWeekends(startDate, duration) {
                        let current = new Date(startDate);
                        let daysAdded = 0;
                        while (daysAdded < duration) {
                            current.setDate(current.getDate() + 1);
                            if (current.getDay() !== 0 && current.getDay() !== 6) {
                                daysAdded++;
                            }
                        }
                        return current;
                    }

                    function adjustDateForWeekends(date, isIncreasing) {
                        if (isIncreasing) {
                            while (date.getDay() === 0 || date.getDay() === 6) {
                                date.setDate(date.getDate() + 1);
                            }
                        } else {
                            while (date.getDay() === 0 || date.getDay() === 6) {
                                date.setDate(date.getDate() - 1);
                            }
                        }
                        return date;
                    }

                    function calculateTotalDays(startDate, endDate) {
                        let totalDays = 0;
                        const current = new Date(startDate);
                    
                        // Iterar por días completos
                        while (current <= endDate) {
                            // Solo contar días laborales (de lunes a viernes)
                            if (current.getDay() !== 0 && current.getDay() !== 6) {
                                // Sumar un día por cada día laboral
                                totalDays += 1;
                            }
                            // Avanzar al siguiente día
                            current.setDate(current.getDate() + 1);
                        }
                    
                        return totalDays;
                    }

                    function calculateTotalHours(startDate, endDate) {
                        let totalHours = 0;
                        const current = new Date(startDate);
                        
                        // Iterar por días completos
                        while (current <= endDate) {
                            // Solo contar días laborales (de lunes a viernes)
                            if (current.getDay() !== 0 && current.getDay() !== 6) {
                                // Sumar 9 horas por cada día laboral
                                totalHours += 24;
                            }
                            // Avanzar al siguiente día
                            current.setDate(current.getDate() + 1);
                        }
                    
                        return totalHours;
                    }

                    //DEFINICION DE TIEMPOS GLOBALES MORE LESS MORE LESS
                    let duration_subtask_1 = 1;
                    let duration_subtask_2 = 3;
                    let duration_subtask_3 = 5;
                    let duration_subtask_4 = 2;
                    let duration_subtask_5 = 3;
                    let duration_subtask_6 = 3;
                    let duration_subtask_7 = 6;
                    let duration_subtask_8 = 2;
                    let duration_subtask_9 = 4;
                    let duration_subtask_10 = 4;
                    let duration_subtask_11 = 1;
                    let duration_subtask_12 = 2;
                    let duration_subtask_13 = 1;
                    let duration_subtask_14 = 1;
                    let duration_subtask_15 = 3;
                    
                    const data = [];
                    for (let i = 0; i < ${totalItems}; i++) {
                        const taskName = "Tablero " + (i + 1) + ": " + options[i];
                        const idItem = idItems[i];
                    
                        const subTaskName1 = idItem + ".- Aceptación de proyecto";
                        const subTaskName2 = idItem + ".- Documentos para aprobación";
                        const subTaskName3 = idItem + ".- Aprobación - cliente";
                        const subTaskName4 = idItem + ".- Liberación - RIPA";
                        const subTaskName5 = idItem + ".- Analizar RIPA";
                        const subTaskName6 = idItem + ".- Reporte de fecha RIPA";
                        const subTaskName7 = idItem + ".- Liberación - lista";
                        const subTaskName8 = idItem + ".- Liberación de WORKFLOW";
                        const subTaskName9 = idItem + ".- Analizar lista";
                        const subTaskName10 = idItem + ".- Reporte de fecha - lista";
                        const subTaskName11 = idItem + ".- Documentos para fabricación";
                        const subTaskName12 = idItem + ".- Asignación de rutas";
                        const subTaskName13 = idItem + ".- Fabricación";
                        const subTaskName14 = idItem + ".- Reporte de pruebas FAT";
                        const subTaskName15 = idItem + ".- Reporte de pruebas (Rutina o Dossier)";
                    
                        
                        const startDate = calculateEndDateWithoutWeekends(new Date(date[i]), 1);                        
                        const EndDate = calculateEndDateWithoutWeekends(new Date(dateF[i]), 2  );

                        const AEndDate = calculateEndDateWithoutWeekends(startDate, duration_subtask_1); // Aceptación de proyecto
                        const BEndDate = calculateEndDateWithoutWeekends(AEndDate, duration_subtask_2);
                        const CEndDate = calculateEndDateWithoutWeekends(BEndDate, duration_subtask_3);
                        const DEndDate = calculateEndDateWithoutWeekends(CEndDate, duration_subtask_4);
                        const EEndDate = calculateEndDateWithoutWeekends(DEndDate, duration_subtask_5);
                        const FEndDate = calculateEndDateWithoutWeekends(EEndDate, duration_subtask_6);
                        const GEndDate = calculateEndDateWithoutWeekends(FEndDate, duration_subtask_7); // Liberación - lista
                        const HEndDate = calculateEndDateWithoutWeekends(GEndDate, duration_subtask_8);
                        const IEndDate = calculateEndDateWithoutWeekends(HEndDate, duration_subtask_9); 
                        const JEndDate = calculateEndDateWithoutWeekends(IEndDate, duration_subtask_10);
                        const KEndDate = calculateEndDateWithoutWeekends(JEndDate, duration_subtask_11);
                        const LEndDate = calculateEndDateWithoutWeekends(KEndDate, duration_subtask_12);
                        const MEndDate = calculateEndDateWithoutWeekends(LEndDate, duration_subtask_13);
                        const NEndDate = calculateEndDateWithoutWeekends(MEndDate, duration_subtask_14);
                        const ÑEndDate = calculateEndDateWithoutWeekends(NEndDate, duration_subtask_15); // Reporte de pruebas FAT


                    
                        const colorClass = "gantt_task_color_" + ((i % 5) + 1);
                    
                        data.push(
                            {
                                id: "task" + i,
                                text: taskName,
                                start_date: startDate,
                                end_date: EndDate,
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_0" + i,
                                text: subTaskName1,
                                start_date: startDate,
                                parent: "task" + i,
                                end_date: AEndDate,
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_2" + i,
                                text: subTaskName2,
                                start_date: calculateEndDateWithoutWeekends(AEndDate, 0),
                                parent: "task" + i,
                                end_date: BEndDate,
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_3" + i,
                                text: subTaskName3,
                                start_date: calculateEndDateWithoutWeekends(BEndDate, 0),
                                parent: "task" + i,
                                end_date: CEndDate,
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_4" + i,
                                text: subTaskName4,
                                start_date: calculateEndDateWithoutWeekends(CEndDate, 0),
                                parent: "task" + i,
                                end_date: DEndDate, 
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_5" + i,
                                text: subTaskName5,
                                start_date: calculateEndDateWithoutWeekends(DEndDate, 0),
                                parent: "task" + i,
                                end_date: EEndDate, 
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_6" + i,
                                text: subTaskName6,
                                start_date: calculateEndDateWithoutWeekends(EEndDate, 0),
                                parent: "task" + i,
                                end_date: FEndDate, 
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_7" + i,
                                text: subTaskName7,
                                start_date: calculateEndDateWithoutWeekends(FEndDate, 0),
                                parent: "task" + i,
                                end_date: GEndDate, 
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_8" + i,
                                text: subTaskName8,
                                start_date: calculateEndDateWithoutWeekends(GEndDate, 0),
                                parent: "task" + i,
                                end_date: HEndDate, 
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_9" + i,
                                text: subTaskName9,
                                start_date: calculateEndDateWithoutWeekends(HEndDate, 0),
                                parent: "task" + i,
                                end_date: IEndDate, 
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_10" + i,
                                text: subTaskName10,
                                start_date: calculateEndDateWithoutWeekends(IEndDate, 0),
                                parent: "task" + i,
                                end_date: JEndDate, 
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_11" + i,
                                text: subTaskName11,
                                start_date: calculateEndDateWithoutWeekends(JEndDate, 0),
                                parent: "task" + i,
                                end_date: KEndDate, 
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_12" + i,
                                text: subTaskName12,
                                start_date: calculateEndDateWithoutWeekends(KEndDate, 0),
                                parent: "task" + i,
                                end_date: LEndDate, 
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_13" + i,
                                text: subTaskName13,
                                start_date: calculateEndDateWithoutWeekends(LEndDate, 0),
                                parent: "task" + i,
                                end_date: MEndDate, 
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_14" + i,
                                text: subTaskName14,
                                start_date: calculateEndDateWithoutWeekends(MEndDate, 0),
                                parent: "task" + i,
                                end_date: NEndDate, 
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            },
                            {
                                id: "subtask_15" + i,
                                text: subTaskName15,
                                start_date: calculateEndDateWithoutWeekends(NEndDate, 0),
                                parent: "task" + i,
                                end_date: ÑEndDate, 
                                responsible: "",
                                css: colorClass,
                                checklist: []
                            }
                        );
                    }

                    gantt.config.work_time = true;
                    gantt.config.skip_off_time = true;

                    gantt.init("gantt_chart");
                    gantt.parse({ data });
                    gantt.templates.task_class = function(start, end, task) {
                        return task.css;
                    };


                    //ACTUALIZAR LA DURACIÓN DE LA TAREA PADRE
                    function updateParentDuration(parentTaskId) {
                        if (!gantt.isTaskExists(parentTaskId)) {
                            return;
                        }
                        const subtasks = gantt.getChildren(parentTaskId);
                        let totalDuration = 0;
                        subtasks.forEach(subtaskId => {
                            const subtask = gantt.getTask(subtaskId);
                            totalDuration += subtask.duration;
                        });
                        const parentTask = gantt.getTask(parentTaskId);
                        parentTask.duration = totalDuration;
                        gantt.refreshTask(parentTaskId);

                        // Ajustar la fecha de fin si cae en domingo
                        const endDate = gantt.calculateEndDate(parentTask.start_date, parentTask.duration);
                        endDate.setDate(endDate.getDate() - 1);
                        if (endDate.getDay() === 0) {
                            endDate.setDate(endDate.getDate() - 2);
                        }
                        parentTask.end_date = endDate;
                        gantt.refreshTask(parentTaskId);
                    }

                    // Llamar a updateParentDuration para cada tarea padre
                    const tasks = gantt.getTaskByTime();
                    tasks.forEach(task => {
                        if (!task.parent) { // Si es una tarea padre
                            updateParentDuration(task.id);
                        }
                    });

                    // Configurar evento onGanttRender para inicializar updateParentDuration
                    gantt.attachEvent("onGanttRender", function() {
                        const tasks = gantt.getTaskByTime();
                        tasks.forEach(task => {
                            if (!task.parent) {
                                updateParentDuration(task.id);
                            }
                        });

                        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
                            checkbox.addEventListener('change', function() {
                                const taskId = this.dataset.taskId;
                                const task = gantt.getTask(taskId);
                                if (this.checked) {
                                    task.checklist.push(true);
                                } else {
                                    task.checklist = task.checklist.filter(item => item !== true);
                                }
                            });
                        });
                    });

                    //NOMBRE: AGREGAR RESPONSABLE
                    // Función para actualizar las opciones de responsable en función del padre seleccionado
                    gantt.attachEvent("onLightbox", function (taskId) {
                        const select = document.querySelector(".gantt_cal_ltext select");
                    
                        // Buscar la tarea seleccionada
                        const task = gantt.getTask(taskId);
                    
                        if (task) {
                            let parentTask = null;
                            // Buscar la tarea padre correspondiente
                            gantt.eachTask(function (taskItem) {
                                if (taskItem.id === task.parent) {
                                    parentTask = taskItem;
                                    return false; // Detener la iteración cuando se encuentra la tarea padre
                                }
                            });
                    
                            if (parentTask) {
                                // Si la tarea tiene un padre
                                if (parentTask.responsible) {
                                    // Si el padre tiene un responsable definido, mostrar las opciones según el responsable del padre
                                    const options = taskResponsibles[parentTask.responsible] || [];
                                    select.innerHTML = "";
                                    options.forEach(option => {
                                        const newOption = document.createElement("option");
                                        newOption.value = option;
                                        newOption.text = option;
                                        select.add(newOption);
                                    });
                                } else {
                                    // Si el padre no tiene un responsable definido, mostrar un mensaje de advertencia
                                    select.innerHTML = "";
                                    const warningOption = document.createElement("option");
                                    warningOption.value = "";
                                    warningOption.text = "COLOCAR ÁREA EN TAREA PADRE";
                                    select.add(warningOption);
                                }
                            } else {
                                // Si la tarea no tiene padre (es una tarea principal), mostrar todas las opciones de responsables
                                select.innerHTML = "";
                                Object.keys(taskResponsibles).forEach(key => {
                                    const newOption = document.createElement("option");
                                    newOption.value = key;
                                    newOption.text = key;
                                    select.add(newOption);
                                });
                            }
                        } else {
                            // Si la tarea no se encuentra, mostrar las listas de responsables por defecto
                            select.innerHTML = "";
                            Object.keys(taskResponsibles).forEach(key => {
                                const newOption = document.createElement("option");
                                newOption.value = key;
                                newOption.text = key;
                                select.add(newOption);
                            });
                        }   
                    });

                    // DEPENDENCIAS - POR SI ALGUNA SUBTAREA ES MODIFICADA EN FECHAS O DURACION - ESTABLECER NUEVAS FECHAS DE INICIO Y FIN
                    gantt.attachEvent("onAfterTaskUpdate", function(taskId, task) {
                        const isIncreasing = task.end_date > task.start_date;
                        const taskDuration = task.duration;
                        //SI LA SUBTAREA ACTUALIZADA ES LA 1
                        if (taskId.includes("subtask_0")) {
                            duration_subtask_1 = taskDuration;

                            const task2Id = taskId.replace("subtask_0", "subtask_2");
                            const task2 = gantt.getTask(task2Id);
                            const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                            const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_2), isIncreasing);
                            if (task2) {
                                task2.start_date = newStartDate;
                                task2.end_date = newEndDate;
                                gantt.refreshTask(task2Id);
                    
                                const task3Id = task2Id.replace("subtask_2", "subtask_3");
                                const task3 = gantt.getTask(task3Id);
                                if (task3) {
                                    const task3StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newEndDate, 0), isIncreasing);
                                    const task3EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task3StartDate, duration_subtask_3), isIncreasing);
                                    task3.start_date = task3StartDate;
                                    task3.end_date = task3EndDate;
                                    gantt.refreshTask(task3Id);
                    
                                    const task4Id = task3Id.replace("subtask_3", "subtask_4");
                                    const task4 = gantt.getTask(task4Id);
                                    if (task4) {
                                        const task4StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task3EndDate, 0), isIncreasing);
                                        const task4EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task4StartDate, duration_subtask_4), isIncreasing);
                                        task4.start_date = task4StartDate;
                                        task4.end_date = task4EndDate;
                                        gantt.refreshTask(task4Id);
                    
                                        const task5Id = task4Id.replace("subtask_4", "subtask_5");
                                        const task5 = gantt.getTask(task5Id);
                                        if (task5) {
                                            const task5StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task4EndDate, 0), isIncreasing);
                                            const task5EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task5StartDate, duration_subtask_5), isIncreasing);
                                            task5.start_date = task5StartDate;
                                            task5.end_date = task5EndDate;
                                            gantt.refreshTask(task5Id);
                    
                                            const task6Id = task5Id.replace("subtask_5", "subtask_6");
                                            const task6 = gantt.getTask(task6Id);
                                            if (task6) {
                                                const task6StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task5EndDate, 0), isIncreasing);
                                                const task6EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task6StartDate, duration_subtask_6), isIncreasing);
                                                task6.start_date = task6StartDate;
                                                task6.end_date = task6EndDate;
                                                gantt.refreshTask(task6Id);
                    
                                                const task7Id = task6Id.replace("subtask_6", "subtask_7");
                                                const task7 = gantt.getTask(task7Id);
                                                if (task7) {
                                                    const task7StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task6EndDate, 0), isIncreasing);
                                                    const task7EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task7StartDate, duration_subtask_7), isIncreasing);
                                                    task7.start_date = task7StartDate;
                                                    task7.end_date = task7EndDate;
                                                    gantt.refreshTask(task7Id);
                    
                                                    const task8Id = task7Id.replace("subtask_7", "subtask_8");
                                                    const task8 = gantt.getTask(task8Id);
                                                    if (task8) {
                                                        const task8StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task7EndDate, 0), isIncreasing);
                                                        const task8EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8StartDate, duration_subtask_8), isIncreasing);
                                                        task8.start_date = task8StartDate;
                                                        task8.end_date = task8EndDate;
                                                        gantt.refreshTask(task8Id);
                    
                                                        const task9Id = task8Id.replace("subtask_8", "subtask_9");
                                                        const task9 =gantt.getTask(task9Id);
                                                        if (task9) {
                                                            const task9StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8EndDate, 0), isIncreasing);
                                                            const task9EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9StartDate, duration_subtask_9), isIncreasing);
                                                            task9.start_date = task9StartDate;
                                                            task9.end_date = task9EndDate;
                                                            gantt.refreshTask(task9Id);
                    
                                                            const task10Id = task9Id.replace("subtask_9", "subtask_10");
                                                            const task10 = gantt.getTask(task10Id);
                                                            if (task10) {
                                                                const task10StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9EndDate, 0), isIncreasing);
                                                                const task10EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10StartDate, duration_subtask_10), isIncreasing);
                                                                task10.start_date = task10StartDate;
                                                                task10.end_date = task10EndDate;
                                                                gantt.refreshTask(task10Id);
                    
                                                                const task11Id = task10Id.replace("subtask_10", "subtask_11");
                                                                const task11 = gantt.getTask(task11Id);
                                                                if (task11) {
                                                                    const task11StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10EndDate, 0), isIncreasing);
                                                                    const task11EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11StartDate, duration_subtask_11), isIncreasing);
                                                                    task11.start_date = task11StartDate;
                                                                    task11.end_date = task11EndDate;
                                                                    gantt.refreshTask(task11Id);
                    
                                                                    const task12Id = task11Id.replace("subtask_11", "subtask_12");
                                                                    const task12 = gantt.getTask(task12Id);
                                                                    if (task12) {
                                                                        const task12StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11EndDate, 0), isIncreasing);
                                                                        const task12EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12StartDate, duration_subtask_12), isIncreasing);
                                                                        task12.start_date = task12StartDate;
                                                                        task12.end_date = task12EndDate;
                                                                        gantt.refreshTask(task12Id);
                    
                                                                        const task13Id = task12Id.replace("subtask_12", "subtask_13");
                                                                        const task13 = gantt.getTask(task13Id);
                                                                        if (task13) {
                                                                            const task13StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12EndDate, 0), isIncreasing);
                                                                            const task13EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13StartDate, duration_subtask_13), isIncreasing);
                                                                            task13.start_date = task13StartDate;
                                                                            task13.end_date = task13EndDate;
                                                                            gantt.refreshTask(task13Id);
                    
                                                                            const task14Id = task13Id.replace("subtask_13", "subtask_14");
                                                                            const task14 = gantt.getTask(task14Id);
                                                                            if (task14) {
                                                                                const task14StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13EndDate, 0), isIncreasing);
                                                                                const task14EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14StartDate, duration_subtask_14), isIncreasing);
                                                                                task14.start_date = task14StartDate;
                                                                                task14.end_date = task14EndDate;
                                                                                gantt.refreshTask(task14Id);
                    
                                                                                const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                                                                const task15 = gantt.getTask(task15Id);
                                                                                if (task15) {
                                                                                    const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14EndDate, 0), isIncreasing);
                                                                                    const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                                                                    task15.start_date = task15StartDate;
                                                                                    task15.end_date = task15EndDate;
                                                                                    gantt.refreshTask(task15Id);
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 2
                        } else if (taskId.includes("subtask_2")) {
                            duration_subtask_2 = taskDuration;
                    
                            const task3Id = taskId.replace("subtask_2", "subtask_3");
                            const task3 = gantt.getTask(task3Id);
                            if (task3) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_3), isIncreasing);
                                task3.start_date = newStartDate;
                                task3.end_date = newEndDate;
                                gantt.refreshTask(task3Id);

                                const task4Id = task3Id.replace("subtask_3", "subtask_4");
                                const task4 = gantt.getTask(task4Id);
                                if (task4) {
                                    const task4StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task3.end_date, 0), isIncreasing);
                                    const task4EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task4StartDate, duration_subtask_4), isIncreasing);
                                    task4.start_date = task4StartDate;
                                    task4.end_date = task4EndDate;
                                    gantt.refreshTask(task4Id);

                                    const task5Id = task4Id.replace("subtask_4", "subtask_5");
                                    const task5 = gantt.getTask(task5Id);
                                    if (task5) {
                                        const task5StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task4.end_date, 0), isIncreasing);
                                        const task5EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task5StartDate, duration_subtask_5), isIncreasing);
                                        task5.start_date = task5StartDate;
                                        task5.end_date = task5EndDate;
                                        gantt.refreshTask(task5Id);

                                        const task6Id = task5Id.replace("subtask_5", "subtask_6");
                                        const task6 = gantt.getTask(task6Id);
                                        if (task6) {
                                            const task6StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task5.end_date, 0), isIncreasing);
                                            const task6EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task6StartDate, duration_subtask_6), isIncreasing);
                                            task6.start_date = task6StartDate;
                                            task6.end_date = task6EndDate;
                                            gantt.refreshTask(task6Id);

                                            const task7Id = task6Id.replace("subtask_6", "subtask_7");
                                            const task7 = gantt.getTask(task7Id);
                                            if (task7) {
                                                const task7StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task6.end_date, 0), isIncreasing);
                                                const task7EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task7StartDate, duration_subtask_7), isIncreasing);
                                                task7.start_date = task7StartDate;
                                                task7.end_date = task7EndDate;
                                                gantt.refreshTask(task7Id);

                                                const task8Id = task7Id.replace("subtask_7", "subtask_8");
                                                const task8 = gantt.getTask(task8Id);
                                                if (task8) {
                                                    const task8StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task7.end_date, 0), isIncreasing);
                                                    const task8EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8StartDate, duration_subtask_8), isIncreasing);
                                                    task8.start_date = task8StartDate;
                                                    task8.end_date = task8EndDate;
                                                    gantt.refreshTask(task8Id);

                                                    const task9Id = task8Id.replace("subtask_8", "subtask_9");
                                                    const task9 = gantt.getTask(task9Id);
                                                    if (task9) {
                                                        const task9StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8.end_date, 0), isIncreasing);
                                                        const task9EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9StartDate, duration_subtask_9), isIncreasing);
                                                        task9.start_date = task9StartDate;
                                                        task9.end_date = task9EndDate;
                                                        gantt.refreshTask(task9Id);

                                                        const task10Id = task9Id.replace("subtask_9", "subtask_10");
                                                        const task10 = gantt.getTask(task10Id);
                                                        if (task10) {
                                                            const task10StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9.end_date, 0), isIncreasing);
                                                            const task10EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10StartDate, duration_subtask_10), isIncreasing);
                                                            task10.start_date = task10StartDate;
                                                            task10.end_date = task10EndDate;
                                                            gantt.refreshTask(task10Id);

                                                            const task11Id = task10Id.replace("subtask_10", "subtask_11");
                                                            const task11 = gantt.getTask(task11Id);
                                                            if (task11) {
                                                                const task11StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10.end_date, 0), isIncreasing);
                                                                const task11EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11StartDate, duration_subtask_11), isIncreasing);
                                                                task11.start_date = task11StartDate;
                                                                task11.end_date = task11EndDate;
                                                                gantt.refreshTask(task11Id);

                                                                const task12Id = task11Id.replace("subtask_11", "subtask_12");
                                                                const task12 = gantt.getTask(task12Id);
                                                                if (task12) {
                                                                    const task12StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11.end_date, 0), isIncreasing);
                                                                    const task12EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12StartDate, duration_subtask_12), isIncreasing);
                                                                    task12.start_date = task12StartDate;
                                                                    task12.end_date = task12EndDate;
                                                                    gantt.refreshTask(task12Id);

                                                                    const task13Id = task12Id.replace("subtask_12", "subtask_13");
                                                                    const task13 = gantt.getTask(task13Id);
                                                                    if (task13) {
                                                                        const task13StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12.end_date, 0), isIncreasing);
                                                                        const task13EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13StartDate, duration_subtask_13), isIncreasing);
                                                                        task13.start_date = task13StartDate;
                                                                        task13.end_date = task13EndDate;
                                                                        gantt.refreshTask(task13Id);

                                                                        const task14Id = task13Id.replace("subtask_13", "subtask_14");
                                                                        const task14 = gantt.getTask(task14Id);
                                                                        if (task14) {
                                                                            const task14StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13.end_date, 0), isIncreasing);
                                                                            const task14EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14StartDate, duration_subtask_14), isIncreasing);
                                                                            task14.start_date = task14StartDate;
                                                                            task14.end_date = task14EndDate;
                                                                            gantt.refreshTask(task14Id);

                                                                            const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                                                            const task15 = gantt.getTask(task15Id);
                                                                            if (task15) {
                                                                                const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14.end_date, 0), isIncreasing);
                                                                                const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                                                                task15.start_date = task15StartDate;
                                                                                task15.end_date = task15EndDate;
                                                                                gantt.refreshTask(task15Id);
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 3
                        } else if (taskId.includes("subtask_3")) {
                            duration_subtask_3 = taskDuration;

                            const task4Id = taskId.replace("subtask_3", "subtask_4");
                            const task4 = gantt.getTask(task4Id);
                            if (task4) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_4), isIncreasing);
                                task4.start_date = newStartDate;
                                task4.end_date = newEndDate;
                                gantt.refreshTask(task4Id);

                                const task5Id = task4Id.replace("subtask_4", "subtask_5");
                                const task5 = gantt.getTask(task5Id);
                                if (task5) {
                                    const task5StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task4.end_date, 0), isIncreasing);
                                    const task5EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task5StartDate, duration_subtask_5), isIncreasing);
                                    task5.start_date = task5StartDate;
                                    task5.end_date = task5EndDate;
                                    gantt.refreshTask(task5Id);

                                    const task6Id = task5Id.replace("subtask_5", "subtask_6");
                                    const task6 = gantt.getTask(task6Id);
                                    if (task6) {
                                        const task6StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task5.end_date, 0), isIncreasing);
                                        const task6EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task6StartDate, duration_subtask_6), isIncreasing);
                                        task6.start_date = task6StartDate;
                                        task6.end_date = task6EndDate;
                                        gantt.refreshTask(task6Id);

                                        const task7Id = task6Id.replace("subtask_6", "subtask_7");
                                        const task7 = gantt.getTask(task7Id);
                                        if (task7) {
                                            const task7StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task6.end_date, 0), isIncreasing);
                                            const task7EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task7StartDate, duration_subtask_7), isIncreasing);
                                            task7.start_date = task7StartDate;
                                            task7.end_date = task7EndDate;
                                            gantt.refreshTask(task7Id);

                                            const task8Id = task7Id.replace("subtask_7", "subtask_8");
                                            const task8 = gantt.getTask(task8Id);
                                            if (task8) {
                                                const task8StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task7.end_date, 0), isIncreasing);
                                                const task8EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8StartDate, duration_subtask_8), isIncreasing);
                                                task8.start_date = task8StartDate;
                                                task8.end_date = task8EndDate;
                                                gantt.refreshTask(task8Id);

                                                const task9Id = task8Id.replace("subtask_8", "subtask_9");
                                                const task9 = gantt.getTask(task9Id);
                                                if (task9) {
                                                    const task9StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8.end_date, 0), isIncreasing);
                                                    const task9EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9StartDate, duration_subtask_9), isIncreasing);
                                                    task9.start_date = task9StartDate;
                                                    task9.end_date = task9EndDate;
                                                    gantt.refreshTask(task9Id);

                                                    const task10Id = task9Id.replace("subtask_9", "subtask_10");
                                                    const task10 = gantt.getTask(task10Id);
                                                    if (task10) {
                                                        const task10StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9.end_date, 0), isIncreasing);
                                                        const task10EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10StartDate, duration_subtask_10), isIncreasing);
                                                        task10.start_date = task10StartDate;
                                                        task10.end_date = task10EndDate;
                                                        gantt.refreshTask(task10Id);

                                                        const task11Id = task10Id.replace("subtask_10", "subtask_11");
                                                        const task11 = gantt.getTask(task11Id);
                                                        if (task11) {
                                                            const task11StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10.end_date, 0), isIncreasing);
                                                            const task11EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11StartDate, duration_subtask_11), isIncreasing);
                                                            task11.start_date = task11StartDate;
                                                            task11.end_date = task11EndDate;
                                                            gantt.refreshTask(task11Id);

                                                            const task12Id = task11Id.replace("subtask_11", "subtask_12");
                                                            const task12 = gantt.getTask(task12Id);
                                                            if (task12) {
                                                                const task12StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11.end_date, 0), isIncreasing);
                                                                const task12EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12StartDate, duration_subtask_12), isIncreasing);
                                                                task12.start_date = task12StartDate;
                                                                task12.end_date = task12EndDate;
                                                                gantt.refreshTask(task12Id);

                                                                const task13Id = task12Id.replace("subtask_12", "subtask_13");
                                                                const task13 = gantt.getTask(task13Id);
                                                                if (task13) {
                                                                    const task13StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12.end_date, 0), isIncreasing);
                                                                    const task13EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13StartDate, duration_subtask_13), isIncreasing);
                                                                    task13.start_date = task13StartDate;
                                                                    task13.end_date = task13EndDate;
                                                                    gantt.refreshTask(task13Id);

                                                                    const task14Id = task13Id.replace("subtask_13", "subtask_14");
                                                                    const task14 = gantt.getTask(task14Id);
                                                                    if (task14) {
                                                                        const task14StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13.end_date, 0), isIncreasing);
                                                                        const task14EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14StartDate, duration_subtask_14), isIncreasing);
                                                                        task14.start_date = task14StartDate;
                                                                        task14.end_date = task14EndDate;
                                                                        gantt.refreshTask(task14Id);

                                                                        const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                                                        const task15 = gantt.getTask(task15Id);
                                                                        if (task15) {
                                                                            const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14.end_date, 0), isIncreasing);
                                                                            const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                                                            task15.start_date = task15StartDate;
                                                                            task15.end_date = task15EndDate;
                                                                            gantt.refreshTask(task15Id);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 4
                        } else if (taskId.includes("subtask_4")) {
                            duration_subtask_4 = taskDuration;

                            const task5Id = taskId.replace("subtask_4", "subtask_5");
                            const task5 = gantt.getTask(task5Id);
                            if (task5) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_5), isIncreasing);
                                task5.start_date = newStartDate;
                                task5.end_date = newEndDate;
                                gantt.refreshTask(task5Id);

                                const task6Id = task5Id.replace("subtask_5", "subtask_6");
                                const task6 = gantt.getTask(task6Id);
                                if (task6) {
                                    const task6StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task5.end_date, 0), isIncreasing);
                                    const task6EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task6StartDate, duration_subtask_6), isIncreasing);
                                    task6.start_date = task6StartDate;
                                    task6.end_date = task6EndDate;
                                    gantt.refreshTask(task6Id);

                                    const task7Id = task6Id.replace("subtask_6", "subtask_7");
                                    const task7 = gantt.getTask(task7Id);
                                    if (task7) {
                                        const task7StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task6.end_date, 0), isIncreasing);
                                        const task7EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task7StartDate, duration_subtask_7), isIncreasing);
                                        task7.start_date = task7StartDate;
                                        task7.end_date = task7EndDate;
                                        gantt.refreshTask(task7Id);

                                        const task8Id = task7Id.replace("subtask_7", "subtask_8");
                                        const task8 = gantt.getTask(task8Id);
                                        if (task8) {
                                            const task8StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task7.end_date, 0), isIncreasing);
                                            const task8EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8StartDate, duration_subtask_8), isIncreasing);
                                            task8.start_date = task8StartDate;
                                            task8.end_date = task8EndDate;
                                            gantt.refreshTask(task8Id);

                                            const task9Id = task8Id.replace("subtask_8", "subtask_9");
                                            const task9 = gantt.getTask(task9Id);
                                            if (task9) {
                                                const task9StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8.end_date, 0), isIncreasing);
                                                const task9EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9StartDate, duration_subtask_9), isIncreasing);
                                                task9.start_date = task9StartDate;
                                                task9.end_date = task9EndDate;
                                                gantt.refreshTask(task9Id);

                                                const task10Id = task9Id.replace("subtask_9", "subtask_10");
                                                const task10 = gantt.getTask(task10Id);
                                                if (task10) {
                                                    const task10StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9.end_date, 0), isIncreasing);
                                                    const task10EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10StartDate, duration_subtask_10), isIncreasing);
                                                    task10.start_date = task10StartDate;
                                                    task10.end_date = task10EndDate;
                                                    gantt.refreshTask(task10Id);

                                                    const task11Id = task10Id.replace("subtask_10", "subtask_11");
                                                    const task11 = gantt.getTask(task11Id);
                                                    if (task11) {
                                                        const task11StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10.end_date, 0), isIncreasing);
                                                        const task11EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11StartDate, duration_subtask_11), isIncreasing);
                                                        task11.start_date = task11StartDate;
                                                        task11.end_date = task11EndDate;
                                                        gantt.refreshTask(task11Id);

                                                        const task12Id = task11Id.replace("subtask_11", "subtask_12");
                                                        const task12 = gantt.getTask(task12Id);
                                                        if (task12) {
                                                            const task12StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11.end_date, 0), isIncreasing);
                                                            const task12EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12StartDate, duration_subtask_12), isIncreasing);
                                                            task12.start_date = task12StartDate;
                                                            task12.end_date = task12EndDate;
                                                            gantt.refreshTask(task12Id);

                                                            const task13Id = task12Id.replace("subtask_12", "subtask_13");
                                                            const task13 = gantt.getTask(task13Id);
                                                            if (task13) {
                                                                const task13StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12.end_date, 0), isIncreasing);
                                                                const task13EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13StartDate, duration_subtask_13), isIncreasing);
                                                                task13.start_date = task13StartDate;
                                                                task13.end_date = task13EndDate;
                                                                gantt.refreshTask(task13Id);

                                                                const task14Id = task13Id.replace("subtask_13", "subtask_14");
                                                                const task14 = gantt.getTask(task14Id);
                                                                if (task14) {
                                                                    const task14StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13.end_date, 0), isIncreasing);
                                                                    const task14EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14StartDate, duration_subtask_14), isIncreasing);
                                                                    task14.start_date = task14StartDate;
                                                                    task14.end_date = task14EndDate;
                                                                    gantt.refreshTask(task14Id);

                                                                    const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                                                    const task15 = gantt.getTask(task15Id);
                                                                    if (task15) {
                                                                        const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14.end_date, 0), isIncreasing);
                                                                        const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                                                        task15.start_date = task15StartDate;
                                                                        task15.end_date = task15EndDate;
                                                                        gantt.refreshTask(task15Id);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 5
                        } else if (taskId.includes("subtask_5")) {
                            duration_subtask_5 = taskDuration;

                            const task6Id = taskId.replace("subtask_5", "subtask_6");
                            const task6 = gantt.getTask(task6Id);
                            if (task6) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_6), isIncreasing);
                                task6.start_date = newStartDate;
                                task6.end_date = newEndDate;
                                gantt.refreshTask(task6Id);

                                const task7Id = task6Id.replace("subtask_6", "subtask_7");
                                const task7 = gantt.getTask(task7Id);
                                if (task7) {
                                    const task7StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task6.end_date, 0), isIncreasing);
                                    const task7EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task7StartDate, duration_subtask_7), isIncreasing);
                                    task7.start_date = task7StartDate;
                                    task7.end_date = task7EndDate;
                                    gantt.refreshTask(task7Id);

                                    const task8Id = task7Id.replace("subtask_7", "subtask_8");
                                    const task8 = gantt.getTask(task8Id);
                                    if (task8) {
                                        const task8StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task7.end_date, 0), isIncreasing);
                                        const task8EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8StartDate, duration_subtask_8), isIncreasing);
                                        task8.start_date = task8StartDate;
                                        task8.end_date = task8EndDate;
                                        gantt.refreshTask(task8Id);

                                        const task9Id = task8Id.replace("subtask_8", "subtask_9");
                                        const task9 = gantt.getTask(task9Id);
                                        if (task9) {
                                            const task9StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8.end_date, 0), isIncreasing);
                                            const task9EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9StartDate, duration_subtask_9), isIncreasing);
                                            task9.start_date = task9StartDate;
                                            task9.end_date = task9EndDate;
                                            gantt.refreshTask(task9Id);

                                            const task10Id = task9Id.replace("subtask_9", "subtask_10");
                                            const task10 = gantt.getTask(task10Id);
                                            if (task10) {
                                                const task10StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9.end_date, 0), isIncreasing);
                                                const task10EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10StartDate, duration_subtask_10), isIncreasing);
                                                task10.start_date = task10StartDate;
                                                task10.end_date = task10EndDate;
                                                gantt.refreshTask(task10Id);

                                                const task11Id = task10Id.replace("subtask_10", "subtask_11");
                                                const task11 = gantt.getTask(task11Id);
                                                if (task11) {
                                                    const task11StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10.end_date, 0), isIncreasing);
                                                    const task11EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11StartDate, duration_subtask_11), isIncreasing);
                                                    task11.start_date = task11StartDate;
                                                    task11.end_date = task11EndDate;
                                                    gantt.refreshTask(task11Id);

                                                    const task12Id = task11Id.replace("subtask_11", "subtask_12");
                                                    const task12 = gantt.getTask(task12Id);
                                                    if (task12) {
                                                        const task12StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11.end_date, 0), isIncreasing);
                                                        const task12EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12StartDate, duration_subtask_12), isIncreasing);
                                                        task12.start_date = task12StartDate;
                                                        task12.end_date = task12EndDate;
                                                        gantt.refreshTask(task12Id);

                                                        const task13Id = task12Id.replace("subtask_12", "subtask_13");
                                                        const task13 = gantt.getTask(task13Id);
                                                        if (task13) {
                                                            const task13StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12.end_date, 0), isIncreasing);
                                                            const task13EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13StartDate, duration_subtask_13), isIncreasing);
                                                            task13.start_date = task13StartDate;
                                                            task13.end_date = task13EndDate;
                                                            gantt.refreshTask(task13Id);

                                                            const task14Id = task13Id.replace("subtask_13", "subtask_14");
                                                            const task14 = gantt.getTask(task14Id);
                                                            if (task14) {
                                                                const task14StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13.end_date, 0), isIncreasing);
                                                                const task14EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14StartDate, duration_subtask_14), isIncreasing);
                                                                task14.start_date = task14StartDate;
                                                                task14.end_date = task14EndDate;
                                                                gantt.refreshTask(task14Id);

                                                                const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                                                const task15 = gantt.getTask(task15Id);
                                                                if (task15) {
                                                                    const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14.end_date, 0), isIncreasing);
                                                                    const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                                                    task15.start_date = task15StartDate;
                                                                    task15.end_date = task15EndDate;
                                                                    gantt.refreshTask(task15Id);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 6 
                        } else if (taskId.includes("subtask_6")) {
                            duration_subtask_6 = taskDuration;

                            const task7Id = taskId.replace("subtask_6", "subtask_7");
                            const task7 = gantt.getTask(task7Id);
                            if (task7) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_7), isIncreasing);
                                task7.start_date = newStartDate;
                                task7.end_date = newEndDate;
                                gantt.refreshTask(task7Id);

                                const task8Id = task7Id.replace("subtask_7", "subtask_8");
                                const task8 = gantt.getTask(task8Id);
                                if (task8) {
                                    const task8StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task7.end_date, 0), isIncreasing);
                                    const task8EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8StartDate, duration_subtask_8), isIncreasing);
                                    task8.start_date = task8StartDate;
                                    task8.end_date = task8EndDate;
                                    gantt.refreshTask(task8Id);

                                    const task9Id = task8Id.replace("subtask_8", "subtask_9");
                                    const task9 = gantt.getTask(task9Id);
                                    if (task9) {
                                        const task9StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8.end_date, 0), isIncreasing);
                                        const task9EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9StartDate, duration_subtask_9), isIncreasing);
                                        task9.start_date = task9StartDate;
                                        task9.end_date = task9EndDate;
                                        gantt.refreshTask(task9Id);

                                        const task10Id = task9Id.replace("subtask_9", "subtask_10");
                                        const task10 = gantt.getTask(task10Id);
                                        if (task10) {
                                            const task10StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9.end_date, 0), isIncreasing);
                                            const task10EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10StartDate, duration_subtask_10), isIncreasing);
                                            task10.start_date = task10StartDate;
                                            task10.end_date = task10EndDate;
                                            gantt.refreshTask(task10Id);

                                            const task11Id = task10Id.replace("subtask_10", "subtask_11");
                                            const task11 = gantt.getTask(task11Id);
                                            if (task11) {
                                                const task11StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10.end_date, 0), isIncreasing);
                                                const task11EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11StartDate, duration_subtask_11), isIncreasing);
                                                task11.start_date = task11StartDate;
                                                task11.end_date = task11EndDate;
                                                gantt.refreshTask(task11Id);

                                                const task12Id = task11Id.replace("subtask_11", "subtask_12");
                                                const task12 = gantt.getTask(task12Id);
                                                if (task12) {
                                                    const task12StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11.end_date, 0), isIncreasing);
                                                    const task12EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12StartDate, duration_subtask_12), isIncreasing);
                                                    task12.start_date = task12StartDate;
                                                    task12.end_date = task12EndDate;
                                                    gantt.refreshTask(task12Id);

                                                    const task13Id = task12Id.replace("subtask_12", "subtask_13");
                                                    const task13 = gantt.getTask(task13Id);
                                                    if (task13) {
                                                        const task13StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12.end_date, 0), isIncreasing);
                                                        const task13EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13StartDate, duration_subtask_13), isIncreasing);
                                                        task13.start_date = task13StartDate;
                                                        task13.end_date = task13EndDate;
                                                        gantt.refreshTask(task13Id);

                                                        const task14Id = task13Id.replace("subtask_13", "subtask_14");
                                                        const task14 = gantt.getTask(task14Id);
                                                        if (task14) {
                                                            const task14StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13.end_date, 0), isIncreasing);
                                                            const task14EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14StartDate, duration_subtask_14), isIncreasing);
                                                            task14.start_date = task14StartDate;
                                                            task14.end_date = task14EndDate;
                                                            gantt.refreshTask(task14Id);

                                                            const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                                            const task15 = gantt.getTask(task15Id);
                                                            if (task15) {
                                                                const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14.end_date, 0), isIncreasing);
                                                                const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                                                task15.start_date = task15StartDate;
                                                                task15.end_date = task15EndDate;
                                                                gantt.refreshTask(task15Id);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 7
                        } else if (taskId.includes("subtask_7")) {
                            duration_subtask_7 = taskDuration;

                            const task8Id = taskId.replace("subtask_7", "subtask_8");
                            const task8 = gantt.getTask(task8Id);
                            if (task8) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_8), isIncreasing);
                                task8.start_date = newStartDate;
                                task8.end_date = newEndDate;
                                gantt.refreshTask(task8Id);

                                const task9Id = task8Id.replace("subtask_8", "subtask_9");
                                const task9 = gantt.getTask(task9Id);
                                if (task9) {
                                    const task9StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task8.end_date, 0), isIncreasing);
                                    const task9EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9StartDate, duration_subtask_9), isIncreasing);
                                    task9.start_date = task9StartDate;
                                    task9.end_date = task9EndDate;
                                    gantt.refreshTask(task9Id);

                                    const task10Id = task9Id.replace("subtask_9", "subtask_10");
                                    const task10 = gantt.getTask(task10Id);
                                    if (task10) {
                                        const task10StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9.end_date, 0), isIncreasing);
                                        const task10EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10StartDate, duration_subtask_10), isIncreasing);
                                        task10.start_date = task10StartDate;
                                        task10.end_date = task10EndDate;
                                        gantt.refreshTask(task10Id);

                                        const task11Id = task10Id.replace("subtask_10", "subtask_11");
                                        const task11 = gantt.getTask(task11Id);
                                        if (task11) {
                                            const task11StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10.end_date, 0), isIncreasing);
                                            const task11EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11StartDate, duration_subtask_11), isIncreasing);
                                            task11.start_date = task11StartDate;
                                            task11.end_date = task11EndDate;
                                            gantt.refreshTask(task11Id);

                                            const task12Id = task11Id.replace("subtask_11", "subtask_12");
                                            const task12 = gantt.getTask(task12Id);
                                            if (task12) {
                                                const task12StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11.end_date, 0), isIncreasing);
                                                const task12EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12StartDate, duration_subtask_12), isIncreasing);
                                                task12.start_date = task12StartDate;
                                                task12.end_date = task12EndDate;
                                                gantt.refreshTask(task12Id);

                                                const task13Id = task12Id.replace("subtask_12", "subtask_13");
                                                const task13 = gantt.getTask(task13Id);
                                                if (task13) {
                                                    const task13StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12.end_date, 0), isIncreasing);
                                                    const task13EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13StartDate, duration_subtask_13), isIncreasing);
                                                    task13.start_date = task13StartDate;
                                                    task13.end_date = task13EndDate;
                                                    gantt.refreshTask(task13Id);

                                                    const task14Id = task13Id.replace("subtask_13", "subtask_14");
                                                    const task14 = gantt.getTask(task14Id);
                                                    if (task14) {
                                                        const task14StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13.end_date, 0), isIncreasing);
                                                        const task14EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14StartDate, duration_subtask_14), isIncreasing);
                                                        task14.start_date = task14StartDate;
                                                        task14.end_date = task14EndDate;
                                                        gantt.refreshTask(task14Id);

                                                        const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                                        const task15 = gantt.getTask(task15Id);
                                                        if (task15) {
                                                            const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14.end_date, 0), isIncreasing);
                                                            const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                                            task15.start_date = task15StartDate;
                                                            task15.end_date = task15EndDate;
                                                            gantt.refreshTask(task15Id);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 8
                        } else if (taskId.includes("subtask_8")) {
                            duration_subtask_8 = taskDuration;

                            const task9Id = taskId.replace("subtask_8", "subtask_9");
                            const task9 = gantt.getTask(task9Id);
                            if (task9) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_9), isIncreasing);
                                task9.start_date = newStartDate;
                                task9.end_date = newEndDate;
                                gantt.refreshTask(task9Id);

                                const task10Id = task9Id.replace("subtask_9", "subtask_10");
                                const task10 = gantt.getTask(task10Id);
                                if (task10) {
                                    const task10StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task9.end_date, 0), isIncreasing);
                                    const task10EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10StartDate, duration_subtask_10), isIncreasing);
                                    task10.start_date = task10StartDate;
                                    task10.end_date = task10EndDate;
                                    gantt.refreshTask(task10Id);

                                    const task11Id = task10Id.replace("subtask_10", "subtask_11");
                                    const task11 = gantt.getTask(task11Id);
                                    if (task11) {
                                        const task11StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10.end_date, 0), isIncreasing);
                                        const task11EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11StartDate, duration_subtask_11), isIncreasing);
                                        task11.start_date = task11StartDate;
                                        task11.end_date = task11EndDate;
                                        gantt.refreshTask(task11Id);

                                        const task12Id = task11Id.replace("subtask_11", "subtask_12");
                                        const task12 = gantt.getTask(task12Id);
                                        if (task12) {
                                            const task12StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11.end_date, 0), isIncreasing);
                                            const task12EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12StartDate, duration_subtask_12), isIncreasing);
                                            task12.start_date = task12StartDate;
                                            task12.end_date = task12EndDate;
                                            gantt.refreshTask(task12Id);

                                            const task13Id = task12Id.replace("subtask_12", "subtask_13");
                                            const task13 = gantt.getTask(task13Id);
                                            if (task13) {
                                                const task13StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12.end_date, 0), isIncreasing);
                                                const task13EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13StartDate, duration_subtask_13), isIncreasing);
                                                task13.start_date = task13StartDate;
                                                task13.end_date = task13EndDate;
                                                gantt.refreshTask(task13Id);

                                                const task14Id = task13Id.replace("subtask_13", "subtask_14");
                                                const task14 = gantt.getTask(task14Id);
                                                if (task14) {
                                                    const task14StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13.end_date, 0), isIncreasing);
                                                    const task14EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14StartDate, duration_subtask_14), isIncreasing);
                                                    task14.start_date = task14StartDate;
                                                    task14.end_date = task14EndDate;
                                                    gantt.refreshTask(task14Id);

                                                    const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                                    const task15 = gantt.getTask(task15Id);
                                                    if (task15) {
                                                        const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14.end_date, 0), isIncreasing);
                                                        const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                                        task15.start_date = task15StartDate;
                                                        task15.end_date = task15EndDate;
                                                        gantt.refreshTask(task15Id);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 9
                        } else if (taskId.includes("subtask_9")) {
                            duration_subtask_9 = taskDuration;

                            const task10Id = taskId.replace("subtask_9", "subtask_10");
                            const task10 = gantt.getTask(task10Id);
                            if (task10) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_10), isIncreasing);
                                task10.start_date = newStartDate;
                                task10.end_date = newEndDate;
                                gantt.refreshTask(task10Id);

                                const task11Id = task10Id.replace("subtask_10", "subtask_11");
                                const task11 = gantt.getTask(task11Id);
                                if (task11) {
                                    const task11StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task10.end_date, 0), isIncreasing);
                                    const task11EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11StartDate, duration_subtask_11), isIncreasing);
                                    task11.start_date = task11StartDate;
                                    task11.end_date = task11EndDate;
                                    gantt.refreshTask(task11Id);

                                    const task12Id = task11Id.replace("subtask_11", "subtask_12");
                                    const task12 = gantt.getTask(task12Id);
                                    if (task12) {
                                        const task12StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11.end_date, 0), isIncreasing);
                                        const task12EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12StartDate, duration_subtask_12), isIncreasing);
                                        task12.start_date = task12StartDate;
                                        task12.end_date = task12EndDate;
                                        gantt.refreshTask(task12Id);

                                        const task13Id = task12Id.replace("subtask_12", "subtask_13");
                                        const task13 = gantt.getTask(task13Id);
                                        if (task13) {
                                            const task13StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12.end_date, 0), isIncreasing);
                                            const task13EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13StartDate, duration_subtask_13), isIncreasing);
                                            task13.start_date = task13StartDate;
                                            task13.end_date = task13EndDate;
                                            gantt.refreshTask(task13Id);

                                            const task14Id = task13Id.replace("subtask_13", "subtask_14");
                                            const task14 = gantt.getTask(task14Id);
                                            if (task14) {
                                                const task14StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13.end_date, 0), isIncreasing);
                                                const task14EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14StartDate, duration_subtask_14), isIncreasing);
                                                task14.start_date = task14StartDate;
                                                task14.end_date = task14EndDate;
                                                gantt.refreshTask(task14Id);

                                                const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                                const task15 = gantt.getTask(task15Id);
                                                if (task15) {
                                                    const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14.end_date, 0), isIncreasing);
                                                    const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                                    task15.start_date = task15StartDate;
                                                    task15.end_date = task15EndDate;
                                                    gantt.refreshTask(task15Id);
                                                }
                                            }
                                        }
                                    }
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 10
                        } else if (taskId.includes("subtask_10")) {
                            duration_subtask_10 = taskDuration;

                            const task11Id = taskId.replace("subtask_10", "subtask_11");
                            const task11 = gantt.getTask(task11Id);
                            if (task11) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_11), isIncreasing);
                                task11.start_date = newStartDate;
                                task11.end_date = newEndDate;
                                gantt.refreshTask(task11Id);

                                const task12Id = task11Id.replace("subtask_11", "subtask_12");
                                const task12 = gantt.getTask(task12Id);
                                if (task12) {
                                    const task12StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task11.end_date, 0), isIncreasing);
                                    const task12EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12StartDate, duration_subtask_12), isIncreasing);
                                    task12.start_date = task12StartDate;
                                    task12.end_date = task12EndDate;
                                    gantt.refreshTask(task12Id);

                                    const task13Id = task12Id.replace("subtask_12", "subtask_13");
                                    const task13 = gantt.getTask(task13Id);
                                    if (task13) {
                                        const task13StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12.end_date, 0), isIncreasing);
                                        const task13EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13StartDate, duration_subtask_13), isIncreasing);
                                        task13.start_date = task13StartDate;
                                        task13.end_date = task13EndDate;
                                        gantt.refreshTask(task13Id);

                                        const task14Id = task13Id.replace("subtask_13", "subtask_14");
                                        const task14 = gantt.getTask(task14Id);
                                        if (task14) {
                                            const task14StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13.end_date, 0), isIncreasing);
                                            const task14EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14StartDate, duration_subtask_14), isIncreasing);
                                            task14.start_date = task14StartDate;
                                            task14.end_date = task14EndDate;
                                            gantt.refreshTask(task14Id);

                                            const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                            const task15 = gantt.getTask(task15Id);
                                            if (task15) {
                                                const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14.end_date, 0), isIncreasing);
                                                const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                                task15.start_date = task15StartDate;
                                                task15.end_date = task15EndDate;
                                                gantt.refreshTask(task15Id);
                                            }
                                        }
                                    }
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 11
                        } else if (taskId.includes("subtask_11")) {
                            duration_subtask_11 = taskDuration;

                            const task12Id = taskId.replace("subtask_11", "subtask_12");
                            const task12 = gantt.getTask(task12Id);
                            if (task12) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_12), isIncreasing);
                                task12.start_date = newStartDate;
                                task12.end_date = newEndDate;
                                gantt.refreshTask(task12Id);

                                const task13Id = task12Id.replace("subtask_12", "subtask_13");
                                const task13 = gantt.getTask(task13Id);
                                if (task13) {
                                    const task13StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task12.end_date, 0), isIncreasing);
                                    const task13EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13StartDate, duration_subtask_13), isIncreasing);
                                    task13.start_date = task13StartDate;
                                    task13.end_date = task13EndDate;
                                    gantt.refreshTask(task13Id);

                                    const task14Id = task13Id.replace("subtask_13", "subtask_14");
                                    const task14 = gantt.getTask(task14Id);
                                    if (task14) {
                                        const task14StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13.end_date, 0), isIncreasing);
                                        const task14EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14StartDate, duration_subtask_14), isIncreasing);
                                        task14.start_date = task14StartDate;
                                        task14.end_date = task14EndDate;
                                        gantt.refreshTask(task14Id);

                                        const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                        const task15 = gantt.getTask(task15Id);
                                        if (task15) {
                                            const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14.end_date, 0), isIncreasing);
                                            const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                            task15.start_date = task15StartDate;
                                            task15.end_date = task15EndDate;
                                            gantt.refreshTask(task15Id);
                                        }
                                    }
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 12
                        } else if (taskId.includes("subtask_12")) {
                            duration_subtask_12 = taskDuration;

                            const task13Id = taskId.replace("subtask_12", "subtask_13");
                            const task13 = gantt.getTask(task13Id);
                            if (task13) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_13), isIncreasing);
                                task13.start_date = newStartDate;
                                task13.end_date = newEndDate;
                                gantt.refreshTask(task13Id);

                                const task14Id = task13Id.replace("subtask_13", "subtask_14");
                                const task14 = gantt.getTask(task14Id);
                                if (task14) {
                                    const task14StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task13.end_date, 0), isIncreasing);
                                    const task14EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14StartDate, duration_subtask_14), isIncreasing);
                                    task14.start_date = task14StartDate;
                                    task14.end_date = task14EndDate;
                                    gantt.refreshTask(task14Id);

                                    const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                    const task15 = gantt.getTask(task15Id);
                                    if (task15) {
                                        const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14.end_date, 0), isIncreasing);
                                        const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                        task15.start_date = task15StartDate;
                                        task15.end_date = task15EndDate;
                                        gantt.refreshTask(task15Id);
                                    }
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 13
                        } else if (taskId.includes("subtask_13")) {
                            duration_subtask_13 = taskDuration;

                            const task14Id = taskId.replace("subtask_13", "subtask_14");
                            const task14 = gantt.getTask(task14Id);
                            if (task14) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_14), isIncreasing);
                                task14.start_date = newStartDate;
                                task14.end_date = newEndDate;
                                gantt.refreshTask(task14Id);

                                const task15Id = task14Id.replace("subtask_14", "subtask_15");
                                const task15 = gantt.getTask(task15Id);
                                if (task15) {
                                    const task15StartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task14.end_date, 0), isIncreasing);
                                    const task15EndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task15StartDate, duration_subtask_15), isIncreasing);
                                    task15.start_date = task15StartDate;
                                    task15.end_date = task15EndDate;
                                    gantt.refreshTask(task15Id);
                                }
                            } //SI LA SUBTAREA ACTUALIZADA ES LA 14
                        } else if (taskId.includes("subtask_14")) {
                            duration_subtask_14 = taskDuration;

                            const task15Id = taskId.replace("subtask_14", "subtask_15");
                            const task15 = gantt.getTask(task15Id);
                            if (task15) {
                                const newStartDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(task.end_date, 0), isIncreasing);
                                const newEndDate = adjustDateForWeekends(calculateEndDateWithoutWeekends(newStartDate, duration_subtask_15), isIncreasing);
                                task15.start_date = newStartDate;
                                task15.end_date = newEndDate;
                                gantt.refreshTask(task15Id);
                            }
                            //SI LA SUBTAREA ACTUALIZADA ES LA 15
                        } else if (taskId.includes("subtask_15")) {
                            duration_subtask_15 = taskDuration;
                        }

                        const parentTaskId = gantt.getTask(taskId).parent;
                        if (gantt.isTaskExists(parentTaskId)) {
                            updateParentDuration(parentTaskId);
                        }
                    });

                    // COMPARAR FECHAS FIN/IDEAL DE TAREAS PADRES Y SUBTAREAS
                    function checkTaskDates() {
                        const tasks = gantt.getTaskByTime();
                        tasks.forEach(task => {
                            if (!task.parent) { // Si es una tarea padre
                                const parentEndDate = gantt.date.add(task.original_new_end_date, 1, "day");
                                const subtasks = gantt.getChildren(task.id);
                                let isOutOfTime = false;
                                subtasks.forEach(subtaskId => {
                                    const subtask = gantt.getTask(subtaskId);
                                    if (subtask.text.includes("Reporte de pruebas (Rutina o Dossier)")) {
                                        const subtaskEndDate = subtask.end_date;
                                        if (parentEndDate < subtaskEndDate) {
                                            isOutOfTime = true;
                                        }
                                    }
                                });
                    
                                const warningText = "Reduce tiempos";
                                const warningTextStyled = " <small style='font-size: 0.75em; color: red;'>" + warningText + "</small>";
                                if (isOutOfTime) {
                                    if (!task.text.includes(warningText)) {
                                        task.text = task.text + warningTextStyled;
                                    }
                                } else {
                                    if (task.text.includes(warningText)) {
                                        task.text = task.text.replace(warningTextStyled, "");
                                    }
                                }
                                gantt.refreshTask(task.id); // Actualizar la tarea para reflejar el cambio en el texto
                            }
                        });
                    }

                    // Llamar a checkTaskDates al inicializar el Gantt
                    gantt.attachEvent("onGanttRender", function() {
                        checkTaskDates();
                    });
                    
                    // Llamar a checkTaskDates en eventos de actualización de tareas
                    gantt.attachEvent("onAfterTaskAdd", function(id, item) {
                        checkTaskDates();
                    });
                    
                    gantt.attachEvent("onAfterTaskUpdate", function(id, item) {
                        checkTaskDates();
                    });
                    
                    gantt.attachEvent("onAfterTaskDelete", function(id, item) {
                        checkTaskDates();
                    });

                    gantt.parse({ data });
                    gantt.templates.task_class = function(start, end, task) {
                        return task.css;
                    };

                </script>
            </body>
        </html>
    `;
    newWindow.document.write(newContent);
    newWindow.document.close();
}

//FUNCION PARA BUSCAR UN PROYECTO - POR NOMBRE DE CLIENTE
function searchProjects() {
    const searchInput = document.querySelector('input[type="text"]');
    const searchText = searchInput.value.toLowerCase();
    const projectsContainer = document.getElementById("projectsContainer");
    //RECORRE CADA PROYECTO Y MUESTRA/OCULTA SEGUN LA BUSQUEDA
    Array.from(projectsContainer.children).forEach(project => {
        const projectName = project.textContent.toLowerCase();
        if (projectName.includes(searchText)) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
}

//FUNCION PARA FILTRAR ENTRE TODOS LO PROYECTOS Y AVIENTE EL BUSCADO
function filterProjects() {
    const searchTerm = document.querySelector('input[type="text"]').value.toLowerCase();
    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach((projectItem) => {
        const projectName = projectItem.textContent.toLowerCase();
        if (projectName.includes(searchTerm)) {
            projectItem.style.display = "block";
        } else {
            projectItem.style.display = "none";
        }
    });
}

//FUNCION PARA AGREGAR AQUI TODOS LOS PROYECTOS
function processPapa() {
    alert("Realizando Proceso PAPA");
    //PUEDES REALIZAR OTRAS ACCIONES RELACIONADAS CON EL PROCES PAPA AQUI
}

//PARA GUARDAR LOS CAMBIOS
function saveProject(clientName, totalItems, clientOrder, options, idItems, idColumna, difficulty, date, dateF) {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    const newProject = { clientName, totalItems, clientOrder, options, idItems, idColumna, difficulty, date, dateF};
    projects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const projectsContainer = document.getElementById("projectsContainer");

    projects.forEach(project => {
        // Crear un contenedor para el proyecto
        const projectWrapper = document.createElement("div");
        projectWrapper.className = "project-wrapper";

        // Crear un contenedor para el botón del proyecto
        const projectContainer = document.createElement("div");
        projectContainer.className = "project-item";

        // Crear un contenedor para la grafica del proyecto
        const graficaContainer = document.createElement("div");
        graficaContainer.className = "grafica-item";

        //Crear un contenedor para el boton de informacion
        const infoContainer = document.createElement("div");
        infoContainer.className = "info-item";

        // Agregar el proyecto como botón en el contenedor
        const projectButton = document.createElement("button");
        projectButton.className = "project-button";
        projectButton.textContent = project.clientName;

        //Crear boton de informacion
        const infoButton = document.createElement("Button");
        infoButton.className= "info-button";
        infoButton.textContent = "INFORMACIÓN";

        // Agregar el evento click para abrir la nueva ventana
        projectButton.addEventListener("click", () => openProjectWindow(project.clientName, project.totalItems, project.clientOrder, project.options, project.idItems, project.idColumna, project.difficulty, project.date, project.dateF));

        // Agregar el evento click para abrir el modal con la información del proyecto
        infoButton.addEventListener("click", () => displayProjectInfo(project));
        
        projectContainer.appendChild(projectButton); // Agregar el botón al contenedor
        projectWrapper.appendChild(projectContainer); // Agregar el contenedor del botón al contenedor del proyecto
        projectWrapper.appendChild(graficaContainer); //Agrega el contenedor de la grafica
        projectWrapper.appendChild(infoContainer); //Agrega el contenedor de informacion
        infoContainer.appendChild(infoButton); // Agrega el boton al su contenedor
        

        projectsContainer.appendChild(projectWrapper); // Agregar el contenedor del proyecto al contenedor principal
        
        // Incrementar el contador de proyectos
        const projectCount = document.getElementById("projectCount");
        projectCount.textContent = parseInt(projectCount.textContent) + 1;
    
    });
}

function displayProjectInfo(project) {
    // Obtener el modal
    const modal = document.getElementById("myModal");
    // Obtener el elemento span que cierra el modal
    const span = document.getElementsByClassName("close")[0];
    // Obtener el elemento donde se mostrará el contenido del modal
    const modalContent = document.getElementById("modalContent");
    // Crear el contenido del modal con los detalles del proyecto
    let modalHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif; color: #333;">
            <h2 style="text-align: center; color: #0056b3;">DETALLES DEL PROYECTO</h2>
            <br>
            <p><strong>Cliente:</strong> ${project.clientName}</p>
            <p><strong>Orden de venta:</strong> ${project.clientOrder}</p>
            <p><strong>Número de tableros:</strong> ${project.totalItems}</p>
            <br>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <thead>
                    <tr style="background-color: #f2f2f2; color: #333;">
                        <th style="padding: 10px; border: 1px solid #ddd;">Tablero</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Nombre</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Columnas</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Item</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Dificultad</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Fecha de inicio</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Fecha de fin</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    //AGREGAR INFORMACION DE CADA TABLERO A LA TABLA
    for (let i = 0; i < project.totalItems; i++) {
        modalHTML += `
            <tr style="text-align: center;">
                <td style="padding: 10px; border: 1px solid #ddd;">Tablero ${i + 1}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${project.options[i]}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${project.idColumna[i] || 'N/A'}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${project.idItems[i]}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${project.difficulty[i]}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${project.date[i]}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${project.dateF[i]}</td>
            </tr>
        `;
    }

    //CERRAR LA TABLA Y ASIGNAR EL CONTENIDO AL MODAL
    modalHTML += `
                </tbody>
            </table>
        </div>
    `;
    // Asignar el contenido al modal
    modalContent.innerHTML = modalHTML;
    // Mostrar el modal
    modal.style.display = "block";

    // Cuando el usuario haga clic en <span> (x), cerrar el modal
    span.onclick = function() {
        modal.style.display = "none";
    };
    // Cuando el usuario haga clic fuera del modal, cerrarlo
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}



