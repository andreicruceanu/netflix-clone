import React, { useRef, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
export default React.memo(function CardSlider({ title, data }) {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${260 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-260 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <Container
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <H1>{title}</H1>
      <Wrapper>
        <SliderActionLeft show={showControls ? 1 : 0}>
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </SliderActionLeft>
        <Slider ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </Slider>
        <SliderActionRight show={showControls ? 1 : 0}>
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </SliderActionRight>
      </Wrapper>
    </Container>
  );
});
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
`;
const H1 = styled.h1`
  margin-left: 50px;
`;
const Wrapper = styled.div`
  position: relative;
`;
const SliderActionLeft = styled.div`
  display: ${(props) => (!props.show ? "none" : "flex")};
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 99;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50px;
  transition: 0.3s ease-in-out;
  svg {
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }
`;
const SliderActionRight = styled.div`
  position: absolute;
  z-index: 99;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  display: ${(props) => (!props.show ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  width: 50px;
  transition: 0.3s ease-in-out;
  svg {
    font-size: 2rem;
    color: white;
    cursor: pointer;
  }
`;
const Slider = styled.div`
  width: max-content;
  gap: 1rem;
  display: flex;
  transform: translateX(0px);
  transition: 0.3s ease-in-out;
  margin-left: 50px;
`;
