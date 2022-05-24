import { useContext, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import styled from "styled-components";

const GoogleButtonWrapper = styled.div`
  height: 42px;
  background-color: #f5f5f5;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  margin: 1rem;
  display: inline-block;
  &:hover {
    background-color: #64dadf;
    transition: all 0.2s ease-in-out;
  }
`;

const GoogleIconWrapper = styled.div`
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: white;
`;

const GoogleIcon = styled.img.attrs({
  src: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
})`
  width: 95%;
  height: 95%;
`;

const Button = styled.button`
  float: right;
  margin: 11px 11px 0 0;
  font-size: 14px;
  letter-spacing: 0.2px;
  border: 0;
  background-color: transparent;
  padding-left: 3rem;
`;

const GoogleCalendar = (props) => {
  let { authTokens } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("authorizedGoogleCalendar")) {
      getEvents();
    }
  }, []);

  const getEvents = async () => {
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

  const changeCalendar = async () => {
    console.log("Retrieveing events from Google Calendar");
    let response = await fetch("http://localhost:8000/gcalendar/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (data) {
      props.sendEvents(data);
      localStorage.setItem("authorizedGoogleCalendar", 1);
    }
  };

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <GoogleButtonWrapper>
          <GoogleIconWrapper>
            <GoogleIcon />
          </GoogleIconWrapper>
          <Button onClick={changeCalendar}>Integrate Google Calendar</Button>
        </GoogleButtonWrapper>
      </div>
    </>
  );
};

export default GoogleCalendar;
