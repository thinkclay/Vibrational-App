var win = Ti.UI.currentWindow;

win.hideNavBar();

// Create Arrae Logo
var arraeLogo = Titanium.UI.createImageView({
	image: "./images/arrae.png",
	left: 0,
	top: 25,
	width: 300,
	height : 'auto'
});
// Add in Arrae Logo variable
win.add(arraeLogo);

// Name nav Tab
var label = Titanium.UI.createLabel({
	color: '#999',
	text: 'Profile Content',
	font:
	{
		fontSize:20,
		fontFamily:'Helvetica Neue'
	},
	textAlign: 'center'
});

// Add in label for tab
win.add(label);