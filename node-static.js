var static = require('node-static');

//
// Create a node-static server to serve the current directory
//
var file = new(static.Server)('.', { cache: false, headers: {'X-Hello':'World!'} });

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response, function (err, res) {
            if (err) { // An error as occured
                console.error("> Error serving " + request.url + " - " + err.message);
                response.writeHead(err.status, err.headers);
                response.end();
            } else { // The file was served successfully
                console.log("> " + request.url + " - " + res.message);
            }
        });
    });
}).listen(8000);

console.log("> node-static is listening on http://127.0.0.1:8000");
