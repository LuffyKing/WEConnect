import express from 'express';
import UserController from '../../controllers/Users';
import validation from '../../middlewares/validation';

const authRouter = express.Router();

authRouter.post('/login', validation.loginValidator, UserController.loginUser);

authRouter.post('/signup', validation.signUpValidator, UserController.signupUser);

export default authRouter;
