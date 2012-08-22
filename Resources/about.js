var win = Ti.UI.currentWindow;
win.hideNavBar();

/**
 * Step 1
 */
var step1 = Ti.UI.createWindow({ backgroundImage: '/images/app-background.png', top: 0 });
Ti.include('/pages/step1.js');
win.add(step1);
step1.open();

var step2 = Ti.UI.createWindow({ backgroundImage: '/images/app-background.png', top: 0 });
Ti.include('/pages/step2.js');

var step3 = Ti.UI.createWindow({ backgroundImage: '/images/app-background.png', top: 0 });
Ti.include('/pages/step3.js');

