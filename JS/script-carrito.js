document.addEventListener('DOMContentLoaded', function () {
    actualizarCarrito();

    var botones = document.querySelectorAll('.btn-agregar');
    botones.forEach(function (boton) {
        boton.addEventListener('click', function () {
            var carrito = obtenerCarrito();

            var producto = {
                id: this.dataset.id,
                nombre: this.dataset.nombre,
                precio: parseFloat(this.dataset.precio),
                imagen: this.dataset.imagen,
                cantidad: 1
            };

            var existente = carrito.find(function (item) {
                return item.id === producto.id;
            });

            if (existente !== null && existente !== undefined) {
                existente.cantidad++;
            } else {
                carrito.push(producto);
            }

            guardarCarrito(carrito);
            actualizarCarrito();
            mostrarMensaje('Producto añadido al carrito');
        });
    });

    var icono = document.querySelector('.carrito-icon');
        icono.addEventListener('click', mostrarCarrito);

});

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarCarrito() {
    var carrito = obtenerCarrito();
}

function mostrarCarrito() {
    var carrito = obtenerCarrito();
    var modal = document.querySelector('.modal-carrito');
    var contenido = modal.querySelector('.modal-carrito-contenido');

    if (carrito.length === 0) {
        contenido.innerHTML = '<div class="carrito-vacio"><p>El carrito está vacío</p></div>';
    } else {
        var total = carrito.reduce(function (acum, producto) {
            return acum + producto.precio * producto.cantidad;
        }, 0);

        var productosHTML = carrito.map(function (producto) {
            return `
                <div class="producto-carrito">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="info-producto">
                        <h3>${producto.nombre}</h3>
                        <p>Precio: S/${producto.precio}</p>
                        <p>Cantidad: ${producto.cantidad}</p>
                        <button class="btn-eliminar" onclick="eliminarDelCarrito('${producto.id}')">Eliminar</button>
                    </div>
                </div>`;
        }).join('');

        contenido.innerHTML = `
            <div class="productos-carrito">${productosHTML}</div>
            <div class="total-carrito">
                <h3>Total: S/${total.toFixed(2)}</h3>
                <button class="btn-finalizar">Finalizar Compra</button>
                <button class="btn-cerrar" onclick="cerrarCarrito()">Cerrar</button>
            </div>`;
    }

    modal.classList.add('active');
}

function cerrarCarrito() {
    var modal = document.querySelector('.modal-carrito');
    if (modal !== null && modal !== undefined) {
        modal.classList.remove('active');
    }
}

function eliminarDelCarrito(id) {
    var carrito = obtenerCarrito().filter(function (producto) {
        return producto.id !== id;
    });

    guardarCarrito(carrito);
    actualizarCarrito();
    mostrarCarrito();
}

function mostrarMensaje(msg) {
    var mensaje = document.createElement('div');
    mensaje.className = 'mensaje-carrito';
    mensaje.textContent = msg;
    document.body.appendChild(mensaje);

    setTimeout(function () {
        mensaje.remove();
    }, 2000);
}

