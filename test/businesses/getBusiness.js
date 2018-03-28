import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import db from '../../server/models';

const { businessid } = db.Businesses.findOne({ where: { name: 'Swordcorp' } });
chai.should();
chai.use(chaiHttp);

describe('Business API getBusiness Tests', () => {
  describe('/GET getBusiness', () => {
    it('should GET a business specified by the businessid', (done) => {
      chai.request(server)
        .get(`/api/v1/businesses/${businessid}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('business');
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
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      }
    );
  });
});
