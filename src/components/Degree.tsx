import { useEffect, useState } from "react";
import downArrow from "../assets/downArrow.svg";
import styled from "styled-components";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormData } from "../pages/EducationPage";
import warning from "../assets/ph_warning-fill.svg";

interface IDegreeChoices {
  S: string;
  M: string;
  B: string;
}

interface DegreeProps {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  index: number;
  error?: string;
}

export default function Degree({
  register,
  setValue,
  index,
  error,
}: DegreeProps) {
  const [isDegreeModalOpen, setIsDegreeModalOpen] = useState(false);
  const [degreeChoices, setDegreeChoices] = useState<IDegreeChoices>({
    S: "",
    B: "",
    M: "",
  });
  const [degree, setDegree] = useState("");

  useEffect(() => {
    async function getDegreeChoices() {
      const res = await fetch(
        "https://cv-colab-algouni.onrender.com/api/degree-choices/"
      );
      const data = await res.json();
      setDegreeChoices(data);
    }
    getDegreeChoices();
  }, []);

  useEffect(() => {
    degree && setValue(`education.${index}.degree`, degree);
  }, [degree, index, setValue]);

  return (
    <StyledDegree error={error}>
      <p>ხარისხი</p>
      <Select>
        <SelectValueDiv>
          <SelectValue
            error={error}
            onClick={() => setIsDegreeModalOpen((modal) => !modal)}
          >
            <DegreeInput
              placeholder="აირჩიეთ ხარისხი"
              {...register(`education.${index}.degree`, {
                required: {
                  value: true,
                  message: "required",
                },
              })}
            />

            <img src={downArrow} alt="down-arrow" />
          </SelectValue>
          {error && <ErrorImg src={warning} alt="warning" />}
        </SelectValueDiv>

        {isDegreeModalOpen && (
          <SelectOptions onClick={() => setIsDegreeModalOpen(false)}>
            <h4 onClick={() => setDegree(degreeChoices.S)}>
              {degreeChoices.S}
            </h4>
            <h4 onClick={() => setDegree(degreeChoices.B)}>
              {degreeChoices.B}
            </h4>
            <h4 onClick={() => setDegree(degreeChoices.M)}>
              {degreeChoices.M}
            </h4>
          </SelectOptions>
        )}
      </Select>
    </StyledDegree>
  );
}

const StyledDegree = styled.div<{ error?: string }>`
  width: 100%;

  & > p {
    color: ${(props) => (props.error ? "#E52F2F" : "#000000")};
  }
`;

const Select = styled.div`
  margin-top: 0.8rem;
  position: relative;
`;

const SelectValueDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.3rem;
`;

const SelectValue = styled.div<{ error?: string }>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${(props) =>
    props.error ? "1px solid #EF5050" : "1px solid #BCBCBC"};
  height: 4.8rem;
  padding: 1.3rem 2rem 1.4rem 1.6rem;
  border-radius: 4px 0px 0px 0px;
  background: #ffffff;
`;

const ErrorImg = styled.img`
  margin-right: -2.4rem;
`;

const DegreeInput = styled.input`
  padding: 0;
  align-self: center;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.1rem;
  border: none;
  outline: none;
  background: transparent;
`;

const SelectOptions = styled.div`
  position: absolute;
  width: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0px 16px 28px 0px rgba(0, 0, 0, 0.24);
  z-index: 2;

  & > h4 {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.1rem;
    padding: 1rem 0rem 1rem 1.6rem;

    &:hover {
      background: #4f4f4f;
      transition: all 0.3s ease;
      color: #fff;
      cursor: pointer;
    }
  }
`;
