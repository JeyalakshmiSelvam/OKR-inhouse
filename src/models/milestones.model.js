// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const milestones = sequelizeClient.define('Milestone', {
    
  // description varchar
  // start_date date
  // end_date date
  // percentage_completed int
  // weightage int
  // is_deleted boolean
  // kr_id int [ref: > kr.id]
  // created_by int
  // updated_by int
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    start_date:{
      type:DataTypes.DATEONLY,
      allowNull:false
    },
    end_date: {
      type:DataTypes.DATEONLY,
      allowNull:false
    },
    percentage_completed:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    weightage:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_by:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updated_by:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kr_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'Krs',
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
  milestones.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    milestones.belongsTo(models.Kr,{foreignKey:'kr_id'})
  };

  return milestones;
};
