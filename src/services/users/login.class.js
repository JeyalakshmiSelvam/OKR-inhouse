const { Service } = require('feathers-sequelize');

exports.Login = class Login extends Service {
    constructor(options,app){
        super(options,app)
        this.app = app
    }
  async create(data,params){
    try{
        let result = null;
        let roles_permission_info = await this.app.service('roles').find(params)
        if(roles_permission_info.total >0){
            result = roles_permission_info.data[0]
        }
        return result
    }
    
    catch(err){
        console.log(err)
    }

    
    // return []
  }
};