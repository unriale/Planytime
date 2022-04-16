import {
  InfoContainer,
  InfoBg,
  VideoBg,
  InfoContent,
  InfoH1,
  InfoP,
  InfoBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./InfoElements";
import Video from "../../videos/video.mp4";
import { useState } from "react";
import {Button} from "../ButtonElement";

const InfoSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <InfoContainer id="home">
      <InfoBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </InfoBg>
      <InfoContent>
        <InfoH1>Some text here can be idk what balla</InfoH1>
        <InfoP>
          Let's plan your time and bla bla some text planning hey go with me.
          This is some more text planning hey go with me.
        </InfoP>
        <InfoBtnWrapper>
          <Button to="signup" onMouseEnter={onHover} onMouseLeave={onHover}>
            Get started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </InfoBtnWrapper>
      </InfoContent>
    </InfoContainer>
  );
};

export default InfoSection;
