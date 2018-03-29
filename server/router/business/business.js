import express from 'express';
import Businesses from '../../controllers/Businesses';
import validation from '../../middlewares/validation';
import verifyToken from '../../middlewares/verifyToken';

const businessRouter = express.Router();

businessRouter.post('/', verifyToken, validation.registerBusinessValidator, Businesses.registerBusiness);

businessRouter.put('/:businessid', verifyToken, validation.updateBusinessValidator, Businesses.updateBusiness);

businessRouter.delete('/:businessid', verifyToken, validation.businessidValidator, Businesses.removeBusiness);

businessRouter.get('/:businessid', validation.businessidValidator, Businesses.getBusiness);

businessRouter.get('/', validation.getAllBusinessesValidator, Businesses.getAllBusinesses);
export default businessRouter;
