const  User  = require('../sequelize').User;
var jwt = require('jsonwebtoken')


// exports.login =(req,res,next)=>{
//    res.send("ola")
// }

// function generateAcessToken(email,passoword){
//     var token = jwt.sign({email,passoword}, process.env.TOKEN_SECRET,
//         { expiresIn: '1800s'});
//     return token;
// }