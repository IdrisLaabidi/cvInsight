import DropzoneComponent from "../../components/form/form-elements/DropZone.tsx";
import {useState} from "react";
import axiosInstance from "../../utils/axiosInstance.ts";
import Button from "../../components/ui/button/Button.tsx";
import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";

export default function CvExtractionPage() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (files: File[]) => {
        setSelectedFiles(files);  // ⬅️ You now have ALL selected files here
        setResult(null);
        setError(null);
    };

    const handleUpload = () => {
        if (selectedFiles.length <= 0) return;

        setUploading(true);
        setResult(null);
        setError(null);

        const formData = new FormData();
        formData.append("file", selectedFiles[0]);

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

            {selectedFiles.length > 0 && (
                <div className="my-3">
                    <Button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="upload-btn"
                    >
                        {uploading ? "Uploading..." : "Upload and Process"}
                    </Button>
                </div>
            )}

            {uploading && (
                <div className="mt-6 flex justify-center">
                    <div className="flex flex-col items-center space-y-3 animate-pulse">
                        <div className="h-10 w-10 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
                        <p className="text-blue-600 font-medium">Processing your resume...</p>
                    </div>
                </div>
            )}

            {result && !uploading && (
                <div className="mt-8 p-6 rounded-xl bg-gray-900 text-gray-100 shadow-lg border border-gray-700 animate-fade-in">
                    <h2 className="text-xl font-semibold mb-4 text-blue-400">Analysis Result</h2>
                    <pre className="p-4 bg-gray-800 rounded-lg overflow-auto max-h-[500px] text-sm leading-relaxed">
                        {result}
                    </pre>
                </div>
            )}

            {error && !uploading && (
                <div className="mt-6 p-4 rounded-xl bg-red-100 text-red-800 border border-red-300 shadow animate-fade-in">
                    <p className="font-medium">⚠️ {error}</p>
                </div>
            )}

        </>
    )
}