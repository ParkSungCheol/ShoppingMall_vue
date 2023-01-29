// server.js
var express = require('express');
var serveStatic = require('serve-static');
var app = express();
app.use(serveStatic(__dirname + "/server/dist"));
var port = process.env.PORT || 8080;
var hostname = '0.0.0.0';

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
 });