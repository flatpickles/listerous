// constants
var fbURL = 'https://listerous.firebaseio.com/';
var fbItems = 'items';

// globals
var listObjRef;
var listItemsRef;

// entry point for data management
function setupData() {
	// reload if hash changes
	$(window).hashchange(function() {
		location.reload();
	});
	
	initFB();
};

// initialize firebase structure(s)
function initFB() {
	var currList = window.location.hash.split('#')[1];
	
	// check if url has a list ID
	if (currList == undefined) {
		createList(null);
	} else {
		listObjRef = new Firebase(fbURL + currList);	
		// handle list rendering
		listObjRef.once('value', function(snapshot) {
			if (snapshot.val() === null) {
				createList(currList);
			} else {
				listItemsRef = listObjRef.child(fbItems);
				parseList(snapshot.val());
			}
		});
	}
};

function attachListeners() {
	// attach update functions
	listObjRef.child('title').on('value', updateTitleListener);
	listItemsRef.on('child_added', addItemListener);
	listItemsRef.on('child_removed', removeItemListener);
	listItemsRef.on('child_changed', updateItemListener);	
};

// load an existing list into UI
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
	
	attachListeners();
};

function createList(name) {
	console.log('creating list');
	
	// make sure to initialize listItemsRef and listObjRef ?!?!
	
	attachListeners();
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

function updateTitleListener(dataSnapshot) {
	if ($("#title_input").val() != dataSnapshot.val()) $("#title_input").val(dataSnapshot.val());
};

function addItemListener(childSnapshot, prevChildName) {
	displayItem(childSnapshot.name(), childSnapshot.val(), false);
};

function removeItemListener(oldChildSnapshot) {
	deleteItem(oldChildSnapshot.name());
};

function updateItemListener(childSnapshot, prevChildName) {
	updateItem(childSnapshot.name(), childSnapshot.val());
};