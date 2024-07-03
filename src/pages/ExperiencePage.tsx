import styled from "styled-components";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import BackArrow from "../assets/Group 4.svg";
import { Button } from "../styles/Buttons";
import WarningIcon from "../assets/ph_warning-fill.svg";
import { useNavigate } from "react-router-dom";
import Validate from "../assets/akar-icons_circle-check-fill.svg";
import { Label, TextInput } from "../styles/FormStyles";
import { useContext, useEffect, useState } from "react";
import { Context, IExperience } from "../App";
import { Helmet } from "react-helmet";

export interface Irequired {
  [index: number]: boolean;
}
function ExperiencePage() {
  const { setExperienceData, setCurrentPageNumber, currentPageNumber } =
    useContext(Context);
  const navigate = useNavigate();

  const [required, setRequired] = useState<Irequired>({});

  // const handleRefresh = () => {
  //   window.location.reload();
  // };

  const {
    handleSubmit,
    register,
    control,
    watch,
    reset,

    formState: { errors },
  } = useForm<IExperience>({
    defaultValues: {
      experience: [
        {
          position: "",
          employer: "",
          date_started: "",
          date_finished: "",
          description: "",
        },
      ],
    },
  });

  const { fields, append } = useFieldArray<IExperience>({
    control,
    name: "experience",
  });

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(2));
    const data = localStorage.getItem("currentPage");
    if (data) {
      const jsonData = JSON.parse(data);
      setCurrentPageNumber(jsonData);
    }
  }, [setCurrentPageNumber]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.experience) {
        const storedData = localStorage.getItem("resume");
        const existingResumeData = storedData ? JSON.parse(storedData) : {};
        const updatedExperienceData = {
          ...existingResumeData,
          experience: value.experience.map((item) => ({
            position: item?.position || "",
            employer: item?.employer || "",
            date_started: item?.date_started || "",
            date_finished: item?.date_finished || "",
            description: item?.description || "",
          })),
        };
        console.log(updatedExperienceData.experience, "updatedExperienceData");
        localStorage.setItem("resume", JSON.stringify(updatedExperienceData));
        setExperienceData(updatedExperienceData);
        // aqqq
      }
    });
    const updateRequiredFields = () => {
      const updatedRequiredFields = watch().experience.map((item, index) => {
        if (index === 0) {
          return { [index]: true };
        }

        const allFieldsEmpty =
          item.description.trim().length === 0 &&
          item.employer.trim().length === 0 &&
          item.date_finished.trim().length === 0 &&
          item.date_started.trim().length === 0 &&
          item.position.trim().length === 0;

        return { [index]: !allFieldsEmpty };
      });

      setRequired(Object.assign({}, ...updatedRequiredFields));
    };
    console.log("ok");
    updateRequiredFields();
    console.log(subscription);
  }, [watch, setExperienceData, currentPageNumber]);

  useEffect(() => {
    // const updateRequiredFields = () => {
    //   const updatedRequiredFields = watch().experience.map((item, index) => {
    //     if (index === 0) {
    //       return { [index]: true };
    //     }
    //     const allFieldsEmpty =
    //       item.description.trim().length === 0 &&
    //       item.employer.trim().length === 0 &&
    //       item.date_finished.trim().length === 0 &&
    //       item.date_started.trim().length === 0 &&
    //       item.position.trim().length === 0;
    //     return { [index]: !allFieldsEmpty };
    //   });
    //   setRequired(Object.assign({}, ...updatedRequiredFields));
    // };
    // console.log("ok");
    // updateRequiredFields();
  }, [fields, watch]);

  console.log(watch().experience);
  console.log(required);
  useEffect(() => {
    const storedData = localStorage.getItem("resume");
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data && data.experience) {
        reset({
          experience: data.experience.map((item: IExperience) => item),
        });
      }
    }
  }, [append, reset, fields.length]);

  useEffect(() => {
    const data = localStorage.getItem("resume");
    if (data) {
      const json = JSON.parse(data);
      setExperienceData(json);
    }
  }, [setExperienceData]);

  const onSubmit: SubmitHandler<IExperience> = (data) => {
    const storedData = localStorage.getItem("resume");

    const filteredExperience = data.experience.filter((item) => {
      return (
        item.position.trim() !== "" ||
        item.employer.trim() !== "" ||
        item.date_started.trim() !== "" ||
        item.date_finished.trim() !== "" ||
        item.description.trim() !== ""
      );
    });
    data.experience = filteredExperience;
    if (storedData) {
      const dataJson = JSON.parse(storedData);

      localStorage.setItem(
        "resume",
        JSON.stringify({ ...dataJson, experience: filteredExperience })
      );
    }

    setExperienceData({ experience: filteredExperience });
    navigate("/education");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5rem" }}>
      <Helmet>
        <title>Experience</title>
      </Helmet>
      <img
        onClick={() => {
          navigate(-1);
        }}
        style={{
          alignSelf: "flex-start",
          paddingLeft: "4rem",
          marginTop: "4rem",
        }}
        src={BackArrow}
        alt="go back"
      />

      <ExperiencePageStyles>
        <div className="headerOfExperience">
          <h1>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</h1>
          <span>2/3</span>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div className="fieldsDiv" style={{ width: "100%" }} key={field.id}>
              <TextInput error={errors.experience?.[index]?.position?.message}>
                <Label
                  error={errors.experience?.[index]?.position?.message}
                  style={{ paddingTop: "2rem" }}
                  htmlFor={`experience[${index}].position`}
                >
                  თანამდებობა
                </Label>
                <div style={{ position: "relative" }}>
                  <input
                    id={`experience[${index}].position`}
                    placeholder="დეველოპერი, დიზაინერი, ა.შ."
                    type="text"
                    {...register(`experience.${index}.position`, {
                      required: {
                        value: required[index],
                        message:
                          "Position is required for all but the first entry",
                      },
                      minLength: { value: 2, message: "Minimum 2 characters" },
                    })}
                    // onBlur={handleRefresh}
                  />

                  {errors.experience?.[index]?.position && (
                    <img src={WarningIcon} alt="WarningIcon" />
                  )}

                  {watch().experience[index].position.length >= 2 && (
                    <img
                      style={{
                        position: "absolute",
                        bottom: "1.5rem",
                        right: "1.5rem",
                      }}
                      src={Validate}
                      alt="ValidateIcon"
                    />
                  )}
                </div>

                <p>მინიმუმ 2 სიმბოლო</p>
              </TextInput>
              <TextInput error={errors.experience?.[index]?.employer?.message}>
                <Label
                  error={errors.experience?.[index]?.employer?.message}
                  htmlFor={`experience[${index}].employer`}
                >
                  დამსაქმებელი
                </Label>
                <div style={{ position: "relative" }}>
                  <input
                    id={`experience[${index}].employer`}
                    placeholder="დამსაქმებელი"
                    type="text"
                    {...register(`experience.${index}.employer`, {
                      required: {
                        value: required[index],
                        message:
                          "Position is required for all but the first entry",
                      },
                      minLength: { value: 2, message: "Minimum 2 characters" },
                    })}
                  />
                  {errors.experience?.[index]?.employer && (
                    <img src={WarningIcon} alt="WarningIcon" />
                  )}
                  {watch().experience[index].employer.length >= 2 && (
                    <img
                      style={{
                        position: "absolute",
                        bottom: "1.5rem",
                        right: "1.5rem",
                      }}
                      src={Validate}
                      alt="ValidateIcon"
                    />
                  )}
                </div>

                <p>მინიმუმ 2 სიმბოლო</p>
              </TextInput>
              <DateForm error={errors.experience?.[index]?.employer?.message}>
                <div>
                  <Label
                    error={errors.experience?.[index]?.date_started?.message}
                    htmlFor={`experience[${index}].date_started`}
                  >
                    დაწყების რიცხვი
                  </Label>

                  <input
                    id={`experience[${index}].date_started`}
                    type="date"
                    {...register(`experience.${index}.date_started`, {
                      required: {
                        value: required[index] || false,
                        message:
                          "Position is required for all but the first entry",
                      },
                    })}
                  />
                </div>
                <div>
                  <Label
                    style={{ textWrap: "nowrap" }}
                    error={errors.experience?.[index]?.date_finished?.message}
                    htmlFor={`experience[${index}].date_finished`}
                  >
                    დამთავრების რიცხვი
                  </Label>
                  <input
                    id={`experience[${index}].date_finished`}
                    type="date"
                    {...register(`experience.${index}.date_finished`, {
                      required: {
                        value: required[index] || false,
                        message:
                          "Position is required for all but the first entry",
                      },
                    })}
                  />
                </div>
              </DateForm>
              <TextInput
                error={errors.experience?.[index]?.description?.message}
                style={{
                  paddingBottom: "5rem",
                  borderBottom: "1px solid #C1C1C1",
                }}
              >
                <Label
                  error={errors.experience?.[index]?.description?.message}
                  htmlFor={`experience[${index}].description`}
                >
                  აღწერა
                </Label>
                <div style={{ position: "relative" }}>
                  <Textarea
                    error={errors.experience?.[index]?.description?.message}
                    id={`experience[${index}].description`}
                    placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                    {...register(`experience.${index}.description`, {
                      required: {
                        value: required[index] || false,
                        message:
                          "Position is required for all but the first entry",
                      },
                      minLength: { value: 2, message: "Minimum 2 characters" },
                    })}
                  ></Textarea>

                  {errors.experience?.[index]?.description && (
                    <img src={WarningIcon} alt="WarningIcon" />
                  )}
                  {watch().experience[index].description.length >= 5 && (
                    <img
                      style={{
                        position: "absolute",
                        top: "1.5rem",
                        right: "1.5rem",
                      }}
                      src={Validate}
                      alt="ValidateIcon"
                    />
                  )}
                </div>
              </TextInput>
            </div>
          ))}
          <Button
            type="button"
            style={{ alignSelf: "flex-start" }}
            bg={"#62A1EB"}
            padding={"1.8rem 5.5rem"}
            onClick={() =>
              append({
                position: "",
                employer: "",
                date_started: "",
                date_finished: "",
                description: "",
              })
            }
          >
            მეტი გამოცდილების დამატება
          </Button>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "11.5rem",
            }}
          >
            <Button
              style={{ marginBottom: "6.5rem" }}
              onClick={() => {
                navigate(-1);
              }}
              type="button"
            >
              უკან
            </Button>
            <Button style={{ marginBottom: "6.5rem" }} type="submit">
              შემდეგი
            </Button>
          </div>
        </Form>
      </ExperiencePageStyles>
    </div>
  );
}

export default ExperiencePage;
const DateForm = styled.div<{ error?: string }>`
  display: flex;

  justify-content: space-between;
  width: 100%;
  gap: 3.2rem;
  div {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  input {
    border: ${(props) => (props.error ? "1px solid red" : "1px solid #bcbcbc")};
    background: #fff;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  .fieldsDiv {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;
const Textarea = styled.textarea<{ error?: string }>`
  padding: 13px 16px 89px 16px;
  justify-content: center;
  align-items: center;
  width: 100%;
  align-self: stretch;
  border-radius: 4px;
  border: ${(props) => (props.error ? "1px solid red" : "1px solid #bcbcbc")};
  background: #fff;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
`;
const ExperiencePageStyles = styled.div<{ error?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;

  justify-content: center;

  input {
    width: 100%;
    height: 48px;
    padding: 13px 16px 14px 16px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
    border-radius: 4px;
    background: #fff;
  }

  .headerOfExperience {
    display: flex;
    align-items: center;
    padding-top: 4rem;
    padding-bottom: 5rem;
    span {
      margin-left: auto;
      margin-left: -2.8rem;

      text-align: right;
      font-size: 2rem;
      font-weight: 400;
    }
    h1 {
      padding-bottom: 1rem;
      border-bottom: 1px solid black;
      width: 100%;
      font-size: 2.4rem;
      font-weight: 700;
    }
  }
`;
