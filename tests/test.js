const request = require('supertest');
const app = require('../index'); // Asegúrate de exportar app en index.js

describe('API Tests', () => {
    let token;

    beforeAll(async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'admin', password: '1234' });
        token = response.body.token;
    });

    test('GET /equipos debe retornar un array y status 200', async () => {
        const response = await request(app).get('/equipos');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /login con credenciales correctas debe retornar un objecto', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'admin', password: '1234' });
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('object');
    });

    test('POST /login con credenciales incorrectas debe retornar un status 400', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: 'wrong', password: 'wrong' });
        expect(response.statusCode).toBe(400);
    });

    test('POST /equipos/:teamID/jugadores con token válido debe retornar un status 201', async () => {
        const response = await request(app)
            .post('/equipos/1/jugadores')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Player1', position: 1 });
        expect(response.statusCode).toBe(201);
    });
});