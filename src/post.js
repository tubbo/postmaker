import { existsSync, readFileSync, writeFileSync } from "fs"
import { template, trim } from "lodash"
import { dump } from "js-yaml"
import moment from "moment"
import Path from "path"
import parameterize from "parameterize"

const HYPHENS = "YYYY-MM-DD",
      SLASHES = "YYYY/MM/DD",
      ARTICLE_PATH = Path.join(__dirname, "article.md"),
      interpolate = /{{([\s\S]+?)}}/g

/**
 * Represents a single article that can be generated. Posts are
 * instantiated with a hash of options
 *
 * @module Postmaker
 */
export default class Post {

  /**
   * The template function created from lodash.
   *
   * @class Post
   * @static
   */
  static get template() {
    return template(readFileSync(ARTICLE_PATH), { interpolate })
  }

  /**
   * Date accessors for posts.
   *
   * @static
   * @class Post
   * @returns {object} The current date and time
   */
  static get now() {
    const current = moment(),
          hyphens = current.format(HYPHENS),
          slashes = current.format(SLASHES)

    return {
      hyphens,
      slashes
    }
  }

  /**
   * @class Post
   * @param {object} params - name, category, and tags
   */
  constructor({ title, category, tags, path }) {
    this.title = title
    this.category = category
    this.tags = tags
    this.filepath = path
  }

  /**
   * @class Post
   * @property {string} path - URL path to this article
   */
  get path() {
    return `/${Post.now.slashes}/${this.id}`
  }

  /**
   * @class Post
   * @property {string} id - The parameterized name
   */
  get id() {
    return parameterize(this.title)
  }

  /**
   * @class Post
   * @property {string} filename - Name of the source file on disk
   */
  get filename() {
    return `${this.filepath}/${Post.now.hyphens}-${this.id}.md`
  }

  /**
   * @class Post
   * @property {object} attributes - All attributes for front-matter combined
   */
  get attributes() {
    const { title, path, category, tags } = this,
          date = Post.now.slashes

    return {
      category,
      date,
      path,
      tags,
      title
    }
  }

  /**
   * @class Post
   * @property {string} metadata - YAML front-matter for this article
   */
  get metadata() {
    return dump(this.attributes)
  }

  /**
   * @class Post
   * @property {string} contents - Full source of the generated article
   */
  get contents() {
    return Post.template({ frontMatter: trim(this.metadata) })
  }

  /**
   * Write the contents of this Post to disk
   *
   * @class Post
   * @method write
   * @return {Boolean} Whether the file wrote to disk
   */
  write() {
    writeFileSync(this.filename, this.contents)

    return existsSync(this.filename)
  }
}
