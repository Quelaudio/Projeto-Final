const { text } = require("express");

module.exports = (sequelize, type) => {
    return sequelize.define('tweet',{
        tweet_id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey:true

    },
    text: type.TEXT,
    img_path: type.TEXT,
    date_pub : type.DATE,
    


    });
}