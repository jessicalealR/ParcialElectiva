const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const fs = require('fs');
const productsData = JSON.parse(fs.readFileSync('./public/data.json', 'utf-8'));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { productos: Object.values(productsData.products) }); 
});

app.post('/venta/agregar', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
