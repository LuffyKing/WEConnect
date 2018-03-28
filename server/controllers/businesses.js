import Sequelize from 'sequelize';
import db from '../models';
/**
 * A class that handles the business api operation
 */
class Businesses {
  /**
  * It registers a business based off the information posted
  * @param {Object} req - request object containing params and body
  * @param {Object} res - response object that conveys the result of the request
  * @returns {Object} - response object that has a status code of either 201 and
  * the new business or 400 depending on whether completness of the information
  * posted or the uniqness of the email and telephoneNumber
  */
  static registerBusiness(req, res) {
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
    return db.Businesses.findOne({
      [Sequelize.Op.or]: [{ email }, { telephoneNumber }]
    })
      .then((business) => {
        const hasBusiness = !!business;
        if (hasBusiness) {
          return res.status(400).send({
            message: 'Error Non-Unique Email Or Telephone Number.'
          });
        }
        db.Businesses.create({
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
        })
          .then(newBusiness => res.status(201).send({
            message: 'successfully created a new business',
            business: newBusiness
          }))
          .catch(error => res.status(400).send({
            message: error
          }));
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
  static updateBusiness(req, res) {
    const { businessid } = req.params;
    return db.Businesses.update(
      { ...req.body.updateFields },
      { returning: true, where: { businessid } }
    )
      .then(([rowsUpdate, [updatedBusiness]]) => {
        const hasNotUpdated = !rowsUpdate;
        if (hasNotUpdated) {
          return res.status(404).send({
            message: 'Business Not Found'
          });
        }
        return res.status(200).send({
          message: `${updatedBusiness.businessName} has been successfully updated`,
          updatedBusiness,
          rowsUpdate
        });
      })
      .catch(error => res.status(400).send({
        message: error
      }));
  }
  /**
  * It locates a business based on businessid provided and returns it
  * @param {Object} req - request object containing params and body
  * @param {Object} res - response object that conveys the result of the request
  * @returns {Object} - response object that has a status code of either 204 or
  * 404 depending on whether the businessid is found within the list of businesses
  */
  static removeBusiness(req, res) {
    const {
      businessid
    } = req.params;
    return db.Businesses.findOne({
      businessid
    }).then((business) => {
      const hasNoBusiness = !business;
      if (hasNoBusiness) {
        return res.status(404).send({
          message: 'Business not found'
        });
      }
      business.destroy();
      return res.status(204).send();
    })
      .catch(error => res.status(400).send({
        message: error
      }));
  }
  /**
  * It locates a business based on businessid provided and returns it
  * @param {Object} req - request object containing params and body
  * @param {Object} res - response object that conveys the result of the request
  * @returns {Object} - response object that has a status code of either 200 and
  * the found business or 404 depending on whether the businessid is found within
  * the list of businesses
  */
  static getBusiness(req, res) {
    const {
      businessid
    } = req.params;
    return db.Businesses.findOne({
      businessid
    }).then((business) => {
      const hasNoBusiness = !business;
      if (hasNoBusiness) {
        return res.status(404).send({
          message: 'Business not found'
        });
      } else if (!hasNoBusiness) {
        return res.status(200).send({
          message: 'Business Found',
          business
        });
      }
    })
      .catch(error => res.status(400).send({
        message: error
      }));
  }
  /**
  * It locates all the businesses in the database and returns them based on filters
  * @param {Object} req - request object containing params and body
  * @param {Object} res - response object that conveys the result of the request
  * @returns {Object} - response object that has a status code of either 200 and
  * all business based on filters in the request or 400 depending on whether
  * the double filters are part of the rquest
  */
  static getAllBusinesses(req, res) {
    const {
      location,
      category
    } = req.query;
    const {
      filter
    } = req.body;

    switch (filter) {
      case 'BOTH': {
        return db.Businesses.findAll({
          where: {
            [Sequelize.Op.and]: [
              Sequelize.where(Sequelize.fn(
                'concat', Sequelize.col('street'), ' ',
                Sequelize.col('city'), ' ', Sequelize.col('state'),
                ' ', Sequelize.col('country')
              ), {
                ilike: `%${location}%`
              }),
              { category: { ilike: `%${category}%` } },
            ]
          }
        }).then((businesses) => {
          const hasNoBusinesses = !businesses;
          if (hasNoBusinesses) {
            return res.status(404).send({
              message: 'Businesses not found with the requested Category and Location query'
            });
          }
          const singularPlural = businesses.length === 1 ? 'Business' : 'Businesses';

          return res.status(200).send({
            message: `${singularPlural} Found with the requested Category and Location query`,
            businesses
          });
        });
      }
      case 'CATEGORY': {
        return db.Businesses.findAll({
          where: { [Sequelize.Op.iLike]: `%${category}%` }
        }).then((businesses) => {
          const hasNoBusinesses = !businesses;
          if (hasNoBusinesses) {
            return res.status(404).send({
              message: 'Businesses not found with the requested Category query'
            });
          }
          const singularPlural = businesses.length === 1 ? 'Business' : 'Businesses';
          return res.status(200).send({
            message: `${singularPlural} Found with the requested Category query`,
            businesses
          });
        });
      }
      case 'LOCATION': {
        return db.Businesses.findAll({
          where: { [Sequelize.Op.iLike]: `%${location}%` }
        }).then((businesses) => {
          const hasNoBusiness = !businesses;
          if (hasNoBusiness) {
            return res.status(404).send({
              message: 'Businesses not Found with the requested location query'
            });
          }
          const singularPlural = businesses.length === 1 ? 'Business' : 'Businesses';
          return res.status(200).send({
            message: `${singularPlural} Found with the requested Location query`,
            businesses
          });
        });
      }
      default: {
        return db.Businesses.all().then((businesses) => {
          const hasNoBusinesses = !businesses;
          if (hasNoBusinesses) {
            return res.status(404).send({
              message: 'No Businesses Available'
            });
          }
          const singularPlural = businesses.length === 1 ? 'Business' : 'Businesses';
          return res.status(200).send({
            message: `${singularPlural} Found`,
            businesses
          });
        });
      }
    }
  }
}

export default Businesses;
