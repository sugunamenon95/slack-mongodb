var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();
var port = process.env.PORT||1337;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb');

var user=mongoose.model('user',{name:String, age: Number});

var user1=new user({name:'Suguna', age:21});
var user2=new user({name:'Pyunika', age:21});
var user3=new user({name:'Mihir', age:23});
var user4=new user({name:'Dhawal', age:23});
savedata(user1);
savedata(user2);
savedata(user3);
savedata(user4);
//console.log(user1);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

app.get('/',function(req,res) {
  res.status(200).send('Hello World!');
});

app.listen(port, function() {
  console.log('Listening on port: '+ port);
});
function savedata(users) {
  users.save(function(err,userobj) {
    if(err) {
      console.log('Error');
      console.log(err);
    } else {
      console.log('saved sucessfully: ',userobj);
    }
  });
}

function fetch(){
  user.find({age: 23}, function(err, userobj) {
    if(err) {
      console.log(err);
    } else if(userobj){
      console.log('Found: ',userobj);
      fire(userobj);
    } else {
      console.log('Not found.');
    }
  });
}


app.post('/hello',function(req, res, next) {
  fetch();
  function fire(result) {
    var uname = req.body.user_name;
    var botPayload = {
      text: result
    };
    if(uname!=='slackbot') {
      return res.status(200).json(botPayload);
    } else {
      return res.status(200).end();
    }
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
/* if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
*/
// production error handler
// no stacktraces leaked to user
/* app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
}); */



module.exports = app;
