var request = new XMLHttpRequest();
request.open('POST', 'webvipolyfill:writetosystemlog');
var textEncoder = new TextEncoder();
var textAsArrayBuffer = textEncoder.encode('hello world!');
var blob = new Blob([textAsArrayBuffer]);
request.send(blob);
