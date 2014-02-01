var http = require('http');
var path = require('path');

var express = require('express');

var routes = require('./routes');
var user = require('./routes/user');
var config = require('./config');
var log = require('./lib/log')(module);

var app = express();

app.engine('ejs', require('ejs-locals')); // layout partial block
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

//app.use(express.favicon()); //favicon.ico
app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));

if (app.get('env') == 'development') {
    app.use(express.logger('dev'));  // logger 'dev' - format
} else {
    app.use(express.logger('default'));
}

//app.use(express.bodyParser()); //req.body... -> removed from connect 3.0

// is equivalent to:

//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.multipart());

app.use(express.urlencoded());
app.use(express.json());

//app.use(express.methodOverride());// ???


app.use(express.cookieParser('your secret here')); //req.cookies
// 'your secret here' - ключ для подписания кук

//app.use(express.session());// ???

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'))); // статика

app.use(function(err, req, res, next) {
    // NODE_ENV
    if (app.get('env') == 'development') {
        var errorHandler = express.errorHandler();
        errorHandler(err, req, res, next);
    }
    else {
        res.send(500);
    }
});

// or

//if ('development' == app.get('env')) {
//    app.use(express.errorHandler());
//}

// routes:

app.get('/', routes.index);
app.get('/users', user.list);


http.createServer(app).listen(config.get('port'), function(){
//    console.log('Express server listening on port ' + app.get('port'));
    log.info('Express server listening on port ' + config.get('port'));
});