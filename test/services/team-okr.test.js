const assert = require('assert');
const app = require('../../src/app');

describe('\'Team_OKR\' service', () => {
  it('registered the service', () => {
    const service = app.service('team-okr');

    assert.ok(service, 'Registered the service');
  });
});
