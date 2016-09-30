var express = require('express');
var app = express();
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(require('cookie-parser')());

app.get('/cookie', function(req, res) {
    res.send('<form method="POST"><h2>To use this site you must accept cookies:</h2>\
        <input type="radio" name="name" value="agree">I agree to this website cookie policy<br>\
        <input type="radio" name="name" value="disagree">I disagree<br>\
        <input type="submit" value="Submit"></form>');
});

app.post('/cookie', function(req, res) {
    var name = req.body.name;

    if (name === 'agree') {
            res.cookie("agree", "true", {maxAge: 60000});
            res.redirect('/hello/world');
    }
    else {
        res.send('<h2>You cannot use the site without accepting cookies</h2>');
    };
});

app.get('*', function(req, res, next){
  if (req.headers.cookie === 'agree=true') {
    next();
  } else {
    url = req.url;
    res.redirect('/cookie');
  }
});

app.use(express.static(__dirname + '/projects'));
// files in the directory named "projects" will be served from "/"

app.listen(8080, function() { console.log("listening on port 8080!"); });
