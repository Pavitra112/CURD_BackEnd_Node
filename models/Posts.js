

const { Sequelize, DataTypes } = require('sequelize');
const { User } = require('./Users');

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, '', {
    host: process.env.HOST,
    dialect: 'mysql',
});
const Post = sequelize.define('Post', {

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    file: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});



User.hasMany(Post);
Post.belongsTo(User);

module.exports = { Post };
