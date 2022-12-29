const assert = require('assert');
const app = require('../../src/app');

describe('\'Milestones\' service', () => {
  it('registered the service', () => {
    const service = app.service('milestones');

    assert.ok(service, 'Registered the service');
  });
});
