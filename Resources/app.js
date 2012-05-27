/**
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.  
 * A starting point for tab-based application with multiple top-level windows. 
 * Requires Titanium Mobile SDK 1.8.0+.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */
 
// determine platform and form factor and render approproate components
var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;


/**
 * This sets the background color of the master UIView (when there are no windows/tab groups on it)
 * After the user identifies their vibrational color, we'll want the background color set to reflect that
 */ 
Titanium.UI.setBackgroundColor('#000');


/**
 * Create Application Windows
 * 
 * Windows are loaded as static .js files like a static HTML site would be
 * All we have to do here is create the wrappers / window object to correspond with a tab
 */
var about = Titanium.UI.createWindow({  
    title: L('about'),
    url: 'about.js',
    navBarHidden: true
});	

var profile = Titanium.UI.createWindow({  
	title: L('profile'),
	url: 'profile.js',
	navBarHidden: true
});

var compass = Titanium.UI.createWindow({  
	title: L('tab-location'),
	url: 'geolocation.js',
	navBarHidden: true
});


/**
 * Creat Application Tabs
 * 
 * Tabs are auto rendered and formatted on each device matching the most native settings / feel
 */
var tabGroup = Titanium.UI.createTabGroup();

var aboutTab = Titanium.UI.createTab({  
	icon: './images/tab_about.png',
	title: 'About',
	window: about
});

var profileTab = Titanium.UI.createTab({  
	icon: './images/tab_profile.png',
	title: 'Profile',
	window: profile
});

var compassTab = Titanium.UI.createTab({  
	icon:'./images/tab_compass.png',
	title:'Compass',
	window:compass
});

tabGroup.addTab(aboutTab);  
tabGroup.addTab(profileTab);  
tabGroup.addTab(compassTab);  

tabGroup.open();	