const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definición del modelo de Producto
const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    categoria: {
        type: DataTypes.STRING,
        defaultValue: true
    }
}, {
    tableName: 'producto', // Nombre de la tabla en la base de datos
    timestamps: false     // Deshabilita los timestamps (createdAt y updatedAt)
});





module.exports = Producto;
