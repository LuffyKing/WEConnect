import uuidv4 from 'uuid/v4';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import { businesses } from '../../server/dummy-data/database';


chai.should();
const updatesToBusiness = {
  businessName: 'Brucecorp',
  industry: 'Batman gear'
};
const { businessid } = businesses[1];
chai.use(chaiHttp);

describe('Business API updateBusiness Tests', () => {
  describe('/PUT updateBusiness', () => {
    it('should PUT and update a business', (done) => {
      chai.request(server)
        .put(`/api/v1/businesses/${businessid}`)
        .send(updatesToBusiness)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql(`${updatesToBusiness.businessName} has been successfully updated`);
          res.body.should.have.property('updatedBusiness');
          res.body.updatedBusiness.businessName.should.eql(updatesToBusiness.businessName);
          res.body.updatedBusiness.industry.should.eql(updatesToBusiness.industry);
          done();
        });
    });
  });

  describe('/PUT updateBusiness', () => {
    it(
      'should try to PUT with a businessid(UUID) that does not exist and fail',
      (done) => {
        chai.request(server)
          .put(`/api/v1/businesses/${uuidv4()}`)
          .send(updatesToBusiness)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      }
    );
  });
  describe('/PUT updateBusiness', () => {
    it(
      'should try to PUT with a businessid(not UUID) that does not exist and fail',
      (done) => {
        chai.request(server)
          .put('/api/v1/businesses/badid')
          .send(updatesToBusiness)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      }
    );
  });
});
