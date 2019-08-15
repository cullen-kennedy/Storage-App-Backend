const CONFIG = require('../config/config')
var mysql = require('mysql2/promise');

if (process.env.NODE_ENV === 'test') {
    var databaseName = CONFIG.db_name_test
}
else {
    //throw error("dev database not made")
    var databaseName = CONFIG.db_name_dev
}

var pool = mysql.createPool({
    connectionLimit: 10,
    host: CONFIG.db_host,
    user: CONFIG.db_user,
    password: CONFIG.db_password,
    database: databaseName
});

export default pool

/*
var db = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();
                if (!err) {
                    callback(rows);
                }
                else {
                    callback(null, err);
                }

            });

            connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();
*/

