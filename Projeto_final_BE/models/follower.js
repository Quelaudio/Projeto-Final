const { text } = require("express");

module.exports = (sequelize, type) => {
    return sequelize.define('Follower',{
        follower_id: {
            type: type.INTEGER,
            primaryKey: true
        },
        followed_id: {
            type: type.INTEGER,
            primaryKey: true
        },
        follow_date: {
            type: type.DATE,
            allowNull: false
        }


    });
}