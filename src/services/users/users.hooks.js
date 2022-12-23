const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'),
    function(context){      
      const sequelize = context.app.get('sequelizeClient')
      context.params.sequelize = {
        include: [{ model: sequelize.models.games }],
        raw:false
     };
    }
  ],
    get: [ authenticate('jwt'),
    function(context){
      // console.log("context",context)
      
      const sequelize = context.app.get('sequelizeClient')
      console.log(sequelize.models,"sequelize.models");
      context.params.sequelize = {
        
        include: [{ model: sequelize.models.games}],
       
     };

    //  console.log("context.params",context.params)
    }
  

  ],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
