import chai from 'chai';
import chaiHttp from 'chai-http';
import BusinessRouter from '../../server/router/business/business';
import { businesses } from '../../server/dummy-data/database';
import testserver from '../../server/test-server';

chai.should();
chai.use(chaiHttp);

const updatesToBusiness = {
  businessName: 'Brucecorp',
  industry: 'Batman gear'
};
const newBusiness = {
  businessName: 'Swordman',
  telephoneNumber: '01-31111',
  email: 'pr@swordman.com',
  businessWebsite: 'www.swordman.com',
  industry: 'Swords',
  description: 'Swords leaders with offices in North America and Europe',
  street: '5 Forloop lane',
  city: 'San Francisco',
  country: 'United States',
  state: 'California',
  userid: 1
};
const businessid = 2;
testserver.use('/test/businesses', BusinessRouter);

describe('Business router test Tests', () => {
  describe('/PUT updateBusiness', () => {
    it('it should POST and register a business', (done) => {
      chai.request(testserver)
        .put(`/test/businesses/${businessid}`)
        .send(updatesToBusiness)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql(`${updatesToBusiness.businessName} has been successfully updated`);
          res.body.should.have.property('updatedBusiness');
          res.body.updatedBusiness.businessName.should.eql(updatesToBusiness.businessName);
          res.body.updatedBusiness.industry.should.eql(updatesToBusiness.industry);
          done();
        });
    });
  });

  describe('/GET getAllBusiness', () => {
    it('it should GET all businesses with no filters applied', (done) => {
      chai.request(testserver)
        .get('/test/businesses/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Success - showing businesses with no filters applied');
          res.body.should.have.property('businesses');
          res.body.businesses.length.should.eql(businesses.length);
          res.body.businesses[0].businessName.should.eql(businesses[0].businessName);
          done();
        });
    });
  });

  describe('/POST registerBusiness', () => {
    it('it should POST and register a business', (done) => {
      chai.request(testserver)
        .post('/test/businesses/')
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

  describe('/GET getBusiness', () => {
    it('it should GET a business specified by the businessid', (done) => {
      chai.request(testserver)
        .get('/test/businesses/2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Business Found');
          res.body.should.have.property('business');
          res.body.business.should
            .be.an('object');
          done();
        });
    });
  });


  describe('/DELETE removeBusiness', () => {
    it('it should DELETE a business specified by the businessid', (done) => {
      chai.request(testserver)
        .delete(`/test/businesses/${businessid}`)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
