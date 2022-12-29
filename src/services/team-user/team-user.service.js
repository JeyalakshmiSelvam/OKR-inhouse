// Initializes the `Team_user` service on path `/team-user`
const { TeamUser } = require('./team-user.class');
const createModel = require('../../models/team-user.model');
const hooks = require('./team-user.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/team-user', new TeamUser(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('team-user');

  service.hooks(hooks);
};
