import { generate } from "./index"

test('generates article', () => {
  const params = {
    name: "Foo",
    category: "foos",
    tags: ["foo", "bar"],
    path: "./tmp"
  }

  expect(generate(params)).toBe(true)
})
