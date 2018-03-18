import YAML from 'yamljs';

/**
 * It setups the API documenation using Swagger on the api-docs route
 */
const swaggerDocument = YAML.load(`${process.cwd()}/server/swagger.yaml`);
export default swaggerDocument;
