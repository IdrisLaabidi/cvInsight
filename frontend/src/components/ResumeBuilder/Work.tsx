import React from "react";
import { useResume } from "./ResumeContext";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const Work: React.FC = () => {
  const { workList, setWorkList } = useResume();

  const addMore = () => {
    setWorkList([
      ...workList,
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, id: string) => {
    const { name, value } = e.target;
    const updated = workList.map((work) =>
      work.id === id ? { ...work, [name]: value } : work
    );
    setWorkList(updated);
  };

  const deleteWork = (id: string) => {
    setWorkList(workList.filter((work) => work.id !== id));
  };

  return (
    <div className="space-y-4">
      {workList.map((work) => (
        <div key={work.id} className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors">
          <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b-2 border-gray-200">
            <h3 className="font-semibold text-blue-600">{work.position || "Position"}</h3>
            <button
              onClick={() => deleteWork(work.id)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <MdDelete size={20} className="text-red-500 hover:text-red-700" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Position</label>
              <input
                type="text"
                id={`position-${work.id}`}
                name="position"
                value={work.position}
                onChange={(e) => handleChange(e, work.id)}
                placeholder="Position"
                className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Company</label>
                <input
                  type="text"
                  id={`company-${work.id}`}
                  name="company"
                  value={work.company}
                  onChange={(e) => handleChange(e, work.id)}
                  placeholder="Company"
                  className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Employment Type</label>
                <select
                  id={`type-${work.id}`}
                  name="type"
                  value={work.type}
                  onChange={(e) => handleChange(e, work.id)}
                  className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                >
                  <option value="">Select Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Start Date</label>
                <input
                  type="month"
                  id={`startDate-${work.id}`}
                  name="startDate"
                  value={work.startDate}
                  onChange={(e) => handleChange(e, work.id)}
                  className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">End Date</label>
                <input
                  type="month"
                  id={`endDate-${work.id}`}
                  name="endDate"
                  value={work.endDate}
                  onChange={(e) => handleChange(e, work.id)}
                  className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <textarea
                id={`description-${work.id}`}
                name="description"
                value={work.description}
                onChange={(e) => handleChange(e, work.id)}
                placeholder="Describe your responsibilities..."
                rows={4}
                className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none text-sm"
              />
            </div>
          </div>
        </div>
      ))}

      {workList.length < 5 && (
        <button
          onClick={addMore}
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          + Add Experience
        </button>
      )}
    </div>
  );
};

export default Work;