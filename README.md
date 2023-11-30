# cachified-redis-json-adapter

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

**Meant to be used with `@epicweb-dev/cachified`**

```ts
import {redisJsonCacheAdapter} from 'cachified-redis-json-adapter'

// create an instance of a redis client to pass to our adapter
// you will need to define this yourself.
let redisClient = createRedisClient()
const redisCache = redisJsonCacheAdapter(redisClient)

// usage with cachified
return cachified({
  key: `some-cache-key`,
  // use the cache we defined above
  cache: redisCache,
  getFreshValue: async () => {}, // some function to get fresh values
  // other cachified optoins
})
```

## Contributors ✨

Thanks goes to these wonderful people

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/tearingitup786"><img src="https://avatars.githubusercontent.com/u/16584942?v=4?s=100" width="100px;" alt="Taranveer (Taran) Bains"/><br /><sub><b>Taranveer (Taran) Bains</b></sub></a><br /><a href="https://github.com/tearingItUp786/cachified-redis-json-adapter/commits?author=tearingItUp786" title="Code">💻</a> <a href="https://github.com/tearingItUp786/cachified-redis-json-adapter/commits?author=tearingItUp786" title="Tests">⚠️</a> <a href="https://github.com/tearingItUp786/cachified-redis-json-adapter/commits?author=tearingItUp786" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

([emoji key](https://allcontributors.org/docs/en/emoji-key)):

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
