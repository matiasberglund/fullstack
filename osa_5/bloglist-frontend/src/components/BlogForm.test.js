import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('Calls the callback function with correct data when new blog is created', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog}/>)

    const titleInput = screen.getByTestId('title-input')
    const authorInput = screen.getByTestId('author-input')
    const urlInput = screen.getByTestId('url-input')
    const submit = screen.getByText('create')

    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'Test URL')
    await user.click(submit)
    
    expect(createBlog.mock.calls[0][0])
      .toEqual(
        {
          title: 'Test Title',
          author: 'Test Author',
          url: 'Test URL'
        }
      )
  })
})