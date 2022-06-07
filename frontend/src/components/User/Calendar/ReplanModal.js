import { Component } from "react";
import { FormGroup, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { VscCalendar } from "react-icons/vsc";
import moment from "moment";

const DateWrapper = styled.div`
  display: inline-block;
  width: 48%;
  padding: 1rem 0;
  margin: 0 0.1rem;
`;

class ReplanModal extends Component {
  state = {
    dateRange: null,
    startDate: null,
    endDate: null,
  };

  render() {
    return (
      <Modal
        style={{
          maxWidth: 350,
          minWidth: "20em",
          position: "relative",
          top: "7rem",
        }}
        isOpen={this.props.modalOpen}
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
            backgroundColor: "#64dadf",
          }}
        >
          <VscCalendar style={{ marginRight: "1rem" }} />
          Improve your schedule!
        </ModalHeader>
        <ModalBody
          style={{
            position: "relative",
            top: "1em",
            height: "250px",
          }}
        >
          <p>Choose start and end dates for replanning your schedule:</p>
          <DateWrapper>
            <DatePicker
              className="form-control text-center"
              selected={this.state.startDate}
              onChange={(date) => {
                this.setState({ startDate: date });
              }}
              disabledKeyboardNavigation
              placeholderText="Start Date"
              minDate={new Date()}
              maxDate={new Date().setDate(new Date().getDate() + 6)}
            />
          </DateWrapper>
          <DateWrapper>
            <DatePicker
              className="form-control text-center"
              selected={this.state.endDate}
              onChange={(date) => {
                this.setState({ endDate: date });
              }}
              disabledKeyboardNavigation
              placeholderText="End Date"
              minDate={moment(this.state.startDate).toDate()}
              maxDate={new Date().setDate(
                moment(this.state.startDate).toDate().getDate() + 6
              )}
            />
          </DateWrapper>
          <FormGroup style={{ textAlign: "center" }}>
            <Button
              onClick={() => {}}
              style={{
                color: "white",
                background: "#64dadf",
                marginTop: "1rem",
              }}
            >
              Replan
            </Button>
          </FormGroup>
        </ModalBody>
      </Modal>
    );
  }
}

export default ReplanModal;
