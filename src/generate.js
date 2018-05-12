import PostClass from "./post"

export const Post = PostClass

/**
 * Write a new Post to disk.
 *
 * @argument {object} params - Params to send to the `Post` class.
 * @return {Post} The new Post object
 */
export default function(params = {}) {
  return Post.create(params)
}
