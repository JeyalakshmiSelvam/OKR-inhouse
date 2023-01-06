// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const organizationProgress = sequelizeClient.define('Organization_progress', {
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
    organization_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Organizations',
        key:'id'
      }
    },
    quarter_cycle_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Quarter_cycles',
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
  organizationProgress.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    organizationProgress.belongsTo(models.Organization,{foreignKey:'organization_id'});
    organizationProgress.belongsTo(models.Quarter_cycle,{foreignKey:'quarter_cycle_id'});
  };

  return organizationProgress;
};
