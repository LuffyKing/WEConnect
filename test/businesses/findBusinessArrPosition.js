import chai from 'chai';
import { businesses } from '../../server/dummy-data/database';
import BusinessController from '../../server/controllers/businesses';

const businessCont = new BusinessController(businesses);
const { businessid } = businesses[0];
chai.should();
describe('Business Controller method findBusinessArrPosition Tests', () => {
  describe('found test case findBusinessArrPosition', () => {
    it("should find a business' array position", () => {
      const businessArrPos = businessCont.findBusinessArrPosition(businessid);
      businessArrPos.should.be.a('number');
      businessArrPos.should.eql(0);
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
