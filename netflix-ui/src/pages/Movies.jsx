import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres, reset } from "../store";
import SelectGenre from "../components/SelectGenre";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

export default function Movies() {
  const [user, setUser] = useState(undefined);
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ genres, type: "movie" }));
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser.uid);
    } else {
      dispatch(reset());
      navigate("/login");
    }
  });

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <Content>
        <SelectGenre genres={genres} type="movie" />
        {movies && movies.length ? (
          <Slider movies={movies} />
        ) : (
          <NotAvailable type={"movies"} />
        )}
      </Content>
    </Container>
  );
}
const Container = styled.div`
  margin-bottom: 5rem;
`;
const Content = styled.div`
  margin-top: 8rem;
  .not-available {
    text-align: center;
    color: white;
    margin-top: 4rem;
  }
`;
