import * as React from 'react'
import {MessageForm} from '../MessageForm'
import {Message as MessageButton} from '../Message'
import {useConversations} from './../../hooks/useConversations'

import type {Message, Conversation} from '../../types'

export interface MessagesProps {
  conversation: Conversation | undefined
}

export function Messages({conversation}: MessagesProps) {
  const divRef = React.useRef<HTMLDivElement>(null)
  const [editMessageId, setEditMessageId] = React.useState<string | null>(null)
  const [messageText, setMessageText] = React.useState('')

  const {addMessage, updateMessage} = useConversations()

  React.useEffect(() => {
    const messageDiv = divRef.current
    if (messageText === '' && messageDiv) {
      messageDiv.scrollTop = messageDiv.scrollHeight
    }
  }, [messageText, conversation?.id])

  const handleClickMessage = (messageId: string, messageContent: string) => {
    if (editMessageId === messageId) {
      setMessageText('')
      return setEditMessageId(null)
    }
    setMessageText(messageContent)
    setEditMessageId(messageId)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (editMessageId && conversation?.id) {
      updateMessage(conversation.id, editMessageId, messageText)
      setEditMessageId(null)
    } else if (!editMessageId && conversation?.id) {
      addMessage(conversation?.id, messageText)
    }
    setMessageText('')
  }

  return (
    <section className="col-span-3 flex flex-col items-stretch h-[100%]">
      <div
        ref={divRef}
        className="flex flex-col items-baseline pt-4 px-10 col-span-3 overflow-auto h-[calc(100vh-10rem)]"
      >
        {conversation ? (
          <>
            {conversation.messages.map((message: Message) => {
              return (
                <MessageButton
                  message={message}
                  onClick={() => handleClickMessage(message.id, message.text)}
                  selected={message.id === editMessageId}
                />
              )
            })}
          </>
        ) : (
          <p>Click a conversation to begin...</p>
        )}
      </div>
      <MessageForm
        onSubmit={handleSubmit}
        conversationId={conversation?.id}
        messageId={editMessageId}
        messageText={messageText}
        setMessageText={setMessageText}
      />
    </section>
  )
}
