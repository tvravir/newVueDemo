<template>
  <div>
    <FullCalendar class='demo-app-calendar' ref="calendar" :events="allEvents" :options='calendarOptions'
      v-if="randerCalendar">
      <template v-slot:eventContent='arg'>
        <b class="text-red-800">{{ arg.timeText }}</b>
        <i>{{ arg.event.title }}</i>
      </template>
    </FullCalendar>
    <eventModal v-model="show" title="Update Event" :selectedEvent=selectedDeleteEvent.event @confirm="confirm"
      @cancel="cancelDeleteEvent">
      <!-- {{ deleteTitle }} -->
    </eventModal>
    <eventModal v-model="showCreateModal" title="Create Event" @confirm="createEvent" @cancel="cancelDeleteEvent">
      <!-- <form @submit="$event => $event.preventDefault()">
				<label class="block text-sm font-bold text-[0.8125rem] mb-0.5 invalid:text-red-800" for="eventTitle">
					Event Title</label>
				<input type="text" v-model="eventTitle" required @keypress="errordata = {}"
					class="focus:outline-none border rounded-md w-full h-10 px-2 text-[0.8125rem]" id="eventTitle"
					placeholder="Event title">
			</form> -->
    </eventModal>
    <!-- <eventModal v-model="showCreateModal" title="Update Event" @confirm="createEvent" @cancel="cancelDeleteEvent">
		</eventModal> -->
  </div>
</template>

<script>

import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import { VueFinalModal, useModal } from 'vue-final-modal'
import eventModal from "../modal/eventModal.vue"

import { INITIAL_EVENTS, createEventId } from '../modal/event-utils';
export default {
  name: 'Calenndar-component',
  components: {
    FullCalendar,
    eventModal
  },


  data() {
    return {
      show: false,
      showCreateModal: false,
      deleteTitle: '',
      selectedDeleteEvent: '',
      selectedDateToCreateEvent: '',
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        height: 700
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
      allEvents: INITIAL_EVENTS,
      eventTitle: '',
      randerCalendar: true
    }
  },
  methods: {

    handleDateSelect(selectInfo) {
      console.log(selectInfo);
      this.showCreateModal = true

      this.selectedDateToCreateEvent = selectInfo
      return;
    },
    handleEventClick(clickInfo) {
      this.selectedDeleteEvent = clickInfo;
      this.show = true
      console.log(clickInfo.event)
      this.deleteTitle = `Are you sure you want to delete the event '${clickInfo.event.title}'`
      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      // 	// clickInfo.event.remove()
      // }
    },
    handleEvents(events) {
      this.currentEvents = events
      console.log('current Events', events);
    },
    confirm(event) {

      // this.selectedDeleteEvent.event.remove();

      let indexOfEvent = this.allEvents.findIndex(e => e.id == event.event.id)
      this.allEvents[indexOfEvent].title = event.title
      this.allEvents[indexOfEvent].start = event.start
      this.allEvents[indexOfEvent].end = event.end
      this.calendarOptions.initialEvents = this.allEvents
      console.log('Confirm ==>', event);
      console.log('All Ecents ==>', this.allEvents);
      this.cancelDeleteEvent();
      this.randerCalendar = false;
      this.$nextTick(() => {
        this.randerCalendar = true;
      });
    },
    cancelDeleteEvent() {
      this.show = false
      this.showCreateModal = false
      this.eventTitle = ''

    },
    createEvent(event) {
      console.log(event);
      let selectInfo = this.selectedDateToCreateEvent
      // let title = this.eventTitle
      let title = event;
      let calendarApi = selectInfo.view.calendar
      console.log('Calendar Api	', calendarApi);
      console.log('Select Information	', selectInfo);
      calendarApi.unselect() // clear date selection

      if (title) {
        let obj = {
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          backgroundColor: '#4f46e5',
          allDay: selectInfo.allDay
        }
        calendarApi.addEvent(obj)
        this.allEvents.push(obj)
        console.log(calendarApi);
      }
      // this.showCreateModal = false
      this.cancelDeleteEvent();
    }
  },
}
</script>

<style scoped></style>