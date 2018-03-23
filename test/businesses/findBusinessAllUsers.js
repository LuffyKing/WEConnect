import chai from 'chai';
import { businesses } from '../../server/dummy-data/database';
import BusinessController from '../../server/controllers/businesses';

const businessCont = new BusinessController(businesses);
const businessid = 1;
chai.should();
const should = chai.should();
describe('Business Controller method findBusinessAllUsers Tests', () => {
  describe('found test case findBusinessAllUsers', () => {
    it('should find a business with the specified businessid', () => {
      const business = businessCont.findBusinessAllUsers(businessid);
      business.should.be.an('object');
      business.businessid.should.eql(businessid);
    });
  });

  describe('not found test case findBusinessAllUsers', () => {
    it(
      'should not find a business with a badid',
      () => {
        const business = businessCont.findBusinessAllUsers('badid');
        should.not.exist(business);
      }
    );
  });
});
