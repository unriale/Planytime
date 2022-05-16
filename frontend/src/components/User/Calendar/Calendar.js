import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Modal from "../../Modals/GenericModal";
import Guide from "./WelcomeGuide";
import QuickModal from "./QuickModal";
import googleColors from "./data/googleColors";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const colorIndex = (colorTypes) => {
  // transform array of colors into one object (to be used as an index for O(1) lookup)
  const colorIndex = {};
  const colorKeys = Object.keys(colorTypes[0]).filter((key) => key !== "id"); // ['color']
  for (const color of colorTypes) {
    const colorData = {};
    colorKeys.forEach((key) => {
      colorData[key] = color[key];
    });
    colorIndex[color.id] = colorData;
  }
  return colorIndex; // {1: {color: '#123123'}, 2:{...}}
};

class MyCalendar extends Component {
  state = {
    events: [],
    selectedEvent: {},
    showGuideModal: false,
    newEventStart: null,
    newEventEnd: null,
    createQuickModal: false,
    colorIndex: colorIndex(googleColors),
  };

  componentDidMount() {
    this.checkIfNewVisitor();
    this.loadSavedEvents();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.events != prevState.events) {
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

  saveEventsToLocal = () => {
    const stringified = JSON.stringify(this.state.events);
    localStorage.setItem("schedule", stringified);
  };

  loadSavedEvents = () => {
    let savedData = localStorage.getItem("schedule");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      const events = parsed.map((event) => this.reformatEventData(event));
      this.setState({ events });
    }
  };

  closeGuideModal = () => this.setState({ showGuideModal: false });

  slotSelectionHandler = (slotInfo) => {
    let newEventStart = slotInfo.start;
    let newEventEnd = slotInfo.end;
    console.log("slotInfo = ", slotInfo);

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

  updateCalendarFromQuickCreate = (newEvents) => {
    console.log("Updating a calendar...");
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
      bgColor,
    };
    return updatedEvent;
  };

  setEventCellStyling = (event) => {
    let color = event.bgColor;
    let style = {
      background: color,
    };
    return { style };
  };

  moveEvent = (event, start, end) => {
    console.log(event, start, end);
  }

  render() {
    return (
      <div>
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
        />

        <QuickModal
          modalOpen={this.state.createQuickModal}
          googleColors={googleColors}
          colorIndex={this.state.colorIndex}
          start={this.state.newEventStart}
          end={this.state.newEventEnd}
          onClose={this.closeModalHandler}
          sendEventToCalendar={this.updateCalendarFromQuickCreate}
          onEventDrop={this.moveEvent}
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
