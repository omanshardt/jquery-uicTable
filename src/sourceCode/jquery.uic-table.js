// Version 1.0
(function($){
	// public methods START
	var identifier = "uic_table";
	var methods = {
		init: function(options) {
			var settings = $.extend(true, {
				css: ['paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'backgroundColor', 'backgroundImage'],
				additionalCSS: []
			}, $.fn.uicTable.defaults, options);
			if (Array.isArray(settings.additionalCSS)) settings.css.push.apply(settings.css, settings.additionalCSS);
			return this.each(function(){
				var tblElm = this;
				var $tblElm = $(tblElm);
				var data = $tblElm.data(identifier);
				if (!data) {
					// console.log((CSS.supports) ? 'supports CSS.supports' : 'not supports CSS.supports');
					// console.log((CSS.supports("(position: -webkit-sticky)")) ? 'supports -webkit-sticky' : 'not supports -webkit-sticky');
					// console.log((CSS.supports("(position: sticky)")) ? 'supports sticky' : 'not supports sticky');
					if(window.CSS && window.CSS.supports && window.CSS.supports("(position: -webkit-sticky)"))
					{
						$tblElm.find('thead:eq(0)').css({
							'position':'-webkit-sticky',
							'top':'0px'
						});
					}
					else if (true) {
						$tblElm.data(identifier,{});
						$tblElm.data(identifier).settings = settings;
						var storage = $tblElm.data(identifier).storage = {
  						arrHeaderDivs: []
						};

						var tableContainer = document.createElement('div');
						$(tableContainer).addClass('uicTable-Container');
						$(tableContainer).css({	'position':'absolute', 'left':'0px', 'top':'0px', 'right':'0px', 'bottom':'0px', 'overflow':'auto'});

						var parentCSSPosition = (window.getComputedStyle) ? window.getComputedStyle($tblElm.parent().get(0)).position : $tblElm.parent().get(0).currentStyle.position

						if (parentCSSPosition == 'static' && $tblElm.parent().get(0).tagName.toLowerCase() !== 'body') $tblElm.parent().css('position', 'relative');
						
						$tblElm.wrap(tableContainer);

						$tblElm.addClass('uicTable');
						
						// get all computedValues before appending the divs to the th elements and before setting the th's styles to initial values
						$tblElm.find('thead:eq(0) th', 'thead:eq(0) td').each(function(index){
							var $cell = $(this);
							var div = document.createElement('div');
							storage.arrHeaderDivs.push(div);
							div.style.position = 'relative';
							for (i = 0; i < settings.css.length; i++) {
// 								console.log(settings.css[i], window.getComputedStyle(this)[settings.css[i]])
								div.style[settings.css[i]] = (window.getComputedStyle) ? window.getComputedStyle(this)[settings.css[i]] : this.currentStyle[settings.css[i]];
							}
						});
						// set the th's styles to initial values and append the divs to the th elements
						$tblElm.find('thead:eq(0) th', 'thead:eq(0) td').each(function(index){
							var $cell = $(this);
							for (i = 0; i < settings.css.length; i++) {
								this.style[settings.css[i]] = 'initial';
							}
//							$(storage.arrHeaderDivs[index]).append(document.createTextNode($(this).html()));
							$(storage.arrHeaderDivs[index]).html($(this).html());
							$cell.html(storage.arrHeaderDivs[index]);
						});

						$tblElm.closest('.uicTable-Container').on('scroll', function(e){
							storage.arrHeaderDivs
							for (i=0; i < storage.arrHeaderDivs.length; i++) {
								storage.arrHeaderDivs[i].style.top = this.scrollTop + 'px';
	// 							var t = this.scrollTop;
	// 							arrHeaderDivs[i].style.webkitTransform = 'translate(0px,' + t + 'px)';
							}
						});
					}
				}
			});
		}
	};
	// public methods END

	// private methods START

	// Helper Methods START
	function log(level, subject) {
		var console = (window.console) ? window.console : {assert: function(){}, clear: function(){}, group: function(){}, groupCollapsed: function(){}, groupEnd: function(){}, debug: function(){}, log: function(){}, warn: function(){}, error: function(){}, }
		// console[level](subject);
	}
	// Helper Methods END
	// private methods END

	$.fn.uicTable = function(method,args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error( 'Method ' + method + ' does not exist.' );
		}
	};
})(jQuery);
