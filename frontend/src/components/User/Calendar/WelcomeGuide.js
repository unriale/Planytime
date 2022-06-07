import React from "react";

const Guide = () => {
  return (
    <React.Fragment>
      <strong>Creating Events</strong>
      <ul>
        <li>Click on Desired Start Time</li>
        <li>Click & Drag to Select Desired Time Slot</li>
      </ul>
      <strong>Modifying Events</strong>
      <ul>
        <li>Drag and Drop Events to Different Time Slots</li>
        <li>Click to Edit Event Details</li>
      </ul>
      <strong>Integrating Google Calendar</strong>
      <ul>
        <li>
          Sign in your Google account (choose the same email as for the website)
        </li>
        <li>Allow Planytime to review events from your Google Calendar</li>
      </ul>
    </React.Fragment>
  );
};

export default Guide;
