// globals
var loaded = 0;
var toLoad = 0;

$(window).load(function() {
	loadAllHistory();
});

/* load in all history from cookie (using history_util) */
function loadAllHistory() {
	var lists = getAllLists();
	toLoad = lists.length;
	
	// check for no lists...
	if (toLoad == 0) {
		var $newEl = $("<div id='no_history'>[No list history]</div>");
		$("#history_list").append($newEl);
		$("#contents_wrapper").fadeIn(FADETIME);
		return; // bounce.
	}
	
	// create elements, call load for each
	for (list in lists) {
		var name = lists[list];
		// create new elements
		var $newEl = $($("#hist_template").html());
		var $newBr = $("<br/>");
		$newEl.attr("id", name).attr("href", name);
		$newBr.attr("class", name);
		// attach to DOM and load title
		$("#history_list").append($newEl).append($newBr);
		loadName(name, loadHistoryItem);
	}
};

/* Load a given history item's name into existing element */
function loadHistoryItem(snapshot) {
	// load in title to proper element
	var val = snapshot.child("title").val();
	var $el = $("#" + snapshot.name());
	if (val != null) $el.text(val);
	else { // list has been deleted somehow
		$el.remove();
		$("." + snapshot.name()).remove();
	}
	// fade in if necessary
	if (++loaded == toLoad) $("#contents_wrapper").fadeIn(FADETIME);
};