import Sequelize from 'sequelize';
import jswebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';
/**
 * An object that handles the user creation api operations
 */
const errDisplayMessage = (res, errstatus, message) => res.status(errstatus).send({ message});

const Users = {
  loginUser: (res, req) => {
    const { email, password } = req.body;
    return db.Users.findOne({ where: { email } })
      .then((user) => {
        const hasNoUser = !user;
        if (hasNoUser) {
          return errDisplayMessage(res, 401, 'Invalid Username/Password');
        }
        bcrypt.compare(password, user.password, (err, hasMatchedPassword) => {
          const hasErr = !!err;
          if (hasMatchedPassword) {
            const token = jswebtoken.sign({ user }, process.env.SECRET_KEY, { expiresIn: '7d' });
            const loggedInUser = { ...user };
            loggedInUser.password = '';
            delete loggedInUser.password;
            return res.status(200).send({
              message: 'Login success',
              token,
              loggedInUser
            });
          } else if (hasErr) {
            return res.status(400).send({
              message: err.message
            });
          }
          return errDisplayMessage(res, 401, 'Invalid Username/Password');
        });
      }).catch(error => res.status(400).send({
        message: error
      }));
  },
  signupUser: (req, res) => {
    const { firstName, lastName, mobile, email, password} = req.body;
    return db.Users.findOne({
      where: {
        [Sequelize.Op.or]: [{ email }, { mobile }]
      }
    })
      .then((user) => {
        const hasNoUser = !!user;
        if (hasNoUser) {
          if (user.email === email) {
            return errDisplayMessage(res, 401, 'Error Email has already been taken');
          } else if (user.mobile === mobile) {
            return errDisplayMessage(res, 401, 'Error Mobile has already been taken');
          }
        }
        bcrypt.hash(password, 8, (err, hash) => {
          const hasErr = !!err;
          if (hasErr) {
            return errDisplayMessage(res, 500, err);
          }
          db.Users.create({
            firstName,
            lastName,
            mobile,
            email,
            password: hash
          })
            .then((newUser) => {
              const token = jswebtoken.sign({ newUser }, process.env.SECRET_KEY, { expiresIn: '7d' });
              const createdUser = { ...newUser };
              createdUser.password = '';
              delete createdUser.password;
              return res.status(201).send({
                message: 'Successfully created a new user',
                user: createdUser,
                token
              });
            })
            .catch(error => res.status(400).send({
              message: error
            }));
        });
      });
  }
};

export default Users;
