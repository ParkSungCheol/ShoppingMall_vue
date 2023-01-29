// server.js
var express = require('express');
var serveStatic = require('serve-static');
var app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
var hostname = '127.0.0.1';

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
 });