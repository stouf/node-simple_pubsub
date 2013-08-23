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
as many arguments as you want to spread ;-)




**Parameters**

**channels**:  *Array*,  


**args**:  *Mixed*,  


PubSub.unsubscribe(channels, fn)
--------------------------------
If given, unsubscribe only for the given function


**Parameters**

**channels**:  *Array*,  


**fn**:  *Function*,  *Optional parameter*

