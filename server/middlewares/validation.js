import validator from 'validator';

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
  state,
  userid
}) => !validator.isEmpty(businessName) &&
    !validator.isEmpty(telephoneNumber) &&
    validator.isEmail(email) &&
    !validator.isEmpty(industry) &&
    !validator.isEmpty(street) &&
    !validator.isEmpty(city) &&
    !validator.isEmpty(country) &&
    !validator.isEmpty(state) &&
    !validator.isEmpty(description) &&
    !validator.isEmpty(businessWebsite) &&
    !validator.isEmpty(userid);


const loginValidator = (req, res, next) => {
  const { email, password } = req.body;
  const noEmail = !email;
  const noPassword = !password;
  if (noEmail && noPassword) {
    return res.status(401).send({ message: 'Email or Password Field is empty' });
  } else if (validator.isEmail(email)) {
    next();
  } else {
    return res.status(401).send({ message: 'Email must be valid' });
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
    return res.status(400).send('Error First Name is not provided');
  }
  if (!mobile) {
    return res.status(400).send('Error mobile is not provided');
  }
  if (!password) {
    return res.status(400).send('Error password is not provided');
  }
  if (
    validator.isEmail(email.trim() || '') &&
    validator.isMobilePhone(mobile.trim() || '', 'any') &&
    !validator.isEmpty(firstName.trim() || '') &&
    !validator.isEmpty(lastName.trim() || '') &&
    !validator.isEmpty(password.trim() || '')
  ) {
    next();
  } else {
    return res.status(400).send({
      message: 'Error Required Fields Values are Invalid or Empty'
    });
  }
};

const registerBusinessValidator = (req, res, next) => {
  if (
    businessFormInputChecker(...req.body)
  ) {
    next();
  } else {
    return validator.isEmail(res.body.email) ?
      res.status(400).send({
        message: 'Error Invalid Company Email'
      })
      : res.status(400).send({
        message: 'Error All Required fields must be filled'
      });
  }
};

const updateBusinessValidator = (req, res, next) => {
  const { businessid } = req.params;
  if (validator.isUUID(businessid)) {
    if (validator.isEmpty(req.email)) {
      if (req.params.values.some(element => !!element)) {
        next();
      }
      return res.status(204).send();
    } else if (validator.isEmail(req.params.email)) {
      next();
    }
    return res.status(400).send({ message: 'Invalid Email' });
  }
  return res.status(400).send({
    message: 'Invalid Business Id'
  });
};


const businessidValidator = (req, res, next) => {
  const { businessid } = req.params;
  if (validator.isUUID(businessid)) {
    next();
  }
  return res.status(400).send({
    message: 'Invalid Business Id'
  });
};

const getAllBusinessesValidator = (req, res, next) => {
  const compValueBothEmpty = validator.isEmpty(req.body.location) &&
  validator.isEmpty(req.body.category);
  const compValueBothFull = !validator.isEmpty(req.body.location) &&
  !validator.isEmpty(req.body.category);


  if (compValueBothEmpty) {
    req.body.filter = '';
    next();
  } else if (compValueBothFull) {
    return res.status(400).send({
      message: 'Error - Double filtering, use only one.'
    });
  }
  req.filter = !validator.isEmpty(req.body.location) ? 'LOCATION' : 'CATEGORY';
  next();
};
const addReviewValidator = (req, res, next) => {
  if (
    validator.isFloat(req.body.rating) &&
    !validator.isEmpty(req.description)
  ) {
    next();
  }
  return res.status(400).send({
    message: 'Error null rating or description'
  });
};


module.exports = {
  getAllBusinessesValidator,
  businessidValidator,
  updateBusinessValidator,
  registerBusinessValidator,
  loginValidator,
  signUpValidator,
  addReviewValidator
};
