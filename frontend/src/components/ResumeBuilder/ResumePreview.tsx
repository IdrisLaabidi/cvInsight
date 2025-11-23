import React, { forwardRef } from "react";
import { useResume } from "./ResumeContext";
import { MdMail, MdPhone, MdLocationOn } from "react-icons/md";
import { RiLinkedinBoxFill, RiGithubFill, RiGlobalLine } from "react-icons/ri";

const ResumePreview = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { about, educationList, skills, softSkills, interests, workList, projects, printElem } =
    useResume();

  return (
    <div className="w-full h-full overflow-y-auto bg-white p-8" ref={printElem}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6 pb-6 border-b-4 border-blue-600">
        <div>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">{about.name || "Your Name"}</h1>
          <p className="text-lg text-gray-600">{about.role || "Your Role"}</p>
        </div>
        {about.picture && (
          <img
            src={about.picture}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-600"
          />
        )}
      </div>

      {/* Contact Info */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mb-6 border-l-4 border-blue-600">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <MdMail className="text-blue-600 text-lg" />
            <span className="text-gray-700">{about.email || "email@example.com"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MdPhone className="text-blue-600 text-lg" />
            <span className="text-gray-700">{about.phone || "+1234567890"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MdLocationOn className="text-blue-600 text-lg" />
            <span className="text-gray-700">{about.address || "City, Country"}</span>
          </div>
        </div>

        {(about.linkedin || about.github || about.portfolio) && (
          <div className="flex flex-wrap gap-4 pt-4 border-t border-blue-200">
            {about.linkedin && (
              <a
                href={about.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm"
              >
                <RiLinkedinBoxFill className="text-lg" />
                LinkedIn
              </a>
            )}
            {about.github && (
              <a
                href={about.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm"
              >
                <RiGithubFill className="text-lg" />
                GitHub
              </a>
            )}
            {about.portfolio && (
              <a
                href={about.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold text-sm"
              >
                <RiGlobalLine className="text-lg" />
                Portfolio
              </a>
            )}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {about.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 border-blue-600 pb-2 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{about.summary}</p>
        </div>
      )}

      {/* Education */}
      {educationList.some((e) => e.degree || e.school) && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 border-blue-600 pb-2 mb-3">
            Education
          </h2>
          <div className="space-y-4">
            {educationList.map((edu) =>
              edu.degree || edu.school ? (
                <div key={edu.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    {edu.startYr && (
                      <span className="text-xs text-gray-500">
                        {edu.startYr} - {edu.endYr}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-blue-600 font-medium">{edu.school}</p>
                  {edu.grade && <p className="text-xs text-gray-600 mt-1">Grade: {edu.grade}</p>}
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {workList.some((w) => w.position || w.company) && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 border-blue-600 pb-2 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workList.map((work) =>
              work.position || work.company ? (
                <div key={work.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800">{work.position}</h3>
                    {work.startDate && (
                      <span className="text-xs text-gray-500">
                        {work.startDate} - {work.endDate || "Present"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-blue-600 font-medium">
                    {work.company} {work.type && `• ${work.type}`}
                  </p>
                  {work.description && (
                    <p className="text-xs text-gray-700 mt-2 leading-relaxed">{work.description}</p>
                  )}
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.some((p) => p.name || p.description) && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 border-blue-600 pb-2 mb-3">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) =>
              project.name || project.description ? (
                <div key={project.id}>
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  {project.description && (
                    <p className="text-xs text-gray-700 mt-1 leading-relaxed">{project.description}</p>
                  )}
                  {(project.url || project.github) && (
                    <div className="flex gap-3 mt-2">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Live Link
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Technical Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 border-blue-600 pb-2 mb-3">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Soft Skills */}
      {softSkills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 border-blue-600 pb-2 mb-3">
            Soft Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-gray-200 text-gray-800 text-xs font-medium rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {interests.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 border-blue-600 pb-2 mb-3">
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest.id}
                className="px-3 py-1 bg-gray-100 border border-gray-300 text-gray-800 text-xs font-medium rounded-full"
              >
                {interest.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default ResumePreview;