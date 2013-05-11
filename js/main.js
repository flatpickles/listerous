$(document).ready(function() {
	// preload (global)
	delImage = new Image();
	delImage.src = "graphics/x.png";

	// Get aware of editing commands
	$("#new").click(createNew);
	$(document).keyup(function(e) {
		e.preventDefault();
		// detect enter keypress (iOS bugs out with enter, so only on desktop)
		if (e.which == 13 && !isMobile.any() && $(':focus').hasClass('list_entry')) { createNew(); }
		else if (e.which == 13 && $(':focus').hasClass('title_input')) { $('#title_input').blur(); }
		else if (e.which == 27) { $("input[type='text']").blur();}
		return false;
    });

    // set up title bar
    setActions($("#title_container"), SELECTONCLICK);
    $("#title_input").blur(function() {
    	var v = $.trim($(this).val());
    	if (v === "") {
	    	$(this).val(startTitle); 
	    	$(document).trigger("update_title", [startTitle]);
    	}
    });
    
    // add bottom padding if it's mobile (see the button after focus)
    // maybe this should just be for iOS? Whatever.
    if (isMobile.any()) {
	    // padding-bottom: 45px;
	    $("#contents_wrapper").css("padding-bottom", "45px");
    }
    
    // go data go!
    setupData();
});


function createNew() {
	var newName = createItem(null, function() {});
	// can't do this in a callback or iOS won't show the keyboard...
	displayItem(newName, "", true, SELECTONCLICK);
};