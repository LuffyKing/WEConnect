import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import { businesses } from '../../server/dummy-data/database';

chai.should();
chai.use(chaiHttp);
const businessid = 1;
describe('Business API getBusiness Tests', () => {
  describe('/GET getBusiness', () => {
    it('should GET a business specified by the businessid', (done) => {
      chai.request(server)
        .get(`/api/v1/businesses/${businessid}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Business Found');
          res.body.should.have.property('business');
          res.body.business.businessName.should
            .eql(businesses[businessid - 1].businessName);
          res.body.business.businessid.should
            .eql(businesses[businessid - 1].businessid);
          res.body.business.industry.should
            .eql(businesses[businessid - 1].industry);
          res.body.business.email.should
            .eql(businesses[businessid - 1].email);
          res.body.business.telephoneNumber.should
            .eql(businesses[businessid - 1].telephoneNumber);
          res.body.business.description.should
            .eql(businesses[businessid - 1].description);
          done();
        });
    });
  });

  describe('/GET getBusiness', () => {
    it(
      'should try to make a request to the GET api with an invalid businessid and fail',
      (done) => {
        chai.request(server)
          .get('/api/v1/businesses/badid')
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('Business Not Found');
            done();
          });
      }
    );
  });
});
