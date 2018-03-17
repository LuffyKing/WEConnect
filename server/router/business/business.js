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
export default businessRouter;
