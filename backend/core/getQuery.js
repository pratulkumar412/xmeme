const pool = require('./db');

// Function to return a promise, rejected if error occurs...

function getQuery(query){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
            //console.log('Fetching data from database...');
            pool.query(query,(errorrr,reso)=>{
                if(errorrr)
                    reject(errorrr);
                resolve(reso);
            })
		},0);
	});
}

module.exports.getQuery = getQuery;