import styled from "styled-components";

const ProcessCard = styled.div`
  width: 20vw;
  height: 20vh;
  display: flex;
  align-items: center;
  border-radius: 15px;
  color: var(font-fg);
  background: var(--todoli-bg);
  box-shadow: 15px 15px 33px var(--card-sd), -15px -15px 33px var(--card-sf);
  .processDesc {
    font-size: 0.5rem;
    flex-grow: 1;
    .cardDesc {
      margin-left: 2vw;
      margin-top: 0.8vh;
    }
  }
`;

export { ProcessCard };
