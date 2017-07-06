const body = document.getElementsByTagName('body');
const newScript = document.createElement('script');

newScript.src = chrome.extension.getURL('dist/page.js');
body[0].appendChild(newScript);
