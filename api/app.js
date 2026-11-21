// API Express: GET /productos?q=texto  → filtra por nombre o categoría.
// Ejecutar: npm start  · Exponer: ngrok http 3000
const express = require('express');

const productos = [
  { id: 1, nombre: 'Audífonos Bluetooth', categoria: 'Electrónica', precio: 120, descripcion: 'Audífonos inalámbricos con cancelación de ruido.' },
  { id: 2, nombre: 'Teclado mecánico', categoria: 'Electrónica', precio: 90, descripcion: 'Teclado con switches azules y luz RGB.' },
  { id: 3, nombre: 'Lámpara de escritorio', categoria: 'Hogar', precio: 45, descripcion: 'Lámpara LED con brillo regulable.' },
  { id: 4, nombre: 'Silla ergonómica', categoria: 'Hogar', precio: 310, descripcion: 'Silla con soporte lumbar ajustable.' },
  { id: 5, nombre: 'Balón de fútbol', categoria: 'Deportes', precio: 35, descripcion: 'Balón talla 5 para césped.' },
  { id: 6, nombre: 'Raqueta de tenis', categoria: 'Deportes', precio: 150, descripcion: 'Raqueta de grafito ligera.' },
  { id: 7, nombre: 'Cien años de soledad', categoria: 'Libros', precio: 25, descripcion: 'Novela de Gabriel García Márquez.' },
  { id: 8, nombre: 'El principito', categoria: 'Libros', precio: 15, descripcion: 'Clásico de Antoine de Saint-Exupéry.' },
  { id: 9, nombre: 'Chaqueta impermeable', categoria: 'Ropa', precio: 80, descripcion: 'Chaqueta liviana para lluvia.' },
  { id: 10, nombre: 'Gorra deportiva', categoria: 'Ropa', precio: 20, descripcion: 'Gorra ajustable transpirable.' },
];

const app = express();

app.get('/productos', (req, res) => {
  const q = String(req.query.q ?? '').trim().toLowerCase();
  res.json(productos.filter(p => p.nombre.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q)));
});

app.listen(3000, () => console.log('API en http://localhost:3000/productos?q=libro'));
