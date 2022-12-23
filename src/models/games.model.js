// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
// const users = require('./users.model')

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const games = sequelizeClient.define('games', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place:{
      type:DataTypes.STRING,
      allowNull:false
    },
    userId:{
      type: DataTypes.UUID,
      references:{
        model:'user',
        key:"id"
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // games.sync({alter:true})


  // eslint-disable-next-line no-unused-vars
  games.associate = function (models) {
    // console.log(models)
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    games.belongsTo(models.user)
  };

  return games;
};
