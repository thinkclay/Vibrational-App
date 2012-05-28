var win = Titanium.UI.currentWindow;

var isAndroid = false;

if (Titanium.Platform.name == 'android') 
{
	isAndroid = true;
}

//
// CREATE ANNOTATIONS
//		
	var testParams = {
		latitude:39.984577,
		longitude:-105.084774,
		title:"Clay's Naughty No No Zone",
		subtitle:'Titty Sprinkles',
		animate:true,
		leftButton:'./images/arrae.jpg',
		rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		myid:1 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
	};
	
	// Declare testParams as testZone annotation
	var testZone = Titanium.Map.createAnnotation(testParams);

	var homeBase = Titanium.Map.createAnnotation
	({
		latitude:39.735673,
		longitude:-104.993806,
		title:"Jon's Shag Pad",
		subtitle:'Denver, Co',
		pincolor:Titanium.Map.ANNOTATION_GREEN,
		animate:true,
		rightButton: './images/apple_logo.jpg',
		myid:2 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
	});
	
	var atlantaParams = {
		latitude:39.768156,
		longitude:-104.95235,
		title:"Atlanta, GA",
		title: 'Arrae',
		subtitle:'Creative Agency',
		animate:true,
		leftButton:'./images/arrae.jpg',
		rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		myid:3 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
	};


	if (!isAndroid) {
		atlantaParams.pincolor = Titanium.Map.ANNOTATION_PURPLE;
	} else {
		atlantaParams.pinImage = "./images/map-pin.png";
	}

	var atlanta = Titanium.Map.createAnnotation(atlantaParams);

// CREATE MAP VIEW

	// Set predefined Annotations on map
	var presetAnnotations = [atlanta,homeBase,testZone];
	
	Ti.Geolocation.purpose = 'Getting user Location';
	
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
	    if (e.error)
	    {
	        alert('HFL cannot get your current location');
	        return;
	    }
	 
	    var longitude = e.coords.longitude;
	    var latitude = e.coords.latitude;
	    var altitude = e.coords.altitude;
	    var heading = e.coords.heading;
	    var accuracy = e.coords.accuracy;
	    var speed = e.coords.speed;
	    var timestamp = e.coords.timestamp;
	    var altitudeAccuracy = e.coords.altitudeAccuracy;
	    
	    //
	    //CREATE MAP VIEW
	    //
	
	 	var mapview = Titanium.Map.createView
		({
			mapType: Titanium.Map.STANDARD_TYPE,
			region: {latitude: latitude, longitude: longitude, latitudeDelta:0.0001, longitudeDelta:0.0001},
			animate:true,
			regionFit:true,
			userLocation:true,
			visible: true,
			annotations:presetAnnotations
		});
		
	    win.add(mapview);
	    
	    if (!isAndroid)
	    {
			mapview.addAnnotation(atlanta);
		}
		
		mapview.selectAnnotation(testZone);
		
		/*
		//
		// NAVBAR BUTTONS
		//
			var removeAll = null;
			var atl = null;
			var sat = null;
			var std = null;
			var hyb = null;
			var zoomin = null;
			var zoomout = null;
	
			 // PRE-DEFINED REGIONS
			var userLocation = {latitude: latitude, longitude: longitude,animate:true,latitudeDelta:.01, longitudeDelta:.01};
		
		
			var wireClickHandlers = function() 
			{
				removeAll.addEventListener('click', function() 
				{
					mapview.removeAllAnnotations();
				});
		
				atl.addEventListener('click', function()
				{
					// set location to User Location
					mapview.setLocation(userLocation);
	
					// activate annotation
					mapview.selectAnnotation(presetAnnotations[3].title, true);
					Ti.API.error("CLICKED Home");
				});
			
				sat.addEventListener('click',function() 
				{
					// set map type to satellite
					mapview.setMapType(Titanium.Map.SATELLITE_TYPE);
				});
	
				std.addEventListener('click',function() 
				{
					// set map type to standard
					mapview.setMapType(Titanium.Map.STANDARD_TYPE);
				});
	
				hyb.addEventListener('click',function() 
				{
					// set map type to hybrid
					mapview.setMapType(Titanium.Map.HYBRID_TYPE);
				});
	
				zoomin.addEventListener('click',function() 
				{
					mapview.zoom(1);
				});
	
				zoomout.addEventListener('click',function() 
				{
					mapview.zoom(-1);
				});	
			};
	
			if (!isAndroid)
			{
				removeAll = Titanium.UI.createButton
				({
					style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
					title:'Remove All'
				});
				
				win.rightNavButton = removeAll;
	
				//
				// TOOLBAR BUTTONS
				//
	
				// button to change to My Pad
				atl = Titanium.UI.createButton
				({
					style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
					title:'My Location'
				});
	
				mapview.addEventListener('complete', function()
				{
					Ti.API.info("map has completed loaded region");
				});	
	
				var flexSpace = Titanium.UI.createButton
				({
					systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
				});
		
				// button to change map type to SAT
				sat = Titanium.UI.createButton
				({
					title:'Sat',
					style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
				});
				
				// button to change map type to STD
				std = Titanium.UI.createButton
				({
					title:'Std',
					style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
				});
				
				// button to change map type to HYBRID
				hyb = Titanium.UI.createButton
				({
					title:'Hyb',
					style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
				});
				
				// button to zoom-in
				zoomin = Titanium.UI.createButton
				({
					title:'+',
					style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
				});
				
				// button to zoom-out
				zoomout = Titanium.UI.createButton
				({
					title:'-',
					style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
				});
	
				wireClickHandlers();
	
				//win.setToolbar([flexSpace,std,flexSpace,hyb,flexSpace,sat,flexSpace,atl,flexSpace,flexSpace,zoomin,flexSpace,zoomout,flexSpace]);
				
			} 
			
			 
			else 
			{
				
				var activity = Ti.Android.currentActivity;
				activity.onCreateOptionsMenu = function(e) 
				{
					var menu = e.menu;
	
					atl = menu.add({title : 'My Location'});
					sat = menu.add({title : 'Sat'});
					std = menu.add({title : 'Std'});
					hyb = menu.add({title : 'Hyb'});
					zoomin = menu.add({title : "Zoom In"});
					zoomout = menu.add({title : 'Zoom Out'});
					removeAll = menu.add({title:'Remove All'});
	
					wireClickHandlers();
				};	
			}
			*/
			
			
			//
			// EVENT LISTENERS
			//
	
			// region change event listener
			mapview.addEventListener('regionChanged',function(evt)
			{
				Titanium.API.info('maps region has updated to '+evt.longitude+','+evt.latitude+','+evt.latitudeDelta+','+evt.longitudeDelta);
	  			Titanium.API.info(mapview.latitudeDelta+','+mapview.longitudeDelta);
	   		
	   			if(evt.latitudeDelta === mapview.latitudeDelta)
	    		{
	    		    Titanium.API.info('latitudeDelta property matches event values');
	   			}
	   		
	    		if(evt.longitudeDelta === mapview.longitudeDelta)
	    		{
	        		Titanium.API.info('longitudeDelta property matches event values');
	    		}
			});
	
			var annotationAdded = false;
		
			// map view click event listener
			mapview.addEventListener('click',function(evt)
			{
	
				// map event properties
				var annotation = evt.annotation;
				var title = evt.title;
				var clickSource = evt.clicksource;
	
				// custom annotation attribute
				var myid = (evt.annotation)?evt.annotation.myid:-1;
	
				Ti.API.info('mapview click clicksource = ' + clickSource);
			
				// use custom event attribute to determine if atlanta annotation was clicked
				if (myid == 3 && evt.clicksource == 'rightButton')
				{
					//  change the annotation on the fly
					evt.annotation.rightView = Titanium.UI.createView({width:20,height:20,backgroundColor:'red'});
					evt.annotation.leftView = Titanium.UI.createView({width:20,height:20,backgroundColor:'#336699'});
					evt.annotation.title = "Arrae HQ";
					evt.annotation.pincolor = Titanium.Map.ANNOTATION_PURPLE;
					evt.annotation.subtitle = 'Only Cool People Work Here';
					evt.annotation.leftButton = './images/tab_about.png';
				}
			
				if (myid == 2)
				{
					if(annotationAdded === false)
					{
						mapview.addAnnotation(mountainView);
						annotationAdded=true;
					}		
				else
				{
					mapview.removeAnnotation(mountainView);
					annotationAdded=false;
				}
			}
		});
	
		// annotation click event listener (same as above except only fires for a given annotation)
		atlanta.addEventListener('click', function(evt)
		{
			// get event properties
			var annotation = evt.source;
			var clicksource = evt.clicksource;
			Ti.API.info('atlanta annotation click clicksource = ' + clicksource);
		});
	
		homeBase.addEventListener('click', function(evt)
		{
	
			// get event properties
			var annotation = evt.source;
			var clicksource = evt.clicksource;
			Ti.API.info('Home Base annotation click clicksource = ' + clicksource);
		});
	
		testZone.addEventListener('click', function(evt)
		{
			// get event properties
			var annotation = evt.source;
			var clicksource = evt.clicksource;
			Ti.API.info('testZone annotation click clicksource = ' + clicksource);
		});	
	});