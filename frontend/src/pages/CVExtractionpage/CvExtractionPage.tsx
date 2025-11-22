import DropzoneComponent from "../../components/form/form-elements/DropZone.tsx";
import {useState} from "react";
import axiosInstance from "../../utils/axiosInstance.ts";
import Button from "../../components/ui/button/Button.tsx";
import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";

export default function CvExtractionPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (files: File[]) => {
        if (files.length > 0) {
            setSelectedFile(files[0]);
            setResult(null);
            setError(null);
        }
    };

    const handleUpload = () => {
        if (!selectedFile) return;

        setUploading(true);
        setResult(null);
        setError(null);

        const formData = new FormData();
        formData.append("file", selectedFile);

        axiosInstance.post("/resume/upload-and-process", formData, {
            timeout: 0,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(response => {
                setResult(JSON.stringify(response.data, null, 2));
            })
            .catch(error => {
                setError(error.response?.data?.error || "Unexpected error occurred during upload.");
            })
            .finally(() => setUploading(false))
    };

    return(
        <>
            <PageMeta
                title="CV Extraction and Reformulation | CVinsight"
                description="PLACEHOLDER DESCRIPTION FOR SEO"
            />
            <PageBreadcrumb pageTitle="Resume Extraction" />

            <DropzoneComponent
                acceptedFileTypes={{
                    "application/pdf": [],
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
                }}
                onFilesChange={handleFileChange}
            />

            {selectedFile && (
                <div className="upload-actions">
                    <p>Selected file: {selectedFile.name}</p>
                    <Button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="upload-btn"
                    >
                        {uploading ? "Uploading..." : "Upload and Process"}
                    </Button>
                </div>
            )}

            {result && (
                <div className="upload-result">
                    <h2>Analysis Result:</h2>
                    <pre>{result}</pre>
                </div>
            )}

            {error && (
                <div className="upload-error">
                    <p style={{ color: "red" }}>{error}</p>
                </div>
            )}
        </>
    )
}