const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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


afterAll(async () => {
  await mongoose.connection.close()
})