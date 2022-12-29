// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const teamProgress = sequelizeClient.define('Team_progress', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    percentage:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 0
    },
    team_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"Teams",
        key:'id'
      }
    },
    quarter_cycle_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"Quarter_cycles",
        key:'id'
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
  teamProgress.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    teamProgress.belongsTo(models.Team,{foreignKey:'team_id'})
    teamProgress.belongsTo(models.Quarter_cycle,{foreignKey:'quarter_cycle_id'})
  };

  return teamProgress;
};
