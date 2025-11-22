// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function CvAnalysisResult({ analysis, loading }) {
    return (
        <div style={{ width: "70%", padding: "24px" }}>
            {!analysis && !loading && (
                <p>Select a CV from the left to start analysis.</p>
            )}

            {loading && <p>Analyzing CV... please wait.</p>}

            {analysis && (
                <>
                    <h2>Resume Analysis</h2>
                    <h3>Score: {analysis.score}/100</h3>

                    <Section title="Overall Feedback" items={[analysis.overallFeedback]} />
                    <Section title="Weaknesses" items={analysis.weaknesses} />
                    <Section title="Improvements" items={analysis.improvements} />
                    <Section title="Missing Sections" items={analysis.missingSections} />
                    <Section title="Mistakes" items={analysis.mistakes} />
                </>
            )}
        </div>
    );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function Section({ title, items }) {
    if (!items || items.length === 0) return null;

    return (
        <div style={{ marginTop: "16px" }}>
            <h4>{title}</h4>
            <ul>
                {items.map((item: any, i: any) => (
                    <li key={i} style={{ marginBottom: "6px" }}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
