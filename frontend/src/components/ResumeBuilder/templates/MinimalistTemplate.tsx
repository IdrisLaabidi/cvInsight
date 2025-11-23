import React, { forwardRef } from "react";
import { useResume } from "../ResumeContext";

const MinimalistTemplate = forwardRef<HTMLDivElement, object>(
  (_, ref) => {
    const { about, educationList, skills, softSkills, interests, workList, projects } =
      useResume();

    return (
      <div className="w-full bg-white" ref={ref}>
        <div className="max-w-4xl mx-auto p-12 space-y-6 font-sans">
          {/* Header */}
          <div className="text-center pb-6 border-b-2 border-gray-300">
            <h1 className="text-5xl font-bold text-gray-900 mb-1">
              {about.name || "Your Name"}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {about.role || "Your Professional Role"}
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-700">
              {about.email && <span>{about.email}</span>}
              {about.phone && <span>{about.phone}</span>}
              {about.address && <span>{about.address}</span>}
            </div>
          </div>

          {/* Summary */}
          {about.summary && (
            <div>
              <p className="text-gray-700 leading-relaxed text-justify">
                {about.summary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {workList.some((w) => w.position || w.company) && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest">
                Experience
              </h2>
              <div className="space-y-4">
                {workList.map((work) =>
                  work.position || work.company ? (
                    <div key={work.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-base font-bold text-gray-900">
                          {work.position}
                        </h3>
                        {work.startDate && (
                          <span className="text-xs text-gray-600">
                            {work.startDate}
                            {work.endDate && ` – ${work.endDate}`}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 font-semibold">
                        {work.company}
                        {work.type && ` • ${work.type}`}
                      </p>
                      {work.description && (
                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
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
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest">
                Education
              </h2>
              <div className="space-y-3">
                {educationList.map((edu) =>
                  edu.degree || edu.school ? (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-base font-bold text-gray-900">
                          {edu.degree}
                        </h3>
                        {edu.startYr && (
                          <span className="text-xs text-gray-600">
                            {edu.startYr} – {edu.endYr}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 font-semibold">
                        {edu.school}
                        {edu.grade && ` • GPA: ${edu.grade}`}
                      </p>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.some((p) => p.name || p.description) && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest">
                Projects
              </h2>
              <div className="space-y-3">
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
                      {(project.url || project.github) && (
                        <p className="text-xs text-gray-600 mt-1">
                          {project.url && `Web: ${project.url}`}
                          {project.url && project.github && " • "}
                          {project.github && `GitHub: ${project.github}`}
                        </p>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-widest">
                Technical Skills
              </h2>
              <p className="text-sm text-gray-700">
                {skills.map((skill) => skill.name).join(" • ")}
              </p>
            </div>
          )}

          {/* Soft Skills */}
          {softSkills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-widest">
                Soft Skills
              </h2>
              <p className="text-sm text-gray-700">
                {softSkills.map((skill) => skill.name).join(" • ")}
              </p>
            </div>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-widest">
                Interests
              </h2>
              <p className="text-sm text-gray-700">
                {interests.map((interest) => interest.name).join(" • ")}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

MinimalistTemplate.displayName = "MinimalistTemplate";

export default MinimalistTemplate;