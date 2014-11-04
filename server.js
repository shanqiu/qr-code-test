

// BASE SETUP
// ==============================================

var express = require('express');
var mongoose = require('mongoose');

var app     = express();
var port    = process.env.PORT || 8080;

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var models = require('./models/model.js');
var User = models.User;
mongoose.connect('mongodb://wentong:doubao51921@proximus.modulusmongo.net:27017/A7taqabe');


// ROUTES
// ==============================================

var router = express.Router();
app.use('/', router);


app.set('view engine', 'ejs');

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();	
});

app.get('/', function(req, res) {
	res.render('index.ejs');	
});

app.get('/project/:project', function(req, res) {

	User.find({ _id : req.params.project }, function(err, doc) { 
        //var projectObj = res.json(doc); 
        // projectObj = doc; 
        console.log("aow"+doc);
        //var some = doc; 
        res.render('project.ejs', {
        req : req, res : res,
		project : doc[0] // get the user out of session and pass to template
		});
    });


});

// app.router('/profile')
// 	.get(function(req, res) {
// 		res.render('profile.ejs');
// 	})
// 	.post(function(req,res){
// 		res.render('profile.ejs');
// 	});



app.route('/:userName/setting')
	.get(function(req, res) {
		res.render('setting.ejs');
	 })
	.post(function(req, res) {
		res.render('setting.ejs');
		var user = new User({ 
        wechat_link : req.body.wechat_link, 
        ios_link : req.body.ios_link,
        user_name : req.params.userName
    	});
		user.save(); 
	});

app.get('/:userName', function(req, res) { 
    User.find({ user_name: req.params.userName }, function(err, doc) { 
        var user = res.json(doc); 
        console.log("aow"+doc[0].wechat_link);
    }); 
});
// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);

