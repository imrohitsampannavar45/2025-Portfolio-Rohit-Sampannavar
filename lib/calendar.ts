export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  type: 'personal' | 'work' | 'project' | 'meeting';
  color: string;
}

// Mock calendar events - in a real app, this would be stored in a database
let calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    description: 'Daily team standup meeting',
    start: new Date(2024, 0, 25, 9, 0),
    end: new Date(2024, 0, 25, 9, 30),
    type: 'meeting',
    color: '#3B82F6'
  },
  {
    id: '2',
    title: 'Project Deadline',
    description: 'E-commerce platform MVP release',
    start: new Date(2024, 0, 30, 17, 0),
    end: new Date(2024, 0, 30, 18, 0),
    type: 'project',
    color: '#EF4444'
  },
  {
    id: '3',
    title: 'Code Review',
    description: 'Review pull requests for authentication module',
    start: new Date(2024, 0, 26, 14, 0),
    end: new Date(2024, 0, 26, 15, 0),
    type: 'work',
    color: '#10B981'
  }
];

export const getCalendarEvents = (): CalendarEvent[] => {
  return calendarEvents;
};

export const createCalendarEvent = (event: Omit<CalendarEvent, 'id'>): CalendarEvent => {
  const newEvent: CalendarEvent = {
    ...event,
    id: Date.now().toString()
  };
  calendarEvents.push(newEvent);
  return newEvent;
};

export const updateCalendarEvent = (id: string, updates: Partial<Omit<CalendarEvent, 'id'>>): CalendarEvent | null => {
  const index = calendarEvents.findIndex(event => event.id === id);
  if (index === -1) return null;
  
  calendarEvents[index] = {
    ...calendarEvents[index],
    ...updates
  };
  return calendarEvents[index];
};

export const deleteCalendarEvent = (id: string): boolean => {
  const index = calendarEvents.findIndex(event => event.id === id);
  if (index === -1) return false;
  
  calendarEvents.splice(index, 1);
  return true;
};