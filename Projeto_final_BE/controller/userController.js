const User = require('../sequelize').User;
var jwt = require('jsonwebtoken');


// Generate Access Token
function generateAccessToken(email, password) {
    var token = jwt.sign({ email, password }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    return token;
}



//contolador para obter users
exports.getUsers = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.send(users);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            res.status(500).send('Error fetching users');
        });
};

// controlador para fazer registro
exports.signupUser = (req, res, next) => {
    var { email, password } = req.body;
    User.findOne({
        where: {
            email: email
        }
    }).then(existingUser => {
        if (existingUser) {
            res.status(400).json({ message: 'Email already in use' });
        } else {
           
            User.create(req.body)
                .then(newUser => {
                    const token = generateAccessToken(email, password);
                    res.status(200).json({ user: newUser, token: token });
                })
                .catch(error => {
                    console.error('Error creating user:', error);
                    res.status(500).send('Error creating user');
                });
        }
    }).catch(error => {
        console.error('Error finding user:', error);
        res.status(500).send('Error checking user existence');
    });
};


//controlador para fazer login
exports.loginUser = (req, res) => {
    var { email, password } = req.body;
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user == null) {
            res.status(401).json({ message: 'No user found with that e-mail' });
        } else if (user.password !== password) {
            res.status(401).json({ message: 'Oops! Wrong password.' });
        } else {
            const token = generateAccessToken(email, password);
            res.status(200).json({ user, token: token });
        }
    }).catch(error => {
        console.error('Error finding user:', error);
        res.status(500).send('Error logging in user');
    });
};


exports.deleteUser = (req, res) => {
    const { user_id } = req.params;
    console.log(`Attempting to delete user with id: ${user_id}`);
    User.findByPk(user_id)
        .then(user => {
            if (user == null) {
                console.log(`No user found with id: ${user_id}`);
                return res.status(404).json({ message: 'No user found with that ID' });
            } else {
                return user.destroy().then(() => {
                    console.log(`User with id: ${user_id} successfully deleted`);
                    res.status(200).json({ message: 'User successfully deleted' });
                });
            }
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            res.status(500).send('Error deleting user');
        });
    };

    exports.upUsers = (req, res, next) => {
        const { user_id, password, username, user_type } = req.body;
    
        User.update(
            {
                password: password,
                username: username,
                user_type:user_type
                
                
            },
            {
                where: {
                    user_id: user_id
                }
            }
        )
        .then(result => {
            if (result[0] === 0) {
                res.status(404).json({ message: "users not found or no changes made" });
            } else {
                res.status(200).json({ message: "users updated successfully" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
    };


// //controlador para logout
// exports.logout, (req, res) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) return res.sendStatus(401);

//     blacklistedTokens.push(token);
//     res.json({ message: 'Logged out successfully' });
// };

