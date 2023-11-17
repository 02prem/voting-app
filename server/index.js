// const express = require('express'); // import express, express to create server
// const app = express();  // instance of express

const http = require('http');   // import http

const handle = require('./handlers/index');
const myErrorHandler = handle.errorHandler;

const server = http.createServer((req, res) => {
    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ hello: 'world' }));
    }
    else{
        myErrorHandler(req,res);
        // res.writeHead(404, {'Content-Type': 'application/json'});
        // res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

const port = 4000;

server.listen(port, () => {
    console.log('Server started on port 4000');
});

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