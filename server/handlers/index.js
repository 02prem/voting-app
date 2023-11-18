module.exports.errorHandler = (err, req, res, next) => {
    res.status(err.status || 400).json({
        err: err.message || 'Something went wrong'
    });
};

module.exports = {
    ...require('./auth')
};

// const errorHandler = (req, res) => {
//     res.writeHead(404, {'Content-Type': 'application/json'});
//     res.end(JSON.stringify({ error: 'Not Found' }));
// };

// module.exports = {
//     errorHandler: errorHandler
// };