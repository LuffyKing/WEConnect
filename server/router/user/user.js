import express from 'express';
import User from '../../controllers/User';
import validation from '../../middlewares/validation';

const authRouter = express.Router();

authRouter.post('/login', validation.loginValidator, User.loginUser);

authRouter.post('/signup', validation.signUpValidator, User.signupUser);

export default authRouter;
