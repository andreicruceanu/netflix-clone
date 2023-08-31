import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Card from "../components/Card";
import NotAvailable from "../components/NotAvailable";
import { useDispatch } from "react-redux";
import { reset, setListFavorites } from "../store";

export default function UserListedMovies() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) {
      console.log("aici1");
      dispatch(reset());
      navigate("/login");
    }
  });

  useEffect(() => {
    const getFavorites = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/user/favoriteList/${email}`
      );
      if (response.data) {
        setFavoriteMovies([...response.data.listFavorites]);
        dispatch(setListFavorites([...response.data.listFavorites]));
      }
    };
    getFavorites();
  }, []);

  const onRemove = (id) => {
    const newMovies = favoriteMovies.filter((movies) => movies.id !== id);
    setFavoriteMovies([...newMovies]);
  };

  return (
    <Container>
      <Navbar />
      <Content>
        <H2>My list</H2>
        <MoviesWrap>
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie, index) => (
              <Card movieData={movie} key={index} onRemove={onRemove} />
            ))
          ) : (
            <NotAvailable type={"noFavorite"} />
          )}
        </MoviesWrap>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 8rem;
`;

const Content = styled.div`
  margin: 2.3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const H2 = styled.h2`
  margin-left: 3rem;
  font-size: 2rem;
`;
const MoviesWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
  margin-left: 3rem;
  .not-available {
    text-align: center;
    color: white;
    margin-top: 4rem;
  }
`;
