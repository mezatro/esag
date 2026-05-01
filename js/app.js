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


    doc.setFontSize(11);
    doc.text(`Codigo de Creendencial: ${codigo}`, 148, 170, {align: 'center'});
    
    doc.save(`Certificado_ESAG_${id}.pdf`);
}
