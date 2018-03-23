import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);
const signup = {
  firstName: 'Damola',
  lastName: 'Kingrade',
  mobile: '09078821345',
  email: 'aderinwale90@gmail.com',
  password: 'Damolaisno1!'
};

const signUpDuplicateMobileAndEmail = {
  firstName: 'Oyindamola',
  lastName: 'Kinger',
  mobile: '08182924615',
  email: 'ade@gmail.com',
  userid: 3,
  password: 'damola'
};

const incompleteSignup = {
  firstName: 'Damola',
  email: 'aderinwale09090@gmail.com',
  password: 'Damolaisno1!',
  mobile: '09098980001',
};

describe('Auth API Signup Tests', () => {
  describe('/POST signup', () => {
    it('should POST signup information to create a new user', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(signup)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('successfully created a new user');
          res.body.should.have.property('user');
          res.body.user.should.be.an('object');
          res.body.user.firstName.should.eql(signup.firstName);
          res.body.user.lastName.should.eql(signup.lastName);
          res.body.user.mobile.should.eql(signup.mobile);
          res.body.user.email.should.eql(signup.email);
          done();
        });
    });
  });
  describe('/POST signup', () => {
    it('should POST incomplete signup information and fail', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(incompleteSignup)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Error Required Fields can not be empty.');
          done();
        });
    });
  });
  describe('/POST signup', () => {
    it(
      'should POST signup information with non-unique Email or Mobile',
      (done) => {
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(signUpDuplicateMobileAndEmail)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('Error Non-Unique Email Or Mobile.');
            done();
          });
      }
    );
  });
});
