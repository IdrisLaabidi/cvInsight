import React, { createContext, useContext, useState, useRef, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export type TemplateType = "modern" | "minimalist" | "professional";

export interface About {
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  portfolio: string;
  picture: string;
  summary: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  startYr: number;
  endYr: number;
  grade: string;
}

export interface Work {
  id: string;
  position: string;
  company: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  github: string;
  description: string;
}

interface ResumeContextType {
  about: About;
  setAbout: (about: About) => void;
  educationList: Education[];
  setEducationList: (education: Education[]) => void;
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  softSkills: Skill[];
  setSoftSkills: (softSkills: Skill[]) => void;
  interests: Skill[];
  setInterests: (interests: Skill[]) => void;
  workList: Work[];
  setWorkList: (workList: Work[]) => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
  printElem: React.RefObject<HTMLDivElement | null>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within ResumeProvider");
  }
  return context;
};

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const printElem = useRef<HTMLDivElement | null>(null);
  const [template, setTemplate] = useState<TemplateType>("modern");

  const [about, setAbout] = useState<About>({
    name: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    picture: "",
    summary: "",
  });

  const [educationList, setEducationList] = useState<Education[]>([
    {
      id: uuidv4(),
      degree: "",
      school: "",
      startYr: 0,
      endYr: 0,
      grade: "",
    },
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: uuidv4(), name: "JavaScript" },
    { id: uuidv4(), name: "ReactJS" },
    { id: uuidv4(), name: "NodeJS" },
    { id: uuidv4(), name: "MongoDB" },
  ]);

  const [softSkills, setSoftSkills] = useState<Skill[]>([
    { id: uuidv4(), name: "Communication" },
    { id: uuidv4(), name: "Problem-solving" },
    { id: uuidv4(), name: "Teamwork" },
    { id: uuidv4(), name: "Leadership" },
  ]);

  const [interests, setInterests] = useState<Skill[]>([
    { id: uuidv4(), name: "Web Development" },
    { id: uuidv4(), name: "Machine Learning" },
    { id: uuidv4(), name: "Open Source Projects" },
  ]);

  const [workList, setWorkList] = useState<Work[]>([
    {
      id: uuidv4(),
      position: "",
      company: "",
      type: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: uuidv4(),
      name: "",
      url: "",
      github: "",
      description: "",
    },
  ]);

  return (
    <ResumeContext.Provider
      value={{
        about,
        setAbout,
        educationList,
        setEducationList,
        skills,
        setSkills,
        softSkills,
        setSoftSkills,
        interests,
        setInterests,
        workList,
        setWorkList,
        projects,
        setProjects,
        template,
        setTemplate,
        printElem,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};