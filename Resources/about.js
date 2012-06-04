var win = Ti.UI.currentWindow;

win.hideNavBar();


var background = Ti.UI.createImageView({
	image:			'images/bg-logo.png',
	top: 			'22%',
	zIndex: 		0
});
win.add(background);


var header = Ti.UI.createImageView({
	image: 			'images/text-j2c-vibrational.png',
	left: 			15,
	top:			20,
});
win.add(header);

 	
var about = Ti.UI.createLabel({
	color: 			'#eee',
	font: 			{ fontSize: 15, lineHeight: 20 },
	left: 			15,
	right: 			15,
	text: 			L('about-text'),	
	textAlign: 		Ti.UI.TEXT_ALIGNMENT_LEFT,
	top: 			60,
	height: 		'auto',
	width: 			'auto'
});
win.add(about);


var twitter_header_background = Titanium.UI.createView({ 
	backgroundGradient: {
		type:		'linear',
		colors:[
			{ color: '#252525', position: 0.0 }, 
			{ color: '#010101', position: 1 }
		]
	},
	bottom:			'30%',
	height:			24,
	width:			'100%',
	zIndex:			2
});
win.add(twitter_header_background);

var twitter_header = Ti.UI.createImageView({
	bottom: 		'30.5%',
	height:			18,
	image:			'images/text-j2c-twitter.png',
	left: 			15,
	width:			183,
	zIndex: 		3
});
win.add(twitter_header);


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
			win.add(tableview);
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