const User = require('../sequelize').User;

exports.getUsers = function (request, response, next) {
    User.findAll()
        .then(users => {
            response.send(users);
        });
};

exports.signupUser = function (req, res, next) {
    User.create(req.body)
        .then(newUser => {
                res.send("Inserted with ID: ");
        });
};


