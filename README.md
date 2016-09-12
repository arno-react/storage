# storage


```js
    var storage = require('./arno-storage.js');
    var localStorage =new storage();
    var  cookie =new storage('cookie');
```

-  .get(key)

-  .put(key, value, expires)

-  .remove(key)

-  .clear()

-  .expires(key, seconds)
