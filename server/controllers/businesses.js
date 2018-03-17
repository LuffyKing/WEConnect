import uuidv4 from 'uuid/v4';
import moment from 'moment';
/**
 * A class that handles the business api operation
 */
class Businesses {
  /**
 * Takes in a list of businesses and binds the class' this to methods
 * registerBusiness, updateBusiness, removeBusiness, getAllBusinesses
 * get
 * @param {Object[]} businesses The list of businesses.
 */
  constructor(businesses) {
    this.businesses = businesses;
    this.registerBusiness = this.registerBusiness.bind(this);
    this.updateBusiness = this.updateBusiness.bind(this);
    this.removeBusiness = this.removeBusiness.bind(this);
    this.getBusiness = this.getBusiness.bind(this);
    this.getAllBusinesses = this.getAllBusinesses.bind(this);
    this.filter = '';
  }
  /**
  * It validates the email and password by checking it against the list
  * of users
  * @param {string} location - the location query for a group of businesses
  * @param {string} category - the category query for a group of businesses
  * @returns {string} - depending on the truthiness and/or the falsiness of the
  * location and category parameters a different string is returned
  */
  calculateFilter(location, category) {
    const hasLocation = !!location;
    const hasCategory = !!category;
    if (hasCategory && hasLocation) {
      this.filter = 'Error - Double filter';
    } else if (hasCategory) {
      this.filter = 'CATEGORY';
    } else if (hasLocation) {
      this.filter = 'LOCATION';
    } else {
      this.filter = 'NO FILTER';
    }
  }
  /**
  * It registers a business based off the information posted
  * @param {Object} req - request object containing params and body
  * @param {Object} res - response object that conveys the result of the request
  * @returns {Object} - response object that has a status code of either 201 and
  * the new business or 400 depending on whether completness of the information
  * posted or the uniqness of the email and telephoneNumber
  */
  registerBusiness(req, res) {
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
    const hasBusinessName = !!businessName;
    const hasTelephoneNumber = !!telephoneNumber;
    const hasEmail = !!email;
    const hasBusinessWebsite = !!businessWebsite;
    const hasIndusty = !!industry;
    const hasDescription = !!description;
    const hasStreet = !!street;
    const hasCity = !!city;
    const hasCountry = !!country;
    const hasState = !!state;
    const hasUserid = !!userid;
    if (
      this.hasUniqueEmail(email) &&
      this.hasUniqueEmail(telephoneNumber)
    ) {
      if (
        hasBusinessName &&
        hasTelephoneNumber &&
        hasBusinessWebsite &&
        hasEmail &&
        hasIndusty &&
        hasStreet &&
        hasCity &&
        hasCountry &&
        hasState &&
        hasDescription &&
        hasUserid
      ) {
        const newBusiness = {
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
          userid,
          businessid: uuidv4(),
          dateCreated: moment(),
          lastEdited: moment(),
        };
        this.businesses.push(newBusiness);
        return res.status(201).send({
          message: 'successfully created a new business',
          business: newBusiness
        });
      }
      return res.status(400).send({
        message: 'Error All Required fields must be filled'
      });
    }
    return res.status(400).send({
      message: 'Error Invalid non-unique email & telephone number inputs'
    });
  }

  /**
  * It locates a business based on businessid and userid provided and returns it
  * @param {string} businessid - the business id of the business
  * @param {string} userid - the userid attached to the business
  * @returns {Object} - the business that is found matching the businessid
  * and userid provided
  */
  findBusiness(businessid, userid) {
    const foundBusiness = this.businesses.find(business =>
      String(business.businessid) === String(businessid) &&
      String(business.userid) === String(userid));
    return foundBusiness;
  }
  /**
  * It locates a business based on businessid provided and returns it
  * @param {string} businessid - the business id of the business
  * @returns {Object} - the business that is found matching the businessid
  */
  findBusinessAllUsers(businessid) {
    const foundBusiness = this.businesses.find(business =>
      String(business.businessid) === String(businessid));
    return foundBusiness;
  }
  /**
  * It locates the array position  of the business  within the businesses array
  * based on businessid provided and returns it
  * @param {string} businessid - the business id of the business
  * @returns {number} - The result is the position of the business within the
  * businesses array
  */
  findBusinessArrPosition(businessid) {
    const foundBusinessArrPosition = this.businesses.findIndex(business =>
      String(business.businessid) === String(businessid));
    return foundBusinessArrPosition;
  }
  /**
  * It determines if the telephone number of the business is unique
  * @param {string} telephoneNumber - the telephone number to be checked
  * @returns {boolean} - the result is true or false based on the truthiness
  *  or falseness of the search result array
  */
  hasUniqueTelephoneNumber(telephoneNumber) {
    const duplicateMobileNumber = this.businesses.find(business =>
      business.telephoneNumber === telephoneNumber);
    return !duplicateMobileNumber;
  }
  /**
  * It determines if the email of the business is unique
  * @param {string} email - the email to be checked
  * @returns {boolean} - the result is true or false based on the truthiness
  *  or falseness of the search result array
  */
  hasUniqueEmail(email) {
    const duplicateEmail = this.businesses.find(business =>
      business.email === email);
    return !duplicateEmail;
  }
}

export default Businesses;