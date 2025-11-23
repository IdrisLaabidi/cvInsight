import React, { forwardRef } from "react";
import { useResume } from "../ResumeContext";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

const ModernTemplate = forwardRef<HTMLDivElement, object>((_, ref) => {
  const { about, educationList, skills, softSkills, interests, workList, projects } =
    useResume();

  return (
    <div className="w-full bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto p-12 space-y-8">
        {/* Header Section */}
        <div className="relative pb-8 border-b-4 border-blue-600">
          <div className="grid grid-cols-3 gap-8 items-start">
            <div className="col-span-2">
              <h1 className="text-5xl font-black text-blue-600 mb-2 leading-tight">
                {about.name || "Your Name"}
              </h1>
              <p className="text-2xl font-bold text-gray-700 mb-4">
                {about.role || "Your Professional Role"}
              </p>
              <p className="text-gray-600 leading-relaxed text-justify pr-4">
                {about.summary || "Your professional summary will appear here"}
              </p>
            </div>
            {about.picture && (
              <div className="flex justify-end">
                <img
                  src={about.picture}
                  alt="Profile"
                  className="w-40 h-40 rounded-2xl object-cover border-4 border-blue-600 shadow-xl"
                />
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-600">
          <div className="space-y-3">
            {about.email && (
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{about.email}</span>
              </div>
            )}
            {about.phone && (
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{about.phone}</span>
              </div>
            )}
            {about.address && (
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{about.address}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            {about.linkedin && (
              <div className="text-sm">
                <span className="font-semibold text-blue-600">LinkedIn:</span>{" "}
                <span className="text-gray-700">{about.linkedin}</span>
              </div>
            )}
            {about.github && (
              <div className="text-sm">
                <span className="font-semibold text-blue-600">GitHub:</span>{" "}
                <span className="text-gray-700">{about.github}</span>
              </div>
            )}
            {about.portfolio && (
              <div className="text-sm">
                <span className="font-semibold text-blue-600">Portfolio:</span>{" "}
                <span className="text-gray-700">{about.portfolio}</span>
              </div>
            )}
          </div>
        </div>

        {/* Work Experience */}
        {workList.some((w) => w.position || w.company) && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-4 border-blue-600 uppercase tracking-wide">
              Work Experience
            </h2>
            <div className="space-y-5 mt-4">
              {workList.map((work) =>
                work.position || work.company ? (
                  <div key={work.id} className="border-l-4 border-blue-600 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {work.position}
                        </h3>
                        <p className="text-blue-600 font-semibold text-lg">
                          {work.company}
                        </p>
                      </div>
                      {work.startDate && (
                        <span className="text-sm text-gray-600 font-semibold whitespace-nowrap ml-4">
                          {work.startDate}
                          {work.endDate && ` - ${work.endDate}`}
                        </span>
                      )}
                    </div>
                    {work.type && (
                      <p className="text-sm text-gray-600 font-medium mb-2">
                        {work.type}
                      </p>
                    )}
                    {work.description && (
                      <p className="text-gray-700 leading-relaxed text-justify">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-4 border-indigo-600 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-4 mt-4">
              {educationList.map((edu) =>
                edu.degree || edu.school ? (
                  <div key={edu.id} className="border-l-4 border-indigo-600 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {edu.degree}
                        </h3>
                        <p className="text-indigo-600 font-semibold">{edu.school}</p>
                      </div>
                      {edu.startYr && (
                        <span className="text-sm text-gray-600 font-semibold whitespace-nowrap ml-4">
                          {edu.startYr} - {edu.endYr}
                        </span>
                      )}
                    </div>
                    {edu.grade && (
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">GPA:</span> {edu.grade}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-4 border-blue-600 uppercase tracking-wide">
              Projects
            </h2>
            <div className="space-y-5 mt-4">
              {projects.map((project) =>
                project.name || project.description ? (
                  <div key={project.id} className="border-l-4 border-cyan-600 pl-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-gray-700 mb-3 leading-relaxed text-justify">
                        {project.description}
                      </p>
                    )}
                    {(project.url || project.github) && (
                      <div className="flex gap-4 pt-2">
                        {project.url && (
                          <span className="text-xs text-blue-600 font-semibold">
                            Live: {project.url}
                          </span>
                        )}
                        {project.github && (
                          <span className="text-xs text-blue-600 font-semibold">
                            GitHub: {project.github}
                          </span>
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
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-4 border-blue-600 uppercase tracking-wide">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills */}
        {softSkills.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-4 border-indigo-600 uppercase tracking-wide">
              Soft Skills
            </h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {softSkills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-4 py-2 bg-indigo-100 text-indigo-800 font-semibold rounded-full text-sm border border-indigo-300"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-5 pb-3 border-b-4 border-cyan-600 uppercase tracking-wide">
              Interests
            </h2>
            <div className="flex flex-wrap gap-3 mt-4">
              {interests.map((interest) => (
                <span
                  key={interest.id}
                  className="px-4 py-2 bg-cyan-100 text-cyan-800 font-semibold rounded-full text-sm border border-cyan-300"
                >
                  {interest.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ModernTemplate.displayName = "ModernTemplate";

export default ModernTemplate;