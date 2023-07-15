import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ content: null, type: undefined })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        // Also could probably populate user data on blog creation in the backend, but this is simpler for now.
        returnedBlog.user = user
        setBlogs(blogs.concat(returnedBlog))
        setMessage({
          content: `a new blog ${blogObject.title} by ${blogObject.author} added`,
          type: 'info'
        })
        setTimeout(() => {
          setMessage(
            {
              content: null,
              type: undefined
            }
          )
        }, 5000)
      })
      .catch(error => {
        setMessage(
          {
            content: error.response.data.error,
            type: 'error'
          }
        )
        setTimeout(() => {
          setMessage(
            {
              content: null,
              type: undefined
            }
          )
        }, 5000)
      })
  }

  const addLike = id => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        returnedBlog.user = updatedBlog.user
        setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
      })
  }

  const deleteBlog = id => {
    const blog = blogs.find(b => b.id === id)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
          setMessage(
            {
              content: `${ blog.title } by ${ blog.author } removed.`,
              type: 'info'
            }
          )
        })
      setTimeout(() => {
        setMessage(
          {
            content: null,
            type: undefined
          }
        )
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage(
        {
          content: 'wrong username or password',
          type: 'error'
        }
      )
      setTimeout(() => {
        setMessage(
          {
            content: null,
            type: 'error'
          }
        )
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form id='login-form' onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message.content} type={message.type} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message.content} type={message.type} />
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} addLike={() => addLike(blog.id)} deleteBlog={() => deleteBlog(blog.id)} user={user}/>
      )}
    </div>
  )
}

export default App