/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Document, Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";

// Simple styles for the PDF - two-column layout
const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        fontFamily: "Helvetica",
        fontSize: 11,
        padding: 18,
    },
    leftCol: {
        width: "35%",
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: "#e0e0e0"
    },
    rightCol: {
        width: "65%",
        paddingLeft: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 6
    },
    title: {
        fontSize: 12,
        color: "#444",
        marginBottom: 8
    },
    sectionHeader: {
        fontSize: 11,
        fontWeight: 700,
        marginTop: 8,
        marginBottom: 4
    },
    smallText: {
        fontSize: 9,
        color: "#444",
        marginBottom: 4
    },
    skillText: {
        fontSize: 10,
        marginBottom: 2
    },
    expTitle: {
        fontSize: 11,
        fontWeight: 700
    },
    expSubtitle: {
        fontSize: 10,
        color: "#666"
    },
    paragraph: {
        fontSize: 10,
        marginBottom: 4
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8
    }
});

type Props = {
    values: any;
    photoDataUrl?: string | null;
};

const ResumePDF: React.FC<Props> = ({ values, photoDataUrl }) => {
    const { personal = {}, skills = [], languages = [], experiences = [], education = [], projects = [] } = values;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.leftCol}>
                    {photoDataUrl && <Image src={photoDataUrl} style={styles.image} />}
                    <Text style={styles.name}>
                        {personal.firstName || ""} {personal.lastName || ""}
                    </Text>
                    <Text style={styles.title}>{personal.title || ""}</Text>

                    <Text style={styles.sectionHeader}>Contact</Text>
                    {personal.email && <Text style={styles.smallText}>{personal.email}</Text>}
                    {personal.phone && <Text style={styles.smallText}>{personal.phone}</Text>}
                    {personal.location && <Text style={styles.smallText}>{personal.location}</Text>}
                    {personal.website && <Text style={styles.smallText}>{personal.website}</Text>}

                    <Text style={styles.sectionHeader}>Skills</Text>
                    {skills.map((s: string, idx: number) => (
                        <Text key={idx} style={styles.skillText}>• {s}</Text>
                    ))}

                    <Text style={styles.sectionHeader}>Languages</Text>
                    {languages.map((l: any, i: number) => (
                        <Text key={i} style={styles.skillText}>{l.lang} — {l.level}</Text>
                    ))}
                </View>

                <View style={styles.rightCol}>
                    {values.summary && (
                        <>
                            <Text style={styles.sectionHeader}>Summary</Text>
                            <Text style={styles.paragraph}>{values.summary}</Text>
                        </>
                    )}

                    <Text style={styles.sectionHeader}>Experience</Text>
                    {experiences.map((exp: any, i: number) => (
                        <View key={i} style={{ marginBottom: 6 }}>
                            <Text style={styles.expTitle}>{exp.title || ""} — {exp.company || ""}</Text>
                            <Text style={styles.expSubtitle}>{exp.start || ""} — {exp.end || ""}</Text>
                            {exp.description && <Text style={styles.paragraph}>{exp.description}</Text>}
                        </View>
                    ))}

                    <Text style={styles.sectionHeader}>Education</Text>
                    {education.map((edu: any, i: number) => (
                        <View key={i} style={{ marginBottom: 6 }}>
                            <Text style={styles.expTitle}>{edu.degree || ""} — {edu.institution || ""}</Text>
                            <Text style={styles.expSubtitle}>{edu.start || ""} — {edu.end || ""}</Text>
                            {edu.description && <Text style={styles.paragraph}>{edu.description}</Text>}
                        </View>
                    ))}

                    <Text style={styles.sectionHeader}>Projects</Text>
                    {projects.map((p: any, i: number) => (
                        <View key={i} style={{ marginBottom: 6 }}>
                            <Text style={styles.expTitle}>{p.name}</Text>
                            {p.description && <Text style={styles.paragraph}>{p.description}</Text>}
                        </View>
                    ))}

                </View>
            </Page>
        </Document>
    );
};

export default ResumePDF;
