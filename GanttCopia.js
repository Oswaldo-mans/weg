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
    const sem = [];
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

        const semValue = parseInt(document.querySelector(`input[name="sem-id-${i}"]`).value);
        sem.push(semValue);

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

        projectButton.addEventListener("click", () => openProjectWindow(clientName, totalItems, clientOrder, options, idItems, idColumna, difficulty, sem, date, dateF));

        projectContainer.appendChild(projectButton);
        projectWrapper.appendChild(projectContainer);
        projectWrapper.appendChild(graficaContainer);
        projectWrapper.appendChild(infoContainer);
        infoContainer.appendChild(infoButton);

        projectsContainer.appendChild(projectWrapper);

        const projectCount = document.getElementById("projectCount");
        projectCount.textContent = parseInt(projectCount.textContent) + 1;

        saveProject(clientName, totalItems, clientOrder, options, idItems, idColumna, difficulty, sem, date, dateF);

        closeForm();
        toggleDropdownMenu();

        openProjectWindow(clientName, totalItems, clientOrder, options, idItems, idColumna, difficulty, sem, date, dateF);
    } else {
        alert("Por favor, ingresa el nombre del cliente y una cantidad válida de Items.");
    }
}

//CREACION DEL GANTT Y DEMAS EN UNA NUEVA PESTAÑA - FUNCION DE UN ARCHIVO JS:
function openProjectWindow(clientName, totalItems, clientOrder, options, idItems, idColumna, difficulty, sem, date, dateF) {
    const url = new URL('PreGantt.html', window.location.href);
    url.searchParams.append('clientName', clientName);
    url.searchParams.append('totalItems', totalItems);
    url.searchParams.append('clientOrder', clientOrder);
    url.searchParams.append('options', JSON.stringify(options));
    url.searchParams.append('idItems', JSON.stringify(idItems));
    url.searchParams.append('idColumna', JSON.stringify(idColumna));
    url.searchParams.append('difficulty', JSON.stringify(difficulty));
    url.searchParams.append('sem', JSON.stringify(sem));
    url.searchParams.append('date', JSON.stringify(date));
    url.searchParams.append('dateF', JSON.stringify(dateF));
    window.open(url, '_blank');
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
function saveProject(clientName, totalItems, clientOrder, options, idItems, idColumna, difficulty, sem, date, dateF) {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    const newProject = { clientName, totalItems, clientOrder, options, idItems, idColumna, difficulty, sem, date, dateF};
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
        projectButton.addEventListener("click", () => openProjectWindow(project.clientName, project.totalItems, project.clientOrder, project.options, project.idItems, project.idColumna, project.difficulty, project.sem, project.date, project.dateF));

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
                        <th style="padding: 10px; border: 1px solid #ddd;">Semanas</th>
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
                <td style="padding: 10px; border: 1px solid #ddd;">${project.options[i] || 'N/A'}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${project.idColumna[i] || 'N/A'}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${project.idItems[i] || 'N/A'}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${project.difficulty[i] || 'N/A'}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${project.sem[i] || 'N/A'}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${project.date[i] || 'N/A'}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${project.dateF[i] || 'N/A'}</td>
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