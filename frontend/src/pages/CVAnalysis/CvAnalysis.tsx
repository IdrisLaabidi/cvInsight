import { useEffect, useState } from "react";
import CvListPanel from "./CvListPanel";
import CvAnalysisResult from "./CvAnalysisResult";

export default function CvAnalysis() {
    const [resumes, setResumes] = useState([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("jwt");

    // Fetch all CVs
    useEffect(() => {
        fetch("http://localhost:8080/resume", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setResumes(data))
            .catch((err) => console.error(err));
    }, []);

    const handleSelect = (id: string) => {
        setSelectedId(id);
        setLoading(true);

        fetch(`http://localhost:8080/resume/${id}/analysis`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((result) => {
                setAnalysis(result);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    return (
        <div style={{ display: "flex", height: "100%", gap: "16px" }}>
            {/* Left Panel */}
            <CvListPanel
                resumes={resumes}
                selectedId={selectedId}
                onSelect={handleSelect}
            />

            {/* Right Panel */}
            <CvAnalysisResult analysis={analysis} loading={loading} />
        </div>
    );
}
