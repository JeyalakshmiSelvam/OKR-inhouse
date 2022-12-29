// Initializes the `Organization_OKR` service on path `/organization-okr`
const { OrganizationOkr } = require('./organization-okr.class');
const createModel = require('../../models/organization-okr.model');
const hooks = require('./organization-okr.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/organization-okr', new OrganizationOkr(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('organization-okr');

  service.hooks(hooks);
};
