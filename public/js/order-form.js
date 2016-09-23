$(function() {
	
	debugger;
	var storeName = window.formType+'Orders';
	
	$('.items-type-title').text(window.formType+' (s)');
	
	var items = JSON.parse(sessionStorage.getItem(storeName)) || [];
	
	
	
	items.forEach(function(el) {
		$('#orders-table').append('<tr><td class="title">' + el.title + '</td>' + '<td class="quantity"><input type="number" min="1" max="100" value=' + el.qty + '></input></td><td class="identifier" style="display:none">' +(el.identifier||'&nbsp;') + '</td><td><button class="delete">X</button></td></tr>');

	});

	$('.delete').on('click', function(e) {
		e.target.parentElement.parentElement.remove();
	});


$('#submit-form').on('click', function(e){	
	e.preventDefault();
	
	var valid = true;
	$('input,textarea,select').filter('[required]:visible').each(function () {
		var t = $(this);
		
		var val;
		if(t.attr('type')==='checkbox'){
			val = this.checked;
		} else {
			val = t.val();
		}
		
		if (!val) {
			
			var visible = true;
			t.parents().each(function(){
				if ($(this).height()<2) {
					visible=false;
				}
				
			});
			if (visible) {
				valid = false;
				t.css({outline:'1px solid #f00'});
				t.focus();
			}
		} else {
			t.css({outline:'none'});
		}
	
	
	});
	if (!valid) {
		return;
	}

	$(this).html('<i class="fa4 fa4-spinner fa4-2x fa4-spin"></i> please wait...');

	
	var data = $('#orders-form').serialize();

	// add list of ordered titles, identifiers, and quantity to data

	var rows = $('#orders > tr');

	var titles = 'titles=';
	var quantities = 'quantities=';
	var identifiers = 'identifiers=';
	

	
	rows.each(function(index, row) {
		var title = encodeURIComponent($(this).find('td.title').text());
		var quantity = $(this).find('td.quantity > input').val();
		var identifier = encodeURIComponent($(this).find('td.identifier').text());
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
                url: "/order",
                type: "POST",
                data: data,
                cache: false,
                success: function() {
			        
		        

		        	try{
		    		//pass all data to google analytic
					rows.each(function(index, row) {
						var title = $(this).find('td.title').text();
						var quantity = $(this).find('td.quantity > input').val();
						quantity = parseInt(quantity);
						//while (quantity>0) {
							ga('send', 'event', 'order', window.formType, title, quantity);
						//	quantity--;
						//}
						sessionStorage.setItem(storeName,'[]');
					})
		        	} catch(e){}
		        
					window.location.href="/thank-you";
					
                },
                error: function() {
                	alert('Sorry, error has occured.');
					console.log("error");
                }
            });
	});
});
