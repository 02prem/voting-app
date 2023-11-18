require('dotenv').config();

const express = require('express'); // import express, express to create server
const app = express();  // instance of express
const cors = require('cors');
const bodyparser = require('body-parser');
const port = process.env.PORT;

const http = require('http');   // import http

const routes = require('./routes');
const db = require('./models');
const handle = require('./handlers');
// const handle = require('./handlers/index');
// const myErrorHandler = handle.errorHandler;

app.use(cors());
app.use(bodyparser.json());

app.get('/', (req, res) => res.json({ hello: 'world' }));

app.use('/api/auth', routes.auth);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;

    next(err);
});
// app.use(handle.errorHandler);
app.listen(port, console.log('Server started on port 4000') );   // start server

// const server = http.createServer((req, res) => {
//     if(req.url == '/'){
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         res.end(JSON.stringify({ hello: 'world' }));
//     }
//     else{
//         myErrorHandler(req,res);
//     }
// });

// const port = process.env.PORT;

// server.listen(port, () => {
    // console.log('Server started on port 4000');
// });

// app.get('/', (req, res) => res.json({ hello: 'world' }));

// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;

//     next(err);
// });

// app.use((err, req, res, next) => {
//     res.status(err.status || 500).json({
//         err: err.message || 'Something went wrong'
//     });
// });

// app.listen(port, console.log('Server started on port 4000') );   // start server