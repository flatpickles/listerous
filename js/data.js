var fbURL = 'https://listerous.firebaseio.com/';
var fbItems = '/items/';
var listObjRef;
var listItemsRef;

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
	listObjRef = new Firebase(fbURL + currList);
	
	// check if url has a list ID
	if (currList == undefined) {
		createList();
		return;
	}
	
	// 
	listObjRef.once('value', function(snapshot) {
		if (snapshot.val() === null) {
			console.log("not a list");
			createList();
		} else {
			listItemsRef = new Firebase(fbURL + currList + fbItems);
			parseList(snapshot.val());
		}
	});
};

function parseList(listData) {
	// set the title
	$("#title_input").val(listData.title);
	// remove starter
	$("#starter").remove();
	// populate list items
	if (listData.items != undefined) {
		$.each(listData.items, function(i) {
			displayItem(i, listData.items[i], false);
		});
	}
};

function createList() {
	console.log('creating list');
};

function createItem() {
	var newItem = listItemsRef.push("");
	return newItem.name();
};


/** functions for monitoring events elsewhere **/

$(document).on("delete_el", function(e, id) {
	listItemsRef.child(id).set(null, function() {
		deleteItem(id);
	});
});

$(document).on("update_el", function(e, id, content) {
	listItemsRef.child(id).set(content);
});

$(document).on("update_title", function(e, content) {
	listObjRef.child('title').set(content);
});


/** functions for live collaboration **/

function listUpdateListener() {
	
};

function titleUpdateListener() {
	
};

function deleteListener() {
	
};

function addListener() {
	
};