import express from 'express';
import authController from '../../controllers/auth';
import { users } from '../../dummy-data/database';
/**
 * It initializes an express router
 */
const authRouter = express.Router();
/**
 * It initializes an instance auth controller
 */
const auth = new authController(users);

/**
 *It creates a post route on /signup to work with the signupUser method
 */
authRouter.post('/signup', auth.signupUser);

export default authRouter;
