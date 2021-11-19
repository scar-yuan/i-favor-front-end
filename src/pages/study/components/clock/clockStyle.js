import styled from "styled-components";

const ClockStyle = styled.div`
  .clock {
    text-align: center;
  }

  .clock .M-Flipper {
    margin: 0 3px;
    width: 60px;
    height: 100px;
    line-height: 100px;
    font-size: 66px;
  }

  .M-Flipper {
    margin: 0 3px;
  }
  .clock em {
    display: inline-block;
    line-height: 90px;
    font-size: 66px;
    font-style: normal;
    vertical-align: top;
  }

  .clock {
    margin: 40px;
  }
`;

export { ClockStyle };
