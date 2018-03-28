import express from 'express';
import ReviewsController from '../../controllers/reviews';
import validation from '../../middlewares/validation';
/**
 * It initializes an express router and uses the merges the route to get the
 * businessid parameter
 */
const reviewRouter = express.Router({ mergeParams: true });

/**
 *It creates a post route on / to work with the addReview method
 */
reviewRouter.post('/', validation.addReviewValidator, ReviewsController.addReview);
/**
 *It creates a get route on / to work with the addReview method
 */
reviewRouter.get('/', validation.businessidValidator, ReviewsController.getAllReviews);

export default reviewRouter;
