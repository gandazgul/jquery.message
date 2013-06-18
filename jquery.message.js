/*
 * jQuery message plug-in 2.0
 * Modified to support multiple messages that stack up.
 * Modified to use jquery-ui styles
 * Added several types of notifications based on classes
 * Added click to dismiss and mouseenter to fix the message
 * Added possibility to pass in overrides to the defaults at call time
 *
 * Based on original jQuery Message plugin by
 *
 * Copyright (c) 2009 Jörn Zaefferer
 * http://bassistance.de/jquery-plugins/jquery-plugin-message/
 * $Id: jquery.message.js 6407 2009-06-19 09:07:26Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

/*global jQuery*/

(function($) {
	'use strict';

	//Defaults and reference to the container
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

	/**
	 * Class for the notifications
	 * @param msg string The message
	 * @param type string Optional ['error', 'success', 'info', 'warning']
	 * @param opts object Optional override for the defaults
	 */
	var Message = function(msg, type, opts){
		var that = this,
			$containers, $icons, message, prefix, rand;

		this.options = $.extend({}, $.Message.defaults, opts);

		this.helper = $(this.options.template);

		$containers = $(".container, .icon", this.helper);
		$icons = $('span.ui-icon', this.helper);

		//if user clicks or does anything on the document then fadeOut the helper
		$(window).bind("mousemove click keypress", function(){
			that.fadeOutHelper();
		});

		//events -----------------------------------------------------------------------------
		this.helper
			//dismiss right away
			.bind('click', function(){
				var message = $(this).data('message');

				message.visible = false;
				message.fadeOutHelper();
			})
			//stop the timers so that the user can read
			.bind('mouseenter', function(){
				var message = $(this).data('message');

				clearTimeout(message.timeout1);
				clearTimeout(message.timeout2);
			})
			//restart the timers with the minimum timeout
			.bind('mouseleave', function(){
				$(this).data('message').setTimers(0);
			});

		rand = function(min, max){ return Math.floor(Math.random() * max) + min; };

		//Add classes depending on the type
		switch(type){
			case 'error':
				$icons.addClass(this.options.icons.error);
				$containers.addClass(this.options.classes.error);

				prefix = this.options.messagePrefixes.error[rand(0, this.options.messagePrefixes.error.length - 1)];
				prefix = $(this.options.messagePrefixTempl.error).text(prefix);
				$('p', this.helper).append(prefix, msg);
			break;
			case "success":
				$icons.addClass(this.options.icons.success);
				$containers.addClass(this.options.classes.success);

				prefix = this.options.messagePrefixes.success[rand(0, this.options.messagePrefixes.success.length - 1)];
				prefix = $(this.options.messagePrefixTempl.success).text(prefix);
				$('p', this.helper).append(prefix, msg);
			break;
			case "info":
				$icons.addClass(this.options.icons.info);
				$containers.addClass(this.options.classes.info);

				prefix = this.options.messagePrefixes.info[rand(0, this.options.messagePrefixes.info.length - 1)];
				prefix = $(this.options.messagePrefixTempl.info).text(prefix);
				$('p', this.helper).append(prefix, msg);
			break;
			case "warning":
				$icons.addClass(this.options.icons.warning);
				$containers.addClass(this.options.classes.warning);

				prefix = this.options.messagePrefixes.warning[rand(0, this.options.messagePrefixes.warning.length - 1)];
				prefix = $(this.options.messagePrefixTempl.warning).text(prefix);
				$('p', this.helper).append(prefix, msg);
			break;
			default:
				$('p', this.helper).html(msg);
			break;
		}

		this.setTimers = function(len){
			var that = this;

			this.visible = true;
			this.timeout1 = setTimeout(function() {
				that.visible = false;
			}, this.options.minDuration + this.options.displayDurationPerCharacter * Math.sqrt(len));

			this.timeout2 = setTimeout(function(){
				that.fadeOutHelper();
			}, this.options.totalTimeout);
		};

		this.fadeOutHelper = function() {
			if (this.helper.is(":visible") && !this.helper.is(":animated") && !this.visible) {
				this.helper.animate({ opacity: 0 }, this.options.fadeOutDuration, function(){
					$(this).remove();
				});
			}
		};
	};


	$.fn.message = function(type, opts){
		var msgText = $.trim(this.text());
		if (!msgText && (typeof opts === 'string')){
			$.message(type, opts);
		}else{
			$.message(msgText, type, opts);
		}

		//Make it chainable even thou it doesn't make much sense since this plugin doesn't modify "this"
		return this;
	};
	$.message = function(msg, type, opts) {
		var msgText = $.trim(msg || ""), message;
		if (!msgText) { return; }

		//create a new notification and append it to the container
		message = new Message(msgText, type, opts);
		message.helper
			.data('message', message)
			.appendTo($.Message.container)
			.animate({
				"opacity": message.options.opacity
			}, message.options.fadeInDuration);

		message.setTimers(msgText.length);
	};
}(jQuery));
