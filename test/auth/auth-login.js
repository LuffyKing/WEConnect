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

describe('Auth API Login Tests', () => {
  /**
   * Testing post request on the login api -success case
   */
  describe('/POST login', () => {
    it('it should POST login credentials and succeed', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
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
  /**
   * Testing post request on the login api - failure case
   */
  describe('/POST login', () => {
    it('it should POST invalid login credentials', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send(badLogin)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Invalid Username/Password');
          done();
        });
    });
  });
});
