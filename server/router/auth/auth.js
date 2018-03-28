import express from 'express';
import authController from '../../controllers/auth';
import validation from '../../middlewares/validation';
/**
 * It initializes an express router
 */
const authRouter = express.Router();
/**
 * It initializes an instance auth controller
 */
/**
 *It creates a post route on /login to work with the loginUser method
 */
authRouter.post('/login', validation.loginValidator, authController.loginUser);
/**
 *It creates a post route on /signup to work with the signupUser method
 */
authRouter.post('/signup', validation.signUpValidator, authController.signupUser);

export default authRouter;
