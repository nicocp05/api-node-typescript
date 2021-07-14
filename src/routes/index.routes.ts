import express, { Application } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './users.routes';

const router: Application = express();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);


export default router;