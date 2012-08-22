var header = Ti.UI.createImageView({
	image: 			'/images/header-about.png',
	left: 			15,
	top:			15,
});
step1.add(header);
 	
var text = Ti.UI.createLabel({
	color: 			'#eee',
	font: 			{ fontSize: 13 },
	left: 			15,
	right: 			15,
	text: 			L('step1-text'),	
	textAlign: 		Ti.UI.TEXT_ALIGNMENT_LEFT,
	top: 			48,
	height: 		'auto',
	width: 			'auto'
});
step1.add(text);

var twitter_header = Ti.UI.createImageView({
	bottom: 		'30.5%',
	image:			'/images/header-twitter.png',
	left: 			15,
	zIndex: 		3
});
step1.add(twitter_header);

var twitter_header_background = Titanium.UI.createView({ 
	backgroundGradient: {
		type:		'linear',
		colors:[
			{ color: '#252525', position: 0.0 }, 
			{ color: '#010101', position: 1 }
		]
	},
	bottom:			'30%',
	height:			23,
	width:			'100%',
	zIndex:			2
});
step1.add(twitter_header_background);

/**
 * Instructions Window and actions
 */
var button = Titanium.UI.createButton({ 
	backgroundImage: '/images/button-more.png',
	backgroundSelectedImage: '/images/button-more-hover.png',
	color: '#0d0d3f',
	height: 53, 
	selectedColor: '#cdcad0',
	title: L('step1-button'), 
	top: '48%',
	width: 243
}); 

step1.add(button);

button.addEventListener('click',function(e) {
	step1.close({ opacity: 0.0, duration: 1000 }, function() {
		win.remove(step1);		
		win.add(step2);
		step2.open();
	});
});


/**
 * Create a twitter feed in table form by passing a screen name
 * 
 * @param	string	screen_name	the twitter handle without the @ sign
 * @return	void
 */
function getTweets(screen_name)
{
	// create table view data object
	var data = [];
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.timeout = 1000000;	
	xhr.open("GET","http://api.twitter.com/1/statuses/user_timeline.json?screen_name="+screen_name);

	xhr.onload = function()
	{
		try
		{
			var tweets = eval('('+this.responseText+')');
		
			for (var c = 0; c < tweets.length; c++){

				var tweet 	= tweets[c].text;				
				var user 	= tweets[c].user.screen_name;
				var avatar 	= tweets[c].user.profile_image_url;
				
				// Assign the specific row
				var row = Ti.UI.createTableViewRow({
					color			: '#fff',
					backgroundColor : '#eee',
					height			: 65			
				});

				// Tweet text
				var label = Ti.UI.createLabel({
					bottom	: 5,
					color	: '#222',
					font	: { fontSize: 12 },
					left	: 63,
					right	: 10,					
					text	: tweet,
					top		: 5
				});
				row.add(label);
				
				// Avatar
				var img = Ti.UI.createImageView({
					height	: 32,
					image	: avatar,
					left	: 15,
					top		: 16,
					width	: 32
				});
				row.add(img);
				
				data[c++] = row;
			}
			// Create the tableView and add it to the window.
			var tableview = Titanium.UI.createTableView({
				data: data,
				layout	: 'vertical',
				bottom	: 0,
				height	: '30%',
				separatorColor: '#999'
			});
			step1.add(tableview);
		}
		catch(E){
			alert(E);
		}
	};
	// Get the data
	xhr.send();	
}

// Execute the twitter function above
getTweets('just2choices');