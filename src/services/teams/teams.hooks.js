// const { authenticate } = require('@feathersjs/authentication').hooks;
const {checkUserAuthorization} = require('./../../validations');
const { iff } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [
      iff(context => {
        console.log('params 1',context.params.provider);
        return context.params.provider === 'rest' ;
      }, checkUserAuthorization) 
      // iff(context => context.params.provider === 'rest' , checkUserAuthorization) 
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
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
