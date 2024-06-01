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
    User.create(req.body)
        .then(newUser => {
            const token = generateAccessToken(email, password);
            res.status(200).json({ newUser, token: token });
        })
        .catch(error => {
            console.error('Error creating user:', error);
            res.status(500).send('Error creating user');
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

// //controlador para logout
// exports.logout, (req, res) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) return res.sendStatus(401);

//     blacklistedTokens.push(token);
//     res.json({ message: 'Logged out successfully' });
// };

