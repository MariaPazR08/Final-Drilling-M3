// Clase Producto
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Clase Carrito
class Carrito {
    constructor() {
        this.productos = [];  // Arreglo para almacenar productos seleccionados
        this.total = 0;  // Total de la compra
        this.descuento = 0;  // Descuento a aplicar
    }

    // Función para agregar productos al carrito
    agregarProducto(producto, cantidad) {
        if (cantidad < 1) {
            alert("Cantidad no válida.");
            return;
        }
        for (let i = 0; i < cantidad; i++) {
            this.productos.push(producto);
        }
        this.mostrarDetalles();
    }

    // Función para calcular el total
    calcularTotal() {
        this.total = this.productos.reduce((total, producto) => total + producto.precio, 0);
        return this.total - this.descuento;
    }

    // Función para aplicar un descuento
    aplicarDescuento(descuento) {
        if (descuento > this.total) {
            alert("El descuento no puede ser mayor que el total.");
            return;
        }
        this.descuento = descuento;
        alert(`Descuento aplicado: $${descuento}`);
        this.mostrarDetalles();
    }

    // Función para finalizar la compra
    finalizarCompra() {
        if (this.productos.length === 0) {
            alert("El carrito está vacío. No se puede finalizar la compra.");
            return;
        }
        const totalCompra = this.calcularTotal();
        alert(`Compra finalizada. Total a pagar: $${totalCompra}`);
        this.limpiarCarrito();  // Limpiar el carrito después de la compra
        document.getElementById("final-message").innerHTML = `<p><strong>Compra realizada exitosamente. Total pagado: $${totalCompra}</strong></p>`;
    }

    // Función para mostrar detalles del carrito
    mostrarDetalles() {
        const cartDetails = document.getElementById("cart-details");
        cartDetails.innerHTML = '';  // Limpiar contenido previo
        if (this.productos.length === 0) {
            cartDetails.innerHTML = "<p>El carrito está vacío</p>";
            return;
        }

        // Mostrar detalles
        let detalles = {};
        this.productos.forEach((producto) => {
            if (detalles[producto.nombre]) {
                detalles[producto.nombre].cantidad++;
            } else {
                detalles[producto.nombre] = { precio: producto.precio, cantidad: 1 };
            }
        });

        for (let [nombre, info] of Object.entries(detalles)) {
            cartDetails.innerHTML += `<p>${info.cantidad}x ${nombre} - $${info.precio} cada uno</p>`;
        }

        const total = this.calcularTotal();
        cartDetails.innerHTML += `<p class="total">Total (con descuento): $${total}</p>`;
    }

    // Limpiar el carrito
    limpiarCarrito() {
        this.productos = [];
        this.total = 0;
        this.descuento = 0;
        this.mostrarDetalles();
    }
}

// Lista de productos disponibles
const inventario = [
    new Producto('Leche', 1000),
    new Producto('Pan de Molde', 2000),
    new Producto('Queso', 1200),
    new Producto('Mermelada', 890),
    new Producto('Azúcar', 1300)
];

// Inicializamos el carrito
const carrito = new Carrito();

// Manejar el botón de agregar producto al carrito
document.getElementById("add-to-cart").addEventListener("click", () => {
    const numeroProducto = parseInt(document.getElementById("product-number").value);
    const cantidad = parseInt(document.getElementById("product-quantity").value);

    // Validar que el número de producto es correcto
    if (numeroProducto < 1 || numeroProducto > inventario.length) {
        alert("Número de producto no válido.");
        return;
    }

    const productoSeleccionado = inventario[numeroProducto - 1];
    carrito.agregarProducto(productoSeleccionado, cantidad);

    // Limpiar inputs
    document.getElementById("product-number").value = '';
    document.getElementById("product-quantity").value = '';
});

// Manejar el botón de aplicar descuento
document.getElementById("apply-discount").addEventListener("click", () => {
    const descuento = parseInt(document.getElementById("discount").value);
    if (isNaN(descuento) || descuento < 0) {
        alert("Descuento no válido.");
        return;
    }
    carrito.aplicarDescuento(descuento);
    document.getElementById("discount").value = '';
});

// Manejar el botón de finalizar compra
document.getElementById("finalize-purchase").addEventListener("click", () => {
    carrito.finalizarCompra();
});
