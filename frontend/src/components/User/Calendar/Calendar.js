import React, { Component, useContext, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Modal from "../../Modals/GenericModal";
import Guide from "./WelcomeGuide";
import QuickModal from "./QuickModal";
import ReplanModal from "./ReplanModal";
import googleColors from "./data/googleColors";
import ColorIndex from "./utils/colorIndex";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  formatToDateString,
  formatToTimeString,
} from "../../../utils/dateTimeFormatter";
import AuthContext from "../../../context/AuthContext";
import GoogleCalendar from "./GoogleCalendar";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

class MyCalendar extends Component {
  static contextType = AuthContext;

  state = {
    events: [],
    dbEvents: [],
    eventsToAdd: [],
    googleEventsToAdd: [],
    selectedEvent: {},
    showGuideModal: false,
    newEventStart: null,
    newEventEnd: null,
    createQuickModal: false,
    createReplanModal: false,
    colorIndex: ColorIndex(googleColors),
  };

  async componentDidMount() {
    console.log("componentDidMount");
    this.checkIfNewVisitor();
    this.loadSavedEvents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.events !== prevState.events) {
      this.saveEventsToLocal();
    }
  }

  checkIfNewVisitor = () => {
    let returningUser = localStorage.getItem("returningUser");
    if (!returningUser) {
      localStorage.setItem("returningUser", true);
      this.setState({ showGuideModal: true });
    }
  };

  saveEventsToLocal = async () => {
    if (this.state.eventsToAdd.length !== 0) {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/api/eventsave/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(this.context.authTokens.access),
          },
          body: JSON.stringify({
            events: this.state.eventsToAdd,
          }),
        }
      );

      if (response.status === 200) {
        let data = await response.json();
        console.log("SAVED!, response data is ", data);
        this.loadSavedEvents();
        this.setState({ eventsToAdd: [] });
      } else {
        console.error("error on post request");
      }
    }
    if (this.state.googleEventsToAdd.length !== 0) {
      this.setState({ googleEventsToAdd: [] }, () => {
        let googleEvents = this.state.events.filter((ev) => !ev.id);
        let reducedGoogleEvents = googleEvents.map((ev) =>
          this.reduceGoogleEventsData(ev)
        );
        localStorage.setItem(
          "googleEvents",
          JSON.stringify(reducedGoogleEvents)
        );
      });
    }
  };

  reduceGoogleEventsData = (event) => {
    let { start, end, bgColor, ...reduced } = event;
    return reduced;
  };

  loadSavedEvents = async () => {
    console.log("Loading events from a DB...");
    let response = await fetch(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/api/events/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(this.context.authTokens.access),
        },
      }
    );
    let data = await response.json();
    if (data) {
      console.log("Events before reformatting are ", data);
      const events = data.map((event) => this.reformatEventData(event));
      console.log("Events loaded and reformated are = ", events);
      this.setState({ dbEvents: events });
      this.setState({ events }, () => this.loadGoogleEvents());
    }
  };

  loadGoogleEvents = () => {
    let googleEvents = localStorage.getItem("googleEvents");
    if (googleEvents) {
      let parsedGoogleEvents = JSON.parse(googleEvents);
      let reformatedEvents = parsedGoogleEvents.map((ev) =>
        this.reformatEventData(ev)
      );
      this.setState({
        events: [...this.state.events, ...reformatedEvents],
      });
    }
  };

  closeGuideModal = () => this.setState({ showGuideModal: false });
  openGuideModal = () => this.setState({ showGuideModal: true });

  slotSelectionHandler = (slotInfo) => {
    let newEventStart = slotInfo.start;
    let newEventEnd = slotInfo.end;

    this.setState({
      newEventStart,
      newEventEnd,
      createQuickModal: true,
    });
  };

  closeModalHandler = () => {
    this.setState({
      createQuickModal: false,
      selectedEvent: {},
    });
  };

  closeReplanModalHandler = () => {
    this.setState({
      createReplanModal: false,
    });
  };

  updateCalendarFromQuickCreate = (newEvents) => {
    this.setState({ eventsToAdd: newEvents });
    let newEventsArr = newEvents.map((ev) => this.reformatEventData(ev));
    this.setState({
      events: [...this.state.events, ...newEventsArr],
      createQuickModal: false,
    });
  };

  reformatEventData = (event) => {
    const colorData = this.state.colorIndex[event.colorTypeId];
    let bgColor = colorData ? colorData.color : "#4286f4";
    const updatedEvent = {
      ...event,
      start: new Date(`${event.date} ${event.startTime}`),
      end: new Date(`${event.date} ${event.endTime}`),
      isDraggable: event.id ? true : false,
      bgColor,
    };
    return updatedEvent;
  };

  setEventCellStyling = (event) => {
    let color = event.bgColor;
    let style = {
      background: color,
      borderColor: "#c2bcbb",
    };
    if (event.isDraggable) {
      style = { ...style, className: "isDraggable" };
    } else {
      style = { ...style, className: "nonDraggable" };
    }
    return { style };
  };

  getUpdatedEvent = (event) => {
    let selectedEvent = event.event;
    selectedEvent.date = formatToDateString(event.start);
    selectedEvent.startTime = formatToTimeString(event.start);
    selectedEvent.endTime = formatToTimeString(event.end);
    selectedEvent.start = new Date(
      `${selectedEvent.date} ${selectedEvent.startTime}`
    );
    selectedEvent.end = new Date(
      `${selectedEvent.date} ${selectedEvent.endTime}`
    );
    selectedEvent.dayIndex = moment(selectedEvent.start).format("e"); // day index
    return selectedEvent;
  };

  sendUpdatedEvent = async (eventData) => {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/api/eventupdate/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(this.context.authTokens.access),
        },
        body: JSON.stringify({
          event: eventData,
        }),
      }
    );
    return response;
  };

  updateEvent = async (event) => {
    let updatedEvent = this.getUpdatedEvent(event);
    let response = await this.sendUpdatedEvent(updatedEvent);

    if (response.status === 200) {
      const { events } = this.state;
      let remaining = events.filter((event) => event != updatedEvent);
      this.setState({
        events: [...remaining, updatedEvent],
      });
    }
  };

  selectEvent = (event) => {
    this.setState({ selectedEvent: event, createQuickModal: true });
  };

  renderUpdatedEvent = async (original, updated) => {
    let updatedEvent = this.reformatEventData(updated);
    let response = await this.sendUpdatedEvent(updatedEvent);
    if (response.status === 200) {
      const { events } = this.state;
      let remaining = events.filter((event) => event != original);
      this.setState({
        events: [...remaining, updatedEvent],
        selectedEvent: {},
        createQuickModal: false,
      });
    }
  };

  removeEventHandler = async (event) => {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/api/eventdelete/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(this.context.authTokens.access),
        },
        body: JSON.stringify({
          event: event,
        }),
      }
    );
    if (response.status === 200) {
      const { events } = this.state;
      const remaining = events.filter((ev) => ev != event);
      this.setState({
        events: remaining,
      });
    }
  };

  saveGoogleEvents = (events) => {
    let googleEvents;
    if (Object.keys(events).length === 0) {
      googleEvents = [];
      localStorage.removeItem("googleEvents");
    } else {
      googleEvents = events.map((event) => this.reformatEventData(event));
      googleEvents = googleEvents.map((event) => ({
        ...event,
        isGoogleEvent: true,
      }));
    }
    this.setState({ googleEventsToAdd: googleEvents });
    this.setState({ events: [...this.state.dbEvents, ...googleEvents] });
  };

  openReplanModal = () => {
    this.setState({ createReplanModal: true });
  };

  render() {
    return (
      <div>
        <GoogleCalendar
          sendEvents={this.saveGoogleEvents}
          events={this.state.events}
          openWelcomeGuide={this.openGuideModal}
          openReplanModal={this.openReplanModal}
        />
        <DragAndDropCalendar
          style={{ flex: 1, minHeight: "90vh", margin: "10px" }}
          selectable={true}
          events={this.state.events}
          localizer={localizer}
          defaultView="week"
          views={["week", "day", "agenda"]}
          step={15}
          timeslots={4}
          min={moment().hours(5).minutes(0).toDate()}
          onSelectSlot={this.slotSelectionHandler}
          eventPropGetter={this.setEventCellStyling}
          onEventDrop={this.updateEvent}
          onEventResize={this.updateEvent}
          onSelectEvent={this.selectEvent}
          draggableAccessor="isDraggable"
        />

        <QuickModal
          modalOpen={this.state.createQuickModal}
          googleColors={googleColors}
          colorIndex={this.state.colorIndex}
          start={this.state.newEventStart}
          end={this.state.newEventEnd}
          selectedEvent={this.state.selectedEvent}
          onClose={this.closeModalHandler}
          sendEventToCalendar={this.updateCalendarFromQuickCreate}
          showUpdatedEvent={this.renderUpdatedEvent}
          delete={this.removeEventHandler}
        />
        <ReplanModal
          modalOpen={this.state.createReplanModal}
          onClose={this.closeReplanModalHandler}
          loadSavedEvents={this.loadSavedEvents}
        />
        <Modal
          modalOpen={this.state.showGuideModal}
          toggle={this.closeGuideModal}
        >
          <Guide />
        </Modal>
      </div>
    );
  }
}

export default MyCalendar;
