var firstTime = true;

$(document).ready(function() {
	// if they've been before, load most recent list
	if (!firstTime) {
		$(".header_img").hide();
		$("#blurb").hide();
		$("#new").hide();
		$("#header_text").html("Loading...");
		$("#contents_wrapper").fadeIn(250);
		createAndLoad(false);
	} else {
		// display welcome screen once everything is loaded
		$("#header_text").html("Welcome!");
		$("#new").click(createAndLoad);
		$(window).load(function() {
			$("#contents_wrapper").fadeIn(250);
		});
	}
});