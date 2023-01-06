// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const teams = sequelizeClient.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    name:{
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_by:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_deleted:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    organization_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'Organizations',
        key:'id'
      }
    },
    parent_team_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'Teams',
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

  // eslint-disable-next-line no-unused-vars
  teams.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    teams.belongsTo(models.Organization,{foreignKey:'organization_id'});
    teams.hasOne(models.Team,{foreignKey:'parent_team_id',as:'parent'});
    teams.belongsToMany(models.User,{through:'Team_users',foreignKey:'user_id',as:'TeamUsers'});
    teams.hasMany(models.Team_progress,{as:'Team_progress'});
    teams.hasMany(models.Team_okr,{as:'Team_okrs'});
  };

  return teams;
};
