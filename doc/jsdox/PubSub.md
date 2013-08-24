class PubSub
------------
**Members**

**_subscribings**:  *Object*,  


**_regexpSubscribings**:  *Object*,  


**Methods**

PubSub.subscribe(channels, callback, channel, args)
---------------------------------------------------
**Parameters**

**channels**:  *Array*,  Array of Strings that are the channels onto subscribe.

**callback**:  *subscribeCallback*,  The function called when a publish has been received.

**channel**:  *String*,  The channel onto which the publish has been received

**args**:  *Array*,  The arguments given for the publish.

PubSub.publish(channels, args)
------------------------------
**Parameters**

**channels**:  *Array*,  


**args**:  *Mixed*,  


PubSub.unsubscribe(channels, fn)
--------------------------------
**Parameters**

**channels**:  *Array*,  


**fn**:  *Function*,  *Optional parameter* If given, unsubscribe only for the given function

PubSub.regexpUnsubscribe(channels, fn)
--------------------------------------
**Parameters**

**channels**:  *Array*,  Array of regexp objects.

**fn**:  *Function*,  *Optional parameter* If given, unsubscribe only for the given function

PubSub.regexpSubscribe(channels, callback, channel, args)
---------------------------------------------------------
**Parameters**

**channels**:  *Array*,  Array of regexp Objects.

**callback**:  *regexpSubscribeCallback*,  The function called when a publish has been received.

**channel**:  *String*,  The channel onto which the publish has been received

**args**:  *Array*,  The arguments given for the publish.

