// #!/usr/bin/env node
/* eslint-disable no-undef */
const launcher = require('chrome-launcher'),
    path = require('path');

const extensionPath = path.resolve(__dirname, '../extension');

launcher.launch({
    startingUrl: 'chrome://extensions/',
    enableExtensions: true,
    chromeFlags: [`--load-extension=${extensionPath}`]
}).then(chrome => {
    console.log(`Chrome debugging port running on ${chrome.port}`);
}); 