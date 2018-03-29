import YAML from 'yamljs';

/**
 * It loads
 */
const swaggerDocument = YAML.load(`${process.cwd()}/server/swagger.yaml`);
export default swaggerDocument;
