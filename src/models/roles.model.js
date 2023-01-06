// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const roles = sequelizeClient.define('Role', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true,
    },
    role_name:{
      type: DataTypes.STRING(25),
      allowNull:false,
    }
  }, 
  {
    createdAt: 'created_time',
    updatedAt: 'updated_time', 
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // roles.sync({alter:true})

  // eslint-disable-next-line no-unused-vars
  roles.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    roles.belongsToMany(models.Permission,{through:'Role_permissions',foreignKey:'role_id', as:'Permissions'});
    roles.hasMany(models.User);
  };

  return roles;
};
