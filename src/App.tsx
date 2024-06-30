import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EducationPage, { FormData } from "./pages/EducationPage";
import ExperiencePage from "./pages/ExperiencePage";
import PersonalPage from "./pages/PersonalPage";
import ResumePage from "./pages/ResumePage";
import Layout from "./layout/Layout";
import { GlobalStyles } from "./globalStyles/GlobalStyles";

export interface IExperience {
  experience: {
    position: string;
    employer: string;
    date_started: string;
    date_finished: string;
    description: string;
  }[];
}

export interface IFormInput {
  name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  data: string;
  info: string;
  file: FileList | null;
  e: string;
  personal: IFormInput[];
  avatar: string;
}

export interface IContext {
  experienceData: IExperience;
  setExperienceData: React.Dispatch<React.SetStateAction<IExperience>>;
  currentPageNumber: number;
  showExperienceInResume: boolean;
  setShowExperienceInResume: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
  personalData: IFormInput;
  setPersonalData: React.Dispatch<React.SetStateAction<IFormInput>>;
  educationData: FormData;
  setEducationData: React.Dispatch<React.SetStateAction<FormData>>;
  loading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IWholeResume {
  education: FormData;
  experience: IExperience;
  name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  data: string;
  info: string;
  file: FileList | null;
  e: string;
  personal: IFormInput[];
}

export const Context = createContext<IContext>({
  currentPageNumber: 1,
  setCurrentPageNumber: () => {},
  experienceData: {
    experience: [],
  },
  setExperienceData: () => {},
  showExperienceInResume: false,
  setShowExperienceInResume: () => {},
  personalData: {
    name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    data: "",
    info: "",
    file: null,
    e: "",
    personal: [],
    avatar: "",
  },
  setPersonalData: () => {},
  educationData: {
    education: [],
  },
  setEducationData: () => {},
  loading: false,
  setIsLoading: () => {},
});

function App() {
  const [showExperienceInResume, setShowExperienceInResume] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(() => {
    const data = localStorage.getItem("currentPage");
    return data ? JSON.parse(data) : 1;
  });

  console.log("current", currentPageNumber);
  const [experienceData, setExperienceData] = useState<IExperience>(() => {
    const data = localStorage.getItem("resume");
    if (data) {
      const jsonData = JSON.parse(data);
      return jsonData as IExperience;
    } else {
      return { experience: [] };
    }
  });

  const [personalData, setPersonalData] = useState<IFormInput>(() => {
    const data = localStorage.getItem("resume");
    if (data) {
      return JSON.parse(data).personaldata as IFormInput;
    }
    return {
      name: "",
      last_name: "",
      phone: "",
      email: "",
      address: "",
      state: "",
      data: "",
      info: "",
      file: null,
      e: "",
      personal: [],
      avatar: "",
    };
  });

  const [educationData, setEducationData] = useState<FormData>(() => {
    const data = localStorage.getItem("resume");
    if (data) {
      return JSON.parse(data) as FormData;
    }
    return { education: [] };
  });

  return (
    <>
      <GlobalStyles />
      <Context.Provider
        value={{
          loading,
          setIsLoading,
          currentPageNumber,
          setCurrentPageNumber,
          experienceData,
          setExperienceData,
          showExperienceInResume,
          setShowExperienceInResume,
          personalData,
          setPersonalData,
          educationData,
          setEducationData,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route element={<Layout />}>
              <Route path="/education" element={<EducationPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/personal" element={<PersonalPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
