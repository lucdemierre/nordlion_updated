'use client'

import { ReactNode, useState } from 'react'
import { MoreVertical, GripVertical } from 'lucide-react'

interface DraggableWidgetProps {
  id: string
  children: ReactNode
  onDragStart?: () => void
  onDragEnd?: () => void
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: () => void
  isDragging?: boolean
}

export default function DraggableWidget({
  id,
  children,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  isDragging = false
}: DraggableWidgetProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [isDraggingLocal, setIsDraggingLocal] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    setIsDraggingLocal(true)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', id)
    if (onDragStart) onDragStart()
  }

  const handleDragEnd = () => {
    setIsDraggingLocal(false)
    if (onDragEnd) onDragEnd()
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`relative group bg-[#141414] rounded-2xl border transition-all duration-300 ${
        isDragging || isDraggingLocal
          ? 'opacity-50 scale-95 border-[#32b8c6]/50'
          : 'border-white/5 hover:border-white/10'
      }`}
      style={{ cursor: isDraggingLocal ? 'grabbing' : 'grab' }}
    >
      {/* Three-dot menu button */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 rounded-lg bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 hover:bg-[#0a0a0a] transition-colors"
          aria-label="Widget options"
        >
          <MoreVertical className="w-4 h-4 text-white/60" />
        </button>
        
        {/* Dropdown menu */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl overflow-hidden">
            <button className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/5 transition-colors flex items-center gap-2">
              <GripVertical className="w-4 h-4" />
              Move Widget
            </button>
            <button className="w-full px-4 py-2.5 text-left text-sm text-white/80 hover:bg-white/5 transition-colors">
              Refresh Data
            </button>
            <button className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5">
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Drag handle indicator */}
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <GripVertical className="w-5 h-5 text-white/20" />
      </div>

      {/* Widget content */}
      <div className="relative">
        {children}
      </div>
    </div>
  )
}
