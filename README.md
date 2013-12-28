Pine.js + MSSQL
========

> Project based on [Pine.js](https://github.com/anvk/Pine) a developer friendly and easy to use boilerplate for creating RESTful webservices using Node.JS + MSSQL Database.

### Prerequisites

Node + NPM

Based on the [MSSQL connector for NodeJS](https://github.com/patriksimek/node-mssql)

```
$ npm install
```

### Example of pine + mssql

```
$ node main
```

Navigate to [http://localhost:3000](http://localhost:3000) to see your running web service

### Options

Same as [Pine.js options](https://github.com/anvk/Pine#options)

**routes** - array of route objects. Please refer to the documentation below for further details.  
**port** - port where for the web service  
**verbose** - there will extra logging messages printed if true  
**processRequest** - callback which will be executed for every web service request. Please refer to the documentation below for further details.  

#### Route object

> Object which sets route rules(URLs) for the web service. Its properties are described below. NOTE: extra properties could be specified and accessed through _params.route_ in _proccessRequest()_ callback

**url** - url for a route  
**method** - GET/POST/PUT/PATCH/DELETE. NOTE: by default method will be set to GET for a route  
**storProcName** - name of the stored procedure which will be executed on the server. NOTE: all values resolved in _argMap_ will be passed as input parameters into the stored procedure.  
**argMap** - an object which contains mapping for arguments which were passed in URL, Body or Query URL.  

#### Route example

If you need to call _GET http://localhost:3000/customers/10_ to execute _stGetCustomers @customerid=10_ then your route object will be the following:

```javascript
{
  url: '/customers/:customerid',
  method: 'get',
  storProcName: 'stGetCustomers',
  argMap: {
    customerid: 'params.customerid'
  }
}
```

#### processRequest(params)

Same as [Pine.js processRequest()](https://github.com/anvk/Pine#processrequestparams)

> Callback for every route which got executed. Params consist of the following objects:

**args** - object which contains resolved variables from route's argMap  
**res** - Express response object. NOTE: you need to call _res.send(data)_ within your _processRequest()_ callback to send JSON back to a client.  
**req** - Express request object.  
**route** - Route object which got executed. NOTE: all extra properties will be in this object  

### Widget default options

Same as [Pine.js default options](https://github.com/anvk/Pine#widget-default-options)

```javascript
var defaults = {
  routes: [],
  port: 3000,
  verbose: false,
  processRequest: undefined
};
```

## License
The MIT License (MIT)

Copyright (c) 2013 Alexey Novak

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.