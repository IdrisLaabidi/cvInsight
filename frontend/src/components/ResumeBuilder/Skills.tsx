import React, { useState } from "react";
import { useResume } from "./ResumeContext";
import { MdClose } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const Skills: React.FC = () => {
  const { skills, setSkills, softSkills, setSoftSkills, interests, setInterests } = useResume();
  const [skill, setSkill] = useState("");
  const [softSkill, setSoftSkill] = useState("");
  const [interest, setInterest] = useState("");

  const handleSubmit = (e: React.FormEvent, type: 'skill' | 'softSkill' | 'interest') => {
    e.preventDefault();
    if (type === 'skill') {
      if (!skill.trim()) return;
      setSkills([...skills, { id: uuidv4(), name: skill }]);
      setSkill("");
    } else if (type === 'softSkill') {
      if (!softSkill.trim()) return;
      setSoftSkills([...softSkills, { id: uuidv4(), name: softSkill }]);
      setSoftSkill("");
    } else if (type === 'interest') {
      if (!interest.trim()) return;
      setInterests([...interests, { id: uuidv4(), name: interest }]);
      setInterest("");
    }
  };

  const deleteItem = (id: string, type: 'skill' | 'softSkill' | 'interest') => {
    if (type === 'skill') {
      setSkills(skills.filter((s) => s.id !== id));
    } else if (type === 'softSkill') {
      setSoftSkills(softSkills.filter((s) => s.id !== id));
    } else if (type === 'interest') {
      setInterests(interests.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Technical Skills</h3>
        <form onSubmit={(e) => handleSubmit(e, 'skill')} className="flex gap-2">
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="Add a skill (e.g., React, Python)"
            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </form>
        <div className="flex flex-wrap gap-2 min-h-10 p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
          {skills.length > 0 ? (
            skills.map((s) => (
              <div
                key={s.id}
                className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-full"
              >
                <span>{s.name}</span>
                <button
                  onClick={() => deleteItem(s.id, 'skill')}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                >
                  <MdClose size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm italic">No skills added</p>
          )}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Soft Skills</h3>
        <form onSubmit={(e) => handleSubmit(e, 'softSkill')} className="flex gap-2">
          <input
            type="text"
            value={softSkill}
            onChange={(e) => setSoftSkill(e.target.value)}
            placeholder="Add a soft skill (e.g., Communication)"
            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </form>
        <div className="flex flex-wrap gap-2 min-h-10 p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
          {softSkills.length > 0 ? (
            softSkills.map((s) => (
              <div
                key={s.id}
                className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-full"
              >
                <span>{s.name}</span>
                <button
                  onClick={() => deleteItem(s.id, 'softSkill')}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                >
                  <MdClose size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm italic">No soft skills added</p>
          )}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Interests</h3>
        <form onSubmit={(e) => handleSubmit(e, 'interest')} className="flex gap-2">
          <input
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder="Add an interest (e.g., Web Development)"
            className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </form>
        <div className="flex flex-wrap gap-2 min-h-10 p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
          {interests.length > 0 ? (
            interests.map((s) => (
              <div
                key={s.id}
                className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-full"
              >
                <span>{s.name}</span>
                <button
                  onClick={() => deleteItem(s.id, 'interest')}
                  className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                >
                  <MdClose size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm italic">No interests added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;