import { Component } from "react";
import moment from "moment";
import ColorPicker from "./ColorPicker";
import MultiDayPicker from "./MultiDayPicker";
import daysOfWeek from "./data/daysOfWeek";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { Button } from "reactstrap";
import {
  formatToDateString,
  formatToTimeString,
} from "../../../utils/dateTimeFormatter";

import {
  Input,
  Label,
  FormGroup,
  ListGroup,
  Modal,
  ModalBody,
  ModalHeader,
  FormFeedback,
} from "reactstrap";

class QuickModal extends Component {
  state = {
    selectedDays: [],
    dayOfWeek: "",
    inEditMode: false,
    isGoogleEvent: false,
    colorTypeId: "9",
    addEventTitle: "Add to Your Schedule",
    editEventTitle: "Edit Your Saved Event",
    googleEventTitle: "Google Calendar Event",
    headerTextColor: "white",
    defaultBgColor: "#5484ed",
    modalHeaderColor: "",
    startTime: new Date(),
    endTime: new Date(),
    eventDate: new Date(),
    title: "",
    validation: {
      title: true,
      pickedDays: true,
      endTime: true,
    },
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.start !== prevProps.start ||
      this.props.end !== prevProps.end
    ) {
      this.setNewEventTime();
    }
    if (this.props.selectedEvent != prevProps.selectedEvent) {
      this.checkSelectedEvent();
    }
  }

  checkIfGoogleEvent = () => {
    if (this.props.selectedEvent.isGoogleEvent) {
      this.setState({ isGoogleEvent: true });
    } else this.setState({ isGoogleEvent: false });
  };

  checkSelectedEvent = () => {
    this.checkIfGoogleEvent();
    const { colorTypeId, dayIndex, end, start, title } =
      this.props.selectedEvent;
    if (colorTypeId) {
      this.updateModalBgColor(colorTypeId);
      this.setState({
        colorTypeId,
        inEditMode: true,
        title,
        startTime: start,
        endTime: end,
        dayIndex,
        dayOfWeek: dayIndex,
      });
    }
  };

  setSelectedColor = (colorTypeId) => {
    this.setState({ colorTypeId });
    this.updateModalBgColor(colorTypeId);
  };

  updateModalBgColor = (id) => {
    let modalHeaderColor = this.props.colorIndex[id].color;
    this.setState({ modalHeaderColor });
  };

  setSelectedDays = (selectedDays) => {
    this.setState({ selectedDays }, () => {
      this.validateDays();
    });
  };

  populateDaysBox = (dayOfWeek) => {
    return (
      <option key={dayOfWeek.id} value={dayOfWeek.id}>
        {dayOfWeek.name}
      </option>
    );
  };

  handleDayChange = (e) => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  renderDayPicker = () => {
    if (!this.state.inEditMode) {
      return (
        <MultiDayPicker
          listOfDays={daysOfWeek}
          dayOfWeek={this.state.dayOfWeek}
          setSelectedDays={this.setSelectedDays}
          valid={this.state.validation.pickedDays}
        />
      );
    } else {
      return (
        <div className="form-group" style={{ paddingBottom: "0.1em" }}>
          <label>Day of Week</label>
          <select
            className="custom-select form-control mx-auto"
            name="dayOfWeek"
            value={this.state.dayOfWeek}
            onChange={this.handleDayChange}
            disabled={this.state.isGoogleEvent}
          >
            {daysOfWeek.map((day) => this.populateDaysBox(day))}
          </select>
        </div>
      );
    }
  };

  setNewEventTime = () => {
    this.setState({
      startTime: this.props.start,
      endTime: this.props.end,
      dayOfWeek: moment(this.props.start).format("e"), // day index
    });
  };

  validateTitle = () => {
    const { validation, title } = this.state;
    let titleNoExtraSpaces = title.toString().replace(/\s+/g, " ").trimLeft();
    titleNoExtraSpaces.length > 0
      ? (validation.title = true)
      : (validation.title = false);
    this.setState({ title: titleNoExtraSpaces, validation });
  };

  validateDays = () => {
    const { selectedDays, validation } = this.state;
    selectedDays.length <= 0
      ? (validation.pickedDays = false)
      : (validation.pickedDays = true);
    this.setState({ validation });
  };

  validateTime = () => {
    let { validation, startTime, endTime } = this.state;
    let startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    let endMinutes = endTime.getHours() * 60 + endTime.getMinutes();

    startMinutes >= endMinutes
      ? (validation.endTime = false)
      : (validation.endTime = true);
    this.setState({ validation });
  };

  allValid = () => {
    const { validation } = this.state;
    if (this.state.inEditMode) {
      return validation.title && validation.endTime;
    }
    return validation.title && validation.pickedDays && validation.endTime;
  };

  getFormData = () => {
    let startTime = formatToTimeString(this.state.startTime);
    let endTime = formatToTimeString(this.state.endTime);
    let dayOfWeek = parseInt(this.state.dayOfWeek);
    let colorTypeId = parseInt(this.state.colorTypeId);
    let title = this.state.title;

    const newEventData = {
      startTime,
      endTime,
      colorTypeId,
      title,
      dayOfWeek,
    };

    return newEventData;
  };

  getDayIndex = (date) => {
    let longDayName = date.toLocaleString("en-us", { weekday: "long" });
    for (let day of daysOfWeek) {
      if (day.name === longDayName) {
        return day.id;
      }
    }
    return null;
  };

  getStringDate = (thisDate, thisDayIndex, dayIndex) => {
    if (thisDayIndex > dayIndex) {
      let date = moment(
        thisDate.setDate(thisDate.getDate() + (dayIndex - thisDayIndex))
      );
      return formatToDateString(date.toDate());
    } else {
      let date = moment(
        thisDate.setDate(thisDate.getDate() - (thisDayIndex - dayIndex))
      );
      return formatToDateString(date.toDate());
    }
  };

  handleSubmission = (event) => {
    if (this.state.inEditMode) {
      let date = this.getStringDate(
        new Date(this.props.selectedEvent.date),
        this.props.selectedEvent.dayIndex,
        event.dayOfWeek
      );
      event.date = date;
      event.dayIndex = event.dayOfWeek;
      event.id = this.props.selectedEvent.id;
      this.sendUpdatedEvent(this.props.selectedEvent, event);
    } else {
      this.setState(
        { eventDate: formatToDateString(this.state.startTime) },
        () => {
          let newEvents = this.state.selectedDays.map((dayIndex) => {
            let thisDate = new Date(this.state.eventDate);
            let thisDayIndex = this.getDayIndex(thisDate);
            let date = this.getStringDate(thisDate, thisDayIndex, dayIndex);
            let { startTime, endTime, colorTypeId, title } = event;
            return { startTime, endTime, colorTypeId, title, dayIndex, date };
          });
          this.sendEventToCalendar(newEvents);
        }
      );
    }
  };

  sendUpdatedEvent = (originalEvent, updatedEvent) => {
    this.resetValues();
    this.props.showUpdatedEvent(originalEvent, updatedEvent);
  };

  sendEventToCalendar = (event) => {
    this.resetValues();
    this.props.sendEventToCalendar(event);
  };

  resetValues = () => {
    this.setState({
      selectedDays: [],
      dayOfWeek: "",
      inEditMode: false,
      title: "",
      validation: {
        title: true,
        pickedDays: true,
        endTime: true,
      },
    });
  };

  validateInputs = () => {
    this.validateTitle();
    this.validateDays();
    this.validateTime();
  };

  closeHandler = () => {
    this.props.onClose();
    this.resetValues();
  };

  insertDeleteButton = () => {
    if (this.state.inEditMode && !this.state.isGoogleEvent) {
      return (
        <Button
          color="danger"
          style={{
            marginRight: "1rem",
          }}
          onClick={() => {
            this.props.delete(this.props.selectedEvent);
            this.closeHandler();
          }}
        >
          Delete
        </Button>
      );
    }
  };

  render() {
    const { modalOpen } = this.props;
    return (
      <Modal
        style={{
          maxWidth: 380,
          minWidth: "20em",
          position: "relative",
          top: "10", // original 25
        }}
        isOpen={modalOpen}
        modalTransition={{ timeout: 10 }}
        backdropTransition={{ timeout: 10 }}
      >
        <ModalHeader
          style={{
            position: "relative",
            color: "white",
            fontWeight: "bold",
            paddingTop: "2em",
            width: "100%",
            backgroundColor:
              this.state.modalHeaderColor || this.state.defaultBgColor,
          }}
        >
          {this.state.isGoogleEvent
            ? this.state.googleEventTitle
            : this.state.inEditMode
            ? this.state.editEventTitle
            : this.state.addEventTitle}
        </ModalHeader>
        <ModalBody
          style={{
            position: "relative",
            top: "1em",
          }}
        >
          <ListGroup>
            <FormGroup>
              <Label>Event Name</Label>
              <Input
                type="text"
                name="title"
                maxLength={100}
                value={this.state.title}
                invalid={!this.state.validation.title}
                disabled={this.state.isGoogleEvent}
                onChange={(e) => {
                  this.setState({ [e.target.name]: [e.target.value] }, () => {
                    this.validateTitle();
                  });
                }}
              />
              <FormFeedback valid />
              <FormFeedback>This field is required</FormFeedback>
            </FormGroup>

            {!this.state.isGoogleEvent && (
              <FormGroup>
                <ColorPicker
                  colorList={this.props.googleColors}
                  selectedColor={this.state.modalHeaderColor}
                  defaultColor={this.state.defaultBgColor}
                  setSelectedColor={this.setSelectedColor}
                />
              </FormGroup>
            )}

            <FormGroup>{this.renderDayPicker()}</FormGroup>

            <FormGroup>
              <label style={{ display: "block", marginBottom: "1rem" }}>
                Start/End Times
              </label>
              <div
                style={{
                  maxWidth: "25%",
                  minWidth: "8em",
                  display: "inline-block",
                }}
              >
                <DatePicker
                  selected={this.state.startTime}
                  disabled={this.state.isGoogleEvent}
                  onChange={(startTime) => {
                    if (startTime > this.state.endTime) {
                      this.setState({
                        startTime,
                        endTime: moment(startTime).add(15, "m").toDate(),
                      });
                    } else {
                      this.setState({ startTime });
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  className="form-control text-center"
                  minTime={setHours(setMinutes(new Date(), 0), 5)}
                  maxTime={setHours(setMinutes(new Date(), 30), 23)}
                  dateFormat="h:mm aa"
                  timeCaption="Time"
                />
              </div>
              <label style={{ margin: "0 1rem" }}>to</label>
              <div
                className="col"
                style={{
                  maxWidth: "25%",
                  minWidth: "8em",
                  display: "inline-block",
                }}
              >
                <DatePicker
                  selected={this.state.endTime}
                  disabled={this.state.isGoogleEvent}
                  onChange={(endTime) =>
                    this.setState({ endTime }, () => this.validateTime())
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  minTime={moment(this.state.startTime).add(15, "m").toDate()}
                  maxTime={setHours(setMinutes(new Date(), 59), 23)}
                  className="form-control text-center"
                  dateFormat="h:mm aa"
                />
              </div>
              {!this.state.validation.endTime && (
                <div className="text-danger" style={{ fontSize: "14px" }}>
                  End time should be greater than start time
                </div>
              )}
            </FormGroup>

            <FormGroup style={{ textAlign: "center" }}>
              {this.insertDeleteButton()}
              <Button
                onClick={() => {
                  if (!this.state.isGoogleEvent) {
                    this.validateInputs();
                    if (this.allValid()) {
                      const data = this.getFormData();
                      this.handleSubmission(data);
                    }
                  }
                  this.props.onClose();
                }}
                style={{
                  color: "white",
                  background: "#4286f4",
                  marginRight: "1rem",
                }}
              >
                {this.state.isGoogleEvent
                  ? "Close"
                  : this.state.inEditMode
                  ? "Update"
                  : "Add"}
              </Button>
            </FormGroup>
          </ListGroup>
        </ModalBody>
      </Modal>
    );
  }
}

export default QuickModal;
