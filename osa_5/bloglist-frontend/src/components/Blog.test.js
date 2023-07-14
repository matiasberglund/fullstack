import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    const user = {
      username: 'test username',
      name: 'Test Name'
    }

    const blog = {
      title: 'Test title',
      author: 'Test author',
      user: {...user},
      likes: 10,
      url: 'Test url'
    }
    
    const mockLike = jest.fn()
    const mockDelete = jest.fn()

  beforeEach(() => {
    render(
      <Blog 
        blog={blog} 
        user={user} 
        addLike={mockLike} 
        deleteBlog={mockDelete} 
      />
    )
  })

  test('renders title for blog', () => {
    const title = screen.getByText(blog.title, { exact: false })
    expect(title).toBeDefined()
  })

  test('renders other data as well when revealed', async () => {
    const user = userEvent.setup()
    const button = screen.getByTestId('details-button')
    await user.click(button)

    const url = screen.getByTestId('url-container')
    const likes = screen.getByTestId('likes-container')
    const name = screen.getByTestId('user-name-container')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    expect(name).toBeDefined()
  })

  test('when the like button is pressed twice the event handler is called twice', async () => {
    const user = userEvent.setup()
    const detailsButton = screen.getByTestId('details-button')
    await user.click(detailsButton)
    const likesButton = screen.getByText('like')
    await user.click(likesButton)
    await user.click(likesButton)
    expect(mockLike.mock.calls).toHaveLength(2)
  })
})