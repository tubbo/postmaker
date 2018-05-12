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

### Command-Line Interface

Postmaker is primarily used through its CLI. Run the `postmaker` command
to generate a Markdown article with front matter at a given location.

```bash
postmaker 'name of the article' -c category -t tag1,tag2,tag3 -p ./src/articles
```

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

```javascript
import postmaker, { Post } from "postmaker"

postmaker.generate({
  title: 'name of my post',
  category: 'gbs',
  tags: ['one', 'two']
  path: './src/articles'
})

// the same as doing...

const post = new Post({
  title: 'name of my post',
  category: 'gbs',
  tags: ['one', 'two']
  path: './src/articles'
})

post.write()
```
