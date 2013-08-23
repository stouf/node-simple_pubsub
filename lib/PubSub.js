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
  if (typeof(channels) ===  'string') {
    channels = [channels];
  }

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
  if (typeof(channels) ===  'string') {
    channels = [channels];
  }

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

  // Regexp publishing
  var regexpPublish = function (channel, args) {
    var i = 0;

    for (var c in self._regexpSubscribings)  {
      if (self._regexpSubscribings[c].regexpObject.test(channel)) {
        for (i = 0; i < self._regexpSubscribings[c].functions.length; i++) {
          self._regexpSubscribings[c].functions[i](channel, args);
        }
      }

      // Reinitialise the regexp object for the next search
      self._regexpSubscribings[c].regexpObject.lastIndex = 0;
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
    regexpPublish(channels[i], theArgs);
  }
};

// #####################################################################################################################

/**
 * @method  unsubscribe
 *
 * @param {Array}     channels
 *
 * @param {Function}  fn          *Optional parameter*
 *                                If given, unsubscribe only for the given function
 */
PubSub.prototype.unsubscribe = function (channels, fn) {
  if (typeof(channels) ===  'string') {
    channels = [channels];
  }

  var self = this;

  // Unsubscribe from a single channel
  var unsubscribe = function (channel, theFn) {
    if (self._subscribings[channel] !== undefined) {

      // Delete only a single function, if defined
      if (theFn !== undefined) {
        var index = self._subscribings[channel].indexOf(thFn);
        if (index !== -1) {
          self._subscribings[channel].splice(index, 1);

          // Delete the entry if the array has become empty
          if (self._subscribings[channel].length === 0) {
            delete self._subscribings[channel];
          }
        }
        return;
      }

      // Delete all the defined functions
      delete self._subscribings[channel];
    }
  };

  // Unsubscribe each given channels
  for (var i = 0; i < channels.length; i++) {
    unsubscribe(channels[i], fn);
  }
};

// #####################################################################################################################

/**
 * @method  regexpUnsubscribe
 *
 * @param {Array}     channels    Array of regexp objects.
 *
 * @param {Function}  fn          *Optional parameter*
 *                                If given, unsubscribe only for the given function
 */
PubSub.prototype.regexpUnsubscribe = function (channels, fn) {
  if (typeof(channels) ===  'string') {
    channels = [channels];
  }

  var self = this;

  // Unsubscribe from a single channel
  var unsubscribe = function (channel, theFn) {
    if (self._regexpSubscribings[channel] !== undefined) {

      // Delete only a single function, if defined
      if (theFn !== undefined) {
        var index = self._regexpSubscribings[channel].functions.indexOf(thFn);
        if (index !== -1) {
          self._regexpSubscribings[channel].functions.splice(index, 1);

          // Delete the entry if the array has become empty
          if (self._regexpSubscribings[channel].functions.length === 0) {
            delete self._regexpSubscribings[channel];
          }
        }
        return;
      }

      // Delete all the defined functions
      delete self._regexpSubscribings[channel];
    }
  };

  // Unsubscribe each given channels
  for (var i = 0; i < channels.length; i++) {
    unsubscribe(channels[i].toString(), fn);
  }
};

// #####################################################################################################################

/**
 * @method  regexpSubscribe
 *
 * @param {Array}                     channels    Array of regexp Objects.
 *
 * @param {regexpSubscribeCallback}   callback    The function called when a publish has been received.
 */
PubSub.prototype.regexpSubscribe = function (channels, callback) {
  if (typeof(channels) ===  'string') {
    channels = [channels];
  }

  var self = this;

  // Function that subscribes a single channel
  var subscribe = function (channel, regexp, cb) {
    if (self._regexpSubscribings[channel] === undefined) {
      self._regexpSubscribings[channel] = {
        "functions": [],
        "regexpObject": regexp
      };
    }

    self._regexpSubscribings[channel].functions.push(cb);
  };

  for (var i = 0; i < channels.length; i++) {
    subscribe(channels[i].toString(), channels[i], callback);
  }
};
/**
 * @callback  regexpSubscribeCallback
 *
 * @desc    Called when a publish has been received.
 *
 * @param {String}  channel   The channel onto which the publish has been received
 *
 * @param {Array}   args      The arguments given for the publish.
 */

// #####################################################################################################################
// #####################################################################################################################
// #####################################################################################################################

module.exports = PubSub;
