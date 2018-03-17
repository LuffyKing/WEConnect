import chai from 'chai';
import { businesses } from '../../server/dummy-data/database';
import BusinessController from '../../server/controllers/businesses';

const businessCont = new BusinessController(businesses);
const businessid = 1;
const userid = 1;
chai.should();
const should = chai.should();
describe('Business Controller method findBusinessAllUsers Tests', () => {
  describe('found test case findBusinessAllUsers', () => {
    it('it should find a business with the specified businessid', () => {
      const business = businessCont.findBusiness(businessid, userid);
      business.should.be.an('object');
      business.businessid.should.eql(businessid);
    });
  });

  describe('not found test case findBusinessAllUsers', () => {
    it(
      'it should not find a business with a bad userid ',
      () => {
        const business = businessCont.findBusiness(businessid, 'badid');
        should.not.exist(business);
      }
    );
  });

  describe('not found test case findBusinessAllUsers', () => {
    it(
      'it should not find a business with a bad businessid ',
      () => {
        const business = businessCont.findBusiness('badid', userid);
        should.not.exist(business);
      }
    );
  });
});
