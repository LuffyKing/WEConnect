import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

chai.use(chaiHttp);
const signup = {
  firstName: 'Damola',
  lastName: 'Kingrade',
  mobile: '09078821344',
  email: 'aderinwale08790@gmail.com',
  password: 'Damolaisno1!'
};

const signUpDuplicateMobileAndEmail = {
  firstName: 'Damola',
  lastName: 'Kingrade',
  mobile: '09078821345',
  email: 'aderinwale90@gmail.com',
  password: 'Damolaisno1!'
};


const incompleteLastNameSignup = {
  firstName: 'Oyindamola',
  email: 'aderinwale09090@gmail.com',
  password: 'Damolaisno1!',
  mobile: '09098980001',
};
const incompleteFirstNameSignup = {
  lastName: 'Kinger',
  email: 'aderinwale09090@gmail.com',
  password: 'Damolaisno1!',
  mobile: '09098980001'
};
const incompleteEmailSignup = {
  firstName: 'Oyindamola',
  lastName: 'Kinger',
  password: 'Damolaisno1!',
  mobile: '09098980001'
};
const incompletePasswordSignup = {
  firstName: 'Oyindamola',
  lastName: 'Kinger',
  email: 'aderinwale09090@gmail.com',
  mobile: '09098980001'
};
const incompleteMobileSignup = {
  firstName: 'Oyindamola',
  lastName: 'Kinger',
  password: 'Damolaisno1!',
  email: 'aderinwale09090@gmail.com',
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
          res.body.should.have.property('user');
          res.body.user.should.be.an('object');
          done();
        });
    });
  });
  describe('/POST signup', () => {
    it('should POST signup information without last name and fail', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(incompleteLastNameSignup)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
  describe('/POST signup', () => {
    it('should POST signup information without first name and fail', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(incompleteFirstNameSignup)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
  describe('/POST signup', () => {
    it('should POST signup information without email and fail', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(incompleteEmailSignup)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
  describe('/POST signup', () => {
    it('should POST signup information without password and fail', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(incompletePasswordSignup)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
  describe('/POST signup', () => {
    it('should POST signup information without mobile number and fail', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(incompleteMobileSignup)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an('object');
          res.body.should.have.property('message');
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
            done();
          });
      }
    );
  });
});
