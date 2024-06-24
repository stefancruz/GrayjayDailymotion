import { expect, use } from 'chai'; 
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true }); // Configure Ajv instance

// Optionally add formats (e.g., 'date-time', 'email', 'uri')
addFormats(ajv);

// Configure chai to use Ajv for JSON schema validation
use((chai, utils) => {
    utils.addMethod(chai.Assertion.prototype, 'jsonSchema', function (schema) {
        const object = utils.flag(this, 'object');
        const validate = ajv.compile(schema);
        const valid = validate(object);
        this.assert(
            valid,
            `expected ${utils.inspect(object)} to match schema ${utils.inspect(schema)}, but validation errors are: ${validate.errors}`,
            `expected ${utils.inspect(object)} not to match schema ${utils.inspect(schema)}`
        );
    });
});

export { expect };
