import useSWR from 'swr'
import {useSWRConfig} from 'swr'
import {faker} from '@faker-js/faker'
import {api} from '../mocks/api'

import type {Conversation, Message} from '../types'

export function useConversations() {
  const {cache, mutate} = useSWRConfig()
  const getFn = () => api.getConversations()

  const updatedTime = () => new Date().toISOString()

  const currentConversations = cache.get(`/api/conversations`) as Conversation[]

  const {data, isValidating, error} = useSWR(`/api/conversations`, getFn, {
    revalidateOnFocus: false,
  })

  const addMessage = (conversationId: string, payload: string) => {
    if (!conversationId) {
      throw new Error('No conversation id provided.')
    }

    const updatedTime = new Date().toISOString()

    const newMessage = {
      id: faker.datatype.string(24),
      text: payload,
      last_updated: updatedTime,
    }

    const addFn = () => api.addMessage(conversationId, newMessage)

    const newConversations = currentConversations.map(conversation => {
      if (conversation.id === conversationId) {
        return {
          ...conversation,
          last_updated: updatedTime,
          messages: [...conversation.messages, newMessage],
        }
      }
      return conversation
    })

    const options = {optimisticData: newConversations, rollbackOnError: true}

    mutate(`/api/conversations`, addFn(), options)
  }

  const updateMessage = (
    conversationId: string,
    messageId: string,
    payload: string,
  ) => {
    if (!conversationId) {
      throw new Error('No conversation id provided.')
    }

    if (!messageId) {
      throw new Error('No message id provided.')
    }

    const editedMessage = () => {
      const conversation = currentConversations.find(
        conversation => conversation.id === conversationId,
      )
      return conversation?.messages.find(message => message.id === messageId)
    }

    const newMessage = {
      ...editedMessage(),
      text: payload,
      edited: updatedTime(),
    } as Message

    const addFn = () => api.updateMessage(conversationId, messageId, newMessage)

    const newConversations = currentConversations.map(conversation => {
      if (conversation.id === conversationId) {
        return {
          ...conversation,
          last_updated: newMessage.edited,
          messages: conversation.messages.map((message: Message) => {
            if (message.id === messageId) {
              return newMessage
            }
            return message
          }),
        }
      }
      return conversation
    })

    const options = {optimisticData: newConversations, rollbackOnError: true}

    mutate(`/api/conversations`, addFn(), options)
  }

  return {data, isLoading: isValidating, error, addMessage, updateMessage}
}
