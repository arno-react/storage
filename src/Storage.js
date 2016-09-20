import LocalStorage from './Storage/LocalStorage';
import Cookie from './Storage/Cookie';
import CacheStorage from './Storage/CacheStorage';

export default class Storage {
    constructor(name) { //构造函数
        if (name == 'cookie') {
            this.Mode = new Cookie();
        }else if (name == 'lru') {
            this.Mode = new CacheStorage();
        }else{
            this.Mode = new LocalStorage();
        }
        
    }

    get(key) {
       return this.Mode.get(key);

    }

    put(key, value, expires) {
         this.Mode.put(key, value, expires);

    }

    remove(key) {

         this.Mode.remove(key);

    }

    clear() {

          this.Mode.clear();

    }

    expires(key, seconds) {

          this.Mode.expires(key, seconds);

    }

}
