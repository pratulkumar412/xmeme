FRONTEND :

Frontend of this project in built using ReactJS.
Run:

    $ cd frontend/
    $ sudo npm install
    $ npm start
to start the frontend server.
The Frontend will be running on PORT: 3000 (Please close any app running on port:3000 before running the above commands)



BACKEND :

Backend of this prject in built using NodeJS and Express.
Run:

    $ cd backend/
    $ sudo npm install
    $ node index.js
to start the backend server.
The backend server will be running on PORT:8081 (Please close any app running on port:8081 before running the above commands).

APIs:-

    Get most recent 100(maximum) memes :-    GET http://localhost:8081/memes
    Get 100 memes on page number '3' :-      GET http://localhost:8081/memes?page=3
    Post a new meme :-                       POST http://localhost:8081/memes
    Get meme with 'id' :-                    GET http://localhost:8081/memes/:id
    Update a particular meme with 'id' :-    PATCH http://localhost:8081/memes/:id



DATABASE :

Database used in this project is mySQL.
The configurations of mySQL are:

    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'memes'
    
