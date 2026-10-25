import { useMemo, useState } from "react";
import { FileText, UserRound, BriefcaseBusiness, GraduationCap, Sparkles, Palette, Plus, Trash2, Download, Check, Eye, ChevronDown, Menu, X, Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";
import { useResumeStore } from "../../src/features/resume-builder/store/resumeStore";

type SectionKey = "personal" | "summary" | "experience" | "education" | "skills" | "design";
const navItems: { id: SectionKey; label: string; icon: typeof UserRound }[] = [
  { id: "personal", label: "Personal details", icon: UserRound },
  { id: "summary", label: "Professional summary", icon: FileText },
  { id: "experience", label: "Work experience", icon: BriefcaseBusiness },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "design", label: "Design", icon: Palette },
];

function Field({ label, value, onChange, placeholder = "", type = "text", multiline = false }: {
  label: string; value: string; onChange: (value: string) => void;
  placeholder?: string; type?: string; multiline?: boolean;
}) {
  return <label className="field"><span>{label}</span>{multiline
    ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} />
    : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />}</label>;
}

function ResumePreview() {
  const resume = useResumeStore((s) => s.resume);
  const { personalDetails: p, design } = resume;
  const fullName = [p.firstName, p.lastName].filter(Boolean).join(" ") || "Your Name";
  const visibleExperience = resume.experience.filter((item) => item.visible && (item.position || item.company || item.description));
  const visibleEducation = resume.education.filter((item) => item.visible && (item.institution || item.degree));
  const visibleSkills = resume.skills.filter((item) => item.visible && item.name.trim());
  const accent = design.accentColor;
  return <article className={`resume-paper font-${design.fontFamily.toLowerCase()}`} style={{ "--accent": accent } as React.CSSProperties}>
    <header className="paper-header">
      {design.showPhoto && p.photo.dataUrl ? <img className="resume-photo" src={p.photo.dataUrl} alt={p.photo.alt || "Profile"} /> : null}
      <h1>{fullName}</h1>
      <p className="paper-role">{p.professionalTitle || "Professional title"}</p>
      <div className="paper-contact">
        {p.email && <span><Mail size={11}/>{p.email}</span>}
        {p.phone && <span><Phone size={11}/>{p.phone}</span>}
        {[p.location.city, p.location.region, p.location.country].filter(Boolean).join(", ") && <span><MapPin size={11}/>{[p.location.city, p.location.region, p.location.country].filter(Boolean).join(", ")}</span>}
        {p.website && <span><LinkIcon size={11}/>{p.website}</span>}
      </div>
    </header>
    {p.summary && <section className="paper-section"><h2>Profile</h2><p>{p.summary}</p></section>}
    {visibleExperience.length > 0 && <section className="paper-section"><h2>Experience</h2>{visibleExperience.map((item) => <div className="paper-entry" key={item.id}><div className="paper-entry-top"><strong>{item.position || "Position"}</strong><span>{[item.startDate, item.current ? "Present" : item.endDate].filter(Boolean).join(" — ")}</span></div><div className="paper-subline">{[item.company, item.location].filter(Boolean).join(" · ")}</div>{item.description && <p>{item.description}</p>}{item.bullets.filter(Boolean).map((bullet, i) => <p className="paper-bullet" key={i}>• {bullet}</p>)}</div>)}</section>}
    {visibleEducation.length > 0 && <section className="paper-section"><h2>Education</h2>{visibleEducation.map((item) => <div className="paper-entry" key={item.id}><div className="paper-entry-top"><strong>{item.degree || "Degree"}{item.fieldOfStudy ? `, ${item.fieldOfStudy}` : ""}</strong><span>{[item.startDate, item.endDate].filter(Boolean).join(" — ")}</span></div><div className="paper-subline">{item.institution}</div>{item.grade && <p>{item.grade}</p>}</div>)}</section>}
    {visibleSkills.length > 0 && <section className="paper-section"><h2>Skills</h2><p>{visibleSkills.map((item) => item.name).join("  ·  ")}</p></section>}
    {resume.languages.some((item) => item.visible && item.name.trim()) && <section className="paper-section"><h2>Languages</h2><p>{resume.languages.filter((item) => item.visible && item.name.trim()).map((item) => [item.name, item.proficiency].filter(Boolean).join(" — ")).join("  ·  ")}</p></section>}
    {resume.projects.some((item) => item.visible && item.name.trim()) && <section className="paper-section"><h2>Projects</h2>{resume.projects.filter((item) => item.visible && item.name.trim()).map((item) => <div className="paper-entry" key={item.id}><strong>{item.name}</strong>{item.role && <div className="paper-subline">{item.role}</div>}{item.description && <p>{item.description}</p>}</div>)}</section>}
    {!p.summary && visibleExperience.length === 0 && visibleEducation.length === 0 && visibleSkills.length === 0 && <div className="paper-empty"><FileText size={30}/><strong>Your resume preview</strong><span>Fill in your details to see them appear here.</span></div>}
  </article>;
}

export default function App() {
  const resume = useResumeStore((s) => s.resume);
  const updatePersonalDetails = useResumeStore((s) => s.updatePersonalDetails);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);
  const addSkill = useResumeStore((s) => s.addSkill);
  const updateSkill = useResumeStore((s) => s.updateSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);
  const updateDesign = useResumeStore((s) => s.updateDesign);
  const [active, setActive] = useState<SectionKey>("personal");
  const [mobileNav, setMobileNav] = useState(false);
  const [previewMobile, setPreviewMobile] = useState(false);
  const [saved, setSaved] = useState(true);
  const personal = resume.personalDetails;
  const setPersonal = (patch: Partial<typeof personal>) => { updatePersonalDetails(patch); setSaved(false); };
  const completion = useMemo(() => {
    const checks = [personal.firstName, personal.professionalTitle, personal.email, personal.phone, personal.location.city, personal.summary];
    return Math.round(checks.filter((value) => value.trim()).length / checks.length * 100);
  }, [personal]);
  const exportResume = () => {
    window.print();
    setSaved(true);
  };

  return <div className="editor-app">
    <header className="topbar">
      <a className="brand" href="../" aria-label="Calcora home"><span className="brand-mark"><FileText size={19}/></span><span>calcora<span className="brand-light">/resume</span></span></a>
      <div className="document-name"><span className="status-dot"/><span>{resume.metadata.title || "Untitled resume"}</span><ChevronDown size={14}/></div>
      <div className="top-actions"><span className="save-state"><Check size={14}/>{saved ? "All changes saved locally" : "Unsaved changes"}</span><button className="button button-primary" onClick={exportResume}><Download size={16}/> Export PDF</button></div>
      <button className="icon-button mobile-menu-button" aria-label="Open sections" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X/> : <Menu/>}</button>
    </header>

    <div className="workspace">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="sidebar-heading"><div><span className="eyebrow">RESUME WORKSPACE</span><h2>Build your resume</h2></div><span className="completion-number">{completion}%</span></div>
        <div className="progress-track"><span style={{ width: `${completion}%` }}/></div>
        <nav className="section-nav" aria-label="Resume sections">{navItems.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${active === id ? "active" : ""}`} onClick={() => { setActive(id); setMobileNav(false); }}><Icon size={17}/><span>{label}</span>{active === id && <span className="nav-active-dot"/>}</button>)}</nav>
        <div className="sidebar-tip"><Sparkles size={17}/><div><strong>Quick tip</strong><p>Keep your resume clear, specific, and tailored to the role you want.</p></div></div>
        <div className="sidebar-footer"><span>CALCORA RESUME BUILDER</span><span>Draft stored in this session</span></div>
      </aside>

      <main className={`editor-panel ${previewMobile ? "hide-editor" : ""}`}>
        <div className="panel-heading"><div><span className="eyebrow">STEP {navItems.findIndex((n) => n.id === active) + 1} OF {navItems.length}</span><h1>{navItems.find((n) => n.id === active)?.label}</h1><p>Make it yours. Your changes update the preview instantly.</p></div><button className="preview-toggle" onClick={() => setPreviewMobile(true)}><Eye size={15}/> Preview</button></div>
        {active === "personal" && <section className="form-card"><div className="form-card-title"><div className="section-icon"><UserRound size={18}/></div><div><h3>Basic information</h3><p>Help employers know who you are and how to reach you.</p></div></div><div className="form-grid two-col">
          <Field label="First name" value={personal.firstName} onChange={(v) => setPersonal({ firstName: v })} placeholder="e.g. Alex"/>
          <Field label="Last name" value={personal.lastName} onChange={(v) => setPersonal({ lastName: v })} placeholder="e.g. Morgan"/>
          <Field label="Professional title" value={personal.professionalTitle} onChange={(v) => setPersonal({ professionalTitle: v })} placeholder="e.g. Product Designer"/>
          <Field label="Email address" value={personal.email} onChange={(v) => setPersonal({ email: v })} placeholder="alex@example.com" type="email"/>
          <Field label="Phone number" value={personal.phone} onChange={(v) => setPersonal({ phone: v })} placeholder="+91 98765 43210" type="tel"/>
          <Field label="Website / portfolio" value={personal.website} onChange={(v) => setPersonal({ website: v })} placeholder="yourportfolio.com"/>
          <Field label="City" value={personal.location.city} onChange={(v) => setPersonal({ location: { city: v } })} placeholder="City"/>
          <Field label="Country / region" value={[personal.location.region, personal.location.country].filter(Boolean).join(", ")} onChange={(v) => setPersonal({ location: { region: "", country: v } })} placeholder="Country"/>
        </div></section>}
        {active === "summary" && <section className="form-card"><div className="form-card-title"><div className="section-icon"><FileText size={18}/></div><div><h3>Professional summary</h3><p>Write a short introduction focused on your strengths and goals.</p></div></div><Field label="Summary" multiline value={personal.summary} onChange={(v) => setPersonal({ summary: v })} placeholder="A few sentences about your experience, strengths, and what you bring to a team."/><div className="helper-row"><span>Tip: 2–4 concise sentences is a good starting point.</span><span>{personal.summary.length} characters</span></div></section>}
        {active === "experience" && <div className="form-stack">{resume.experience.map((item, i) => <section className="form-card" key={item.id}><div className="form-card-title"><div className="section-icon"><BriefcaseBusiness size={18}/></div><div><h3>Experience {i + 1}</h3><p>Add a role, company, and measurable contribution.</p></div><button className="icon-button danger" aria-label="Remove experience" onClick={() => removeExperience(item.id)}><Trash2 size={16}/></button></div><div className="form-grid two-col"><Field label="Job title" value={item.position} onChange={(v) => { updateExperience(item.id, { position: v }); setSaved(false); }} placeholder="e.g. Marketing Associate"/><Field label="Company" value={item.company} onChange={(v) => { updateExperience(item.id, { company: v }); setSaved(false); }} placeholder="Company name"/><Field label="Start date" value={item.startDate} onChange={(v) => updateExperience(item.id, { startDate: v })} placeholder="Jan 2023"/><Field label="End date" value={item.current ? "Present" : item.endDate} onChange={(v) => updateExperience(item.id, { endDate: v, current: v.toLowerCase() === "present" })} placeholder="Present or Dec 2024"/><div className="field full-width"><Field label="Description" value={item.description} onChange={(v) => updateExperience(item.id, { description: v })} multiline placeholder="Describe your impact and responsibilities."/></div></div></section>)}<button className="add-button" onClick={() => { addExperience(); setSaved(false); }}><Plus size={17}/> Add experience</button>{resume.experience.length === 0 && <div className="empty-card"><BriefcaseBusiness size={22}/><strong>No work experience added yet</strong><span>Include internships, volunteering, or relevant projects if you are just starting out.</span></div>}</div>}
        {active === "education" && <div className="form-stack">{resume.education.map((item, i) => <section className="form-card" key={item.id}><div className="form-card-title"><div className="section-icon"><GraduationCap size={18}/></div><div><h3>Education {i + 1}</h3><p>List your most relevant qualifications.</p></div><button className="icon-button danger" aria-label="Remove education" onClick={() => removeEducation(item.id)}><Trash2 size={16}/></button></div><div className="form-grid two-col"><Field label="Institution" value={item.institution} onChange={(v) => updateEducation(item.id, { institution: v })} placeholder="University or school"/><Field label="Degree / qualification" value={item.degree} onChange={(v) => updateEducation(item.id, { degree: v })} placeholder="e.g. Bachelor of Arts"/><Field label="Field of study" value={item.fieldOfStudy} onChange={(v) => updateEducation(item.id, { fieldOfStudy: v })} placeholder="e.g. Economics"/><Field label="Grade (optional)" value={item.grade} onChange={(v) => updateEducation(item.id, { grade: v })} placeholder="e.g. 8.4 CGPA"/><Field label="Start date" value={item.startDate} onChange={(v) => updateEducation(item.id, { startDate: v })} placeholder="2021"/><Field label="End date" value={item.endDate} onChange={(v) => updateEducation(item.id, { endDate: v })} placeholder="2025"/></div></section>)}<button className="add-button" onClick={() => { addEducation(); setSaved(false); }}><Plus size={17}/> Add education</button>{resume.education.length === 0 && <div className="empty-card"><GraduationCap size={22}/><strong>Add your education</strong><span>Include school, college, training, or other relevant qualifications.</span></div>}</div>}
        {active === "skills" && <section className="form-card"><div className="form-card-title"><div className="section-icon"><Sparkles size={18}/></div><div><h3>Skills & strengths</h3><p>Choose skills relevant to the work you want to do.</p></div></div><div className="skill-editor">{resume.skills.map((item) => <div className="skill-row" key={item.id}><input aria-label="Skill name" value={item.name} onChange={(e) => updateSkill(item.id, { name: e.target.value })} placeholder="e.g. Communication"/><button className="icon-button danger" aria-label="Remove skill" onClick={() => removeSkill(item.id)}><Trash2 size={15}/></button></div>)}</div><button className="add-button compact" onClick={() => addSkill()}><Plus size={16}/> Add a skill</button></section>}
        {active === "design" && <section className="form-card"><div className="form-card-title"><div className="section-icon"><Palette size={18}/></div><div><h3>Appearance</h3><p>Simple design choices to make your resume feel like you.</p></div></div><label className="field"><span>Accent color</span><div className="color-options">{["#2563eb", "#0f766e", "#7c3aed", "#c2410c", "#be123c", "#334155"].map((color) => <button key={color} className={`color-swatch ${resume.design.accentColor === color ? "selected" : ""}`} style={{ backgroundColor: color }} aria-label={`Set accent color ${color}`} onClick={() => updateDesign({ accentColor: color })}/>)}</div></label><label className="toggle-row"><span><strong>Show profile photo</strong><small>Use a photo only if it is appropriate for your industry.</small></span><input type="checkbox" checked={resume.design.showPhoto} onChange={(e) => updateDesign({ showPhoto: e.target.checked })}/></label><label className="field"><span>Font size</span><select value={resume.design.fontSize} onChange={(e) => updateDesign({ fontSize: e.target.value as "small" | "medium" | "large" })}><option value="small">Compact</option><option value="medium">Comfortable</option><option value="large">Large</option></select></label><div className="notice"><Sparkles size={16}/><span>More templates and layout controls can be added as the editor grows.</span></div></section>}
        <div className="panel-bottom"><span><Check size={14}/> Your edits update the preview live</span><button className="button button-soft" onClick={() => setActive(navItems[(navItems.findIndex((n) => n.id === active) + 1) % navItems.length].id)}>Next section <ChevronDown size={15} className="rotate-left"/></button></div>
      </main>

      <section className={`preview-panel ${previewMobile ? "preview-mobile-active" : ""}`} aria-label="Live resume preview">
        <div className="preview-toolbar"><div><span className="live-dot"/><strong>Live preview</strong><span className="page-count">A4 · 1 page layout</span></div><button className="icon-button preview-close" aria-label="Close preview" onClick={() => setPreviewMobile(false)}><X size={18}/></button><button className="icon-button" title="Print or save as PDF" onClick={exportResume}><Download size={17}/></button></div>
        <div className="paper-stage"><ResumePreview/></div>
        <div className="preview-footnote"><Eye size={13}/> Preview updates as you type. Use Export PDF to print or save your resume.</div>
      </section>
    </div>
    <div className="mobile-preview-bar"><button className="button button-primary" onClick={() => setPreviewMobile(!previewMobile)}>{previewMobile ? <><X size={16}/> Back to editor</> : <><Eye size={16}/> Preview resume</>}</button></div>
  </div>;
}
