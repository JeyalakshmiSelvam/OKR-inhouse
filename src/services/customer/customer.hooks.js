

module.exports = {
  before: {
    all: [],
    find: [],
    get: [
      function(context){
        const sequelize = context.app.get('sequelizeClient');
        context.params.sequelize = {
          raw: false,
          include: [{ model: sequelize.models.products, as:'productsList', through:{attributes:[]}}],
          
        };
      //  console.log("context.params",context.params)
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
