import DropzoneComponent from "../../components/form/form-elements/DropZone.tsx";
import {useState} from "react";
import axiosInstance from "../../utils/axiosInstance.ts";

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
        console.log(files);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        setResult(null);
        setError(null);

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axiosInstance.post("/resume/upload-and-process", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setResult(JSON.stringify(response.data, null, 2));
        } catch (err: any) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Unexpected error occurred during upload.");
            }
        } finally {
            setUploading(false);
        }
    };
    return(
        <>
            <h1>Upload a resume (PDF or DOCX only)</h1>

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
                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="upload-btn"
                    >
                        {uploading ? "Uploading..." : "Upload and Process"}
                    </button>
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