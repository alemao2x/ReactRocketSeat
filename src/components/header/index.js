import React from "react";
import styled from "styled-components";

const Header = styled.header`
  width: 100%;
  height: 50px;
  background: #da552f;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainHeader = () => <Header id="main-header">JSHunt</Header>;

export default MainHeader;
