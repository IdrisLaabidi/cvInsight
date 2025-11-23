import React from "react";
import { useResume } from "./ResumeContext";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const Education: React.FC = () => {
  const { educationList, setEducationList } = useResume();

  const addMore = () => {
    setEducationList([
      ...educationList,
      {
        id: uuidv4(),
        degree: "",
        school: "",
        startYr: 0,
        endYr: 0,
        grade: "",
      },
    ]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { name, value } = e.target;
    const updated = educationList.map((edu) =>
      edu.id === id ? { ...edu, [name]: value } : edu
    );
    setEducationList(updated);
  };

  const deleteEducation = (id: string) => {
    setEducationList(educationList.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      {educationList.map((education) => (
        <div key={education.id} className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors">
          <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b-2 border-gray-200">
            <h3 className="font-semibold text-blue-600">{education.degree || "Degree"}</h3>
            <button
              onClick={() => deleteEducation(education.id)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <MdDelete size={20} className="text-red-500 hover:text-red-700" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Degree</label>
                <input
                  type="text"
                  id={`degree-${education.id}`}
                  name="degree"
                  value={education.degree}
                  onChange={(e) => handleChange(e, education.id)}
                  placeholder="Degree"
                  className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">School</label>
                <input
                  type="text"
                  id={`school-${education.id}`}
                  name="school"
                  value={education.school}
                  onChange={(e) => handleChange(e, education.id)}
                  placeholder="School"
                  className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Start Year</label>
                <input
                  type="number"
                  id={`startYr-${education.id}`}
                  name="startYr"
                  value={education.startYr}
                  onChange={(e) => handleChange(e, education.id)}
                  placeholder="2020"
                  min="1900"
                  max="2030"
                  className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">End Year</label>
                <input
                  type="number"
                  id={`endYr-${education.id}`}
                  name="endYr"
                  value={education.endYr}
                  onChange={(e) => handleChange(e, education.id)}
                  placeholder="2023"
                  min="1900"
                  max="2030"
                  className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Grade</label>
                <input
                  type="text"
                  id={`grade-${education.id}`}
                  name="grade"
                  value={education.grade}
                  onChange={(e) => handleChange(e, education.id)}
                  placeholder="8.5 CGPA"
                  className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {educationList.length < 3 && (
        <button
          onClick={addMore}
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          + Add Education
        </button>
      )}
    </div>
  );
};

export default Education;