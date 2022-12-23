// Initializes the `customer_products` service on path `/customer-products`
const { CustomerProducts } = require('./customer_products.class');
const createModel = require('../../models/customer_products.model');
const hooks = require('./customer_products.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/customer-products', new CustomerProducts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('customer-products');

  service.hooks(hooks);
};
