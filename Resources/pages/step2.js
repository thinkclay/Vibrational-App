var text = Ti.UI.createLabel({
	color: 			'#eee',
	font: 			{ fontSize: 13 },
	left: 			15,
	right: 			15,
	text: 			L('step2-text'),	
	textAlign: 		Ti.UI.TEXT_ALIGNMENT_LEFT,
	top: 			15,
	height: 		'auto',
	width: 			'auto'
});
step2.add(text);

/**
 * Instructions Window and actions
 */
var button = Titanium.UI.createButton({ 
	backgroundImage: '/images/button-more.png',
	backgroundSelectedImage: '/images/button-more-hover.png',
	bottom: '3%',
	color: '#0d0d3f',
	height: 53, 
	selectedColor: '#cdcad0',
	title: L('step2-button'), 
	width: 243
}); 

step2.add(button);

button.addEventListener('click', function(e) {
	step2.close({ opacity: 0.0, duration: 1000 }, function() {
		win.remove(step2);
		
		win.add(step3);
		step3.open();
	});
});