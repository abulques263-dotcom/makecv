import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { resumeSchema } from "../schema/resume.schema";
import type {
  ResumeData, PersonalDetails, ExperienceItem, EducationItem, SkillItem,
  LanguageItem, ProjectItem, CertificationItem, CustomSection, ResumeDesign
} from "../schema/resume.types";
import { createInitialResume } from "./initialResume";
import { createId } from "../utils/id";

type Patch<T> = Partial<T>;
interface ResumeStore {
  resume: ResumeData;
  updatePersonalDetails: (patch: Patch<PersonalDetails>) => void;
  addExperience: (item?: Partial<ExperienceItem>) => string;
  updateExperience: (id: string, patch: Patch<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addEducation: (item?: Partial<EducationItem>) => string;
  updateEducation: (id: string, patch: Patch<EducationItem>) => void;
  removeEducation: (id: string) => void;
  addSkill: (item?: Partial<SkillItem>) => string;
  updateSkill: (id: string, patch: Patch<SkillItem>) => void;
  removeSkill: (id: string) => void;
  addLanguage: (item?: Partial<LanguageItem>) => string;
  updateLanguage: (id: string, patch: Patch<LanguageItem>) => void;
  removeLanguage: (id: string) => void;
  addProject: (item?: Partial<ProjectItem>) => string;
  updateProject: (id: string, patch: Patch<ProjectItem>) => void;
  removeProject: (id: string) => void;
  addCertification: (item?: Partial<CertificationItem>) => string;
  updateCertification: (id: string, patch: Patch<CertificationItem>) => void;
  removeCertification: (id: string) => void;
  addCustomSection: (title?: string) => string;
  updateCustomSection: (id: string, patch: Patch<CustomSection>) => void;
  removeCustomSection: (id: string) => void;
  updateDesign: (patch: Patch<ResumeDesign>) => void;
  reorderSections: (sectionIds: string[]) => void;
  toggleSectionVisibility: (sectionId: string, visible: boolean) => void;
  loadResume: (candidate: unknown) => void;
  resetResume: () => void;
  markSaved: () => void;
}
const stamp = () => new Date().toISOString();
const touch = (resume: ResumeData) => { resume.metadata.updatedAt = stamp(); };

export const useResumeStore = create<ResumeStore>()(immer((set) => ({
  resume: createInitialResume(),

  updatePersonalDetails: (patch) => set((state) => {
    const details = state.resume.personalDetails;
    const { location, photo, ...simple } = patch;
    Object.assign(details, simple);
    if (location) Object.assign(details.location, location);
    if (photo) Object.assign(details.photo, photo);
    touch(state.resume);
  }),

  addExperience: (item = {}) => {
    const id = item.id ?? createId("exp");
    set((state) => {
      state.resume.experience.push({
        id, company: "", position: "", employmentType: "", location: "",
        startDate: "", endDate: "", current: false, description: "",
        bullets: [], visible: true, ...item, id
      });
      touch(state.resume);
    });
    return id;
  },
  updateExperience: (id, patch) => set((state) => {
    const item = state.resume.experience.find((entry) => entry.id === id);
    if (item) { Object.assign(item, patch, { id }); touch(state.resume); }
  }),
  removeExperience: (id) => set((state) => {
    state.resume.experience = state.resume.experience.filter((item) => item.id !== id);
    touch(state.resume);
  }),

  addEducation: (item = {}) => {
    const id = item.id ?? createId("edu");
    set((state) => {
      state.resume.education.push({
        id, institution: "", degree: "", fieldOfStudy: "", location: "",
        startDate: "", endDate: "", current: false, grade: "", description: "",
        visible: true, ...item, id
      });
      touch(state.resume);
    });
    return id;
  },
  updateEducation: (id, patch) => set((state) => {
    const item = state.resume.education.find((entry) => entry.id === id);
    if (item) { Object.assign(item, patch, { id }); touch(state.resume); }
  }),
  removeEducation: (id) => set((state) => {
    state.resume.education = state.resume.education.filter((item) => item.id !== id);
    touch(state.resume);
  }),

  addSkill: (item = {}) => {
    const id = item.id ?? createId("skill");
    set((state) => {
      state.resume.skills.push({ id, name: "", level: null, visible: true, ...item, id });
      touch(state.resume);
    });
    return id;
  },
  updateSkill: (id, patch) => set((state) => {
    const item = state.resume.skills.find((entry) => entry.id === id);
    if (item) { Object.assign(item, patch, { id }); touch(state.resume); }
  }),
  removeSkill: (id) => set((state) => {
    state.resume.skills = state.resume.skills.filter((item) => item.id !== id);
    touch(state.resume);
  }),

  addLanguage: (item = {}) => {
    const id = item.id ?? createId("lang");
    set((state) => {
      state.resume.languages.push({ id, name: "", proficiency: "", visible: true, ...item, id });
      touch(state.resume);
    });
    return id;
  },
  updateLanguage: (id, patch) => set((state) => {
    const item = state.resume.languages.find((entry) => entry.id === id);
    if (item) { Object.assign(item, patch, { id }); touch(state.resume); }
  }),
  removeLanguage: (id) => set((state) => {
    state.resume.languages = state.resume.languages.filter((item) => item.id !== id);
    touch(state.resume);
  }),

  addProject: (item = {}) => {
    const id = item.id ?? createId("project");
    set((state) => {
      state.resume.projects.push({
        id, name: "", role: "", url: "", startDate: "", endDate: "",
        description: "", technologies: [], visible: true, ...item, id
      });
      touch(state.resume);
    });
    return id;
  },
  updateProject: (id, patch) => set((state) => {
    const item = state.resume.projects.find((entry) => entry.id === id);
    if (item) { Object.assign(item, patch, { id }); touch(state.resume); }
  }),
  removeProject: (id) => set((state) => {
    state.resume.projects = state.resume.projects.filter((item) => item.id !== id);
    touch(state.resume);
  }),

  addCertification: (item = {}) => {
    const id = item.id ?? createId("cert");
    set((state) => {
      state.resume.certifications.push({
        id, name: "", issuer: "", issueDate: "", expiryDate: "",
        credentialUrl: "", visible: true, ...item, id
      });
      touch(state.resume);
    });
    return id;
  },
  updateCertification: (id, patch) => set((state) => {
    const item = state.resume.certifications.find((entry) => entry.id === id);
    if (item) { Object.assign(item, patch, { id }); touch(state.resume); }
  }),
  removeCertification: (id) => set((state) => {
    state.resume.certifications = state.resume.certifications.filter((item) => item.id !== id);
    touch(state.resume);
  }),

  addCustomSection: (title = "Additional Information") => {
    const id = createId("custom");
    set((state) => {
      state.resume.customSections.push({ id, title, visible: true, items: [] });
      if (!state.resume.sectionOrder.includes("customSections")) state.resume.sectionOrder.push("customSections");
      state.resume.sectionVisibility.customSections = true;
      touch(state.resume);
    });
    return id;
  },
  updateCustomSection: (id, patch) => set((state) => {
    const item = state.resume.customSections.find((entry) => entry.id === id);
    if (item) { Object.assign(item, patch, { id }); touch(state.resume); }
  }),
  removeCustomSection: (id) => set((state) => {
    state.resume.customSections = state.resume.customSections.filter((item) => item.id !== id);
    touch(state.resume);
  }),

  updateDesign: (patch) => set((state) => {
    Object.assign(state.resume.design, patch);
    touch(state.resume);
  }),
  reorderSections: (sectionIds) => set((state) => {
    const valid = new Set([
      "personalDetails", "summary", "experience", "education", "skills",
      "languages", "projects", "certifications", "customSections"
    ]);
    const unique = [...new Set(sectionIds)].filter((id) => valid.has(id));
    for (const id of state.resume.sectionOrder) {
      if (!unique.includes(id)) unique.push(id);
    }
    state.resume.sectionOrder = unique as ResumeData["sectionOrder"];
    touch(state.resume);
  }),
  toggleSectionVisibility: (sectionId, visible) => set((state) => {
    state.resume.sectionVisibility[sectionId as keyof ResumeData["sectionVisibility"]] = visible;
    touch(state.resume);
  }),
  loadResume: (candidate) => {
    const parsed = resumeSchema.safeParse(candidate);
    if (!parsed.success) {
      throw new Error(`Invalid resume data: ${parsed.error.issues.map((issue) => issue.path.join(".")).join(", ")}`);
    }
    set((state) => { state.resume = parsed.data as ResumeData; });
  },
  resetResume: () => set((state) => { state.resume = createInitialResume(); }),
  markSaved: () => set((state) => { state.resume.metadata.lastSavedAt = stamp(); })
})));
