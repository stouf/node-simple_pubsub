SimplePubSub
============

This module has been developed with the wish to provide a simple local pubsub system, providing a simple and easy-to-use
API.


How to install
==============

Install it either by cloning this repo, or via npm ;-)


How to use
==========

```javascript
var PubSub = require('simplepubsub');
var pubsub = new PubSub();

var onPublish = function (channel, args) {
  console.log('Message received on ' + channel + ': ' + JSON.stringify(args));

  // I do not want to receive those messages anymore!
  pubsub.unsubscribe([channel]);
};

var regexp = new RegExp('channel.*', 'g');

pubsub.subscribe(['channel1', 'channel2', 'channel3'], onPublish);
pubsub.regexpSubscribe([regexp], onPublish);

// Stop listening to the regexp after 2 seconds
setTimeout(function () {
  pubsub.regexpUnsubscribe([regexp]);
}, 2000);
```

Check out the JSDoc (JSDox) in the [doc](./doc) directory.
