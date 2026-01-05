import React from 'react';
import { scheduleData } from '../data';
import { Clock, MapPin } from 'lucide-react';

export default function ScheduleView() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-[#1E4D2B] mb-6 px-2">Event Schedule</h2>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
        {scheduleData.map((event, index) => (
          <div key={index} className="relative flex items-start group">
            {/* Timeline Dot */}
            <div className={`absolute left-0 ml-5 -translate-x-1/2 mt-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${
              event.type === 'break' ? 'bg-orange-300' : 
              event.type === 'social' ? 'bg-purple-400' : 
              event.type === 'session' ? 'bg-[#1E4D2B]' : 'bg-gray-400'
            }`}></div>

            <div className="ml-10 w-full">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center text-sm text-[#1E4D2B] font-bold mb-1">
                  <Clock size={14} className="mr-1.5" />
                  {event.time}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                
                {event.location && (
                  <div className="flex items-center text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
                    <MapPin size={12} className="mr-1 text-[#C8C372]" />
                    {event.location}
                  </div>
                )}
                
                {event.description && (
                  <p className="text-sm text-gray-600 whitespace-pre-line mt-2 pl-3 border-l-2 border-gray-200">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}