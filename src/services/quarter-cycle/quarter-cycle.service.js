// Initializes the `Quarter_cycle` service on path `/quarter-cycle`
const { QuarterCycle } = require('./quarter-cycle.class');
const createModel = require('../../models/quarter-cycle.model');
const hooks = require('./quarter-cycle.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/quarter-cycle', new QuarterCycle(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('quarter-cycle');

  service.hooks(hooks);
};
