(function() {
	$('#etsy-search').bind('submit', function() {
		var api_key = "qmx7u3t1pymvbazv6jbdgrnf";
		var terms = $('#etsy-terms').val();
		var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords="+terms+"&limit=12&includes=Images:1&api_key="+api_key;

		$('#etsy-images').empty();
		$('<p></p>').text('Searching for '+terms).appendTo('#etsy-images');

		$.ajax({
			url: etsyURL,
			dataType: 'jsonp',
			success: function(data) {
				var newUrl = window.location.href.substr(0, window.location.href.indexOf('?')) + "?st=" + terms;
				window.history.pushState({"html":data, "pageTitle":'etsysearch' + terms}, "", newUrl);
				
				if (data.ok) {
					$('#etsy-images').empty();
					if (data.count > 0) {
						$.each(data.results, function(i,item) {
							$("<img/>").attr({"src": item.Images[0].url_75x75, "class": "panel"}).appendTo("#etsy-images").wrap(
								"<div class='col-md-3'><a class='well' href='" + item.url + "'></a></div>"
							);
							$("#etsy-images > .col-md-3 img:last").before('<div class="panel title">' + item.title + '</div>');
							$("#etsy-images > .col-md-3 img:last").before('<div class="panel price">' + item.currency_code + ' ' + item.price + '</div>');
							$("#etsy-images > .col-md-3 img:last").after('<div class="panel desc">' + item.description + '</div>');
							if (i%4 == 3) {
								$("#etsy-images").append('<div class="row"></div>');
								$("#etsy-images > .col-md-3").appendTo('#etsy-images .row:last');
							}
						});
					} else {
						$('<p>No results.</p>').appendTo('#etsy-images');
					}
				} else {
					$('#etsy-images').empty().append('<p>Data error.</p>');
					alert(data.error);
				}
			}
		});

		return false;
	});
	
	if(window.location.search.length){
		$('#etsy-terms').val(unescape(window.location.search.split('=')[1]));
		$('#etsy-search').submit();
	}
})();