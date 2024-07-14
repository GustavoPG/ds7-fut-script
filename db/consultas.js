// consultas.js
const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'gp2022',
    database: 'futscript',
    allowExitOnIdle: true
})

const getTeams = async () => {
    const result = await pool.query('SELECT id, name FROM equipos');
    return result.rows;
}

const getPlayers = async (teamID) => {
    const result = await pool.query(`
        SELECT jugadores.name, posiciones.name as posicion
        FROM jugadores
        JOIN posiciones ON jugadores.position = posiciones.id
        WHERE id_equipo = $1`, [teamID]);
    return result.rows.map(row => ({
        name: row.name,
        posicion: row.posicion
    }));
}

const addTeam = async (equipo) => {
    const { name } = equipo;
    await pool.query('INSERT INTO equipos (name) VALUES ($1)', [name]);
}

const addPlayer = async ({ jugador, teamID }) => {
    const { name, position } = jugador;
    await pool.query('INSERT INTO jugadores (name, position, id_equipo) VALUES ($1, $2, $3)', [name, position, teamID]);
}

module.exports = { getTeams, addTeam, getPlayers, addPlayer }