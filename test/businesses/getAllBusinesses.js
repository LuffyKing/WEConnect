import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

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
          res.body.should.have.property('businesses');
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
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.should.have.property('filteredBusinesses');
            res.body.filteredBusinesses.should.be.an('array');
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
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.should.have.property('filteredBusinesses');
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
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.should.have.property('filteredBusinesses');
            done();
          });
      }
    );
  });
});
