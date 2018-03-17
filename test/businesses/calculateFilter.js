import chai from 'chai';
import { businesses } from '../../server/dummy-data/database';
import BusinessController from '../../server/controllers/businesses';

const businessCont = new BusinessController(businesses);
chai.should();
describe('Business Controller method calculateFilter Tests', () => {
  describe('Double filter test case calculateFilter', () => {
    it('it should find that the telephone number is unique', () => {
      businessCont.calculateFilter('USA', 'Aerospace');
      businessCont.filter.should.be.a('string');
      businessCont.filter.should.eql('Error - Double filter');
    });
  });

  describe('Category test case calculateFilter', () => {
    it(
      'it should return CATEGORY if LOCATION is undefined',
      () => {
        businessCont.calculateFilter(undefined, 'Aerospace');
        businessCont.filter.should.be.a('string');
        businessCont.filter.should.eql('CATEGORY');
      }
    );
  });

  describe('Category test case calculateFilter', () => {
    it(
      'it should return LOCATION if CATEGORY is undefined',
      () => {
        businessCont.calculateFilter('USA', undefined);
        businessCont.filter.should.be.a('string');
        businessCont.filter.should.eql('LOCATION');
      }
    );
  });

  describe('Category test case calculateFilter', () => {
    it(
      'it should return NO FILTER if CATEGORY & LOCATION are undefined',
      () => {
        businessCont.calculateFilter(undefined, undefined);
        businessCont.filter.should.be.a('string');
        businessCont.filter.should.eql('NO FILTER');
      }
    );
  });
});
