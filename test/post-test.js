/* eslint-env jest */

import Post from '../src/post'
import { includes, trim } from 'lodash'
import { dump } from 'js-yaml'
import rimraf from "rimraf"

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

describe('Post.template', () => {
  test('interpolates the template source into a Markdown article', () => {
    const frontMatter = trim(dump({ title: 'test' })),
          compiled = Post.template({ frontMatter })

    expect(compiled).toMatch(/title: test/)
    expect(compiled).toMatch(/Write the article here/)
  })
})

describe('Post.now', () => {
  test('slashes returns the date formatted with slashes', () => {
    expect(Post.now.slashes).toMatch('/')
  })

  test('hyphens returns the date formatted with hyphens', () => {
    expect(Post.now.hyphens).toMatch('-')
  })
})

describe('Post', () => {
  test('save passed-in parameters', () => {
    expect(post.title).toEqual(params.title)
    expect(post.category).toEqual(params.category)
    expect(post.tags).toEqual(params.tags)
    expect(post.filepath).toEqual(params.path)
  })

  test('parameterize title into id', () => {
    expect(post.id).toEqual('foo-bar-baz')
  })

  test('build path from id and slashed date', () => {
    expect(post.path).toEqual(`/${Post.now.slashes}/foo-bar-baz`)
  })

  test('build filename from passed-in root path, hyphened date, and id', () => {
    expect(post.filename).toEqual(`./tmp/${Post.now.hyphens}-foo-bar-baz.md`)
  })

  test('build attributes hash from article metadata and slashed date', () => {
    expect(post.attributes.title).toEqual(params.title)
    expect(post.attributes.date).toEqual(Post.now.slashes)
  })

  afterEach(() => rimraf.sync('./tmp/*.md'))
})

