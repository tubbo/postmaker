const postmaker = require('./index')

test('generates article', () => {
  const params = {
    name: "Foo",
    category: "foos",
    tags: ["foo", "bar"],
    path: "./tmp"
  }
  expect(postmaker.generate(params)).toBe(true)
})
