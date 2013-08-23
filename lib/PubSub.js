/**
 * @class   PubSub
 */
function PubSub() {
  /** @member {Object}  _subscribings */
  this._subscribings = {};

  /** @member {Object}  _regexpSubscribings */
  this._regexpSubscribings = {};
}

// #####################################################################################################################
// #####################################################################################################################
// #####################################################################################################################

/**
 * @method  subscribe
 *
 * @param {Array}               channels    Array of Strings that are the channels onto subscribe.
 *
 * @param {subscribeCallback}   callback    The function called when a publish has been received.
 */
PubSub.prototype.subscribe = function (channels, callback) {
  var self = this;

  // Function that subscribes a single channel
  var subscribe = function (channel, cb) {
    if (self._subscribings[channel] === undefined) {
      self._subscribings[channel] = [];
    }

    self._subscribings[channel].push(cb);
  };

  for (var i = 0; i < channels.length; i++) {
    subscribe(channels[i], callback);
  }
};
/**
 * @callback  subscribeCallback
 *
 * @desc    Called when a publish has been received.
 *
 * @param {String}  channel   The channel onto which the publish has been received
 *
 * @param {Array}   args      The arguments given for the publish.
 */

// #####################################################################################################################

/**
 * @method  publish
 *
 * @desc  The first argument will be an array of channels onto publish, and then... It's up to you bro! You can give
 *        as many arguments as you want to spread ;-)
 *
 * @param {Array} channels
 *
 * @param {Mixed} args
 */
PubSub.prototype.publish = function (channels, args) {
  var self = this;
  var i = 0;

  // Function performing a publish on a single channel
  var publish = function (channel, args) {
    if (self._subscribings[channel] !== undefined) {
      for (var i = 0; i < self._subscribings[channel].length; i++) {
        self._subscribings[channel][i](channel, args);
      }
    }
  };

  // Get the arguments.
  var theArgs = [];
  for (i = 1; i < Object.keys(arguments).length; i++) {
    theArgs.push(arguments[i]);
  }

  // Publish on all the channels
  for (i = 0; i < channels.length; i++) {
    publish(channels[i], theArgs);
  }
};

// #####################################################################################################################
// #####################################################################################################################
// #####################################################################################################################

module.exports = PubSub;
