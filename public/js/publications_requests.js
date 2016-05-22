'use strict';
$(function() {
	console.log("publications request js loaded");
	$('button').on('click', function(e) {
		if ( !document.getElementById(e.target.title) ) {

			var qty = 1;
			var newrow = $('<tr><td class="title">' + e.target.title + '</td><td class="qty">' + qty + '</td></tr>');
			newrow.attr('id', e.target.title);
			$('#my-requests').append(newrow);

	} else {
		
		var qty = $('#' + e.target.title).find('.qty').text();
		console.log(qty);
	}

	})


});