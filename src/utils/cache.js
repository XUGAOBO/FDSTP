import store from 'store'
import cookie from 'js-cookie'

let __session__ = sessionStorage
let __local__ = localStorage

const TYPES = ['session', 'local', 'store', 'cookie'];
const DEFAULT_CACHE = TYPES[0]

const cache = {
    set: (key, value, type = DEFAULT_CACHE) => {
        !(type in TYPES) && (type = DEFAULT_CACHE);
        cache[type].set(key, value);
        return cache[type];
    },
    get: (key, type = DEFAULT_CACHE) => {
        !(type in TYPES) && (type = DEFAULT_CACHE);
        return cache[type].get(key);
    },
    clear: (type = DEFAULT_CACHE) => {
        !(type in TYPES) && (type = DEFAULT_CACHE);
        cache[type].clear();
        return cache[type];
    },
    remove: (key, type = DEFAULT_CACHE) => {
        cache[type].remove(key);
        return cache;
    },
    session: {
        set: (key, value) => {
            __session__.setItem(key, JSON.stringify(value));
            return cache.session;
        },
        get: (key) => {
            let value = __session__.getItem(key);
            return key && JSON.parse(value);
        },
        remove: (key) => {
            __session__.removeItem(key);
            return cache.session;
        },
        clear: () => {
            __session__.clear();
            return cache.session;
        }
    },
    local: {
        set: (key, value, isTimeout = false, expireTime = 1000 * 60 * 60 * 24) => {
            // 如果开启过期，默认过期时间为一天 1000 * 60 * 60 * 24，时间单位为毫秒
            let localObj = {
                now: +new Date(),
                expire: isTimeout ? expireTime : 0,
                data: value
            }
            __local__.setItem(key, JSON.stringify(localObj));
            return cache.local;
        },
        get: (key) => {
            let value = __local__.getItem(key);
            let localData = null;
            let data = null;
            // 是否存在key对应的localstorage值
            if (value) {
                localData = JSON.parse(value);
            }
            // 是否存在data属性，有为新的数据格式
            if (localData && localData.data) {
                // 数据是否过期
                let diff = (localData.expire > 0) && ((+new Date()) - (localData.now * 1) > localData.expire);
                // 过期，删除数据
                if (diff) {
                    cache.local.remove(key);
                } else {
                    data = localData.data;
                }
            } else {
                data = localData
            }
            return data;
        },
        remove: (key) => {
            __local__.removeItem(key);
            return cache.local;
        },
        clear: () => {
            __local__.clear();
            return cache.local;
        }
    },
    store: store.enabled ? store : cookie,
    cookie: {
        // expire Day
        set: (key, value, expires = 7) => {
            cookie.set(key, value);
            return cache.cookie;
        },
        get: (key) => {
            return cookie.get(key);
        },
        remove: (key) => {
            cookie.remove(key);
            return cache.cookie;
        },
        clear: () => {
            cookie.remove('changeCityPop');
            return cache.cookie;
        }
    }
}

if (!store.enabled) {
    alert('For better use of the experience, close privacy mode');
    cache.store = cache.cookie;
}


export default cache
