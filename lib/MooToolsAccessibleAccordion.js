window.addEvent('domready', function(){
	
	var el = document.id('sliderMooToolsAccessible');
	
    //create our Accordion instance
    var myAccordion = new Accordion(document.id('accordionMooToolsAccessible'), 'h3.togglerAccordionMooToolsAccessible', 'div.elementAccordionMooToolsAccessible', {
        opacity: false,
        onActive: function(toggler, element){
            toggler.addClass('active');
        },
        onBackground: function(toggler, element){            
            toggler.removeClass('active');
        },
		onComplete: function(){
			if(el) {
				document.id('slider1ValMooToolsAccessible').position({
					relativeTo: el.getElement('.knob'),
					position: 'upperLeft',
					edge: 'bottomRight'
				});
			}
		}
    });
});
