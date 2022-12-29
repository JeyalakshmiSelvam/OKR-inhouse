// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const teamOkr = sequelizeClient.define('Team_okr', {

  //   id int [pk]
  // description varchar
  // average_kr int
  // confident_level enum
  // is_deleted boolean
  // created_by int
  // organization_okr_id int [ref: > organization_okr.id]
  // team_id int [ref: > team.id]
  // quarterId int [ref: > quater_cycle.id]
  // created_time timestamp
  // updated_time timestamp
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey:true,
    autoIncrement: true
  },
  description:{
    type: DataTypes.TEXT,
    allowNull:false
  },
  kr_average:{
    type: DataTypes.INTEGER,
  },
  confident_level:{
    type:DataTypes.ENUM,
    values: ['Less Likely', 'Not Sure','More Likely']
  },
  created_by:{
    type: DataTypes.INTEGER,
    allowNull:false
  },
  is_deleted:{
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
  organization_okr_id:{
    type: DataTypes.INTEGER,
    allowNull:false,
    references:{
      model:"Organization_okrs",
      key:'id'
    }
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
  teamOkr.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    teamOkr.belongsTo(models.Organization_okr,{foreignKey:'organization_okr_id'})
    teamOkr.belongsTo(models.Team,{foreignKey:'team_id'})
    teamOkr.belongsTo(models.Quarter_cycle,{foreignKey:"quarter_cycle_id"})
    teamOkr.hasMany(models.Kr,{as:'Krs'})
  };

  return teamOkr;
};
