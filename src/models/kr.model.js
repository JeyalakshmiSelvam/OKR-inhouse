// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const kr = sequelizeClient.define('Kr', { 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    current:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    target:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    percentage:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    milestone_percentage:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    confident_level:{
      type: DataTypes.ENUM,
      values:['Less Likely', 'Not Sure','More Likely']
    },
    type:{
      type: DataTypes.ENUM,
      values:['Focus','Aspirational','Commit']
    },
    computed_type:{
      type: DataTypes.ENUM,
      values:['Metric','Milestones','User Input','Aggregation','Integration' ]
    },
    is_deleted:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    },
    created_by:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updated_by:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    team_okr_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'Team_okrs',
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
  kr.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    kr.belongsTo(models.Team_okr,{foreignKey:'team_okr_id'})
    kr.belongsToMany(models.User,{through:"User_krs",foreignKey:'user_id',as:"UserKrs"})
    kr.hasMany(models.Milestone,{as:'Milestones'})
  };

  return kr;
};
