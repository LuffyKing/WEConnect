import uuidv4 from 'uuid/v4';
import moment from 'moment';
import Businesses from './businesses';
/**
 * A class that handles the reviews api operation
 */
class Reviews extends Businesses {
  /**
 * Takes in a list of businesses,reviews and users binds the class' this to methods
 * getAllReviews, addReview and findUser
 * @param {Object[]} businesses The list of businesses.
 * @param {Object}  reviews object of business objects containing list of reviews.
 * @param {Object[]} users The list of users.
 */
  constructor(businesses, reviews, users) {
    super(businesses);
    this.reviews = reviews;
    this.users = users;
    this.getAllReviews = this.getAllReviews.bind(this);
    this.addReview = this.addReview.bind(this);
    this.findUser = this.findUser.bind(this);
  }
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
  addReview(req, res) {
    const {
      userid,
      rating,
      description
    } = req.body;
    const {
      businessid
    } = req.params;
    const userSearchResult = this.findUser(userid);
    const isValidUser = !!userSearchResult;
    const isValidBusiness = !!this.findBusinessAllUsers(businessid);
    if (isValidBusiness && isValidUser) {
      if (
        rating &&
        description
      ) {
        const newReview = {
          userid,
          rating,
          description,
          dateCreated: moment(),
          reviewId: uuidv4(),
          firstName: userSearchResult.firstName,
          lastName: userSearchResult.lastName
        };
        try {
          this.reviews[businessid].push(newReview);
        } catch (err) {
          this.reviews[businessid] = [];
          this.reviews[businessid].push(newReview);
        }
        this.reviews[businessid].push(newReview);
        return res.status(200).send({
          message: 'Successfully created a new review',
          newReview
        });
      }
      return res.status(400).send({
        message: 'Error null rating or description'
      });
    }
    return res.status(404).send({
      message: 'Error User or Business not found'
    });
  }

  /**
  * It finds a user based on the userid supplied
  * @param {Object} userid - the id of the user
  * @returns {Object} - returns the user found based on the userid provided
  * or returns undefined if a match with the user id provided could not be
  * found
  */
  findUser(userid) {
    const foundUser = this.users.find(user => user.userid === userid);
    return foundUser;
  }
}
export default Reviews;
