const assert = require('assert');
const app = require('../../src/app');

describe('\'Organization\' service', () => {
  it('registered the service', () => {
    const service = app.service('organization');

    assert.ok(service, 'Registered the service');
  });
});
