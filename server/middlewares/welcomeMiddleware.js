/**
* It Sets up welcome Middleware for the app
* @param {Object} req - request object containing params and body
* @param {Object} res - response object that conveys the result of the request
* @returns {Object} - response object that has a status code of 400
*/
const welcomeMiddleware = (req, res) => {
  res.status(200).send({
    message: 'Welcome to WeConnect api, go to /api/v1/api-docs/ forcurrent api docs. Current version is v1'
  });
};
export default welcomeMiddleware;
