import { totalTtl } from '@epic-web/cachified';
export function redisJsonCacheAdapter(redisJsonCache) {
    return {
        name: redisJsonCache.name || 'RedisJson',
        delete(key) {
            return redisJsonCache.json.del(key);
        },
        async set(key, value) {
            const ttl = totalTtl(value?.metadata);
            const createdTime = value?.metadata?.createdTime;
            // the $ is the root path of the json object
            // so we are ovewriting the entire object at the specified "key"
            const setOperation = await redisJsonCache.json.set(key, '$', value);
            // We want the user to have
            if (ttl > 0 && ttl < Infinity && typeof createdTime === 'number') {
                await redisJsonCache.expireAt(key, Math.ceil((ttl + createdTime) / 1000));
            }
            return setOperation;
        },
        async get(key) {
            const value = await redisJsonCache.json.get(key);
            if (value == null) {
                return null;
            }
            return value;
        },
    };
}
