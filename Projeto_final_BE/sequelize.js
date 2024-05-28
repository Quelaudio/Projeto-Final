// sequelize.js
const { Sequelize, DataTypes } = require('sequelize');


//  importar modelos
const UserDataModel = require('./models/user');
const TweetDataModel = require('./models/tweet');
const CommentDataModel = require('./models/comments');
const LikeDataModel = require('./models/likes');
const FollowDataModel = require('./models/follower');

// inicializar Sequelize
const sequelize_instance = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql'
});
// Autenticação Sequelize
sequelize_instance.authenticate()
    .then(() => {
        console.log("Connection has been established");
    })
    .catch(err => {
        console.log("Unable to connect", err);
    });


sequelize_instance.sync({ force: false })
    .then(() => {
        console.log('Database and tables created');
    });

// Define modelos
const User = UserDataModel(sequelize_instance, DataTypes);
const Tweet = TweetDataModel(sequelize_instance, DataTypes);
const Comment = CommentDataModel(sequelize_instance, DataTypes);
const Like = LikeDataModel(sequelize_instance, DataTypes);
const Follow = FollowDataModel(sequelize_instance, DataTypes);

// Define associações
Tweet.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Tweet, { foreignKey: 'user_id', onDelete: 'CASCADE' });

User.hasMany(Like, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Like.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

Tweet.hasMany(Like, { foreignKey: 'tweet_id', onDelete: 'CASCADE' });
Like.belongsTo(Tweet, { foreignKey: 'tweet_id', onDelete: 'CASCADE' });

User.hasMany(Follow, { foreignKey: 'follower_id', onDelete: 'CASCADE'});
Follow.belongsTo(User, { foreignKey: 'follower_id', onDelete: 'CASCADE' });

User.hasMany(Follow, { foreignKey: 'followed_id', onDelete: 'CASCADE' });
Follow.belongsTo(User, { foreignKey: 'followed_id', onDelete: 'CASCADE' });

module.exports = {
    User,
    Tweet,
    Comment,
    Like,
    Follow
};
