// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	Titanium.UI.setBackgroundColor('#000');
	
// create tab group
	var tabGroup = Titanium.UI.createTabGroup();

//
// Windows
//
 
// Create About
	// Create Window for About
	var about = Titanium.UI.createWindow
	({  
	    title:'About',
	    navBarHidden: true 
	});	

	// Create Arrae Logo
	var arraeLogo = Titanium.UI.createImageView
	({
		image: "./images/arrae.png",
		left: 0,
		top: 25,
		width: 300,
		height : 'auto'
	});

	// Add in Arrae Logo variable
	about.add(arraeLogo);

	// Create the nav Tab
	var aboutTab = Titanium.UI.createTab
	({  
    	icon:'./images/tab_about.png',
    	title:'About',
   		window:about
	});

	// Name nav Tab
	var aboutLabel = Titanium.UI.createLabel
	({
		color:'#999',
		text:'Vibrational App Built By Arrae',
		font:
		{
			fontSize:20,
			fontFamily:'Helvetica Neue'
		},
		textAlign:'center'
	});

	// Add in label for tab
	about.add(aboutLabel);


// Create Profile
	// Create Window for Profile
	var profile = Titanium.UI.createWindow
	({  
  		title:'Profile',
    	navBarHidden: true
	});
	
	// Create the nav Tab
	var profileTab = Titanium.UI.createTab
	({  
   		icon:'./images/tab_profile.png',
   		title:'Profile',
    	window:profile
	});

	// Name nav tab
	var profileLabel = Titanium.UI.createLabel({
		color:'#999',
		text:'Profile Content',
		font:
		{
			fontSize:20,
			fontFamily:'Helvetica Neue'
		},
		textAlign:'center'
	});
	
	// Add in label for tab
	profile.add(profileLabel);

// Create Compass
	// Create Window for Compass
	var compass = Titanium.UI.createWindow
	({  
    	title:'Compass',
    	url: 'geolocation.js',
    	navBarHidden: true
	});
	
	// Create the nav Tab
	var compassTab = Titanium.UI.createTab({  
    	icon:'./images/tab_compass.png',
    	title:'Compass',
    	window:compass
	});

	// Name nav Tab
	var compassLabel = Titanium.UI.createLabel({
		color:'#999',
		font:
		{
			fontSize:20,
			fontFamily:'Helvetica Neue'
		}
	});	

	// Add in label for compass tab
	compass.add(compassLabel);

//
// Tabs
//
	tabGroup.addTab(aboutTab);  
	tabGroup.addTab(profileTab);  
	tabGroup.addTab(compassTab);  

// open tab group
	tabGroup.open();
	