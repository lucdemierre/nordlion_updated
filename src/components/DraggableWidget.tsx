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

interface WidgetRect {
  x: number
  y: number
  width: number
  height: number
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
  const animationFrameRef = useRef<number>()

  const GRID_SIZE = 300 // Snap grid size
  const COLLISION_PADDING = 20 // Padding between widgets to prevent overlap

  // Snap to grid function
  const snapToGrid = (x: number, y: number) => {
    const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE
    const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE
    return { x: Math.max(0, snappedX), y: Math.max(0, snappedY) }
  }

  // Check if two rectangles overlap
  const checkCollision = (rect1: WidgetRect, rect2: WidgetRect): boolean => {
    return !(
      rect1.x + rect1.width + COLLISION_PADDING <= rect2.x ||
      rect1.x >= rect2.x + rect2.width + COLLISION_PADDING ||
      rect1.y + rect1.height + COLLISION_PADDING <= rect2.y ||
      rect1.y >= rect2.y + rect2.height + COLLISION_PADDING
    )
  }

  // Get all other widgets' positions and dimensions
  const getOtherWidgets = (): WidgetRect[] => {
    const widgets: WidgetRect[] = []
    const allWidgets = document.querySelectorAll('[data-widget-id]')
    
    allWidgets.forEach((widget) => {
      const widgetId = widget.getAttribute('data-widget-id')
      if (widgetId !== id) {
        const rect = widget.getBoundingClientRect()
        const container = widget.closest('.widget-container')
        if (container) {
          const containerRect = container.getBoundingClientRect()
          const transform = window.getComputedStyle(widget as HTMLElement).transform
          
          let x = 0, y = 0
          if (transform && transform !== 'none') {
            const matrix = transform.match(/matrix\(([^)]+)\)/)
            if (matrix) {
              const values = matrix[1].split(', ')
              x = parseFloat(values[4])
              y = parseFloat(values[5])
            }
          }
          
          widgets.push({
            x,
            y,
            width: rect.width,
            height: rect.height,
          })
        }
      }
    })
    
    return widgets
  }

  // Find the nearest valid position without collision
  const findValidPosition = (targetX: number, targetY: number): { x: number; y: number } => {
    if (!widgetRef.current) return { x: targetX, y: targetY }
    
    const rect = widgetRef.current.getBoundingClientRect()
    const currentRect: WidgetRect = {
      x: targetX,
      y: targetY,
      width: rect.width,
      height: rect.height,
    }
    
    const otherWidgets = getOtherWidgets()
    
    // Check if the target position causes any collision
    const hasCollision = otherWidgets.some((widget) => checkCollision(currentRect, widget))
    
    if (!hasCollision) {
      return { x: targetX, y: targetY }
    }
    
    // Try to find a nearby valid position
    const searchRadius = 50
    const searchStep = 10
    
    for (let radius = searchStep; radius <= searchRadius; radius += searchStep) {
      const angles = [0, 90, 180, 270, 45, 135, 225, 315]
      
      for (const angle of angles) {
        const rad = (angle * Math.PI) / 180
        const testX = targetX + Math.cos(rad) * radius
        const testY = targetY + Math.sin(rad) * radius
        
        if (testX < 0 || testY < 0) continue
        
        const testRect: WidgetRect = {
          x: testX,
          y: testY,
          width: rect.width,
          height: rect.height,
        }
        
        const testHasCollision = otherWidgets.some((widget) => checkCollision(testRect, widget))
        
        if (!testHasCollision) {
          return { x: testX, y: testY }
        }
      }
    }
    
    // If no valid position found, return the previous position
    return position
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

      // Use requestAnimationFrame for smoother animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const deltaX = e.clientX - dragStart.x
        const deltaY = e.clientY - dragStart.y

        const targetX = Math.max(0, initialPos.x + deltaX)
        const targetY = Math.max(0, initialPos.y + deltaY)

        // Update position with deltas (smooth movement during drag)
        setPosition({ x: targetX, y: targetY })
      })
    }

    const handleMouseUp = () => {
      if (isDragging) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }

        // Find valid position without collision
        const validPosition = findValidPosition(position.x, position.y)
        
        // Snap to grid on release
        const snapped = snapToGrid(validPosition.x, validPosition.y)
        
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isDragging, position, dragStart, initialPos, id, onPositionChange])

  return (
    <div
      ref={widgetRef}
      data-widget-id={id}
      className={`widget-container bg-[#141414] border border-white/5 rounded-xl overflow-hidden transition-all ${
        isDragging 
          ? 'duration-75 shadow-2xl shadow-[#D67C3C]/40 scale-[0.97] border-[#D67C3C]/50' 
          : 'duration-300 ease-out'
      }`}
      style={{
        position: 'relative',
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: isDragging ? 1000 : 1,
        cursor: isDragging ? 'grabbing' : 'auto',
        willChange: isDragging ? 'transform' : 'auto',
      }}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0a0a]">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <button
          onMouseDown={handleMouseDown}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-white/5 rounded transition-colors"
          style={{ zIndex: 1001 }}
        >
          <GripVertical size={16} className="text-white/40 hover:text-[#D67C3C] transition-colors" />
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}
