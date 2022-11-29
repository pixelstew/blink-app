import {format} from 'date-fns'

import type {Conversation} from '../../types'

interface ConversationProps {
  conversation: Conversation
  onClick: () => void
  selected?: boolean
}

export function Conversation({
  onClick,
  conversation,
  selected = false,
}: ConversationProps) {
  return (
    <button
      onClick={onClick}
      className={`text-left py-2 px-4 hover:bg-slate-300 hover:shadow mb-3 rounded-lg ${
        selected
          ? 'bg-slate-600 border-slate-600 hover:bg-slate-600 text-white'
          : ''
      }`}
    >
      <p className="text-xs">
        {format(new Date(conversation.last_updated), 'MMM do yyyy, p')}
      </p>
      <h2 className="text-lg">{conversation.name}</h2>
    </button>
  )
}
