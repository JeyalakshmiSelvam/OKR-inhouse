// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const rolePermissions = sequelizeClient.define('Role_permission', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    role_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Roles',
        key:'id'
      }
    },
    permission_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Permissions',
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
  // rolePermissions.sync({})


  // eslint-disable-next-line no-unused-vars
  rolePermissions.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    rolePermissions.belongsTo(models.Role,{foreignKey:'role_id'})
    rolePermissions.belongsTo(models.Permission,{foreignKey:'permission_id'})
  };

  return rolePermissions;
};
