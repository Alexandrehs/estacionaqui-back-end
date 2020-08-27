import knex from '../database/connection';
import {Request, Response} from 'express';

class PricesController {
	async index(request: Request, response: Response) {
		const pricesAll = await knex('prices').select('*');

		if(pricesAll) {
			return response.json(pricesAll);
		}
	}

	async create(request: Request, response: Response) {
		const {price, minute_min, minute_max} = request.body;
		
		const newPrice = await knex('prices').insert({
			price,
			minute_min,
			minute_max
		});

		if(newPrice) {
			return response.json(newPrice);
		}
 	}

 	async show(request: Request, response: Response) {
 		const {time_in, time_out} = request.body;

    const timeInReplace = time_in.split(':');
    const timeOutReplace = time_out.split(':');

    const hours = (timeOutReplace[0] - timeInReplace[0]);
    const minute = (timeOutReplace[1] - timeInReplace[1]);

    const minutesParked = ((hours * 60) + minute);

    const minutesPrice = await knex('prices').select('id', 'price', 'minute_max', 'minute_min');
    
    minutesPrice.map(item => {
      if((minutesParked > item.minute_min) && (minutesParked <= item.minute_max)) {
        return response.json({
          tempoEstacionado: minutesParked,
          minimo: item.minute_min,
          maximo: item.minute_max,
          preco: item.price
        });
      }
    });
 	}
}

export default PricesController;