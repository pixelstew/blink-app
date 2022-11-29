import '@testing-library/jest-dom'
import {screen, render, cleanup} from '@testing-library/react'
import user from '@testing-library/user-event'
import {MessageForm} from './'

describe('Message', () => {
  const handleSubmit = jest.fn()
  const setMessageText = jest.fn()

  beforeEach(() => {
    render(
      <MessageForm
        onSubmit={handleSubmit}
        setMessageText={setMessageText}
        conversationId="1"
        messageId={null}
        messageText="Hello"
      />,
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render form', async () => {
    expect(screen.getByRole(/textbox/)).toBeInTheDocument()
    expect(screen.getByRole(/button/)).toBeInTheDocument()
    expect(screen.getByText(/send/i)).toBeInTheDocument()
  })

  it('should call onSubmit fn passed', async () => {
    await user.type(screen.getByRole(/textbox/), 'Hello')
    await user.click(screen.getByRole(/button/))
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('should call setMessageText fn passed', async () => {
    await user.type(screen.getByRole(/textbox/), 'a')
    expect(setMessageText).toHaveBeenCalledTimes(1)
    await user.type(screen.getByRole(/textbox/), 'b')
    expect(setMessageText).toHaveBeenCalledTimes(2)
  })

  it('should show edit button if messageId passed', async () => {
    cleanup()
    render(
      <MessageForm
        onSubmit={handleSubmit}
        setMessageText={setMessageText}
        conversationId="1"
        messageId="1"
        messageText="Hello"
      />,
    )
    expect(screen.getByRole(/button/)).toBeInTheDocument()
    expect(screen.queryByText(/send/i)).not.toBeInTheDocument()
    expect(screen.getByText(/edit/i)).toBeInTheDocument()
  })

  it('should be disabled if no conversationId passed', () => {
    cleanup()
    const {rerender} = render(
      <MessageForm
        onSubmit={handleSubmit}
        setMessageText={setMessageText}
        conversationId={undefined}
        messageId="1"
        messageText="Hello"
      />,
    )
    expect(screen.getByRole(/textbox/)).toBeDisabled()
    expect(screen.getByRole(/button/)).toBeDisabled()
    rerender(
      <MessageForm
        onSubmit={handleSubmit}
        setMessageText={setMessageText}
        conversationId="1"
        messageId="1"
        messageText="Hello"
      />,
    )
    expect(screen.getByRole(/textbox/)).not.toBeDisabled()
    expect(screen.getByRole(/button/)).not.toBeDisabled()
  })

  it('should unable to submit if no text present in textbox', () => {
    cleanup()
    const {rerender} = render(
      <MessageForm
        onSubmit={handleSubmit}
        setMessageText={setMessageText}
        conversationId="1"
        messageId="1"
        messageText=""
      />,
    )
    expect(screen.getByRole(/button/)).toBeDisabled()
    rerender(
      <MessageForm
        onSubmit={handleSubmit}
        setMessageText={setMessageText}
        conversationId="1"
        messageId="1"
        messageText="Hello"
      />,
    )
    expect(screen.getByRole(/button/)).not.toBeDisabled()
  })
})
