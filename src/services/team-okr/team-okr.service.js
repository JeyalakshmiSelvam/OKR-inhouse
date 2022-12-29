// Initializes the `Team_OKR` service on path `/team-okr`
const { TeamOkr } = require('./team-okr.class');
const createModel = require('../../models/team-okr.model');
const hooks = require('./team-okr.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/team-okr', new TeamOkr(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('team-okr');

  service.hooks(hooks);
};
