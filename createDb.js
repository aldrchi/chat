var async = require('async');
var mongoose = require('./lib/db');

//mongoose.set('debug', true);

//var User = require('./models/user').User;
// or
// require('./models/user')
// and after call as:
// user = new mongoose.models.User({...})


//var user = new User({
//    username: "Tester2",
//    password: "admin"
//});
//
//user.save(function(err, user, affected) {
//    if (err) throw err;
//    console.log(arguments);
//
//    User.findOne({username: "Tester"}, function(err, tester) {
//        console.log(tester);
//    })
//});

// 1. drop database
// 2. create & save 3 users
// 3. close connection


console.log(mongoose.connection.readyState);

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function(err, result) {
    mongoose.disconnect();
    if (err) throw err;
//    process.exit(err ? 255 : 0);
});


function open(callback) {
//    mongoose.connection.on('open', callback);
    mongoose.connection.on('open', function(err, result) {
        console.log(mongoose.connection.readyState);
        callback(err, result);
    });
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/user');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {

    require('./models/user');

    var users = [
        {username: 'Alex', password: 'chi'},
        {username: 'Max', password: '123'},
        {username: 'admin', password: 'admin'}
    ];

    async.each(users, function(userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);

//    async.parallel([
//        function(callback) {
//            var alex = new User({username: 'Alex', password: 'chi'});
//            alex.save(function(err){
//                callback(err, alex);
//            });
//        },
//        function(callback) {
//            var max = new User({username: 'Max', password: '123'});
//            max.save(function(err){
//                callback(err, max);
//            });
//        },
//        function(callback) {
//            var admin = new User({username: 'admin', password: 'admin'});
//            admin.save(function(err){
//                callback(err, admin);
//            });
//        }
//    ], callback);
}

//    var alex = new User({username: 'Alex', password: 'chi'});
//    var max = new User({username: 'Max', password: '123'});
//    var admin = new User({username: 'admin', password: 'admin'});

//    alex.save();
//    max.save();
//    admin.save();
//
//    !!! Instead this calls use "Async"
