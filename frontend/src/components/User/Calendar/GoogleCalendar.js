import {
  formatToDateString,
  formatToTimeString,
} from "../../../utils/dateTimeFormatter";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const GoogleCalendar = (props) => {
  let { authTokens } = useContext(AuthContext);

  const retrieveEvents = async () => {
    console.log("Retrieveing events from Google Calendar");
    let response = await fetch("http://localhost:8000/gcevents/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (data) {
      props.sendEvents(data);
    }
  };

  return (
    <>
      <button onClick={retrieveEvents}>Google</button>
    </>
  );
};

export default GoogleCalendar;
