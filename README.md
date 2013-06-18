jQuery Message plug-in v2.0
==============

jQuery plugin to implement a global user notifications system for your web app. 

 * Modified to support multiple messages that stack up.
 * Modified to use jquery-ui styles
 * Added several types of notifications based on classes
 * Added click to dismiss and mouseenter to fix the message
 * Added possibility to pass in overrides to the defaults at call time

**Based on original jQuery Message plugin by**
```
Copyright (c) 2009 J�rn Zaefferer
http://bassistance.de/jquery-plugins/jquery-plugin-message/
$Id: jquery.message.js 6407 2009-06-19 09:07:26Z joern.zaefferer $

Dual licensed under the MIT and GPL licenses:
	http://www.opensource.org/licenses/mit-license.php
	http://www.gnu.org/licenses/gpl.html
```

Example Calls
-------------

Select an element that contains the text to be displayed to create the notification:
```javascript
$('selector').message([TYPE], [OPTIONS](optional));
```

OR call the static message function with the notification text as the first parameter:
```javascript
$.message([NOTIFICATION TEXT], [TYPE], [OPTIONS](optional));
```

Types
-----

* error
* success
* warning
* info

Defaults and Options
--------------------

The options parameter can be used to override any of the defaults at call time, alternatively you can override the defaults 
globally by modifying the $.Message object.

```javascript
$.Message = {
	"defaults": {
		"opacity": 0.8,
		"fadeOutDuration": 500,
		"fadeInDuration": 200,
		"displayDurationPerCharacter": 130,
		"minDuration": 2500,
		"totalTimeout": 6000,
		"classes": {
			"error": "ui-state-error",
			"success": "ui-state-highlight",
			"info": "ui-state-highlight",
			"warning": "ui-state-warning"
		},
		"icons": {
			"error": "ui-icon-circle-close",
			"success": "ui-icon-circle-check",
			"info": "ui-icon-info",
			"warning": "ui-icon-alert"
		},
		"messagePrefixTempl": {
			"error": "<strong>",
			"success": "<strong>",
			"info": "<strong>",
			"warning": "<strong>"
		},
		"messagePrefixes": {
			"error": ['Error: '],
			"success": ['Yay! ', 'Way To Go! ', 'Yes! ', 'Congrats! '],
			"info": ['Information: '],
			"warning": ['Warning: ']
		},
		"template":
			'<div class="ui-widget">' +
				'<div class="ui-corner-all container">' +
					'<div class="ui-widget icon-container">' +
						'<div class="ui-corner-left icon">' +
							'<span class="ui-icon"><\/span>' +
						'<\/div>' +
					'<\/div>' +
					'<p><\/p>' +
				'<\/div>' +
			'<\/div>'
	},
	"container": $("<div>", {"class": 'jquery-message'}).appendTo('body')
};
```

$.Message.defaults.template
---------------------------

In this template the message text is inserted within the "p" tag. When you modify it keep a ```<p>``` tag somewhere.

$.Message.defaults.messagePrefixes
----------------------------------
Arrays of messages to prefix your message with based on the notification type. You can leave this empty if you prefer 
nothing to be prefixed. The prefix is chosen at random from the array of prefixes for the type of message.

Included CSS
------------

The included CSS was for my initital implementation of this plugin. There is some functional CSS in there that 
should be kept if you modify it, I plan to improve this by setting the functional CSS from JS.

License
-------

Dual licensed under the MIT and GPL licenses:
	http://www.opensource.org/licenses/mit-license.php
	http://www.gnu.org/licenses/gpl.html
