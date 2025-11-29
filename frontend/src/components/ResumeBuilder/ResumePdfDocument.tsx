import React from "react";
import { About, Education, Work, Skill, Project, Language, Certificate, SocialActivity } from "./ResumeContext";
import ClassicBlueTemplate from "./templates/ClassicBlueTemplate";
import HealthGreenTemplate from "./templates/HealthGreenTemplate";
import ClassicLinesTemplate from "./templates/ClassicLinesTemplate";
import ClassicLines2Template from "./templates/ClassicLines2Template";

export interface ResumePdfProps {
  about: About;
  educationList: Education[];
  workList: Work[];
  skills: Skill[];
  softSkills: Skill[];
  interests: Skill[];
  projects: Project[];
  languages: Language[];
  certificates: Certificate[];
  socialActivities: SocialActivity[];
  templateId?: string;
}

const ResumePdfDocument: React.FC<ResumePdfProps> = (props) => {
  const templateId = props.templateId ?? 'classic-blue';

  switch (templateId) {
    case 'health-green':
      return <HealthGreenTemplate {...props} />;
    case 'classic-lines':
      return <ClassicLinesTemplate {...props} />;
    case 'classic-lines2':
      return <ClassicLines2Template {...props} />;
    case 'classic-blue':
    default:
      return <ClassicBlueTemplate {...props} />;
  }
};

export default ResumePdfDocument;
