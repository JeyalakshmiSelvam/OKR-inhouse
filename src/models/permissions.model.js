// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const permissions = sequelizeClient.define('Permission', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true,
    },
    module_name:{
      type: DataTypes.STRING(50),
      allowNull:false,
    },
    action: {
      type: DataTypes.STRING(50),
      allowNull:false,
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

  // sequelizeClient.models.Permission.sync({alter: true})

  // eslint-disable-next-line no-unused-vars
  permissions.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    permissions.belongsToMany(models.Role,{through:'Role_permissions',foreignKey:'permission_id', as:'Roles'})

  };

  return permissions;
};
