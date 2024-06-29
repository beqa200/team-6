import styled from "styled-components";
import BackArrow from "../assets/Group 4.svg";
import { Line } from "../styles/Line";
import { Button } from "../styles/Buttons";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import warning from "../assets/ph_warning-fill.svg";
import check from "../assets/akar-icons_circle-check-fill.svg";
import useGeorgianPattern from "../customHooks/InputGeoPattern";
import useGeorgianPatternTextarea from "../customHooks/TexareaGeoPattern";
import { Helmet } from "react-helmet";
import Degree from "../components/Degree";

export interface FormData {
  education: {
    university: string;
    finish_date: string;
    degree: string;
    description: string;
  }[];
}

function EducationPage() {
  const { handleGeorgianInput, geoErrorMessage } = useGeorgianPattern();
  const { handleTextarea, geoErrorMessageTextarea } =
    useGeorgianPatternTextarea();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      education: [
        {
          university: "",
          finish_date: "",
          degree: "",
          description: "",
        },
      ],
    },
  });

  console.log(errors);

  const { fields, append } = useFieldArray<FormData>({
    control,
    name: "education",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <StyledEducation>
      <Helmet>
        <title>Education</title>
      </Helmet>
      <img src={BackArrow} alt="back-arrow" />
      <EducationFormDiv>
        <EducationHeader>
          <h2>ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</h2>
          <p>3/3</p>
        </EducationHeader>
        <Line />

        <Form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => {
            return (
              <DinamicField key={field.id}>
                <SchoolDiv>
                  <School
                    error={errors.education?.[index]?.university?.message}
                  >
                    <p>სასწავლებელი</p>
                    <input
                      type="text"
                      placeholder="სასწავლებელი"
                      id={`education[${index}].university`}
                      onKeyDown={(e) => handleGeorgianInput(e)}
                      {...register(`education.${index}.university`, {
                        required: { value: true, message: "required" },
                        minLength: {
                          value: 2,
                          message: "The length must be at least 2",
                        },
                      })}
                    />
                    <span>
                      მინიმუმ 2 &nbsp;
                      {geoErrorMessage[`education[${index}].university`] && (
                        <span style={{ color: "red" }}>
                          {geoErrorMessage[`education[${index}].university`]}
                          &nbsp;
                        </span>
                      )}
                      სიმბოლო
                    </span>
                  </School>
                  {errors.education?.[index]?.university?.message && (
                    <ErrorImg src={warning} alt="warning" />
                  )}
                  {watch().education[index].university.length >= 2 && (
                    <SucessImg src={check} />
                  )}
                </SchoolDiv>

                <DegreeAndGraduation>
                  <Degree
                    register={register}
                    setValue={setValue}
                    index={index}
                    error={errors.education?.[index]?.degree?.message}
                  />
                  <GraduationDiv>
                    <Graduation
                      error={errors.education?.[index]?.finish_date?.message}
                    >
                      <p>დამთავრების რიცხვი</p>
                      <input
                        type="date"
                        onKeyDown={handleGeorgianInput}
                        {...register(`education.${index}.finish_date`, {
                          required: { value: true, message: "required" },
                        })}
                      />
                    </Graduation>
                    {errors.education?.[index]?.finish_date?.message && (
                      <ErrorImg src={warning} alt="warning" />
                    )}
                  </GraduationDiv>
                </DegreeAndGraduation>

                <DescriptionDiv>
                  <Description
                    error={errors.education?.[index]?.description?.message}
                  >
                    <p>აღწერა</p>
                    <textarea
                      onKeyDown={handleTextarea}
                      placeholder="განათლების აღწერა"
                      id={`education[${index}].description`}
                      {...register(`education.${index}.description`, {
                        required: { value: true, message: "required" },
                      })}
                    ></textarea>

                    {geoErrorMessageTextarea[
                      `education[${index}].description`
                    ] && (
                      <p style={{ color: "red" }}>
                        {
                          geoErrorMessageTextarea[
                            `education[${index}].description`
                          ]
                        }
                        &nbsp;
                      </p>
                    )}
                  </Description>
                  {errors.education?.[index]?.description?.message && (
                    <ErrorImg src={warning} alt="warning" />
                  )}
                </DescriptionDiv>
              </DinamicField>
            );
          })}

          <AddSchool>
            <Button
              padding="1.4rem 2.25rem"
              bg="#62A1EB"
              onClick={() => {
                append({
                  university: "",
                  finish_date: "",
                  description: "",
                  degree: "",
                });
              }}
              type="button"
            >
              სხვა სასწავლებლის დამატება
            </Button>
          </AddSchool>

          <FormButtons>
            <Button type="button">უკან</Button>
            <Button>დასრულება</Button>
          </FormButtons>
        </Form>
      </EducationFormDiv>
    </StyledEducation>
  );
}

const StyledEducation = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
  padding: 4.5rem 0rem 6.5rem 4.8rem;

  & > img {
    align-self: flex-start;
  }

  p {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.1rem;
  }

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

    &::placeholder {
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.1rem;
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const EducationFormDiv = styled.div`
  width: 100%;
`;

const EducationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > h2 {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 2.93rem;
    color: #1a1a1a;
  }

  & > p {
    font-size: 2rem;
    font-weight: 400;
    line-height: 2.386rem;
    color: #1a1a1a;
  }
`;

const Form = styled.form``;

const DinamicField = styled.div``;

const SchoolDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.3rem;
`;

const ErrorImg = styled.img`
  margin-right: -5rem;
`;

const SucessImg = styled.img`
  position: absolute;
  right: 1.4rem;
  top: 4.3rem;
`;

const School = styled.div<{ error?: string }>`
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

  & > span {
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 2.1rem;
    margin-top: 0.8rem;
  }

  & > p {
    color: ${(props) => (props.error ? "#E52F2F" : "#000000")};
  }
`;

const DegreeAndGraduation = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  gap: 5.6rem;
`;

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

const Graduation = styled.div<{ error?: string }>`
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

const DescriptionDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.3rem;
`;

const Description = styled.div<{ error?: string }>`
  width: 100%;
  margin-top: 4rem;
  border-bottom: 1px solid #c1c1c1;
  padding-bottom: 5.3rem;

  & > textarea {
    width: 100%;
    padding: 13px 16px 14.5rem 16px;
    border-radius: 4px 0px 0px 0px;
    margin-top: 0.8rem;
    border: ${(props) => (props.error ? "1px solid #EF5050" : "#BCBCBC")};

    &::placeholder {
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.1rem;
      color: #00000099;
    }
  }

  & > p {
    color: ${(props) => (props.error ? "#E52F2F" : "#000000")};
  }
`;

const AddSchool = styled.div`
  margin-top: 4.5rem;
`;

const FormButtons = styled.div`
  margin-top: 20rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default EducationPage;
