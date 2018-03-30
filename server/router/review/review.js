import express from 'express';
import reviews from '../../controllers/reviews2';
import validation from '../../middlewares/validation';
import verifyToken from '../../middlewares/verifyToken';

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.post('/', verifyToken, validation.addReviewValidator, reviews.addReview);

reviewRouter.get('/', verifyToken, validation.businessidValidator, reviews.getAllReviews);

export default reviewRouter;
