import React, { useState } from "react";
import { ResumeProvider } from "./ResumeContext";
import About from "./About";
import Education from "./Education";
import Work from "./Work";
import Skills from "./Skills";
import Projects from "./Projects";
import ResumePreview from "./ResumePreview";

const tabs = [
  { id: "about", label: "About", icon: "👤" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "work", label: "Work", icon: "💼" },
  { id: "skills", label: "Skills", icon: "🔧" },
  { id: "projects", label: "Projects", icon: "📁" },
];

const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState("about");

  const renderTab = () => {
    switch (activeTab) {
      case "about":
        return <About />;
      case "education":
        return <Education />;
      case "work":
        return <Work />;
      case "skills":
        return <Skills />;
      case "projects":
        return <Projects />;
      default:
        return <About />;
    }
  };

  return (
    <ResumeProvider>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-2rem)] max-w-7xl mx-auto">
          {/* Left Sidebar - Form Builder */}
          <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4">
              <h1 className="text-2xl font-bold">Resume Builder</h1>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-5 gap-0 bg-gray-100 border-b-2 border-gray-200 px-2 py-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex flex-col items-center justify-center py-3 px-2 font-semibold text-xs transition-all rounded-t-lg ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600 border-b-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  title={tab.label}
                >
                  <span className="text-xl mb-1">{tab.icon}</span>
                  <span className="hidden lg:block">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {renderTab()}
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Preview Header */}
            <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 border-b-2 border-gray-200">
              <h2 className="text-xl font-bold">Preview</h2>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg font-semibold transition-all"
              >
                🖨️ Print
              </button>
            </div>

            {/* Preview Content */}
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
};

export default ResumeBuilder;