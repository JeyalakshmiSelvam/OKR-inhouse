// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const userKr = sequelizeClient.define('User_kr', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'Users',
        key:'id'
      }
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
  userKr.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    userKr.belongsTo(models.User,{foreignKey:'user_id'});
    userKr.belongsTo(models.Kr,{foreignKey:'kr_id'});
  };

  return userKr;
};
