import express from 'express';
import swaggerUi from 'swagger-ui-express';
import user from './user/user';
import business from './business/business';
import review from './review/review';
import swaggerDocument from '../swagger/swaggerDocument';

const router = express.Router();

router.use('/auth', user);

router.use('/businesses', business);

router.use('/businesses/:businessid/reviews', review);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
