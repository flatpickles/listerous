$(document).ready(function() {
	// find most recent list
	var recent = getMostRecentList();
	// if they've been before, load most recent list
	if (recent != null) {
		// check to make sure it hasn't been deleted!
		window.location = recent;
	} else {
		// display welcome screen once everything is loaded
		$("#header_text").html("Welcome!");
		$("#new").click(createAndLoad);
		$(window).load(function() {
			$("#contents_wrapper").fadeIn(250);
		});
	}
});