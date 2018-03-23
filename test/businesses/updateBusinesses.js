import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.should();
const updatesToBusiness = {
  businessName: 'Brucecorp',
  industry: 'Batman gear'
};
const businessid = 3;
chai.use(chaiHttp);
describe('Business API updateBusiness Tests', () => {
  describe('/PUT updateBusiness', () => {
    it('should POST and register a business', (done) => {
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
      'should try to PUT to an invalid businessid',
      (done) => {
        chai.request(server)
          .put('/api/v1/businesses/badid')
          .send(updatesToBusiness)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('Business Not Found invalid businessid');
            done();
          });
      }
    );
  });
});
