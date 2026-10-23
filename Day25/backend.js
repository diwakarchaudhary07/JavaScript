
const http = require('http');

const server = http.createServer(function (req, res) {
    if (req.method === 'GET' && req.url === '/Home') {
        res.statusCode = 200;
        res.end('Welcome to Home Page');
    }
    else if (req.method === 'GET' && req.url === '/About') {
        res.statusCode = 200;
        res.end('Welcome to About Page');
    }
    else {
        res.statusCode = 404;
        res.end('Error 404: Page Not Found');
    }
});

server.listen(3000, function () {
    console.log('Server is running on port 3000');
});
