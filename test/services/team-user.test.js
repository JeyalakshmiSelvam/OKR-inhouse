const assert = require('assert');
const app = require('../../src/app');

describe('\'Team_user\' service', () => {
  it('registered the service', () => {
    const service = app.service('team-user');

    assert.ok(service, 'Registered the service');
  });
});
