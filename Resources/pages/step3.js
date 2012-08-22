var text = Ti.UI.createLabel({
	color: 			'#eee',
	font: 			{ fontSize: 14 },
	text: 			'Emotional-Vibrational Color Scale®',	
	top: 			15
});
step3.add(text);

var evcs = Ti.UI.createImageView({
	image: '/images/content-evcs.png',
	top: 42
});
step3.add(evcs);

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
	title: L('step3-button'), 
	width: 243
}); 

step3.add(button);

button.addEventListener('click',function(e) {
	step3.close({ opacity: 0.0, duration: 1000 }, function() {
		win.remove(step3);
		win.add(step1);
		step1.open();
	});
});