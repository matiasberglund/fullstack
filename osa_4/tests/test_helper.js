const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '605dcb2f306f0d18a0fb82b1',
    title: 'Introduction to Machine Learning',
    author: 'Alice',
    url: 'https://www.example.com/blog/introduction-to-machine-learning',
    likes: 320,
    __v: 0
  },
  {
    _id: '605dcb2f306f0d18a0fb82b2',
    title: 'Understanding Deep Learning',
    author: 'Alice',
    url: 'https://www.example.com/blog/understanding-deep-learning',
    likes: 450,
    __v: 0
  },
  {
    _id: '605dcb2f306f0d18a0fb82b3',
    title: 'Getting Started with Python',
    author: 'Bob',
    url: 'https://www.example.com/blog/getting-started-with-python',
    likes: 320,
    __v: 0
  },
  {
    _id: '605dcb2f306f0d18a0fb82b4',
    title: 'Exploring JavaScript and Node.js',
    author: 'Bob',
    url: 'https://www.example.com/blog/exploring-javascript-and-nodejs',
    likes: 405,
    __v: 0
  },
  {
    _id: '605dcb2f306f0d18a0fb82b5',
    title: 'Guide to Web Development with React',
    author: 'Charlie',
    url: 'https://www.example.com/blog/guide-to-web-development-with-react',
    likes: 450,
    __v: 0
  },
  {
    _id: '605dcb2f306f0d18a0fb82b6',
    title: 'Diving into Docker',
    author: 'Alice',
    url: 'https://www.example.com/blog/diving-into-docker',
    likes: 320,
    __v: 0
  },
  {
    _id: '605dcb2f306f0d18a0fb82b7',
    title: 'All about AWS',
    author: 'Eva',
    url: 'https://www.example.com/blog/all-about-aws',
    likes: 450,
    __v: 0
  },
  {
    _id: '605dcb2f306f0d18a0fb82b8',
    title: 'Mastering Microservices',
    author: 'Dave',
    url: 'https://www.example.com/blog/mastering-microservices',
    likes: 320,
    __v: 0
  },
  {
    _id: '605dcb2f306f0d18a0fb82b9',
    title: 'Grasping GraphQL',
    author: 'Eva',
    url: 'https://www.example.com/blog/grasping-graphql',
    likes: 405,
    __v: 0
  },
  {
    _id: '605dcb2f306f0d18a0fb82ba',
    title: 'JavaScript for beginners',
    author: 'Fred',
    url: 'https://www.example.com/blog/javascript-for-beginners',
    likes: 450,
    __v: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}