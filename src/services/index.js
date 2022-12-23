const users = require('./users/users.service.js');
const games = require('./games/games.service.js');
const customer = require('./customer/customer.service.js');
const products = require('./products/products.service.js');
const customerProducts = require('./customer_products/customer_products.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(games);
  app.configure(customer);
  app.configure(products);
  app.configure(customerProducts);
};
