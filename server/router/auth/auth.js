import express from 'express';
import authController from '../../controllers/auth';
import { users } from '../../dummy-data/database';
import validation from '../../middlewares/validation';
/**
 * It initializes an express router
 */
const authRouter = express.Router();
/**
 * It initializes an instance auth controller
 */
const auth = new authController(users);
/**
 *It creates a post route on /login to work with the loginUser method
 */
authRouter.post('/login', validation.loginValidator, auth.loginUser);
/**
 *It creates a post route on /signup to work with the signupUser method
 */
authRouter.post('/signup', validation.signUpValidator, auth.signupUser);

export default authRouter;
