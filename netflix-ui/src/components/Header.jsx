import React from "react";
import styled from "styled-components";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
export default function Header(props) {
  const navigate = useNavigate();
  return (
    <Container>
      <Logo href="/">
        <img src={logo} alt="Logo Netflix" />
      </Logo>
      <Button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign In"}
      </Button>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  text-decoration: none;
  display: block;
  img {
    height: 5rem;
  }
`;
const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #e50914;
  border: none;
  color: white;
  border-radius: 0.2rem;
  cursor: pointer;
  font-weight: bolder;
  font-size: 1.05rem;
`;
