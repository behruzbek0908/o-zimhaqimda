import { useEffect, useState } from 'react'
import {
  ArrowUpRight, CalendarDays, Code2, ExternalLink, Globe2,
  Mail, MapPin, Menu, Moon, Send, Sparkles, Sun, Terminal, X,
} from 'lucide-react'
import CustomCursor from './CustomCursor'

const telegramUrl = 'https://t.me/Umarjonov_Behruz'
const githubUrl = 'https://github.com'

const skills = [
  { name: 'HTML5', mark: 'HTML', color: 'bg-orange-500' },
  { name: 'CSS3', mark: 'CSS', color: 'bg-blue-500' },
  { name: 'JavaScript ES6+', mark: 'JS', color: 'bg-yellow-400 text-slate-950' },
  { name: 'React.js', mark: 'RE', color: 'bg-cyan-400 text-slate-950' },
  { name: 'Node.js', mark: 'NO', color: 'bg-emerald-500' },
  { name: 'TaybScript ', mark: 'TA', color: 'bg-sky-400 text-slate-950' },
]

const projects = [
  {
    title: 'Digital Agency', description: 'Brendlar uchun zamonaviy, tezkor va moslashuvchan marketing platformasi.',
    tags: ['React', 'Tailwind CSS'], accent: 'from-cyan-400 to-blue-600', code: 'DA',
  },
  {
    title: 'Task Flow', description: 'Jamoa ishlarini rejalashtirish va kuzatish uchun qulay boshqaruv paneli.',
    tags: ['JavaScript', 'CSS3'], accent: 'from-violet-400 to-fuchsia-600', code: 'TF',
  },
  {
    title: 'Shop Space', description: 'Zamonaviy mahsulotlar katalogi va intuitiv xarid qilish tajribasi.',
    tags: ['React', 'Node.js'], accent: 'from-orange-400 to-rose-500', code: 'SS',
  },
]

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') !== 'light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const handleSubmit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    setSent(true)
    window.setTimeout(() => setSent(false), 3500)
  }

  const links = [
    ['Bosh sahifa', '#home'], ['Men haqimda', '#about'], ['Ko‘nikmalar', '#skills'],
    ['Loyihalar', '#projects'], ['Aloqa', '#contact'],
  ]

  return (
    <div className="overflow-hidden">
      <CustomCursor />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-[#f4f7fb]/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1120]/85">
        <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Asosiy navigatsiya">
          <a href="#home" className="flex items-center gap-3 font-[Space_Grotesk] text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-950 text-white dark:bg-cyan-400 dark:text-slate-950">UB</span>
            <span className="hidden sm:inline">Behruzbek</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {links.slice(1).map(([label, href]) => (
              <a key={href} href={href} className="text-sm font-semibold text-slate-600 transition hover:text-cyan-500 dark:text-slate-300">{label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:scale-105 dark:border-white/10 dark:bg-white/5 dark:text-white" aria-label="Mavzuni almashtirish">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center md:hidden" aria-label="Menyuni ochish">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-[#0b1120] md:hidden">
            {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block py-3 font-semibold">{label}</a>)}
          </div>
        )}
      </header>

      <main>
        <section id="home" className="relative min-h-screen pt-28">
          <div className="absolute left-[-8rem] top-40 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-6xl items-center gap-14 px-5 py-12 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:py-16">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-bold text-cyan-700 dark:text-cyan-300">
                <Sparkles size={16} /> Mavjud bo‘lishga tayyor
              </div>
              <p className="mb-3 text-lg font-bold text-cyan-600 dark:text-cyan-400">Frontend dasturchi</p>
              <h1 className="max-w-3xl font-[Space_Grotesk] text-5xl font-bold leading-[0.95] tracking-normal sm:text-7xl lg:text-8xl">
                Umarjonov <span className="text-cyan-500">Behruzbek</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">Zamonaviy, tezkor va foydalanuvchi uchun qulay veb-ilovalar yaratuvchi Frontend dasturchi.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={telegramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-bold text-white transition hover:-translate-y-1 dark:bg-cyan-400 dark:text-slate-950">Telegram <Send size={18} /></a>
                <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 font-bold transition hover:-translate-y-1 dark:border-white/20"><Globe2 size={18} /> GitHub</a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[390px]">
              <div className="absolute -inset-7 rounded-[3rem] border border-cyan-400/20" />
              <div className="animate-float relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl shadow-cyan-500/20 dark:bg-white/[0.06]">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.18) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="relative text-center">
                  <div className="mx-auto grid h-32 w-32 place-items-center rounded-full border border-cyan-300/40 bg-cyan-400/10 text-cyan-300"><Code2 size={68} strokeWidth={1.5} /></div>
                  <p className="mt-6 font-[Space_Grotesk] text-xl font-bold text-white">{'< Frontend />'}</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-xl border border-white/10 bg-white px-5 py-3 text-slate-950 shadow-xl dark:bg-slate-900 dark:text-white"><b className="block text-xl">1 yil</b><span className="text-xs text-slate-500 dark:text-slate-400">tajriba</span></div>
            </div>
          </div>
        </section>

        <section id="about" className="py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[.2em] text-cyan-600 dark:text-cyan-400">Men haqimda</p>
                <h2 className="font-[Space_Grotesk] text-4xl font-bold sm:text-5xl">Kod orqali fikrlarni haqiqatga aylantiraman.</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Info icon={<CalendarDays />} title="Tug‘ilgan sana" text="2013-yil" />
                <Info icon={<MapPin />} title="Manzil" text="Farg‘ona vil., Buvayda t., Poshopirim qishlog‘i" />
                <Info icon={<Terminal />} title="Tajriba" text="Frontend dasturlash bo‘yicha 1 yil" />
                <Info icon={<Globe2 />} title="Maqsad" text="Zamonaviy va mukammal loyihalar yaratish" />
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="bg-white py-24 dark:bg-white/[0.025]">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading eyebrow="Texnologiyalar" title="Ko‘nikmalarim" />
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {skills.map((skill) => (
                <div key={skill.name} className="group rounded-lg border border-slate-200 bg-[#f4f7fb] p-5 text-center transition duration-300 hover:-translate-y-2 hover:border-cyan-400 dark:border-white/10 dark:bg-[#111827]">
                  <div className={`mx-auto grid h-16 w-16 place-items-center rounded-xl text-sm font-black text-white shadow-lg transition group-hover:scale-110 ${skill.color}`}>{skill.mark}</div>
                  <h3 className="mt-5 text-sm font-bold sm:text-base">{skill.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeading eyebrow="Portfolio" title="Tanlangan loyihalar" />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <article key={project.title} className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition duration-300 hover:-translate-y-2 dark:border-white/10 dark:bg-[#111827]">
                  <div className={`relative grid aspect-[16/10] place-items-center overflow-hidden bg-gradient-to-br ${project.accent}`}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                    <span className="font-[Space_Grotesk] text-6xl font-bold text-white/90">{project.code}</span>
                    <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">0{index + 1}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-[Space_Grotesk] text-xl font-bold">{project.title}</h3>
                    <p className="mt-3 min-h-20 text-sm leading-6 text-slate-600 dark:text-slate-400">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-white/10">{tag}</span>)}</div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 py-2.5 text-sm font-bold dark:border-white/20"><Globe2 size={16} /> GitHub</a>
                      <a href="#" className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 py-2.5 text-sm font-bold text-white dark:bg-cyan-400 dark:text-slate-950">Demo <ExternalLink size={16} /></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-slate-950 py-24 text-white dark:bg-black/30">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[.2em] text-cyan-400">Bog‘lanish</p>
              <h2 className="font-[Space_Grotesk] text-4xl font-bold sm:text-5xl">Birga ajoyib loyiha yaratamiz.</h2>
              <p className="mt-5 max-w-md leading-7 text-slate-400">Savolingiz yoki taklifingiz bormi? Telegram orqali tezkor bog‘lanishingiz mumkin.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={telegramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 font-bold text-slate-950"><Send size={18} /> Telegram</a>
                <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 font-bold"><Globe2 size={18} /> GitHub</a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="rounded-lg border border-white/10 bg-white/5 p-5 sm:p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">Ism<input required name="name" className="mt-2 w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-400" /></label>
                <label className="text-sm font-semibold">Email<input required name="email" type="email" className="mt-2 w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-400" /></label>
              </div>
              <label className="mt-5 block text-sm font-semibold">Xabar<textarea required name="message" rows="5" className="mt-2 w-full resize-none rounded-md border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-400" /></label>
              <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-md bg-cyan-400 px-5 py-3 font-bold text-slate-950"><Mail size={18} /> Xabar yuborish</button>
              {sent && <p className="mt-4 text-sm font-semibold text-cyan-300" role="status">Xabaringiz qabul qilindi.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-center text-sm sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Umarjonov Behruzbek</p>
          <a href="#home" className="inline-flex items-center gap-1 font-bold text-white">Boshiga qaytish <ArrowUpRight size={16} /></a>
        </div>
      </footer>
    </div>
  )
}

function Info({ icon, title, text }) {
  return <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"><div className="mb-4 text-cyan-500">{icon}</div><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{text}</p></div>
}

function SectionHeading({ eyebrow, title }) {
  return <div><p className="mb-3 text-sm font-bold uppercase tracking-[.2em] text-cyan-600 dark:text-cyan-400">{eyebrow}</p><h2 className="font-[Space_Grotesk] text-4xl font-bold sm:text-5xl">{title}</h2></div>
}

export default App
