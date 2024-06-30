import styled from "styled-components";
import useGeorgianPattern from "../customHooks/InputGeoPattern";
import warning from "../assets/ph_warning-fill.svg";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "../pages/EducationPage";

interface GraduationProps {
  register: UseFormRegister<FormData>;
  index: number;
  error?: string;
}

export default function Graduation({
  register,
  index,
  error,
}: GraduationProps) {
  const { handleGeorgianInput } = useGeorgianPattern();
  return (
    <GraduationDiv>
      <StyledGraduation error={error}>
        <p style={{ textWrap: "nowrap" }}>დამთავრების რიცხვი</p>
        <input
          type="date"
          onKeyDown={handleGeorgianInput}
          {...register(`education.${index}.finish_date`, {
            required: { value: true, message: "required" },
          })}
        />
      </StyledGraduation>
      {error && <ErrorImg src={warning} alt="warning" />}
    </GraduationDiv>
  );
}

const GraduationDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.3rem;

  & > img {
    margin-top: 2.8rem;
  }
`;

const StyledGraduation = styled.div<{ error?: string }>`
  width: 100%;

  & > input {
    width: 100%;
    height: 48px;
    padding: 13px 16px 14px 16px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 4px;
    background: #fff;
    border: 1px solid #bcbcbc;
    outline: 1px solid #bcbcbc;
    margin-top: 0.8rem;
    border: ${(props) => (props.error ? "1px solid #EF5050" : "#BCBCBC")};

    &::placeholder {
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.1rem;
      color: rgba(0, 0, 0, 0.6);
    }
  }

  & > p {
    color: ${(props) => (props.error ? "#E52F2F" : "#000000")};
  }
`;

const ErrorImg = styled.img`
  margin-right: -5rem;
`;
