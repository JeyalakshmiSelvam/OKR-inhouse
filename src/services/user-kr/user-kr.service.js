// Initializes the `User_kr` service on path `/user-kr`
const { UserKr } = require('./user-kr.class');
const createModel = require('../../models/user-kr.model');
const hooks = require('./user-kr.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-kr', new UserKr(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-kr');

  service.hooks(hooks);
};
