module.exports = function callback_stripper(){
    return function stripper(req, res, next) {
        if (/(\&?)(callback=\w+)(\&|$|#|\?)/.exec(req.url)) {
            var callback = RegExp.$1;
            // Either the callback is after other params, or the
            // first.  if it is the first, then the first match is
            // undef, and I want to strip off the & that comes after
            // the callback
            if(!callback){
                callback = RegExp.$2+RegExp.$3;
            }else{
                callback = callback + RegExp.$2;
            }
            var url = req.url;
            req.url = req.url.replace(callback, '');
            // wrap writeHead to restore original url
            // but does this work on error conditions?
            var writeHead = res.writeHead;
            res.writeHead = function(code, headers) {
                req.url = url;
                res.writeHead = writeHead;
                res.writeHead(code,headers);
                return;
            }
        }else{
            console.log('regex fail '+req.url);
        }
        next();
        return;
    };
};
