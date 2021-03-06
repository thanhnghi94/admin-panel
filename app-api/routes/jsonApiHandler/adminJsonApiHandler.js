var path = require('path');
var fs = require('fs');
var jsonfile = require('jsonfile');
var jwt = require('jsonwebtoken');

var helpers = require('../../lib/helpers');
var secretKey = require('../../lib/config').secretKey;

var login = function (req, res) {
    var post = {
        username: req.body.username,
        password: req.body.password
    };

    if(post.username == 'admin' && post.password == 'admin') {
        var token = jwt.sign({
            username: 'admin'
        }, secretKey, {
            expiresIn: 2 * 24 * 60 * 60
        });
        helpers.sendJsonResponse(res, 200, token);
    } else {
        helpers.sendJsonResponse(res, 400, null);
    }

    // Admin.findOne({
    //     username: post.username
    // }, function(err, admin) {
    //     if (err) {
    //         return helpers.sendJsonResponse(res, 500, err);
    //     }
    //     if (!admin) {
    //         return helpers.sendJsonResponse(res, 404, {
    //             message: 'Username not found'
    //         });
    //     }
    //
    //     admin.checkPassword(post.password, function(err, match) {
    //         if (err) {
    //             helpers.sendJsonResponse(res, 500, err);
    //         } else if (!match) {
    //             helpers.sendJsonResponse(res, 500, {
    //                 message: 'Invalid password'
    //             });
    //         } else {
    //             var token = jwt.sign({
    //                 _id: admin._id,
    //                 username: admin.username
    //             }, secretKey, {
    //                 expiresIn: 2 * 24 * 60 * 60
    //             });
    //             helpers.sendJsonResponse(res, 200, token);
    //         }
    //     });
    // });
};


module.exports = {
    login: login
}
