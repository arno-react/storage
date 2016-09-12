export default class StorageParent {
    constructor() { //构造函数

    }

    isExpires(expires) {
        var now = +new Date();

        if (!expires) {
            return false;
        }

        if (now > parseInt(expires, 10)) {
            return true;
        }

        return false;
    }

    parse(value) {
        try {
            value = JSON.parse(value);
        }
        catch (err) {
            return value;
        }
        return value;
    }

    stringify(value) {
        return JSON.stringify(value);
    }

}