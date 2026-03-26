import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  GraduationCap,
  Briefcase,
  Code,
  FlaskConical,
  Award,
  Atom,
  ExternalLink,
  ChevronRight,
  Download,
  FileText,
  Users
} from 'lucide-react';
import bibtexParse from 'bibtex-parse-js';
import cvData from './data/cv.json';
import { cn } from './lib/utils';
// @ts-ignore
import bibSource from './data/publications.bib?raw';

// Types for BibTeX
interface Publication {
  citationKey: string;
  entryType: string;
  entryTags: {
    title: string;
    author: string;
    journal?: string;
    year: string;
    abstract?: string;
    doi?: string;
    url?: string;
    abbr?: string;
    selected?: string;
    preview?: string;
    booktitle?: string;
    note?: string;
    address?: string;
  };
}

export default function App() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'selected'>('selected');
  const [currentPage, setCurrentPage] = useState<'home' | 'projects'>('home');

  useEffect(() => {
    try {
      const parsed = bibtexParse.toJSON(bibSource);
      setPublications(parsed);
    } catch (err) {
      console.error('Error parsing bibtex:', err);
    }
  }, []);

  const filteredPubs = publications.filter(pub => {
    const isConference = pub.entryType.toLowerCase() === 'inproceedings';
    if (isConference) return false; // Filter out conferences from the main publications list if desired, or handle separately
    if (activeTab === 'selected') return pub.entryTags.selected === 'true';
    return true;
  });

  const conferences = publications.filter(pub => pub.entryType.toLowerCase() === 'inproceedings');

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} className="font-serif text-xl font-bold tracking-tighter hover:text-accent transition-colors">JY.YANG</button>
          <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-secondary/60 items-center">
            <a href="#about" onClick={() => setCurrentPage('home')} className="hover:text-accent transition-colors">About</a>
            <a href="#education" onClick={() => setCurrentPage('home')} className="hover:text-accent transition-colors">Education</a>
            <a href="#experience" onClick={() => setCurrentPage('home')} className="hover:text-accent transition-colors">Experience</a>
            <a href="#publications" onClick={() => setCurrentPage('home')} className="hover:text-accent transition-colors">Publications</a>
            <a href="#skills" onClick={() => setCurrentPage('home')} className="hover:text-accent transition-colors">Skills</a>
            <button onClick={() => { setCurrentPage('projects'); window.scrollTo(0, 0); }} className={cn("hover:text-accent transition-colors uppercase", currentPage === 'projects' && "text-accent")}>Projects</button>
          </div>
        </div>
      </nav>

      {currentPage === 'home' ? (
        <main className="max-w-5xl mx-auto px-6 py-16 space-y-32">
        {/* Hero Section */}
        <section id="about" className="flex flex-col md:flex-row gap-16 items-center pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Academic Portfolio</span>
              <h1 className="text-4xl md:text-5xl tracking-tight text-foreground sm:text-6xl">
                <span className="font-normal">Ji-Young</span>{" "}
                <span className="font-bold">Yang</span>
              </h1>
            </div>

            <p className="text-xl text-secondary font-light max-w-2xl leading-relaxed">
              {cvData.personal.title}. <br />
              <span className="text-primary/60">Specializing in</span> <span className="font-medium text-primary">Bioinformatics</span>,
              <span className="font-medium text-primary"> Machine Learning</span>, <span className="text-primary/60">and</span>
              <span className="font-medium text-primary"> Biopharmaceutical Formulations</span>.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <ContactLink icon={<Mail size={18} />} href={`mailto:${cvData.personal.email}`} label={cvData.personal.email} />
              <ContactLink icon={<MapPin size={18} />} label={cvData.personal.location} />
              <ContactLink icon={<Linkedin size={18} />} href={cvData.personal.linkedin} label="LinkedIn" />
              <ContactLink icon={<Globe size={18} />} href={cvData.personal.homepage} label="Portfolio" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-accent rounded-2xl rotate-6 group-hover:rotate-3 transition-transform duration-500 opacity-20" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-border shadow-2xl bg-white">
              <img
                src={cvData.personal.image}
                alt={cvData.personal.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="space-y-12">
          <h2 className="section-title"><GraduationCap className="text-accent" /> Education</h2>
          <div className="grid gap-12">
            {cvData.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative pl-12"
              >
                <div className="absolute left-0 top-1 text-accent/20 font-serif text-5xl font-bold group-hover:text-accent/40 transition-colors">
                  0{i + 1}
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                    <h3 className="text-2xl font-bold">{edu.degree}</h3>
                    <span className="text-sm font-mono text-secondary">{edu.period}</span>
                  </div>
                  <p className="text-accent font-medium text-lg">{edu.institution} — {edu.location}</p>
                  <p className="text-secondary/80 max-w-3xl leading-relaxed">{edu.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="space-y-12">
          <h2 className="section-title"><Briefcase className="text-accent" /> Experience</h2>
          <div className="space-y-16">
            {cvData.experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-[200px_1fr] gap-8"
              >
                <div className="space-y-1">
                  <p className="font-mono text-sm text-secondary">{exp.period}</p>
                  <p className="text-xs uppercase tracking-widest text-secondary/50 font-bold">{exp.location}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <p className="text-accent font-medium text-lg">{exp.company}</p>
                  </div>
                  <p className="text-secondary italic leading-relaxed">{exp.description}</p>
                  {exp.achievements && (
                    <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                      {exp.achievements.map((ach, j) => (
                        <li key={j} className="flex gap-3 text-sm text-secondary/80 leading-snug">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          {ach}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="space-y-12 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="section-title mb-0"><FileText className="text-accent" /> Publications</h2>
              <p className="text-secondary/60 text-sm italic">Published 6 peer-reviewed articles (5 first-author) in high-impact physical chemistry journals (Q1-Q2).</p>
            </div>
            <div className="flex bg-border/20 p-1 rounded-full self-start">
              <button
                onClick={() => setActiveTab('selected')}
                className={cn(
                  "px-6 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all",
                  activeTab === 'selected' ? "bg-white shadow-md text-primary" : "text-secondary hover:text-primary"
                )}
              >
                Selected
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={cn(
                  "px-6 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all",
                  activeTab === 'all' ? "bg-white shadow-md text-primary" : "text-secondary hover:text-primary"
                )}
              >
                All Papers
              </button>
            </div>
          </div>

          <div className="grid gap-8">
            {filteredPubs.map((pub, i) => (
              <motion.div
                key={pub.citationKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group p-8 rounded-3xl border border-border bg-white hover:border-accent/30 transition-all duration-500 flex flex-col md:flex-row gap-10"
              >
                <div className="w-full md:w-40 h-40 bg-background rounded-2xl overflow-hidden shrink-0 flex items-center justify-center border border-border/50 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={`images/${pub.entryTags.preview}`}
                    alt={pub.entryTags.title}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=Paper';
                    }}
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      {pub.entryTags.abbr && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-accent text-white">
                          {pub.entryTags.abbr}
                        </span>
                      )}
                      <span className="text-xs font-mono text-secondary/50">{pub.entryTags.year}</span>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight group-hover:text-accent transition-colors">{pub.entryTags.title}</h3>
                  </div>

                  <p className="text-sm text-secondary/80 font-medium">{pub.entryTags.author}</p>

                  <p className="text-xs font-mono text-accent/80 uppercase tracking-wider">
                    {pub.entryTags.journal || pub.entryTags.booktitle}
                  </p>

                  {pub.entryTags.abstract && (
                    <p className="text-sm text-secondary/60 leading-relaxed line-clamp-3 italic">
                      {pub.entryTags.abstract}
                    </p>
                  )}

                  <div className="flex gap-6 pt-4">
                    {pub.entryTags.doi && (
                      <a
                        href={`https://doi.org/${pub.entryTags.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold flex items-center gap-2 hover:text-accent transition-colors"
                      >
                        <ExternalLink size={14} /> DOI
                      </a>
                    )}
                    {pub.entryTags.url && (
                      <a
                        href={pub.entryTags.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold flex items-center gap-2 hover:text-accent transition-colors"
                      >
                        <Globe size={14} /> PUBLISHER
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-12">
          <h2 className="section-title"><Code className="text-accent" /> Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <SkillCategory title="Programming" items={cvData.skills.programming} icon={<Code size={20} />} />
            <SkillCategory title="Computational Chemistry" items={cvData.skills.computational_chemistry} icon={<Atom size={20} />} />
            <SkillCategory title="Lab Techniques" items={cvData.skills.lab_techniques} icon={<FlaskConical size={20} />} />
            <div className="space-y-6">
              <h4 className="font-bold flex items-center gap-3 text-primary text-xl">
                <Globe size={20} className="text-accent" /> Languages
              </h4>
              <div className="space-y-4">
                {cvData.skills.languages.map((lang, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold">{lang.name}</span>
                      <span className="text-xs text-secondary/60">{lang.level}</span>
                    </div>
                    {lang.details && (
                      <p className="text-[10px] text-secondary/50 leading-tight">
                        {lang.details}
                      </p>
                    )}
                    <div className="h-1 bg-border/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: lang.level.includes('Native') ? '100%' : '85%' }}
                        className="h-full bg-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <SkillCategory title="Software" items={cvData.skills.software} icon={<Briefcase size={20} />} />
          </div>
        </section>

        {/* Conferences & Activities */}
        <section className="grid md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h2 className="section-title"><Users className="text-accent" /> Conferences</h2>
            <div className="space-y-10">
              {conferences.map((conf, i) => (
                <div key={i} className="group space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-border text-secondary uppercase tracking-widest">
                      {conf.entryTags.note?.split(' - ')[0] || 'Presentation'}
                    </span>
                    <span className="text-xs font-mono text-secondary/40">{conf.entryTags.year}</span>
                  </div>
                  <h4 className="text-xl font-bold group-hover:text-accent transition-colors leading-tight">{conf.entryTags.title}</h4>
                  <p className="text-sm text-accent font-medium">{conf.entryTags.booktitle} — {conf.entryTags.address}</p>
                  <p className="text-xs text-secondary/60 leading-relaxed">{conf.entryTags.abstract}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="section-title"><Award className="text-accent" /> Activities</h2>
            <div className="space-y-10">
              {cvData.activities.map((act, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-secondary/40">{act.period}</span>
                  </div>
                  <h4 className="text-xl font-bold leading-tight">{act.title}</h4>
                  <p className="text-sm text-accent font-medium">{act.organization}</p>
                  <p className="text-sm text-secondary/70 leading-relaxed">{act.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      ) : (
        <main className="max-w-5xl mx-auto px-6 py-16 space-y-16 min-h-[70vh]">
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Projects</h1>
            <p className="text-xl text-secondary font-light">
              Explore my latest projects below.
            </p>
            <div className="p-16 mt-8 border-2 border-border border-dashed rounded-3xl flex flex-col items-center justify-center bg-white/50 min-h-[400px]">
              <Code size={48} className="text-accent/40 mb-4" />
              <p className="text-secondary/80 font-medium">Projects content is coming soon.</p>
              <p className="text-sm text-secondary/60 mt-2">I am currently preparing detailed case studies to share here.</p>
            </div>
          </section>
        </main>
      )}

      <footer className="border-t border-border py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="font-serif text-3xl font-bold">Let's Connect</h2>
            <p className="text-secondary/60 max-w-xs">Interested in collaboration or research opportunities? Feel free to reach out.</p>
          </div>
          <div className="flex gap-4">
            <SocialButton icon={<Linkedin size={24} />} href={cvData.personal.linkedin} />
            <SocialButton icon={<Mail size={24} />} href={`mailto:${cvData.personal.email}`} />
            <SocialButton icon={<Globe size={24} />} href={cvData.personal.homepage} />
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 pt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-border/50 mt-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
            © {new Date().getFullYear()} Ji-Young Yang. Academic Portfolio.
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">
            Built with React, Tailwind & Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ContactLink({ icon, href, label }: { icon: React.ReactNode, href?: string, label: string }) {
  const content = (
    <div className="flex items-center gap-3 text-sm font-medium text-secondary hover:text-accent transition-all group">
      <span className="text-accent group-hover:scale-110 transition-transform">{icon}</span>
      {label}
    </div>
  );

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  return content;
}

function SkillCategory({ title, items, icon }: { title: string, items: string[], icon: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <h4 className="font-bold flex items-center gap-3 text-primary text-xl">
        <span className="text-accent">{icon}</span> {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white border border-border text-secondary/80 hover:border-accent/50 hover:text-accent transition-all cursor-default">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function SocialButton({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center text-secondary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-sm"
    >
      {icon}
    </a>
  );
}

