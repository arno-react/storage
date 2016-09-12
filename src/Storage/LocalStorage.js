import StorageParent from './StorageParent';
export default class LocalStorage extends StorageParent {
    constructor() { //构造函数
        super();

        this.regStorageKey = /^localstorage\_\_\_(.*)$/;
        this.get = this.getItem;
        this.put = this.setItem;
        this.remove = this.removeItem;
        this.initCheck();
    }

    namespace(key) {
        return 'localstorage___' + key;
    }

    clear() {
        for (var key in window.localStorage) {
            if (this.regStorageKey.test(key)) {
                window.localStorage.removeItem(key);
            }

        }
        return this;
    }

    removeItem(key) {
        window.localStorage.removeItem(this.namespace(key));
        return this;
    }

    getItem(key) {
        var item = window.localStorage.getItem(this.namespace(key));
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

        window.localStorage.setItem(localKey, this.stringify({
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
        for (var key in window.localStorage) {
            if (this.regStorageKey.test(key)) {
                var item = window.localStorage.getItem(key);
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