import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';

let token;
let businessid;
chai.should();
chai.use(chaiHttp);
const testBiz = {
    "businessName": "Tenjicorp",
    "telephoneNumber": "01-39999999",
    "email": "pr@tenjicorp.com",
    "businessWebsite": "www.tenjicorp.com",
    "industry": "agriculture",
    "description": "Chemical leaders with offices in North America and Europe",
    "street": "3 Forloop lane",
    "city": "San Francisco",
    "country": "United States",
    "state": "California",

}
const newUser = {
    email: 'aderinwale17@gamil.com',
    password: 'damola'
  };
let userid;
describe('Business API getBusiness Tests', () => {
  describe('/GET getBusiness', () => {
    it('should GET a business specified by the businessid', (done) => {
      chai.request(server)
        .get(`/api/v1/businesses/${businessid}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.should.have.property('business');
          done();
        });
    });
  });

  describe('/GET getBusiness', () => {
    it(
      'should try to make a request to the GET api with an invalid businessid and fail',
      (done) => {
        chai.request(server)
          .get('/api/v1/businesses/badid')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      }
    );
  });
});
