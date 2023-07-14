import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const initialBlogValues = {
    title: '',
    author: '',
    url: ''
  }
  const [newBlog, setNewBlog] = useState(initialBlogValues)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ ...newBlog })

    setNewBlog(initialBlogValues)
  }

  const handleBlogChange = (event) => {
    const value = event.target.value
    setNewBlog({
      ...newBlog,
      [event.target.name]: value
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleBlogChange}
            data-testid="title-input"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleBlogChange}
            data-testid="author-input"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleBlogChange}
            data-testid="url-input"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm