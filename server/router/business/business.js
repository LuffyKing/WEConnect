import express from 'express';
import businessController from '../../controllers/businesses';
import validation from '../../middlewares/validation';
import verifyToken from '../../middlewares/verifyToken';
/**
 * It initializes an express router
 */
const businessRouter = express.Router();
/**
 * It initializes an instance of the business controller
 */
/**
 *It creates a post route on / to work with the registerBusiness method
 */
businessRouter.post('/', verifyToken, validation.registerBusinessValidator, businessController.registerBusiness);
/**
 *It creates a put route on /:businessid to work with the updateBusiness method
 */
businessRouter.put('/:businessid', verifyToken, validation.updateBusinessValidator, businessController.updateBusiness);
/**
 *It creates a delete route on /:businessid to work with the removeBusiness method
 */
businessRouter.delete('/:businessid', verifyToken, validation.businessidValidator, businessController.removeBusiness);
/**
 *It creates a get route on /:businessid to work with the getBusiness method
 */
businessRouter.get('/:businessid', validation.businessidValidator, businessController.getBusiness);
/**
 *It creates a get route on / to work with the getAllBusinesses method
 */
businessRouter.get('/', validation.getAllBusinessesValidator, businessController.getAllBusinesses);
export default businessRouter;
