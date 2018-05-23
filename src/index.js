import Post from "./post"

export default {
  Post,

  /**
   * Create a new Post and write it to disk.
   *
   * @module Postmaker
   * @function Postmaker.create
   * @param {object} params - Params for the new Post object.
   * @return {Post} The new Post object.
   */
  create(params = {}) {
    const post = new Post(params)

    post.write()

    return post
  }
}
