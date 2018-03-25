import moment from 'moment';
import bcrypt from 'bcrypt-nodejs';
import uuidv4 from 'uuid/v4';

const testpass = bcrypt.hashSync('damola');
const a = uuidv4();
const b = uuidv4();
const c = uuidv4();
const users = [
  {
    firstName: 'Oyindamola',
    lastName: 'Aderinwale',
    mobile: '08182924611',
    email: 'aderinwale17@gmail.com',
    userid: uuidv4(),
    password: testpass,
    dateCreated: moment()
  },
  {
    firstName: 'King',
    lastName: 'Aderinwale',
    mobile: '08181117777',
    email: 'aderinwale@gmail.com',
    userid: uuidv4(),
    password: testpass,
    dateCreated: moment()
  },
  {
    firstName: 'Oyindamola',
    lastName: 'Kinger',
    mobile: '08182924615',
    email: 'ade@gmail.com',
    userid: uuidv4(),
    password: testpass,
    dateCreated: moment()
  }
];

const businesses = [
  {
    businessName: 'Onicorp',
    telephoneNumber: '01-2345679',
    email: 'pr@onicorp.com',
    businessWebsite: 'www.onicorp.com',
    industry: 'aerospace',
    description: 'Aerospace leaders with offices in North America and Europe',
    street: '1 Forloop lane',
    city: 'San Francisco',
    country: 'United States',
    state: 'California',
    userid: a,
    businessid: uuidv4(),
    dateCreated: moment(),
    lastEdited: moment(),
  },
  {
    businessName: 'Waynecorp',
    telephoneNumber: '01-3000000',
    email: 'pr@waynecorp.com',
    businessWebsite: 'www.waynecorp.com',
    industry: 'Chemical',
    description: 'Chemical leaders with offices in North America and Europe',
    street: '2 Forloop lane',
    city: 'San Francisco',
    country: 'United States',
    state: 'California',
    userid: b,
    businessid: uuidv4(),
    dateCreated: moment(),
    lastEdited: moment(),
  },
  {
    businessName: 'Towncorp',
    telephoneNumber: '01-311111111',
    email: 'pr@towncorp.com',
    businessWebsite: 'www.towncorp.com',
    industry: 'construction',
    description: 'Construction leaders with offices in North America and Europe',
    street: '1 Whileloop lane',
    city: 'San Diego',
    country: 'United States',
    state: 'California',
    userid: c,
    businessid: uuidv4(),
    dateCreated: moment(),
    lastEdited: moment(),
  }
];

const oniId = 1;

const oyinId = 1;

const reviews = {
  [oniId]: [{
    userid: oyinId,
    rating: 4,
    description: 'Really enjoyable experience',
    dateCreated: moment(),
    reviewId: 1,
    firstName: 'Oyindamola',
    lastName: 'Aderinwale'
  }]
};
export { users, businesses, reviews };
