import jsonwebtoken from 'jsonwebtoken';
import validator from 'validator';
import db from '../models';

const assertType = (obj, type) => obj.constructor.name === type.name;

const businessFormInputChecker = ({
  businessName,
  telephoneNumber,
  email,
  businessWebsite,
  industry,
  description,
  street,
  city,
  country,
  state
}) => !validator.isEmpty(businessName.trim()) &&
    !validator.isEmpty(telephoneNumber.trim()) &&
    validator.isEmail(email.trim()) &&
    !validator.isEmpty(industry.trim()) &&
    !validator.isEmpty(street.trim()) &&
    !validator.isEmpty(city.trim()) &&
    !validator.isEmpty(country.trim()) &&
    !validator.isEmpty(state.trim()) &&
    !validator.isEmpty(description.trim()) &&
    validator.isURL(businessWebsite.trim());
const specialValidation = {
  email: validator.isEmail,
  businessWebsite: validator.isURL,
  businessid: validator.isUUID,
  rating: validator.isInt,
  ratingOption: { min: 0, max: 5 }
};

const checkUUID = uuid => validator.isUUID(String(uuid).trim());

const invalidFieldsChecker = reqBody => Object.keys(reqBody).filter((elm) => {
  if (`${elm}` in specialValidation) {
    if (`${elm}Option` in specialValidation) {
      return !specialValidation[elm](String(reqBody[elm]).trim(), specialValidation[`${elm}Option`]);
    }

    return !specialValidation[elm](reqBody[elm].trim());
  }
  return validator.isEmpty(String(reqBody[elm].trim()));
});

const emptyFieldsFinder = (reqBody) => {
  const arrayOfFields = Object.keys(reqBody);
  const emptyFieldsArr = arrayOfFields.filter(element => !reqBody[element])
    .map(element => element.replace(/([A-Z])/g, ' $1').toUpperCase());
  return emptyFieldsArr;
};
const nonStringFieldChecker = reqBody =>
  Object.keys(reqBody).filter(elm => !assertType(reqBody[elm], String));


const loginValidator = (req, res, next) => {
  const { email, password } = req.body;
  const noEmail = !email;
  const noPassword = !password;
  if (noEmail && noPassword) {
    return res.status(400).send({ message: 'Email and Password Fields are empty' });
  } else if (noEmail) {
    return res.status(400).send({ message: 'Email field is empty' });
  } else if (noPassword) {
    return res.status(400).send({ message: 'Password is empty' });
  } else if (validator.isEmpty(password.trim())) {
    return res.status(400).send({ message: 'Password input is invalid' });
  } else if (!validator.isEmail(email.trim())) {
    return res.status(400).send({ message: 'Email provided is not an email' });
  } else if (nonStringFieldChecker(req.body).length > 0) {
    const nonStrings = nonStringFieldChecker(req.body);
    const isAre = nonStrings.length === 1 ? `field ${nonStrings.join(', ')} is` : `fields ${nonStrings.join(', ')} are`;
    return res.status(400).send({ message: `The ${isAre} not strings` });
  }
  if (!noPassword && !noEmail) {
    next();
  }
};

const signUpValidator = (req, res, next) => {
  const {
    firstName,
    lastName,
    mobile,
    email,
    password
  } = req.body;
  if (!email) {
    return res.status(400).send({
      message: 'Error Email not Provided'
    });
  }
  if (!lastName) {
    return res.status(400).send({
      message: 'Error Last Name not Provided'
    });
  }
  if (!firstName) {
    return res.status(400).send({ message: 'Error First Name is not provided' });
  }
  if (!mobile) {
    return res.status(400).send({ message: 'Error mobile is not provided' });
  }
  if (!password) {
    return res.status(400).send({ message: 'Error password is not provided' });
  }
  if (nonStringFieldChecker(req.body).length > 0) {
    const nonStrings = nonStringFieldChecker(req.body);
    const isAre = nonStrings.length === 1 ? `field ${nonStrings.join(', ')} is` : `fields ${nonStrings.join(', ')} are`;
    return res.status(400).send({ message: `The ${isAre} not strings` });
  }
  if (
    validator.isEmail(email.trim()) &&
    validator.isMobilePhone(mobile.trim(), 'any') &&
    !validator.isEmpty(firstName.trim()) &&
    !validator.isEmpty(lastName.trim()) &&
    !validator.isEmpty(password.trim())
  ) {
    next();
  } else {
    return res.status(400).send({
      message: 'Error Required Fields Values are Invalid or Empty'
    });
  }
};

const registerBusinessValidator = (req, res, next) => {
  let businessName;
  let telephoneNumber;
  let email;
  let businessWebsite;
  let industry;
  let description;
  let street;
  let city;
  let country;
  let state;
  const reqBody = {
    businessName,
    telephoneNumber,
    email,
    businessWebsite,
    industry,
    description,
    street,
    city,
    country,
    state,
    ...req.body
  };
  const decodedUser = jsonwebtoken.verify(req.token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return err;
    } else if (!err) {
      return user;
    }
  });

  const emptyFieldsArr = emptyFieldsFinder(reqBody);
  if (emptyFieldsArr.length > 0) {
    const fields = emptyFieldsArr.join(', ');
    return res.status(400).send({
      message: `Error ${fields} is/are not provided`
    });
  }
  if (nonStringFieldChecker(req.body).length > 0) {
    const nonStrings = nonStringFieldChecker(req.body);
    const isAre = nonStrings.length === 1 ? `field ${nonStrings.join(', ')} is` : `fields ${nonStrings.join(', ')} are`;
    return res.status(400).send({ message: `The ${isAre} not strings` });
  } else if (
    businessFormInputChecker(reqBody)
  ) {
    db.Users.findOne({ where: { userid: decodedUser.user.userid } }).then((user) => {
      const hasUser = !!user;
      if (hasUser) {
        req.body.userid = decodedUser.user.userid;
        next();
      } else {
        return res.status(400).send({
          message: 'User id is invalid because user was not found'
        });
      }
    });
  }
};


const filledFieldChecker = (reqBody) => {
  const filledFieldsArr = Object.keys(reqBody).filter(element => !!reqBody[element])
    .map(element => element.replace(/([A-Z])/g, ' $1').toUpperCase());
  return filledFieldsArr;
};

const invalidFieldsCheckerUpdate = filledFieldsArr => filledFieldsArr.filter((elm) => {
  if (`${elm}` in specialValidation) {
    return specialValidation[elm](elm.trim());
  }
  return validator.isEmpty(elm.trim());
});

const updateBusinessValidator = (req, res, next) => {
  const { businessid } = req.params;
  const decodedUser = jsonwebtoken.verify(req.token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return err;
    } else if (!err) {
      return user;
    }
  });
  const isNotBusinessOwner = !db.Businesses.findOne({
    where: { businessid, userid: decodedUser.user.userid }
  });
  if (isNotBusinessOwner) {
    return res.status(403).send({
      message: 'Can not update business, if user is not the owner of the business.'
    });
  }

  if (!checkUUID(businessid)) {
    return res.status(404).send({
      message: 'Buisness Not Found'
    });
  }
  if (nonStringFieldChecker(req.body).length > 0) {
    const nonStrings = nonStringFieldChecker(req.body);
    const isAre = nonStrings.length === 1 ? `field ${nonStrings.join(', ')} is` : `fields ${nonStrings.join(', ')} are`;
    return res.status(400).send({ message: `The ${isAre} not strings` });
  }
  const filledFieldsArr = filledFieldChecker(req.body);
  if (filledFieldsArr.length < 1) {
    return res.status(200).send({
      message: 'No changes were made'
    });
  }
  if (filledFieldsArr.length > 0) {
    const invalidFieldsArr = invalidFieldsCheckerUpdate(filledFieldsArr);
    if (invalidFieldsArr.length > 0) {
      return res.status(400).send({
        message: `The field(s) ${invalidFieldsArr.join(', ')} is/are invalid`
      });
    }
    if (invalidFieldsArr.length < 1) {
      db.Users.findOne({ where: { userid: decodedUser.user.userid } }).then((user) => {
        const hasUser = !!user;
        if (hasUser) {
          const filledFields = Object.keys(req.body).filter(element => !!req.body[element]);
          const filledFieldsObj = filledFields.reduce((acc, cur) => {
            acc[cur] = req.body[cur];
            return acc;
          }, {});
          req.body.filledFields = filledFieldsObj;
          req.body.userid = decodedUser.user.userid;
          next();
        } else {
          return res.status(400).send({
            message: 'User id is invalid because user was not found'
          });
        }
      });
    }
  }
};

const businessidValidator = (req, res, next) => {
  const { businessid } = req.params;
  const hasNoBusinessId = !businessid;
  if (hasNoBusinessId) {
    return res.status(400).send({
      message: 'BusinessId not provided'
    });
  } else if (validator.isUUID(String(businessid).trim())) {
    next();
  } else {
    return res.status(400).send({
      message: 'Business not found'
    });
  }
};

const removeBusinessValidator = (req, res, next) => {
  const { businessid } = req.params;
  const decodedUser = jsonwebtoken.verify(req.token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return err;
    } else if (!err) {
      return user;
    }
  });
  const isNotBusinessOwner = !db.Businesses
    .findOne({ where: { businessid, userid: decodedUser.user.userid } });
  if (isNotBusinessOwner) {
    return res.status(403).send({
      message: 'Can not delete business, if user is not the owner of the business.'
    });
  }
  req.body.userid = decodedUser.user.userid;
  next();
};

const getAllBusinessesValidator = (req, res, next) => {
  const filterObj = [{ query: req.query.location, filter: 'LOCATION' },
    { query: req.query.category, filter: 'CATEGORY' }];
  const filterActionArray = filterObj.filter(elm => !!elm.query).filter(elm =>
    !validator.isEmpty(elm.query.trim()));
  if (filterActionArray.length < 1) {
    req.body.filter = '';
    next();
  } else if (filterActionArray.length > 1) {
    req.body.filter = 'BOTH';
    next();
  } else {
    req.body.filter = filterActionArray[0].filter;
    next();
  }
};

const addReviewValidator = (req, res, next) => {
  let rating;
  let description;
  let reqBody = req.body;
  reqBody = {
    rating,
    description,
    ...reqBody
  };
  const decodedUser = jsonwebtoken.verify(req.token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return err;
    } else if (!err) {
      return user;
    }
  });
  const businessIdIsUUId = checkUUID(req.params.businessid);
  const emptyFields = emptyFieldsFinder(reqBody);
  const invalidFields = invalidFieldsChecker(req.body);
  if (!businessIdIsUUId) {
    return res.status(404).send({
      message: 'No business found'
    });
  } else if (invalidFields.length > 0) {
    return res.status(400).send({
      message: `Error the following field(s) ${invalidFields.join(' ,')} are/is invalid `
    });
  } else if (emptyFields.length > 0) {
    return res.status(400).send({
      message: `Error ${emptyFields.join(' ,')} is/are not provided`
    });
  } else if (
    validator.isInt(String(req.body.rating).trim(), { min: 0, max: 5 }) &&
    !validator.isEmpty(req.body.description.trim()) &&
    businessIdIsUUId
  ) {
    db.Businesses.findOne({ where: { businessid: req.params.businessid } }).then((business) => {
      const isBusiness = !!business;
      if (isBusiness) {
        db.Users.findOne({ where: { userid: decodedUser.user.userid } }).then((user) => {
          const isUser = !!user;
          if (isUser) {
            req.body.firstName = user.firstName;
            req.body.lastName = user.lastName;
            req.body.userid = decodedUser.user.userid;
            next();
          } else {
            return res.status(400).send({
              message: 'User id is invalid because the user was not found'
            });
          }
        });
      } else {
        return res.status(400).send({
          message: 'Business id is invalid because the business was not found'
        });
      }
    });
  }
};


module.exports = {
  getAllBusinessesValidator,
  businessidValidator,
  updateBusinessValidator,
  registerBusinessValidator,
  loginValidator,
  signUpValidator,
  addReviewValidator,
  removeBusinessValidator
};
