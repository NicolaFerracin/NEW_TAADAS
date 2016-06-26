// Retrieve
var MongoClient = require('mongodb').MongoClient;
var md5 = require('js-md5');
var ISODate = require('iso-date');
var MONGO_URI = process.env.MONGO_URI;
// Connect to the db
MongoClient.connect(MONGO_URI, function(err, db) {
  if(err) { return console.dir(err); }

  var publications = db.collection('publications');
  var aposPages = db.collection('aposPages');
  var aposFiles = db.collection('aposFiles');
 
  publications.find({ pLargeimage: {$exists: true} }).toArray(function(err, docs) {
  	if (err) { throw err }
  	console.log(docs.length);

	docs.forEach(function(doc, index) {

		var pdf_name_split = doc['pLargeimage'].split('/');
		var pdf_name = pdf_name_split[pdf_name_split.length - 1];
		
		var id = md5(pdf_name);

		pdf_name = pdf_name.split('.')[0];

		var wid = 'w' + id;

		/* add pdf file info to aposFiles */

		aposFiles.insertOne({
			"_id" : id,
			"length" : null,
			"group" : "office",									
			"name" : pdf_name,																																																																																																																																																																																																																																																																																																																																
			"title" : doc['title'],
			"extension" : "pdf",
			"md5" : id,
			"ownerId" : "admin",
			"description" : "",
			"credit" : "",
			"tags" : [ ],
			"private" : false,
			"searchText" : doc['title']	
		});

		
		/* add the pdf item to the document body */
		
		var newBodyItem = {
				"editView" : "1",
				"widget" : true,
				"type" : "files",
				"id" : wid,
				"ids" : [
					id
				],
				"extras" : Object.defineProperty({}, id, {
															configurable: true,
															writable: true,
															enumerable: true,
															value: {
																"hyperlink" : null,
																"hyperlinkTitle" : "",
																"hyperlinkTarget" : false
														  }
					}),
				"showTitles" : false,
				"showDescriptions" : false,
				"showCredits" : false
			}			

		var newBody = { 
						"items": [ newBodyItem ], 
						"type": "area"
					  };
			
		aposPages.update({_id: doc['_id']}, {$set: { body: newBody} }, function(err, updated) {
			if (err) { throw err };
			console.log('updated!');
			if ( index === docs.length - 1) { 
				db.close();
				return
			}
	  });
	});
  });
});
