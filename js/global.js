var LISTWIDTH = 400.0;
var FADETIME = 200;

$(document).ready(function() {
	// make new click createAndLoad (from data.js
	$("#header_new").click(createAndLoad);
	// make about/history loads fade out too
	$("#left_nav").click(function() {
		$("#contents_wrapper").fadeOut(FADETIME);
	});
	
	// static width on rotation
	var viewport = document.querySelector("meta[name=viewport]");
	var scale = screen.width/LISTWIDTH;
	viewport.setAttribute('content', 'maximum-scale=' + scale.toString());
});

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