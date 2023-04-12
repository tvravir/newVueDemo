
let eventGuid = 1
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
// console.log('todaystr', todayStr);
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    end: "2023-04-18"
  },
  {
    id: createEventId(),
    title: 'Birthday Days',
    start: '2023-04-04',
    end: '2023-04-10',
    backgroundColor: '#4f46e5',
  },
  {
    id: createEventId(),
    title: 'test',
    start: '2023-04-15',
    end: '2023-04-16'
  },
  {
    id: createEventId(),
    title: 'test 3',
    start: '2023-04-17',
    end: '2023-04-18'
  },
  {
    id: createEventId(),
    title: 'test 12',
    start: todayStr + 'T12:00:00',
    end: "2023-04-18"
  }
]

export function createEventId() {
  // console.log('today Str', todayStr);
  return String(eventGuid++)
}

export function updateEvent(allEvents, event) {
  allEvents.forEach(element => {
    if (element.id == event.event.id) {
      element.title = event.title
    }

  });

}