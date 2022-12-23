// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const customerProducts = sequelizeClient.define('customer_products', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey:true
    },
    customer_id:{
      type: DataTypes.UUID,
      references:{
        model:'customer',
        key:'id'
      }
    },
    product_id:{
      type: DataTypes.UUID,
      references:{
        model:'products',
        key:'id'
      }
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  customerProducts.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    customerProducts.belongsTo(models.customer,{foreignKey:'customer_id'})
    customerProducts.belongsTo(models.products,{foreignKey:'product_id'})
  };

  return customerProducts;
};
