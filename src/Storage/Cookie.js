import StorageParent from './StorageParent';
export default class Cookie extends StorageParent {
    constructor() { //构造函数
        super();

        this.regStorageKey = /^cookie\_\_\_(.*)$/;
        this.get = this.getItem;
        this.put = this.setItem;
        this.remove = this.removeItem;
        this.initCheck();
    }

    namespace(key) {
        return 'cookie___' + key;
    }

    clear() {
        var cookies = document.cookie.split(';');
        cookies. forEach((value)=> {
                let key = value.split('=')[0];
                if (this.regStorageKey.test(key)) {
                    this.remove(key);
                }
            }
        );
        return this;
    }

    removeItem(key) {

        var exp = new Date();
        exp.setTime(exp.getTime() - 1000);
        var cval = this.getCookie(key);
        if (cval) {
            document.cookie = this.namespace(key) + '=' + cval + ';expires=' + exp.toGMTString()+"; path=/";
        }

        return this;
    }

    getCookie(key) {
        var arr, reg = new RegExp('(^| )' + this.namespace(key) + '=([^;]*)(;|$)');
        if (arr = document.cookie.match(reg)) {
            return arr[2];
        } else {
            return null;
        }

    }

    getItem(key) {
        var item = this.getCookie(key);
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
            value = this.this.stringify(value);
        }

        document.cookie = localKey + '=' + this.stringify({
                'val': value,
                'expires': expires ? expires * 1000 + now : ''
            })+"; path=/";

        return this;
    }

    expires(key, seconds) {
        if (!seconds) {
            return this;
        }
        var item = this.parse(this.getCookie(key));
        if (!item || !item['val']) {
            return this;
        }
        this.setItem(key, item['val'], seconds);

        return this;
    }

    initCheck() {
        var cookies = document.cookie.split(';');
        cookies. forEach((value)=> {
                let key = value.split('=')[0];
                if (this.regStorageKey.test(key)) {
                    var item = this.getCookie(key);
                    item = this.parse(item);
                    if (!item) {
                        return;
                    }
                    if (this.isExpires(item['expires'])) {
                        this.removeItem(key);
                    }
                }

            }
        );
    }
}
