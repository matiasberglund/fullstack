const listHelper = require('../utils/list_helper')

const emptyList = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
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

describe('dummy', () => {
  test('returns 1', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(3890)
  })
})

describe('favorite blog', () => {
  test('of empty list is undefined', () => {
    expect(listHelper.favoriteBlog(emptyList)).toBeUndefined()
  })

  test('of list with one blog is that blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  test('of list with multiple blogs is some blog with most likes', () => {
    const maxLikes = Math.max(...blogs.map(post => post.likes))
    const mostLikedPosts = blogs.filter(post => post.likes === maxLikes)
    expect(mostLikedPosts).toContain(listHelper.favoriteBlog(blogs))
  })
})

describe('most blogs', () => {
  test('empty list is undefined', () => {
    expect(listHelper.mostBlogs(emptyList)).toBeUndefined()
  })

  test('of list with one blog, is the author of that blog', () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        blogs: 1
      }
    )
  })

  test('returns correct author from a list of blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual(
      {
        author: 'Alice',
        blogs: 3
      }
    )
  })
})

describe('most likes', () => {
  test('empty list is undefined', () => {
    expect(listHelper.mostLikes(emptyList)).toBeUndefined()
  })

  test('of list with one blog, is the author of that blog', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    )
  })

  test('returns the author with most likes', () => {
    expect(listHelper.mostLikes(blogs)).toEqual(
      {
        author: 'Alice',
        likes: 1090
      }
    )
  })
})