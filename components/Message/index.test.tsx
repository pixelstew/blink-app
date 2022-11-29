import '@testing-library/jest-dom'
import {
  screen,
  fireEvent,
  within,
  waitForElementToBeRemoved,
  render,
  cleanup,
} from '@testing-library/react'
import user from '@testing-library/user-event'
import {Message} from './'

describe('Message', () => {
  const handleClick = jest.fn()

  beforeEach(() => {
    render(
      <Message
        onClick={handleClick}
        selected={false}
        message={{
          id: '1',
          text: 'Hello',
          last_updated: '2021-01-01T00:00:00.000Z',
        }}
      />,
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render message', async () => {
    expect(screen.getByRole(/button/)).toBeInTheDocument()
    expect(screen.getByText(/Hello/i)).toBeInTheDocument()
  })

  it('should render formatted date', async () => {
    expect(screen.getByText('Jan 1st 2021, 12:00 AM')).toBeInTheDocument()
  })

  it('should call onClick fn passed', async () => {
    await user.click(screen.getByRole(/button/))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should change appearance if selected', () => {
    cleanup()
    const {rerender} = render(
      <Message
        onClick={() => {}}
        selected={false}
        message={{
          id: '1',
          text: 'Hello',
          last_updated: '2021-01-01T00:00:00.000Z',
        }}
      />,
    )
    expect(screen.getByRole(/button/).classList.contains('bg-slate-600')).toBe(
      false,
    )
    rerender(
      <Message
        onClick={() => {}}
        selected
        message={{
          id: '1',
          text: 'Hello',
          last_updated: '2021-01-01T00:00:00.000Z',
        }}
      />,
    )
    expect(screen.getByRole(/button/).classList.contains('bg-slate-600')).toBe(
      true,
    )
  })

  it('should render selected edited message', async () => {
    cleanup()
    const {rerender} = render(
      <Message
        onClick={jest.fn()}
        selected={true}
        message={{
          id: '1',
          text: 'Hello',
          last_updated: '2021-01-01T00:00:00.000Z',
          edited: '2021-01-01T00:00:00.000Z',
        }}
      />,
    )
    expect(screen.getByText(/edited/i)).toBeInTheDocument()
    rerender(
      <Message
        onClick={jest.fn()}
        selected={true}
        message={{
          id: '1',
          text: 'Hello',
          last_updated: '2021-01-01T00:00:00.000Z',
        }}
      />,
    )
    expect(screen.queryByText(/edited/i)).not.toBeInTheDocument()
  })
})
