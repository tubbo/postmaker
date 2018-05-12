import Post from "./post"
import { argv } from "optimist"

/**
 * Postmaker is a generator for Markdown and front-matter articles.
 *
 * @namespace
 * @module postmaker
 */
export default {
  Post,

  /**
   * Programatically generate a post and write it to disk.
   *
   * @function postmaker.generate
   * @param {Object} params - Metadata for the Post.
   * @return {null} Nothing is returned.
   */
  generate(params = {}) {
    const post = new Post(params)

    post.write()
  },

  /**
   * Parse command-line arguments and generate a Post.
   *
   * @function postmaker.parse
   * @return {null} Nothing is returned.
   */
  parse() {
    const category = argv.c,
          name = argv._,
          tags = argv.t

    this.generate({
      category,
      name,
      tags
    });
  }
}
