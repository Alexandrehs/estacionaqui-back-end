import {Router} from 'express';
import cors from 'cors';

const routes = Router();

routes.get('/', () => console.log('abestadu'));

export default routes;