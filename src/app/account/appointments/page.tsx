'use client';

import { useState } from 'react';
import { Plus, Calendar as CalendarIcon, List, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  serviceType: string;
  location: string;
  specialist: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

export default function AppointmentsPage() {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock data
  const appointments: Appointment[] = [
    {
      id: 'APT-001',
      date: '2026-02-18',
      time: '14:00',
      serviceType: 'Watch Authentication',
      location: 'NordLion Reserve Singapore',
      specialist: 'Sarah Chen',
      status: 'confirmed',
      notes: 'Please bring original purchase documentation'
    },
    {
      id: 'APT-002',
      date: '2026-02-25',
      time: '10:30',
      serviceType: 'Vehicle Inspection',
      location: 'NordLion Reserve Singapore',
      specialist: 'Michael Torres',
      status: 'confirmed'
    },
    {
      id: 'APT-003',
      date: '2026-02-12',
      time: '15:00',
      serviceType: 'Valuation Consultation',
      location: 'NordLion Reserve Singapore',
      specialist: 'Emily Zhao',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-neutral-500/20 text-neutral-400';
    }
  };

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.date) >= new Date() && apt.status !== 'completed' && apt.status !== 'cancelled'
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastAppointments = appointments.filter(apt => 
    new Date(apt.date) < new Date() || apt.status === 'completed'
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-light tracking-wide mb-2">YOUR APPOINTMENTS</h1>
            <p className="text-neutral-400 text-sm">
              {upcomingAppointments.length} upcoming {upcomingAppointments.length === 1 ? 'appointment' : 'appointments'}
            </p>
          </div>
          <button className="bg-[#ff4d6d] hover:bg-[#e6445f] text-white px-6 py-3 text-sm tracking-wider transition-colors flex items-center gap-2">
            <Plus size={18} />
            SCHEDULE APPOINTMENT
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 border ${viewMode === 'list' ? 'bg-neutral-900 border-neutral-700' : 'border-neutral-800'} transition-colors flex items-center gap-2 text-sm`}
          >
            <List size={18} />
            LIST VIEW
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 border ${viewMode === 'calendar' ? 'bg-neutral-900 border-neutral-700' : 'border-neutral-800'} transition-colors flex items-center gap-2 text-sm`}
          >
            <CalendarIcon size={18} />
            CALENDAR VIEW
          </button>
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-8">
            {/* Upcoming Appointments */}
            {upcomingAppointments.length > 0 && (
              <div>
                <h2 className="text-xl font-light mb-4 tracking-wide">UPCOMING</h2>
                <div className="space-y-4">
                  {upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="border border-neutral-800 hover:border-neutral-700 transition-colors p-6">
                      <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-light mb-2">{apt.serviceType}</h3>
                              <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
                                <div className="flex items-center gap-2">
                                  <CalendarIcon size={16} />
                                  <span>{new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock size={16} />
                                  <span>{apt.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin size={16} />
                                  <span>{apt.location}</span>
                                </div>
                              </div>
                            </div>
                            <span className={`px-3 py-1 text-xs tracking-wider ${getStatusColor(apt.status)}`}>
                              {apt.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-sm text-neutral-400 mb-4">
                            <p><span className="text-neutral-500">Specialist:</span> {apt.specialist}</p>
                            {apt.notes && <p className="mt-1"><span className="text-neutral-500">Notes:</span> {apt.notes}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4 border-t border-neutral-800">
                        <button className="border border-neutral-700 hover:border-neutral-600 px-4 py-2 text-xs tracking-wider transition-colors">
                          VIEW DETAILS
                        </button>
                        <button className="border border-neutral-700 hover:border-neutral-600 px-4 py-2 text-xs tracking-wider transition-colors">
                          RESCHEDULE
                        </button>
                        <button className="border border-neutral-700 hover:border-neutral-600 px-4 py-2 text-xs tracking-wider transition-colors">
                          ADD TO CALENDAR
                        </button>
                        <button className="border border-red-900 hover:border-red-800 text-red-400 px-4 py-2 text-xs tracking-wider transition-colors">
                          CANCEL
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Appointments */}
            {pastAppointments.length > 0 && (
              <div>
                <h2 className="text-xl font-light mb-4 tracking-wide">PAST APPOINTMENTS</h2>
                <div className="space-y-4">
                  {pastAppointments.map((apt) => (
                    <div key={apt.id} className="border border-neutral-800 p-6 opacity-60">
                      <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-light mb-2">{apt.serviceType}</h3>
                              <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
                                <div className="flex items-center gap-2">
                                  <CalendarIcon size={16} />
                                  <span>{new Date(apt.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock size={16} />
                                  <span>{apt.time}</span>
                                </div>
                              </div>
                            </div>
                            <span className={`px-3 py-1 text-xs tracking-wider ${getStatusColor(apt.status)}`}>
                              {apt.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="border border-neutral-800 p-6">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-light tracking-wide">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-4 py-2 border border-neutral-800 hover:border-neutral-700 transition-colors text-sm"
                >
                  TODAY
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-neutral-800">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="bg-black p-4 text-center text-sm text-neutral-500">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className="bg-black p-4 min-h-[100px] text-sm">
                  <div className="text-neutral-500">{i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="text-center py-20 border border-neutral-800">
            <div className="w-24 h-24 bg-neutral-900 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CalendarIcon size={40} className="text-neutral-600" />
            </div>
            <h3 className="text-2xl font-light mb-2">No appointments scheduled</h3>
            <p className="text-neutral-400 mb-6">Book your first consultation</p>
            <button className="bg-[#ff4d6d] hover:bg-[#e6445f] text-white px-8 py-3 text-sm tracking-wider transition-colors">
              SCHEDULE APPOINTMENT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}