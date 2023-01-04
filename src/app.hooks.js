// Application hooks that run for every service
const {tokenValidations} = require('./validations');
const errorHandler = require('./error-handler');
const { iff ,when} = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [
      // function(context){
      //   iff((context.params.provider === "rest"),tokenValidations)
      
      // }
    ],
    find: [],
    get: [],
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
    all: [errorHandler],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
