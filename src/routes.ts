import {Router} from 'express';
import cors from 'cors';

import CarsController from './controllers/CarsController';

const routes = Router();

const carsController = new CarsController();

routes.post('/cars', cors(), carsController.create);
routes.post('/cars/:id', cors(), carsController.remove);
routes.get('/cars', cors(), carsController.show);

export default routes;