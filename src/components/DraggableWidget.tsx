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
  initialPosition,
  onPositionChange,
}: DraggableWidgetProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 })
  const widgetRef = useRef<HTMLDivElement>(null)
  const dragOffset = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true)
      
      if (widgetRef.current) {
        const rect = widgetRef.current.getBoundingClientRect()
        dragOffset.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
      }
      e.preventDefault()
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && widgetRef.current) {
      const newX = e.clientX - dragOffset.current.x
      const newY = e.clientY - dragOffset.current.y
      
      setPosition({
        x: Math.max(0, newX),
        y: Math.max(0, newY),
      })
    }
  }

  const snapToGrid = (x: number, y: number) => {
    // Snap to grid positions - 2 columns
    const gridWidth = 600 // Approximate width for 2 columns
    const gridHeight = 300 // Approximate height per row
    
    const col = Math.round(x / gridWidth)
    const row = Math.round(y / gridHeight)
    
    return {
      x: Math.max(0, Math.min(col, 1)) * gridWidth,
      y: Math.max(0, row) * gridHeight,
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      
      // Snap to grid
      const snappedPosition = snapToGrid(position.x, position.y)
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
        isDragging ? 'shadow-2xl shadow-[#D67C3C]/20 cursor-grabbing z-50 fixed' : 'relative'
      }`}
      style={isDragging ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: widgetRef.current?.offsetWidth || 'auto',
      } : {}}
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
