const { Service } = require('feathers-sequelize');

exports.Teams = class Teams extends Service {
  constructor(options,app){
    super(options,app);
    this.app =app;
  }
  async create(data,_params){
    try{
      console.log('_params',_params);
      let usersList = data.users;
      let teamResponse = await this._create(data);
      console.log(teamResponse,'teaResponse');
      if(teamResponse){
        usersList.map((user)=>{
          let name = user['name'].split(' ');
          user['first_name'] = name[0];
          user['last_name'] = name[1] == null ? '':'';
          // user['team_id'] = teamResponse.id;
          user['organization_id'] = teamResponse.organization_id;
          user['invited_by']  = _params.user.id;
        });

        console.log('usersList',usersList);
        let userResponse = await this.app.service('users').create(usersList);
        console.log('userResponse',userResponse);
        let teamUsers = [];
        await userResponse.map(user=>{
          let userobj = {
            'team_id':teamResponse.id,
            'user_id':user.id
          };
          teamUsers.push(userobj);
          return user;
        });
        console.log('teamUsers',teamUsers);
        let teamuser = await this.app.service('team-user').create(teamUsers);
        console.log(teamuser,'tea');
      }

      return teamResponse;
      

    }catch(error){
      console.log(error);
    }
  }
  
};
