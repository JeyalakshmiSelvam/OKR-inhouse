const assert = require('assert');
const app = require('../../src/app');

describe('\'Quarter_cycle\' service', () => {
  it('registered the service', () => {
    const service = app.service('quarter-cycle');

    assert.ok(service, 'Registered the service');
  });
});
