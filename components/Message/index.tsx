import {format} from 'date-fns'
import type {Message} from '../../types'

export interface MessageProps {
  message: Message
  selected: boolean
  onClick: () => void
}

export function Message({message, onClick, selected}: MessageProps) {
  return (
    <button
      className={`text-left bg-slate-100 mb-6 rounded-lg py-4 pl-4 pr-10 inline-block shadow hover:shadow-md relative ${
        selected ? 'bg-slate-600 border-slate-600 text-white' : ''
      }`}
      onClick={onClick}
      key={message.id}
    >
      <p className="text-xs mb-4">
        {format(new Date(message.last_updated), 'MMM do yyyy, p')}
      </p>
      <p className="text-base">{message.text}</p>
      {message.edited && (
        <p className="text-[0.5rem] ml-auto text-white bg-slate-800 rounded-tr py-1 px-2 absolute top-0 right-0">
          Edited
        </p>
      )}
    </button>
  )
}
