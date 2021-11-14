import styled from "styled-components";

const LoginWrap = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  background-color: aqua;
  position: relative;
  .login-logo {
    box-sizing: border-box;
    flex: 1;
    height: 100%;
    background-color: #5378f9;
    padding: 80px 0 80px 80px;
    .opacity {
      z-index: 99;
      width: 100%;
      height: 100%;
      background-color: rgba(82, 118, 245, 0.6);
      border-radius: 20px 0 0 20px;
      position: relative;
      .particles-wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    }
  }
  .login-right {
    z-index: 99;
    box-sizing: border-box;
    flex: 1;
    height: 100%;
    padding: 80px 80px 80px 0;
    background-color: #e6eaf3;
    .opacity {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 0 20px 20px 0;
      background-color: rgba(216, 216, 216, 0.3);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 20px 20px 60px #bebebe;
      .logo {
        background: linear-gradient(145deg, #ececec, #f0f0f0);
        box-shadow: 10px 10px 30px #bebebe, -10px -10px 30px #fff;
      }
      .form-title {
        font-size: 25px;
        margin-bottom: 10px;
      }
      .form-wrap {
        width: 350px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-form {
          width: 100%;
          .input {
            width: 100%;
            height: 40px;
            border-radius: 5px;
            margin: 10px 0;
          }
        }
        .login-form-forgot {
          float: right;
        }
        .ant-col-rtl .login-form-forgot {
          float: left;
        }
        .login-form-button {
          margin: 10px 0;
          width: 100%;
        }
      }
    }
  }
`;

export { LoginWrap };
