import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import TitleHiro from "../assets/images/homeTitle.webp";
import backgroundImage from "../assets/images/home.jpg";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres, setListFavorites } from "../store";
import Slider from "../components/Slider";
import axios from "axios";
export default function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  useEffect(() => {
    const getFavorites = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/user/favoriteList/${userEmail}`
      );
      console.log(response.data?.listFavorites);
      if (response.data?.listFavorites) {
        dispatch(setListFavorites(response.data?.listFavorites));
      } else {
        dispatch(setListFavorites([]));
      }
    };
    if (userEmail) getFavorites();
    if (!userEmail) dispatch(setListFavorites([]));
  }, [userEmail, dispatch]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <Hero>
        <HeroImg src={backgroundImage} alt="Movie Logo" />
        <Content>
          <TitleImg src={TitleHiro} alt="Movie Img" />
          <GroupButtons>
            <ButtonLeft onClick={() => navigate("/player")}>
              <FaPlay />
              Play
            </ButtonLeft>
            <ButtonRight>
              <AiOutlineInfoCircle />
              More Info
            </ButtonRight>
          </GroupButtons>
        </Content>
      </Hero>
      {movies && <Slider movies={movies} />}
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
`;
const Hero = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;
const HeroImg = styled.img`
  filter: brightness(60%);
  background-position: center;
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  position: absolute;
  bottom: 5rem;
`;
const TitleImg = styled.img`
  width: 100%;
  height: 100%;
  margin-left: 5rem;
`;
const GroupButtons = styled.div`
  margin: 5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
`;
const ButtonLeft = styled.button`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 0.2rem;
  padding: 0.5rem;
  padding-left: 2rem;
  padding-right: 2.4rem;
  border: none;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
  svg {
    font-size: 1.8rem;
  }
`;
const ButtonRight = styled(ButtonLeft)`
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  svg {
    font-size: 1.8rem;
  }
`;
