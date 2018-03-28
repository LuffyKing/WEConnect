import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server/server';
import db from '../../server/models';

chai.should();
chai.use(chaiHttp);
const newBusiness = {
  businessName: 'Swordcorp',
  telephoneNumber: '01-23000001',
  email: 'pr@swordcorp.com',
  businessWebsite: 'www.3swordcorp.com',
  industry: 'Weapons',
  description: 'Weapons leaders with offices in North America and Europe',
  street: '4 Forloop lane',
  city: 'San Francisco',
  country: 'United States',
  state: 'California',
  userid: db.Users.findOne({ where: { name: 'Oyindamola' } }).userid
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
  userid: db.Users.findOne({ where: { name: 'Oyindamola' } }).userid
};
const businessAlreadyExisting = db.Businesses.findOne({ where: { name: 'Swordcorp' } });

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
      'should try to POST and register a business that already exists',
      (done) => {
        chai.request(server)
          .post('/api/v1/businesses/')
          .send(businessAlreadyExisting)
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
