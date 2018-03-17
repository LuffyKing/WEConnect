import chai from 'chai';
import chaiHttp from 'chai-http';
import AuthRouter from '../../server/router/auth/auth';
import testserver from '../../server/test-server';

chai.should();
chai.use(chaiHttp);
const login = {
  email: 'aderinwale17@gmail.com',
  password: 'damola'
};
testserver.use('/test', AuthRouter);
const signup = {
  firstName: 'Damola',
  lastName: 'Kingrade',
  mobile: '0009078821345',
  email: 'aderinwale90909090@gmail.com',
  password: 'Damolaisno1!'
};

describe('Auth router test Tests', () => {
  describe('/POST login', () => {
    it('it should POST login credentials and succeed', (done) => {
      chai.request(testserver)
        .post('/test/login')
        .send(login)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Login success');
          done();
        });
    });
  });

  describe('/POST signup', () => {
    it('it should POST signup information to create a new user', (done) => {
      chai.request(testserver)
        .post('/test/signup')
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
});
