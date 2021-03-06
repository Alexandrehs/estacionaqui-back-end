import {Request, Response} from 'express';
import knex from '../database/connection';

class ParkingController {
  async show(request: Request, response: Response) {
    const date = request.query.date;
    
    if(date) {
      const parking = await knex('parking')
        .select("*").where({'created_in': date});

      if(parking.length > 0) {
        return response.json(parking);
      }else {
        return response.json({msg: 'not parking created.'});
      }
    }
  }

  async create(request: Request, response: Response) {
    const date = new Date();

    const idNewParking = 
      await knex('parking')
        .insert({'created_in': `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`});
    
    if(idNewParking.length > 0) {
      return response.json(idNewParking[0]);
    }
  }
}

export default ParkingController;