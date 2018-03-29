import db from '../models';
/**
 * A class that handles the reviews api operation
 */
const ReviewsContoller = {
   /**
  * It adds a review to a business based on the businessid
  * @param {Object} req - request object containing params and body
  * @param {Object} res - response object that conveys the result of the request
  * @returns {Object} - response object that has a status code of either 200 ,
  * 400 and 404 depending on whether the businessid is found within the list of
  * businesses or the completeness of the review data posted, if it is a 200
  * response the newReview is sent as a response as well as a success message
  * other responses are accompanied with an error message
  */
  addReview:(req, res) => {
    const {
      userid,
      rating,
      description,
      firstName,
      lastName
    } = req.body;

    const {
      businessid
    } = req.params;
    return db.Reviews
      .create({
        businessid,
        userid,
        rating,
        description,
        firstName,
        lastName
      })
      .then(newReview => res.status(201).send({
        message: 'Successfully created a new review',
        newReview
      }))
      .catch(error => res.status(400).send({
        message: error
      }));
  },
    /**
  * It gets all reviews about a business based on the businessid posted
  * @param {Object} req - request object containing params and body
  * @param {Object} res - response object that conveys the result of the request
  * @returns {Object} - response object that has a status code of either 200
  * and a list of reviews for a business or 404 depending on whether the
  * businessid is found within the list of businesses
  */
  getAllReviews: (req, res) => {
    const {
      businessid
    } = req.params;
    return db.Reviews.findAll({
      where: {
        businessid
      }
    }).then((reviews) => {
      const hasReviews = !!reviews;
      if (hasReviews) {
        return res.status(200).send({
          message: 'Successfully retrieved reviews',
          reviews
        });
      } else if (!hasReviews) {
        return res.status(404).send({
          message: 'No Reviews Found'
        });
      }
    })
      .catch(error => res.status(400).send({
        message: error
      }));
  }
}

export default ReviewsContoller;
