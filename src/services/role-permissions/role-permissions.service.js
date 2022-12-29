// Initializes the `RolePermissions` service on path `/role-permissions`
const { RolePermissions } = require('./role-permissions.class');
const createModel = require('../../models/role-permissions.model');
const hooks = require('./role-permissions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/role-permissions', new RolePermissions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('role-permissions');

  service.hooks(hooks);
};
