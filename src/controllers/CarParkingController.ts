import {Request, Response} from 'express';
import Knex from '../database/connection';

class CarParkingController {
  async show(request: Request, response: Response) {    
    const idParking = request.params.id;

    if(idParking) {
      const carsInParking = 
        await Knex('car_parking')
        .where({
          'car_parking.id_parking': idParking,
          'parked': true
        })
        .innerJoin('cars', 'cars.id', 'car_parking.id_car')
        .innerJoin('parking', 'parking.id', 'car_parking.id_parking')
        .select( 
          'cars.id',
          'cars.plate',
          'parking.created_in', 
          'car_parking.time_in',
          'car_parking.parked',
          'car_parking.id as parking_id'
        );

      if(carsInParking.length > 0) {
        return response.json(carsInParking);
      }else {
        return response.json({msg: `not cars in parking id ${idParking}`});
      }
    }
  }

  async remove(request: Request, response: Response) {
    const {time_in, time_out} = request.body;

    const timeInReplace = time_in.split(':');
    const timeOutReplace = time_out.split(':');

    const hours = (timeOutReplace[0] - timeInReplace[0]);
    const minute = (timeOutReplace[1] - timeInReplace[1]);

    return response.json({
      houras: hours,
      minutos: minute
    });
  }  
}

export default CarParkingController;