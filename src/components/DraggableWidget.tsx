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
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 })
  const widgetRef = useRef<HTMLDivElement>(null)

  const GRID_SIZE = 300 // Snap grid size

  // Snap to grid function
  const snapToGrid = (x: number, y: number) => {
    const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE
    const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE
    return { x: Math.max(0, snappedX), y: Math.max(0, snappedY) }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!widgetRef.current) return

    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setInitialPos(position)
    e.preventDefault()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y

      // Update position with deltas
      setPosition({
        x: Math.max(0, initialPos.x + deltaX),
        y: Math.max(0, initialPos.y + deltaY),
      })
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
  }, [isDragging, position, dragStart, initialPos, id, onPositionChange])

  return (
    <div
      ref={widgetRef}
      className={`bg-[#141414] border border-white/5 rounded-xl overflow-hidden transition-all duration-200 ${
        isDragging ? 'shadow-2xl shadow-[#D67C3C]/30 scale-[0.98]' : ''
      }`}
      style={{
        position: 'relative',
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: isDragging ? 1000 : 1,
        cursor: isDragging ? 'grabbing' : 'auto',
      }}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0a0a]">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <button
          onMouseDown={handleMouseDown}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-white/5 rounded transition-colors"
          style={{ zIndex: 1001 }}
        >
          <GripVertical size={16} className="text-white/40" />
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
