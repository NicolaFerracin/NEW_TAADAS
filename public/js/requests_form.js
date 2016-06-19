$(function() {
	
	var items = JSON.parse(sessionStorage.getItem('orderedItems'));

	items.forEach(function(el) {
		$('#requested-items').append('<tr><td class="title">' + el.title + '</td>' + '<td class="quantity"><input type="number" min="1" max="100" value=' + el.qty + '></input></td><td class="identifier">' + el.identifier + '</td><td><button class="delete">X</button></td></tr>');

	});

	$('.delete').on('click', function(e) {
		e.target.parentElement.parentElement.remove();
	});



	
$('#submititems').on('click', function(e){	
	e.preventDefault();

	function addSpaces(spaces, str) {
			while (spaces > 0) {
				str += ' ';
				spaces--;
			}

			return str;
		}

	var data = $('#publications-order').serialize();
	data = data.replace(/\+/g, ' ').replace(/\=/g, ': ').replace(/&/g, '\r\n');
	data += '\r\n';

	// add list of ordered titles, identifiers, and quantity to data

	var rows = $('#requested-items > tr');

	rows.each(function(index, row) {
		var title = $(this).find('td.title').text();
		var quantity = $(this).find('td.quantity > input').val();
		var identifier = $(this).find('td.identifier').text();

		var spaceAfterIdentifier = 50 - identifier.length;
		var spaceAfterTitle = 100 - title.length;
		var spaceAfterQuantity = 30 - quantity.length;

		var newStr = addSpaces(spaceAfterIdentifier, identifier);
		newStr += addSpaces(spaceAfterTitle, title);
		newStr += addSpaces(spaceAfterQuantity, quantity);

		data = newStr + '\r\n' + data;
	});

	console.log(data);

	$.ajax({
                url: "../order",
                type: "POST",
                data: data,
                cache: false,
                success: function() {
                	// change to redirect to a success message page
					console.log("success");
                },
                error: function() {
					console.log("error");
                }
            });
	});
});