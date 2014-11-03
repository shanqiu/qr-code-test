

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
	// log each request to the console
	console.log(req.method, req.url);
	// continue doing what we were doing and go to the route
	next();	
});

// home page route (http://localhost:8080)
app.get('/', function(req, res) {
	res.render('index.ejs');	
});

// about page route (http://localhost:8080/about)
// app.get('/login', function(req, res) {
// 	res.render('login.ejs');	
// });

app.param('name', function(req, res, next, name) {
	console.log('doing name validations on ' + name);
	req.name = name;
	next();	
});

// router.get('/:name', function(req, res) {
// 	res.render('profile.ejs', {
// 		user : req.params.name // get the user out of session and pass to template
// 	});
// });


app.get('/project/:project', function(req, res) {
	res.render('project.ejs', {
		user : req.params.project // get the user out of session and pass to template
	});
	// res.send('hello ' + req.params.name + '!');
});




// app.get('/init', function(req, res) { 
//     var user = new User({ 
//         email : 'nowind_lee@qq.com', 
//         name : 'Freewind'
//     }); 
//     user.save(); 
//     res.send('Data inited'); 
// });

app.get('/users', function(req, res) { 
    User.find(function(err, doc) { 
        res.json(doc); 
    }); 
});

app.route('/signup')
	.get(function(req, res) {
		res.render('signup.ejs');
	 })
	.post(function(req, res) {
		res.render('signup.ejs');
		var user = new User({ 
        wechat_link : req.body.wechat_link, 
        ios_link : req.body.ios_link
    	});
		user.save(); 
	});

// app.route('/login')

// 	// show the form (GET http://localhost:8080/login)
// 	.get(function(req, res) {
// 		res.render('login.ejs');
// 	})

// 	// process the form (POST http://localhost:8080/login)
// 	.post(function(req, res) {
// 		console.log('processing');
// 		res.send('processing the login form!');
// 	});


// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);

