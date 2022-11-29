import mockConversations from './mock-data.json'

import {Conversation, Message} from '../types'

class BlinkApi {
  conversations
  failureRate = 0

  constructor(mockConversations: Conversation[]) {
    this.conversations = this.sortConversations(mockConversations)
  }

  private getDelay() {
    return Math.floor(Math.random() * 2000)
  }

  private getFailureRate() {
    return Math.random() < this.failureRate
  }

  private getDate(dateString: string) {
    return new Date(dateString).getTime()
  }

  private sortConversations(conversations: Conversation[]) {
    return conversations
      .map(conversation => {
        conversation.messages.sort((a, b) => {
          return this.getDate(a.last_updated) - this.getDate(b.last_updated)
        })
        return conversation
      })
      .sort((a, b) => {
        return this.getDate(b.last_updated) - this.getDate(a.last_updated)
      })
  }

  public getConversations = () => {
    const delay = this.getDelay()
    const error = this.getFailureRate()

    return new Promise<Conversation[]>((resolve, reject) => {
      setTimeout(
        () =>
          error
            ? reject(
                new Error(
                  'BlinkAPI::getConversations - there was an error fetching Conversations from the API.',
                ),
              )
            : resolve(this.conversations),
        delay,
      )
    })
  }

  public addMessage = (conversationId: string, payload: Message) => {
    const delay = this.getDelay()
    const error = this.getFailureRate()

    const newConversations = this.conversations.map(conversation => {
      if (conversation.id === conversationId) {
        return {
          ...conversation,
          last_updated: payload.last_updated,
          messages: [...conversation.messages, payload],
        }
      }
      return conversation
    })

    this.conversations = newConversations

    return new Promise<Conversation[]>((resolve, reject) => {
      setTimeout(
        () =>
          error
            ? reject(
                new Error(
                  'BlinkAPI::addMessage - there was an error adding a new messager.',
                ),
              )
            : resolve(this.conversations),
        delay,
      )
    })
  }

  public updateMessage(
    conversationId: string,
    messageId: string,
    payload: Message,
  ) {
    const delay = this.getDelay()
    const error = this.getFailureRate()

    const newConversations = this.conversations.map(conversation => {
      if (conversation.id === conversationId) {
        return {
          ...conversation,
          last_updated: payload.last_updated,
          messages: conversation.messages.map((message: Message) => {
            if (message.id === messageId) {
              return {
                ...message,
                text: payload.text,
                edited: payload.edited,
              }
            }
            return message
          }),
        }
      }
      return conversation
    })

    this.conversations = newConversations

    return new Promise<Conversation[]>((resolve, reject) => {
      setTimeout(
        () =>
          error
            ? reject(
                new Error(
                  'BlinkAPI::updateMessage - there was an error updating the message.',
                ),
              )
            : resolve(this.conversations),
        delay,
      )
    })
  }
}

export const api = new BlinkApi(mockConversations)
