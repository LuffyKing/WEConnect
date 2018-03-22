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
  calculateFilter(location, category) {//optimize
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
  registerBusiness(req, res) {//validation Middleware SRP
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
  * It locates a business based on businessid and updates it based on the
  * information posted
  * @param {Object} req - request object containing params and body
  * @param {Object} res - response object that conveys the result of the request
  * @returns {Object} - response object that has a status code of either 200 and
  * the updated business or 404 depending on whether the business is found
  */
  updateBusiness(req, res) {
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
    const { businessid } = req.params;
    const bizSearchResult = this.findBusinessAllUsers(businessid);
    const isValidSearchResult = !!bizSearchResult;
    if (isValidSearchResult) {
      const updatedBusiness = {
        businessid,
        userid: userid || bizSearchResult.userid,
        email: email || bizSearchResult.email,
        businessWebsite: businessWebsite || bizSearchResult.businessWebsite,
        industry: industry || bizSearchResult.industry,
        description: description || bizSearchResult.description,
        city: city || bizSearchResult.city,
        country: country || bizSearchResult.country,
        street: street || bizSearchResult.street,
        state: state || bizSearchResult.state,
        businessName: businessName || bizSearchResult.businessName,
        telephoneNumber: telephoneNumber || bizSearchResult.telephoneNumber,
        lastEdited: moment()
      };
      const bizArrPosition = this.findBusinessArrPosition(businessid);
      this.businesses[bizArrPosition] = updatedBusiness;
      return res.status(200).send({
        message: `${updatedBusiness.businessName} has been successfully updated`,
        updatedBusiness
      });
    }
    return res.status(404).send({
      message: 'Business Not Found invalid businessid'
    });
  }
  /**
  * It locates a business based on businessid provided and returns it
  * @param {Object} req - request object containing params and body
  * @param {Object} res - response object that conveys the result of the request
  * @returns {Object} - response object that has a status code of either 204 or
  * 404 depending on whether the businessid is found within the list of businesses
  */
  removeBusiness(req, res) {
    const {
      businessid
    } = req.params;
    const bizArrPosition = this.findBusinessArrPosition(businessid);
    if (bizArrPosition === -1) {
      return res.status(404).send({
        message: 'Business not found',
      });
    }
    this.businesses.splice(bizArrPosition, 1);
    return res.status(204).send();
  }
  /**
  * It locates a business based on businessid provided and returns it
  * @param {Object} req - request object containing params and body
  * @param {Object} res - response object that conveys the result of the request
  * @returns {Object} - response object that has a status code of either 200 and
  * the found business or 404 depending on whether the businessid is found within
  * the list of businesses
  */
  getBusiness(req, res) {
    const {
      businessid
    } = req.params;
    const bizSearchResult = this.findBusinessAllUsers(businessid);
    const isValidSearchResult = !!bizSearchResult;
    if (isValidSearchResult) {
      return res.status(200).send({
        message: 'Business Found',
        business: bizSearchResult
      });
    }
    return res.status(404).send({
      message: 'Business Not Found'
    });
  }
  /**
  * It locates all the businesses in the database and returns them based on filters
  * @param {Object} req - request object containing params and body
  * @param {Object} res - response object that conveys the result of the request
  * @returns {Object} - response object that has a status code of either 200 and
  * all business based on filters in the request or 400 depending on whether
  * the double filters are part of the rquest
  */
  getAllBusinesses(req, res) {
    const {
      location,
      category
    } = req.query;
    this.calculateFilter(location, category);
    switch (this.filter) {
      case 'Error - Double filter': {
        return res.status(400).send({
          message: 'Error - Double filtering, use only one.'
        });
      }
      case 'CATEGORY': {
        const filteredBusinesses = this.businesses.filter(business =>
          business.industry === category);
        return res.status(200).send({
          message: 'Success - showing businesses filtered by category',
          filteredBusinesses
        });
      }
      case 'LOCATION': {
        const filteredBusinesses = this.businesses.filter(business =>
          `${business.street} ${business.city} ${business.state}
          ${business.country}`.toUpperCase()
            .includes(location.toUpperCase()));
        return res.status(200).send({
          message: 'Success - showing businesses filtered by location',
          filteredBusinesses
        });
      }
      default: {
        return res.status(200).send({
          message: 'Success - showing businesses with no filters applied',
          businesses: this.businesses
        });
      }
    }
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
