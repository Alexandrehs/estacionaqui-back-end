import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('car_parking', table => {
    table.increments('id').primary();
    table.string('id_car').references('id').inTable('cars');
    table.string('id_parking').references('id').inTable('parking');
    table.boolean('parked').defaultTo(true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('car_parking');
}