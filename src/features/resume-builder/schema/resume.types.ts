export type ResumeSectionId =
  | "personalDetails" | "summary" | "experience" | "education"
  | "skills" | "languages" | "projects" | "certifications"
  | "customSections";

export interface LocationData {
  city: string; region: string; postalCode: string; country: string;
}
export interface PhotoData { assetId: string | null; dataUrl: string | null; alt: string; }
export interface PersonalDetails {
  firstName: string; lastName: string; professionalTitle: string;
  email: string; phone: string; website: string; linkedin: string; github: string;
  location: LocationData; photo: PhotoData; summary: string;
}
export interface ExperienceItem {
  id: string; company: string; position: string; employmentType: string;
  location: string; startDate: string; endDate: string; current: boolean;
  description: string; bullets: string[]; visible: boolean;
}
export interface EducationItem {
  id: string; institution: string; degree: string; fieldOfStudy: string;
  location: string; startDate: string; endDate: string; current: boolean;
  grade: string; description: string; visible: boolean;
}
export interface SkillItem { id: string; name: string; level: number | null; visible: boolean; }
export interface LanguageItem { id: string; name: string; proficiency: string; visible: boolean; }
export interface ProjectItem {
  id: string; name: string; role: string; url: string; startDate: string;
  endDate: string; description: string; technologies: string[]; visible: boolean;
}
export interface CertificationItem {
  id: string; name: string; issuer: string; issueDate: string; expiryDate: string;
  credentialUrl: string; visible: boolean;
}
export interface CustomSectionItem {
  id: string; heading: string; subheading: string; startDate: string;
  endDate: string; description: string;
}
export interface CustomSection {
  id: string; title: string; visible: boolean; items: CustomSectionItem[];
}
export interface ResumeDesign {
  templateId: string; accentColor: string; fontFamily: string;
  fontSize: "small" | "medium" | "large";
  lineSpacing: "compact" | "normal" | "relaxed";
  pageSize: "A4" | "Letter"; margins: "narrow" | "normal" | "wide";
  columns: 1 | 2; showPhoto: boolean; dateFormat: string;
}
export interface ResumeData {
  schemaVersion: 1; resumeId: string;
  metadata: { title: string; createdAt: string | null; updatedAt: string | null; lastSavedAt: string | null; };
  personalDetails: PersonalDetails;
  experience: ExperienceItem[]; education: EducationItem[]; skills: SkillItem[];
  languages: LanguageItem[]; projects: ProjectItem[]; certifications: CertificationItem[];
  customSections: CustomSection[]; sectionOrder: ResumeSectionId[];
  sectionVisibility: Record<ResumeSectionId, boolean>; design: ResumeDesign;
}
