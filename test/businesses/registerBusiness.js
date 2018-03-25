import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import { businesses, users } from '../../server/dummy-data/database';

chai.should();
chai.use(chaiHttp);
const newBusiness = {
  businessName: 'Swordcorp',
  telephoneNumber: '01-3000001',
  email: 'pr@swordcorp.com',
  businessWebsite: 'www.swordcorp.com',
  industry: 'Weapons',
  description: 'Weapons leaders with offices in North America and Europe',
  street: '4 Forloop lane',
  city: 'San Francisco',
  country: 'United States',
  state: 'California',
  userid: users[0].userid
};
const newBusinessNotAllFieldsFilled = {
  businessName: 'Hintcorp',
  telephoneNumber: '01-3000091',
  email: 'pr@hintcorp.com',
  businessWebsite: 'www.hintcorp.com',
  industry: 'Hints',
  city: 'San Francisco',
  country: 'United States',
  state: 'California',
  userid: users[1].userid
};

describe('Business API registerBusiness Tests', () => {
  describe('/POST registerBusiness', () => {
    it('should POST and register a business', (done) => {
      chai.request(server)
        .post('/api/v1/businesses/')
        .send(newBusiness)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('successfully created a new business');
          res.body.should.have.property('business');
          res.body.business.should.be.an('object');
          done();
        });
    });
  });

  describe('/POST registerBusiness', () => {
    it(
      'should try to POST and register a business with not all the fields filled and fail',
      (done) => {
        chai.request(server)
          .post('/api/v1/businesses/')
          .send(newBusinessNotAllFieldsFilled)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            done();
          });
      }
    );
  });

  describe('/POST registerBusiness', () => {
    it(
      'should try to POST and register a business with all',
      (done) => {
        chai.request(server)
          .post('/api/v1/businesses/')
          .send(businesses[0])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('Error Invalid non-unique email & telephone number inputs');
            done();
          });
      }
    );
  });
});
