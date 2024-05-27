const User = require('../sequelize').User;

exports.getUsers =  (req, res, next)=> {
    User.findAll()
        .then(users => {
            res.send(users);
        });
};

exports.signupUser =  (req, res, next) =>{
    User.create(req.body)
        .then(newUser => {
            res.send("Inserted with ID: " + newUser.user_id);
        })
        .catch(error => {
            console.error('Error creating user:', error);
            res.status(500).send('Error creating user');
        });
};

exports.loginUser =  (req, res) =>{
    var { email, password } = req.body;
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user == null) {
            res.status(401).json({message: 'No user found with that e-mail'}); 
        }
        else if (user.password != password) {            
            res.status(401).json({message: 'Oops! Wrong password.'}); 
        } else {
            // const token = generateAccessToken(email, password);      
            res.status(200).json({ user });     
        }
    });
}



