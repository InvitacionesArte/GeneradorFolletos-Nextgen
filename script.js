// Configuración de PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Variables globales
let pdfDocs = [];
let filteredPdfs = [];
let currentPdf = null;
let currentPdfDoc = null;
let currentPage = 1;
let currentScale = 1.0;
const scaleStep = 0.2;
let currentView = 'grid';
let totalPages = 0;
let selectedPdf = null;

// Elementos del DOM
const pdfGrid = document.getElementById('pdf-grid');
const pdfList = document.getElementById('pdf-list');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const clearSearch = document.getElementById('clear-search');
const sortSelect = document.getElementById('sort-select');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const totalCount = document.getElementById('total-count');
const noResults = document.getElementById('no-results');
const pdfPreview = document.getElementById('pdf-preview');
const previewPlaceholder = document.getElementById('preview-placeholder');
const previewContent = document.getElementById('preview-content');
const previewTitle = document.getElementById('preview-title');
const pdfModal = document.getElementById('pdf-modal');
const modalTitle = document.getElementById('modal-title');
const modalDownload = document.getElementById('modal-download');
const modalClose = document.getElementById('modal-close');
const pageNum = document.getElementById('page-num');
const prevPage = document.getElementById('prev-page');
const nextPage = document.getElementById('next-page');
const zoomOut = document.getElementById('zoom-out');
const zoomIn = document.getElementById('zoom-in');
const zoomLevel = document.getElementById('zoom-level');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Folletos PDF iniciado');
    loadPdfs();
    setupEventListeners();
    updateTotalCount();
});

// Cargar lista de PDFs
async function loadPdfs() {
    try {
        console.log('Cargando PDFs...');
        loadLocalPdfs();
    } catch (error) {
        console.error('Error cargando PDFs:', error);
        loadLocalPdfs();
    }
}

// Cargar PDFs locales
function loadLocalPdfs() {
    console.log('Cargando datos locales...');
    
    pdfDocs = [
    {
        id: 1,
        name: "Taller para Contralores: Mejorando la Eficiencia en la Gestión Financiera.pdf",
        displayName: "Taller para Contralores: Mejorando la Eficiencia en la Gestión Financiera",
        searchableName: "tTaller para Contralores: Mejorando la Eficiencia en la Gestión Financiera",
        path: "pdfs/Taller_para_contralores.pdf",
        size: "502 KB",
        date: "2025-01-10",
        thumbnail: "caratulas/img001.png",
        instructor: "Mtro. Oswaldo Palomo ",
        lastUpdated: "2025-01-15",
        description: "Curso práctico dirigido a contralores para optimizar la gestión financiera en sus organizaciones, con herramientas y metodologías actuales.",
        price: "$4,990 MXN"
    },
    {
        id: 2,
        name: "CÓMO ESTAR PREPARADO PARA UNA INSPECCION DE REPSE-STPS.pdf",
        displayName: "CÓMO ESTAR PREPARADO PARA UNA INSPECCION DE REPSE-STPS",
        searchableName: "CÓMO ESTAR PREPARADO PARA UNA INSPECCION DE REPSE-STPS",
        path: "pdfs/Cómo_Estar_Preparado_Para_Una_Inspección_De_Repse_Stps_2024.pdf",
        size: "487 KB",
        date: "2025-02-18",
        thumbnail: "caratulas/img002.png",
        instructor: "Mtro. Oswaldo Palomo ",
        lastUpdated: "2025-02-20",
        description: "Guía completa para cumplir con inspecciones REPSE STPS, incluyendo checklist, documentación y estrategias de cumplimiento.",
        price: "$3,200 MXN"
    },
    {
        id: 3,
        name: "Finanzas para No Financieros.pdf",
        displayName: "Finanzas para No Financieros",
        searchableName: "finanzas para no financieros",
        path: "pdfs/finanzas-no-financieros.pdf",
        size: "699 KB",
        date: "2025-03-05",
        thumbnail: "caratulas/img003.png",
        instructor: "Dr. Willfrido Portillo",
        lastUpdated: "2025-03-06",
        description: "Curso esencial para profesionales de otras áreas que buscan comprender conceptos financieros y tomar decisiones basadas en datos.",
        price: "$2,800 MXN"
    },
    {
        id: 4,
        name: "Gestión Integral de Residuos Peligrosos.pdf",
        displayName: "Gestión Integral de Residuos Peligrosos",
        searchableName: "Gestión Integral de Residuos Peligrososs",
        path: "pdfs/residuos-peligrosos.pdf",
        size: "699 KB",
        date: "2025-04-09",
        thumbnail: "caratulas/img004.png",
        instructor: "Dr. Manuel Jaime Rodríguez",
        lastUpdated: "2025-04-10",
        description: "Aprende los procedimientos adecuados para el manejo y disposición de residuos peligrosos cumpliendo la normativa ambiental vigente.",
        price: "$3,500 MXN"
    },
    {
        id: 5,
        name: "Cultivo Cannabis Medicinal.pdf",
        displayName: "Cultivo de Cannabis Medicinal",
        searchableName: "cultivo cannabis medicinal",
        path: "pdfs/cannabis-medicinal.pdf",
        size: "907 KB",
        date: "2025-05-15",
        thumbnail: "caratulas/img005.png",
        instructor: "Lic. Carlos Alberto Centeno García",
        lastUpdated: "2025-05-16",
        description: "Capacitación especializada en técnicas de cultivo, manejo y control de calidad del cannabis medicinal, incluyendo marco legal.",
        price: "$4,200 MXN"
    },
    {
        id: 6,
        name: "Desata el Poder del Liderazgo con Inteligencia Artificial.pdf",
        displayName: "Desata el Poder del Liderazgo con Inteligencia Artificial",
        searchableName: "Desata el Poder del Liderazgo con Inteligencia Artificial",
        path: "pdfs/liderazgo-equipos.pdf",
        size: "1.16 MB",
        date: "2025-06-22",
        thumbnail: "caratulas/img006.png",
        instructor: "Lic. Vicente Cañedo",
        lastUpdated: "2025-06-23",
        description: "Desarrollo de habilidades de liderazgo y técnicas de gestión efectiva de equipos, fomentando motivación y comunicación asertiva.",
        price: "$2,900 MXN"
    },
    {
        id: 7,
        name: "Reforma a la Ley de INFONAVIT 2025.pdf",
        displayName: "Reforma a la Ley de INFONAVIT 2025",
        searchableName: "Reforma a la Ley de INFONAVIT 2025",
        path: "pdfs/Reforma_INFONAVIT_2025.pdf",
        size: "358 KB",
        date: "2025-07-18",
        thumbnail: "caratulas/img007.png",
        instructor: "Dr. Willfrido Portillo",
        lastUpdated: "2025-07-19",
        description: "Actualización sobre la Reforma de la Ley INFONAVIT 2025, con explicaciones claras de cambios y su impacto en trabajadores y patrones.",
        price: "$3,800 MXN"
    },
    {
        id: 8,
        name: "Conviértete en un Experto en Cobranza.pdf",
        displayName: "Conviértete en un Experto en Cobranza",
        searchableName: "Conviértete en un Experto en Cobranza",
        path: "pdfs/cobranza-efectiva.pdf",
        size: "711 KB",
        date: "2025-08-12",
        thumbnail: "caratulas/img008.png",
        instructor: "C.P. David Zavaleta Calderón de la Barca",
        lastUpdated: "2025-08-13",
        description: "Aprende técnicas de cobranza profesional, negociación y manejo de objeciones para optimizar los procesos de recuperación de pagos.",
        price: "$2,600 MXN"
    },
    {
        id: 9,
        name: "Herramientas y estrategias para el jefe de tráfico.pdf",
        displayName: "Herramientas y estrategias para el jefe de tráfico",
        searchableName: "Herramientas y estrategias para el jefe de tráfico",
        path: "pdfs/jefe-trafico.pdf",
        size: "881 KB",
        date: "2025-09-05",
        thumbnail: "caratulas/img009.png",
        instructor: "IMtro. José Luís Chávez Salazar",
        lastUpdated: "2025-09-06",
        description: "Soluciones y estrategias para jefes de tráfico: optimización de rutas, control de flotas y cumplimiento de regulaciones.",
        price: "$3,100 MXN"
    },
    {
        id: 10,
        name: "Perfeccionamiento de Habilidades para Directivos, Gerentes y Supervisores.pdf",
        displayName: "Perfeccionamiento de Habilidades para Directivos, Gerentes y Supervisores",
        searchableName: "Perfeccionamiento de Habilidades para Directivos, Gerentes y Supervisores",
        path: "pdfs/Perfeccionamiento-Habilidades-Directivos-gerentes.pdf",
        size: "608 KB",
        date: "2025-09-12",
        thumbnail: "caratulas/img010.png",
        instructor: "Mtro. Carlos López Praget",
        lastUpdated: "2025-09-13",
        description: "Programa avanzado para mejorar competencias de liderazgo y supervisión en directivos y gerentes, con técnicas prácticas aplicables.",
        price: "$3,100 MXN"
    },
    {
        id: 11,
        name: "Planeacion Financiera y Elaboración de Presupuestos.pdf",
        displayName: "Planeacion Financiera y Elaboración de Presupuestos",
        searchableName: "Planeacion Financiera y Elaboración de Presupuestos",
        path: "pdfs/PlaneacionFinanciera-ElaboraciónPresupuestos.pdf",
        size: "670 KB",
        date: "2025-10-02",
        thumbnail: "caratulas/img011.png",
        instructor: "Mtro. Andrés Rodríguez Leos",
        lastUpdated: "2025-10-03",
        description: "Aprende a planificar y elaborar presupuestos financieros eficientes, asegurando un control adecuado de recursos en la empresa.",
        price: "$3,100 MXN"
    },
    {
        id: 12,
        name: "Administracion Integral de Compras.pdf",
        displayName: "Administracion Integral de Compras",
        searchableName: "Administracion Integral de Compras",
        path: "pdfs/Administracion_Integral_Compras.pdf",
        size: "409 KB",
        date: "2025-10-15",
        thumbnail: "caratulas/img012.jpeg",
        instructor: "Lic. Sergio Chávez Pérez",
        lastUpdated: "2025-10-16",
        description: "Curso completo sobre administración de compras, selección de proveedores y optimización de procesos de adquisición en la empresa.",
        price: "$3,100 MXN"
    },
    {
        id: 13,
        name: "Revoluciona la Capacitación con INTELIGENCIA ARTIFICIAL.pdf",
        displayName: "Revoluciona la Capacitación con INTELIGENCIA ARTIFICIAL",
        searchableName: "Revoluciona la Capacitación con INTELIGENCIA ARTIFICIAL",
        path: "pdfs/Revoluciona_Capacitación_INTELIGENCIA_ARTIFICIAL.pdf",
        size: "715 KB",
        date: "2025-11-01",
        thumbnail: "caratulas/img013.png",
        instructor: "Lic. Vicente Cañedo",
        lastUpdated: "2025-11-02",
        description: "Aprende a integrar inteligencia artificial en procesos de capacitación y formación, mejorando el aprendizaje y resultados de tu equipo.",
        price: "$3,100 MXN"
    },
    {
        id: 14,
        name: "Como Elaborar un Manual de Políticas y Procedimientos.pdf",
        displayName: "Como Elaborar un Manual de Políticas y Procedimientos",
        searchableName: "Como Elaborar un Manual de Políticas y Procedimientos",
        path: "pdfs/Como_Elaborar_Manual_Políticas_Procedimientos.pdf",
        size: "1.15 MB",
        date: "2025-11-18",
        thumbnail: "caratulas/img014.png",
        instructor: "Mtra. Margarita García Sevilla",
        lastUpdated: "2025-11-19",
        description: "Guía práctica para elaborar manuales de políticas y procedimientos claros, que faciliten la gestión y control interno de la empresa.",
        price: "$3,100 MXN"
    },
    {
        id: 15,
        name: "Cómo Vender en WhatsApp.pdf",
        displayName: "Cómo Vender en WhatsApp",
        searchableName: "Cómo Vender en WhatsApp",
        path: "pdfs/Cómo_Vender_WhatsApp.pdf",
        size: "955 KB",
        date: "2025-12-05",
        thumbnail: "caratulas/img015.png",
        instructor: "Lic. Arturo Estrada",
        lastUpdated: "2025-12-06",
        description: "Aprende estrategias efectivas para vender productos y servicios mediante WhatsApp, incrementando tus ventas y alcance digital.",
        price: "$3,100 MXN"
    },
    {
        id: 16,
        name: "Descubre el poder de los Dashboards.pdf",
        displayName: "Descubre el poder de los Dashboards",
        searchableName: "Descubre el poder de los Dashboards",
        path: "pdfs/Descubre_Dashboards.pdf",
        size: "664 KB",
        date: "2025-12-12",
        thumbnail: "caratulas/img016.png",
        instructor: "Ing. Rodrigo Márquez Carrillo",
        lastUpdated: "2025-12-13",
        description: "Domina la creación y análisis de dashboards interactivos para tomar decisiones basadas en datos de manera rápida y eficiente.",
        price: "$3,100 MXN"
    },
    {
        id: 17,
        name: "Preparación del  Cierre Anual  de Nómina.pdf",
        displayName: "Preparación del  Cierre Anual  de Nómina",
        searchableName: "Preparación del  Cierre Anual  de Nómina",
        path: "pdfs/Preparación_Cierre_Anual_Nómina.pdf",
        size: "692 KB",
        date: "2025-12-20",
        thumbnail: "caratulas/img017.png",
        instructor: "Mtro. Miguel Alarcón",
        lastUpdated: "2025-12-21",
        description: "Aprende a preparar y ejecutar el cierre anual de nómina, asegurando exactitud en cálculos, reportes y cumplimiento legal.",
        price: "$3,100 MXN"
    },
    {
        id: 18,
        name: "Estrategias de Motivación para la Fuerza de Ventas.pdf",
        displayName: "Estrategias de Motivación para la Fuerza de Ventas",
        searchableName: "Estrategias de Motivación para la Fuerza de Ventas",
        path: "pdfs/Estrategias_motivación_Fuerza_Ventas.pdf",
        size: "348 KB",
        date: "2025-12-28",
        thumbnail: "caratulas/img018.png",
        instructor: "Mtro. Apolo Díaz Cantú",
        lastUpdated: "2025-12-29",
        description: "Descubre estrategias efectivas para motivar a tu equipo de ventas y maximizar su desempeño y resultados comerciales.",
        price: "$3,100 MXN"
    }
];
    filteredPdfs = [...pdfDocs];
    renderPdfs();
    updateTotalCount();
    
    console.log('Datos locales cargados:', pdfDocs.length + ' PDFs');
}

// Configurar event listeners
function setupEventListeners() {
    // Búsqueda en tiempo real
    searchInput.addEventListener('input', function() {
        filterPdfs();
        clearSearch.style.display = this.value ? 'flex' : 'none';
    });
    
    searchBtn.addEventListener('click', filterPdfs);
    clearSearch.addEventListener('click', clearSearchInput);
    
    // Ordenamiento
    sortSelect.addEventListener('change', sortPdfs);
    
    // Vista
    gridViewBtn.addEventListener('click', () => changeView('grid'));
    listViewBtn.addEventListener('click', () => changeView('list'));
    
    // Modal
    modalClose.addEventListener('click', closePdfModal);
    modalDownload.addEventListener('click', downloadCurrentPdf);
    
    // Navegación de páginas
    prevPage.addEventListener('click', goToPrevPage);
    nextPage.addEventListener('click', goToNextPage);
    
    // Zoom
    zoomOut.addEventListener('click', () => changeZoom(-scaleStep));
    zoomIn.addEventListener('click', () => changeZoom(scaleStep));
    
    // Teclado
    document.addEventListener('keydown', handleKeyPress);
    
    // Cerrar modal al hacer clic fuera
    pdfModal.addEventListener('click', function(e) {
        if (e.target === pdfModal) {
            closePdfModal();
        }
    });
}

// Limpiar búsqueda
function clearSearchInput() {
    searchInput.value = '';
    clearSearch.style.display = 'none';
    filterPdfs();
}

// Filtrar PDFs en tiempo real
function filterPdfs() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredPdfs = [...pdfDocs];
    } else {
        filteredPdfs = pdfDocs.filter(pdf => 
            pdf.searchableName.toLowerCase().includes(searchTerm) ||
            pdf.displayName.toLowerCase().includes(searchTerm)
        );
    }
    
    sortPdfs();
    updateTotalCount();
}

// Ordenar PDFs
function sortPdfs() {
    const sortValue = sortSelect.value;
    
    switch(sortValue) {
        case 'name-asc':
            filteredPdfs.sort((a, b) => a.displayName.localeCompare(b.displayName));
            break;
        case 'name-desc':
            filteredPdfs.sort((a, b) => b.displayName.localeCompare(a.displayName));
            break;
        case 'date-new':
            filteredPdfs.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-old':
            filteredPdfs.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
    }
    
    renderPdfs();
}

// Cambiar vista
function changeView(view) {
    currentView = view;
    
    gridViewBtn.classList.toggle('active', view === 'grid');
    listViewBtn.classList.toggle('active', view === 'list');
    
    pdfGrid.style.display = view === 'grid' ? 'grid' : 'none';
    pdfList.style.display = view === 'list' ? 'block' : 'none';
    
    renderPdfs();
}

// Actualizar contador total
function updateTotalCount() {
    totalCount.textContent = `${filteredPdfs.length} folletos`;
}

// Renderizar PDFs según la vista actual
function renderPdfs() {
    if (currentView === 'grid') {
        renderPdfGrid();
    } else {
        renderPdfList();
    }
    
    if (filteredPdfs.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// Renderizar grid de PDFs
function renderPdfGrid() {
    pdfGrid.innerHTML = '';
    
    filteredPdfs.forEach(pdf => {
        const pdfCard = document.createElement('div');
        pdfCard.className = 'pdf-card';
        pdfCard.innerHTML = `
            <div class="pdf-thumbnail" data-pdf-id="${pdf.id}">
                <img src="${pdf.thumbnail}" alt="${pdf.displayName}" class="pdf-cover-image">
                <span class="pdf-badge">${pdf.size}</span>
            </div>
            <div class="pdf-info">
                <h3 class="pdf-name" title="${pdf.displayName}">${pdf.displayName}</h3>
                <div class="pdf-meta">
                    <span>${formatDate(pdf.date)}</span>
                    <span class="file-size">${pdf.size}</span>
                </div>
                <div class="pdf-actions">
                    <button class="action-btn view-btn-primary" data-pdf-id="${pdf.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                        Ver Folleto
                    </button>
                </div>
            </div>
        `;
        
        const viewBtn = pdfCard.querySelector('.view-btn-primary');
        const thumbnail = pdfCard.querySelector('.pdf-thumbnail');
        
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openPdfModal(pdf);
        });
        
        thumbnail.addEventListener('click', () => {
            showPdfPreview(pdf);
        });
        
        pdfCard.addEventListener('click', () => {
            showPdfPreview(pdf);
        });
        
        pdfGrid.appendChild(pdfCard);
    });
}

// Renderizar lista de PDFs
function renderPdfList() {
    pdfList.innerHTML = '';
    
    filteredPdfs.forEach(pdf => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
            <div class="list-thumbnail">
                <img src="${pdf.thumbnail}" alt="${pdf.displayName}" class="list-cover-image">
            </div>
            <div class="list-info">
                <div class="list-name" title="${pdf.displayName}">${pdf.displayName}</div>
                <div class="list-meta">
                    <span>${formatDate(pdf.date)}</span>
                    <span class="file-size">${pdf.size}</span>
                </div>
            </div>
            <div class="list-actions">
                <button class="action-btn view-btn-primary" data-pdf-id="${pdf.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                    Ver Folleto
                </button>
            </div>
        `;
        
        const viewBtn = listItem.querySelector('.view-btn-primary');
        
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openPdfModal(pdf);
        });
        
        listItem.addEventListener('click', () => {
            showPdfPreview(pdf);
        });
        
        pdfList.appendChild(listItem);
    });
}

// Formatear fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Formatear fecha larga
function formatLongDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Mostrar vista previa del PDF
function showPdfPreview(pdf) {
    selectedPdf = pdf;
    
    previewPlaceholder.style.display = 'none';
    previewContent.style.display = 'flex';
    
    previewContent.innerHTML = `
        <div class="preview-header">
            <h3 id="preview-title">${pdf.displayName}</h3>
            <button id="preview-download" class="preview-download-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
                Descargar
            </button>
        </div>
        <div class="preview-info">
            <div class="info-section">
                <h4>Información del Curso</h4>
                <div class="info-item">
                    <span class="info-label">Instructor:</span>
                    <span class="info-value">${pdf.instructor}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Última actualización:</span>
                    <span class="info-value">${formatLongDate(pdf.lastUpdated)}</span>
                </div>
            </div>
            
            <div class="info-section">
                <h4>Descripción</h4>
                <p class="course-description">${pdf.description}</p>
            </div>
            
            <div class="info-section">
                <h4>Detalles del Archivo</h4>
                <div class="info-item">
                    <span class="info-label">Tamaño:</span>
                    <span class="info-value">${pdf.size}</span>
                </div>
            </div>
            
            <div class="preview-actions">
                <button class="action-btn view-btn-primary full-width" id="preview-view-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                    Ver Folleto Completo
                </button>
                <button class="action-btn payment-btn full-width" id="preview-payment-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                    </svg>
                    Agregar Hoja de Pago
                </button>
            </div>
        </div>
    `;
    
    // Agregar event listeners después de crear el HTML
    document.getElementById('preview-download').addEventListener('click', () => {
        downloadPdf(pdf);
    });
    
    document.getElementById('preview-view-full').addEventListener('click', () => {
        openPdfModal(pdf);
    });
    
    document.getElementById('preview-payment-btn').addEventListener('click', () => {
        addPaymentSheet(pdf);
    });
}

// Función para descargar PDF
function downloadPdf(pdf) {
    const link = document.createElement('a');
    link.href = pdf.path;
    link.download = pdf.name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Función para agregar hoja de pago - CORREGIDA
function addPaymentSheet(pdf) {
    console.log('🔧 addPaymentSheet llamado para:', pdf.displayName);
    
    // Método 1: Usar window.openPaymentSheet si existe
    if (typeof window.openPaymentSheet === 'function') {
        console.log('✅ Usando window.openPaymentSheet');
        window.openPaymentSheet(pdf);
        return;
    }
    
    // Método 2: Usar paymentSystem directo si existe
    if (window.paymentSystem && typeof window.paymentSystem.openPaymentModal === 'function') {
        console.log('✅ Usando paymentSystem.openPaymentModal');
        window.paymentSystem.openPaymentModal(pdf);
        return;
    }
    
    // Método 3: Intentar crear una instancia si la clase existe
    if (typeof PaymentSystem !== 'undefined') {
        console.log('🔄 Creando nueva instancia de PaymentSystem');
        window.paymentSystem = new PaymentSystem();
        setTimeout(() => {
            if (window.paymentSystem && typeof window.paymentSystem.openPaymentModal === 'function') {
                window.paymentSystem.openPaymentModal(pdf);
            } else {
                showPaymentError(pdf);
            }
        }, 100);
        return;
    }
    
    // Método 4: Fallback final
    showPaymentError(pdf);
}

// Función de error para pagos
function showPaymentError(pdf) {
    console.error('❌ No se pudo cargar el sistema de pagos');
    const message = `No se pudo cargar el sistema de hoja de pago para: ${pdf.displayName}\n\nPor favor:\n1. Verifica que el archivo payment.js esté cargado\n2. Recarga la página\n3. Contacta al administrador si el problema persiste`;
    alert(message);
}

// Abrir modal de PDF
async function openPdfModal(pdf) {
    try {
        console.log('Abriendo PDF:', pdf.path);
        currentPdf = pdf;
        currentPage = 1;
        currentScale = 1.0;
        
        modalTitle.textContent = pdf.displayName;
        pdfModal.style.display = 'flex';
        
        showPdfLoading();
        await loadPdfDocument();
        
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error abriendo PDF:', error);
        alert('Error al cargar el PDF. Verifica que el archivo exista en la carpeta pdfs/');
        closePdfModal();
    }
}

// Mostrar indicador de carga
function showPdfLoading() {
    const container = document.querySelector('.pdf-canvas-container');
    container.innerHTML = '<div class="pdf-loading">Cargando PDF...</div>';
}

// Cargar documento PDF
async function loadPdfDocument() {
    if (!currentPdf) return;
    
    try {
        const encodedPath = encodeURI(currentPdf.path);
        const loadingTask = pdfjsLib.getDocument(encodedPath);
        currentPdfDoc = await loadingTask.promise;
        totalPages = currentPdfDoc.numPages;
        
        await loadPdfPage();
        
    } catch (error) {
        console.error('Error cargando documento PDF:', error);
        showPdfError();
        throw error;
    }
}

// Cargar página del PDF
async function loadPdfPage() {
    if (!currentPdfDoc || currentPage < 1 || currentPage > totalPages) return;
    
    try {
        const page = await currentPdfDoc.getPage(currentPage);
        const container = document.querySelector('.pdf-canvas-container');
        container.innerHTML = '<canvas id="pdf-canvas"></canvas>';
        
        const canvas = document.getElementById('pdf-canvas');
        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: currentScale });
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        canvas.style.maxWidth = 'none';
        canvas.style.width = 'auto';
        canvas.style.height = 'auto';
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
        
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        await page.render(renderContext).promise;
        
        updatePageControls();
        updateZoomDisplay();
        
        setTimeout(() => {
            container.scrollTop = 0;
            container.scrollLeft = 0;
        }, 100);
        
    } catch (error) {
        console.error('Error renderizando página PDF:', error);
        showPdfError();
    }
}

// Cambiar zoom
function changeZoom(delta) {
    const oldScale = currentScale;
    currentScale += delta;
    
    if (currentScale < 0.5) currentScale = 0.5;
    if (currentScale > 3.0) currentScale = 3.0;
    
    if (currentScale !== oldScale && currentPdfDoc) {
        loadPdfPage();
    }
}

// Mostrar error en el visor de PDF
function showPdfError() {
    const container = document.querySelector('.pdf-canvas-container');
    container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #dc2626;">
            <div style="font-size: 3rem; margin-bottom: 20px;">❌</div>
            <h3>Error al cargar el PDF</h3>
            <p>No se pudo cargar el documento: ${currentPdf?.name}</p>
            <p style="font-size: 0.9rem; margin-top: 10px; color: #666;">
                Archivo: ${currentPdf?.path}
            </p>
            <button onclick="closePdfModal()" style="margin-top: 20px; padding: 10px 20px; background: #dc2626; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Cerrar
            </button>
        </div>
    `;
}

// Cerrar modal de PDF
function closePdfModal() {
    pdfModal.style.display = 'none';
    currentPdf = null;
    currentPdfDoc = null;
    currentScale = 1.0;
    document.body.style.overflow = 'auto';
}

// Descargar PDF actual
function downloadCurrentPdf() {
    if (!currentPdf) return;
    
    const link = document.createElement('a');
    link.href = currentPdf.path;
    link.download = currentPdf.name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Ir a página anterior
function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadPdfPage();
    }
}

// Ir a página siguiente
function goToNextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        loadPdfPage();
    }
}

// Actualizar controles de página
function updatePageControls() {
    pageNum.textContent = `Página ${currentPage} de ${totalPages}`;
    prevPage.disabled = currentPage <= 1;
    nextPage.disabled = currentPage >= totalPages;
}

// Actualizar display de zoom
function updateZoomDisplay() {
    zoomLevel.textContent = `${Math.round(currentScale * 100)}%`;
    zoomOut.disabled = currentScale <= 0.5;
    zoomIn.disabled = currentScale >= 3.0;
    
    zoomOut.style.opacity = currentScale <= 0.5 ? '0.5' : '1';
    zoomIn.style.opacity = currentScale >= 3.0 ? '0.5' : '1';
}

// Manejar teclas
function handleKeyPress(e) {
    if (!currentPdf) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            goToPrevPage();
            break;
        case 'ArrowRight':
            goToNextPage();
            break;
        case 'Escape':
            closePdfModal();
            break;
        case '-':
            if (e.ctrlKey) {
                e.preventDefault();
                changeZoom(-scaleStep);
            }
            break;
        case '+':
        case '=':
            if (e.ctrlKey) {
                e.preventDefault();
                changeZoom(scaleStep);
            }
            break;
    }
}

// Hacer funciones globales necesarias
window.openPdfModal = openPdfModal;
window.addPaymentSheet = addPaymentSheet;
window.closePdfModal = closePdfModal;