window.addEventListener('load', function () {
    localStorage.removeItem('contactos');
});

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formu-contacto');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const motivo = document.getElementById('motivo').value;

        // Validacion de campos
        if (nombre === '' || telefono === '' || correo === '' || motivo === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Crear objeto con los datos
        const datosContacto = {
            nombre,
            telefono,
            correo,
            motivo,
            fechaEnvio: new Date().toLocaleString()
        };

        let contactos = JSON.parse(localStorage.getItem('contactos')) || [];
        contactos.push(datosContacto);
        localStorage.setItem('contactos', JSON.stringify(contactos));

        alert('Gracias por contactarnos. Pronto te responderemos.');

        formulario.reset();
    });
});
