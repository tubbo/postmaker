import Post from '../src/post'
import { includes, trim } from 'lodash'
import { dump } from 'js-yaml'
import rimraf from "rimraf"

test('template', () => {
  const frontMatter = trim(dump({ title: 'test' })),
        compiled = Post.template({ frontMatter })

  expect(compiled).toMatch(/title: test/)
  expect(compiled).toMatch(/Write the article here/)
})

test('creation', () => {
  const params = {
    title: 'foo bar baz',
    category: 'gbs',
    tags: [
      'foo',
      'bar',
      'baz'
    ],
    path: './tmp'
  },
  post = new Post(params)

  expect(post.title).toEqual(params.title)
  expect(post.category).toEqual(params.category)
  expect(post.tags).toEqual(params.tags)
  expect(post.filepath).toEqual(params.path)
  expect(post.id).toEqual('foo-bar-baz')
  expect(post.path).toEqual(`/${Post.now.slashes}/foo-bar-baz`)
  expect(post.filename).toEqual(`${params.path}/${Post.now.hyphens}-foo-bar-baz.md`)
  expect(post.attributes.date).toEqual(Post.now.slashes)
  expect(post.metadata).toMatch(/title: foo bar baz/)
  expect(post.contents).toMatch(post.metadata)
  expect(post.write()).toBe(true)
})

afterEach(() => rimraf.sync('./tmp/*.md'))
