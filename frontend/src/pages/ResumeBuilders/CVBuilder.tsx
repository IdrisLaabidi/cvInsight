/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {useMemo, useState} from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { PDFViewer } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";
import SectionTitle from "../../components/form/SectionTitle";
import DynamicFieldArray from "../../components/form/DynamicFieldArray";
import InputField from "../../components/form/input/InputField.tsx";
import TextArea from "../../components/form/input/TextArea.tsx";
import FileInput from "../../components/form/input/FileInput.tsx";

/* Initial values */
const initialValues = {
    personal: {
        firstName: "",
        lastName: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        website: "",
    },
    summary: "",
    skills: [""],
    languages: [{ lang: "", level: "" }],
    experiences: [
        {
            title: "",
            company: "",
            start: "",
            end: "",
            description: ""
        }
    ],
    education: [
        {
            degree: "",
            institution: "",
            start: "",
            end: "",
            description: ""
        }
    ],
    projects: [
        {
            name: "",
            description: ""
        }
    ]
};

/* Validation */
const validationSchema = Yup.object().shape({
    personal: Yup.object().shape({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required")
    }),
});

const CVBuilder: React.FC = () => {
    const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);

    function toDataUrl(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(String(e.target?.result));
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
        });
    }

    const [formValues, setFormValues] = useState(initialValues);

    const pdfDocument = useMemo(
        () => <ResumePDF values={formValues} photoDataUrl={photoDataUrl} />,
        [formValues, photoDataUrl]
    );

    return (
        <div className="p-6">
            <SectionTitle title="Resume Builder" subtitle="Create a professional resume and preview it live" />
            {/* Left: Form */}
            <div className="grid grid-cols-12 h-screen">
                <Formik
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        // form submission can send to backend or save locally
                        console.log("submit", values);
                    }}
                >
                    {({ values, setFieldValue }) => {
                        // sync Formik values to live state
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        React.useEffect(() => {
                            setFormValues(values);
                        }, [values]);

                        return (
                            <>
                                <div className="col-span-6 overflow-y-auto p-6 bg-gray-50">
                                    <Form>
                                        <div className="space-y-6">
                                            {/* Personal */}
                                            <div>
                                                <SectionTitle title="Personal information" />
                                                <div className="grid grid-cols-2 gap-3">
                                                    <Field name="personal.firstName">
                                                        {({ field }: any) => <InputField {...field} placeholder="First name" />}
                                                    </Field>
                                                    <Field name="personal.lastName">
                                                        {({ field }: any) => <InputField {...field} placeholder="Last name" />}
                                                    </Field>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 mt-3">
                                                    <Field name="personal.email">
                                                        {({ field }: any) => <InputField {...field} placeholder="Email" />}
                                                    </Field>
                                                    <Field name="personal.phone">
                                                        {({ field }: any) => <InputField {...field} placeholder="Phone" />}
                                                    </Field>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 mt-3">
                                                    <Field name="personal.location">
                                                        {({ field }: any) => <InputField {...field} placeholder="Location" />}
                                                    </Field>
                                                    <Field name="personal.website">
                                                        {({ field }: any) => <InputField {...field} placeholder="Website / LinkedIn" />}
                                                    </Field>
                                                </div>

                                                <div className="mt-3">
                                                    <label className="block text-sm">Photo</label>
                                                    <FileInput
                                                        onChange={async (e: any) => {
                                                            const f = e.target.files?.[0];
                                                            if (f) {
                                                                const dataUrl = await toDataUrl(f);
                                                                setPhotoDataUrl(dataUrl);
                                                                // optionally store file or dataUrl into form state:
                                                                await setFieldValue("personal.photo", dataUrl);
                                                            }
                                                        }}
                                                    />
                                                    {photoDataUrl && <img src={photoDataUrl} alt="preview" className="mt-2 w-24 rounded-full" />}
                                                </div>
                                            </div>

                                            {/* Summary */}
                                            <div>
                                                <SectionTitle title="Summary" />
                                                <Field name="summary">
                                                    {({ field }: any) => <TextArea {...field} placeholder="Short summary about you" rows={4} />}
                                                </Field>
                                            </div>

                                            {/* Skills */}
                                            <div>
                                                <SectionTitle title="Skills" />
                                                <FieldArray name="skills">
                                                    {(arrayHelpers) => (
                                                        <DynamicFieldArray
                                                            values={values.skills}
                                                            arrayHelpers={arrayHelpers}
                                                            addLabel="Add skill"
                                                            renderItem={(idx, remove) => (
                                                                <div className="flex gap-2 items-center">
                                                                    <Field name={`skills[${idx}]`}>
                                                                        {({field}: any) => <InputField {...field}
                                                                                                  placeholder="Skill name"/>}
                                                                    </Field>
                                                                    <button type="button" onClick={() => remove(idx)}
                                                                            className="text-red-500">Remove
                                                                    </button>
                                                                </div>
                                                            )} name={"skille"}
                                                        />
                                                    )}
                                                </FieldArray>
                                            </div>

                                            {/* Languages */}
                                            <div>
                                                <SectionTitle title="Languages" />
                                                <FieldArray name="languages">
                                                    {(arrayHelpers) => (
                                                        <DynamicFieldArray
                                                            values={values.languages}
                                                            arrayHelpers={arrayHelpers}
                                                            addLabel="Add language"
                                                            renderItem={(idx, remove) => (
                                                                <div className="grid grid-cols-3 gap-2 items-center">
                                                                    <Field name={`languages[${idx}].lang`}>
                                                                        {({field}: any) => <InputField {...field}
                                                                                                  placeholder="Language"/>}
                                                                    </Field>
                                                                    <Field name={`languages[${idx}].level`}>
                                                                        {({field}: any) => <InputField {...field}
                                                                                                  placeholder="Level (native / fluent / basic)"/>}
                                                                    </Field>
                                                                    <button type="button" onClick={() => remove(idx)}
                                                                            className="text-red-500">Remove
                                                                    </button>
                                                                </div>
                                                            )} name={"languages"}
                                                        />
                                                    )}
                                                </FieldArray>
                                            </div>

                                            {/* Experience */}
                                            <div>
                                                <SectionTitle title="Experience" />
                                                <FieldArray name="experiences">
                                                    {(arrayHelpers) => (
                                                        <DynamicFieldArray
                                                            values={values.experiences}
                                                            arrayHelpers={arrayHelpers}
                                                            addLabel="Add experience"
                                                            renderItem={(idx, remove) => (
                                                                <>
                                                                    <div className="grid grid-cols-2 gap-2">
                                                                        <Field name={`experiences[${idx}].title`}>
                                                                            {({field}: any) => <InputField {...field}
                                                                                                      placeholder="Job title"/>}
                                                                        </Field>
                                                                        <Field name={`experiences[${idx}].company`}>
                                                                            {({field}: any) => <InputField {...field}
                                                                                                      placeholder="Company"/>}
                                                                        </Field>
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                                                        <Field name={`experiences[${idx}].start`}>
                                                                            {({field}: any) => <InputField {...field}
                                                                                                      placeholder="Start (e.g. Jan 2020)"/>}
                                                                        </Field>
                                                                        <Field name={`experiences[${idx}].end`}>
                                                                            {({field}: any) => <InputField {...field}
                                                                                                      placeholder="End (e.g. Present)"/>}
                                                                        </Field>
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <Field name={`experiences[${idx}].description`}>
                                                                            {({field}: any) => <TextArea {...field}
                                                                                                         placeholder="Description"
                                                                                                         rows={3}/>}
                                                                        </Field>
                                                                    </div>
                                                                    <div className="mt-1">
                                                                        <button type="button" onClick={() => remove(idx)}
                                                                                className="text-red-500">Remove
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )} name={"experiences"}
                                                        />
                                                    )}
                                                </FieldArray>
                                            </div>

                                            {/* Education */}
                                            <div>
                                                <SectionTitle title="Education" />
                                                <FieldArray name="education">
                                                    {(arrayHelpers) => (
                                                        <DynamicFieldArray
                                                            values={values.education}
                                                            arrayHelpers={arrayHelpers}
                                                            addLabel="Add education"
                                                            renderItem={(idx, remove) => (
                                                                <>
                                                                    <div className="grid grid-cols-2 gap-2">
                                                                        <Field name={`education[${idx}].degree`}>
                                                                            {({field}: any) => <InputField {...field}
                                                                                                      placeholder="Degree (e.g. BSc Computer Science)"/>}
                                                                        </Field>
                                                                        <Field name={`education[${idx}].institution`}>
                                                                            {({field}: any) => <InputField {...field}
                                                                                                      placeholder="Institution"/>}
                                                                        </Field>
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                                                        <Field name={`education[${idx}].start`}>
                                                                            {({field}: any) => <InputField {...field}
                                                                                                      placeholder="Start (year)"/>}
                                                                        </Field>
                                                                        <Field name={`education[${idx}].end`}>
                                                                            {({field}: any) => <InputField {...field}
                                                                                                      placeholder="End (year)"/>}
                                                                        </Field>
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <Field name={`education[${idx}].description`}>
                                                                            {({field}: any) => <TextArea {...field}
                                                                                                         placeholder="Description"
                                                                                                         rows={2}/>}
                                                                        </Field>
                                                                    </div>
                                                                    <div className="mt-1">
                                                                        <button type="button" onClick={() => remove(idx)}
                                                                                className="text-red-500">Remove
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )} name={"education"}
                                                        />
                                                    )}
                                                </FieldArray>
                                            </div>

                                            {/* Projects */}
                                            <div>
                                                <SectionTitle title="Projects" />
                                                <FieldArray name="projects">
                                                    {(arrayHelpers) => (
                                                        <DynamicFieldArray
                                                            values={values.projects}
                                                            arrayHelpers={arrayHelpers}
                                                            addLabel="Add project"
                                                            renderItem={(idx, remove) => (
                                                                <>
                                                                    <Field name={`projects[${idx}].name`}>
                                                                        {({field}: any) => <InputField {...field}
                                                                                                  placeholder="Project name"/>}
                                                                    </Field>
                                                                    <div className="mt-2">
                                                                        <Field name={`projects[${idx}].description`}>
                                                                            {({field}: any) => <TextArea {...field}
                                                                                                         placeholder="Project description"
                                                                                                         rows={2}/>}
                                                                        </Field>
                                                                    </div>
                                                                    <div className="mt-1">
                                                                        <button type="button" onClick={() => remove(idx)}
                                                                                className="text-red-500">Remove
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )} name={"projects"}
                                                        />
                                                    )}
                                                </FieldArray>
                                            </div>

                                            <div>
                                                <button type="submit" className="rounded bg-green-600 px-4 py-2 text-white">Save / Submit</button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <div className="col-span-6 border-l p-6">
                                    <PDFViewer style={{ width: "100%", height: "100%" }}>
                                        {pdfDocument}
                                    </PDFViewer>
                                </div>
                            </>
                        )}}
                </Formik>
            </div>
        </div>
    );
};

export default CVBuilder;
