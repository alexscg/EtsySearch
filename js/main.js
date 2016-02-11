function getData(data) {
	if (data.ok) {
		var oImages = document.getElementById('etsy-images');
		var oTerms = document.getElementById('etsy-terms');
		
		updateStatus('Results for ', oTerms.value);
		
		if (data.count > 0) {
			var items = data.results;
			var row = document.createElement('div');
			row.className = 'row';
			
			for (var i = 0, l = items.length; i<l; i++) {
				var img = document.createElement('img'),
					divTitle = document.createElement('div'),
					divImgWrap = document.createElement('div'),
					divPrice = document.createElement('div'),
					divDesc = document.createElement('div'),
					anchor = document.createElement('a');
				
				divTitle.innerHTML = items[i].title;
				divTitle.className = 'panel title';
				divPrice.innerHTML = items[i].currency_code + ' ' + items[i].price;
				divPrice.className = 'panel price';
				divDesc.innerHTML = items[i].description;
				divDesc.className = 'panel desc';
				img.src = items[i].Images[0].url_75x75;
				img.className = 'panel';
				divImgWrap.className = 'col-md-3';
				anchor.className = 'well';
				anchor.href = items[i].url;
				
				anchor.appendChild(divTitle);
				anchor.appendChild(divPrice);
				anchor.appendChild(img);
				anchor.appendChild(divDesc);
				divImgWrap.appendChild(anchor);
				row.appendChild(divImgWrap);
				
				if (i%4 == 3) {
					oImages.appendChild(row);
					row = document.createElement('div');
					row.className = 'row';
				}
			}
			
			var newUrl = window.location.href.substr(0, window.location.href.indexOf('?')) + '?st=' + oTerms.value;
			window.history.pushState({'html':data, 'pageTitle':'etsysearch' + oTerms.value}, '', newUrl);
		}
	}
	else {
		updateStatus('Communication error: ', error);
	}
}

function updateStatus(){
	var textNode = document.createTextNode(arguments[0]);
	var domNode = document.getElementById('etsy-status');
	domNode.innerHTML = '';
	domNode.appendChild(textNode);

	if (arguments.length > 1) {
		var span = document.createElement('span');
		span.innerHTML = arguments[1];
		domNode.appendChild(span);
	}
}
		
document.addEventListener('DOMContentLoaded', function(event) {
	document.getElementById('etsy-search-button').addEventListener('click', function() {
		submitForm();
	});
	
	function stopRKey(evt) { 
		evt = (evt) ? evt : ((event) ? event : null); 
		var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
		if ((evt.keyCode == 13) && (node.type === 'text')) {
			submitForm();
			return false;
		}
	} 
	document.onkeypress = stopRKey; 

	var oTerms = document.getElementById('etsy-terms');
	var oImages = document.getElementById('etsy-images');
	
	function submitForm() {
		var api_key = 'qmx7u3t1pymvbazv6jbdgrnf';
		var etsyURL = 'https://openapi.etsy.com/v2/listings/active.js?callback=getData&keywords=' + oTerms.value + '&limit=12&includes=Images:1&api_key=' + api_key;
	
		oImages.innerHTML = '';

		if (oTerms.value.length) {
			updateStatus('Searching for ', oTerms.value);

			var script = document.createElement('script');
			script.src = etsyURL;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
		else {
			updateStatus('Please enter search terms');
		}
		
		return false;
	}

	if(window.location.search.length){
		oTerms.value = unescape(window.location.search.split('=')[1]);
		submitForm();
	}
});