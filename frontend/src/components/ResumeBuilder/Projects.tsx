import React from "react";
import { useResume } from "./ResumeContext";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const Projects: React.FC = () => {
  const { projects, setProjects } = useResume();

  const addMore = () => {
    setProjects([
      ...projects,
      {
        id: uuidv4(),
        name: "",
        url: "",
        github: "",
        description: "",
      },
    ]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    const { name, value } = e.target;
    const updated = projects.map((project) =>
      project.id === id ? { ...project, [name]: value } : project
    );
    setProjects(updated);
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors">
          <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b-2 border-gray-200">
            <h3 className="font-semibold text-blue-600">{project.name || "Project Name"}</h3>
            <button
              onClick={() => deleteProject(project.id)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <MdDelete size={20} className="text-red-500 hover:text-red-700" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Project Name</label>
              <input
                type="text"
                id={`name-${project.id}`}
                name="name"
                value={project.name}
                onChange={(e) => handleChange(e, project.id)}
                placeholder="Project Name"
                className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Project URL</label>
                <input
                  type="url"
                  id={`url-${project.id}`}
                  name="url"
                  value={project.url}
                  onChange={(e) => handleChange(e, project.id)}
                  placeholder="https://example.com"
                  className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">GitHub Repository</label>
                <input
                  type="url"
                  id={`github-${project.id}`}
                  name="github"
                  value={project.github}
                  onChange={(e) => handleChange(e, project.id)}
                  placeholder="https://github.com/username/repo"
                  className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <textarea
                id={`description-${project.id}`}
                name="description"
                value={project.description}
                onChange={(e) => handleChange(e, project.id)}
                placeholder="Describe your project..."
                rows={4}
                className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none text-sm"
              />
            </div>
          </div>
        </div>
      ))}

      {projects.length < 5 && (
        <button
          onClick={addMore}
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          + Add Project
        </button>
      )}
    </div>
  );
};

export default Projects;