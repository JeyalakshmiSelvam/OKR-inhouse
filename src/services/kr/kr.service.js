// Initializes the `KR` service on path `/kr`
const { Kr } = require('./kr.class');
const createModel = require('../../models/kr.model');
const hooks = require('./kr.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/kr', new Kr(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('kr');

  service.hooks(hooks);
};
