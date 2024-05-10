const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Datos de productos
const productsData = {
  "4356df34": { "code": "4356df34", "description": "Jabón de Baño", "stock": 434, "value": 8500, "stockMin": 10 },
  "83hfgr4": { "code": "83hfgr4", "description": "Cepillo Bucal", "stock": 533, "value": 12800, "stockMin": 5 },
  // Resto de los productos...
};

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('cliente', { productos: productsData });
});

app.post('/venta/agregar', (req, res) => {
  const { productCode, quantity } = req.body;
  const product = productsData[productCode];

  if (!product) {
    res.status(404).json({ message: "Producto no encontrado" });
    return;
  }

  if (product.stock < quantity) {
    res.status(400).json({ message: "No hay suficiente stock disponible" });
    return;
  }


  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
