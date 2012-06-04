var win = Ti.UI.currentWindow;
win.hideNavBar();

var webview = Titanium.UI.createWebView({ url: 'http://'+Ti.Platform.locale+'.app.vibration.al' });

win.add(webview);