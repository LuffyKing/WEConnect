import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import { businesses } from '../../server/dummy-data/database';

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
  userid: 5
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
  userid: 6
};

describe('Business API registerBusiness Tests', () => {
  describe('/POST registerBusiness', () => {
    it('it should POST and register a business', (done) => {
      chai.request(server)
        .post('/api/v1/businesses/')
        .send(newBusiness)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('successfully created a new business');
          res.body.should.have.property('business');
          res.body.business.businessWebsite.should
            .eql(businesses[businesses.length - 1].businessWebsite);
          res.body.business.email.should
            .eql(businesses[businesses.length - 1].email);
          res.body.business.industry.should
            .eql(businesses[businesses.length - 1].industry);
          res.body.business.description.should
            .eql(businesses[businesses.length - 1].description);
          res.body.business.city.should
            .eql(businesses[businesses.length - 1].city);
          res.body.business.userid.should
            .eql(businesses[businesses.length - 1].userid);
          res.body.business.state.should
            .eql(businesses[businesses.length - 1].state);
          res.body.business.telephoneNumber.should
            .eql(businesses[businesses.length - 1].telephoneNumber);
          res.body.business.street.should
            .eql(businesses[businesses.length - 1].street);
          res.body.business.country.should
            .eql(businesses[businesses.length - 1].country);
          done();
        });
    });
  });

  describe('/POST registerBusiness', () => {
    it(
      'it should try to POST and register a business with not all the fields filled and fail',
      (done) => {
        chai.request(server)
          .post('/api/v1/businesses/')
          .send(newBusinessNotAllFieldsFilled)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('Error All Required fields must be filled');
            done();
          });
      }
    );
  });

  describe('/POST registerBusiness', () => {
    it(
      'it should try to POST and register a business with all',
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
