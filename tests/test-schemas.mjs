import './mocks.js';
import { expect } from './setup.mjs';


import source from '../build/DailymotionScript.js';

// Define the JSON schema
const searchCapabilitiesSchema = {
    type: "object",
    properties: {
        types: {
            type: "array",
            items: { type: "string" }
        },
        sorts: {
            type: "array",
            items: { type: "string" }
        },
        filters: {
            type: "array",
            items: { type: "object" }
        }
    },
    required: ["types", "sorts", "filters"],
    additionalProperties: false
};

describe('Source Namespace Functions', () => {
    // Skip tests if source or function is undefined
    if (source && typeof source.getSearchCapabilities === 'function') {
        it('source.getSearchCapabilities should return capabilities object matching schema', () => {
            const result = source.getSearchCapabilities();
            expect(result).to.jsonSchema(searchCapabilitiesSchema);
        });
    } else {
        it.skip('source.getSearchCapabilities should return capabilities object matching schema', () => {
            // Skip message if test is skipped
            console.warn('Skipping test: source or source.getSearchCapabilities is not defined.');
        });
    }

    // Skip tests if source or function is undefined
    if (source && typeof source.getSearchChannelContentsCapabilities === 'function') {
        it('source.getSearchChannelContentsCapabilities should return capabilities object matching schema', () => {
            const result = source.getSearchChannelContentsCapabilities();
            expect(result).to.jsonSchema(searchCapabilitiesSchema);
        });
    } else {
        it.skip('source.getSearchChannelContentsCapabilities should return capabilities object matching schema', () => {
            // Skip message if test is skipped
            console.warn('Skipping test: source or source.getSearchChannelContentsCapabilities is not defined.');
        });
    }
});