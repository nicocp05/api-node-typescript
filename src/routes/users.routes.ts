import { Router } from 'express';

const router = Router();

// /api/users

router.get('/', (req: any, res: any) => {
    res.send('hello')
});



export default router;