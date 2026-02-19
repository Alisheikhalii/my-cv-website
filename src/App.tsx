import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReactToPrint } from 'react-to-print';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  ExternalLink, 
  Globe, 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  Award, 
  BookOpen, 
  FileText,
  ChevronRight,
  ChevronLeft,
  Download,
  Github,
  Search,
  Zap,
  ShieldCheck,
  Code
} from 'lucide-react';
import { Language } from './types';
import { resumeContent } from './constants';

export default function App() {
  const [lang, setLang] = useState<Language>(Language.EN);
  const data = resumeContent[lang];
  const isRtl = lang === Language.FA;
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `${data.name} - Resume`,
  });

  const toggleLang = () => {
    setLang(prev => prev === Language.EN ? Language.FA : Language.EN);
  };

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className={`flex items-center gap-3 mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
      <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
      <div className="flex-1 h-[1px] bg-amber-200 ml-4"></div>
    </div>
  );

  return (
    <div ref={contentRef} className={`min-h-screen ${isRtl ? 'rtl' : 'ltr'} transition-all duration-300 bg-[#fffcf5]`}>
      {/* Header Image Section */}
      <div className="h-80 w-full relative overflow-hidden no-print">
        <img 
          src="/header.png" 
          alt="AI & Tech Header"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent"></div>
      </div>

      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-bottom border-slate-100 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-xl tracking-tighter text-amber-600"
          >
            {isRtl ? 'علی شیخ‌علی' : 'Ali Sheikhali'}
          </motion.div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handlePrint()}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-all text-sm font-medium shadow-sm no-print"
            >
              <Download size={16} />
              {isRtl ? 'دانلود PDF' : 'Download PDF'}
            </button>
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:border-amber-500 hover:text-amber-600 transition-all text-sm font-medium no-print"
            >
              <Globe size={16} />
              {lang === Language.EN ? 'فارسی' : 'English'}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative -mt-24 pb-20 px-6 max-w-5xl mx-auto z-10">
        {/* Hero Section */}
        <section className="mb-24 bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 shadow-2xl shadow-amber-900/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-slate-900 leading-tight">
                  {data.name}
                </h1>
                <p className="text-xl md:text-2xl text-amber-600 font-medium mb-8 leading-relaxed">
                  {data.title}
                </p>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-10">
                  {data.about}
                </p>
                
                <div className="flex flex-wrap gap-4 no-print">
                  <a 
                    href={`mailto:${data.contact.email}`}
                    className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl hover:bg-amber-600 transition-all transform hover:-translate-y-1 shadow-xl shadow-slate-200"
                  >
                    <Mail size={20} />
                    {isRtl ? 'تماس با من' : 'Contact Me'}
                  </a>
                  <div className="flex gap-3">
                    <a 
                      href={`https://${data.contact.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-slate-200 rounded-2xl hover:border-amber-500 hover:text-amber-600 transition-all bg-white shadow-sm"
                    >
                      <Linkedin size={24} />
                    </a>
                    <a 
                      href={`https://${data.contact.orcid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-slate-200 rounded-2xl hover:border-amber-500 hover:text-amber-600 transition-all bg-white shadow-sm"
                    >
                      <FileText size={24} />
                    </a>
                  </div>
                </div>

                {/* Print-only contact info */}
                <div className="hidden print:block mt-6 space-y-2 text-slate-600 border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-amber-600" />
                    <span>{data.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-amber-600" />
                    <span dir="ltr">{data.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} className="text-amber-600" />
                    <span>{data.contact.linkedin}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-amber-600" />
                    <span>{data.contact.orcid}</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-square w-40 h-40 md:w-52 md:h-52 mx-auto rounded-full overflow-hidden bg-slate-100 border-8 border-white shadow-2xl"
            >
              <img 
                src="/profile.jpg" 
                alt={data.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/ali-profile/600/600';
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-amber-600/5 mix-blend-multiply"></div>
            </motion.div>
          </div>
        </section>

        {/* Research Interests Section */}
        <section className="mb-24">
          <SectionTitle icon={Search} title={isRtl ? 'علاقه‌مندی‌های پژوهشی' : 'Research Interests'} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.researchInterests.map((interest, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mt-1 text-amber-500">
                  <Zap size={20} />
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{interest}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-24">
          <SectionTitle icon={Briefcase} title={isRtl ? 'تجربیات حرفه‌ای و پژوهشی' : 'Professional & Research Experience'} />
          <div className="space-y-12">
            {data.experience.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-slate-100 hover:border-amber-200 transition-colors"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-amber-500"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                      {exp.link && (
                        <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-600">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                    <p className="text-amber-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm font-mono text-slate-400 mt-2 md:mt-0">
                    {exp.period} | {exp.location}
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-slate-600 flex gap-2">
                      <span className="text-amber-500 mt-1.5">•</span>
                      {desc}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Research Projects Section */}
        <section className="mb-24">
          <SectionTitle icon={Code} title={isRtl ? 'پروژه‌های پژوهشی' : 'Research Projects'} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.researchProjects.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-amber-200 transition-all"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">{project.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-24">
          <SectionTitle icon={GraduationCap} title={isRtl ? 'تحصیلات' : 'Education'} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.education.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-white border border-slate-100 rounded-2xl hover:shadow-xl hover:shadow-amber-900/5 transition-all"
              >
                <div className="text-sm font-mono text-amber-600 mb-2">{edu.period}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{edu.degree}</h3>
                <p className="text-slate-500 text-sm mb-4">{edu.institution}</p>
                {edu.details && (
                  <div className="text-xs bg-amber-50/30 p-3 rounded-lg text-slate-600 italic">
                    {edu.details}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-24">
          <SectionTitle icon={Cpu} title={isRtl ? 'مهارت‌ها' : 'Skills'} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {data.skills.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5">{group.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-5 py-2.5 bg-white border border-slate-100 rounded-2xl text-sm font-medium text-slate-700 hover:border-amber-500 hover:text-amber-600 transition-all cursor-default shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Courses Section */}
        <section className="mb-24">
          <SectionTitle icon={Zap} title={isRtl ? 'دوره‌ها و توسعه حرفه‌ای' : 'Courses & Professional Development'} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.courses.map((course, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm"
              >
                <ShieldCheck size={18} className="text-amber-500 shrink-0" />
                <span className="text-sm text-slate-700 font-medium">{course}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Research & Publications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <section>
            <SectionTitle icon={BookOpen} title={isRtl ? 'انتشارات و پتنت‌ها' : 'Publications & Patents'} />
            <div className="space-y-8">
              {data.publications.map((pub, idx) => (
                <div key={idx} className="group p-2">
                  <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-tight">{pub.title}</h4>
                  <p className="text-sm text-slate-500 mt-2">{pub.authors}</p>
                  <p className="text-xs font-mono text-slate-400 mt-2">{pub.source} ({pub.year})</p>
                </div>
              ))}
              {data.patents.map((pat, idx) => (
                <div key={idx} className="p-6 bg-amber-50/50 rounded-2xl border border-amber-100 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-tighter bg-amber-100 text-amber-700 px-3 py-1 rounded-full">Patent {pat.status}</span>
                    <span className="text-xs font-mono text-slate-400">{pat.year}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-relaxed">{pat.title}</h4>
                  <p className="text-xs text-slate-500 mt-2">{pat.location}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle icon={Award} title={isRtl ? 'افتخارات و جوایز' : 'Honors & Awards'} />
            <div className="space-y-8">
              {data.awards.map((award, idx) => (
                <div key={idx} className="flex gap-5 p-2">
                  <div className="mt-1 shrink-0">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Award size={20} className="text-amber-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{award.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{award.organization} ({award.year})</p>
                    {award.description && <p className="text-xs text-slate-400 mt-2 italic leading-relaxed">{award.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="pt-20 border-t border-slate-100 text-center no-print">
          <div className="flex justify-center gap-8 mb-10">
            <a href={`mailto:${data.contact.email}`} className="text-slate-400 hover:text-amber-600 transition-all transform hover:scale-110"><Mail size={24} /></a>
            <a href={`https://${data.contact.linkedin}`} className="text-slate-400 hover:text-amber-600 transition-all transform hover:scale-110"><Linkedin size={24} /></a>
            <a href={`https://${data.contact.orcid}`} className="text-slate-400 hover:text-amber-600 transition-all transform hover:scale-110"><FileText size={24} /></a>
          </div>
          <p className="text-sm text-slate-400 font-medium">
            © {new Date().getFullYear()} {data.name}. {isRtl ? 'تمامی حقوق محفوظ است.' : 'All rights reserved.'}
          </p>
        </footer>
      </main>
    </div>
  );
}
