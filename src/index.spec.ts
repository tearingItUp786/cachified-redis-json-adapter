import {redisJsonCacheAdapter} from './'

describe('it works with redisonjson like cache', () => {
  const mockRedisJsonCache = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
    json: {
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
    },
    expireAt: jest.fn(),
  }
  const cacheAdapter = redisJsonCacheAdapter(mockRedisJsonCache)

  it('should set a value correctly without TTL', async () => {
    mockRedisJsonCache.json.set.mockResolvedValue('OK')
    const result = await cacheAdapter.set('key', {data: 'value'} as any)
    expect(result).toBe('OK')
    expect(mockRedisJsonCache.json.set).toHaveBeenCalledWith('key', '$', {
      data: 'value',
    })
    expect(mockRedisJsonCache.expireAt).not.toHaveBeenCalled()
  })

  it('should set a value with TTL', async () => {
    const ttl = 5000 // 5 seconds
    const currentTime = Date.now()
    mockRedisJsonCache.json.set.mockResolvedValue('OK')
    const result = await cacheAdapter.set('key', {
      metadata: {createdTime: currentTime, ttl},
    } as any)
    expect(result).toBe('OK')
    expect(mockRedisJsonCache.expireAt).toHaveBeenCalledWith(
      'key',
      Math.ceil((ttl + currentTime) / 1000),
    )
  })

  it('handles set operation failure', async () => {
    mockRedisJsonCache.json.set.mockRejectedValue(new Error('Failed to set'))
    await expect(
      cacheAdapter.set('key', {data: 'value'} as any),
    ).rejects.toThrow('Failed to set')
  })

  it('should retrieve an existing value', async () => {
    const storedValue = {data: 'value'}
    mockRedisJsonCache.json.get.mockResolvedValue(storedValue)
    const result = await cacheAdapter.get('key')
    expect(result).toEqual({data: 'value'})
  })

  it('should return null for a non-existing key', async () => {
    mockRedisJsonCache.json.get.mockResolvedValue(null)
    const result = await cacheAdapter.get('nonExistingKey')
    expect(result).toBeNull()
  })

  it('handles get operation failure', async () => {
    mockRedisJsonCache.json.get.mockRejectedValue(new Error('Failed to get'))
    await expect(cacheAdapter.get('key')).rejects.toThrow('Failed to get')
  })

  it('should delete a key', async () => {
    await cacheAdapter.delete('key')
    expect(mockRedisJsonCache.json.del).toHaveBeenCalledWith('key')
  })

  it('handles delete operation failure', async () => {
    mockRedisJsonCache.json.del.mockRejectedValue(new Error('Failed to delete'))
    await expect(cacheAdapter.delete('key')).rejects.toThrow('Failed to delete')
  })
})
