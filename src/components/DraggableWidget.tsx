'use client'

import { useState, useRef, useEffect } from 'react'
import { GripVertical } from 'lucide-react'

interface DraggableWidgetProps {
  id: string
  title: string
  children: React.ReactNode
  onPositionChange?: (id: string, position: { x: number; y: number }) => void
  initialPosition?: { x: number; y: number }
}

export default function DraggableWidget({
  id,
  title,
  children,
  onPositionChange,
  initialPosition = { x: 0, y: 0 },
}: DraggableWidgetProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(initialPosition)
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number }>({
    startX: 0,
    startY: 0,
    startPosX: 0,
    startPosY: 0,
  })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - dragRef.current.startX
      const deltaY = e.clientY - dragRef.current.startY

      const newPosition = {
        x: dragRef.current.startPosX + deltaX,
        y: dragRef.current.startPosY + deltaY,
      }

      setPosition(newPosition)
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        if (onPositionChange) {
          onPositionChange(id, position)
        }
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, id, position, onPositionChange])

  return (
    <div
      className={`bg-[#141414] border border-white/5 rounded-xl overflow-hidden transition-shadow ${
        isDragging ? 'shadow-2xl shadow-[#22c55e]/20' : ''
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'default',
      }}
    >
      {/* Draggable Header */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b border-white/5 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <GripVertical size={18} className="text-white/30" />
        <h3 className="text-sm font-medium text-white flex-1">{title}</h3>
      </div>

      {/* Widget Content */}
      <div className="p-4">{children}</div>
    </div>
  )
}
