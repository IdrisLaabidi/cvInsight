import { useEffect, useState } from "react";
import CvAnalysisResult from "./CvAnalysisResult";
import Select from "../../components/form/Select.tsx";
import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import axiosInstance from "../../utils/axiosInstance.ts";

export default function CvAnalysis() {
    const [resumes, setResumes] = useState([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [analysis, setAnalysis] = useState(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem("jwt");

    // Load resumes list
    useEffect(() => {
        setLoading(false);
        setError(null);
        axiosInstance
            .get("/resume", {
                timeout: 0,
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => setResumes(response.data))
            .catch(error => {
                setError(error.response?.data?.error || "Unexpected error loading resumes.");
            });
    }, []);

    const handleSelect = (id: string) => {
        setSelectedId(id);
        setLoading(true);
        setAnalysis(null);
        setPdfUrl(null);
        setError(null);

        // fetch analysis
        axiosInstance
            .get(`/resume/${id}/analysis`, {
                timeout: 0,
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => setAnalysis(response.data))
            .catch(error => {
                setError(error.response?.data?.error || "Unexpected error during analysis.");
            })
            .finally(() => setLoading(false));

        // fetch pdf file
        axiosInstance
            .get(`/resume/${id}/file`, {
                responseType: "blob",
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                const blob = new Blob([response.data], { type: response.headers["content-type"] });
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            })
            .catch(() => {
                setError("Could not load PDF file.");
            })
    };

    return (
        <>
            <PageMeta title="CV Analyser | CVInsight" description="Resume analysis tool" />
            <PageBreadcrumb pageTitle="Resume Analyser" />

            {/* DROPDOWN FULL WIDTH */}
            <div style={{ marginBottom: "20px" }}>
                <Select
                    /* eslint-disable */
                    options={resumes.map((cv : any) => ({ value: cv.id, label: cv.filename }))}
                    placeholder="Select a CV..."
                    defaultValue={selectedId || ""}
                    onChange={handleSelect}
                />
            </div>

            <div style={{ display: "flex", height: "80vh", gap: "16px" }}>

                {/* LEFT: ANALYSIS RESULT */}
                <div style={{ width: "50%", overflowY: "auto" }}>
                    <CvAnalysisResult analysis={analysis} loading={loading} error={error} />
                </div>

                {/* RIGHT: PDF VIEWER */}
                <div style={{ width: "50%", borderLeft: "1px solid #ddd", paddingLeft: "10px" }}>
                    {pdfUrl ? (
                        <iframe
                            src={pdfUrl}
                            style={{ width: "100%", height: "100%", border: "none" }}
                        />
                    ) : (
                        <p style={{ opacity: 0.6 }}>Select a CV to preview it.</p>
                    )}
                </div>
            </div>
        </>
    );
}