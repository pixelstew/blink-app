import '@testing-library/jest-dom'
import {screen, render, cleanup} from '@testing-library/react'
import user from '@testing-library/user-event'
import {Conversation} from './'

import mockData from '../../mocks/mock-data.json'

describe('Conversation', () => {
  const handleClick = jest.fn()

  beforeEach(() => {
    render(
      <Conversation
        onClick={handleClick}
        selected={false}
        conversation={mockData[0]}
      />,
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render message', async () => {
    expect(screen.getByRole(/button/)).toBeInTheDocument()
    expect(screen.getByText(/eiusmod nostrud sunt/i)).toBeInTheDocument()
  })

  it('should render formatted date', async () => {
    expect(screen.getByText('May 4th 2020, 3:37 AM')).toBeInTheDocument()
  })

  it('should call onClick fn passed', async () => {
    await user.click(screen.getByRole(/button/))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should change appearance if selected', () => {
    cleanup()
    const {rerender} = render(
      <Conversation
        onClick={handleClick}
        selected={false}
        conversation={mockData[0]}
      />,
    )
    expect(screen.getByRole(/button/).classList.contains('bg-slate-600')).toBe(
      false,
    )
    rerender(
      <Conversation
        onClick={handleClick}
        selected
        conversation={mockData[0]}
      />,
    )
    expect(screen.getByRole(/button/).classList.contains('bg-slate-600')).toBe(
      true,
    )
  })
})
