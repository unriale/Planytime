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
import { Button } from "../ButtonElement";

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
        <InfoH1>Plan your days and weeks effectively with Planytime</InfoH1>
        <InfoP>
          Start today and achieve your goals faster. Get more done in less time, and prevent procrastination.
        </InfoP>
        <InfoBtnWrapper>
          <Button to="/signup" onMouseEnter={onHover} onMouseLeave={onHover}>
            Get started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </InfoBtnWrapper>
      </InfoContent>
    </InfoContainer>
  );
};

export default InfoSection;
