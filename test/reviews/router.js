import chai from 'chai';
import chaiHttp from 'chai-http';
import testserver from '../../server/test-server';
import ReviewRouter from '../../server/router/review/review';

const review = {
  userid: 2,
  rating: 5,
  description: 'Really enjoyable place to work at'
};

chai.should();
chai.use(chaiHttp);
const businessid = 3;
// Create an express application object

testserver.use('/test/:businessid/reviews', ReviewRouter);

describe('Review Router test Tests', () => {
  describe('/POST addReview', () => {
    it('it should add a review to a valid businessid', (done) => {
      chai.request(testserver)
        .post(`/test/${businessid}/reviews`)
        .send(review)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Successfully created a new review');
          done();
        });
    });
  });

  describe('/GET getAllReviews', () => {
    it('it should get all reviews about a business', (done) => {
      chai.request(testserver)
        .get(`/test/${businessid}/reviews`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('reviews');
          res.body.should.have.property('message');
          res.body.reviews.should.be.an('array');
          done();
        });
    });
  });
});
