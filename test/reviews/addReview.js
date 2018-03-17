import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);

const review = {
  userid: 2,
  rating: 5,
  description: 'Really enjoyable place to work at'
};

const reviewNoDescription = {
  userid: 3,
  rating: 3,
};

const reviewNoRating = {
  userid: 3,
  description: 'Sword art online style firm'
};

const businessid = 3;
describe('Reviews API addReview Tests', () => {
  describe('/POST addReview', () => {
    it('it should add a review to a business', (done) => {
      chai.request(server)
        .post(`/api/v1/businesses/${businessid}/reviews`)
        .send(review)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Successfully created a new review');
          res.body.should.have.property('newReview');
          res.body.newReview.userid.should.eql(2);
          res.body.newReview.rating.should.eql(5);
          res.body.newReview.description.should.eql('Really enjoyable place to work at');
          done();
        });
    });
  });

  describe('/POST addReview', () => {
    it(
      'should try to add a review to a business with an invalid id and fail',
      (done) => {
        chai.request(server)
          .post('/api/v1/businesses/badid/reviews')
          .send(review)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('Error User or Business not found');
            done();
          });
      }
    );
  });

  describe('/POST addReview', () => {
    it('it should try to add a review with no rating to a business and fail', (done) => {
      chai.request(server)
        .post(`/api/v1/businesses/${businessid}/reviews`)
        .send(reviewNoRating)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Error null rating or description');
          done();
        });
    });
  });

  describe('/POST addReview', () => {
    it('it should try to add a review with no description to a business and fail', (done) => {
      chai.request(server)
        .post(`/api/v1/businesses/${businessid}/reviews`)
        .send(reviewNoDescription)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Error null rating or description');
          done();
        });
    });
  });
});
