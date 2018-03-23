import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);

const businessid = 3;
describe('Reviews API getAllReviews Tests', () => {
  describe('/GET getAllReviews', () => {
    it('should get all reviews about a business', (done) => {
      chai.request(server)
        .get(`/api/v1/businesses/${businessid}/reviews`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('reviews');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.reviews.should.be.an('array');
          done();
        });
    });
  });

  describe('/GET getAllReviews', () => {
    it('should try to get all reviews from a business with an invalid businessid and fail', (done) => {
      chai.request(server)
        .get('/api/v1/businesses/badid/reviews')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Error Business not found');
          done();
        });
    });
  });
});
