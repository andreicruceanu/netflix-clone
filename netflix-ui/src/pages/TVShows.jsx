import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import SelectGenre from "../components/SelectGenre";
import { useDispatch, useSelector } from "react-redux";
import NotAvailable from "../components/NotAvailable";
import Slider from "../components/Slider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";

export default function TVShows() {
  const [user, setUser] = useState(undefined);
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <Content>
        <SelectGenre genres={genres} type="tv" />
        {movies && movies.length ? (
          <Slider movies={movies} />
        ) : (
          <NotAvailable type={"tv"} />
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 8rem;
  margin-bottom: 5rem;
`;
const Content = styled.div`
  .not-available {
    text-align: center;
    color: white;
    margin-top: 4rem;
  }
`;
