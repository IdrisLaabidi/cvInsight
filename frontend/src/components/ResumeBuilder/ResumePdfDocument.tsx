import React from "react";
import { Document, Page, Text, View, Image, StyleSheet, Font } from "@react-pdf/renderer";
import { About, Education, Work, Skill, Project, Language, Certificate, SocialActivity } from "./ResumeContext";

// Register a sample Google font; fallback to standard fonts if unavailable
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 28,
    fontSize: 11,
    color: "#1f2937",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
  },
  role: {
    fontSize: 12,
    color: "#374151",
    fontFamily: "Oswald",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
    color: "#111827",
  },
  text: {
    fontSize: 11,
    lineHeight: 1.4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bullet: {
    marginBottom: 4,
  },
});

export interface ResumePdfProps {
  about: About;
  educationList: Education[];
  workList: Work[];
  skills: Skill[];
  softSkills: Skill[];
  interests: Skill[];
  projects: Project[];
  languages: Language[];
  certificates: Certificate[];
  socialActivities: SocialActivity[];
}

const ResumePdfDocument: React.FC<ResumePdfProps> = ({
  about,
  educationList,
  workList,
  skills,
  softSkills,
  interests,
  projects,
  languages,
  certificates,
  socialActivities,
}) => {

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{about.name || "Your Name"}</Text>
            <Text style={styles.role}>{about.role || "Your Role"}</Text>
            <Text style={styles.text}>{about.email || "email@example.com"} • {about.phone || "+123456789"}</Text>
            <Text style={styles.text}>{about.address || "City, Country"}</Text>
          </View>
          {about.picture ? (
            <Image style={styles.avatar} src={about.picture} />
          ) : null}
        </View>

        {about.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{about.summary}</Text>
          </View>
        ) : null}

        {/* Work Experience */}
        {workList && workList.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {workList.map((w) => (
              <View key={w.id} style={{ marginBottom: 6 }}>
                <Text style={styles.text}>
                  {w.position || "Position"} — {w.company || "Company"}
                </Text>
                <Text style={{ ...styles.text, color: "#6b7280" }}>
                  {w.startDate || "Start"} - {w.endDate || "Present"} • {w.type || ""}
                </Text>
                {w.description ? <Text style={styles.text}>{w.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {educationList && educationList.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {educationList.map((e) => (
              <View key={e.id} style={{ marginBottom: 6 }}>
                <Text style={styles.text}>
                  {e.degree || "Degree"} — {e.school || "School"}
                </Text>
                <Text style={{ ...styles.text, color: "#6b7280" }}>
                  {e.startYr || ""} - {e.endYr || ""} {e.grade ? `• ${e.grade}` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((p) => (
              <View key={p.id} style={{ marginBottom: 6 }}>
                <Text style={styles.text}>{p.name || "Project"}</Text>
                {p.description ? <Text style={styles.text}>{p.description}</Text> : null}
                {(p.url || p.github) ? (
                  <Text style={{ ...styles.text, color: "#2563eb" }}>
                    {p.url || ""} {p.github ? `• ${p.github}` : ""}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {(skills?.length || softSkills?.length || interests?.length) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {skills?.length ? (
              <Text style={styles.text}>Technical: {skills.map(s => s.name).join(", ")}</Text>
            ) : null}
            {softSkills?.length ? (
              <Text style={styles.text}>Soft: {softSkills.map(s => s.name).join(", ")}</Text>
            ) : null}
            {interests?.length ? (
              <Text style={styles.text}>Interests: {interests.map(s => s.name).join(", ")}</Text>
            ) : null}
          </View>
        ) : null}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.text}>
              {languages.map(l => `${l.name} (${l.level})`).join(", ")}
            </Text>
          </View>
        )}

        {/* Certifications */}
        {certificates && certificates.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certificates.map(c => (
              <Text key={c.id} style={styles.text}>
                {c.title} — {c.issuer} {c.year ? `(${c.year})` : ""}
              </Text>
            ))}
          </View>
        )}

        {/* Social Activities */}
        {socialActivities && socialActivities.length > 0 && (
          <View style={{ ...styles.section, marginBottom: 8 }}>
            <Text style={styles.sectionTitle}>Social Activities</Text>
            {socialActivities.map(sa => (
              <View key={sa.id} style={styles.bullet}>
                <Text style={styles.text}>{sa.role} — {sa.organization}</Text>
                {sa.description ? <Text style={styles.text}>{sa.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {/* Footer page number */}
        <Text style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", color: "#6b7280", fontSize: 10 }} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};

export default ResumePdfDocument;
