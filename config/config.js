    
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.port         = process.env.PORT  || '3000';

CONFIG.db_dialect   = process.env.DB_DIALECT    || 'mysql';
CONFIG.db_host      = process.env.DB_HOST       || 'localhost';
CONFIG.db_port      = process.env.DB_PORT       || '3306';
CONFIG.db_name_dev  = process.env.DB_NAME_DEV   || 'name';
CONFIG.db_name_test = process.env.DB_NAME_TEST  || 'name';
CONFIG.db_user      = process.env.DB_USER       || 'root';
CONFIG.db_password  = process.env.DB_PASSWORD   || 'db-password';

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

module.exports = CONFIG;