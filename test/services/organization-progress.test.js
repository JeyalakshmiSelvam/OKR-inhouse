const assert = require('assert');
const app = require('../../src/app');

describe('\'Organization_progress\' service', () => {
  it('registered the service', () => {
    const service = app.service('organization-progress');

    assert.ok(service, 'Registered the service');
  });
});
