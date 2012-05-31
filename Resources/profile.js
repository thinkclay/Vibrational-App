var win = Ti.UI.currentWindow;
win.hideNavBar();

var webview = Titanium.UI.createWebView({ url: 'http://app.vibration.al' });

win.add(webview);