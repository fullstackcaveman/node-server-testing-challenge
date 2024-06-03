const request = require('supertest');
const db = require('../../data/db-config');
const server = require('../server');

const falcon = { name: 'Millennium Falcon', class: 'Light freighter' };
const executor = { name: 'Executor', class: 'Star Dreadnought' };

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

beforeEach(async () => {
	await db('starships').truncate();
});

afterAll(async () => {
	await db.destroy();
});

describe('server', () => {
	describe('GET/api/starships', () => {
		test('responds with status 200', async () => {
			const res = await request(server).get('/api/starships');
			expect(res.status).toBe(200);
		});

		test('returns correct number of starships', async () => {
			let res;
			await db('starships').insert(falcon);
			res = await request(server).get('/api/starships');
			expect(res.body).toHaveLength(1);

			await db('starships').insert(executor);
			res = await request(server).get('/api/starships');
			expect(res.body).toHaveLength(2);
		});

		test('returns correct starship format', async () => {
			await db('starships').insert(falcon);
			await db('starships').insert(executor);

			const res = await request(server).get('/api/starships');
			expect(res.body[0]).toMatchObject({ id: 1, ...falcon });
			expect(res.body[1]).toMatchObject({ id: 2, ...executor });
		});
	});

	describe('DELETE/api/starship/:id', () => {
		test('deletes starship by id', async () => {
			await db('starships').insert(falcon);
			await db('starships').insert(executor);

			await request(server).delete('/api/starships/1');

			const res = await request(server).get('/api/starships');
			expect(res.body.length).toBe(1);
		});
	});
});
