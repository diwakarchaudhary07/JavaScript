const http = require('http');
const firstserver = http.createServer(function(userreq,serverres){
    serverres.end("Helllo User")


});