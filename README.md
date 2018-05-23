# postmaker

The Markdown article generator.

## Installation

Install with Yarn...

```bash
yarn global add postmaker
```

...or NPM...

```bash
npm install -g postmaker
```

## Usage

Postmaker generates articles through its command-line interface or
through a programmatic JavaScript API. Details on how to access the
Postmaker interface are below:

### Command-Line Interface

The easiest way to get started with Postmaker is by running it through
the CLI. Run the `postmaker` command to generate a Markdown article with
front matter data at a given location:

```bash
postmaker 'name of the article' -c category -t tag1,tag2,tag3 -p ./src/articles
```

You can also use it in NPM/Yarn scripts:

```json
{
  "scripts": {
    "generate": "postmaker -p ./src/articles"
  }
}
```

Running `yarn generate 'YOUR ARTICLE NAME'` will invoke postmaker and
generate your article.

### Configuration

Postmaker can also read a `.postmakerc` file from the current directory,
any parent directory, or in any one of the following locations:

- `~/.config/postmakerc`
- `~/.config/postmaker/postmakerc`
- `/etc/postmakerc`
- `/etc/postmaker/postmakerc`

This is a JSON file that provides defaults for the command-line tool. An
example use case is for a project that always generates articles into a
certain directory. To prevent having to write `-p ./src/articles` each
time, you could write a `.postmakerc` config like so:

```json
{
  "path": "./src/articles"
}
```

Now, every time you invoke `postmaker`, you can 
When using it in `package.json` scripts, make sure you prefix with the binstub path:

```json
{
  "scripts": {
    "generate": "node_modules/.bin/postmaker -p ./src/articles"
  }
}
```

### JavaScript API

Postmaker also exposes a JS API that lets you work with newly generated
posts programatically.

To generate a new Post and write it to disk, the easiest
method is to use the `Postmaker.create()` function:

```javascript
import postmaker from "postmaker"

const post = postmaker.create({
  title: 'name of my post',
  category: 'gbs',
  tags: ['one', 'two']
  path: './src/articles'
})
```

This creates a new article and writes to disk, using the `Post` class to
store data and make transformations. Most of the library's functionality
is implemented in the `Post` class. Instead of using
`Postmaker.create()`, which will try to write the file to disk before
returning the Post object back, you can also instantiate the Post object
and manipulate its behavior before writing to disk:

```javascript
import { Post } from "postmaker"

const post = new Post({
  title: 'name of my post',
  category: 'gbs',
  tags: ['one', 'two']
  path: './src/articles'
})

// ... do some other logic ...

post.write()
```

## Contributing

You can contribute to the development of `postmaker` by [filing an issue
report][issues] if you're having some trouble using the library/CLI, or
[submitting a pull request][pulls] if you have code to fix a particular
issue. We accept all contributions that follow our [code of conduct][].

[issues]: https://github.com/tubbo/postmaker/issues
[pulls]: https://github.com/tubbo/postmaker/pulls/new
[code of conduct]: https://github.com/tubbo/postmaker/blob/master/CODE_OF_CONDUCT.md
