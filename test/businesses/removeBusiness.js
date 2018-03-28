import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import db from '../../server/models';

chai.should();
chai.use(chaiHttp);
const { businessid } = db.Businesses.findOne({ where: { name: 'Swordcorp' } });
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
      'should try to DELETE a business with a businessid that no longer exists and fail',
      (done) => {
        chai.request(server)
          .delete(`/api/v1/businesses/${businessid}`)
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

  describe('/DELETE removeBusiness', () => {
    it(
      'should try to DELETE a business with businessid that is not a UUID and fail',
      (done) => {
        chai.request(server)
          .delete('/api/v1/businesses/badid')
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
