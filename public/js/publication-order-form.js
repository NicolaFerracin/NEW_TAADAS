$(function() {
	
	var items = JSON.parse(sessionStorage.getItem('publicationOrders'));

	items.forEach(function(el) {
		$('#publication-orders').append('<tr><td class="title">' + el.title + '</td>' + '<td class="quantity"><input type="number" min="1" max="100" value=' + el.qty + '></input></td><td class="identifier">' + el.identifier + '</td><td><button class="delete">X</button></td></tr>');

	});

	$('.delete').on('click', function(e) {
		e.target.parentElement.parentElement.remove();
	});


$('#publication-submit-form').on('click', function(e){	
	e.preventDefault();

	var data = $('#publication-orders-form').serialize();

	// add list of ordered titles, identifiers, and quantity to data

	var rows = $('#publication-orders > tr');

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
                data: data,
                cache: false,
                success: function() {
		        console.log('success');
		        
		        	ga('send', 'event', 'publications-order');
		        	try{
		    		//pass all data to google analytic
					rows.each(function(index, row) {
						var title = $(this).find('td.title').text();
						var quantity = $(this).find('td.quantity > input').val();
						ga('send', 'event', 'publications', 'order', title, quantity);
					})
		        	} catch(e){}
		        
					window.location.href="thank-you";
					
                },
                error: function() {
					console.log("error");
                }
            });
	});
});
