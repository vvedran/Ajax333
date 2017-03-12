var Ajax333 = {};

Ajax333.createXHR = function(url, options){
	var xml = false;


	//provjerava da li browser podrzava xhr objekat 
	// i podrska za starije IE
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		try{
		xhr = new ActiveXObject("Microsoft.XMLHTTP")
		}catch(e){
			xhr = false;
		}
	}


	if(xhr) {
		options = options || {};
		options.method = options.method || "GET";
		options.data = options.data || null;


		/*parsirsnje podataka za slanje serveru POST "key=value&key2=value2" */
		if (options.data) {
			var qstring = [];

			for (var key in options.data) {
				qstring.push(encodeURIComponent(key)+"="+encodeURIComponent(options.data[key]));
			}

			options.data = qstring.join("&");
		}

		/*   opcija za isklucivanje kesiranja  */
		if(options.cache == false && options.method.toUpperCase() == "GET"){
			url=url+"?_="+ new Date().getTime();
		}

		xhr.onreadystatechange = function(){
			/* opcija before omogucava prikaz ocitavanja  */
			if (xhr.readyState == 1) {
				if (options.before) {
					options.before.call(xhr);
				}
			}
			if((xhr.readyState == 4) && (xhr.status == 200 || xhr.status == 304)){
 
				var contentType = xhr.getAllResponseHeaders('Content-Type');

				if(options.complete){
					if(contentType == "application/json") {
							// >>>stim da moramo da ubacimo skript za parsiranje JSON fajla<<<
							options.complete.call(xhr, JSON.parse(xhr.responseText));	

					}else if(contentType == "text/xml"  || contentType == "application/xml"){
							options.complete.call(xhr, xhr.responseXML);	

					}else{
							options.complete.call(xhr, xhr.responseText);	
					}
				}
 
			} 

		};
			xhr.open(options.method, url, true);
			return xhr;
	}else{
		return false
	}

};

Ajax333.ajax = function(url, options) {
	var xhr = Ajax333.createXHR(url , options);

	if(xhr) {
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		if (options.method.toUpperCase() == "POST") {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		xhr.send(options.data);
		console.log("Fajl nije pronadjen!!!!!!")
		
	}


};
