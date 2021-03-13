const express = require('express'); // requiere express
const app = express();  // use express
const router = express.Router();    // use router
const pool = require('./core/db');    // connection to database...
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const memeroute = require('./routes.js');   // Importing router.js file 
app.use('/memes',memeroute);    // use '/memes' route

// App listens on PORT 8081
app.listen(8081,function(){
    console.log("server started on port 8081...");
});