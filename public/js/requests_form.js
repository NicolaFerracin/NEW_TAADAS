$(function() {
	var items = JSON.parse(sessionStorage.getItem('requestedItems'));
	console.log('session storage returns: ', items, 'type: ', typeof(items));

	var quantities = JSON.parse(sessionStorage.getItem('quantities'));

	items.forEach(function(el) {
		$('#requested-items').append('<tr><td>' + el.title + '</td>' + '<td class="quantity"><input type="text" value=' + quantities[el.identifier] + '></input></td><td><button class="delete">X</button></td></tr>');

	});

	$('.delete').on('click', function(e) {
		e.target.parentElement.parentElement.remove();
	})

});