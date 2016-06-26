var AWS = require('aws-sdk');
var fs = require('fs');

var secret = 'OC8BnlKWxr8R6ibpLJUj9nY1B2Wk5KiKzbIPzIyJ';
var key = 'AKIAIB2CM6OORVDSDMWA';

AWS.config.update({accessKeyId: key, secretAccessKey: secret});

AWS.config.update({region: 'us-west-1'});

var s3bucket = new AWS.S3({ params: {Bucket: 'taadas-files'} });



fs.readFile('./pdfs/A Training Guide  Early Childhood.pdf', function(err, data) {
	if (err) { throw err }

		
	console.log(data);	

	var params = {
		Key: 'test3.pdf',
		Body: data,
		"Content/Type": 'application/pdf',
		folder: 'files'
	};

	s3bucket.upload(params, function(err, data) {
		if (err) {
			console.log(err)
		} 

		console.log(data);
	});
})
