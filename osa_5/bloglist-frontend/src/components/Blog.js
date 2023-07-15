import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const showDeleteButton = blog.user.username === user.username ? true : false

  return (
    <div className="blog-container" data-testid="blog-container" data-cy={blog.title}>
      {blog.title} {blog.author} <button onClick={() => setShowDetails(!showDetails)} data-testid="details-button">{!showDetails ? 'view' : 'hide'}</button>
      {showDetails &&
        <div data-testid="details-container">
          <div data-testid="url-container">
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div data-testid="likes-container">
            {blog.likes} <button data-testid="like-button" onClick={addLike}>like</button>
          </div>
          <div data-testid="user-name-container">
            {blog.user ? blog.user.name : null}
          </div>
          <div>
            {showDeleteButton &&
              <button data-cy="remove-button" onClick={deleteBlog}>remove</button>
            }
          </div>
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.any.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.any.isRequired
}

export default Blog