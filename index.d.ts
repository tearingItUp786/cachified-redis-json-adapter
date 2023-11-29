import type { Cache } from '@epic-web/cachified';
export interface RedisJsonLikeCache {
    name?: string;
    json: {
        set(key: string, path: string, value: Record<string, any>): Promise<string | null>;
        get(key: string): Promise<string | null>;
        del(key: string): Promise<unknown>;
    };
    expireAt(key: string, timestamp: number): Promise<unknown>;
}
export declare function redisJsonCacheAdapter(redisJsonCache: RedisJsonLikeCache): Cache;
