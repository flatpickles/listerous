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
	
	/* Get aware of editing commands */
	$("#new").click(createNew);
	$(document).keyup(function(e) {
		e.preventDefault();
		// detect enter keypress (iOS bugs out with enter, so only on desktop)
		if (e.which == 13 && !isMobile.any()) { createNew(); }
		else if (e.which == 27) { $("input[type='text']").blur();}
		return false;
    });

    setActions($("#starter"));
    setActions($("#title_container"));
    setupData();
});


function createNew() {
	var newName = createItem();
	displayItem(newName, "", true);
}