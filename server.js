var http = require('http'),
  fs = require('fs'),
  url = require('url'), 
  port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function (req, res) { // Correct function signature
  /* Investigate the request object.
    You will need to use several of its properties: url and method
  */

  // Parse the URL of the incoming request
  var parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/listings' && req.method === 'GET') { 
    // Set the response headers to indicate JSON content
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Convert the listingData object to JSON and send it as the response
    res.end(JSON.stringify(listingData));
  } else {
    // Handle other requests
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Bad gateway error');
  }
};

fs.readFile('listings.json', 'utf8', function (err, data) {
  /*
    This callback function should save the data in the listingData variable,
    then start the server.

    HINT: Check out this resource on fs.readFile
    //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

    HINT: Read up on JSON parsing Node.js
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */

  // Check for errors
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Save the data in the listingData variable already defined
  listingData = JSON.parse(data);

  // Creates the server
  server = http.createServer(requestHandler); // Pass the requestHandler function here

  // Start the server
  server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
});
