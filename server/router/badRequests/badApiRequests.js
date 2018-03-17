/**
* It handles bad api requests
* @param {Object} req - request object containing params and body
* @param {Object} res - response object that conveys the result of the request
* @returns {Object} - response object that has a status code of 400
*/
const badApiRequest = (req, res) => {
  res.status(400).send({ message: 'Bad API - Request' });
};
export default badApiRequest;
