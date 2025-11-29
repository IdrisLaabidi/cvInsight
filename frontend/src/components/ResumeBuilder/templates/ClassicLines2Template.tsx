import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumePdfProps } from "./types";

const styles = StyleSheet.create({
  page: { paddingTop: 24, paddingBottom: 24, paddingHorizontal: 28, fontSize: 11, color: "#000" },
  headerWrap: { alignItems: 'center', paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: '#000' },
  name: { fontSize: 24, fontWeight: 700 },
  contact: { fontSize: 11, marginTop: 6 },
  section: { marginTop: 12 },
  title: { fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6, color: '#000' },
  rule: { borderBottomWidth: 2, borderBottomColor: '#000', marginTop: 2, marginBottom: 4 },
  text: { fontSize: 11, lineHeight: 1.4 },
});

const Section: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.rule} />
    {children}
  </View>
);

const ClassicLines2Template: React.FC<ResumePdfProps> = ({
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
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerWrap}>
        <Text style={styles.name}>{about.name || 'Your Name'}</Text>
        <Text style={styles.contact}>
          {(about.phone || '+000 000 000')}
          {about.email ? `  |  ${about.email}` : ''}
          {about.linkedin ? `  |  ${about.linkedin}` : ''}
        </Text>
      </View>

      {about.summary ? (
        <Section title="Summary">
          <Text style={styles.text}>{about.summary}</Text>
        </Section>
      ) : null}

      {workList?.length ? (
        <Section title="Work Experience">
          {workList.map(w => (
            <View key={w.id} style={{ marginBottom: 6 }}>
              <Text style={styles.text}>{w.position || 'Position'} — {w.company || 'Company'}</Text>
              <Text style={{ ...styles.text, color: '#4b5563' }}>{w.startDate || 'Start'} - {w.endDate || 'Present'} • {w.type || ''}</Text>
              {w.description ? <Text style={styles.text}>{w.description}</Text> : null}
            </View>
          ))}
        </Section>
      ) : null}

      {educationList?.length ? (
        <Section title="Education">
          {educationList.map(e => (
            <View key={e.id} style={{ marginBottom: 6 }}>
              <Text style={styles.text}>{e.degree || 'Degree'} — {e.school || 'School'}</Text>
              <Text style={{ ...styles.text, color: '#4b5563' }}>{e.startYr || ''} - {e.endYr || ''} {e.grade ? `• ${e.grade}` : ''}</Text>
            </View>
          ))}
        </Section>
      ) : null}

      {projects?.length ? (
        <Section title="Projects">
          {projects.map(p => (
            <View key={p.id} style={{ marginBottom: 6 }}>
              <Text style={{ ...styles.text, fontWeight: 700 }}>{p.name || 'Project'}</Text>
              {p.description ? <Text style={styles.text}>• {p.description}</Text> : null}
              {(p.url || p.github) ? <Text style={{ ...styles.text, color: '#000' }}>{p.url || ''} {p.github ? `• ${p.github}` : ''}</Text> : null}
            </View>
          ))}
        </Section>
      ) : null}

      {(skills?.length || softSkills?.length || interests?.length) ? (
        <Section title="Skills">
          <View>
            {skills?.map((s, idx) => (<Text key={s.id || idx} style={styles.text}>• {s.name}</Text>))}
            {softSkills?.map((s, idx) => (<Text key={s.id || `soft-${idx}`} style={styles.text}>• {s.name}</Text>))}
            {interests?.map((s, idx) => (<Text key={s.id || `int-${idx}`} style={styles.text}>• {s.name}</Text>))}
          </View>
        </Section>
      ) : null}

      {languages?.length ? (
        <Section title="Languages">
          <Text style={styles.text}>{languages.map(l => `${l.name} (${l.level})`).join(', ')}</Text>
        </Section>
      ) : null}

      {certificates?.length ? (
        <Section title="Certifications">
          {certificates.map(c => (
            <Text key={c.id} style={styles.text}>{c.title} — {c.issuer} {c.year ? `(${c.year})` : ''}</Text>
          ))}
        </Section>
      ) : null}

      {socialActivities?.length ? (
        <Section title="Social Activities">
          {socialActivities.map(sa => (
            <View key={sa.id} style={{ marginBottom: 4 }}>
              <Text style={styles.text}>{sa.role} — {sa.organization}</Text>
              {sa.description ? <Text style={styles.text}>{sa.description}</Text> : null}
            </View>
          ))}
        </Section>
      ) : null}

      <Text style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", color: "#6b7280", fontSize: 10 }} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
    </Page>
  </Document>
);

export default ClassicLines2Template;
