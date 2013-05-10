// constants
var fbURL = 'https://listerous.firebaseio.com/lists/';
var siteName = 'listero.us/'
var fbItems = 'items';
var startTitle = 'Untitled List';
var startItem = 'Tap or click here to start';

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
		// should never be the case, but nav to home page just in case
		window.location = "index.html";
	} else {
		listObjRef = new Firebase(fbURL + currList);	
		// handle list rendering
		listObjRef.once('value', function(snapshot) { // maybe we could just use child()
			if (snapshot.val() === null) {
				// create a new list with the desired key
				createList(currList, function() {
					// then render the newly created lists
					listObjRef.once('value', function(snapshot) {
						parseList(snapshot.val());
					});
				});
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
	// populate list items (here, not in .on(), to preserve order)
	if (listData.items != undefined) {
		for (i in listData.items) {
			displayItem(i, listData.items[i], false, SELECTONCLICK);
		}
	}
	// attach listeners to firebase objects
	attachListeners();
	// show everything
	fadeAllIn();
	// register the recency of this list in history
	setViewed(listObjRef.name());
};

// make a generic list, go there.
function createAndLoad(fade) {
	if (fade || fade == undefined) $("#contents_wrapper").fadeOut(FADETIME);
	var newList = createList(null, function() {
		window.location = newList;
	});
};

// create a new list
function createList(name, callback) {
	// create the FB object
	var fb = new Firebase(fbURL);
	listObjRef = name == null ? fb.push() : fb.child(name);
	listObjRef.set({title: startTitle}, function() {
		listItemsRef = listObjRef.child(fbItems);
		createItem(startItem, callback);
	});
	// return list name
	return listObjRef.name();
};

function createItem(text, callback) {
	if (text == null) text = "";
	var newItem = listItemsRef.push(text, callback);
	return newItem.name();
};

function loadName(listID, callback) {
	var l = new Firebase(fbURL + listID);
	l.once('value', callback);
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
	// update input val if need be
	var title = dataSnapshot.val();
	if ($("#title_input").val() != title) {
		$("#title_input").val(title);
	}
	// set the document title
	if ($.trim(title) === "") {
		document.title = startTitle;
	} else {
		document.title = title;
	}
};

function addItemListener(childSnapshot, prevChildName) {
	displayItem(childSnapshot.name(), childSnapshot.val(), false, SELECTONCLICK);
};

function removeItemListener(oldChildSnapshot) {
	deleteItem(oldChildSnapshot.name());
};

function updateItemListener(childSnapshot, prevChildName) {
	updateItem(childSnapshot.name(), childSnapshot.val());
};