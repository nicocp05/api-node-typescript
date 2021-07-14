import { Router } from 'express';
import { check } from 'express-validator';
import { postUser, updateUser, getUsers, deleteUser } from '../controllers/users.controller';
import { validateFields } from '../middlewares/validate-fields';
import validateJWT from '../middlewares/validate.jwt';
import { isAdminRole, validRole } from '../middlewares/validate-roles';
import { isRoleValid, existsEmail, existsUserbyId } from '../helpers/db.validators';

const router = Router();

// URL => /api/users

router.get('/', getUsers);

router.post('/', [
    check('email', 'Email is not valid.').isEmail(),
    check('email').custom( email => existsEmail(email)),
    check('name', 'Name is required.').not().isEmpty(),
    check('password', 'Password is required.').not().isEmpty(),
    check('password', 'Password must contain 6 characters or more.').isLength({min: 6}),
    // check('role', 'Role is not valid.').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( role => isRoleValid(role)),
    validateFields
], postUser);

router.put('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(existsUserbyId),
    check('role').custom( role => isRoleValid(role)),
    validateFields
],updateUser);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    validRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(existsUserbyId),
    validateFields
], deleteUser);

export default router;