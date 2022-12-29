// Initializes the `Organization_progress` service on path `/organization-progress`
const { OrganizationProgress } = require('./organization-progress.class');
const createModel = require('../../models/organization-progress.model');
const hooks = require('./organization-progress.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/organization-progress', new OrganizationProgress(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('organization-progress');

  service.hooks(hooks);
};
