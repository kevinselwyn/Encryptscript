/*globals document*/

(function (document) {
	"use strict";

	var el = document.createElement("span"),
		text = document.createTextNode("Hello, ");

	el.appendChild(text);
	document.body.appendChild(el);
}(document));