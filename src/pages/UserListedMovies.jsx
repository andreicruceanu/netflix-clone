import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Card from "../components/Card";
import NotAvailable from "../components/NotAvailable";

export default function UserListedMovies() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) {
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
              <Card movieData={movie} key={index} />
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

const Content = styled.div``;
const H2 = styled.h2`
  margin-left: 5rem;
  font-size: 2rem;
`;
const MoviesWrap = styled.div`
  .not-available {
    text-align: center;
    color: white;
    margin-top: 4rem;
  }
`;
