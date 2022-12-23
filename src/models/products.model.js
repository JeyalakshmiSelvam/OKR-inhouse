// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const products = sequelizeClient.define('products', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull:false
    },
    type:{
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  products.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    products.belongsToMany(models.customer,{through:'customer_products',foreignKey:'product_id',as:'customersList'})

  };

  return products;
};
