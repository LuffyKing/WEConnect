import chai from 'chai';
import { businesses } from '../../server/dummy-data/database';
import BusinessController from '../../server/controllers/businesses';

const businessCont = new BusinessController(businesses);
const uniqueMobile = '0801111111111';
const nonUniqueMobile = businesses[0].telephoneNumber;
chai.should();
describe('Business Controller method hasUniqueTelephoneNumber Tests', () => {
  describe('unique test case hasUniqueTelephoneNumber', () => {
    it('it should find that the telephone number is unique', () => {
      const hasTelephoneNumber = businessCont.hasUniqueTelephoneNumber(uniqueMobile);
      hasTelephoneNumber.should.be.a('boolean');
      hasTelephoneNumber.should.eql(true);
    });
  });

  describe('non unique test case hasUniqueTelephoneNumber', () => {
    it(
      'it should not find that the telephone number is unique',
      () => {
        const hasTelephoneNumber = businessCont.hasUniqueTelephoneNumber(nonUniqueMobile);
        hasTelephoneNumber.should.be.a('boolean');
        hasTelephoneNumber.should.eql(false);
      }
    );
  });
});
