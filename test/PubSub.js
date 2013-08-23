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

// #####################################################################################################################

/**
 * @function  regexpSubscribe
 *
 * @param {Object}  test  The Object provided by the nodeunit module.
 */
exports.regexpSubscribe = function (test) {
  var baseChannel = 'regexp';
  var regexp = new RegExp((baseChannel +  '.*'), 'g');

  var numOfCall = 0;
  var targetedNumOfCall = 3;

  var onPublish = function (channel, args) {
    if (++numOfCall === targetedNumOfCall) {
      test.ok(true);
      test.done();
    }
  };

  pubsub.regexpSubscribe([regexp], onPublish);

  for (var i = 0; i < targetedNumOfCall; i++) {
    pubsub.publish([(baseChannel + '' + i)]);
  }
};

// #####################################################################################################################

/**
 * @function  regexpUnsubscribe
 *
 * @param {Object}  test  The Object provided by the nodeunit module.
 */
exports.regexpUnsubscribe = function (test) {
  var regexp = new RegExp('unsubregexp*', 'g');

  pubsub.regexpSubscribe([regexp], function () {});

  pubsub.regexpUnsubscribe([regexp]);

  test.strictEqual(pubsub._regexpSubscribings[regexp], undefined);
  test.done();
};
