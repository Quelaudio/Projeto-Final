const { text } = require("express");

module.exports = (sequelize, type) => {
    return sequelize.define('Likes',{
        tweet_id: {
            type: type.INTEGER,
            primaryKey: true,
    
        },
        user_id: {
            type: type.INTEGER,
            primaryKey: true,
           
        },
        liked_date: {
            type: type.DATE,
            allowNull: false
        },


    });
}