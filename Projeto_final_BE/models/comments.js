const { text } = require("express");

module.exports = (sequelize, type) => {
    return sequelize.define('comments',{
        comments_id: {
        type: type.INTEGER,
        autoIncrement: true,
        primaryKey:true

    },
    text: type.TEXT,
    Date_comment: type.TEXT,

    });
}