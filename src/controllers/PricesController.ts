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
}

export default PricesController;