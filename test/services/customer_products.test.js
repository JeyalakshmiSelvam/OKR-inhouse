const assert = require('assert');
const app = require('../../src/app');

describe('\'customer_products\' service', () => {
  it('registered the service', () => {
    const service = app.service('customer-products');

    assert.ok(service, 'Registered the service');
  });
});
