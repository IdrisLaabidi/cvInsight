import { useState, useEffect } from "react";

const sentences = [
    "Welcome to our platform!",
    "Discover amazing features.",
    "Join our community today.",
];

export default function TypewriterText() {
    const [text, setText] = useState("");
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const current = sentences[sentenceIndex];
        if (charIndex < current.length) {
            const timeout = setTimeout(() => {
                setText((prev) => prev + current.charAt(charIndex));
                setCharIndex(charIndex + 1);
            }, 50);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setText("");
                setCharIndex(0);
                setSentenceIndex((sentenceIndex + 1) % sentences.length);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, sentenceIndex]);

    return (
        <h2 className="text-2xl font-semibold">
            {text}
            <span className="border-r-2 border-black animate-blink ml-1"></span>
        </h2>
    );
}
