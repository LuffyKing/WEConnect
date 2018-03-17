import uuidv4 from 'uuid/v4';
import moment from 'moment';
import bcrypt from 'bcrypt-nodejs';
/**
 * A class that handles the authentication api operations
 */
class Auth {
  /**
 * Takes in a list of user data and binds the class' this to
 *  methods loginUser and signupUser
 * @param {Object[]} users The list of users.
 */
  constructor(users) {
    this.users = users;
    this.loginUser = this.loginUser.bind(this);
    this.signupUser = this.signupUser.bind(this);
  }
  /**
 * It handles signups and returns a 201 sucess message or 400 error code,
 * depending on the validity of the the request the information posted
 * @param {Object} req - request object containing params and body
 * @param {Object} res - response object that conveys the result of the request
 * @returns {Object} - response object that has a status code of either 201 or
 * 400 depending on the uniqness and completeness of the information provided
 */
  signupUser(req, res) {
    const {
      firstName,
      lastName,
      mobile,
      email,
      password
    } = req.body;
    const hasEmail = !!email;
    const hasMobile = !!mobile;
    const hasFirstName = !!firstName;
    const hasLastName = !!lastName;
    const hasPassword = !!password;
    if (
      this.hasUniqueEmail(email) &&
      this.hasUniqueMobileNumber(mobile)
    ) {
      if (
        hasEmail &&
        hasMobile &&
        hasFirstName &&
        hasLastName &&
        hasPassword
      ) {
        const newUser = {
          firstName,
          lastName,
          mobile,
          email,
          password: bcrypt.hashSync(password),
          userid: uuidv4(),
          dateCreated: moment()
        };
        this.users.push(newUser);
        return res.status(201).send({
          message: 'successfully created a new user',
          user: newUser
        });
      }
      return res.status(400).send({
        message: 'Error Required Fields can not be empty.'
      });
    }
    return res.status(400).send({
      message: 'Error Non-Unique Email Or Mobile.'
    });
  }

  /**
  * It validates the email and password by checking it against the list
  * of users
  * @param {string} email - email of the user to be validated
  * @param {string} password - the password of the user to be validated
  * @returns {boolean} - the result of the validation, if the email and password
  * are matched to a user then the reuslting array should be > 0 and true
  */
  hasValidCredentials(email, password) {
    const userArray = this.users.filter(user =>
      user.email === email && bcrypt.compareSync(password, user.password));
    return !!userArray.length;
  }

  /**
  * It checks if the mobile number is unique
  * @param {string} mobileNumber - mobile number of the user
  * @returns {boolean} - if the new user's mobile number is  matched to
  * another user then the length > 0 and not unique and therefore false
  */
  hasUniqueMobileNumber(mobileNumber) {
    const userArray = this.users.filter(user =>
      user.mobileNumber === mobileNumber);
    return !userArray.length;
  }

  /**
  * It checks if the email is unique
  * @param {string} email - email of the user
  * @returns {boolean} - if the new user's email is  matched to
  * another user then the length > 0 and not unique and therefore false
  */
  hasUniqueEmail(email) {
    const userArray = this.users.filter(user =>
      user.email === email);
    return !userArray.length;
  }
}

export default Auth;
