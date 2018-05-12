import postmaker from "../src/index"
import rimraf from "rimraf"

test('generates article', () => {
  const params = {
    title: "Foo",
    category: "foos",
    tags: ["foo", "bar"],
    path: "./tmp"
  }
  const post = postmaker(params)

  expect(post.title).toEqual(params.title)
  expect(post.category).toEqual(params.category)
  expect(post.tags).toEqual(params.tags)
  expect(post.filename).toMatch(params.path)
})

afterEach(() => rimraf.sync('./tmp/*.md'))
