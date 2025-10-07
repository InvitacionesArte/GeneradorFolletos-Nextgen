// payment.js - Sistema de Hoja de Pago COMPLETAMENTE FUNCIONAL
class PaymentSystem {
    constructor() {
        this.currentPdf = null;
        this.paymentModal = null;
        this.formData = this.getInitialFormData();
        this.init();
    }

    init() {
        console.log('🔄 Inicializando PaymentSystem...');
        this.createPaymentModal();
        this.setupEventListeners();
        console.log('✅ PaymentSystem inicializado correctamente');
    }

    getInitialFormData() {
        return {
            curso: '',
            fecha: '',
            horaInicio: '',
            horaFin: '',
            inversionNormal: '',
            ofertaEspecial: '',
            modalidad: '',
            plataforma: ''
        };
    }

    createPaymentModal() {
        // Si ya existe, no crear otro
        if (document.getElementById('payment-modal')) {
            this.paymentModal = document.getElementById('payment-modal');
            return;
        }

        const modalHTML = `
            <div class="payment-modal-overlay" id="payment-modal" style="display: none;">
                <div class="payment-modal-container">
                    <div class="payment-modal-header">
                        <h2>Hoja de Pago</h2>
                        <button class="payment-close-btn" id="payment-close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="payment-modal-content">
                        <div class="payment-preview-column">
                            <div class="pdf-preview-header">
                                <h3>Vista Previa - Hoja de Pago</h3>
                            </div>
                            <div class="payment-pdf-container" id="payment-pdf-container">
                                <div class="pdf-loading">Cargando hoja de pago...</div>
                            </div>
                        </div>
                        
                        <div class="payment-form-column">
                            <div class="form-header">
                                <h3>Información del Curso</h3>
                                <p>Complete los datos requeridos</p>
                            </div>
                            
                            <form class="payment-form" id="payment-form">
                                <div class="form-group">
                                    <label for="curso">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H4z"/>
                                            <path d="M9 5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7zm2 0a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7zM6 5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                        </svg>
                                        Nombre del curso:
                                    </label>
                                    <input type="text" id="curso" name="curso" required placeholder="Ingrese el nombre del curso">
                                </div>
                                
                                <div class="form-group">
                                    <label for="fecha">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                                            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>
                                        </svg>
                                        Fecha:
                                    </label>
                                    <input type="date" id="fecha" name="fecha" required>
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="horaInicio">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                            </svg>
                                            Hora Inicio:
                                        </label>
                                        <input type="time" id="horaInicio" name="horaInicio" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="horaFin">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                            </svg>
                                            Hora Fin:
                                        </label>
                                        <input type="time" id="horaFin" name="horaFin" required>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="inversionNormal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3z"/>
                                            <path d="M0 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z"/>
                                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                                        </svg>
                                        Inversión Normal:
                                    </label>
                                    <input type="text" id="inversionNormal" name="inversionNormal" required placeholder="Ej: $2,500 MXN">
                                </div>
                                
                                <div class="form-group">
                                    <label for="ofertaEspecial">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V8H9.5A1.5 1.5 0 0 0 8 9.5V14H2.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V9.5a.5.5 0 0 1 .5-.5h4.293L9 13.793z"/>
                                        </svg>
                                        Oferta Especial:
                                    </label>
                                    <input type="text" id="ofertaEspecial" name="ofertaEspecial" placeholder="Ej: $2,000 MXN (opcional)">
                                </div>
                                
                                <div class="form-group">
                                    <label for="modalidad">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 16a4 4 0 0 0 4-4V4a4 4 0 1 0-8 0v8a4 4 0 0 0 4 4z"/>
                                        </svg>
                                        Modalidad:
                                    </label>
                                    <select id="modalidad" name="modalidad" required>
                                        <option value="">Seleccione modalidad</option>
                                        <option value="Presencial">Presencial</option>
                                        <option value="En línea">En línea</option>
                                        <option value="Híbrido">Híbrido</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="plataforma">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3zm0 8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1z"/>
                                        </svg>
                                        Plataforma:
                                    </label>
                                    <select id="plataforma" name="plataforma" required>
                                        <option value="">Seleccione plataforma</option>
                                        <option value="Zoom">Zoom</option>
                                        <option value="Microsoft Teams">Microsoft Teams</option>
                                        <option value="Hotel Emporio CDMX">Hotel Emporio CDMX</option>
                                    </select>
                                </div>
                            </form>
                            
                            <div class="form-actions">
                                <button type="button" class="action-btn clear-btn" id="clear-data">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                    Vaciar Datos
                                </button>
                                
                                <button type="button" class="action-btn download-btn" id="download-pdf">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                    </svg>
                                    Descargar Hoja
                                </button>
                                
                                <button type="button" class="action-btn generate-btn" id="generate-folleto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                    </svg>
                                    Generar Folleto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.paymentModal = document.getElementById('payment-modal');
    }

    setupEventListeners() {
        // Cerrar modal
        document.getElementById('payment-close').addEventListener('click', () => {
            this.closePaymentModal();
        });

        // Cerrar al hacer clic fuera
        this.paymentModal.addEventListener('click', (e) => {
            if (e.target === this.paymentModal) {
                this.closePaymentModal();
            }
        });

        // Vaciar datos
        document.getElementById('clear-data').addEventListener('click', () => {
            this.clearFormData();
        });

        // Descargar PDF
        document.getElementById('download-pdf').addEventListener('click', () => {
            this.downloadPaymentPDF();
        });

        // Generar folleto
        document.getElementById('generate-folleto').addEventListener('click', () => {
            this.generateFolletoConPrecios();
        });

        // Guardar datos en tiempo real
        const form = document.getElementById('payment-form');
        form.addEventListener('input', (e) => {
            this.formData[e.target.name] = e.target.value;
        });

        // Validar horas
        document.getElementById('horaInicio').addEventListener('change', () => {
            this.validateTimeRange();
        });
        document.getElementById('horaFin').addEventListener('change', () => {
            this.validateTimeRange();
        });
    }

    openPaymentModal(pdfData) {
        console.log('📋 Abriendo modal de pago para:', pdfData.displayName);
        this.currentPdf = pdfData;
        
        // Llenar datos automáticamente
        this.fillFormData(pdfData);
        
        // Mostrar modal
        this.paymentModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Cargar PDF de hoja de pago
        this.loadPaymentPDF();
    }

    closePaymentModal() {
        this.paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    fillFormData(pdfData) {
        this.formData = {
            curso: pdfData.displayName || 'Curso no especificado',
            fecha: this.getCurrentDate(),
            horaInicio: '09:00',
            horaFin: '14:00',
            inversionNormal: pdfData.price || '$2,500 MXN',
            ofertaEspecial: '',
            modalidad: 'En línea',
            plataforma: 'Zoom'
        };

        // Actualizar formulario
        Object.keys(this.formData).forEach(key => {
            const element = document.getElementById(key);
            if (element) element.value = this.formData[key];
        });
    }

    clearFormData() {
        this.formData = this.getInitialFormData();
        document.getElementById('payment-form').reset();
        this.showMessage('Datos limpiados correctamente', 'success');
    }

    async loadPaymentPDF() {
        const container = document.getElementById('payment-pdf-container');
        
        try {
            container.innerHTML = '<div class="pdf-loading">Cargando hoja de pago...</div>';
            
            // Cargar el PDF de hoja de pago
            const pdfPath = 'hoja_pago/Hoja_Pago.pdf';
            const loadingTask = pdfjsLib.getDocument(pdfPath);
            const pdfDoc = await loadingTask.promise;
            
            // Obtener la primera página
            const page = await pdfDoc.getPage(1);
            const viewport = page.getViewport({ scale: 0.8 });
            
            // Crear canvas
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            // Renderizar página
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            
            await page.render(renderContext).promise;
            
            // Mostrar canvas
            container.innerHTML = '';
            container.appendChild(canvas);
            
        } catch (error) {
            console.error('Error cargando PDF de hoja de pago:', error);
            this.showAlternativePreview();
        }
    }

    showAlternativePreview() {
        const container = document.getElementById('payment-pdf-container');
        container.innerHTML = `
            <div style="padding: 40px; text-align: center; background: white; border-radius: 8px; height: 100%; display: flex; flex-direction: column; justify-content: center;">
                <div style="font-size: 4rem; margin-bottom: 20px;">📄</div>
                <h3 style="color: #1e3a8a; margin-bottom: 15px;">Hoja de Pago - Vista Previa</h3>
                <p style="color: #475569; margin-bottom: 20px;">Los datos del formulario se insertarán en el PDF descargado</p>
                <div style="background: #f1f5f9; padding: 20px; border-radius: 6px; text-align: left; margin-top: 20px;">
                    <h4 style="color: #1e3a8a; margin-bottom: 15px;">Datos que se incluirán:</h4>
                    <p><strong>Curso:</strong> ${this.formData.curso}</p>
                    <p><strong>Fecha:</strong> ${this.formData.fecha}</p>
                    <p><strong>Horario:</strong> ${this.formatTimeRange(this.formData.horaInicio, this.formData.horaFin)}</p>
                    <p><strong>Inversión Normal:</strong> <span style="color: #1e40af; font-weight: bold;">${this.formData.inversionNormal}</span></p>
                    <p><strong>Oferta Especial:</strong> <span style="color: #1e40af; font-weight: bold;">${this.formData.ofertaEspecial || 'No aplica'}</span></p>
                    <p><strong>Modalidad:</strong> ${this.formData.modalidad}</p>
                    <p><strong>Plataforma:</strong> ${this.formData.plataforma}</p>
                </div>
            </div>
        `;
    }

    validateTimeRange() {
        const horaInicio = document.getElementById('horaInicio');
        const horaFin = document.getElementById('horaFin');
        
        if (!horaInicio || !horaFin) return;
        
        const inicioVal = horaInicio.value;
        const finVal = horaFin.value;
        
        if (inicioVal && finVal && finVal <= inicioVal) {
            this.showMessage('La hora de fin debe ser mayor que la hora de inicio', 'error');
            horaFin.value = '';
            this.formData.horaFin = '';
        }
    }

    async downloadPaymentPDF() {
        if (!this.validateForm()) {
            this.showMessage('Complete todos los campos requeridos', 'error');
            return;
        }

        try {
            this.showMessage('Generando hoja de pago...', 'info');
            
            // Cargar el PDF base existente
            const pdfPath = 'hoja_pago/Hoja_Pago.pdf';
            const existingPdfBytes = await fetch(pdfPath).then(res => {
                if (!res.ok) throw new Error('No se pudo cargar el archivo PDF base');
                return res.arrayBuffer();
            });
            
            // Cargar el PDF con PDF-Lib
            const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            
            // OBTENER DATOS DEL FORMULARIO
            const {
                curso,
                fecha,
                horaInicio,
                horaFin,
                inversionNormal,
                ofertaEspecial,
                modalidad,
                plataforma
            } = this.formData;

            // FORMATO DE HORAS
            const horarioFormateado = this.formatTimeRange(horaInicio, horaFin);
            
            // ESCRIBIR EN EL PDF EXISTENTE
            const font = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
            const boldFont = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

            // NOMBRE DEL CURSO - CON MÚLTIPLES LÍNEAS SI ES NECESARIO
            const tituloCurso = curso.toUpperCase();
            const maxCaracteresPorLinea = 38;

            // Dividir el título en líneas
            const lineasTitulo = this.dividirTextoEnLineas(tituloCurso, maxCaracteresPorLinea);

            // Posiciones iniciales para el título
            let posY = 755;
            const alturaLinea = 16;

            // Dibujar cada línea del título
            lineasTitulo.forEach((linea, index) => {
                firstPage.drawText(linea, {
                    x: 50,
                    y: posY - (index * alturaLinea),
                    size: 13,
                    color: PDFLib.rgb(1, 1, 1),
                    font: boldFont,
                    maxWidth: 500,
                });
            });

            // FECHA
            firstPage.drawText(this.formatDate(fecha), {
                x: 420,
                y: 668,
                size: 12,
                color: PDFLib.rgb(0, 0, 0),
                font: boldFont,
            });

            // HORARIO
            firstPage.drawText(horarioFormateado, {
                x: 420,
                y: 640,
                size: 12,
                color: PDFLib.rgb(0, 0, 0),
                font: boldFont,
            });

            // INVERSIÓN NORMAL
            firstPage.drawText(inversionNormal, {
                x: 225,
                y: 548,
                size: 19,
                color: PDFLib.rgb(30/255, 58/255, 138/255),
                font: boldFont,
            });

            // OFERTA ESPECIAL
            if (ofertaEspecial && ofertaEspecial.trim() !== '') {
                firstPage.drawText(ofertaEspecial, {
                    x: 225,
                    y: 497,
                    size: 24,
                    color: PDFLib.rgb(30/255, 58/255, 138/255),
                    font: boldFont,
                });
            }

            // MODALIDAD
            firstPage.drawText(modalidad, {
                x: 165,
                y: 413,
                size: 12,
                color: PDFLib.rgb(30/255, 58/255, 138/255),
                font: boldFont,
            });

            // PLATAFORMA
            firstPage.drawText(plataforma, {
                x: 165,
                y: 377,
                size: 12,
                color: PDFLib.rgb(30/255, 58/255, 138/255),
                font: boldFont,
            });

            // Guardar el PDF modificado
            const pdfBytes = await pdfDoc.save();
            
            // Descargar el PDF
            this.downloadPDFFile(pdfBytes, `Hoja_Pago_${this.sanitizeFilename(curso)}.pdf`);
            
            this.showMessage('Hoja de pago generada y descargada correctamente', 'success');
            
        } catch (error) {
            console.error('Error generando PDF:', error);
            this.showMessage('Error al generar la hoja de pago. Verifica que el archivo Hoja_Pago.pdf exista en la carpeta hoja_pago/.', 'error');
        }
    }

    async generateFolletoConPrecios() {
        if (!this.validateForm()) {
            this.showMessage('Complete todos los campos requeridos', 'error');
            return;
        }

        try {
            this.showMessage('Generando folleto con precios...', 'info');

            // 1. Cargar el PDF del curso
            const cursoPdfBytes = await fetch(this.currentPdf.path).then(res => {
                if (!res.ok) throw new Error('No se pudo cargar el PDF del curso');
                return res.arrayBuffer();
            });

            // 2. Cargar el PDF de hoja de pago
            const hojaPagoBytes = await fetch('hoja_pago/Hoja_Pago.pdf').then(res => {
                if (!res.ok) throw new Error('No se pudo cargar la hoja de pago');
                return res.arrayBuffer();
            });

            // 3. Crear un nuevo documento PDF que combine ambos
            const combinedPdf = await PDFLib.PDFDocument.create();

            // 4. Cargar y copiar todas las páginas del PDF del curso
            const cursoPdfDoc = await PDFLib.PDFDocument.load(cursoPdfBytes);
            const cursoPages = await combinedPdf.copyPages(cursoPdfDoc, cursoPdfDoc.getPageIndices());
            cursoPages.forEach(page => combinedPdf.addPage(page));

            // 5. Cargar y copiar la hoja de pago (solo la primera página)
            const hojaPagoDoc = await PDFLib.PDFDocument.load(hojaPagoBytes);
            const hojaPagoPages = await combinedPdf.copyPages(hojaPagoDoc, [0]);
            const hojaPagoPage = hojaPagoPages[0];
            combinedPdf.addPage(hojaPagoPage);

            // 6. Obtener la última página (que es la hoja de pago recién agregada)
            const pages = combinedPdf.getPages();
            const lastPage = pages[pages.length - 1];

            // 7. OBTENER DATOS DEL FORMULARIO
            const {
                curso,
                fecha,
                horaInicio,
                horaFin,
                inversionNormal,
                ofertaEspecial,
                modalidad,
                plataforma
            } = this.formData;

            // FORMATO DE HORAS
            const horarioFormateado = this.formatTimeRange(horaInicio, horaFin);

            // 8. INSERTAR DATOS EN LA HOJA DE PAGO
            const font = await combinedPdf.embedFont(PDFLib.StandardFonts.HelveticaBold);

            // NOMBRE DEL CURSO posicion del TITULO 2 hoja con precios
            const tituloCurso = curso.toUpperCase();
            const maxCaracteresPorLinea = 38;
            const lineasTitulo = this.dividirTextoEnLineas(tituloCurso, maxCaracteresPorLinea);
            
            let posY = 755;
            const alturaLinea = 16;
            
            lineasTitulo.forEach((linea, index) => {
                lastPage.drawText(linea, {
                    x: 50,
                    y: posY - (index * alturaLinea),
                    size: 13,
                    color: PDFLib.rgb(1, 1, 1),
                    font: font,
                    maxWidth: 500,
                });
            });

            // FECHA
            lastPage.drawText(this.formatDate(fecha), {
                x: 420,
                y: 668,
                size: 12,
                color: PDFLib.rgb(0, 0, 0),
                font: font,
            });

            // HORARIO
            lastPage.drawText(horarioFormateado, {
                x: 420,
                y: 640,
                size: 12,
                color: PDFLib.rgb(0, 0, 0),
                font: font,
            });

            // INVERSIÓN NORMAL
            lastPage.drawText(inversionNormal, {
                x: 225,
                y: 548,
                size: 19,
                color: PDFLib.rgb(30/255, 58/255, 138/255),
                font: font,
            });

            // OFERTA ESPECIAL
            if (ofertaEspecial && ofertaEspecial.trim() !== '') {
                lastPage.drawText(ofertaEspecial, {
                    x: 225,
                    y: 497,
                    size: 24,
                    color: PDFLib.rgb(30/255, 58/255, 138/255),
                    font: font,
                });
            }

            // MODALIDAD
            lastPage.drawText(modalidad, {
                x: 165,
                y: 413,
                size: 12,
                color: PDFLib.rgb(30/255, 58/255, 138/255),
                font: font,
            });

            // PLATAFORMA
            lastPage.drawText(plataforma, {
                x: 165,
                y: 377,
                size: 12,
                color: PDFLib.rgb(30/255, 58/255, 138/255),
                font: font,
            });

            // 9. Guardar el PDF combinado
            const combinedPdfBytes = await combinedPdf.save();

            // 10. Descargar el PDF combinado
            this.downloadPDFFile(combinedPdfBytes, `Folleto_Completo_${this.sanitizeFilename(curso)}.pdf`);

            this.showMessage('Folleto con precios generado y descargado correctamente', 'success');

        } catch (error) {
            console.error('Error generando folleto con precios:', error);
            this.showMessage('Error al generar el folleto completo. Verifica que los archivos PDF existan.', 'error');
        }
    }

    // FUNCIÓN AUXILIAR: Dividir texto en líneas
    dividirTextoEnLineas(texto, maxCaracteresPorLinea) {
        const palabras = texto.split(' ');
        const lineas = [];
        let lineaActual = '';

        palabras.forEach(palabra => {
            if ((lineaActual + ' ' + palabra).length > maxCaracteresPorLinea) {
                if (lineaActual !== '') {
                    lineas.push(lineaActual.trim());
                }
                lineaActual = palabra;
            } else {
                lineaActual = lineaActual === '' ? palabra : lineaActual + ' ' + palabra;
            }
        });

        if (lineaActual !== '') {
            lineas.push(lineaActual.trim());
        }

        return lineas;
    }

    downloadPDFFile(pdfBytes, filename) {
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    sanitizeFilename(filename) {
        return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    }

    formatTimeRange(horaInicio, horaFin) {
        if (!horaInicio || !horaFin) return 'Por definir';
        
        const formatTime = (timeStr) => {
            const [hours, minutes] = timeStr.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'P.M.' : 'A.M.';
            const formattedHour = hour % 12 || 12;
            return `${formattedHour}:${minutes} ${ampm}`;
        };
        
        return `${formatTime(horaInicio)} - ${formatTime(horaFin)}`;
    }

    formatDate(dateString) {
        if (!dateString) return 'Por definir';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    validateForm() {
        const required = ['curso', 'fecha', 'horaInicio', 'horaFin', 'inversionNormal', 'modalidad', 'plataforma'];
        return required.every(field => this.formData[field] && this.formData[field].trim() !== '');
    }

    getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }

    showMessage(message, type = 'info') {
        const messageEl = document.createElement('div');
        messageEl.className = `payment-message payment-message-${type}`;
        messageEl.textContent = message;
        document.body.appendChild(messageEl);
        
        setTimeout(() => messageEl.classList.add('show'), 100);
        setTimeout(() => {
            messageEl.classList.remove('show');
            setTimeout(() => messageEl.remove(), 300);
        }, 3000);
    }
}

// Inicialización cuando se carga la página
let paymentSystem;

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando sistema de pagos...');
    paymentSystem = new PaymentSystem();
    window.paymentSystem = paymentSystem;
    window.openPaymentSheet = function(pdfData) {
        if (paymentSystem) {
            paymentSystem.openPaymentModal(pdfData);
        } else {
            console.error('PaymentSystem no disponible');
            alert('Error: Sistema de pagos no disponible');
        }
    };
    console.log('✅ Sistema de pagos listo');
});