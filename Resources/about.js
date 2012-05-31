var win = Ti.UI.currentWindow;

win.hideNavBar();

var label = Ti.UI.createLabel({
	color: '#eee',
	font: { fontSize: 16 },
	left: 15,
	right: 15,
	shadowColor: '#333',
	shadowOffset: {x:1, y:1},
	text: 'Welcome to Just2Choices Vibrational App. With this app you can find the vibes you are giving off',
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	top: 30,
	height: 'auto',
	width: 'auto'
});
win.add(label);


var twitter_name = 'just2choices';

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
					text	: tweet,
					font	: { fontSize: 12 },
					top		: 5,
					bottom	: 5,
					left	: 60,
					right	: 10,					
					color	: '#222'			
				});
				row.add(label);
				
				// Avatar
				var img = Ti.UI.createImageView({
					image	: avatar,
					width	: 35,
					height	: 35,
					top		: 15,
					bottom	: 5,
					left	: 10
				});
				row.add(img);
				
				data[c++] = row;
			}
			// Create the tableView and add it to the window.
			var tableview = Titanium.UI.createTableView({
				data: data,
				layout	: 'vertical',
				bottom	: 0,
				height	: 130,
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
getTweets(twitter_name);