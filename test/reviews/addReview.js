import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import db from '../../server/models';

chai.use(chaiHttp);

const review = {
  userid: db.Users.findOne({ where: { name: 'Oyindamola' } }).userid,
  rating: 5,
  description: 'Really enjoyable place to work at'
};

const reviewRatingAbove5 = {
  userid: db.Users.findOne({ where: { name: 'Oyindamola' } }).userid,
  rating: 10,
  description: 'Really enjoyable place to work at'
};

const reviewNoDescription = {
  userid: db.Users.findOne({ where: { name: 'Oyindamola' } }).userid,
  rating: 3,
};

const reviewNoRating = {
  userid: db.Users.findOne({ where: { name: 'Oyindamola' } }).userid,
  description: 'Sword art online style firm'
};

const { businessid } = db.Businesses.all()[0];
describe('Reviews API addReview Tests', () => {
  describe('/POST addReview', () => {
    it('should add a review to a business', (done) => {
      chai.request(server)
        .post(`/api/v1/businesses/${businessid}/reviews`)
        .send(review)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('newReview');
          res.body.newReview.userid.should.eql(review.userid);
          res.body.newReview.rating.should.eql(5);
          res.body.newReview.description.should.eql('Really enjoyable place to work at');
          done();
        });
    });
  });

  describe('/POST addReview', () => {
    it(
      'should try to add a review to a business with a businessesid(non-UUID) and fail',
      (done) => {
        chai.request(server)
          .post('/api/v1/businesses/badid/reviews')
          .send(review)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      }
    );
  });

  describe('/POST addReview', () => {
    it('should try to add a review with no rating to a business and fail', (done) => {
      chai.request(server)
        .post(`/api/v1/businesses/${businessid}/reviews`)
        .send(reviewNoRating)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('/POST addReview', () => {
    it('should try to add a review with no rating to a business and fail', (done) => {
      chai.request(server)
        .post(`/api/v1/businesses/${businessid}/reviews`)
        .send(reviewRatingAbove5)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  describe('/POST addReview', () => {
    it('should try to add a review with no description to a business and fail', (done) => {
      chai.request(server)
        .post(`/api/v1/businesses/${businessid}/reviews`)
        .send(reviewNoDescription)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
});
