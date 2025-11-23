import React, { forwardRef } from "react";
import { useResume } from "../ResumeContext";

type TemplateProps = Record<string, never>;

const ProfessionalTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (_, ref) => {
    const { about, educationList, skills, softSkills, interests, workList, projects } =
      useResume();

    return (
      <div className="w-full bg-white" ref={ref}>
        <div className="max-w-4xl mx-auto">
          {/* Sidebar */}
          <div className="grid grid-cols-4 gap-0 min-h-screen">
            {/* Left Sidebar */}
            <div className="bg-gray-900 text-white p-8 col-span-1 space-y-6">
              {about.picture && (
                <div className="mb-6">
                  <img
                    src={about.picture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-400"
                  />
                </div>
              )}

              {/* Contact */}
              <div>
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wide mb-3">
                  Contact
                </h3>
                <div className="space-y-2 text-xs">
                  {about.email && <p className="break-all">{about.email}</p>}
                  {about.phone && <p>{about.phone}</p>}
                  {about.address && <p>{about.address}</p>}
                </div>
              </div>

              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wide mb-3">
                    Skills
                  </h3>
                  <div className="space-y-2">
                    {skills.map((skill) => (
                      <div key={skill.id} className="text-xs">
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Soft Skills */}
              {softSkills.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wide mb-3">
                    Competencies
                  </h3>
                  <div className="space-y-2">
                    {softSkills.map((skill) => (
                      <div key={skill.id} className="text-xs">
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interests */}
              {interests.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wide mb-3">
                    Interests
                  </h3>
                  <div className="space-y-2">
                    {interests.map((interest) => (
                      <div key={interest.id} className="text-xs">
                        {interest.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="bg-white p-8 col-span-3 space-y-6">
              {/* Header */}
              <div className="border-b-4 border-gray-900 pb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {about.name || "Your Name"}
                </h1>
                <p className="text-xl text-gray-600 font-semibold mb-4">
                  {about.role || "Your Professional Role"}
                </p>
                {about.summary && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {about.summary}
                  </p>
                )}
              </div>

              {/* Work Experience */}
              {workList.some((w) => w.position || w.company) && (
                <div>
                  <h2 className="text-lg font-bold text-gray-900 uppercase mb-4 pb-2 border-b-2 border-gray-300">
                    Experience
                  </h2>
                  <div className="space-y-5">
                    {workList.map((work) =>
                      work.position || work.company ? (
                        <div key={work.id}>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-base font-bold text-gray-900">
                              {work.position}
                            </h3>
                            {work.startDate && (
                              <span className="text-xs text-gray-600 font-semibold">
                                {work.startDate}
                                {work.endDate && ` – ${work.endDate}`}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-blue-600 font-semibold">
                            {work.company}
                          </p>
                          {work.type && (
                            <p className="text-xs text-gray-600 mb-2">
                              {work.type}
                            </p>
                          )}
                          {work.description && (
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {work.description}
                            </p>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {/* Education */}
              {educationList.some((e) => e.degree || e.school) && (
                <div>
                  <h2 className="text-lg font-bold text-gray-900 uppercase mb-4 pb-2 border-b-2 border-gray-300">
                    Education
                  </h2>
                  <div className="space-y-4">
                    {educationList.map((edu) =>
                      edu.degree || edu.school ? (
                        <div key={edu.id}>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-base font-bold text-gray-900">
                              {edu.degree}
                            </h3>
                            {edu.startYr && (
                              <span className="text-xs text-gray-600 font-semibold">
                                {edu.startYr} – {edu.endYr}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-blue-600 font-semibold">
                            {edu.school}
                          </p>
                          {edu.grade && (
                            <p className="text-xs text-gray-700">
                              GPA: {edu.grade}
                            </p>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {/* Projects */}
              {projects.some((p) => p.name || p.description) && (
                <div>
                  <h2 className="text-lg font-bold text-gray-900 uppercase mb-4 pb-2 border-b-2 border-gray-300">
                    Projects
                  </h2>
                  <div className="space-y-4">
                    {projects.map((project) =>
                      project.name || project.description ? (
                        <div key={project.id}>
                          <h3 className="text-base font-bold text-gray-900">
                            {project.name}
                          </h3>
                          {project.description && (
                            <p className="text-sm text-gray-700 mt-1">
                              {project.description}
                            </p>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProfessionalTemplate.displayName = "ProfessionalTemplate";

export default ProfessionalTemplate;