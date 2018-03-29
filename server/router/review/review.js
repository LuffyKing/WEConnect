import express from 'express';
import Reviews from '../../controllers/Reviews';
import validation from '../../middlewares/validation';

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.post('/', validation.addReviewValidator, Reviews.addReview);

reviewRouter.get('/', validation.businessidValidator, Reviews.getAllReviews);

export default reviewRouter;
