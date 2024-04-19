const Pool = require('pg').Pool;

const env = process.env;

const pool = new Pool({
    user: env.user || 'postgres',
    host: env.host || 'postgres',
    database: env.database || 'obsrv',
    password: env.password || 'admin',
    port: env.port || 5432,
});

module.exports = pool;
console.log("db connected");