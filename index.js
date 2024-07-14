// index.js
const express = require('express');
const app = express();
const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores')
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos')
const { generateToken, authenticateToken } = require('./controllers/auth');

app.listen(3000, console.log("SERVER ON"));
app.use(express.json())

// rutas
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        const token = generateToken({ username });
        res.json({ token });
    } else {
        res.sendStatus(400);
    }
});

app.get("/equipos", obtenerEquipos)
app.post('/equipos', authenticateToken, agregarEquipo);

app.get("/equipos/:teamID/jugadores", obtenerJugadores)
app.post('/equipos/:teamID/jugadores', authenticateToken, registrarJugador);

module.exports = app;