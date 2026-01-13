import React, { useState, useMemo } from 'react';
import { scheduleData, abstractsData } from '../data';
import { Clock, MapPin, ChevronDown, ChevronUp, Mic } from 'lucide-react';
import { PresentationType } from '../types';

interface OralSession {
  slot: string;
  room: string;
  researchType: string;
  presentations: {
    time: string;
    presenter: string;
    title: string;
    id: string;
  }[];
}

const sessionInfo: Record<string, { room: string; researchType: string }> = {
  '1A': { room: 'Auditorium', researchType: 'Foundational Science' },
  '1B': { room: 'Boardroom', researchType: 'Translational Science' },
  '2A': { room: 'Boardroom', researchType: 'Foundational Science' },
  '2B': { room: 'Auditorium', researchType: 'Veterinary Clinical Science' },
};

function parseTime(timeStr: string): number {
  // Parse times like "11:30 - 11:45" or "1:45 - 2:00"
  const startTime = timeStr.split(' - ')[0];
  if (!startTime || !startTime.includes(':')) return 999;

  const [hours, minutes] = startTime.split(':').map(Number);
  // Convert to 24-hour for sorting (assume PM for times < 9)
  const hour24 = hours < 9 ? hours + 12 : hours;
  return hour24 * 60 + minutes;
}

function formatTimeSlot(timeStr: string): string {
  // Convert "11:30 - 11:45" to "11:30 AM"
  const startTime = timeStr.split(' - ')[0];
  if (!startTime || !startTime.includes(':')) return timeStr;

  const [hours] = startTime.split(':').map(Number);
  const suffix = hours < 9 || hours === 12 ? 'PM' : 'AM';
  return `${startTime} ${suffix}`;
}

interface SessionAccordionProps {
  title: string;
  time: string;
  sessions: OralSession[];
  posterInfo: string;
}

function SessionAccordion({ title, time, sessions, posterInfo }: SessionAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSession, setOpenSession] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex-1 text-left">
          <div className="flex items-center text-sm text-[#1E4D2B] font-bold mb-1">
            <Clock size={14} className="mr-1.5" />
            {time}
          </div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">Tap to view oral presentation details</p>
        </div>
        <div className={`ml-4 p-2 rounded-full transition-colors ${isOpen ? 'bg-[#1E4D2B] text-white' : 'bg-gray-100 text-gray-600'}`}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50">
          {sessions.map((session) => (
            <div key={session.slot} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpenSession(openSession === session.slot ? null : session.slot)}
                className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1E4D2B] text-white flex items-center justify-center font-bold text-sm">
                    {session.slot}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{session.researchType}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin size={10} />
                      {session.room}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 transition-transform ${openSession === session.slot ? 'rotate-180' : ''}`}
                />
              </button>

              {openSession === session.slot && (
                <div className="border-t border-gray-100 bg-gray-50 p-3 space-y-2">
                  {session.presentations.map((pres, idx) => (
                    <div key={idx} className="flex gap-3 p-2 bg-white rounded-lg border border-gray-100">
                      <div className="flex-shrink-0 w-16 text-xs font-medium text-[#1E4D2B]">
                        {formatTimeSlot(pres.time)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm">{pres.presenter}</div>
                        <div className="text-xs text-gray-600 mt-0.5 line-clamp-2">{pres.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Poster Session Info */}
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
            <div className="flex items-center gap-2 text-purple-800 font-medium text-sm">
              <MapPin size={14} />
              Poster Session - Grand Events Hall
            </div>
            <div className="text-xs text-purple-600 mt-1">{posterInfo}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ScheduleView() {
  const oralSessions = useMemo(() => {
    const orals = abstractsData.filter(a => a.presentationType === PresentationType.Oral);

    const grouped: Record<string, OralSession> = {};

    orals.forEach(oral => {
      const slot = oral.presentationSlot;
      if (!sessionInfo[slot]) return;

      if (!grouped[slot]) {
        grouped[slot] = {
          slot,
          room: sessionInfo[slot].room,
          researchType: sessionInfo[slot].researchType,
          presentations: []
        };
      }

      grouped[slot].presentations.push({
        time: oral.location,
        presenter: oral.presenter.name,
        title: oral.title,
        id: oral.id
      });
    });

    // Sort presentations by time within each session
    Object.values(grouped).forEach(session => {
      session.presentations.sort((a, b) => parseTime(a.time) - parseTime(b.time));
    });

    return grouped;
  }, []);

  const session1 = [oralSessions['1A'], oralSessions['1B']].filter(Boolean);
  const session2 = [oralSessions['2A'], oralSessions['2B']].filter(Boolean);

  // Filter schedule items - exclude session items (we'll render those with accordions)
  const nonSessionItems = scheduleData.filter(event => event.type !== 'session');

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-[#1E4D2B] mb-6 px-2">Event Schedule</h2>

      <div className="space-y-4">
        {/* Check-in */}
        <TimelineEvent event={nonSessionItems.find(e => e.title.includes('Check-in'))!} />

        {/* Undergraduate Poster Session */}
        <TimelineEvent event={nonSessionItems.find(e => e.title.includes('Undergraduate'))!} />

        {/* Break after undergrad */}
        <TimelineEvent event={nonSessionItems.find(e => e.description?.includes('Undergrads'))!} />

        {/* Session I Accordion */}
        <SessionAccordion
          title="Session I"
          time="11:30 – 1:30 pm"
          sessions={session1}
          posterInfo="Odd numbered posters"
        />

        {/* Break between sessions */}
        <TimelineEvent event={nonSessionItems.find(e => e.description?.includes('odd posters'))!} />

        {/* Session II Accordion */}
        <SessionAccordion
          title="Session II"
          time="1:45 – 3:45 pm"
          sessions={session2}
          posterInfo="Even numbered posters"
        />

        {/* Refreshments */}
        <TimelineEvent event={nonSessionItems.find(e => e.title.includes('Refreshments'))!} />

        {/* Keynote */}
        <TimelineEvent event={nonSessionItems.find(e => e.title.includes('Keynote'))!} />

        {/* Awards */}
        <TimelineEvent event={nonSessionItems.find(e => e.title.includes('Awards'))!} />
      </div>
    </div>
  );
}

function TimelineEvent({ event }: { event: typeof scheduleData[0] | undefined }) {
  if (!event) return null;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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
  );
}
