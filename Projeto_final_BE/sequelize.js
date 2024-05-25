var dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2')
const { Sequelize,DataTypes } = require('sequelize');
//------------------------------------
const UserDataModel = require('./models/user');
const tweetDataModel = require('./models/tweet');
const CommentDataModel = require('./models/comments');
const LikeDataModel = require('./models/likes');
const FolowDataModel = require('./models/follower');
//------------------------------------------
const { FOREIGNKEYS } = require('sequelize/lib/query-types');




const sequelize_instance = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASS,{
    dialect: 'mysql'


});

sequelize_instance.authenticate()
.then(()=> {
    console.log("connection has been established");
})
.catch(err => {
    console.log("unable to connect", err);
});


sequelize_instance.sync({ force: false})
    .then(() => {
        console.log('Database e tables created');
    });

  

const User = UserDataModel(sequelize_instance, DataTypes);
const tweets = tweetDataModel(sequelize_instance, DataTypes);
const comments = CommentDataModel(sequelize_instance, DataTypes);
const likes = LikeDataModel(sequelize_instance,DataTypes)
const foll = FolowDataModel(sequelize_instance,DataTypes)


tweets.belongsTo(User, {foreignkey: 'user_id',  onDelete: 'CASCADE' });
User.hasMany(tweets, {foreignkey: 'user_id',  onDelete: 'CASCADE' });



User.hasMany(likes, { foreignKey: 'user_id', onDelete: 'CASCADE' });
likes.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

tweets.hasMany(likes, { foreignKey: 'tweet_id', onDelete: 'CASCADE' });
likes.belongsTo(tweets, { foreignKey: 'tweet_id', onDelete: 'CASCADE' });


User.hasMany(foll, {foreignKey: 'follower_id',onDelete: 'CASCADE'});

foll.belongsTo(User, {foreignKey:'follower_id', onDelete: 'CASCADE'});


User.hasMany(foll, {foreignKey: 'followed_id',onDelete: 'CASCADE'});

foll.belongsTo(User, {foreignKey:'followed_id', onDelete: 'CASCADE'});


module.exports = {
    User, tweets,comments,likes, foll
}


