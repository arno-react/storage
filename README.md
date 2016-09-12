# storage


```js
    var storage = require('./arno-storage.js');
    var localStorage =new storage();
    var  cookie =new storage('cookie');
    var  lru =new storage('lru');
```

-  .get(key) 取

-  .put(key, value, expires)　设置

-  .remove(key)　删除

-  .clear()　清空
　
-  .expires(key, seconds)　设有效期　key已存的

