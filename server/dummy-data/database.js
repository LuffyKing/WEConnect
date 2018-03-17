import moment from 'moment';
import bcrypt from 'bcrypt-nodejs';

const testpass = bcrypt.hashSync('damola');

const users = [
  {
    firstName: 'Oyindamola',
    lastName: 'Aderinwale',
    mobile: '08182924611',
    email: 'aderinwale17@gmail.com',
    userid: 1,
    password: testpass,
    dateCreated: moment()
  },
  {
    firstName: 'King',
    lastName: 'Aderinwale',
    mobile: '08181117777',
    email: 'aderinwale@gmail.com',
    userid: 2,
    password: testpass,
    dateCreated: moment()
  },
  {
    firstName: 'Oyindamola',
    lastName: 'Kinger',
    mobile: '08182924615',
    email: 'ade@gmail.com',
    userid: 3,
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
    userid: 1,
    businessid: 1,
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
    userid: 2,
    businessid: 2,
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
    userid: 3,
    businessid: 3,
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
