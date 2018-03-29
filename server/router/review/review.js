import express from 'express';
import reviews from '../../controllers/reviews';
import validation from '../../middlewares/validation';

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.post('/', validation.addReviewValidator, reviews.addReview);

reviewRouter.get('/', validation.businessidValidator, reviews.getAllReviews);

export default reviewRouter;
