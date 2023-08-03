import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/trailer_h480p.mov";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
export default function Player() {
  const navigate = useNavigate();

  return (
    <Container>
      <Back>
        <BsArrowLeft onClick={() => navigate(-1)} />
      </Back>
      <Video src={video} autoPlay loop controls />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
const Back = styled.div`
  position: absolute;
  padding: 2rem;
  margin-left: 5px;
  z-index: 1;
  svg {
    font-size: 3rem;
    cursor: pointer;
  }
`;
const Video = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
