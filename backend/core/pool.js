const util = require('util');
const mysql = require('mysql');
/* 
*   Connection to the database
*/

const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',      // 'host' of your local mySQL
    user: 'root',           // 'user' of your local mySQL
    password: 'password',   // 'password' of your local mySQL
    database: 'memes'        // database name of your local mySQL
});

// connection to database...
pool.getConnection((err,connection)=>{
    if(err)
    {
        // Error connnecting to mySQL server
        console.log(err);
    }
    else    //  connection to database if working fine...
    {
        console.log("Connected to database.");
    }
    if(connection)
        connection.release();
    return;    
});

pool.query = util.promisify(pool.query);

module.exports = pool;