# Callback Stripper

This is a small function to strip query parameters that fit the form
`callback=blablabla`.  The idea is to use this after
[connect-jsonp](https://github.com/steelThread/connect-jsonp) and
before Connect.cache.  

A much better solution is to use the `{filter:true}` parameter option for the
`connect-jsonp` middleware module.  But it didn't exist when I wrote
this and I thought I'd push it out anyway.

# Example use:

    var connect = require('connect');
    var jsonp = require('connect-jsonp');
    var callback_stripper = require('callback_stripper');
    server.use("/jsonpservice/"
           ,jsonp()
           ,callback_stripper()   // have to strip the callback param for caching
           ,connect.cache(5000)  // cannot cache if jsonp param is always unique!
           ,some_json_service()
           ,connect.errorHandler()
          );


# Installation

    $ git clone git://github.com/jmarca/callback_stripper.git
    $ cd callback_stripper
    $ npm link .

# Why the name?

Using callback_striper should make you feel slightly dirty.  Any
module after this one will not know that query has a callback string
in it.

# Credit

- Senchalabs for Connect.  I mostly modeled this code after the filter module.
- steelThread for the `connect-jsonp` middleware
