import styled from "styled-components";
import BackArrow from "../assets/Group 4.svg";
import { Line } from "../styles/Line";
import { Button } from "../styles/Buttons";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import Degree from "../components/Degree";
import School from "../components/School";
import Graduation from "../components/Graduation";
import Description from "../components/Description";
import { useContext, useEffect } from "react";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";

export interface FormData {
  education: {
    university: string;
    finish_date: string;
    degree: string;
    description: string;
  }[];
}
[];

function EducationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    reset,
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

  const {
    // personalData,
    // educationData,
    // experienceData,
    currentPageNumber,
    setIsLoading,
  } = useContext(Context);

  const data = localStorage.getItem("resume");
  const levani = data && JSON.parse(data);

  const wholeResumeData = {
    name: levani.personaldata.name,
    last_name: levani.personaldata.last_name,
    about_me: levani.personaldata.info,
    email: levani.personaldata.email,
    phone_num: levani.personaldata.phone,

    education: levani.education,
    experience: levani.experience,
  };

  console.log(wholeResumeData);

  const navigate = useNavigate();

  function handleBackPage() {
    navigate(-1);
  }

  const { setEducationData, setCurrentPageNumber } = useContext(Context);

  const { fields, append } = useFieldArray<FormData>({
    control,
    name: "education",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1500);

    console.log(data);

    setIsLoading(false);
    navigate("/resume");
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.education) {
        const storedData = localStorage.getItem("resume");
        const existingResumeData = storedData ? JSON.parse(storedData) : {};
        const updateEducationData = {
          ...existingResumeData,
          education: value.education.map((item) => ({
            university: item?.university || "",
            finish_date: item?.finish_date || "",
            degree: item?.degree || "",
            description: item?.description || "",
          })),
        };
        localStorage.setItem("resume", JSON.stringify(updateEducationData));
        setEducationData(updateEducationData);
      }
    });
    console.log(subscription);
    // return () => subscription.unsubscribe();
  }, [watch, setEducationData, currentPageNumber]);

  // useEffect(() => {
  //   setCurrentPageNumber(3);
  // }, [setCurrentPageNumber]);

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(3));
    const data = localStorage.getItem("currentPage");
    if (data) {
      const jsonData = JSON.parse(data);
      setCurrentPageNumber(jsonData);
    }
  }, [setCurrentPageNumber]);

  useEffect(() => {
    const data = localStorage.getItem("resume");
    if (data) {
      const json = JSON.parse(data);
      setEducationData(json);
    }
  }, [setEducationData]);

  useEffect(() => {
    const storedData = localStorage.getItem("resume");
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data && data.education) {
        reset({
          education: data.education.map((item: FormData) => item),
        });
      }
    }
  }, [append, reset, fields.length]);

  return (
    <StyledEducation>
      <Helmet>
        <title>Education</title>
      </Helmet>
      <img src={BackArrow} alt="back-arrow" onClick={handleBackPage} />
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
                <School
                  index={index}
                  error={errors.education?.[index]?.university?.message}
                  register={register}
                  watch={watch}
                />

                <DegreeAndGraduation>
                  <Degree
                    register={register}
                    setValue={setValue}
                    index={index}
                    error={errors.education?.[index]?.degree?.message}
                  />
                  <Graduation
                    register={register}
                    index={index}
                    error={errors.education?.[index]?.finish_date?.message}
                  />
                </DegreeAndGraduation>

                <Description
                  register={register}
                  index={index}
                  error={errors.education?.[index]?.description?.message}
                />
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
            <Button type="button" onClick={() => navigate(-1)}>
              უკან
            </Button>
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

const Form = styled.form`
  margin-top: 8.9rem;
`;

const DinamicField = styled.div`
  margin-top: 5rem;
`;

const DegreeAndGraduation = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  gap: 5.6rem;
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
