import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './router/index';
import badApiRequest from './router/badRequests/badApiRequests';
/**
 * It initializes an express instance
 */
const app = express();
/**
 * cross origin resource sharing enabled where the CORS header is passed
 * and request origin is reflected
 */
app.use(cors({ credentials: true, origin: true }));
/**
 * It setups the port to listen on the default 8081 or a port specified
 * by the environment variable
 */
const port = process.env.PORT || 8081;
/**
 * It setups the server to parse json data it receives
 */
app.use(bodyParser.json());
/**
 * It setups the server to handle only json and not url encoded data
 */
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * Logging requests to the console via morgan on a dev setting
 */
app.use(morgan('dev'));
/**
 * Middleware for welcome message  on the '/' route
 */
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to WeConnect api, go to /api/v1/api-docs/ forcurrent api docs. Current version is v1'
  });
});

/**
 * Middleware that allows the server to use the express router that handles
 * auth, business and review, the uses the router along the /api/v1
 */
app.use('/api/v1', router);
/**
 * Middleware that runs when a request is made outside the scope of the Router
 * above
 * @param {Object} req - request object containing params and body
 * @param {Object} res - response object that conveys the result of the request
 * @returns {Object} - response object that has a status code 400 and an error
 * message
 */
app.use(badApiRequest);
/**
 * Set up the server to listen on the port specified in the port variable and
 * start the server
 */
app.listen(port);

export default app;
