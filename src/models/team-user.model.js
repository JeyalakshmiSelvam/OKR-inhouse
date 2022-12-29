// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const teamUser = sequelizeClient.define('Team_user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"Users",
        key:"id"
      }
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"Teams",
        key:"id"
      }
    }
  }, {
    createdAt:"created_time",
    updatedAt:"updated_time",
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  teamUser.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    teamUser.belongsTo(models.User,{foreignKey:'user_id'})
    teamUser.belongsTo(models.Team,{foreignKey:'team_id'})
  };

  return teamUser;
};
