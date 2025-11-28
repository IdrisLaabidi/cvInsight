import { forwardRef } from "react";
import { useResume } from "./ResumeContext";
import { THEME_COLORS } from "../../constants/resumeThemes";

const ResumePreview = forwardRef<HTMLDivElement>((_, ref) => {
    const {
        about,
        educationList,
        skills,
        softSkills,
        interests,
        workList,
        projects,
        languages,
        certificates,
        socialActivities,
        printElem,
        templateTheme,
    } = useResume();

    const theme = THEME_COLORS[templateTheme];

    return (
        <div ref={printElem} className="w-full h-full bg-white rounded-xl p-8">
            {/* Header */}
            <div className={`flex justify-between items-start mb-6 pb-6 border-b-2 ${theme.border}`}>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {about.name || "Your Name"}
                    </h1>
                    <p className={`text-lg ${theme.text}`}>
                        {about.role || "Your Role"}
                    </p>
                </div>
                {about.picture && (
                    <img
                        src={about.picture}
                        alt="Profile"
                        className={`w-24 h-24 rounded-full object-cover border-4 ${theme.border}`}
                    />
                )}
            </div>

            {/* Contact Info */}
            <div className={`${theme.secondary} rounded-xl p-4 mb-6 border-l-4 ${theme.border}`}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                        <svg className={`w-5 h-5 ${theme.text} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700 truncate">{about.email || "email@example.com"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <svg className={`w-5 h-5 ${theme.text} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-700">{about.phone || "+1234567890"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <svg className={`w-5 h-5 ${theme.text} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-700">{about.address || "City, Country"}</span>
                    </div>
                </div>

                {(about.linkedin || about.github || about.portfolio) && (
                    <div className={`flex flex-wrap gap-3 pt-3 border-t ${theme.secondary}`}>
                        {about.linkedin && (
                            <a
                                href={about.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-1.5 ${theme.text} hover:opacity-80 font-medium text-sm transition-colors`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                                LinkedIn
                            </a>
                        )}
                        {about.github && (
                            <a
                                href={about.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-1.5 ${theme.text} hover:opacity-80 font-medium text-sm transition-colors`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                GitHub
                            </a>
                        )}
                        {about.portfolio && (
                            <a
                                href={about.portfolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-1.5 ${theme.text} hover:opacity-80 font-medium text-sm transition-colors`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                Portfolio
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Professional Summary */}
            {about.summary && (
                <div className="mb-6">
                    <h2 className={`text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 ${theme.border} pb-2 mb-3`}>
                        Professional Summary
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">{about.summary}</p>
                </div>
            )}

            {/* Education */}
            {educationList.some((e) => e.degree || e.school) && (
                <div className="mb-6">
                    <h2 className={`text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 ${theme.border} pb-2 mb-3`}>
                        Education
                    </h2>
                    <div className="space-y-4">
                        {educationList.map((edu) =>
                            edu.degree || edu.school ? (
                                <div key={edu.id} className="pl-4 border-l-2 border-gray-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                                        {edu.startYr && (
                                            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                                {edu.startYr} - {edu.endYr}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-sm ${theme.text} font-medium`}>{edu.school}</p>
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
                    <h2 className={`text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 ${theme.border} pb-2 mb-3`}>
                        Work Experience
                    </h2>
                    <div className="space-y-4">
                        {workList.map((work) =>
                            work.position || work.company ? (
                                <div key={work.id} className="pl-4 border-l-2 border-gray-200">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-semibold text-gray-800">{work.position}</h3>
                                        {work.startDate && (
                                            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                                {work.startDate} - {work.endDate || "Present"}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-sm ${theme.text} font-medium`}>
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
                    <h2 className={`text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 ${theme.border} pb-2 mb-3`}>
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {projects.map((project) =>
                            project.name || project.description ? (
                                <div key={project.id} className="pl-4 border-l-2 border-gray-200">
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
                                                    className={`inline-flex items-center gap-1 text-xs ${theme.text} hover:opacity-80 font-semibold transition-colors`}
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Live Link
                                                </a>
                                            )}
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`inline-flex items-center gap-1 text-xs ${theme.text} hover:opacity-80 font-semibold transition-colors`}
                                                >
                                                    <svg className="w-3 h-3" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                    </svg>
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

            {/* Languages */}
            {languages.length > 0 && (
                <div className="mb-6">
                    <h2 className={`text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 ${theme.border} pb-2 mb-3`}>
                        Languages
                    </h2>
                    <div className="space-y-4">
                        {languages.map((language, index) => (
                            <div key={index} className="pl-4 border-l-2 border-gray-200">
                                <p className={`text-sm ${theme.text} font-medium`}>{language.name}</p>
                                <p className="text-xs text-gray-600 mt-1">Level: {language.level}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications */}
            {certificates.length > 0 && (
                <div className="mb-6">
                    <h2 className={`text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 ${theme.border} pb-2 mb-3`}>
                        Certifications
                    </h2>
                    <div className="space-y-4">
                        {certificates.map((certificate, index) => (
                            <div key={index} className="pl-4 border-l-2 border-gray-200">
                                <p className={`text-sm ${theme.text} font-medium`}>{certificate.title}</p>
                                <p className="text-xs text-gray-600 mt-1">Issuer: {certificate.issuer}</p>
                                <p className="text-xs text-gray-600 mt-1">Year: {certificate.year}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Social Activities */}
            {socialActivities.length > 0 && (
                <div className="mb-6">
                    <h2 className={`text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 ${theme.border} pb-2 mb-3`}>
                        Social Activities
                    </h2>
                    <div className="space-y-4">
                        {socialActivities.map((activity, index) => (
                            <div key={index} className="pl-4 border-l-2 border-gray-200">
                                <h3 className="font-semibold text-gray-800">{activity.role}</h3>
                                <p className="text-xs text-gray-600 mt-1">Organization: {activity.organization}</p>
                                <p className="text-sm text-gray-700 mt-1">{activity.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Technical Skills */}
            {skills.length > 0 && (
                <div className="mb-6">
                    <h2 className={`text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 ${theme.border} pb-2 mb-3`}>
                        Technical Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                            <span
                                key={skill.id}
                                className={`px-3 py-1 ${theme.badge} text-xs font-medium rounded-full`}
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
                    <h2 className={`text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 ${theme.border} pb-2 mb-3`}>
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
                    <h2 className={`text-sm font-bold text-gray-800 uppercase tracking-wide border-b-2 ${theme.border} pb-2 mb-3`}>
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

