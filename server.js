var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.use('/img',express.static(path.join(__dirname, 'app/img')));
app.use('/js',express.static(path.join(__dirname, 'app/js')));
app.use('/css',express.static(path.join(__dirname, 'app/css')));

app.listen(8080);
