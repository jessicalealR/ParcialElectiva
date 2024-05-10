document.addEventListener('DOMContentLoaded', async () => {
    const productosSelect = document.getElementById('producto');
    const response = await fetch('/productos');
    const productos = await response.json();
    for (const producto of Object.values(productos)) {
      const option = document.createElement('option');
      option.value = producto.code;
      option.textContent = producto.description;
      productosSelect.appendChild(option);
    }
  
    document.getElementById('formularioVenta').addEventListener('submit', async (event) => {
      event.preventDefault();
      const productCode = document.getElementById('producto').value;
      const quantity = parseInt(document.getElementById('cantidad').value);
      try {
        const response = await fetch('/venta/agregar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productCode, quantity })
        });
        if (!response.ok) {
          throw new Error('Error al agregar el producto a la venta');
        }
        window.location.reload();
      } catch (error) {
        console.error('Error:', error.message);
      }
    });
  });
  