const _ = require('lodash')

const dummy = (blogs) => {
  // moro
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce( (a, b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  const res = Math.max(...blogs.map(o => o.likes))
  return blogs.find(o => o.likes === res)
}

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, 'author')
  const mostBlogsAuthor = _.maxBy(_.keys(authorCounts), author => authorCounts[author])

  if (mostBlogsAuthor === undefined) return undefined

  return {
    author: mostBlogsAuthor,
    blogs: authorCounts[mostBlogsAuthor],
  }
}

const mostLikes = (blogs) => {
  const groupedAuthors = _.groupBy(blogs, 'author')
  const likes = _.map(groupedAuthors, (posts, author) => ({
    author: author,
    likes: _.sumBy(posts, 'likes'),
  }))
  return _.maxBy(likes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
