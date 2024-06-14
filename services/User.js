
const db = require('../config/db');
const User = {
    createUser: async function (username, email, password) {
        try {
            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(query, [username, email, password], function (errors, results, fields) {
                return results.id;
            });

        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    findUserByEmail: async function (email) {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const results = await new Promise((resolve, reject) => {
                db.query(query, [email], function (errors, results, fields) {
                    if (errors) {
                        reject(errors);
                    } else {
                        resolve(results);
                    }
                });
            });

            return results[0];
        } catch (error) {
            console.error(error);
            throw new Error('Error finding user by email');
        }
    }
    ,
    findUserById: async function (id) {
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const results = await new Promise((resolve, reject) => {

                db.query(query, [id], function (errors, results, fields) {
                    if (errors) {
                        reject(errors);

                    }
                    else {
                        resolve(results);
                    }

                });
            })
            return result[0];
        } catch (error) {
            console.error(error);
            throw new Error('Error finding user by ID');
        }
    },


};

module.exports = User;
