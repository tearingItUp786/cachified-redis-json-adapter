# cachified-redis-json-adapter

An adapter meant to be used with
[@epicweb-dev/cachified](https://github.com/epicweb-dev/cachified)

## Why

While working through my personal website, I settled on using
[`redis-json`](https://github.com/redis/node-redis/tree/d6d2064c72b99d34fc88318f3979177e3c89acd4/packages/json)
as the caching mechanism for my third party API requests.
[@epicweb-dev/cachified](https://github.com/epicweb-dev/cachified) originally
shipped with an adapter for `redis` but not for `redis-json`. This adapter
exists for that purpose.

## Install

```bash
npm install cachified-redis-json-adapter
```

## Usage

```ts
import {redisJsonCacheAdapter} from 'cachified-redis-json-adapter'

// create an instance of a redis client to pass to our adapter
// you will need to define this yourself.
let redisClient = createRedisClient()
const redisCache = myRedisAdapter(redisClient)

// usage with cachified
return cachified({
  key: `yourCacheKey`,
  // use the cache we defined above
  cache: redisCache,
  getFreshValue: async () => {}, // some function to get fresh values
  // other cachified optoins
})
```

## Contributing

[] Fill in
