import Post from './post'

test('template', () => {
  const params = {
    name: 'test'
  }

  expect(Post.template(params)).toMatch(/title: test/)
})

test('creation', () => {
  const post = new Post({
    name: 'foo bar baz',
    tags: ['foo', 'bar', 'baz']
  })

  expect(post.id).toEqual('foo-bar-baz')
  expect(post.tags).toInclude('baz')
  expect(post.category).toEqual('gbs')
})
