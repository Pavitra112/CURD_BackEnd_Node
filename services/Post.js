const db = require('../config/db');

const Post = {
    createPost: async function (title, content, file) {
        try {
            const query = 'INSERT INTO posts (title, content, file) VALUES (?, ?, ?)';
            const result = await new Promise((resolve, reject) => {
                db.query(query, [title, content, file], function (errors, results, fields) {
                    if (errors) reject(errors);
                    resolve(results.insertId);
                });
            });
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Error creating post');
        }
    },

    getAllPosts: async function () {
        try {
            const query = 'SELECT * FROM posts';
            const results = await new Promise((resolve, reject) => {
                db.query(query, function (errors, results, fields) {
                    if (errors) reject(errors);
                    resolve(results);
                });
            });
            return results;
        } catch (error) {
            console.error(error);
            throw new Error('Error getting posts');
        }
    },

    getPostById: async function (id) {
        try {
            const query = 'SELECT * FROM posts WHERE id = ?';
            const result = await new Promise((resolve, reject) => {
                db.query(query, [id], function (errors, results, fields) {
                    if (errors) reject(errors);
                    resolve(results[0]);
                });
            });
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Error getting post by ID');
        }
    },

    updatePost: async function (id, title, content, file) {
        try {
            const query = 'UPDATE posts SET title = ?, content = ?, file = ? WHERE id = ?';
            const result = await new Promise((resolve, reject) => {
                db.query(query, [title, content, file, id], function (errors, results, fields) {
                    if (errors) reject(errors);
                    else
                    resolve(true); 
                });
            });
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Error updating post');
        }
    },

    deletePost: async function (id) {
        try {
            const query = 'DELETE FROM posts WHERE id = ?';
            const result = await new Promise((resolve, reject) => {
                db.query(query, [id], function (errors, results, fields) {
                    if (errors) reject(errors);
                    resolve(true); 
                });
            });
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Error deleting post');
        }
    }
};

module.exports = Post;
