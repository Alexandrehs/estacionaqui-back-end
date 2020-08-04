import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('cars', table => {
    table.increments('id').primary();
    table.string('plate').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('cars');
}