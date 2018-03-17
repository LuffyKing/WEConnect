import express from 'express';
import bodyParser from 'body-parser';
/**
 * It initializes an express instance
 */
const app = express();
/**
 * It setups the port to listen on the default 8081 or a port specified
 * by the environment variable
 */
const port = process.env.PORT || 9000;
/**
 * It setups the server to parse json data it receives
 */
app.use(bodyParser.json());
/**
 * It setups the server to handle only json and not url encoded data
 */
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Set up the server to listen on the port specified in the port variable and
 * start the server
 */
app.listen(port, () => {
});
export default app;
