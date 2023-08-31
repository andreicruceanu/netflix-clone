import React, { useState } from "react";
import styled from "styled-components";
import video from "../assets/trailer_h480p.mov";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import favoriteUtils from "../utils/favorite.utils";
import { addFavorite, removeFavorite } from "../store";
export default React.memo(function Card({ movieData, onRemove }) {
  const favoriteList = useSelector((state) => state.netflix.listFavorites);
  const [email, setEmail] = useState(undefined);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  const addToList = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
      if (response.data) {
        dispatch(addFavorite(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromLikedMovies = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/remove",
        {
          email,
          mediaId: movieData.id,
        }
      );
      if (response.data) {
        dispatch(removeFavorite(movieData));
        if (onRemove) {
          console.log("aici");
          onRemove(movieData.id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(favoriteList);
  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardImg
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt={`${movieData.name}`}
      ></CardImg>
      {isHovered && (
        <Hover>
          <WrapVideo>
            <HoverImg
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt={`${movieData.name}`}
              onClick={() => navigate("/player")}
            />
            <Video
              src={video}
              onClick={() => navigate("/player")}
              autoPlay={true}
              loop
            />
          </WrapVideo>
          <InfoContainer>
            <H3 onClick={() => navigate("/player")}>{movieData.name}</H3>
            <IconsGroup>
              <Controls>
                <IoPlayCircleSharp
                  className="icon-play"
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill className="icon-like" title="Like" />
                <RiThumbDownFill className="icon-dislike" title="Dislike" />
                {favoriteUtils.check({ favoriteList, id: movieData.id }) ? (
                  <AiFillHeart
                    className="icon-heart icon-red"
                    title="Remove movie to list"
                    onClick={removeFromLikedMovies}
                  />
                ) : (
                  <AiOutlineHeart
                    className="icon-heart-outline"
                    onClick={addToList}
                    title="Add to my list"
                  />
                )}
              </Controls>
              <MoreInfo>
                <BiChevronDown title="More Info" />
              </MoreInfo>
            </IconsGroup>
            <Genres>
              <ListGenres>
                {movieData.genres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ListGenres>
            </Genres>
          </InfoContainer>
        </Hover>
      )}
    </Container>
  );
});
const Container = styled.div`
  width: 260px;
  max-width: 260px;
  height: 100%;
  cursor: pointer;
  position: relative;
`;
const CardImg = styled.img`
  border-radius: 0.2rem;
  width: 100%;
  height: 100%;
  z-index: 10;
`;
const Hover = styled.div`
  z-index: 99;
  height: max-content;
  width: 18rem;
  position: absolute;
  top: -10vh;
  left: 0;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
  background-color: #181818;
  transition: 0.3s ease-in-out;
`;
const WrapVideo = styled.div`
  position: relative;
  height: 140px;
`;
const HoverImg = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 0.3rem;
  top: 0;
  z-index: 4;
  position: absolute;
`;
const Video = styled.video`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 0.3rem;
  top: 0;
  z-index: 5;
  position: absolute;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
`;
const H3 = styled.h3``;
const IconsGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  svg {
    font-size: 2rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  .icon-like:hover {
    color: #b8b8b8;
  }
  .icon-dislike:hover {
    color: #b8b8b8;
  }
  .icon-play:hover {
    color: #b8b8b8;
  }
  .icon-heart-outline:hover {
    color: #b8b8b8;
  }
`;
const Controls = styled.div`
  display: flex;
  gap: 1rem;
  .icon-red {
    color: red;
  }
`;
const MoreInfo = styled.div``;
const Genres = styled.div`
  display: flex;
`;
const ListGenres = styled.ul`
  display: flex;

  gap: 1rem;
  li {
    padding-right: 0.7rem;
  }
  li:first-of-type {
    list-style-type: none;
  }
`;
