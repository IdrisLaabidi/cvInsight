import { forwardRef, useDeferredValue, useMemo, useEffect, useState } from "react";
import { BlobProvider } from "@react-pdf/renderer";
import { useResume } from "./ResumeContext";
import ResumePdfDocument from "./ResumePdfDocument";

const ResumePreview = forwardRef<HTMLDivElement>((_, __) => {
    const {
        about,
        educationList,
        skills,
        softSkills,
        interests,
        workList,
        projects,
        languages,
        certificates,
        socialActivities,
    } = useResume();

    // Defer fast-typing updates to reduce PDFViewer re-mount flicker
    const dAbout = useDeferredValue(about);
    const dEducationList = useDeferredValue(educationList);
    const dSkills = useDeferredValue(skills);
    const dSoftSkills = useDeferredValue(softSkills);
    const dInterests = useDeferredValue(interests);
    const dWorkList = useDeferredValue(workList);
    const dProjects = useDeferredValue(projects);
    const dLanguages = useDeferredValue(languages);
    const dCertificates = useDeferredValue(certificates);
    const dSocialActivities = useDeferredValue(socialActivities);

    // Memoize the document element so the iframe doesn't thrash on each keystroke
    const memoizedDoc = useMemo(() => (
        <ResumePdfDocument
            about={dAbout}
            educationList={dEducationList}
            workList={dWorkList}
            skills={dSkills}
            softSkills={dSoftSkills}
            interests={dInterests}
            projects={dProjects}
            languages={dLanguages}
            certificates={dCertificates}
            socialActivities={dSocialActivities}
        />
    ), [
        dAbout,
        dEducationList,
        dWorkList,
        dSkills,
        dSoftSkills,
        dInterests,
        dProjects,
        dLanguages,
        dCertificates,
        dSocialActivities,
    ]);

    // Keep a stable URL displayed to avoid iframe re-mount flicker while a new PDF is generating
    const [displayedUrl, setDisplayedUrl] = useState<string | null>(null);
    const [toRevoke, setToRevoke] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (displayedUrl) URL.revokeObjectURL(displayedUrl);
            if (toRevoke) URL.revokeObjectURL(toRevoke);
        };
    }, [displayedUrl, toRevoke]);

    const StabilizedIframe: React.FC<{ url: string | null; loading: boolean }> = ({ url, loading }) => {
        useEffect(() => {
            if (!loading && url && url !== displayedUrl) {
                setToRevoke((prev) => {
                    if (prev && prev !== url) URL.revokeObjectURL(prev);
                    return displayedUrl; // schedule revocation of the currently displayed URL
                });
                setDisplayedUrl(url);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [loading, url]);

        const effectiveUrl = displayedUrl ?? url;
        const src = effectiveUrl ? `${effectiveUrl}#toolbar=0&navpanes=0&scrollbar=0` : undefined;

        return (
            <div className="w-full" style={{ height: 900 }}>
                {src ? (
                    <iframe
                        title="Resume Preview"
                        src={src}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        Generating preview...
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full h-full rounded-xl overflow-hidden">
            <BlobProvider document={memoizedDoc}>
                {({ url, loading }) => (
                    <StabilizedIframe url={url} loading={loading} />
                )}
            </BlobProvider>
        </div>
    );
});

export default ResumePreview;

