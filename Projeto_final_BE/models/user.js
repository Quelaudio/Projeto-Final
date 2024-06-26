module.exports = (sequelize, type) => {
    return sequelize.define('Users', {
        user_id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        password: type.TEXT,
        email: type.TEXT,
        username: type.STRING(50),
        user_type: type.BOOLEAN
    });
}