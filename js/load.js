// simply create a new list and navigate  it on page load
$(document).ready(function() {
	var newList = createList(null, function() {
		window.location = newList;
	});
});