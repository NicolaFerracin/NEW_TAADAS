// Retrieve
var MongoClient = require('mongodb').MongoClient;
var ISODate = require('iso-date');

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/apostrophe-sandbox", function(err, db) {
  if(err) { return console.dir(err); }

  var publications = db.collection('publications');
 
  publications.find({}).toArray(function(err, docs) {
  	if (err) { throw err }
	// console.log(docs);

	docs.forEach(function(doc, index) {

		var physical = doc['pInStock'] > 0;


		// remove non alphanumeric characters
		var slug = doc['title'].replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().split(' ').join('-');
		

		var sortTitle = doc['title'].toLowerCase();

		var highSearchText = doc['title'] + doc['description'];

		var highSearchWords = Array.prototype.concat( doc['title'].split(' '), doc['description'].split(' ') );

		var operator = {$set: {
			type: "publication",
			createdAt: ISODate("2016-06-11T20:12:20.056Z"),
			published: true,
			hideTitle: false,
			tags: [ doc['tags'] ],
			thumbnail: {
				"items" : [ ],
				"type" : "area"
			},
			"body" : {
				"items" : [
					{
						"editView" : "1",
						"widget" : true,
						"type" : "slideshow",
						"id" : "w376295507862340136",
						"ids" : [
							"420845104834805314"
						],
						"extras" : {
							"420845104834805314" : {
								"hyperlink" : null,
								"hyperlinkTitle" : "",
								"hyperlinkTarget" : false
							}
						},
						"showTitles" : false,
						"showDescriptions" : false,
						"showCredits" : false
					}
				],
			"type" : "area"
			},
			physical: physical,
			slug: slug,
			sortTitle: sortTitle,
			publishedAt: ISODate("2016-06-11T20:12:20.056Z"),
			highSearchText: highSearchText,
			highSearchWords: highSearchWords,
			lowSearchText: highSearchText,
			searchSummary: ""
		}};

		publications.updateOne({ _id: doc['_id'] }, operator, function(err, updated) {
			if (err) throw err;

			console.log('updated!');

			if ( index === docs.length - 1 ) {
				db.close();
			}
		});
			
	});
  });
});