const assert = require('assert');
const app = require('../../src/app');

describe('\'Customer\' service', () => {
  it('registered the service', () => {
    const service = app.service('customer');

    assert.ok(service, 'Registered the service');
  });
});
