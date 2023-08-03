import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import styled from "styled-components";
import BackgroundImg from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err);
    }
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  };
  return (
    <Container>
      <BackgroundImg />
      <Wrap>
        <Header login />
        <Content>
          <Flex>
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </Flex>
          <Form showpass={showPassword ? "true" : "false"}>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </Form>
          {showPassword && <Button onClick={handleSubmit}>Sign Up</Button>}
        </Content>
      </Wrap>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
`;

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 15vh 85vh;
`;
const Flex = styled.div`
  display: flex;
  gap: 1rem;
  text-align: center;
  font-size: 2rem;
  flex-direction: column;
  h1 {
    padding: 0 25rem;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
const Form = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.showpass ? "1fr 1fr" : "2fr 1fr")};
  width: 60%;
  input {
    color: black;
    padding: 1.5rem;
    font-size: 1.2rem;
    border: 1px solid black;
    &:focus {
      outline: none;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    color: white;
    cursor: pointer;
    font-weight: bolder;
    font-size: 1.05rem;
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
