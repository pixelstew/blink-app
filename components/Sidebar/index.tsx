interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({children}: SidebarProps) {
  return (
    <aside className="bg-gray-200 flex flex-col py-8 px-4">{children}</aside>
  )
}
