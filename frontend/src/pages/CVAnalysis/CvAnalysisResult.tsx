import { useEffect, useState } from "react";

const styles = {
    container: {
        width: "70%",
        padding: "32px",
        color: "#333",
    },

    placeholder: { fontSize: "16px", opacity: 0.7 },
    loadingText: { fontSize: "18px", fontWeight: 500 },
    errorText: { color: "red", marginTop: "12px" },

    // Score
    scoreContainer: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginBottom: "28px",
    },

    scoreCircle: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        border: "6px solid #4a90e2",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        animation: "fadeIn 0.5s ease-out",
    },

    innerCircleStyle: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    scoreValue: {
        fontSize: "42px",
        fontWeight: 700,
        color: "#4a90e2",
        lineHeight: "36px",
    },

    scoreMax: {
        fontSize: "14px",
        color: "#555",
        marginTop: "4px",
    },

    scoreTitle: {
        fontSize: "24px",
        fontWeight: 600,
    },

    // Sections
    section: {
        marginTop: "24px",
        paddingBottom: "8px",
        borderBottom: "1px solid #eee",
    },

    sectionTitle: {
        marginBottom: "6px",
        fontSize: "20px",
        fontWeight: 600,
    },

    animatedText: {
        whiteSpace: "pre-wrap",
        lineHeight: 1.6,
        fontSize: "16px",
    },

    // List
    list: {
        listStyle: "none",
        padding: 0,
        marginTop: "8px",
    },

    listItem: {
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        marginBottom: "10px",
        lineHeight: 1.5,
    },

    bullet: {
        width: "10px",
        height: "10px",
        marginTop: "6px",
        borderRadius: "50%",
        backgroundColor: "#4a90e2",
        flexShrink: 0,
    },
};
// eslint-disable @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function CvAnalysisResult({ analysis, loading, error }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (analysis) setStep(0); // Reset on new analysis
    }, [analysis]);

    return (
        <div style={styles.container}>
            {!analysis && !loading && (
                <p style={styles.placeholder}>Select a CV from the left to start the analysis.</p>
            )}

            {loading && <p style={styles.loadingText}>Analyzing CV... please wait.</p>}

            {analysis && (
                <>
                    <ScoreCard score={analysis.score} />

                    {step >= 0 && (
                        <AnimatedSection
                            title="Overall Feedback"
                            text={analysis.overallFeedback}
                            onDone={() => setStep(1)}
                        />
                    )}

                    {step >= 1 && (
                        <ListSection
                            title="Weaknesses"
                            items={analysis.weaknesses}
                            onDone={() => setStep(2)}
                        />
                    )}

                    {step >= 2 && (
                        <ListSection
                            title="Improvements"
                            items={analysis.improvements}
                            onDone={() => setStep(3)}
                        />
                    )}

                    {step >= 3 && (
                        <ListSection
                            title="Missing Sections"
                            items={analysis.missingSections}
                            onDone={() => setStep(4)}
                        />
                    )}

                    {step >= 4 && (
                        <ListSection
                            title="Mistakes"
                            items={analysis.mistakes}
                            onDone={() => setStep(5)}
                        />
                    )}
                </>
            )}

            {error && (
                <p style={styles.errorText}>An error occurred while analyzing the CV: {error}</p>
            )}
        </div>
    );
}

function ScoreCard({ score }: { score: number }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems:"center",
            marginBottom: "32px",
            gap: "3rem",
        }}>

            {/* Animated Circle */}
            <div style={getAnimatedScoreCircle(score)}>
                <div style={styles.innerCircleStyle as React.CSSProperties}>
                    <span style={{
                        fontSize: "32px",
                        fontWeight: 700,
                        color: getScoreColor(score)
                    }}>
                        {score}
                    </span>
                    <span style={{ fontSize: "16px", color: "#555" }}>/100</span>
                </div>
            </div>

            <h2 style={{
                marginTop: "16px",
                fontSize: "20px",
                fontWeight: 600,
                color: getScoreColor(score),
            }}>
                Resume Score
            </h2>

        </div>
    );
}
function getAnimatedScoreCircle(score: number): React.CSSProperties {
    const percentage = Math.min(Math.max(score, 0), 100);
    const angle = (percentage / 100) * 360;

    const color = getScoreColor(score);

    return {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: `conic-gradient(${color} ${angle}deg, #e5e7eb ${angle}deg)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background 1s ease-out",
        boxShadow: score > 90 ? `0 0 20px ${color}` : "none",
        position: "relative",
    };
}
function getScoreColor(score: number): string {
    if (score < 40) return "#e74c3c";      // red
    if (score < 70) return "#f1c40f";      // yellow
    return "#27ae60";                      // green
}

function useTypewriter(text: string, speed = 45, onDone?: () => void) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let frame: number;
        const start = performance.now();

        setDisplayed("");

        const animate = (time: number) => {
            const elapsed = time - start;
            const charsToShow = Math.floor(elapsed / speed);

            if (charsToShow <= text.length) {
                setDisplayed(text.slice(0, charsToShow));
            }

            if (charsToShow < text.length) {
                frame = requestAnimationFrame(animate);
            } else {
                if (onDone) onDone();
            }
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [text]);

    return displayed;
}

function AnimatedSection({ title, text, onDone }: { title: string; text: string; onDone: () => void }) {
    const displayed = useTypewriter(text, 30, onDone);

    return (
        <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{title}</h3>
            <p style={styles.animatedText}>{displayed}</p>
        </div>
    );
}

function AnimatedListItem({ text, onDone }: { text: string; onDone: () => void }) {
    const displayed = useTypewriter(text, 30, onDone);
    return <span>{displayed}</span>;
}

function ListSection({ title, items, onDone }: { title: string; items: string[]; onDone?: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex === items.length && onDone) {
            onDone();
        }
    }, [currentIndex, items.length, onDone]);

    if (!items || items.length === 0) return null;

    return (
        <div style={styles.section}>
            <h3 style={styles.sectionTitle}>{title}</h3>

            <ul style={styles.list}>
                {items.slice(0, currentIndex + 1).map((item, i) => (
                    <li key={i} style={styles.listItem}>
                        <span style={styles.bullet}></span>
                        <AnimatedListItem
                            text={item}
                            onDone={() => setCurrentIndex(prev => prev + 1)}   // ➜ next item
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
