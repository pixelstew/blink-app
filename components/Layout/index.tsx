import * as React from 'react'
import {Logo} from '../Logo'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({children}: LayoutProps) {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <header className="h-24 p-4 flex-shrink-1 border-2 border-slate-200">
        <Logo />
      </header>
      <main className="flex-grow-1 h-[100%] ">{children}</main>
    </div>
  )
}
