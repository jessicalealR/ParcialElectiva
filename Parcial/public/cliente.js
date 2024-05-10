document.addEventListener('DOMContentLoaded', async () => {
    const productosVenta = [];

    try {
        
        const response = await fetch('../data.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo de productos.');
        }
        const data = await response.json();
        const productos = data.products;

        
        const selectProducto = document.getElementById('producto');


        Object.values(productos).forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.code;
            option.textContent = producto.description;
            selectProducto.appendChild(option);
        });

      
        document.getElementById('formularioVenta').addEventListener('submit', async (event) => {
            event.preventDefault();
            const productCode = document.getElementById('producto').value;
            const quantity = parseInt(document.getElementById('cantidad').value);
            const producto = productos[productCode];

            
            if (producto.stock < quantity) {
                document.getElementById('mensajeError').style.display = 'block';
                return;
            } else {
                document.getElementById('mensajeError').style.display = 'none';
            }

          
            const subtotal = quantity * producto.value;
            const productoVenta = { ...producto, quantity, subtotal };
            productosVenta.push(productoVenta);

            
            actualizarTablaVenta(productosVenta);

            
            calcularTotalVenta(productosVenta);
        });
    } catch (error) {
        console.error(error);
    }
});


function actualizarTablaVenta(productosVenta) {
    const tablaVenta = document.getElementById('productosVenta');
    tablaVenta.innerHTML = '';
    productosVenta.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${producto.description}</td>
        <td>${producto.quantity}</td>
        <td>$${producto.value}</td>
        <td>$${producto.subtotal}</td>
      `;
        tablaVenta.appendChild(row);
    });
}

function calcularTotalVenta(productosVenta) {
    const totalVenta = productosVenta.reduce((total, producto) => total + producto.subtotal, 0);
    document.getElementById('totalVenta').textContent = `Total de la venta: $${totalVenta}`;
}
