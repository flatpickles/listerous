/* 
	Function to detect if site is rendering in a mobile browser.
	from http://www.abeautifulsite.net/blog/2011/11/detecting-mobile-devices-with-javascript/ 
*/
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

$(document).ready(function() {
	loadButton();
	
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
    setActions($("#title_container"));
    $("#title_input").blur(function() {
    	var v = $.trim($(this).val());
    	if (v === "") {
	    	$(this).val(startTitle); 
	    	$(document).trigger("update_title", [startTitle]);
    	}
    });
    
    // go data go!
    setupData();
});


function createNew() {
	var newName = createItem(null, function() {});
	// can't do this in a callback or iOS won't show the keyboard...
	displayItem(newName, "", true);
};