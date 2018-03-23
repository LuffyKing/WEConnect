import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import { businesses } from '../../server/dummy-data/database';

chai.should();
const locationTerm = 'Whileloop';
const categoryTerm = 'construction';
chai.use(chaiHttp);
describe('Business API getAllBusinesses Tests', () => {
  describe('/GET getAllBusiness', () => {
    it('should GET all businesses with no filters applied', (done) => {
      chai.request(server)
        .get('/api/v1/businesses/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Success - showing businesses with no filters applied');
          res.body.should.have.property('businesses');
          res.body.businesses.length.should.eql(businesses.length);
          res.body.businesses[0].businessName.should.eql(businesses[0].businessName);
          done();
        });
    });
  });

  describe('/GET getAllBusinesses', () => {
    it(
      'should GET all businesses with the specified LOCATION in the request',
      (done) => {
        chai.request(server)
          .get(`/api/v1/businesses?location=${locationTerm}`)
          .end((err, res) => {
            const filteredLocationTest = businesses.filter(business =>
              `${business.street} ${business.city} ${business.state}
              ${business.country}`.toUpperCase().includes(locationTerm.toUpperCase()));
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('Success - showing businesses filtered by location');
            res.body.should.have.property('filteredBusinesses');
            res.body.filteredBusinesses.should.be.an('array');
            res.body.filteredBusinesses.length.should.eql(filteredLocationTest.length);
            res.body.filteredBusinesses[0]
              .businessName.should.eql(filteredLocationTest[0].businessName);
            done();
          });
      }
    );
  });

  describe('/GET getAllBusinesses', () => {
    it(
      'should GET all businesses with the specified CATEGORY in the request',
      (done) => {
        chai.request(server)
          .get(`/api/v1/businesses?category=${categoryTerm}`)
          .end((err, res) => {
            const filteredCategoryTest = businesses.filter(business =>
              business.industry.toUpperCase() === categoryTerm.toUpperCase());
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('Success - showing businesses filtered by category');
            res.body.should.have.property('filteredBusinesses');
            res.body.filteredBusinesses.length.should.eql(filteredCategoryTest.length);
            res.body.filteredBusinesses[0].businessName
              .should.eql(filteredCategoryTest[0].businessName);
            done();
          });
      }
    );
  });

  describe('/GET getAllBusinesses', () => {
    it(
      'it should try to GET all businesses using both location and category filters',
      (done) => {
        chai.request(server)
          .get(`/api/v1/businesses?category=${categoryTerm}&location=${locationTerm}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('Error - Double filtering, use only one.');
            done();
          });
      }
    );
  });
});
