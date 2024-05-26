const User = require('../sequelize').User;

exports.getUsers = function (req, res, next) {
    User.findAll()
        .then(users => {
            res.send(users);
        });
};

exports.signupUser = function (req, res, next) {
    User.create(req.body)
        .then(newUser => {
            res.send("Inserted with ID: " + newUser.user_id);
        })
        .catch(error => {
            console.error('Error creating user:', error);
            res.status(500).send('Error creating user');
        });
};



