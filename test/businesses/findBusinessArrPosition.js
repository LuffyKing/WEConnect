import chai from 'chai';
import { businesses } from '../../server/dummy-data/database';
import BusinessController from '../../server/controllers/businesses';

const businessCont = new BusinessController(businesses);
const businessid = 1;
chai.should();
describe('Business Controller method findBusinessArrPosition Tests', () => {
  describe('found test case findBusinessArrPosition', () => {
    it("should find a business' array position", () => {
      const businessArrPos = businessCont.findBusinessArrPosition(businessid);
      businessArrPos.should.be.a('number');
      businessArrPos.should.eql(businessid - 1);
    });
  });

  describe('not found test case findBusinessArrPosition', () => {
    it(
      'should not find not a business array position with a badid',
      () => {
        const businessArrPos = businessCont.findBusinessArrPosition('badid');
        businessArrPos.should.be.a('number');
        businessArrPos.should.eql(-1);
      }
    );
  });
});
