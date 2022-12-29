const assert = require('assert');
const app = require('../../src/app');

describe('\'TeamProgress\' service', () => {
  it('registered the service', () => {
    const service = app.service('team-progress');

    assert.ok(service, 'Registered the service');
  });
});
