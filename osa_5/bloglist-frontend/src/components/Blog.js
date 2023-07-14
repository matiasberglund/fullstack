import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const showDeleteButton = blog.user.username === user.username ? true : false

  return (
    <div className="blog-container">
      {blog.title} {blog.author} <button onClick={() => setShowDetails(!showDetails)}>{!showDetails ? 'view' : 'hide'}</button>
      {showDetails &&
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} <button onClick={addLike}>like</button>
          </div>
          <div>
            {blog.user ? blog.user.name : null}
          </div>
          <div>
            {showDeleteButton &&
              <button onClick={deleteBlog}>remove</button>
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