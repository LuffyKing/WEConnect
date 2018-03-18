import express from 'express';
import swaggerUi from 'swagger-ui-express';
import authRouter from './auth/auth';
import businessRouter from './business/business';
import reviewRouter from './review/review';
import swaggerDocument from '../controllers/yaml/swaggerDocument';
/**
 * It initializes an express router
 */
const router = express.Router();
/**
 * Middleware that allows the router to use the auth router along the /auth route
 */
router.use('/auth', authRouter);
/**
 * Middleware that allows the router to use the businesses router along the /businesses route
 */
router.use('/businesses', businessRouter);
/**
 * Middleware that allows the router to use the review router along the
 * /businesses/:businessid/reviews route
 */
router.use('/businesses/:businessid/reviews', reviewRouter);
/**
  * Middleware for the API docs documented by swagger along the /api-docs
  * route
  */
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
