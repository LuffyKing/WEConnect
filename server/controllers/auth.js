import Sequelize from 'sequelize';
import jswebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';
/**
 * A class that handles the authentication api operations
 */
class Auth {
  /**
 * It handles logins and returns a 200 sucess message or 401 error code,
 * depending on the validity of the the request credentials
 * @param {Object} req - request object containing params and body
 * @param {Object} res - response object that conveys the result of the request
 * @returns {Object} - response object that has a status code of either 200 or 401
 */
  static loginUser(req, res) {
    const { email, password } = req.body;
    return db.Users.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        const hasNoUser = !user;
        if (hasNoUser) {
          return res.status(401).send({ message: 'Invalid Username/Password' });
        }
        bcrypt.compare(password, user.password, (err, hasMatchedPassword) => {
          const hasErr = !!err;
          if (hasMatchedPassword) {
            const token = jswebtoken.sign({ user }, process.env.SECRET_KEY, { expiresIn: '7d' });
            delete user.password;
            return res.status(200).send({
              message: 'Login success',
              token,
              user
            });
          } else if (hasErr) {
            return res.status(400).send({
              message: err
            });
          }
          return res.status(401).send({ message: 'Invalid Username/Password' });
        });
      }).catch(error => res.status(400).send({
        message: error
      }));
  }
  /**
 * It handles signups and returns a 201 sucess message or 400 error code,
 * depending on the validity of the the request the information posted
 * @param {Object} req - request object containing params and body
 * @param {Object} res - response object that conveys the result of the request
 * @returns {Object} - response object that has a status code of either 201 or
 * 400 depending on the uniqness and completeness of the information provided
 */
  static signupUser(req, res) {
    const {
      firstName,
      lastName,
      mobile,
      email,
      password
    } = req.body;
    return db.Users.findOne({
      where: {
        [Sequelize.Op.or]: [{ email }, { mobile }]
      }
    })
      .then((user) => {
        const hasNoUser = !!user;
        if (hasNoUser) {
          return res.status(400).send({
            message: 'Error Non-Unique Email Or Mobile.',
          });
        }
        bcrypt.hash(password, 8, (err, hash) => {
          const hasErr = !!err;
          if (hasErr) {
            return res.status(500).send({
              message: err
            });
          }
          db.Users.create({
            firstName,
            lastName,
            mobile,
            email,
            password: hash
          })
            .then((newUser) => {
              const token = jswebtoken.sign({ user }, process.env.SECRET_KEY, { expiresIn: '7d' });
              delete newUser.password;
              return res.status(201).send({
                message: 'successfully created a new user',
                user: newUser,
                token
              });
            })
            .catch(error => res.status(400).send({
              message: error
            }));
        });
      });
  }
}

export default Auth;
