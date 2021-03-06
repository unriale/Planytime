import { Component } from "react";
import { FormGroup, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { VscCalendar } from "react-icons/vsc";
import { FaLongArrowAltDown } from "react-icons/fa";
import moment from "moment";
import AuthContext from "../../../context/AuthContext";

const DateWrapper = styled.div`
  display: inline-block;
  width: 48%;
  padding: 1rem 0;
  margin: 0 0.1rem;
`;

const ReplanButton = styled.button`
  color: white;
  background: #64dadf;
  margin-top: 1rem;
  border-radius: 10px;
  border: none;
  height: 35px;
  width: 75px;
  &:hover {
    background: #60cbd0;
  }
`;

class ReplanModal extends Component {
  static contextType = AuthContext;

  state = {
    startDate: null,
    endDate: null,
    valid: true,
    errorMessage: "",
  };

  sendReplanDays = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/api/replan/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(this.context.authTokens.access),
        },
        body: JSON.stringify({
          startDate: this.state.startDate,
          endDate: this.state.endDate,
        }),
      }
    );
    let data = await response.json();
    if (response.status === 200) {
      this.props.loadSavedEvents();
    }
  };

  sendDateIfValid = () => {
    if (this.state.startDate == null) {
      this.setState({
        valid: false,
        errorMessage: "Start date cannot be empty!",
      });
    } else if (this.state.endDate == null) {
      this.setState({
        valid: false,
        errorMessage: "End date cannot be empty!",
      });
    } else if (this.state.endDate < this.state.startDate) {
      this.setState({
        valid: false,
        errorMessage: "End date must be greater than start date!",
      });
    } else {
      this.setState({ valid: true });
      this.sendReplanDays();
      this.closeHandler();
    }
  };

  resetValues = () => {
    this.setState({ startDate: null, endDate: null, valid: true });
  };

  closeHandler = () => {
    this.props.onClose();
    this.resetValues();
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
        toggle={this.closeHandler}
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
            height: "270px",
          }}
        >
          <p>
            Choose <b>start</b> and <b>end</b> dates from your calendar to
            organize your schedule!
          </p>
          <div style={{ textAlign: "center" }}>
            <FaLongArrowAltDown />
          </div>

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
          {!this.state.valid && (
            <div
              className="text-danger"
              style={{ fontSize: "14px", textAlign: "center" }}
            >
              {this.state.errorMessage}
            </div>
          )}
          <FormGroup style={{ textAlign: "center" }}>
            <ReplanButton
              onClick={() => {
                this.sendDateIfValid();
              }}
            >
              Replan
            </ReplanButton>
          </FormGroup>
        </ModalBody>
      </Modal>
    );
  }
}

export default ReplanModal;
