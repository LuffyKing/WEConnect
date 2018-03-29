import express from 'express';
import BusinessesController from '../../controllers/businesses';
import validation from '../../middlewares/validation';
import verifyToken from '../../middlewares/verifyToken';

const businessRouter = express.Router();

businessRouter.post('/', verifyToken, validation.registerBusinessValidator, BusinessesController.registerBusiness);

businessRouter.put('/:businessid', verifyToken, validation.updateBusinessValidator, BusinessesController.updateBusiness);

businessRouter.delete('/:businessid', verifyToken, validation.businessidValidator, BusinessesController.removeBusiness);

businessRouter.get('/:businessid', validation.businessidValidator, BusinessesController.getBusiness);

businessRouter.get('/', validation.getAllBusinessesValidator, BusinessesController.getAllBusinesses);
export default businessRouter;
