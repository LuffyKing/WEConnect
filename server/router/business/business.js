import express from 'express';
import businesses from '../../controllers/businesses';
import validation from '../../middlewares/validation';
import verifyToken from '../../middlewares/verifyToken';

const businessRouter = express.Router();

businessRouter.post('/', verifyToken, validation.registerBusinessValidator, businesses.registerBusiness);

businessRouter.put('/:businessid', verifyToken, validation.updateBusinessValidator, businesses.updateBusiness);

businessRouter.delete('/:businessid', verifyToken, validation.businessidValidator, businesses.removeBusiness);

businessRouter.get('/:businessid', validation.businessidValidator, businesses.getBusiness);

businessRouter.get('/', validation.getAllBusinessesValidator, businesses.getAllBusinesses);
export default businessRouter;
