const { Service } = require('feathers-sequelize');

exports.Games = class Games extends Service {
  constructor(options,app){
    super(options)
    this.app = app
    
  }
  async create(data,params){
    data['userId']=params.user ?.id
    return super.create(data)
  }
};
