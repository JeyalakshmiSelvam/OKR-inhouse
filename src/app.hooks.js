// Application hooks that run for every service
const {tokenValidations} = require('./validations');
const errorHandler = require('./error-handler');
const { iff } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [
      iff(context => {
        console.log('params',context.params.provider);
        return context.params.provider === 'rest' ;
      }, tokenValidations) 
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
