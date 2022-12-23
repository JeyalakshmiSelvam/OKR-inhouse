

module.exports = {
  before: {
    all: [],
    find: [],
    get: [
      function(context){
        const sequelize = context.app.get('sequelizeClient')
        context.params.sequelize = {
          raw: false,
          include: [{ model: sequelize.models.customer, as:'customersList', through:{attributes:[]}}],
          
        };
      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
