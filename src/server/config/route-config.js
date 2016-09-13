(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const signup = require('../routes/signup');
    const signin = require('../routes/signin');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/signup', signup);
    app.use('/signin', signin);

  };

})(module.exports);
