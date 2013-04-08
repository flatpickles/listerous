var button_texts = ["Hit me again",
					"Tap that",
					"Uno mas",
					"Moar thangz",
					"Think of other things"];

function displayItem(id, val, select) {
	// add a new element to the end of the list
	var $newEl = $($("#list_template").html());
	$newEl.attr("id", id).attr("value", val);
	$newEl.find(".delete").attr("id", "del_" + id);
	$("#list").append($newEl);
	// other UI updates
	updateButton();
	if ($(document).height() > $(window).height()) {
		// only scroll if appropriate
		window.scrollTo(0, document.body.scrollHeight);
	}
	setActions();
	if (select) $newEl.find("input").focus();
};

function removeItem(id) {
	$("#" + id).animate({ opacity: 0, height: 0 }, 5000);
};

function setActions() {
	// handle focus/click on list elements
    $("input[type='text']").focus(function() {
		this.setSelectionRange(0, 9999);    
		return false;
    }).bind("touchend", function() {
    	if (!$(this).is(":focus")) {
			this.setSelectionRange(0, 9999);
		}
		return false;
    }).mouseup(function() {	
    	if (!$(this).is(":focus")) {
			this.setSelectionRange(0, 9999);
		}
		return false;
    });
    // handle delete click, send event to data.js
    $("img.delete").click(function() {
    	var id = $(this).attr("id").split("_")[1];
	    $(document).trigger("delete_el", [id]);
	    $("#" + id).animate({ opacity: 0 }, 200, function() {
		    $("#" + id).animate( { height: "0px" }, 200, function() {
			    $("#" + id).remove();
		    });
	    });
    })
};

function loadButton() {
	$("#new").css("visibility", "visible");
	updateButton();
};

function updateButton() {
	$("#new").html(button_texts[Math.floor(Math.random()*button_texts.length)]);
};