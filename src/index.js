import Post from "./post"

export const Post

/**
 * Programatically write and generate a new post.
 */
export default {
  Post,
  generate(params = {}) {
    new Post(params).write()
  }
}
