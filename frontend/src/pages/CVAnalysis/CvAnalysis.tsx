import { useEffect, useState } from "react";
import CvListPanel from "./CvListPanel";
import CvAnalysisResult from "./CvAnalysisResult";

import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import axiosInstance from "../../utils/axiosInstance.ts";

export default function CvAnalysis() {
    const [resumes, setResumes] = useState([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem("jwt");


    useEffect(() => {
        setLoading(true);
        setError(null);

        axiosInstance
            .get("/resume", {
                timeout: 0,
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                setResumes(response.data);
            })
            .catch(error => {
                console.error(error);
                setError(error.response?.data?.error || "Unexpected error occurred while fetching resumes.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const handleSelect = (id: string) => {
        setSelectedId(id);
        setLoading(true);
        setAnalysis(null);
        setError(null);

        axiosInstance
            .get(`/resume/${id}/analysis`, {
                timeout: 0,
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                setAnalysis(response.data);
            })
            .catch(error => {
                console.error(error);
                setError(error.response?.data?.error || "Unexpected error occurred during analysis.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <PageMeta
                title="CV Analyser | CVinsight"
                description="PLACEHOLDER DESCRIPTION FOR SEO"
            />
            <PageBreadcrumb pageTitle="Resume Analyser" />
            <div style={{ display: "flex", height: "100%", gap: "16px" }}>
                {/* Left Panel */}
                <CvListPanel
                    resumes={resumes}
                    selectedId={selectedId}
                    onSelect={handleSelect}
                />

                {/* Right Panel */}
                <CvAnalysisResult analysis={analysis} loading={loading} error={error} />
            </div>
        </>
    );
}