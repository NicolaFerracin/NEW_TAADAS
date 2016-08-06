$(function() {
	
	console.log(sessionStorage.getItem('dvdOrders'));
	var items = JSON.parse(sessionStorage.getItem('dvdOrders'));

	items.forEach(function(el) {
		$('#dvd-orders').append('<tr><td class="title">' + el.title + '</td>' + '<td class="quantity"><input type="number" min="1" max="100" value=' + el.qty + '></input></td><td class="identifier">' + el.identifier + '</td><td><button class="delete">X</button></td></tr>');

	});

	$('.delete').on('click', function(e) {
		e.target.parentElement.parentElement.remove();
	});



	
$('#dvd-submit-form').on('click', function(e){	
	e.preventDefault();

	// returns url encoded string of form data  e.g. Company+Name=Una's+Company&First+Name=Una&Last+Name=Gauper [...]

	var data = $('#dvd-orders-form').serialize();

	// add ordered titles, identifiers, and quantities to data

	var rows = $('#dvd-orders > tr');
	var titles = 'titles=';
	var quantities = 'quantities=';
	var identifiers = 'identifiers=';

	rows.each(function(index, row) {
		var title = $(this).find('td.title').text();
		var quantity = $(this).find('td.quantity > input').val();
		var identifier = $(this).find('td.identifier').text();
		identifier = identifier.replace(/&/, '');

		if (index === 0)  {
			titles += title;
			quantities += quantity;
			identifiers += identifier;
		} else {
			titles += '_' + title;
			quantities += '_' + quantity;
			identifiers += '_' + identifier;
		}
	});

	data += '&' + titles + '&';
	data += quantities + '&';
	data += identifiers;

	$.ajax({
                url: "../order",
                type: "POST",
                data: data.toString(),
                cache: false,
                success: function() {
			window.location.href="thank-you";	
					console.log("success");
					
					//pass all data to google analytic
					ga('send', 'event', 'DVDs-order');
				  try{
					rows.each(function(index, row) {
						var title = $(this).find('td.title').text();
						var quantity = $(this).find('td.quantity > input').val();
						ga('send', 'event', 'DVDs', 'order', title, quantity);
					})
            	  } catch(e){}
                },
                error: function() {
					console.log("error");
                }
            });
	});
});
