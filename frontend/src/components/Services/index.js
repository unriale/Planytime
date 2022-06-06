import {
  ServicesContainer,
  ServicesH1,
  ServiceWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";

import Icon1 from "../../images/svg-4.svg";
import Icon2 from "../../images/svg-5.svg";
import Icon3 from "../../images/svg-6.svg";

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>What We Offer</ServicesH1>
      <ServiceWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>
            <b>Adaptive UI</b>
          </ServicesH2>
          <ServicesP>
            Our user interface adapts its elements and layout to your needs -
            use the website from any device, such as laptop, tablet or phone!
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>
            <b>Google Calendar sync</b>
          </ServicesH2>
          <ServicesP>
            You can sync you calendar with Planytime if you got meetings/plans
            in your Google Calendar and want to see them on our website!
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>
            <b>Easy-to-Use Calendar</b>
          </ServicesH2>
          <ServicesP>
            Planytime users feel comfortable and are able to get things done
            more quickly with the Easy-to-Use Calendar!
          </ServicesP>
        </ServicesCard>
      </ServiceWrapper>
    </ServicesContainer>
  );
};

export default Services;
