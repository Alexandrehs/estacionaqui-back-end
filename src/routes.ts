import {Router} from 'express';
import cors from 'cors';

import CarsController from './controllers/CarsController';
import ParkingController from './controllers/ParkingController';
import CarParkingController from './controllers/CarParkingController';

const routes = Router();

const carsController = new CarsController();
const parkingController = new ParkingController();
const carParkingController = new CarParkingController();

routes.post('/cars', cors(), carsController.create);
routes.post('/cars/:id', cors(), carsController.remove);
routes.get('/cars', cors(), carsController.show);

routes.post('/parking', cors(), parkingController.create);
routes.get('/parking', cors(), parkingController.show);

routes.get('/car_parking', cors(), carParkingController.show);

export default routes;