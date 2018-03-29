import Sequelize from 'sequelize';
import jswebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';
/**
 * An object that handles the user creation api operations
 */
const errDisplayMessage = (res, errstatus, message) => res.status(errstatus).send({ message});

const users = {
  loginUser: (req, res) => {
    console.log(req.body);
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
            return res.status(200).send({
              message: 'Login success',
              token
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
          return db.Users.create({
            firstName,
            lastName,
            mobile,
            email,
            password: hash
          })
            .then((newUser) => {
              const token = jswebtoken.sign({ newUser }, process.env.SECRET_KEY, { expiresIn: '7d' });

              return res.status(201).send({
                message: 'Successfully created a new user',
                token
              });
            }).catch(err => ({message: err }));
        });
      });
  }
};

export default users;
