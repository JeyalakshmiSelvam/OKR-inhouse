// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('User', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:false,
      autoIncrement: true
    },
    first_name:{
      type:DataTypes.STRING(50),
      allowNull:false,
    },
    last_name:{
      type:DataTypes.STRING(50),
      allowNull:false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    is_deleted:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    is_invited:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    invited_by:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    role_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"Roles",
        key:'id'
      }
    },
    organization_id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"Organizations",
        key:'id'
      }
    }
  }, {
    createdAt:'created_time',
    updatedAt:'updated_time',
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // sequelizeClient.models['User'].sync({alter:true})

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    users.belongsTo(models.Role,{foreignKey:'role_id',as:"Roles"})
    users.belongsTo(models.Organization,{foreignKey:'organization_id',as:"Org_members"})
    users.belongsToMany(models.Team,{through:"Team_users",foreignKey:'team_id',as:"UserTeams"})
    users.belongsToMany(models.Kr,{through:"User_krs",foreignKey:'kr_id',as:"KR_Users"})
    users.hasMany(models.Comment,{as:'Comments', foreignKey:"commentor"})
  };

  return users;
};
