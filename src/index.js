import _Post from "./post"
import generate from "./generate"

export const Post = _Post

export default function(params = {}) {
  return Post.create(params)
}
