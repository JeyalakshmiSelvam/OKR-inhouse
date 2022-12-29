// Initializes the `Milestones` service on path `/milestones`
const { Milestones } = require('./milestones.class');
const createModel = require('../../models/milestones.model');
const hooks = require('./milestones.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/milestones', new Milestones(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('milestones');

  service.hooks(hooks);
};
