import { useContext, useEffect, useCallback } from "react";
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

const HowToUseButton = styled.button`
  position: fixed;
  right: 5px;
  bottom: 5px;
  z-index: 100;
  border-radius: 2.55em;
  background-color: #64dadf;
  border: 2px solid #64dadf;
  color: white;
  width: 3.5rem;
  height: 3.5rem;

  &:hover {
    background-color: #5dc7cb;
    transition: all 0.2s ease-in-out;
  }
`;

const GoogleCalendar = (props) => {
  let { authTokens } = useContext(AuthContext);

  useEffect(() => {
    getGoogleEvents();
  }, []);

  const getGoogleEvents = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_BACKEND_URL}/eventsgoogle/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();
    if (data.message) {
      props.sendEvents({});
    } else if (data) props.sendEvents(data);
    else alert("Error while fetching Google events");
  };

  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const redirectUri = "api/v1/auth/login/google/";

    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/calendar.events",
    ].join(" ");

    const params = {
      response_type: "code",
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: `${process.env.REACT_APP_BASE_BACKEND_URL}/${redirectUri}`,
      prompt: "select_account",
      access_type: "offline",
      scope,
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `${googleAuthUrl}?${urlParams}`;
  }, []);

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <GoogleButtonWrapper>
          <GoogleIconWrapper>
            <GoogleIcon />
          </GoogleIconWrapper>
          <Button onClick={openGoogleLoginPage}>
            Integrate Google Calendar
          </Button>
        </GoogleButtonWrapper>
        <HowToUseButton onClick={props.openWelcomeGuide}>
          <big>?</big>
        </HowToUseButton>
      </div>
    </>
  );
};

export default GoogleCalendar;
