/*globals JES, window, XMLHttpRequest*/
/*jslint bitwise: true, evil: true*/

(function (d, w) {
	"use strict";

	var scripts = d.getElementsByTagName("script"),
		queue = [],
		stringFunc = function (x) {
			/* Spells out: String */
			var string = [3, 36, 34, 25, 30, 23];

			return string[x] + 80;
		},
		string = (function () {
			var s = (function () {
				var output = "",
					i = 0,
					l = 0;

				for (i = 0, l = 6; i < l; i += 1) {
					output += String.fromCharCode(stringFunc(i));
				}

				return output;
			}());

			return w[s];
		}()),
		mathFunc = function (x) {
			/* Spells out: Math */
			return (
				(Math.pow(x, 0) + 6) +
				(Math.floor(x / 2) * 19) +
				(Math.ceil(x / 2) * 20) +
				(Math.floor(x / 3) * -32) +
				70
			);
		},
		math = (function () {
			var m = (function () {
				var output = "",
					i = 0,
					l = 0;

				for (i = 0, l = 4; i < l; i += 1) {
					output += string.fromCharCode(mathFunc(i));
				}

				return output;
			}());

			return w[m];
		}()),
		fromCharCode = string.fromCharCode,
		cookieFunc = function (x) {
			/* Spells out: cookie */
			return (
				(12 * math.ceil((x % 3) / 2)) +
				(math.floor(x / 4) * -14) +
				(math.floor(x / 3) * 8) +
				(math.floor(x / 5) * -4) +
				99
			);
		},
		cookieObj = function (index) {
			var c = (function () {
					var output = "",
						i = 0,
						l = 0;
	
					for (i = 0, l = 6; i < l; i += 1) {
						output += fromCharCode(cookieFunc(i));
					}
	
					return output;
				}()),
				cookie = d[c].split(/;/),
				cookies = {},
				parts = [],
				i = 0,
				l = 0;
	
			for (i = 0, l = cookie.length; i < l; i += 1) {
				parts = cookie[i].split(/\=/);
				parts[0] = parts[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
				parts[1] = parts[1].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
				cookies[parts[0]] = parts[1];
			}
	
			return cookies[index];
		},
		chars = (function () {
			var output = "",
				point = [
					[65, 25],
					[97, 25],
					[48, 9],
					[43, 0],
					[47, 0],
					[61, 0]
				],
				i = 0,
				j = 0;

			for (i = 0; i < point.length; i += 1) {
				for (j = point[i][0]; j <= point[i][0] + point[i][1]; j += 1) {
					output += fromCharCode(j);
				}
			}

			return output;
		}()),
		index = function (input) {
			var i = 0,
				l = 0;

			for (i = 0, l = chars.length; i < l; i += 1) {
				if (chars[i] === input) {
					return i;
				}
			}

			return 0;
		},
		base64 = function (input) {
			var output = "",
				chr = [],
				enc = [],
				i = 0;

			while (i < input.length) {
				enc[0] = index(input[i]);
				enc[1] = index(input[i + 1]);
				enc[2] = index(input[i + 2]);
				enc[3] = index(input[i + 3]);

				i += 4;

				chr[0] = (enc[0] << 2) | (enc[1] >> 4);
				chr[1] = ((enc[1] & 15) << 4) | (enc[2] >> 2);
				chr[2] = ((enc[2] & 3) << 6) | enc[3];

				output += fromCharCode(chr[0]);

				if (enc[2] !== 64) {
					output += fromCharCode(chr[1]);
				}

				if (enc[3] !== 64) {
					output += fromCharCode(chr[2]);
				}
			}

			return output;
		},
		load = function (queue, index) {
			var xhr = new XMLHttpRequest(),
				contentType = "",
				regex = {},
				input = "",
				output = "",
				el = queue[index],
				url = el.src;

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					contentType = xhr.getResponseHeader("Content-Type");

					if (contentType !== el.type) {
						return;
					}

					regex = new RegExp("[^" + chars + "]", "g");
					input = xhr.responseText.replace(regex, "");

					output = JES.decrypt({
						ciphertext: base64(input),
						key: cookieObj("key"),
						iv: cookieObj("iv")
					});

					eval(output);

					if (index + 1 < queue.length) {
						load(queue, index + 1);
					}
				}
			};
		
			xhr.open("GET", url, true);
			xhr.send(null);
		},
		i = 0,
		l = 0;

	for (i = 0, l = scripts.length; i < l; i += 1) {
		if (scripts[i].type === "application/encryptscript") {
			if (scripts[i].getAttribute("async") !== null) {
				load([scripts[i]], 0);
			} else {
				queue.push(scripts[i]);
			}
		}
	}

	if (queue.length > 0) {
		load(queue, 0);
	}
}((function () {
	"use strict";

	var math = Math,
		doc = function (x) {
			/* Spells out: document */
			return (
				((x % 2) * 11) +
				(math.floor(x / 3) * 7) +
				(math.floor(x / 2) * -1) +
				(math.floor(x / 5) * -19) +
				(math.floor(x / 4) * 4) +
				(math.floor(x / 7) * -5) +
				(math.floor(x / 6) * 14) +
				100
			);
		},
		d = (function () {
			var output = "",
				i = 0,
				l = 0;

			for (i = 0, l = 8; i < l; i += 1) {
				output += String.fromCharCode(doc(i));
			}

			return output;
		}());

	return window[d];
}()), window));