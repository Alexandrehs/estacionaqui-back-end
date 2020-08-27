import {Router} from 'express';
import cors from 'cors';

import CarsController from './controllers/CarsController';
import ParkingController from './controllers/ParkingController';
import CarParkingController from './controllers/CarParkingController';
import PricesController from './controllers/PricesController';

const routes = Router();

const carsController = new CarsController();
const parkingController = new ParkingController();
const carParkingController = new CarParkingController();
const pricesController = new PricesController();

routes.post('/cars', cors(), carsController.create);
routes.post('/cars/:parking_id', cors(), carsController.remove);
routes.get('/cars', cors(), carsController.show);

routes.post('/parking', cors(), parkingController.create);
routes.get('/parking', cors(), parkingController.show);
routes.get('/parking_all', cors(), parkingController.index);

routes.get('/car_parking/:id', cors(), carParkingController.show);
routes.post('/car_parking', cors(), carParkingController.remove);

routes.post('/prices', cors(), pricesController.create);
routes.get('/prices/', cors(), pricesController.show);

export default routes;