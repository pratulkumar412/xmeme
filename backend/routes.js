const express = require('express');// require express
const app = express();  // use express
const router = express.Router();    // use router
const pool = require('./core/db');    // connection to database...
const db = require('./core/getQuery'); // require getQuery also for writing cleaner code


app.use(express.json());
app.use(express.urlencoded({extended:true}));
const fetch = require('node-fetch');

const cors = require('cors');   // using cors to avoid CORS blockage while calling API from React-app
router.use(cors());

// Route to GET top 100 memes
router.get('/',async(req,res)=>{
    try{
    	console.log('GET request');
        var page = 1;   // Base case
        const limit = 100;

        if(req.query.page)
            page=req.query.page;

        const getRowCount = 'SELECT count(*) as count FROM meme_record';
        const counting = await db.getQuery(getRowCount);

        const memes = await getMemes(counting,page,limit);
        res.send(memes);
    }
    catch(err){
        console.log(err);
        res.sendStatus(404);
    }
})

// Route to POST meme
router.post('/',async(req,res)=>{
    try{
        console.log(req.body);
        const name=req.body.name;
        const url=req.body.url;
        const caption=req.body.caption;

        const insertQuery = "INSERT INTO meme_record(name,url,caption) VALUES ('" +name+ "' , '" +url+ "' , '" +caption+ "');";
        await db.getQuery(insertQuery);
        const getId = await db.getQuery('SELECT MAX(id) as id FROM meme_record');
       // console.log(getId);
        res.send(getId);
    }
    catch(err){
        console.log(err);
        res.sendStatus(404);
    }
})

// Route to GET meme with a particular <id>
router.get('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        console.log(id);
        const findbyid = "select id,name,url,caption from meme_record where id="+id;
        const results = await db.getQuery(findbyid);
        if(results.length==0)
            res.sendStatus(404);
        res.send(results[0]);
    }
    catch(err){
        console.log(err);
        res.sendStatus(404);
    }
})

// Route to UPDATE a particular meme 
router.patch('/:id',async(req,res)=>{
    try{
        if(req.body.name)
            res.send(403,"Name can't be modified!");
        if(req.body.url)
            await db.getQuery("update meme_record set url='"+req.body.url+"' where id=" +req.params.id);
        if(req.body.caption)
            await db.getQuery("update meme_record set caption='"+req.body.caption+"' where id=" +req.params.id);
        
        console.log("one row updated...");
        res.send(200,'One row updated');
    }
    catch(err){
        console.log(err);
        res.send(404);
    }
})

// return the number which is greater
function max(a,b){
    if(a>b)
        return a;
    return b;
}


//  This Function returns the 100 memes of any particular page
//  Pagination done.
async function getMemes(counting,page,limit){
    try{
        const N = counting[0].count;    // where N is total number of memes in database
        const lowerBound = max(0,N-page*limit); // ignore lowerBound number of memes
        const count = limit;    // number of memes to return, by defalut its value is 100

        // SQL query to fetch memes
        const getMemesQuery = 'SELECT id,name,url,caption FROM meme_record limit '+lowerBound+','+count;

        // Fetching memes
        const memes = await db.getQuery(getMemesQuery);
        
        // sort the memes in chronological order...
        memes.sort(function(a, b) {
            var keyA = a.id;
            var keyB = b.id;
            if (keyA < keyB) return 1;
            return -1;
          });
        return memes;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

module.exports=router;