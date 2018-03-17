import express from 'express';
import businessController from '../../controllers/businesses';
import { businesses } from '../../dummy-data/database';
/**
 * It initializes an express router
 */
const businessRouter = express.Router();
/**
 * It initializes an instance business controller
 */
const business = new businessController(businesses);
/**
 *It creates a post route on / to work with the registerBusiness method
 */
businessRouter.post('/', business.registerBusiness);
/**
 *It creates a put route on /:businessid to work with the updateBusiness method
 */
businessRouter.put('/:businessid', business.updateBusiness);
/**
 *It creates a delete route on /:businessid to work with the removeBusiness method
 */
businessRouter.delete('/:businessid', business.removeBusiness);
/**
 *It creates a get route on /:businessid to work with the getBusiness method
 */
businessRouter.get('/:businessid', business.getBusiness);
/**
 *It creates a get route on / to work with the getAllBusinesses method
 */
businessRouter.get('/', business.getAllBusinesses);
export default businessRouter;
