import type { ResumeData, ResumeSectionId } from "../schema/resume.types";
import { createId } from "../utils/id";

export const DEFAULT_SECTION_ORDER: ResumeSectionId[] = [
  "personalDetails", "summary", "experience", "education",
  "skills", "projects", "certifications", "languages", "customSections"
];

export function createInitialResume(): ResumeData {
  const now = new Date().toISOString();
  return {
    schemaVersion: 1,
    resumeId: createId("resume"),
    metadata: { title: "Untitled resume", createdAt: now, updatedAt: now, lastSavedAt: null },
    personalDetails: {
      firstName: "", lastName: "", professionalTitle: "", email: "", phone: "",
      website: "", linkedin: "", github: "",
      location: { city: "", region: "", postalCode: "", country: "" },
      photo: { assetId: null, dataUrl: null, alt: "" }, summary: ""
    },
    experience: [], education: [], skills: [], languages: [], projects: [],
    certifications: [], customSections: [],
    sectionOrder: [...DEFAULT_SECTION_ORDER],
    sectionVisibility: {
      personalDetails: true, summary: true, experience: true, education: true,
      skills: true, languages: true, projects: true, certifications: true, customSections: true
    },
    design: {
      templateId: "classic", accentColor: "#2563eb", fontFamily: "Arial",
      fontSize: "medium", lineSpacing: "normal", pageSize: "A4",
      margins: "normal", columns: 1, showPhoto: true, dateFormat: "MMM YYYY"
    }
  };
}
