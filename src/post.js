import { readFileSync, writeFileSync } from "fs"
import { template, trim } from "lodash"
import { dump } from "yaml-js"
import moment from "moment"
import parameterize from "parameterize"

const HYPHENS = "YYYY-MM-DD",
      SLASHES = "YYYY/MM/DD",
      interpolate = /{{([\s\S]+?)}}/g

/**
 * Represents a single article that can be generated. Posts are
 * instantiated with a hash of options
 *
 * @module postmaker/post
 */
export default class Post {

  /**
   * The template function created from lodash.
   *
   * @static
   */
  static get template() {
    return template(readFileSync("./article.md"), { interpolate })
  }

  /**
   * Date accessors for posts.
   *
   * @static
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
  constructor({ name, category, tags }) {
    this.name = name
    this.category = category
    this.tags = tags
  }

  /**
   * @property {string} path - URL path to this article
   */
  get path() {
    return `/${Post.now.slashes}/${this.id}`
  }

  /**
   * @property {string} id - The parameterized name
   */
  get id() {
    return parameterize(this.name)
  }

  /**
   * @property {string} filename - Name of the source file on disk
   */
  get filename() {
    return `${Post.now.hyphens}-${this.id}.md`
  }

  /**
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
   * @property {string} metadata - YAML front-matter for this article
   */
  get metadata() {
    return dump(this.attributes)
  }

  /**
   * @property {string} contents - Full source of the generated article
   */
  get contents() {
    return Post.template({ "frontMatter": trim(this.metadata) })
  }

  /**
   * Write the contents of this Post to disk
   *
   * @method
   * @return {Boolean} Whether the file wrote to disk
   */
  write() {
    return writeFileSync(this.filename, this.contents)
  }
}
