import express from 'express';
import AuthorizationController from './authorizationController.js';
import { check } from 'express-validator';
import { checkUserAccess } from './middleware/checkUserAccessMiddleware.js';

const router = express.Router();
router.post('/signup', [
    check('username', 'Fill in username field').notEmpty(),
    check('email', 'Fill in email field').notEmpty(),
    check('password', 'Password must 4-10 symbols').isLength({ min: 4, max: 10 }),
    check('password', 'Fill in password field').notEmpty()
], AuthorizationController.signup);
router.post('/login', AuthorizationController.login);
router.get('/user', checkUserAccess(['Admin', 'User']), AuthorizationController.getUser);

export default router;
