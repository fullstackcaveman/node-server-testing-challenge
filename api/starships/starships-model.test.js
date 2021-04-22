const Starship = require('./starships-model');
const db = require('../../data/db-config');

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

test('correct env', () => {
	expect(process.env.DB_ENV).toBe('testing');
});

describe('Starships Model', () => {
	describe('insert function', () => {
		test('add starship to db', async () => {
			let all;
			await Starship.insert(falcon);
			all = await db('starships');
			expect(all).toHaveLength(1);

			await Starship.insert(executor);
			all = await db('starships');
			expect(all).toHaveLength(2);
		});

		test('values of starships', async () => {
			const starship = await Starship.insert(falcon);
			expect(starship).toMatchObject({ id: 1, ...falcon });
		});
	});

	describe('remove function', () => {
		test('delete starship from db', async () => {
			let count;
			await Starship.insert(falcon);
			count = await db('starships');
			expect(count).toHaveLength(1);

			await Starship.remove(1);
			count = await db('starships');
			expect(count).toHaveLength(0);
		});
	});
});
