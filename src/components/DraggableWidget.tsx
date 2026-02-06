'use client'

import { useState, useRef, useEffect } from 'react'
import { GripVertical } from 'lucide-react'

interface DraggableWidgetProps {
  id: string
  title: string
  children: React.ReactNode
  initialPosition?: { x: number; y: number }
  onPositionChange?: (id: string, position: { x: number; y: number }) => void
}

export default function DraggableWidget({
  id,
  title,
  children,
  initialPosition = { x: 0, y: 0 },
  onPositionChange,
}: DraggableWidgetProps) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const widgetRef = useRef<HTMLDivElement>(null)

  const GRID_SIZE = 300 // Snap grid size
  const COLUMN_WIDTH = 600 // Widget column width

  const snapToGrid = (x: number, y: number) => {
    const snappedX = Math.round(x / COLUMN_WIDTH) * COLUMN_WIDTH
    const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE
    return { x: Math.max(0, snappedX), y: Math.max(0, snappedY) }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!widgetRef.current) return
    
    const rect = widgetRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setIsDragging(true)
    e.preventDefault()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !widgetRef.current) return

      const container = widgetRef.current.parentElement
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      
      // Calculate position relative to container, accounting for offset
      let newX = e.clientX - containerRect.left - dragOffset.x
      let newY = e.clientY - containerRect.top - dragOffset.y

      // Constrain to container bounds
      const maxX = containerRect.width - widgetRef.current.offsetWidth
      const maxY = containerRect.height - widgetRef.current.offsetHeight
      
      newX = Math.max(0, Math.min(newX, maxX))
      newY = Math.max(0, Math.min(newY, maxY))

      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      if (isDragging) {
        // Snap to grid on release
        const snapped = snapToGrid(position.x, position.y)
        setPosition(snapped)
        if (onPositionChange) {
          onPositionChange(id, snapped)
        }
        setIsDragging(false)
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
  }, [isDragging, position, dragOffset, id, onPositionChange])

  return (
    <div
      ref={widgetRef}
      className={`bg-[#141414] border border-white/5 rounded-xl overflow-hidden transition-shadow ${
        isDragging ? 'shadow-2xl shadow-[#D67C3C]/20 cursor-grabbing' : ''
      }`}
      style={{
        position: position.x !== 0 || position.y !== 0 ? 'absolute' : 'relative',
        left: position.x !== 0 || position.y !== 0 ? `${position.x}px` : undefined,
        top: position.x !== 0 || position.y !== 0 ? `${position.y}px` : undefined,
        zIndex: isDragging ? 50 : 1,
      }}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0a0a]">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <button
          onMouseDown={handleMouseDown}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-white/5 rounded transition-colors"
        >
          <GripVertical size={16} className="text-white/40" />
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
