document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formReserva");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Crear objeto reserva
        let reserva = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            telefono: document.getElementById("telefono").value,
            servicio: document.getElementById("servicio").value,
            fecha: document.getElementById("fecha").value,
            hora: document.getElementById("hora").value
        };

        // Obtener reservas actuales
        let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

        // Agregar nueva
        reservas.push(reserva);

        // Guardar en LocalStorage
        localStorage.setItem("reservas", JSON.stringify(reservas));

        // Mostrar mensaje
        document.getElementById("mensaje").style.display = "block";

        // Limpiar formulario
        form.reset();
    });
});