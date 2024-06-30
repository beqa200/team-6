import React from "react";
import styled from "styled-components";
import bgPattern from "../assets/cover.jpeg";
import { Button } from "../styles/Buttons";
import MainLogo from "../assets/MainLogo.png";
import HomeLogo from "../assets/homeLogo.png";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled.div`
  background-image: url(${bgPattern});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  padding: 7rem;
  padding-top: 2.5rem;

  & > hr {
    margin-top: 2.6rem;
    width: 100%;
    height: 1px;
    background: #1a1a1a;
    border-top-style: solid;
  }

  & > img {
    width: 24.6rem;
    height: 3.8rem;
  }
`;

const StyledDiv2 = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25rem;

  ${Button} {
    background: #1a1a1a;
    padding: 1.8rem 6rem;
    font-size: 2rem;
    color: #fff;
    font-weight: 500;
    border-radius: 0.8rem;
    width: 464px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  & > img {
    position: absolute;
    right: 23%;
    top: 39%;
  }
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/personal");
  };

  return (
    <StyledDiv>
      <img src={MainLogo} alt="Main Logo" />
      <hr />
      <StyledDiv2>
        <Button onClick={handleNavigate}>ᲠᲔᲖᲘᲣᲛᲔᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ</Button>
        <img src={HomeLogo} alt="Home Logo" />
      </StyledDiv2>
    </StyledDiv>
  );
};

export default HomePage;
