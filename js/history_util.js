// configuration
$.cookie.json = true;
// constants
var expiration = 90; // if you haven't looked at your lists in 2 months, you're a mope

// set the list with ID as viewed most recently
function setViewed(id) {
	// get cookie lists structure
	var obj = $.cookie('viewed');
	if (obj == undefined) obj = $.parseJSON('{"lists": {}}');
	// set recent
	obj.recent = id;
	// set time in lists structure
	obj.lists[id] = $.now();
	
	// write back out to cookie
	$.cookie('viewed', obj, { expires: expiration, path: '/' });
};

// return the most recently viewed page, or undefined if none exists
function getMostRecentList() {
	return $.cookie('viewed').recent;
};

// get a list of viewed ids, in most to least recent
function getAllLists() {
	// get structure
	var obj = $.cookie('viewed');
	if (obj == undefined) return [];
	// read into list for sorting
	var viewed = [];
	for (el in obj.lists) {
		viewed.push({"listID": el, "time": obj.lists[el]});
	}
	
	// sort array
	viewed.sort(function(a, b) {
		return b.time - a.time;
	});
	
	// return just items, no time
	var ret = [];
	for (el in viewed) {
		ret.push(viewed[el].listID);
	}
	return ret;
};


/* 
-- structure --
	
	viewed => 
		{ lists:
			{ "-1l2kj1nnsk": 1366914675974 , 
			  "-198jjahsdj12": 1366914612341,
			  ...
			}
		  recent: listID
		}

-- end structure -- 
*/