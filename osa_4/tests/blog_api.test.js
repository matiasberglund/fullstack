const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('identifier is named id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(obj => {
    expect(obj).toHaveProperty('id')
  })
})

test('blog can be added', async () => {
  const newBlog = {
    title: 'test blog',
    author: 'meikä mandoliini',
    url: 'joku.random.urli',
    likes: 420
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'test blog'
  )
})

test('when creating a new post, if likes property is missing default it to 0', async () => {
  const newBlog = {
    title: 'test blog for testing likes 0',
    author: 'meikä mandoliini',
    url: 'joku.random.urli'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAfter = await helper.blogsInDb()
  expect(blogsAfter.slice(-1)[0].likes).toBe(0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Moro Mään',
    url: 'moro.mään.example',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Blog without url',
    author: 'Moro Mään',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('can delete a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('blog can be updated', async () => {
  const blog = {
    title: 'Updating an existing blog',
    author: 'Updated author',
    url: 'updated.url',
    likes: 690
  }

  const blogsAtStart = await helper.blogsInDb()

  await api
    .put(`/api/blogs/${blogsAtStart[0].id}`)
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // expect to have same length
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).toContain(blog.title)
  expect(blogsAtEnd[0].id).toBe(blogsAtStart[0].id)
})

test('fails with status 400 if id is invalid', async () => {
  const blog = {
    title: 'Updating an existing blog',
    author: 'Updated author',
    url: 'updated.url',
    likes: 690
  }

  const invalidId = 1234

  await api
    .put(`/api/blogs/${invalidId}`)
    .send(blog)
    .expect(400)

  // expect to have same length
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'blogtestuser',
      name: 'Test User',
      password: 'secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username or password are too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const tooShortUsername = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const tooShortPassword = {
      username: 'root',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(tooShortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`ro`) is shorter than the minimum allowed length (3).')

    const result2 = await api
      .post('/api/users')
      .send(tooShortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result2.body.error).toContain('password should be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})