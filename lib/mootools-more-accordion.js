/*
---

description: changes and extensions to accordion class to be conform
to the Accordion widget according to WAI-ARIA-specification.
(http://www.w3.org/TR/wai-aria-practices/#accordion)
Changes are clearly marked in the code.

authors:
-Eva L�sch
-Philip Fieber
-Daniel Kramer
-Christian Merz
  
...
*/

//MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2009 Aaron Newton <http://clientcide.com/>, Valerio Proietti <http://mad4milk.net> & the MooTools team <http://mootools.net/developers>, MIT Style License.

/*
---

script: More.js

description: MooTools More

license: MIT-style license

authors:
- Guillermo Rauch
- Thomas Aylott
- Scott Kyle

requires:
- core:1.2.4/MooTools

provides: [MooTools.More]

...
*/

MooTools.More = {
	'version': '1.2.4.4',
	'build': '6f6057dc645fdb7547689183b2311063bd653ddf'
};

/*
---

script: Class.Binds.js

description: Automagically binds specified methods in a class to the instance of the class.

license: MIT-style license

authors:
- Aaron Newton

requires:
- core:1.2.4/Class
- /MooTools.More

provides: [Class.Binds]

...
*/

/*Class.Mutators.Binds = function(binds){
    return binds;
};

Class.Mutators.initialize = function(initialize){
	return function(){
		$splat(this.Binds).each(function(name){
			var original = this[name];
			if (original) this[name] = original.bind(this);
		}, this);
		return initialize.apply(this, arguments);
	};
};*/


/*
---

script: Element.Measure.js

description: Extends the Element native object to include methods useful in measuring dimensions.

credits: "Element.measure / .expose methods by Daniel Steigerwald License: MIT-style license. Copyright: Copyright (c) 2008 Daniel Steigerwald, daniel.steigerwald.cz"

license: MIT-style license

authors:
- Aaron Newton

requires:
- core:1.2.4/Element.Style
- core:1.2.4/Element.Dimensions
- /MooTools.More

provides: [Element.Measure]

...
*/

/*Element.implement({

	measure: function(fn){
		var vis = function(el) {
			return !!(!el || el.offsetHeight || el.offsetWidth);
		};
		if (vis(this)) return fn.apply(this);
		var parent = this.getParent(),
			restorers = [],
			toMeasure = []; 
		while (!vis(parent) && parent != document.body) {
			toMeasure.push(parent.expose());
			parent = parent.getParent();
		}
		var restore = this.expose();
		var result = fn.apply(this);
		restore();
		toMeasure.each(function(restore){
			restore();
		});
		return result;
	},

	expose: function(){
		if (this.getStyle('display') != 'block') return $empty;
		var before = this.style.cssText;
		//console.log("expose - SET STYLE: ");
		//console.log(this);
		this.setStyles({
			display: 'block',
			position: 'absolute',
			visibility: 'hidden'
		});
		return function(){
			this.style.cssText = before;
		}.bind(this);
	},

	getDimensions: function(options){
		options = $merge({computeSize: false},options);
		var dim = {};
		var getSize = function(el, options){
			return (options.computeSize)?el.getComputedSize(options):el.getSize();
		};
		var parent = this.getParent('body');
		if (parent && this.getStyle('display') == 'block'){
			dim = this.measure(function(){
				return getSize(this, options);
			});
		} else if (parent){
			try { //safari sometimes crashes here, so catch it
				dim = getSize(this, options);
			}catch(e){}
		} else {
			dim = {x: 0, y: 0};
		}
		return $chk(dim.x) ? $extend(dim, {width: dim.x, height: dim.y}) : $extend(dim, {x: dim.width, y: dim.height});
	},

	getComputedSize: function(options){
		options = $merge({
			styles: ['padding','border'],
			plains: {
				height: ['top','bottom'],
				width: ['left','right']
			},
			mode: 'both'
		}, options);
		var size = {width: 0,height: 0};
		switch (options.mode){
			case 'vertical':
				delete size.width;
				delete options.plains.width;
				break;
			case 'horizontal':
				delete size.height;
				delete options.plains.height;
				break;
		}
		var getStyles = [];
		//this function might be useful in other places; perhaps it should be outside this function?
		$each(options.plains, function(plain, key){
			plain.each(function(edge){
				options.styles.each(function(style){
					getStyles.push((style == 'border') ? style + '-' + edge + '-' + 'width' : style + '-' + edge);
				});
			});
		});
		var styles = {};
		getStyles.each(function(style){ styles[style] = this.getComputedStyle(style); }, this);
		var subtracted = [];
		$each(options.plains, function(plain, key){ //keys: width, height, plains: ['left', 'right'], ['top','bottom']
			var capitalized = key.capitalize();
			size['total' + capitalized] = size['computed' + capitalized] = 0;
			plain.each(function(edge){ //top, left, right, bottom
				size['computed' + edge.capitalize()] = 0;
				getStyles.each(function(style, i){ //padding, border, etc.
					//'padding-left'.test('left') size['totalWidth'] = size['width'] + [padding-left]
					if (style.test(edge)){
						styles[style] = styles[style].toInt() || 0; //styles['padding-left'] = 5;
						size['total' + capitalized] = size['total' + capitalized] + styles[style];
						size['computed' + edge.capitalize()] = size['computed' + edge.capitalize()] + styles[style];
					}
					//if width != width (so, padding-left, for instance), then subtract that from the total
					if (style.test(edge) && key != style &&
						(style.test('border') || style.test('padding')) && !subtracted.contains(style)){
						subtracted.push(style);
						size['computed' + capitalized] = size['computed' + capitalized]-styles[style];
					}
				});
			});
		});

		['Width', 'Height'].each(function(value){
			var lower = value.toLowerCase();
			if(!$chk(size[lower])) return;

			size[lower] = size[lower] + this['offset' + value] + size['computed' + value];
			size['total' + value] = size[lower] + size['total' + value];
			delete size['computed' + value];
		}, this);

		return $extend(styles, size);
	}

});*/

/*
---

script: Fx.Elements.js

description: Effect to change any number of CSS properties of any number of Elements.

license: MIT-style license

authors:
- Valerio Proietti

requires:
- core:1.2.4/Fx.CSS
- /MooTools.More

provides: [Fx.Elements]

...
*/

Fx.Elements = new Class({

	Extends: Fx.CSS,

	initialize: function(elements, options){
		this.elements = this.subject = $$(elements);
		this.parent(options);
	},

	compute: function(from, to, delta){
		var now = {};
		for (var i in from){
			var iFrom = from[i], iTo = to[i], iNow = now[i] = {};
			for (var p in iFrom) iNow[p] = this.parent(iFrom[p], iTo[p], delta);
		}
		return now;
	},

	set: function(now){
		for (var i in now){
			var iNow = now[i];
			for (var p in iNow) this.render(this.elements[i], p, iNow[p], this.options.unit);
		}
		return this;
	},

	start: function(obj){
		if (!this.check(obj)) return this;
		var from = {}, to = {};
		for (var i in obj){
			var iProps = obj[i], iFrom = from[i] = {}, iTo = to[i] = {};
			for (var p in iProps){
				var parsed = this.prepare(this.elements[i], p, iProps[p]);
				iFrom[p] = parsed.from;
				iTo[p] = parsed.to;
			}
		}
		return this.parent(from, to);
	}

});

/*
---

script: Fx.Accordion.js

description: An Fx.Elements extension which allows you to easily create accordion type controls.

license: MIT-style license

authors:
- Valerio Proietti

requires:
- core:1.2.4/Element.Event
- /Fx.Elements

provides: [Fx.Accordion]

...
*/

Fx.Accordion = new Class({

	Extends: Fx.Elements,

	options: {/*
		onActive: $empty(toggler, section),
		onBackground: $empty(toggler, section),
		fixedHeight: false,
		fixedWidth: false,
		*/
		display: 0,
		show: false,
		height: true,
		width: false,
		opacity: true,
// ########## START: CHANGE ##########
		//alwaysHide: false,
		alwaysHide: true,
// ########## END: CHANGE ##########
// ########## START: EXTEND ##########
		// additional variables
		// prefix used for IDs
		prefix: 'tab_',
		// a flag, that shows if CTRL is pressed or not
		ctrl: false,
		// the current index of added sections
		index: 0,
		// the class name of the accordion headers
		className: '',
		// the current element with the focus 
		elementWithFocus: null,
		// the index of the currently selected element
		currentIndex: 0,
// ########## END: EXTEND ##########
		trigger: 'click',
		initialDisplayFx: true,
		returnHeightToAuto: true
	},

	initialize: function(){
		var params = Array.link(arguments, {
			'container': Element.type, //deprecated
			'options': Object.type,
			'togglers': $defined,
			'elements': $defined
		});
		this.parent(params.elements, params.options);
		this.togglers = $$(params.togglers);
// ########## START: EXTEND ##########
		//set focus on first accordion header
		this.togglers[0].setProperty('tabindex', 0);
		this.className = $$(params.togglers)[0].getProperty('class');
// ########## END: EXTEND ##########
		this.previous = -1;
		this.internalChain = new Chain();
		if (this.options.alwaysHide) this.options.wait = true;
		if ($chk(this.options.show)){
			this.options.display = false;
			this.previous = this.options.show;
		}
		if (this.options.start){
			this.options.display = false;
			this.options.show = false;
		}
		this.effects = {};
		if (this.options.opacity) this.effects.opacity = 'fullOpacity';
		if (this.options.width) this.effects.width = this.options.fixedWidth ? 'fullWidth' : 'offsetWidth';
		if (this.options.height) this.effects.height = this.options.fixedHeight ? 'fullHeight' : 'scrollHeight';
		for (var i = 0, l = this.togglers.length; i < l; i++) this.addSection(this.togglers[i], this.elements[i]);
		this.elements.each(function(el, i){
			if (this.options.show === i){
				this.fireEvent('active', [this.togglers[i], el]);
			} else {
				//console.log("initialize - SET STYLE: ");
				//console.log(el);
				for (var fx in this.effects) el.setStyle(fx, 0);
			}
		}, this);
// ########## START: CHANGE ##########
		// Comment this line for being all Tabs collapsed on startup by default.
		//if ($chk(this.options.display) || this.options.initialDisplayFx === false) this.display(this.options.display, this.options.initialDisplayFx);
// ########## END: CHANGE ##########
		if (this.options.fixedHeight !== false) this.options.returnHeightToAuto = false;
		this.addEvent('complete', this.internalChain.callChain.bind(this.internalChain));
// ########## START: EXTEND ##########
		//element, which has currently focus:
		this.options.elementWithFocus = null; 
				
			//f�ge allen Elementen, die den Fokus haben k�nnen, die Events "focus" und "blur" hinzu:
			this.togglers.each(function(el){ 
											
				el.addEvents({ 
					focus : function(){
					//lege das Element fest, das aktuell den Fokus hat:
					this.options.elementWithFocus = el; 
					el.setProperty('aria-selected', 'true');
					
				}.bind(this),
					blur : function(){
						this.options.elementWithFocus = null; 
						el.setProperty('aria-selected', 'false');
					}.bind(this) 
				});
			}.bind(this)); 
		  
		// add Role and State for ARIA
		$(document.body).getElements('#accordion').setProperty('role', 'tablist');
		$(document.body).getElements('#accordion').setProperty('aria-multiselectable', 'true'); //false
			
		//elements should not be able to reach with tabbing when they are closed:
		//for(var i=0, l = this.elements.length; i<l; i++) this.elements[i].setProperty('tabindex', -1);
// ########## END: EXTEND ##########		
		
	},

	addSection: function(toggler, element){
		toggler = document.id(toggler);
		element = document.id(element);
		var test = this.togglers.contains(toggler);
		this.togglers.include(toggler);
		this.elements.include(element);
		var idx = this.togglers.indexOf(toggler);
		var displayer = this.display.bind(this, idx);
		toggler.store('accordion:display', displayer);
		toggler.addEvent(this.options.trigger, displayer);
		//console.log('add section1');
		/*if(element != null){
			//console.log('added without problems');
		}
		else{
			//console.log('PROBLEMs with adding');
		}
		//console.log('add section2');
		//console.log('addSection - SET STYLE: ');
		//console.log(element);
		if (this.options.height) element.setStyles({'padding-top': 0, 'border-top': 'block', 'padding-bottom': 0, 'border-bottom': 'block'});
		if (this.options.width) element.setStyles({'padding-left': 0, 'border-left': 'block', 'padding-right': 0, 'border-right': 'block'});*/
		if (this.options.height) element.setStyles({'padding-top': 0, 'border-top': 'none', 'padding-bottom': 0, 'border-bottom': 'none'});
		if (this.options.width) element.setStyles({'padding-left': 0, 'border-left': 'none', 'padding-right': 0, 'border-right': 'none'});
		element.fullOpacity = 1;
		if (this.options.fixedWidth) element.fullWidth = this.options.fixedWidth;
		if (this.options.fixedHeight) element.fullHeight = this.options.fixedHeight;
		element.setStyle('overflow', 'hidden');
		if (!test){
			for (var fx in this.effects) element.setStyle(fx, 0);
		}
// ########## START: EXTEND ##########		
		//console.log('add section');
		if(toggler.getProperty('tabindex') != 0)
			toggler.setProperty('tabindex', -1);
		// set ARIA Roles and Properties
		toggler.setProperty('aria-expanded', 'false');
		toggler.setProperty('role', 'tab');
		// set id
		toggler.setProperty('id', this.options.prefix + this.options.index);
		// add Key-Eventlistener
		toggler.addEvent('keydown', this.onKeyDown.bindWithEvent(this));
		toggler.addEvent('keyup', this.onKeyUp.bindWithEvent(this));

		// set ARIA Roles and Properties
		element.setProperty('aria-labeledby', this.options.prefix + this.options.index);
		element.setProperty('aria-hidden', 'true');
		element.setProperty('role', 'tabpanel');
		//set tabindex to panel EVA
		element.setProperty('tabindex', -1);
		// set visibility
		element.style.visibility = 'hidden';
		// add Key-Eventlistener
		element.addEvent('keydown', this.onKeyDown.bindWithEvent(this));
		element.addEvent('keyup', this.onKeyUp.bindWithEvent(this));
		// increment index
		this.options.index++;
		// allocate new IDs to each Accordion header and adjust the aria-labeledby attribute 
		// in the corresponding panel
		$$('.' + this.className).each(function(element, index) {
			element.setProperty('id', this.options.prefix + index);
			var panel = element.getNext('div[role=tabpanel]');
			if (panel != null)
				panel.setProperty('aria-labeledby', this.options.prefix + index);
		}.bind(this));
// ########## END: EXTEND ##########
		return this;
	},

	detach: function(){
		this.togglers.each(function(toggler) {
			toggler.removeEvent(this.options.trigger, toggler.retrieve('accordion:display'));
		}, this);
	},

	display: function(index, useFx){
		if (!this.check(index, useFx)) return this;
		useFx = $pick(useFx, true);
		if (this.options.returnHeightToAuto){
			var prev = this.elements[this.previous];
			if (prev && !this.selfHidden){
				for (var fx in this.effects){
					//console.log('display - SETSTYLE: ');
					//console.log(prev);
					prev.setStyle(fx, prev[this.effects[fx]]);
				}
			}
		}
		index = ($type(index) == 'element') ? this.elements.indexOf(index) : index;
		if ((this.timer && this.options.wait) || (index === this.previous && !this.options.alwaysHide)) return this;
		this.previous = index;
		var obj = {};
		this.elements.each(function(el, i){
			obj[i] = {};
			var hide;
			if (i != index){
				hide = true;
			} else if (this.options.alwaysHide && ((el.offsetHeight > 0 && this.options.height) || el.offsetWidth > 0 && this.options.width)){
				hide = true;
				this.selfHidden = true;
			}
			this.fireEvent(hide ? 'background' : 'active', [this.togglers[i], el]);
			for (var fx in this.effects) obj[i][fx] = hide ? 0 : el[this.effects[fx]];
		}, this);
		this.internalChain.chain(function(){
			if (this.options.returnHeightToAuto && !this.selfHidden){
				var el = this.elements[index];
				//console.log('SET STYLE: ');
				//console.log(el);
				if (el) el.setStyle('height', 'auto');
			};
		}.bind(this));
// ########## START: EXTEND ##########
		// change attributes when panel gets expanded/collapsed
		var from = {}, to = {};
		for (var i in obj){
			var iProps = obj[i], iFrom = from[i] = {}, iTo = to[i] = {};
			for (var p in iProps){
				if (p == 'height') {
					if(iProps[p] == 0){
						this.togglers[i].setProperty('aria-expanded', false);
						this.elements[i].style.visibility = 'hidden';
						this.elements[i].setProperty('aria-hidden', true);
						this.elements[i].setProperty('tabindex', -1);
					}
					else if(iProps[p] > 0){
						this.togglers[i].setProperty('aria-expanded', true);
						this.togglers[i].setProperty('tabindex', 0);
						this.elements[i].style.visibility = 'visible';
						this.elements[i].setProperty('aria-hidden', false);
						this.elements[i].setProperty('tabindex', 0);
					}
				}
			}
		}
// ########## END: EXTEND ##########
		return useFx ? this.start(obj) : this.set(obj);
	}
// ########## START: EXTEND ##########
	// Keyevents- and listeners
	,
	keys: {
		KEY_ENTER:		13,
		KEY_CTRL:		17,	
		KEY_SPACE:		32,
		KEY_PAGEUP:		33,
		KEY_PAGEDOWN:	34,
		KEY_END:		35,
		KEY_HOME:		36,
		KEY_LEFT:		37,
		KEY_UP:			38,
		KEY_RIGHT:		39,
		KEY_DOWN:		40
	},

	getKeyCode: function(event){
		var keyCode;
		// works in IE 8 and FF 3
		if(window.event){
			keyCode = window.event.keyCode;
		} else {
			keyCode = event.code;
		}
		return keyCode;
	},
	
	onKeyDown: function(event){
		var keyCode = this.getKeyCode(event);

		if(this.options.elementWithFocus != null){
			this.options.currentIndex = parseInt(event.target.id.replace(this.options.prefix, ''));
		}
		
		var first = this.togglers[0];
		var last = this.togglers[this.togglers.length-1];
		var next = this.togglers[this.options.currentIndex + 1];
		var previous = this.togglers[this.options.currentIndex - 1];
		var thiz = this.togglers[this.options.currentIndex];
		
		// NOTE: use the setTimeout-method to call the focus()-method slightly later due to a
		// known IE-bug where focus is not rendered correctly.
		// NOTE: Use 'break' to prevent the code from running into the next case automatically.
		switch (keyCode) {
			case this.keys.KEY_LEFT:
				
				if(this.options.elementWithFocus != null){
					if (this.options.ctrl)
						break;
					else{
							if (previous == null) {
								setTimeout(function() { last.focus(); }, 0);
								next.setProperty('tabindex', 0); 
							} 
							else {
								setTimeout(function() { previous.focus(); }, 0);
								previous.setProperty('tabindex', 0);
							}
	
							if (thiz != null){
								thiz.setProperty('tabindex', -1);
							}
	
							break;
						}
				}
				break;
			case this.keys.KEY_UP:
				if (this.options.ctrl) {
					if(thiz != null) {
						setTimeout(function() {thiz.focus(); }.bind(this), 0);
					}
					break;
				} 
				else{
					if(this.options.elementWithFocus != null){
						if (previous == null) {
							setTimeout(function() { last.focus(); }, 0);
							next.setProperty('tabindex', 0); 
						} 
						else {
							setTimeout(function() { previous.focus(); }, 0);
							previous.setProperty('tabindex', 0);
						}
						if (thiz != null){
							thiz.setProperty('tabindex', -1);
						}
						break;
					}
				}
				break;
			case this.keys.KEY_DOWN:
			case this.keys.KEY_RIGHT:
				
				if(this.options.elementWithFocus != null){
					if (this.options.ctrl) {
						break;
					} 
					else {
						if (next == null) {
							setTimeout(function() { first.focus(); }, 0);
							first.setProperty('tabindex', 0);			
						} 
						else {
							setTimeout(function() { next.focus(); }, 0);
							next.setProperty('tabindex', 0);
						}
						if (thiz != null){
							thiz.setProperty('tabindex', -1);
						}
						break;
					}
				}
				break;
					
			case this.keys.KEY_SPACE:
			
			case this.keys.KEY_ENTER:

				if(this.options.elementWithFocus != null){
					if (this.options.ctrl){
						break;
					}
					event.target.fireEvent('click');
					break;
				}
				break;
			case this.keys.KEY_HOME:
				
				if(this.options.elementWithFocus != null){
					if (this.options.ctrl){
						break;
					}
					if (first != null) {
						setTimeout(function() { first.focus(); }, 0);
						first.setProperty('tabindex', 0);
					}
					if (thiz != null)
						thiz.setProperty('tabindex', -1);
					break;
				}
				break;
			case this.keys.KEY_END:
				
				if(this.options.elementWithFocus != null){
					if (this.options.ctrl){
						break;
					}
					if (last != null) {
						setTimeout(function() { last.focus(); }, 0);
						last.setProperty('tabindex', 0);
					}
					if (thiz != null){
						thiz.setProperty('tabindex', -1);
					}
					break;
				}
				break;
			case this.keys.KEY_PAGEUP:
				if (this.options.ctrl) {
					if(previous == null) {
						setTimeout(function() { last.focus(); }, 0);
						last.setProperty('tabindex', 0);
					} else {
						setTimeout(function() { previous.focus(); }, 0);
						previous.setProperty('tabindex', 0);
					}
					if (thiz != null)
						thiz.setProperty('tabindex', -1);
				}
				break;

			case this.keys.KEY_PAGEDOWN:
				if (this.options.ctrl) {
					if(next == null) {
						setTimeout(function() { first.focus(); }, 0);
						first.setProperty('tabindex', 0);
					} else {
						setTimeout(function() { next.focus(); }, 0);
						next.setProperty('tabindex', 0);
					}
					if (thiz != null)
						thiz.setProperty('tabindex', -1);

				}
				break;

			case this.keys.KEY_CTRL:
				this.options.ctrl = true;
				break;
		}
	},
	
	onKeyUp: function(event){
		var keyCode = this.getKeyCode(event);
		
		if (keyCode == this.keys.KEY_CTRL) {
			this.options.ctrl = false;
			return;
		}
	}
// ########## END: EXTEND ##########

});

/*
	Compatibility with 1.2.0
*/

var Accordion = new Class({

	Extends: Fx.Accordion,

	initialize: function(){
		this.parent.apply(this, arguments);
		var params = Array.link(arguments, {'container': Element.type});
		this.container = params.container;
	},

	addSection: function(toggler, element, pos){
		toggler = document.id(toggler);
		element = document.id(element);
		var test = this.togglers.contains(toggler);
		var len = this.togglers.length;
		if (len && (!test || pos)){
			pos = $pick(pos, len - 1);
			toggler.inject(this.togglers[pos], 'before');

// ########## START: EXTEND ##########
			// set tabindex to added section
			this.togglers.each(function(toggler) {
				toggler.setProperty('tabindex', -1);
			}, this);
			toggler.setProperty('tabindex', 0);
// ########## END: EXTEND ##########

			element.inject(toggler, 'after');
		} else if (this.container && !test){
			toggler.inject(this.container);
			element.inject(this.container);
		}
		return this.parent.apply(this, arguments);
	}

});
/*
---

script: Fx.Sort.js

description: Defines Fx.Sort, a class that reorders lists with a transition.

license: MIT-style license

authors:
- Aaron Newton

requires:
- core:1.2.4/Element.Dimensions
- /Fx.Elements
- /Element.Measure

provides: [Fx.Sort]

...
*/

/*Fx.Sort = new Class({

	Extends: Fx.Elements,

	options: {
		mode: 'vertical'
	},

	initialize: function(elements, options){
		this.parent(elements, options);
		this.elements.each(function(el){
			if (el.getStyle('position') == 'static') el.setStyle('position', 'relative');
		});
		this.setDefaultOrder();
	},

	setDefaultOrder: function(){
		this.currentOrder = this.elements.map(function(el, index){
			return index;
		});
	},

	sort: function(newOrder){
		if ($type(newOrder) != 'array') return false;
		var top = 0,
			left = 0,
			next = {},
			zero = {},
			vert = this.options.mode == 'vertical';
		var current = this.elements.map(function(el, index){
			var size = el.getComputedSize({styles: ['border', 'padding', 'margin']});
			var val;
			if (vert){
				val = {
					top: top,
					margin: size['margin-top'],
					height: size.totalHeight
				};
				top += val.height - size['margin-top'];
			} else {
				val = {
					left: left,
					margin: size['margin-left'],
					width: size.totalWidth
				};
				left += val.width;
			}
			var plain = vert ? 'top' : 'left';
			zero[index] = {};
			var start = el.getStyle(plain).toInt();
			zero[index][plain] = start || 0;
			return val;
		}, this);
		this.set(zero);
		newOrder = newOrder.map(function(i){ return i.toInt(); });
		if (newOrder.length != this.elements.length){
			this.currentOrder.each(function(index){
				if (!newOrder.contains(index)) newOrder.push(index);
			});
			if (newOrder.length > this.elements.length)
				newOrder.splice(this.elements.length-1, newOrder.length - this.elements.length);
		}
		var margin = top = left = 0;
		newOrder.each(function(item, index){
			var newPos = {};
			if (vert){
				newPos.top = top - current[item].top - margin;
				top += current[item].height;
			} else {
				newPos.left = left - current[item].left;
				left += current[item].width;
			}
			margin = margin + current[item].margin;
			next[item]=newPos;
		}, this);
		var mapped = {};
		$A(newOrder).sort().each(function(index){
			mapped[index] = next[index];
		});
		this.start(mapped);
		this.currentOrder = newOrder;
		return this;
	},

	rearrangeDOM: function(newOrder){
		newOrder = newOrder || this.currentOrder;
		var parent = this.elements[0].getParent();
		var rearranged = [];
		this.elements.setStyle('opacity', 0);
		//move each element and store the new default order
		newOrder.each(function(index){
			rearranged.push(this.elements[index].inject(parent).setStyles({
				top: 0,
				left: 0
			}));
		}, this);
		this.elements.setStyle('opacity', 1);
		this.elements = $$(rearranged);
		this.setDefaultOrder();
		return this;
	},

	getDefaultOrder: function(){
		return this.elements.map(function(el, index){
			return index;
		});
	},

	forward: function(){
		return this.sort(this.getDefaultOrder());
	},

	backward: function(){
		return this.sort(this.getDefaultOrder().reverse());
	},

	reverse: function(){
		return this.sort(this.currentOrder.reverse());
	},

	sortByElements: function(elements){
		return this.sort(elements.map(function(el){
			return this.elements.indexOf(el);
		}, this));
	},

	swap: function(one, two){
		if ($type(one) == 'element') one = this.elements.indexOf(one);
		if ($type(two) == 'element') two = this.elements.indexOf(two);
		
		var newOrder = $A(this.currentOrder);
		newOrder[this.currentOrder.indexOf(one)] = two;
		newOrder[this.currentOrder.indexOf(two)] = one;
		return this.sort(newOrder);
	}

});*/

/*
---

script: Drag.js

description: The base Drag Class. Can be used to drag and resize Elements using mouse events.

license: MIT-style license

authors:
- Valerio Proietti
- Tom Occhinno
- Jan Kassens

requires:
- core:1.2.4/Events
- core:1.2.4/Options
- core:1.2.4/Element.Event
- core:1.2.4/Element.Style
- /MooTools.More

provides: [Drag]

*/

/*var Drag = new Class({

	Implements: [Events, Options],

	options: {/*
		onBeforeStart: $empty(thisElement),
		onStart: $empty(thisElement, event),
		onSnap: $empty(thisElement)
		onDrag: $empty(thisElement, event),
		onCancel: $empty(thisElement),
		onComplete: $empty(thisElement, event),*/
		/*snap: 6,
		unit: 'px',
		grid: false,
		style: true,
		limit: false,
		handle: false,
		invert: false,
		preventDefault: false,
		stopPropagation: false,
		modifiers: {x: 'left', y: 'top'}
	},

	initialize: function(){

		var params = Array.link(arguments, {'options': Object.type, 'element': $defined});
		this.element = document.id(params.element);
		this.document = this.element.getDocument();
		this.setOptions(params.options || {});
		var htype = $type(this.options.handle);
		this.handles = ((htype == 'array' || htype == 'collection') ? $$(this.options.handle) : document.id(this.options.handle)) || this.element;
		this.mouse = {'now': {}, 'pos': {}};
		this.value = {'start': {}, 'now': {}};

		this.selection = (Browser.Engine.trident) ? 'selectstart' : 'mousedown';

		this.bound = {
			start: this.start.bind(this),
			check: this.check.bind(this),
			drag: this.drag.bind(this),
			stop: this.stop.bind(this),
			cancel: this.cancel.bind(this),
			eventStop: $lambda(false)
		};
		this.attach();
	},

	attach: function(){
		this.handles.addEvent('mousedown', this.bound.start);
		return this;
	},

	detach: function(){
		this.handles.removeEvent('mousedown', this.bound.start);
		return this;
	},

	start: function(event){
		if (event.rightClick) return;
		if (this.options.preventDefault) event.preventDefault();
		if (this.options.stopPropagation) event.stopPropagation();
		this.mouse.start = event.page;
		this.fireEvent('beforeStart', this.element);
		var limit = this.options.limit;
		this.limit = {x: [], y: []};
		for (var z in this.options.modifiers){
			if (!this.options.modifiers[z]) continue;
			if (this.options.style) this.value.now[z] = this.element.getStyle(this.options.modifiers[z]).toInt();
			else this.value.now[z] = this.element[this.options.modifiers[z]];
			if (this.options.invert) this.value.now[z] *= -1;
			this.mouse.pos[z] = event.page[z] - this.value.now[z];
			if (limit && limit[z]){
				for (var i = 2; i--; i){
					if ($chk(limit[z][i])) this.limit[z][i] = $lambda(limit[z][i])();
				}
			}
		}
		if ($type(this.options.grid) == 'number') this.options.grid = {x: this.options.grid, y: this.options.grid};
		this.document.addEvents({mousemove: this.bound.check, mouseup: this.bound.cancel});
		this.document.addEvent(this.selection, this.bound.eventStop);
	},

	check: function(event){
		if (this.options.preventDefault) event.preventDefault();
		var distance = Math.round(Math.sqrt(Math.pow(event.page.x - this.mouse.start.x, 2) + Math.pow(event.page.y - this.mouse.start.y, 2)));
		if (distance > this.options.snap){
			this.cancel();
			this.document.addEvents({
				mousemove: this.bound.drag,
				mouseup: this.bound.stop
			});
			this.fireEvent('start', [this.element, event]).fireEvent('snap', this.element);
		}
	},

	drag: function(event){
		if (this.options.preventDefault) event.preventDefault();
		this.mouse.now = event.page;
		for (var z in this.options.modifiers){
			if (!this.options.modifiers[z]) continue;
			this.value.now[z] = this.mouse.now[z] - this.mouse.pos[z];
			if (this.options.invert) this.value.now[z] *= -1;
			if (this.options.limit && this.limit[z]){
				if ($chk(this.limit[z][1]) && (this.value.now[z] > this.limit[z][1])){
					this.value.now[z] = this.limit[z][1];
				} else if ($chk(this.limit[z][0]) && (this.value.now[z] < this.limit[z][0])){
					this.value.now[z] = this.limit[z][0];
				}
			}
			if (this.options.grid[z]) this.value.now[z] -= ((this.value.now[z] - (this.limit[z][0]||0)) % this.options.grid[z]);
			if (this.options.style) {
				this.element.setStyle(this.options.modifiers[z], this.value.now[z] + this.options.unit);
			} else {
				this.element[this.options.modifiers[z]] = this.value.now[z];
			}
		}
		this.fireEvent('drag', [this.element, event]);
	},

	cancel: function(event){
		this.document.removeEvent('mousemove', this.bound.check);
		this.document.removeEvent('mouseup', this.bound.cancel);
		if (event){
			this.document.removeEvent(this.selection, this.bound.eventStop);
			this.fireEvent('cancel', this.element);
		}
	},

	stop: function(event){
		this.document.removeEvent(this.selection, this.bound.eventStop);
		this.document.removeEvent('mousemove', this.bound.drag);
		this.document.removeEvent('mouseup', this.bound.stop);
		if (event) this.fireEvent('complete', [this.element, event]);
	}

});

Element.implement({

	makeResizable: function(options){
		var drag = new Drag(this, $merge({modifiers: {x: 'width', y: 'height'}}, options));
		this.store('resizer', drag);
		return drag.addEvent('drag', function(){
			this.fireEvent('resize', drag);
		}.bind(this));
	}

});*/