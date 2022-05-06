import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Modal from "../../Modals/GenericModal";
import Guide from "./WelcomeGuide";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

class MyCalendar extends Component {
  state = {
    events: [],
    selectedEvent: {},
    showGuideModal: false,
    newEventStart: null,
    newEventEnd: null,
    createQuickModal: false
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
    alert(newEventStart);

    this.setState({
      newEventStart,
      newEventEnd,
      createQuickModal: true,
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
          defaultView="day"
          views={["week", "day", "agenda"]}
          step={15}
          timeslots={4}
          min={moment().hours(5).minutes(0).toDate()}
          onSelectSlot={this.slotSelectionHandler}
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
