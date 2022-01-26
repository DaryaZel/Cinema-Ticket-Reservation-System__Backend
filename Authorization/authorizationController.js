import Service from './authorizationService.js';
import jwt from 'jsonwebtoken';
import { secret } from './config.js';
import { validationResult } from 'express-validator';
import { ValidationError } from '../Errors/ValidationError.js';
import { AppError} from '../Errors/AppError.js';

const generateAccessToken = (id, userRoles) => {
    const payload = {
        id,
        userRoles
    }
    return jwt.sign(payload, secret.secretKey, { expiresIn: '24h' })
}

class Controller {
    async signup(req, res) {
        try {
            const validations = validationResult(req);
            const errorsArray = validations.errors;
            if (errorsArray.length!==0) {
                if (errorsArray.length===1&&errorsArray[0].param === 'username') {
                    throw new ValidationError("Fill in username field");
                }
                else if (errorsArray.length===1&&errorsArray[0].param === 'password') {
                    throw new ValidationError("Fill in password field, password must be at least 4 and no more than 10 symbols");
                }
                else{
                    throw new ValidationError("Fill in all fields, password must be at least 4 and no more than 10 symbols");
                }
            }
            const user = await Service.signup(req.body);
            return res.json(user);
        }
        catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(error.message);
            }
            else {
                return res.status(500).json(error);
            }
        }
    }
    async login(req, res) {
        try {
            const user = await Service.login(req.body);
            const token = generateAccessToken(user._id, user.roles);
            return res.json(token);
        }
        catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json(error.message);
            }
            else {
                return res.status(500).json(error);
            }
        }
    }
    async makeRoles(req, res) {
        try {
            await Service.makeRoles();
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
    async getUsers(req, res) {
        try {
            const users = await Service.getUsers();
            return res.json(users);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}
export default new Controller();
