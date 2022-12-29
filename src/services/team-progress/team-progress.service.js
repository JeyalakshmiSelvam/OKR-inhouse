// Initializes the `TeamProgress` service on path `/team-progress`
const { TeamProgress } = require('./team-progress.class');
const createModel = require('../../models/team-progress.model');
const hooks = require('./team-progress.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/team-progress', new TeamProgress(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('team-progress');

  service.hooks(hooks);
};
