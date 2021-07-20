import { Router } from 'express';
import { check } from 'express-validator';
import { googleSignIn, login } from '../controllers/auth.controller';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

// URL => /api/auth

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required.').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'The id_token is required').not().isEmpty(),
    validateFields
], googleSignIn);

export default router;