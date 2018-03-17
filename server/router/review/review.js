import express from 'express';
import ReviewsController from '../../controllers/reviews';
import { reviews, businesses, users } from '../../dummy-data/database';
/**
 * It initializes an express router and uses the merges the route to get the
 * businessid parameter
 */
const reviewRouter = express.Router({ mergeParams: true });
/**
 * It initializes an instance reviews controller
 */
const reviewsCont = new ReviewsController(businesses, reviews, users);
/**
 *It creates a post route on / to work with the addReview method
 */
reviewRouter.post('/', reviewsCont.addReview);


export default reviewRouter;
