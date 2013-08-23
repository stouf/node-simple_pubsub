var PubSub = require('../lib/PubSub.js');
var pubsub = new PubSub();

// #####################################################################################################################
// #####################################################################################################################
// #####################################################################################################################

/**
 * @function  pubsub
 *
 * @param {Object}  test  The Object provided by the nodeunit module.
 */
exports.pubsub = function (test) {
  var theChannel = 'test';

  var onSubscribe = function (channel, args) {
    test.strictEqual(theChannel, channel);
    test.strictEqual(args.length, 3);
    test.done();
  };

  pubsub.subscribe([theChannel], onSubscribe);

  pubsub.publish([theChannel], 1, 2, 3);
};

// #####################################################################################################################

/**
 * @function  unsubscribe
 *
 * @param {Object}  test  The Object provided by the nodeunit module.
 */
exports.unsubscribe = function (test) {
  var theChannel = 'unsubscribe';

  pubsub.subscribe([theChannel], function () {});

  // Now let's unsubscribe
  pubsub.unsubscribe([theChannel]);
  test.strictEqual(pubsub._subscribings[theChannel], undefined);

  test.done();
};
