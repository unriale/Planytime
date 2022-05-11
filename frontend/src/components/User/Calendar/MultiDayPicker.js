import React, { Component } from "react";
import { Label, FormGroup } from "reactstrap";
import "./css/dayPicker.css";

class MultiDayPicker extends Component {
  state = {
    selectedDays: [],
  };

  dayToggle = (e) => {
    console.log(e.target.name, ":", e.target.checked);
    this.setState({ [e.target.name]: e.target.checked });
  };

  getSelectedDays = () => {
    let selectedDays = [];
    this.props.listOfDays.forEach((day) => {
      if (this.state[day.name]) {
        selectedDays.push(day.id);
      }
    });
    return selectedDays;
  };

  setDay = (day) => {
    if (day) {
      const index = parseInt(day, 10);
      const selectedDay = this.props.listOfDays[index].name;
      this.setState({ [selectedDay]: true });
    }
  };

  componentDidMount() {
    this.setDay(this.props.dayOfWeek);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      let daysOfWeek = this.getSelectedDays();
      this.props.setSelectedDays(daysOfWeek);
    }
  }

  renderDayButton = (day) => {
    return (
      <React.Fragment key={day.id}>
        <input
          type="checkbox"
          id={day.name}
          name={day.name}
          checked={this.state[day.name] || false}
          onChange={this.dayToggle}
        />
        <label htmlFor={day.name}>{day.letter}</label>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="weekDays-selector">
        <Label style={{ paddingTop: "0.5em", paddingBottom: "0.4em" }}>
          Select multiple days for a repeating event
        </Label>
        <FormGroup>
          {(this.props.listOfDays || []).map((day) =>
            this.renderDayButton(day)
          )}
          {this.props.valid && <div>valid input</div>}
        </FormGroup>
      </div>
    );
  }
}

export default MultiDayPicker;
