import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
/**
 * chai is setup to make requests via chai-http
 */
chai.use(chaiHttp);
describe('Welcome message Middleware test', () => {
  /**
   * Testing welcome messge
   */
  describe('/POST welcome message', () => {
    it('it should POST and get the welcome message', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Welcome to WeConnect api, go to /api/v1/api-docs/ forcurrent api docs. Current version is v1');
          done();
        });
    });
  });
});
