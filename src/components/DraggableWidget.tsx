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

const GRID_SIZE = 20 // Snap to 20px grid
const WIDGET_POSITIONS = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 0, y: 2 },
  { x: 1, y: 2 },
]

export default function DraggableWidget({
  id,
  title,
  children,
  initialPosition,
  onPositionChange,
}: DraggableWidgetProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 })
  const widgetRef = useRef<HTMLDivElement>(null)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const dragOffset = useRef({ x: 0, y: 0 })

  // Snap to grid function
  const snapToGrid = (value: number) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE
  }

  // Find nearest valid position
  const findNearestPosition = (x: number, y: number) => {
    // Convert pixels to grid coordinates
    const gridX = Math.round(x / 300) // Assuming ~300px widget width
    const gridY = Math.round(y / 250) // Assuming ~250px widget height
    
    // Clamp to valid grid positions
    const clampedX = Math.max(0, Math.min(1, gridX))
    const clampedY = Math.max(0, Math.min(2, gridY))
    
    return {
      x: clampedX * 300,
      y: clampedY * 250,
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true)
      dragStartPos.current = { x: e.clientX, y: e.clientY }
      dragOffset.current = { x: position.x, y: position.y }
      e.preventDefault()
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartPos.current.x
      const deltaY = e.clientY - dragStartPos.current.y
      
      const newX = dragOffset.current.x + deltaX
      const newY = dragOffset.current.y + deltaY
      
      // Apply boundaries (don't let it go negative)
      setPosition({
        x: Math.max(0, newX),
        y: Math.max(0, newY),
      })
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      
      // Snap to nearest valid position
      const snappedPosition = findNearestPosition(position.x, position.y)
      setPosition(snappedPosition)
      
      if (onPositionChange) {
        onPositionChange(id, snappedPosition)
      }
    }
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, position])

  return (
    <div
      ref={widgetRef}
      className={`bg-[#141414] border border-white/5 rounded-xl p-6 transition-shadow ${
        isDragging ? 'shadow-2xl shadow-[#D67C3C]/20 cursor-grabbing z-50' : 'cursor-auto'
      }`}
      style={{
        position: isDragging ? 'fixed' : 'relative',
        transform: isDragging ? `translate(${position.x}px, ${position.y}px)` : 'none',
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <button className="drag-handle p-1 hover:bg-white/5 rounded cursor-grab active:cursor-grabbing transition-colors">
          <GripVertical size={18} className="text-white/40" />
        </button>
      </div>
      <div className="pointer-events-auto">{children}</div>
    </div>
  )
}
