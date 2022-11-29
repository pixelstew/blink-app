import React from 'react'

export interface MessageFormProps {
  onSubmit: (e: React.SyntheticEvent) => void
  conversationId: string | undefined
  messageId: string | null
  messageText: string
  setMessageText: React.Dispatch<React.SetStateAction<string>>
}

export function MessageForm({
  onSubmit,
  conversationId,
  messageId,
  messageText,
  setMessageText,
}: MessageFormProps) {
  return (
    <div className="w-[100%] h-[5rem] col-span-3 sticky bottom-0 right-0 p-4 border-t-2 shadow bg-white">
      <form onSubmit={onSubmit} className="flex">
        <label className="sr-only" htmlFor="message-text">
          Message text
        </label>
        <input
          id="message-text"
          className="h-12 border-2 border-slate-400 py-3 px-4 flex-grow mr-3 rounded w-[100% - 10rem] disabled:bg-slate-300 disabled:border-white"
          type="text"
          name="message-text"
          disabled={!conversationId}
          value={messageText}
          onChange={e => setMessageText(e.currentTarget.value)}
        />
        <button
          className="w-24 h-12 text-center bg-slate-600 hover:bg-slate-800 px-4 py-2 text-white rounded disabled:bg-slate-300 disabled:border-white"
          type="submit"
          disabled={!conversationId || messageText === ''}
        >
          {messageId ? 'Edit' : 'Send'}
        </button>
      </form>
    </div>
  )
}
