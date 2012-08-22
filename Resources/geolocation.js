var win = Titanium.UI.currentWindow;

var is_android = false;

if (Titanium.Platform.name == 'android') 
{
	is_android = true;
}
	
// CREATE MAP VIEW
Ti.Geolocation.purpose = 'Getting user Location';

Titanium.Geolocation.getCurrentPosition(function(e) {
    
    if (e.error)
    {
        alert('We could not determine your current location');
        return;
    }
	 
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
	
	Ti.API.log(latitude+', '+longitude);
	
    // CREATE MAP VIEW
 	var mapview = Titanium.Map.createView(
 		{
			mapType: Titanium.Map.STANDARD_TYPE,
			region: { latitude: latitude, longitude: longitude, latitudedelta: .5, longitudedelta: .5 },
			animate: true,
			regionFit: true,
			userLocation: true,
			visible: true
		}
	);
	win.add(mapview);
				    
    //
	// XHR GEO Request
	//
	function getLocal()
	{
		// create table view data object
		var data = [];
		var xhr = Ti.Network.createHTTPClient();
		
		xhr.timeout = 1000000;	
		xhr.open("GET","http://app.vibration.al/api/geolocation?latitude="+latitude+"&longitude="+longitude);
	
		xhr.onload = function()
		{
			try
			{				
				var users_around = JSON.parse(this.responseText);

				for ( var i = 0; i < users_around.length; i++ )
				{
					// var nearby_color 		= users_around[c].color;				
					var nearby_latitude 	= users_around[i].latitude;
					var nearby_longitude 	= users_around[i].longitude;
					var nearby_color		= users_around[i].color;
						
					var pin = Titanium.Map.createAnnotation
					({
						latitude : nearby_latitude,
						longitude : nearby_longitude,
						title : "P" . i,
						image: 'images/pins/'+users_around[i].color+'.png',
						myid : i // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
					});
					mapview.addAnnotation(pin);
				}
                

			}
			catch(E){
				alert(E);
			}
		};
	
		// Get the data
		xhr.send();	
	}
		
	// Execute the twitter function above
	getLocal();
	
		/*
		//
		// CREATE ANNOTATIONS
		//		
			var annotations = [];
			
            for(var i = 1; i < 10; i ++) 
            {
                var pin = Titanium.Map.createAnnotation
				({
					latitude:latitude+i,
					longitude:longitude+i,
					title:"P" . i,
					pincolor: Titanium.Map.ANNOTATION_PURPLE,
					myid:i // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
				});
				
                // suppose mapView is your map object
                mapview.addAnnotation(pin);
            }
		
		var p2 = Titanium.Map.createAnnotation 
		({
			latitude:37.785500,
			longitude:-122.406500,
			title:"P2",
			pincolor: Titanium.Map.ANNOTATION_GREEN,
			visible: true,
			myid:2 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
		});

		mapview.addAnnotation(p2);
		

	
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
					// set location to atlanta
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
	
			if (!is_android)
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
	
				win.setToolbar([flexSpace,std,flexSpace,hyb,flexSpace,sat,flexSpace,atl,flexSpace,flexSpace,zoomin,flexSpace,zoomout,flexSpace]);
				
			} else {
				
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
		*/
	});