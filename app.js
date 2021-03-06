
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    // test = require('./routes/test'),
    resources = require('./routes/resources');

var app = module.exports = express();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
/*Sets index and partial locations*/


// ALLOW CORS
// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });


// // JSON API
// app.get   ('/api/posts'   , api.posts);
// // app.get   ('/api/post/:id', api.post);
// // app.post  ('/api/post'    , api.addPost);
// // app.put   ('/api/post/:id', api.editPost);
// app.delete('/api/post/:id', api.deletePost);
app.get('/api/resources', api.resources);
app.get('/api/apiExample', api.foreinApiReq);

// TEST API
// app.get('/api/users', test.users);



// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
