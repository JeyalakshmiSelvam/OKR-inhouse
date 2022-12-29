// Initializes the `Organization` service on path `/organization`
const { Organization } = require('./organization.class');
const createModel = require('../../models/organization.model');
const hooks = require('./organization.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/organization', new Organization(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('organization');

  service.hooks(hooks);
};
