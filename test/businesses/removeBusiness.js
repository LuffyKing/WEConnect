import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.should();
chai.use(chaiHttp);
const businessid = 1;
describe('Business API removeBusiness Tests', () => {
  describe('/DELETE removeBusiness', () => {
    it('should DELETE a business specified by the businessid', (done) => {
      chai.request(server)
        .delete(`/api/v1/businesses/${businessid}`)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });

  describe('/DELETE removeBusiness', () => {
    it(
      'should try to DELETE a business with an invalid businessid and fail',
      (done) => {
        chai.request(server)
          .delete('/api/v1/businesses/badid')
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('Business not found');
            done();
          });
      }
    );
  });
});
