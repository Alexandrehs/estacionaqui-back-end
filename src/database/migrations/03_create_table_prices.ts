import Knex from 'knex';

export async function up(knex: Knex) {
	return knex.schema.createTable('prices', table => {
		table.increments('id').primary();
		table.string('price').notNullable();
		table.string('minute_min').notNullable();
		table.string('minute_max').notNullable();
	});
}

export async function down(knex: Knex) {
	return knex.schema.dropTable('prices');
}