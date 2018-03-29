import express from 'express';
import ReviewsController from '../../controllers/reviews';
import validation from '../../middlewares/validation';

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.post('/', validation.addReviewValidator, ReviewsController .addReview);

reviewRouter.get('/', validation.businessidValidator, ReviewsController .getAllReviews);

export default reviewRouter;
