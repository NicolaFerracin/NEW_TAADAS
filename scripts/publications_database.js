// Retrieve
var MongoClient = require('mongodb').MongoClient;

console.log("Hello");
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/apostrophe-sandbox", function(err, db) {
  if(err) { return console.dir(err); }

  var publications = db.collection('publications');
  var aposPages = db.collection('aposPages');

  var cursor = aposPages.find();

  cursor.each(function(err, doc) {
  	console.log('hello');
  });

  db.close();

});