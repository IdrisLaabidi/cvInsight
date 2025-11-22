import React, {useState} from "react";
import { useDropzone } from "react-dropzone";
import ComponentCard from "../../common/ComponentCard.tsx";

interface DropzoneComponentProps {
    acceptedFileTypes: Record<string, string[]>;
    onFilesChange?: (files: File[]) => void; // new prop
}

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({ acceptedFileTypes, onFilesChange }) => {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
        const updatedFiles = [...files, ...acceptedFiles];
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
    };

    const removeFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
    });

    return (
        <ComponentCard title="Upload your resume">
            <div className="transition border border-gray-300 border-dashed cursor-pointer rounded-xl hover:border-brand-500 dark:hover:border-brand-500 dark:border-gray-700">

                {/* Dropzone */}
                <form
                    {...getRootProps()}
                    className={`
                        dropzone rounded-xl p-7 lg:p-10 border-dashed
                        ${isDragActive
                        ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                        : "border-gray-300 bg-gray-50 dark:bg-gray-900 dark:border-gray-700"}
                    `}
                >
                    <input {...getInputProps()} />

                    <div className="flex flex-col items-center !m-0">

                        {/* Icon */}
                        <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400 mb-6">
                            📄
                        </div>

                        <h4 className="mb-2 font-semibold text-gray-800 dark:text-white/90 text-lg">
                            {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
                        </h4>

                        <span className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Accepted: {Object.keys(acceptedFileTypes).join(", ")}
                        </span>

                        <span className="font-medium underline text-brand-500 cursor-pointer">
                            Browse File
                        </span>
                    </div>
                </form>

                {files.length > 0 && (
                    <div className="mt-4 p-4 space-y-3 animate-fade-in">
                        <h4 className="text-gray-800 dark:text-white font-medium mb-2">
                            Selected Files ({files.length}):
                        </h4>

                        {files.map((file, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between bg-white dark:bg-gray-800
                                rounded-lg p-4 shadow border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                                        📄
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {file.name}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {(file.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeFile(i)}
                                    className="text-red-500 hover:text-red-700 transition text-sm font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ComponentCard>
    );
};

export default DropzoneComponent;
