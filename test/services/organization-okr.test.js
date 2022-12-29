const assert = require('assert');
const app = require('../../src/app');

describe('\'Organization_OKR\' service', () => {
  it('registered the service', () => {
    const service = app.service('organization-okr');

    assert.ok(service, 'Registered the service');
  });
});
