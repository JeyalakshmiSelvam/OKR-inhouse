// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const organizationOkr = sequelizeClient.define('Organization_okr', {
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
    created_by:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    organization_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"Organizations",
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
    updatedAt: "updated_time",
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  organizationOkr.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    organizationOkr.belongsTo(models.Organization,{foreignKey:"organization_id"})
    organizationOkr.belongsTo(models.Quarter_cycle,{foreignKey:"quarter_cycle_id"})
    organizationOkr.hasMany(models.Team_okr,{as:"Team_okrs"})
  };

  return organizationOkr;
};
