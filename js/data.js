// constants
var fbURL = 'https://listerous.firebaseio.com/';
var siteName = 'listero.us/'
var fbItems = 'items';

// globals
var listObjRef;
var listItemsRef;

// entry point for data management
function setupData() {
	initFB();
};

// initialize firebase structure(s)
function initFB() {
	var currList = window.location.toString().split(siteName)[1];
	
	// check if url has a list ID
	if (currList == undefined) {
		// navigation to home page
		createList(null);
	} else {
		listObjRef = new Firebase(fbURL + currList);	
		// handle list rendering
		listObjRef.once('value', function(snapshot) {
			if (snapshot.val() === null) {
				// create a new list with the desired key
				createList(currList);
			} else {
				// load the existing list
				listItemsRef = listObjRef.child(fbItems);
				parseList(snapshot.val());
			}
		});
	}
};

// load an existing list into UI
function parseList(listData) {
	// set the title
	$("#title_input").val(listData.title);
	// remove starter
	$("#starter").remove();
	// populate list items (here, not in .on(), to preserve order)
	if (listData.items != undefined) {
		$.each(listData.items, function(i) {
			displayItem(i, listData.items[i], false);
		});
	}
	// attach listeners to firebase objects
	attachListeners();
};

// create a new list
function createList(name) {
	// create the FB object
	var fb = new Firebase(fbURL);
	listObjRef = name == null ? fb.push() : fb.child(name);
	listObjRef.set({title: $("#title_input").val()});
	listItemsRef = listObjRef.child(fbItems);
	
	// update starter to be the real deal
	var newName = createItem($("#starter").find("input").val());
	$("#starter").attr("id", newName).find(".delete").attr("id", "del" + del_sep + newName);
	
	// redirect to new page 
	window.location = listObjRef.name();
};

function createItem(text) {
	if (text == undefined) text = "";
	var newItem = listItemsRef.push(text);
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

function attachListeners() {
	// attach update functions
	listObjRef.child('title').on('value', updateTitleListener);
	listItemsRef.on('child_added', addItemListener);
	listItemsRef.on('child_removed', removeItemListener);
	listItemsRef.on('child_changed', updateItemListener);
};

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