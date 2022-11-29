import * as React from 'react'
import {useConversations} from '../../hooks/useConversations'
import {Sidebar} from '../Sidebar'
import {Conversation as ConversationButton} from '../Conversation'
import {Messages} from '../Messages'

import type {Conversation} from '../../types'

export function ChatApp() {
  const [currentConversationId, setCurrentConversationId] = React.useState<
    string | null
  >(null)

  const {data: conversations, isLoading, error} = useConversations()

  if (isLoading && !conversations) {
    return <main>Loading...</main>
  }
  if (error) {
    return <main>Error...</main>
  }

  const currentConversation = conversations?.find(
    conversation => conversation.id === currentConversationId,
  )

  return (
    <div className="grid grid-cols-4 h-[100%]">
      <Sidebar>
        <h1 className="text-xl mb-4">Conversations</h1>
        {conversations &&
          conversations.map((conversation: Conversation) => {
            return (
              <ConversationButton
                conversation={conversation}
                onClick={() => setCurrentConversationId(conversation.id)}
                selected={conversation.id === currentConversationId}
              />
            )
          })}
      </Sidebar>
      <Messages conversation={currentConversation} />
    </div>
  )
}
