import styled from "styled-components";
import emailIcon from "../assets/emailSymbol.png";
import phoneIcon from "../assets/phone.png";

import { useContext } from "react";
import { Context } from "../App";

export default function About() {
  const { personalData } = useContext(Context);

  return (
    <StyledAbout>
      <Information>
        <h1>
          <span>{personalData.name}</span>
          <span>{personalData.last_name}</span>
        </h1>
        {personalData.email && (
          <div className="email">
            <img src={emailIcon} alt="emailIcon" />
            <h3>{personalData.email}</h3>
          </div>
        )}
        {personalData.phone && (
          <div className="phone">
            <img src={phoneIcon} alt="phoneIcon" />
            <h3>{personalData.phone}</h3>
          </div>
        )}

        <AboutMeText>
          <h2>ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h2>
          <p>{personalData.info}</p>
        </AboutMeText>
      </Information>

      <img
        style={{ maxWidth: "246px", maxHeight: "246px", borderRadius: "50%" }}
        src={personalData.avatar}
        alt="user-profile"
      />
    </StyledAbout>
  );
}
const StyledAbout = styled.div`
  display: flex;
  width: 100%;
  gap: 4rem;
  border-bottom: 1px solid #c8c8c8;
  padding-bottom: 1.9rem;

  & > img {
    width: 246px;
    height: 246px;
  }
`;

const Information = styled.div`
  .email {
    margin-top: 1.7rem;
    display: flex;
    gap: 1rem;
  }

  .phone {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
  }
`;

const AboutMeText = styled.div`
  margin-top: 3.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media screen and (min-width: 1980px) {
    & > p {
      width: 43.2rem;
    }
  }
`;
