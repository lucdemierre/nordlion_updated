'use client'

import { useState, useEffect } from 'react'
import DashboardLayoutNew from '@/components/layout/DashboardLayoutNew'
import { getCurrentUser, User } from '@/lib/auth'
import { Sparkles, ArrowRight, Upload, ShieldCheck, Plus } from 'lucide-react'
import Link from 'next/link'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Widget {
  id: string
  title: string
  value: string
  change?: string
  icon: any
}

function SortableWidget({ widget }: { widget: Widget }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: widget.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const Icon = widget.icon

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 hover:border-[#D67C3C]/30 transition-all cursor-move"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-[#D67C3C]/10 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#D67C3C]" />
        </div>
        {widget.change && (
          <span className="text-xs text-green-400 font-light">{widget.change}</span>
        )}
      </div>
      <h3 className="text-white/50 text-sm font-light mb-2">{widget.title}</h3>
      <p className="text-3xl font-light text-white">{widget.value}</p>
    </div>
  )
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [widgets, setWidgets] = useState<Widget[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    // Initialize widgets based on role
    const defaultWidgets: Widget[] = [
      { id: '1', title: 'Active Orders', value: '3', change: '+2 this month', icon: Sparkles },
      { id: '2', title: 'Wishlist Items', value: '12', icon: Sparkles },
      { id: '3', title: 'Total Spent', value: '$245,000', change: '+15%', icon: Sparkles },
      { id: '4', title: 'Saved Searches', value: '8', icon: Sparkles },
    ]

    setWidgets(defaultWidgets)
  }, [])

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  if (!user) return null

  const verificationComplete = user.verified && user.profileComplete
  const stepsCompleted = [user.profileComplete, user.verified, false].filter(Boolean).length

  return (
    <DashboardLayoutNew>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/50 text-sm font-light">Good {getTimeOfDay()}</p>
            <h1 className="text-2xl font-light text-white mt-1">
              {user.role.toUpperCase()}
            </h1>
            <p className="text-white/30 text-sm font-extralight mt-1">
              {verificationComplete ? 'Complete verification to unlock sourcing + vault' : 'All systems operational'}
            </p>
            <p className="text-white/30 text-xs font-extralight">Last login: 3 hours ago</p>
          </div>
          <button className="px-6 py-3 bg-[#D67C3C] hover:bg-[#B85A1F] text-white rounded-xl font-light text-sm transition-colors flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            COLLECTOR
          </button>
        </div>

        {/* Get Started Section */}
        {!verificationComplete && (
          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-red-500" />
                <div>
                  <h2 className="text-white font-medium text-sm">GET STARTED</h2>
                  <p className="text-white/50 text-xs font-light">{stepsCompleted} of 3 steps completed</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Step 1: Complete Profile */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-light">Complete Your Profile</h3>
                    <p className="text-white/40 text-xs font-extralight">Add your details for personalised service</p>
                  </div>
                </div>
                {!user.profileComplete && (
                  <Link
                    href="/dashboard/profile"
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
                  >
                    COMPLETE PROFILE
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>

              {/* Step 2: Verify Identity */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-light">Verify Your Identity</h3>
                    <p className="text-white/40 text-xs font-extralight">KYC verification unlocks full access</p>
                  </div>
                </div>
                {!user.verified && (
                  <Link
                    href="/dashboard/verification"
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-light transition-colors"
                  >
                    VERIFY
                  </Link>
                )}
              </div>

              {/* Step 3: Add Asset */}
              <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-light">Add Your First Asset</h3>
                    <p className="text-white/40 text-xs font-extralight">Register watches, cars, or other collectibles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Verification Status */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-white/40 text-xs font-extralight">VERIFICATION</p>
              <p className="text-yellow-500 text-sm font-light">Pending</p>
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 flex items-center gap-3">
            <Upload className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-white/40 text-xs font-extralight">PROFILE</p>
              <p className="text-white text-sm font-light">{user.profileComplete ? '100%' : '0%'}</p>
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-white/40" />
            <div>
              <p className="text-white/40 text-xs font-extralight">SECURITY</p>
              <p className="text-white text-sm font-light">2FA {user.twoFactorEnabled ? 'On' : 'Off'}</p>
            </div>
          </div>
          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-white/40" />
            <div>
              <p className="text-white/40 text-xs font-extralight">CONTACT</p>
              <p className="text-white text-sm font-light">Email</p>
            </div>
          </div>
        </div>

        {/* Action Queue */}
        <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6">
          <h2 className="text-white/70 text-xs font-light uppercase tracking-wider mb-4">ACTION QUEUE</h2>
          <Link
            href="/dashboard/profile"
            className="flex items-center justify-between p-4 bg-[#0f0f0f] border border-white/5 rounded-xl hover:border-[#D67C3C]/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-white text-sm font-light">Complete your profile</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40" />
          </Link>
        </div>

        {/* Draggable Widgets */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white/70 text-xs font-light uppercase tracking-wider">STATISTICS</h2>
            <p className="text-white/30 text-xs font-extralight">Drag to reorder</p>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={widgets} strategy={verticalListSortingStrategy}>
              <div className="grid grid-cols-4 gap-4">
                {widgets.map((widget) => (
                  <SortableWidget key={widget.id} widget={widget} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </DashboardLayoutNew>
  )
}

function getTimeOfDay() {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  return 'evening'
}
