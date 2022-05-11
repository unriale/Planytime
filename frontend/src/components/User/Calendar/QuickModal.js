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
  Input,
  Label,
  FormGroup,
  ListGroup,
  ListGroupItem,
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
    addEventTitle: "Add to Your Schedule",
    editEventTitle: "Edit Your Saved Event",
    headerTextColor: "white",
    defaultBgColor: "#5484ed",
    modalHeaderColor: "",
    startTime: new Date(),
    endTime: new Date(),
    title: "",
    validation: {
      color: true,
      pickedADay: false,
      pleasePickADay: false,
      title: true,
    },
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
    this.setState({ selectedDays });
    console.log("selectedDays = ", selectedDays);
  };

  renderDayPicker = () => {
    return (
      <MultiDayPicker
        listOfDays={daysOfWeek}
        dayOfWeek={this.state.dayOfWeek}
        setSelectedDays={this.setSelectedDays}
      />
    );
  };

  setNewEventTime = () => {
    this.setState({
      startTime: this.props.start,
      endTime: this.props.end,
    });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.start !== prevProps.start ||
      this.props.end !== prevProps.end
    ) {
      this.setNewEventTime();
    }
  }

  validateInputs = () => {
    console.log("Validating...");
    this.props.onClose();
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
          {this.state.inEditMode
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
                value={this.state.title}
                invalid={!this.state.validation.title}
                onChange={(e) => {
                  this.setState({ [e.target.name]: [e.target.value] });
                }}
              />
            </FormGroup>

            <FormGroup>
              <ColorPicker
                colorList={this.props.googleColors}
                selectedColor={this.state.modalHeaderColor}
                defaultColor={this.state.defaultBgColor}
                setSelectedColor={this.setSelectedColor}
              />
            </FormGroup>

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
                  onChange={(startTime) => {
                    if (startTime > this.state.endTime) {
                      console.log("START TIME", startTime);
                      console.log("this.state.endTime = ", this.state.endTime);
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
                  onChange={(endTime) => this.setState({ endTime })}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  minTime={moment(this.state.startTime).add(15, "m").toDate()}
                  maxTime={setHours(setMinutes(new Date(), 59), 23)}
                  className="form-control text-center"
                  dateFormat="h:mm aa"
                />
              </div>
            </FormGroup>

            <FormGroup style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  this.validateInputs();
                }}
                style={{
                  color: "white",
                  background: "#4286f4",
                  marginRight: "1rem",
                }}
              >
                {this.state.inEditMode ? "Update" : "Add"}
              </Button>
            </FormGroup>
          </ListGroup>
        </ModalBody>
      </Modal>
    );
  }
}

export default QuickModal;
