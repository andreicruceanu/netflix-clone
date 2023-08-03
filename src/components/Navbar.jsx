import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const navigate = useNavigate();
  const links = [
    { name: "Home", path: "/" },
    { name: "TV Shows", path: "/tv" },
    { name: "Movies", path: "/movies" },
    { name: "My List", path: "/mylist" },
  ];
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });
  return (
    <Container>
      <Nav>
        <LeftMenu>
          <WrapLogo href="/">
            <Logo src={logo} alt="Netflix Logo" />
          </WrapLogo>
          <ListMenu>
            {links.map(({ name, path }) => (
              <ItemMenu key={name}>
                <Link to={path}>{name}</Link>
              </ItemMenu>
            ))}
          </ListMenu>
        </LeftMenu>
        <RightMenu>
          <WrapSearch className={`${showSearch ? "show-search" : ""}`}>
            <ButtonSearch
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
              <Input
                type="text"
                placeholder="Search"
                onMouseEnter={() => setInputHover(true)}
                onMouseLeave={() => setInputHover(false)}
                onBlur={() => {
                  setShowSearch(false);
                  setInputHover(false);
                }}
              />
            </ButtonSearch>
          </WrapSearch>
          <ButtonLogout onClick={() => signOut(firebaseAuth)} title="Logout">
            <FaPowerOff />
          </ButtonLogout>
        </RightMenu>
      </Nav>
    </Container>
  );
}

const Container = styled.div``;
const Nav = styled.nav`
  position: fixed;
  top: 0;
  height: 6.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  padding: 0 4rem;
  z-index: 2;
  .show-search {
    border: 1px solid white;
    background-color: rgba(0, 0, 0, 0.6);
    input {
      width: 100%;
      opacity: 1;
      visibility: visible;
      padding: 0.3rem;
    }
  }
`;
const LeftMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
const WrapLogo = styled.a`
  display: block;
`;
const Logo = styled.img`
  height: 4rem;
`;
const ListMenu = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
`;
const ItemMenu = styled.li`
  padding: 0 0.4rem;
  a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
  }
`;
const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const WrapSearch = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  padding-left: 0.5rem;
`;
const Input = styled.input`
  width: 0;
  opacity: 0;
  visibility: hidden;
  transition: 0.15s ease-in-out;
  background-color: transparent;
  border: none;
  margin-left: 0.3rem;
  font-size: 0.9rem;
  color: white;
  &:focus {
    outline: none;
  }
`;
const ButtonSearch = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  svg {
    color: white;
    font-size: 1.4rem;
  }
`;
const ButtonLogout = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  svg {
    color: #f34242;
    font-size: 1.4rem;
  }
`;
