import chai from 'chai';
import chaiHttp from 'chai-http';
import badApiRequest from '../../server/router/badRequests/badApiRequests';
import testserver from '../../server/test-server';
import router from '../../server/router';

testserver.use('/api/v1', router);
testserver.use(badApiRequest);
chai.should();
chai.use(chaiHttp);
const login = {
  email: 'aderinwale17@gmail.com',
  password: 'damola'
};
describe('badApiRequest Tests', () => {
  describe('/POST login (badApiRequests control group)', () => {
    it('it should POST login credentials and succeed(control group test)', (done) => {
      chai.request(testserver)
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
  describe('/POST badApiRequest', () => {
    it('it try to POST to a bad route, it should fail and get an error message', (done) => {
      chai.request(testserver)
        .post('/api/carzyrequest')
        .send(login)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Bad API - Request');
          done();
        });
    });
  });
  describe('/GET badApiRequest', () => {
    it('it try to GET from a bad route, it should fail and get an error message', (done) => {
      chai.request(testserver)
        .post('/api/carzyrequest')
        .send(login)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Bad API - Request');
          done();
        });
    });
  });
  describe('/PUT badApiRequest', () => {
    it('it try to PUT to a bad route, it should fail and get an error message', (done) => {
      chai.request(testserver)
        .post('/api/carzyrequest')
        .send(login)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Bad API - Request');
          done();
        });
    });
  });
  describe('/DELETE badApiRequest', () => {
    it('it try to DELETE a resource on a bad route, it should fail and get an error message', (done) => {
      chai.request(testserver)
        .post('/api/carzyrequest')
        .send(login)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Bad API - Request');
          done();
        });
    });
  });
});
