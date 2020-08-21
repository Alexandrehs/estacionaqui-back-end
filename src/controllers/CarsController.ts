import {Request, Response} from 'express';
import knex from '../database/connection';

class CarsController {
  async show(request: Request, response: Response) {
    const allCars = await knex('cars').select('*');

    if(allCars.length > 0) {
      return response.json(allCars);
    }
  }
  
  async create(request: Request, response: Response) {
    const plate = request.body.plate;
    const date = new Date().toLocaleString('pt-BR', {
      day: 'numeric', 
      month: 'numeric',
      year: 'numeric'
    });
    const time_in = new Date().toLocaleTimeString('pt-BR')
    const trx = await knex.transaction();

    const idParking = 
      await trx('parking').select('id')
      .where('created_in', date);

    if(idParking.length > 0) {
      if(plate) {
        const idNewCar = await trx('cars').insert({'plate': plate});
        const newCarParking = 
          await trx('car_parking').insert({
            id_car: idNewCar,
            id_parking: idParking[0].id,
            time_in, 
            time_out: 'in parking'
          });
  
        if(newCarParking.length > 0) {
          trx.commit();
          return response.json({
            id: idNewCar[0],
            plate,
            time_in
          });
        }
      }
    }
  }
  
  async remove(request: Request, response: Response) {
    const id = request.params.id;

    if(id) {
      const deleted = await knex('cars').where('id', id).del();

      if(deleted) {
        return response.json(deleted);
      }
    }
  }
}

export default CarsController;