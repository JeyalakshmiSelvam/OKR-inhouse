const assert = require('assert');
const app = require('../../src/app');

describe('\'Permissions\' service', () => {
  it('registered the service', () => {
    const service = app.service('permissions');

    assert.ok(service, 'Registered the service');
  });
});
