import Post from './post'

before(() => {
  this.post = new Post(this.params)
})
