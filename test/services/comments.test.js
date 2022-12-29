const assert = require('assert');
const app = require('../../src/app');

describe('\'Comments\' service', () => {
  it('registered the service', () => {
    const service = app.service('comments');

    assert.ok(service, 'Registered the service');
  });
});
