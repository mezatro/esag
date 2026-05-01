function verificar() {
    const codigo = document.getElementById('cert-code').value.trim().toUpperCase();
    const resDiv = document.getElementById('resultado');
    const cert = DB_CERTIFICADOS[codigo];

    if (cert) {
        resDiv.style.display = 'block';
        resDiv.innerHTML = `
            <div class="success-msg">✓ Certificado Válido</div>
            <p><strong>Participante:</strong> ${cert.nombre}</p>
            <p><strong>Curso:</strong> ${cert.curso}</p>
            <p><strong>Fecha:</strong> ${cert.fecha}</p>
            <button class="btn-pdf" onclick="generarPDF('${codigo}')">Descargar PDF Oficial</button>
        `;
    } else {
        resDiv.style.display = 'block';
        resDiv.innerHTML = `<p style="color:red">⚠️ Código no encontrado.</p>`;
    }
}

function generarPDF(id) {
    const cert = DB_CERTIFICADOS[id];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape' });

    // Diseño del PDF con colores ESAG
    doc.setFillColor(10, 74, 52); // Verde ESAG
    doc.rect(0, 0, 297, 20, 'F');
    
    doc.setFontSize(22);
    doc.text("CERTIFICADO DE PARTICIPACIÓN", 148, 50, {align: 'center'});
    
    doc.setFontSize(16);
    doc.text("La Dirección General del club ESAG PUCP tiene el honor de certificar a:", 148, 70, {align: 'center'});
    
    doc.setFontSize(28);
    doc.setTextColor(10, 74, 52);
    doc.text(cert.nombre, 148, 90, {align: 'center'});
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(`Por haber sido parte de: ${cert.curso}`, 148, 110, {align: 'center'});
    doc.text(`Fecha de emisión: ${cert.fecha}`, 148, 130, {align: 'center'});


    const imgFirma = 'assets/firma.png'; 
    try {
        doc.addImage(imgFirma, 'assets/firma-ceo.png', 118, 135, 60, 25);
    } catch (e) {
        console.error("Firma", e);
    }

    // 2. Línea de firma
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(108, 162, 188, 162); // (x1, y1) a (x2, y2)

    // 3. Nombre y Cargo
    doc.setFontSize(12);
    doc.text("Matias Aaron Alvarado Ramirez", 148, 168, { align: 'center' });
    doc.setFontSize(10);
    doc.text("Director General", 148, 174, { align: 'center' });



    doc.setFontSize(10);
    doc.text(`Codigo de Creendencial: ${id}`, 188, 190, {align: 'center'});
    
    doc.save(`Certificado_ESAG_${id}.pdf`);
}
