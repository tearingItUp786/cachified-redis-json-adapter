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
