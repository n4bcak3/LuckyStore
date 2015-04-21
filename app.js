var express = require('express'),
    app = express(),
    path = require('path');

var static_folder = path.join(__dirname, 'dist');

app.use(require('connect-livereload')());
app.use(express.static(static_folder));


app.listen(4000, function() {
  console.log('server started, port 4000');
})