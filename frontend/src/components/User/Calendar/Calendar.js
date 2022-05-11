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
  }

  checkIfNewVisitor = () => {
    let returningUser = localStorage.getItem("returningUser");
    if (!returningUser) {
      localStorage.setItem("returningUser", true);
      this.setState({ showGuideModal: true });
    }
  };

  closeGuideModal = () => this.setState({ showGuideModal: false });

  slotSelectionHandler = (slotInfo) => {
    let newEventStart = parseInt(moment(slotInfo.start).format("x"));
    let newEventEnd = parseInt(moment(slotInfo.end).format("x"));

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

  render() {
    return (
      <div>
        <DragAndDropCalendar
          style={{ flex: 1, minHeight: "90vh", margin: "10px" }}
          selectable={true}
          event={this.state.events}
          localizer={localizer}
          defaultView="week"
          views={["week", "day", "agenda"]}
          step={15}
          timeslots={4}
          min={moment().hours(5).minutes(0).toDate()}
          onSelectSlot={this.slotSelectionHandler}
        />

        <QuickModal
          modalOpen={this.state.createQuickModal}
          googleColors={googleColors}
          colorIndex={this.state.colorIndex}
          start={this.state.newEventStart}
          end={this.state.newEventEnd}
          onClose={this.closeModalHandler}
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
