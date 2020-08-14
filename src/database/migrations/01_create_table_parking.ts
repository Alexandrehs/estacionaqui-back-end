import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('parking', table => {
    table.increments('id').primary();
    table.string('created_in').notNullable();
    table.boolean('status').defaultTo(false).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('parking');
} 