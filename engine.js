/*
 @name		Google Analytics Tracking Engine
 @author	Peter Burdette
 @version	1.0
 @license	Released under the MIT license.
*/

// Fetches redirects.txt and stores information in the variable data
$.get('redirects.txt', function(data) {
	// Fetches the parameters of the query string and stores the path in urlParams
	var urlParams = [];
	// Sifts through the string and removes unwanted characters
	(function () {
		var match,
		pl = /\+/g, // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) { return decodeURIComponent(s.replace(pl, '')); },
		query = window.location.search.substring(1);

		while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);
	})();
	// Pulls properties from urlParams and stores them in destination array
	var destination = Object.keys(urlParams).map(function(path){return urlParams[path]});
	// Assigns the redirects.txt data to the userData array
	var userData = data.split('\n');
	// Multidimensional array declaration
	var redirects = [];
	// Fetches the total number of objects in the userData array
	var total = userData.length;
	// Counter variable
	var i = 0;

	// Runs through the redirects array to check to see if there is a string match
	while (i < total) {
		// Places userData into the multidimensional redirects array
		redirects[i] = userData[i].split(' => ');
		// Checks for a path match in the redirects array
		if (redirects[i][0] == destination[1]) {
			window.location.href = redirects[i][1];
			return;
		}
		i++;
	}
	// Redirects to safe page if no match is found
	window.location.href = 'https://example.com';
});
