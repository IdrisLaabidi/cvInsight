/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function CvListPanel({ resumes, selectedId, onSelect }) {
    return (
        <div style={{
            width: "30%",
            borderRight: "1px solid #ddd",
            padding: "16px",
            overflowY: "auto"
        }}>
            <h2>Your Uploaded CVs</h2>

            {resumes.length === 0 && <p>No CVs uploaded yet.</p>}

            {resumes.map((cv: any) => (
                <div
                    key={cv.id}
                    style={{
                        padding: "12px",
                        margin: "8px 0",
                        borderRadius: "8px",
                        cursor: "pointer",
                        background: cv.id === selectedId ? "#e0f0ff" : "#f5f5f5"
                    }}
                    onClick={() => onSelect(cv.id)}
                >
                    <strong>{cv.filename}</strong>
                    <div style={{ fontSize: "12px", opacity: 0.7 }}>
                        {new Date(cv.uploadedAt).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
}
