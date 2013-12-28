/*global require*/

var pine = require('./pine'),
    sql = require('mssql'),
    _ = require('lodash-node'),
    config = require('../config/db.json'),
    verbose;

var processRequest = function(params) {
  var res = params.res,
      connection;

  connection = new sql.Connection(config, function(err) {
    if (err) {
      console.log(err);
      res.send(err.toString());
      return;
    }

    var request = connection.request();
    _.each(params.args, function(value, name) {
      request.input(name, value);
    });

    request.multiple = true;
    request.verbose = verbose;

    request.execute(params.route.storProcName, function(err, recordsets) {
      var data = (err) ? err.toString() : recordsets;

      if (err) {
        console.log(err);
      }

      res.send(data);
      connection.close();
    });
  });
};

var routes = [
  // GET http://localhost:3000/customers
  {
    url: '/customers',
    method: 'get',
    storProcName: 'stGetCustomers'
  },
  // GET http://localhost:3000/customers/10
  {
    url: '/customers/:customerid',
    method: 'get',
    storProcName: 'stGetCustomers',
    argMap: {
      customerid: 'params.customerid'
    }
  },
  // POST http://localhost:3000/customers    w body   { "customerid": 10, "enabled": true, "name": "My New Customer" }
  {
    url: '/customers',
    method: 'post',
    storProcName: 'stAddCustomer',
    argMap: {
      customerid: 'body.customerid',
      enabled: 'body.enabled',
      name: 'body.name'
    }
  },
  // PUT http://localhost:3000/customers/10    w body   { "enabled": true, "name": "My New Customer" }
  {
    url: '/customers/:customerid',
    method: 'put',
    storProcName: 'stUpdateCustomer',
    argMap: {
      customerid: 'params.customerid',
      enabled: 'body.enabled',
      name: 'body.name'
    }
  },
  // DELETE http://localhost:3000/customers/10
  {
    url: '/customers/:customerid',
    method: 'delete',
    storProcName: 'stDeleteCustomer',
    argMap: {
      customerid: 'params.customerid'
    }
  }
];

verbose = true;

pine({
  processRequest: processRequest,
  routes: routes,
  port: 3000,
  verbose: verbose
});