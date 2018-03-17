import chai from 'chai';
import { businesses } from '../../server/dummy-data/database';
import BusinessController from '../../server/controllers/businesses';

const businessCont = new BusinessController(businesses);
const uniqueEmail = 'unique@gmail.com';
const nonUniqueEmail = businesses[0].email;
chai.should();
describe('Business Controller method hasUniqueEmail Tests', () => {
  describe('unique test case hasUniqueEmail', () => {
    it('it should find that the email is unique', () => {
      const hasUniqueEmail = businessCont.hasUniqueEmail(uniqueEmail);
      hasUniqueEmail.should.be.a('boolean');
      hasUniqueEmail.should.eql(true);
    });
  });

  describe('non unique test case hasUniqueMobileNumber', () => {
    it(
      'it should not find that the email is unique',
      () => {
        const hasUniqueEmail = businessCont.hasUniqueEmail(nonUniqueEmail);
        hasUniqueEmail.should.be.a('boolean');
        hasUniqueEmail.should.eql(false);
      }
    );
  });
});
