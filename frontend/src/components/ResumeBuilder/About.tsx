import React from "react";
import { useResume } from "./ResumeContext";

const About: React.FC = () => {
  const { about, setAbout } = useResume();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={about.name || ""}
            onChange={handleChange}
            placeholder="Full Name"
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={about.role || ""}
            onChange={handleChange}
            placeholder="Role"
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={about.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={about.phone || ""}
            onChange={handleChange}
            placeholder="Phone"
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={about.address || ""}
            onChange={handleChange}
            placeholder="Address"
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">LinkedIn</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={about.linkedin || ""}
            onChange={handleChange}
            placeholder="https://linkedin.com"
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">GitHub</label>
          <input
            type="url"
            id="github"
            name="github"
            value={about.github || ""}
            onChange={handleChange}
            placeholder="https://github.com"
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Portfolio</label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            value={about.portfolio || ""}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Professional Summary</label>
        <textarea
          id="summary"
          name="summary"
          value={about.summary || ""}
          onChange={handleChange}
          placeholder="Write a brief professional summary"
          rows={5}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
        />
      </div>
    </div>
  );
};

export default About;