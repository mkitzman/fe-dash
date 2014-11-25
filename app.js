var express = require("express"),
    http    = require("http"),
    fs      = require('fs'),
    routes  = require('./routes'),
    dust    = require('dustjs-linkedin'), 
    cons    = require('consolidate'),
    app     = express();

//Turn off Dust white space suppression so JS in template exectutes
dust.optimizers.format = function(ctx, node) { return node };

app.set('view engine', 'dust');
app.set('views', __dirname + '/views');
app.engine('dust', cons.dust);
app.use(express.static(__dirname + '/public'));


require('./routes')(app);

app.all("*", function(req, res, next) {
  res.writeHead(200, { "Content-Type": "text/html" });
  next();
});

http.createServer(app).listen(3000);
console.log("App listening on port 3000");