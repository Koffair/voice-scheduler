import styled, { keyframes } from "styled-components";
import Links from "../../components/Links";
import MobileFrame from "../../components/MobileFrame";
import Schedule from "../../components/Schedule";

const slideId = keyframes`
  0% {
    transform: translate(-100vw, 100vh) rotate(0) scale(1);
  }
  100% {
    transform: translate(0, 0) rotate(8deg) scale(.8);
  }
`;

const AppFrame = styled(MobileFrame)`
  animation: ${slideId} 1s ease-in-out forwards;
`

const Examples = () => {
  return (
    <div className="page">
      <div className="container">
        <AppFrame>
          <Schedule />
        </AppFrame>
      </div>
    </div>
  );
};

export default Examples;
