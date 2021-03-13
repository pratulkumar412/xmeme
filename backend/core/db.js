var mysql = require('mysql');

var pool = mysql.createConnection({
    host: "localhost",  // assign your host name
    user: "root",   // assign your database username
    password: "password", // assign your database password
});

// connection to database...
pool.connect(function (err) {
    if (err) throw err;         // if error occurs
    pool.query("CREATE DATABASE IF NOT EXISTS memes", function (err, result) {
        if (err) throw err;
    });
    pool.query("USE memes", function (err, result) {
        if (err) throw err;
    });
    const sqlQuery = "CREATE TABLE IF NOT EXISTS meme_record(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30), url VARCHAR(1002), caption VARCHAR(128),time timestamp default NOW());";
    pool.query(sqlQuery, function (err, result) {
        if (err) throw err;
    });
    console.log('Database is connected successfully !');
});

module.exports = pool;  //Export pool