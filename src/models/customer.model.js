// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const customer = sequelizeClient.define('customer', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
    },
    name:{
      type: DataTypes.STRING,
      allowNull:false,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  customer.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    customer.belongsToMany(models.products,{through:'customer_products',foreignKey:'customer_id',as:'productsList'})
  };

  return customer;
};
