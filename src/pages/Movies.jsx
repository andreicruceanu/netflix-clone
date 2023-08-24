import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre";
export default function Movies() {
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

  return (
    <Container>
      <Navbar />
      <Content>
        <SelectGenre genres={genres} type="movie" />
        {!!movies ? <Slider movies={movies} /> : <NotAvailable />}
      </Content>
    </Container>
  );
}
const Container = styled.div``;
const Content = styled.div`
  margin-top: 8rem;
  .not-available {
    text-align: center;
    color: white;
    margin-top: 4rem;
  }
`;
