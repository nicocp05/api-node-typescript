import express, { Application } from 'express';
import userRoutes from './users.routes';

const router: Application = express();

router.use('/users', userRoutes);


export default router;