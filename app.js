var express = require('express'),
    app = express(),
    path = require('path'),
    lr = require('connect-livereload');

var static_folder = path.join(__dirname, 'dist');

app.use(express.static(static_folder));
app.use(lr());

app.listen(4000, function() {
  console.log('server started, port 4000');
})