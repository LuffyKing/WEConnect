import express from 'express';
import users from '../../controllers/users';
import validation from '../../middlewares/validation';

const authRouter = express.Router();

authRouter.post('/login', validation.loginValidator, users.loginUser);

authRouter.post('/signup', validation.signUpValidator, users.signupUser);

export default authRouter;
