import styled from "styled-components";

const CombinedWrapper = styled.div`
  .combined-reload {
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
  .combined {
    color: #fff;
    width: 220px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .combined-shape {
    position: relative;
  }
  .combined-shape > * {
    width: 50%;
    height: 64px;
    position: absolute;
    overflow: hidden;
  }
  .combined-shape > * > * {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .combined-shape .shape-left {
    left: 0;
  }
  .combined-shape .shape-right {
    right: 0;
  }
  .combined .title {
    font-size: 55px;
    text-align: center;
    letter-spacing: 8px;
    position: absolute;
    width: 350px;
    overflow: hidden;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  .combined-bar {
    width: 100%;
    height: 2px;
    background: #fff;
    position: absolute;
    top: 70px;
  }
  .combined .content {
    font-size: 16px;
    text-align: center;
    position: absolute;
    top: 78px;
  }
`;

export { CombinedWrapper };
