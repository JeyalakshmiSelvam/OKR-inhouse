const assert = require('assert');
const app = require('../../src/app');

describe('\'User_kr\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-kr');

    assert.ok(service, 'Registered the service');
  });
});
