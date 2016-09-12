import StorageParent from './StorageParent';
import Lru from 'lru';
export default class cacheStorage extends StorageParent {
    constructor() { //构造函数
        super();
        this.Mode = new Lru();
        this.regStorageKey = /^cachestorage\_\_\_(.*)$/;
        this.get = this.getItem;
        this.put = this.setItem;
        this.remove = this.removeItem;
        this.initCheck();
    }

    namespace(key) {
        return 'cachestorage___' + key;
    }

    clear() {
        this.Mode.keys.forEach((key )=>{
            if (this.regStorageKey.test(key)) {
               this.Mode.remove(key);
            }

        });
        return this;
    }

    removeItem(key) {
        this.Mode.remove(this.namespace(key));
        return this;
    }

    getItem(key) {
        var item = this.Mode.get(this.namespace(key));
        if (!item) {
            return '';
        }
        if (item = this.parse(item)) {
            // 如果过期了，那么就返回空字符串
            if (this.isExpires(item['expires'])) {
                this.remove(key);
                return '';
            }

            return this.parse(item['val']);
        }

        return '';
    }

    setItem(key, value, expires) {
        if (!key) {
            return this;
        }

        expires = expires || 0;

        var now = +new Date(),
            localKey = this.namespace(key);

        if (typeof value === 'object') {
            value = this.stringify(value);
        }

        this.Mode.set(localKey, this.stringify({
            'val': value,
            'expires': expires ? expires * 1000 + now : ''
        }));

        return this;
    }

    expires(key, seconds) {
        if (!seconds) {
            return this;
        }

        var item = this.get(key);

        if (!item || !item['val']) {
            return this;
        }

        this.put(key, item['val'], seconds);

        return this;
    }

    initCheck() {
        for(var i=0;this.Mode.keys.length;i++){
            var key =this.Mode.keys [i];
            if (this.regStorageKey.test(key)) {
                var item = this.Mode.get(key);
                item = this.parse(item);
                if (!item) {
                    continue;
                }

                if (this.isExpires(item['expires'])) {
                    this.removeItem(key);
                }
            }

        }
    }
}