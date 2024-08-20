require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/database');
const productoRoutes = require('./routes/productoRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(express.static('public'));

// Rutas
app.use('/productos',validarToken, productoRoutes);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    const user = {username: username, password: password}
    const accessToken = generarToken(user);
    res.status(200).json({accessToken: accessToken,message:'Acceso Correcto'})

});

function generarToken(user) {
    // Implementación del generador de token
    return jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '5m'})    
}

function validarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Token no proporcionado' });
    jwt.verify(token, process.env.SECRET_KEY,(error,user) => {
        if (error) return res.status(403).json({ message: 'Token inválido' });
        next();
    });
}


// Iniciar el servidor

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
