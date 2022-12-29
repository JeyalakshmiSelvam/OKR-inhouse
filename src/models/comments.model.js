// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const comments = sequelizeClient.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement:true
    },
    comment:{
      type: DataTypes.TEXT,
      allowNull:false,
    },
    commentor:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Users',
        key:'id'
      }
    },
    type:{ // whether it's for Kr,milestone, etc...
      type: DataTypes.STRING(25),
      allowNull:false
    },
    type_id:{ // it denotes the id of type
      type: DataTypes.INTEGER,
      allowNull:false
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
  comments.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    comments.belongsTo(models.User,{foreignKey:'commentor'})
  };

  return comments;
};
