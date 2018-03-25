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
}) => !validator.isEmpty(businessName.trim()) &&
    !validator.isEmpty(telephoneNumber.trim()) &&
    validator.isEmail(email.trim()) &&
    !validator.isEmpty(industry.trim()) &&
    !validator.isEmpty(street.trim()) &&
    !validator.isEmpty(city.trim()) &&
    !validator.isEmpty(country.trim()) &&
    !validator.isEmpty(state.trim()) &&
    !validator.isEmpty(description.trim()) &&
    validator.isURL(businessWebsite.trim()) &&
    validator.isUUID(userid.trim());
const specialValidation = {
  email: validator.isEmail,
  userid: validator.isUUID,
  businessWebsite: validator.isURL,
  businessid: validator.isUUID,
  rating: validator.isInt,
  ratingOption: { min: 0, max: 5 }
};

const checkUUID = uuid => validator.isUUID(uuid.trim());

const invalidFieldsChecker = reqBody => Object.keys(reqBody).filter((elm) => {
  if (`${elm}` in specialValidation) {
    if (`${elm}Option` in specialValidation) {
      return !specialValidation[elm](String(reqBody[elm]).trim(), specialValidation[`${elm}Option`]);
    }

    return !specialValidation[elm](reqBody[elm].trim());
  }
  return validator.isEmpty(reqBody[elm].trim());
});

const emptyFieldsFinder = (reqBody) => {
  const arrayOfFields = Object.keys(reqBody);
  const emptyFieldsArr = arrayOfFields.filter(element => !reqBody[element])
    .map(element => element.replace(/([A-Z])/g, ' $1').toUpperCase());
  return emptyFieldsArr;
};

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
  const {
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
  } = req.body;
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
    userid
  };
  const emptyFieldsArr = emptyFieldsFinder(reqBody);
  if (emptyFieldsArr.length > 0) {
    const fields = emptyFieldsArr.join(', ');
    return res.status(400).send({
      message: `Error ${fields} is/are not provided`
    });
  } else if (
    businessFormInputChecker(reqBody)
  ) {
    next();
  } else {
    const invalidFields = invalidFieldsChecker(reqBody);
    return res.status(400).send({
      message: `Error Required Fields ${invalidFields.join(', ')} Values are Invalid`
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
  if (!checkUUID(businessid)) {
    return res.status(400).send({
      message: 'Supplied Business Id  is not a UUID'
    });
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
      next();
    }
  }
};

const businessidValidator = (req, res, next) => {
  const { businessid } = req.params;
  if (!businessid) {
    return res.status(400).send({
      message: 'BusinessId not provided'
    });
  }
  if (validator.isUUID(businessid)) {
    next();
  }
  if (!validator.isUUID(businessid)) {
    return res.status(400).send({
      message: 'Business Id provided is not a UUID'
    });
  }
};

const getAllBusinessesValidator = (req, res, next) => {
  const filterObj = [{ query: req.query.location, filter: 'LOCATION' },
    { query: req.query.category, filter: 'CATEGORY' }];
  const filterActionArray = filterObj.filter(elm => !!elm.query).filter(elm =>
    !validator.isEmpty(elm.query.trim()));
  if (filterActionArray < 1) {
    req.body.filter = '';
    next();
  } else if (filterActionArray > 1) {
    req.body.filter = 'BOTH';
    next();
  } else {
    req.body.filter = filterActionArray[0].filter;
    next();
  }
};
const addReviewValidator = (req, res, next) => {
  let userid, rating, description;
  let reqBody = req.body;
  reqBody = {
    userid,
    rating,
    description,
    ...reqBody
  };
  const emptyFields = emptyFieldsFinder(reqBody);
  const invalidFields = invalidFieldsChecker(req.body);
  if (!checkUUID(req.params.businessid)) {
    return res.status(400).send({
      message: 'Supplied Business Id  is not a UUID'
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
    validator.isUUID(req.body.userid.trim()) &&
    validator.isUUID(req.params.businessid.trim())
  ) {
    next();
  }
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
