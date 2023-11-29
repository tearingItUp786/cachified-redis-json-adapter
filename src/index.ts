import type {Cache, CacheEntry} from '@epic-web/cachified'
import {totalTtl} from '@epic-web/cachified'

interface RedisLikeCache {
  name?: string
  set(
    key: string,
    value: string,
    options?: {
      EXAT: number
    },
  ): Promise<string | null>
  get(key: string): Promise<string | null>
  del(key: string): Promise<unknown>
}

export interface RedisJsonLikeCache extends RedisLikeCache {
  json: {
    set(key: string, path: string, value: Record<string, any>): Promise<unknown>
    get(key: string): Promise<unknown>
    del(key: string): Promise<unknown>
  }
  expireAt(key: string, timestamp: number): Promise<unknown>
}

export function redisJsonCacheAdapter(
  redisJsonCache: RedisJsonLikeCache,
): Cache {
  return {
    name: redisJsonCache.name || 'RedisJson',
    delete(key) {
      return redisJsonCache.json.del(key)
    },
    async set(key: string, value) {
      const ttl = totalTtl(value?.metadata)
      const createdTime = value?.metadata?.createdTime

      // the $ is the root path of the json object
      // so we are ovewriting the entire object at the specified "key"
      const setOperation = await redisJsonCache.json.set(key, '$', value)

      // We want the user to have
      if (ttl > 0 && ttl < Infinity && typeof createdTime === 'number') {
        await redisJsonCache.expireAt(
          key,
          Math.ceil((ttl + createdTime) / 1000),
        )
      }

      return setOperation
    },

    async get(key) {
      const value = await redisJsonCache.json.get(key)
      if (value == null) {
        return null
      }
      return value as CacheEntry<unknown>
    },
  }
}
