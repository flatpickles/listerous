var db = new Firebase('https://listerous.firebaseio.com/');

function setupData() {
	$(document).on("delete_el", function(event, id) {
		// handle deletion of element with identifier id
	});
	
	// reload if hash changes
	$(window).hashchange(function() {
		location.reload();
	});
	
	initFB();
};

function initFB() {
	var currList = window.location.hash.split('#')[1];
	
	if (currList != undefined) {
		alert(currList);
	}
};