document.addEventListener("DOMContentLoaded", function () {
    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    let tabla = document.getElementById("tablaReservas");

    function cargarTabla() {
        tabla.innerHTML = "";

        reservas.forEach((reserva, index) => {
            let fila = `
                <tr>
                    <td>${reserva.nombre}</td>
                    <td>${reserva.email}</td>
                    <td>${reserva.telefono}</td>
                    <td>${reserva.servicio}</td>
                    <td>${reserva.fecha}</td>
                    <td>${reserva.hora}</td>
                    <td><button class="btn-danger" onclick="eliminar(${index})">Eliminar</button></td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });
    }

    cargarTabla();

    // Hacer accesible la función
    window.eliminar = function (i) {
        reservas.splice(i, 1);
        localStorage.setItem("reservas", JSON.stringify(reservas));
        cargarTabla();
    }
});