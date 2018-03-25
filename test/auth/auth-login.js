import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
/**
 * chai is setup to make requests via chai-http
 */
chai.use(chaiHttp);
/**
 * Login object for testing success cases
 */
const login = {
  email: 'aderinwale17@gmail.com',
  password: 'damola'
};
/**
 * Login object for testing failure cases
 */
const badLogin = {
  email: 'aderinwale17@gmail.com',
  password: 'wrong-password'
};

const badLoginValidatorNoEmailAndPassword = {
  email: '',
  password: ''

};

const badLoginValidatorNoEmail = {
  email: '',
  password: 'aderinwale17'

};

const badLoginValidatorNoPassword = {
  email: 'aderinwale17@gmail.com',
  password: ''

};

const badLoginValidatorBadEmail = {
  email: 'aderinwale17',
  password: 'dmaola'

};

describe('Auth API Login Tests', () => {
  /**
   * Testing post request on the login api -success case
   */
  describe('/POST login', () => {
    it('should POST login credentials and succeed', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(login)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
  /**
   * Testing post request on the login api - failure case
   */
  describe('/POST login', () => {
    it('should POST invalid login credentials', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(badLogin)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
  /**
   * Testing post request on the login api - failure case Email and Password Fields are empty
   */
  describe('/POST login', () => {
    it('should try to login without email and password fields filled in, and fail.', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(badLoginValidatorNoEmailAndPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  /**
 * Testing post request on the login api - failure case email Field is empty
 */
  describe('/POST login', () => {
    it('should try to login without email filled in, and fail.', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(badLoginValidatorNoEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
  /**
   * Testing post request on the login api - failure case password is empty
   */
  describe('/POST login', () => {
    it('should try to login without password filled in, and fail.', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(badLoginValidatorNoPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
  /**
   * Testing post request on the login api - failure case  email not an
   * email
   */
  describe('/POST login', () => {
    it('should try to login without a proper email filled in, and fail.', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(badLoginValidatorBadEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });
});
