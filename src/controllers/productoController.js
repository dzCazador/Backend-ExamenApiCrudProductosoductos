const objProducto = require('../models/productoModel');
const { body, validationResult } = require('express-validator');


// Controlador para obtener todos los Productos
exports.getAllProductos = async (req, res) => {
    try {
        const Productos = await objProducto.findAll();
        res.status(200).json({
            ok: true,
            data: Productos,
            msg: "Estos son los Productos"
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los Productos' });
    }
};

// Controlador para buscar un Producto por ID
exports.getProductoById = async (req, res) => {
    const { id } = req.params;

    try {
        const Producto = await objProducto.findByPk(id);

        if (Producto) {
            res.status(200).json({
                ok: true,
                data: Producto
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: "No encontrado"
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el Producto' });
    }
};

// Controlador para crear un nuevo Producto
exports.createProducto = [
    body('nombre').notEmpty().withMessage('El nombre es requerido').trim().escape(),
    body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
    body('cantidad').isInt({ min: 0 }).withMessage('La cantidad debe ser un entero positivo'),
    body('categoria').notEmpty().withMessage('La categoría es requerida').trim().escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { nombre, precio, cantidad, categoria } = req.body;

        try {
            // Crear nuevo Producto
            const nuevoProducto = await objProducto.create({
                nombre,
                precio,
                cantidad,
                categoria
            });

            // Responder con el Producto creado
            res.status(201).json(nuevoProducto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el Producto' });
        }
    }
]

// Controlador para actualizar un Producto
exports.updateProducto = [
    body('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío').trim().escape(),
    body('precio').optional().isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
    body('cantidad').optional().isInt({ min: 0 }).withMessage('La cantidad debe ser un entero positivo'),
    body('categoria').optional().notEmpty().withMessage('La categoría no puede estar vacía').trim().escape(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const { nombre, precio, cantidad, categoria } = req.body;

        try {
            const Producto = await objProducto.findByPk(id);

            if (!Producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            Producto.nombre = nombre || Producto.nombre;
            Producto.precio = precio || Producto.precio;
            Producto.cantidad = cantidad || Producto.cantidad;
            Producto.categoria = categoria || Producto.categoria;

            await Producto.save();
            res.status(200).json(Producto);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ error: 'El DNI o el email ya están en uso' });
            }
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el Producto' });
        }
    }
]

// Controlador para eliminar un Producto
exports.deleteProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const Producto = await objProducto.findByPk(id);

        if (!Producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await Producto.destroy();
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el Producto' });
    }
};




// Controlador para obtener todos los Productos Ordenados
exports.getAllProductosOrdered = async (req, res) => {
    const {criterio} = req.params
    try {
        const Productos = await objProducto.findAll();
        switch (criterio) { 
            case 'precio':
                Productos.sort((a, b) => a.dataValues.precio - b.dataValues.precio);
                break;
            case 'nombre':
                Productos.sort((a, b) => a.dataValues.nombre.localeCompare(b.dataValues.nombre));
                break;
            case 'cantidad':
                Productos.sort((a, b) => a.dataValues.cantidad - b.dataValues.cantidad);
                break;   
            //Si el criterio enviado no es alguno de los indicados no se ordena.             
        }  

        res.status(200).json({
            ok: true,
            data: Productos,
            msg: "Estos son los Productos Ordenados"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los Productos' });
    }
};

// Controlador para obtener todos los Productos Filtrados
exports.getAllProductosFiltered = async (req, res) => {
    const {criterio} = req.params
    const {valor} = req.query

    try {
        let Productos = await objProducto.findAll();

        switch (criterio) { 
            case 'precioMayor':
          
                Productos = Productos.filter(p=>p.dataValues.precio>=valor)
                break;
            case 'categoria':
                Productos = Productos.filter(p=>p.dataValues.categoria==valor)
                break;   
            //Si el criterio enviado no es alguno de los indicados no se filtra.             
        }  
        if (Productos.length>0) //Se encontraron registros del producto
            res.status(200).json({
                ok: true,
                data: Productos,
                msg: "Estos son los Productos de acuerdo al filtro"
            });
        else //No se encontraron registros del producto 
            res.status(404).json({
                ok: false,
                msg: "No se encontraro productos con el criterio enviado"
            }); 

    } catch (error) {

        res.status(500).json({ error: 'Error al obtener los Productos' });
    }
};