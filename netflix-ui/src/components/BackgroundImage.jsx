import React from "react";
import styled from "styled-components";
import backgroundImg from "../assets/images/login.jpg";
export default function BackgroundImg() {
  return (
    <Container>
      <img src={backgroundImg} alt="backgroundImg" />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  img {
    height: 100vh;
    width: 100vw;
  }
`;
