const assert = require('assert');
const app = require('../../src/app');

describe('\'KR\' service', () => {
  it('registered the service', () => {
    const service = app.service('kr');

    assert.ok(service, 'Registered the service');
  });
});
