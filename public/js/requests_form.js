$(function() {
	/*
	var items = JSON.parse(sessionStorage.getItem('requestedItems'));
	console.log('session storage returns: ', items, 'type: ', typeof(items));

	var quantities = JSON.parse(sessionStorage.getItem('quantities'));

	items.forEach(function(el) {
		$('#requested-items').append('<tr><td>' + el.title + '</td>' + '<td class="quantity"><input type="text" value=' + quantities[el.identifier] + '></input></td><td><button class="delete">X</button></td></tr>');

	});

	$('.delete').on('click', function(e) {
		e.target.parentElement.remove();
	})
	
*/	
	
$('#submititems').on('click', function(e){	
	$.ajax({
                url: "../order",
                type: "POST",
                data: {
                    name: 'test',
                    phone: '2222222',
                    email: 'test@test.com',
                    message: 'test message'
                },
                cache: false,
                success: function() {
					console.log("success");
                },
                error: function() {
					console.log("error");
                }
            });
	});
});