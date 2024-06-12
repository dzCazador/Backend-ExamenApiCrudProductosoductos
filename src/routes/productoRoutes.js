const express = require('express');
const ProductoController = require('../controllers/productoController');
const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', ProductoController.getAllProductos);

// Ruta para buscar un Producto por ID
router.get('/:id', ProductoController.getProductoById);

// Ruta para crear un nuevo Producto
router.post('/', ProductoController.createProducto);

// Ruta para actualizar un Producto
router.put('/:id', ProductoController.updateProducto);

// Ruta para eliminar un Producto
router.delete('/:id', ProductoController.deleteProducto);

// Obtener una lista de productos ordenada según uno de los siguientes criterios (nombre, precio, cantidad)
router.get('/ordenados/:criterio', ProductoController.getAllProductosOrdered);

// Obtener una lista de productos que cumplan con ciertas condiciones. 
// Por ejemplo, productos cuyo precio sea mayor a un valor dado
// o productos que pertenezcan a una categoria específica. Las condiciones deben ser
// pasadas como parámetros de consulta.
router.get('/filtrados/:criterio', ProductoController.getAllProductosFiltered);

module.exports = router;
