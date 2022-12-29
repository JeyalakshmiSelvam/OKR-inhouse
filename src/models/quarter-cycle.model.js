// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const quarterCycle = sequelizeClient.define('Quarter_cycle', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    start_date:{
      type: DataTypes.DATEONLY,
      allowNull:false,
      unique:true
    },
    end_date:{
      type: DataTypes.DATEONLY,
      allowNull:false,
      unique:true
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
  quarterCycle.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    quarterCycle.hasMany(models.Organization_okr,{as:'Org_okrs'})
    quarterCycle.hasMany(models.Organization_progress,{as:'Org_progress'})
    quarterCycle.hasMany(models.Team_okr,{as:'Team_okrs'})
  };

  return quarterCycle;
};
