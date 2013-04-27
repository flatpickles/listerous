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
		var $newEl = $($("#hist_template").html());
		$newEl.attr('id', name).attr('href', name);
		$("#history_list").append($newEl).append("<br/>");
		loadName(name, loadHistoryItem);
	}
};

function loadHistoryItem(snapshot) {
	var val = snapshot.child('title').val();
	var $el = $("#" + snapshot.name());
	if (val != null) $el.text(val);
	else $el.remove();
	// TODO: also remove the <br>
	// TODO: also handle no lists visible (no loaded or all removed)
	if (++loaded == toLoad) $("#contents_wrapper").fadeIn(250);
};