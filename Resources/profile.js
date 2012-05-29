var win = Ti.UI.currentWindow;
win.hideNavBar();

// for now I'm going to set this to false, but later, we'll want to check the database
var profile = false;


var webview = Titanium.UI.createWebView({ url: 'http://staging.arr.ae/vibrational' });
var window = Titanium.UI.createWindow();

window.add(webview);
window.open();