const { Login } = require('./login.class');
const createModel = require('../../models/users.model');
const {userValidation,tokenValidations} = require('./../../validations');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/login', new Login(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('login');

  service.hooks({
    before:{
      all:[tokenValidations,userValidation,
      function(context){
        const sequelize = context.app.get('sequelizeClient');
        let role_id =context.params.user.role_id;
        context.params.sequelize = { 
          where:{id:role_id},
          raw:false,
          include: [{ model: sequelize.models.Permission, as:'Permissions', through:{attributes:[]}}]    
        }
      }
      ]}
  })
};