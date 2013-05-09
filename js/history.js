// globals
var loaded = 0;
var toLoad = 0;

$(window).load(function() {
	loadAllHistory();
});

function loadAllHistory() {
	var lists = getAllLists();
	toLoad = lists.length;
	// create elements, call load for each
	
	for (list in lists) {
		var name = lists[list];
		// create new elements
		var $newEl = $($("#hist_template").html());
		var $newBr = $("<br/>");
		$newEl.attr('id', name).attr('href', name);
		$newBr.attr('class', name);
		// attach to DOM and load title
		$("#history_list").append($newEl).append($newBr);
		loadName(name, loadHistoryItem);
	}
};

function loadHistoryItem(snapshot) {
	// load in title to proper element
	var val = snapshot.child('title').val();
	var $el = $("#" + snapshot.name());
	if (val != null) $el.text(val);
	else { // list has been deleted somehow
		$el.remove();
		$("." + snapshot.name()).remove();
	}
	// fade in if necessary
	if (++loaded == toLoad) $("#contents_wrapper").fadeIn(FADETIME);
};