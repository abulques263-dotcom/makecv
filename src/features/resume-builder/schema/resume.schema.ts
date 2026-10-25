import { z } from "zod";

const id = z.string().min(1).max(100);
const shortText = z.string().max(300);
const dateText = z.string().max(40);

export const experienceSchema = z.object({
  id, company: shortText, position: shortText, employmentType: shortText,
  location: shortText, startDate: dateText, endDate: dateText, current: z.boolean(),
  description: z.string().max(10000), bullets: z.array(z.string().max(2000)).max(100),
  visible: z.boolean()
});
export const educationSchema = z.object({
  id, institution: shortText, degree: shortText, fieldOfStudy: shortText,
  location: shortText, startDate: dateText, endDate: dateText, current: z.boolean(),
  grade: z.string().max(100), description: z.string().max(5000), visible: z.boolean()
});
export const skillSchema = z.object({
  id, name: z.string().max(100), level: z.number().min(0).max(100).nullable(), visible: z.boolean()
});
export const languageSchema = z.object({
  id, name: z.string().max(100), proficiency: z.string().max(100), visible: z.boolean()
});
export const projectSchema = z.object({
  id, name: shortText, role: shortText, url: z.string().max(2048),
  startDate: dateText, endDate: dateText, description: z.string().max(10000),
  technologies: z.array(z.string().max(100)).max(100), visible: z.boolean()
});
export const certificationSchema = z.object({
  id, name: shortText, issuer: shortText, issueDate: dateText, expiryDate: dateText,
  credentialUrl: z.string().max(2048), visible: z.boolean()
});
const customItemSchema = z.object({
  id, heading: shortText, subheading: shortText, startDate: dateText,
  endDate: dateText, description: z.string().max(10000)
});
const customSectionSchema = z.object({
  id, title: shortText, visible: z.boolean(), items: z.array(customItemSchema).max(100)
});
const locationSchema = z.object({
  city: shortText, region: shortText, postalCode: shortText, country: shortText
});
const photoSchema = z.object({
  assetId: z.string().nullable(), dataUrl: z.string().max(7_000_000).nullable(), alt: shortText
});
const personalDetailsSchema = z.object({
  firstName: shortText, lastName: shortText, professionalTitle: shortText,
  email: z.string().max(320), phone: z.string().max(80), website: z.string().max(2048),
  linkedin: z.string().max(2048), github: z.string().max(2048),
  location: locationSchema, photo: photoSchema, summary: z.string().max(10000)
});
export const resumeDesignSchema = z.object({
  templateId: z.string().min(1).max(100),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  fontFamily: z.string().max(100),
  fontSize: z.enum(["small", "medium", "large"]),
  lineSpacing: z.enum(["compact", "normal", "relaxed"]),
  pageSize: z.enum(["A4", "Letter"]),
  margins: z.enum(["narrow", "normal", "wide"]),
  columns: z.union([z.literal(1), z.literal(2)]),
  showPhoto: z.boolean(), dateFormat: z.string().max(40)
});
export const resumeSchema = z.object({
  schemaVersion: z.literal(1), resumeId: id,
  metadata: z.object({
    title: shortText, createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(), lastSavedAt: z.string().nullable()
  }),
  personalDetails: personalDetailsSchema,
  experience: z.array(experienceSchema).max(100),
  education: z.array(educationSchema).max(100),
  skills: z.array(skillSchema).max(200),
  languages: z.array(languageSchema).max(100),
  projects: z.array(projectSchema).max(100),
  certifications: z.array(certificationSchema).max(100),
  customSections: z.array(customSectionSchema).max(50),
  sectionOrder: z.array(z.enum([
    "personalDetails", "summary", "experience", "education", "skills",
    "languages", "projects", "certifications", "customSections"
  ])).max(50),
  sectionVisibility: z.record(z.string(), z.boolean()),
  design: resumeDesignSchema
});
export type ValidatedResume = z.infer<typeof resumeSchema>;
