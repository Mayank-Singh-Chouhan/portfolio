import { useEffect, useRef, type ReactNode } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

const img = (name: string) => `${import.meta.env.BASE_URL}img/${name}`

/** Reveal-on-scroll: adds `.in` once an element enters view. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Already on screen at load: reveal without waiting on the observer.
    const r = el.getBoundingClientRect()
    const onScreen = r.top < window.innerHeight * 0.92 && r.bottom > 0
    const t = onScreen ? window.setTimeout(() => el.classList.add('in'), 60) : 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => {
      window.clearTimeout(t)
      io.disconnect()
    }
  }, [])
  return ref
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`reveal-text ${className}`}>
      {children}
    </div>
  )
}

type SculptureProps = {
  src: string
  alt: string
  ratio: string
  position?: string
  rest?: [number, number]
  small?: boolean
  className?: string
}

/**
 * A photograph printed in two inks. A moving "raking light" burns a hole in
 * the print so the real marble shows through. Follows the pointer; drifts on
 * its own on touch screens and when the pointer is idle.
 */
function Sculpture({ src, alt, ratio, position = 'center', rest = [55, 38], small, className = '' }: SculptureProps) {
  const box = useRef<HTMLDivElement>(null)
  const revealRef = useReveal<HTMLDivElement>()
  const fill = ratio === 'fill'

  useEffect(() => {
    const el = box.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--lx', `${rest[0]}%`)
      el.style.setProperty('--ly', `${rest[1]}%`)
      return
    }

    let tx = rest[0]
    let ty = rest[1]
    let x = tx
    let y = ty
    let lastMove = 0
    let raf = 0
    let visible = false

    const tick = (t: number) => {
      if (t - lastMove > 2600) {
        tx = rest[0] + Math.sin(t / 2300) * 22
        ty = rest[1] + Math.cos(t / 3100) * 18
      }
      x += (tx - x) * 0.08
      y += (ty - y) * 0.08
      el.style.setProperty('--lx', `${x.toFixed(2)}%`)
      el.style.setProperty('--ly', `${y.toFixed(2)}%`)
      raf = visible ? requestAnimationFrame(tick) : 0
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(tick)
    })
    io.observe(el)

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const r = el.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width) * 100
      ty = ((e.clientY - r.top) / r.height) * 100
      lastMove = performance.now()
    }
    el.addEventListener('pointermove', onMove)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
    }
  }, [rest])

  return (
    <div
      ref={revealRef}
      className={`reveal-media ${fill ? 'fill' : ''} ${small ? 'light-small' : ''} ${className}`}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <div ref={box} className="sculpture" style={{ position: 'absolute', inset: 0 }}>
        <img src={src} alt={alt} style={{ objectPosition: position }} loading="eager" decoding="async" />
        <img className="print" src={src} alt="" aria-hidden="true" style={{ objectPosition: position }} loading="eager" decoding="async" />
        <span className="rim" />
      </div>
    </div>
  )
}

/** SVG filter: luminance mapped from cobalt (shadow) to lemon (light). */
function Inks() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <filter id="duotone" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.33 0.5 0.17 0 0  0.33 0.5 0.17 0 0  0.33 0.5 0.17 0 0  0 0 0 1 0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="1.75" intercept="-0.3" />
          <feFuncG type="linear" slope="1.75" intercept="-0.3" />
          <feFuncB type="linear" slope="1.75" intercept="-0.3" />
        </feComponentTransfer>
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.078 0.949" />
          <feFuncG type="table" tableValues="0.106 0.925" />
          <feFuncB type="table" tableValues="0.65 0.545" />
        </feComponentTransfer>
      </filter>
    </svg>
  )
}

const Arrow = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 10h13M11 4l6 6-6 6" />
  </svg>
)

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

function Nav() {
  return (
    <header className="nav">
      <span className="caps name">Mayank Singh Chouhan</span>
      <nav aria-label="Rooms">
        <ul>
          {[
            ['hall', 'Hall'],
            ['exhibits', 'Work'],
            ['materials', 'Skills'],
            ['desk', 'Contact'],
          ].map(([id, label]) => (
            <li key={id}>
              <button className="caps" onClick={() => go(id)}>
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

function Hall() {
  return (
    <section className="hall" id="hall" aria-label="Introduction">
      <div className="hall-copy">
        <div className="plaque">
          <span className="caps">Designer-engineer</span>
          <span className="caps">Frontend, Botsync</span>
          <span className="caps">Bengaluru, India</span>
        </div>
        <div>
          <h1>
            <span>Mayank</span>
            <span>Singh</span>
            <span>Chouhan</span>
          </h1>
          <p className="lede" style={{ marginTop: '1.6rem' }}>
            I design the interface and write the code behind it: workflow builders, editors, browser extensions.
          </p>
          <div className="hall-actions">
            <button className="btn caps" onClick={() => go('desk')}>
              Contact <Arrow />
            </button>
            <a className="caps" href="mailto:email.mayanksinghchouhan@gmail.com" style={{ textUnderlineOffset: '0.35em' }}>
              Email me
            </a>
            <button className="caps" onClick={() => go('exhibits')} style={{ textDecoration: 'underline', textUnderlineOffset: '0.35em' }}>
              See the work
            </button>
          </div>
        </div>
      </div>
      <div className="hall-bust">
        <Sculpture
          src={img('antinous-bust.jpg')}
          alt="Marble bust of Antinous, curly hair, head turned slightly to the right"
          ratio="fill"
          position="50% 18%"
          rest={[58, 44]}
          small
        />
      </div>
      <span className="caps hint" aria-hidden="true">
        Move to light the marble
      </span>
    </section>
  )
}

function Exhibits() {
  return (
    <div id="exhibits">
      {/* Exhibit: Botsync */}
      <section className="room room--blue" aria-labelledby="ex-syncos">
        <div className="exhibit">
          <figure>
            <Sculpture
              src={img('laocoon.jpg')}
              alt="Marble group of Laocoön and his two sons wrestled by sea serpents"
              ratio="1920 / 2086"
              rest={[50, 28]}
            />
            <figcaption className="caps">Shown with: Laocoön and His Sons, Vatican Museums</figcaption>
          </figure>
          <div className="wall">
            <Reveal>
              <h2 id="ex-syncos">SyncOS Integrator</h2>
            </Reveal>
            <Reveal className="label">
              <span className="caps when">Botsync · SDE I, Frontend · May 2025 to present</span>
              <p>
                A no-code platform for orchestrating robotic and software systems. I build its interface: a node-based automation builder on React Flow, a rich-text editor on Draft.js, and an AI feature that analyses workflows.
              </p>
              <dl>
                <div>
                  <dt className="caps">Behind the glass</dt>
                  <dd>An MCP server for AI tools, a ROS telemetry service on QuestDB, Cypress end-to-end tests, and the migration from Axios to RTK Query.</dd>
                </div>
                <div>
                  <dt className="caps">Medium</dt>
                  <dd>React, TypeScript, React Flow, Draft.js, RTK Query, Cypress, QuestDB</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Exhibit: Forescribe */}
      <section className="room room--lemon" aria-labelledby="ex-forescribe">
        <div className="exhibit exhibit--flip">
          <figure>
            <Sculpture
              src={img('nike.jpg')}
              alt="Headless winged marble figure of Nike standing on the prow of a ship"
              ratio="1920 / 2675"
              rest={[48, 32]}
            />
            <figcaption className="caps">Shown with: Winged Victory of Samothrace, Louvre</figcaption>
          </figure>
          <div className="wall">
            <Reveal>
              <h2 id="ex-forescribe">Forescribe</h2>
            </Reveal>
            <Reveal className="label">
              <span className="caps when">Intern, SDE I, SDE II · Jan 2024 to May 2025</span>
              <p>
                From intern to SDE II. I led the frontend of the browser extension and mentored engineers, and built budgeting modules, API integrations and Firebase file uploads. Earlier I redesigned onboarding and shipped Next.js landing pages and a Mailchimp newsletter flow.
              </p>
              <dl>
                <div>
                  <dt className="caps">Medium</dt>
                  <dd>React, Next.js, Firebase, Apollo Client</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Exhibit: Foundations */}
      <section className="room room--red" aria-labelledby="ex-found">
        <div className="exhibit exhibit--narrow">
          <figure>
            <Sculpture
              src={img('venus.jpg')}
              alt="Marble torso of the Venus de Milo, armless, head turned to the left"
              ratio="1920 / 2535"
              position="50% 20%"
              rest={[46, 22]}
            />
            <figcaption className="caps">Shown with: Venus de Milo, Louvre</figcaption>
          </figure>
          <div className="wall">
            <Reveal>
              <h2 id="ex-found">Foundations</h2>
            </Reveal>
            <Reveal className="label">
              <span className="caps when">2019 to 2023</span>
              <p>
                B.E. in Computer Science, Dr. CV Raman University, CGPA 8.5 out of 10. Then LTIMindtree as a Graduate Engineer Trainee, full-stack .NET training, February to April 2023.
              </p>
              <dl>
                <div>
                  <dt className="caps">Also practised</dt>
                  <dd>
                    Competitive programming on{' '}
                    <a href="https://leetcode.com/u/mayanksinghchouhan/" target="_blank" rel="noreferrer">
                      LeetCode
                    </a>{' '}
                    and Codeforces.
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}

const MATERIALS: [string, string[]][] = [
  ['Languages', ['JavaScript', 'TypeScript', 'C', 'C++']],
  ['Interfaces', ['React', 'Next.js', 'Redux Toolkit, RTK Query, Zustand', 'Apollo Client', 'React Flow, Draft.js', 'Tailwind CSS, Material UI, SASS']],
  ['Proof', ['Cypress', 'Puppeteer', 'Jest']],
  ['Workshop', ['Express.js', 'QuestDB', 'Firebase SDK', 'Docker', 'Git, GitHub', 'Postman']],
  ['AI tooling', ['MCP', 'Claude, Claude Code', 'OpenAI Codex, ChatGPT', 'Gemini']],
]

function Materials() {
  return (
    <section className="room room--plaster" id="materials" aria-labelledby="mat-h">
      <div className="materials">
        <Reveal className="mat-title">
          <h2 id="mat-h">Skills and tools</h2>
        </Reveal>
        <div className="sets">
          {MATERIALS.map(([title, items]) => (
            <div className="set" key={title}>
              <h3 className="caps">{title}</h3>
              <ul>
                {items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Desk() {
  return (
    <section className="room room--blue" id="desk" aria-labelledby="desk-h">
      <div className="desk">
        <Reveal className="desk-title">
          <h2 id="desk-h">
            <span>The desk</span>
            <span>is open.</span>
          </h2>
        </Reveal>
        <ul>
          <li>
            <a href="mailto:email.mayanksinghchouhan@gmail.com">
              <span className="caps">Email</span>
              <span className="value">email.mayanksinghchouhan@gmail.com</span>
              <Arrow />
            </a>
          </li>
          <li>
            <a href="tel:+919171526303">
              <span className="caps">Phone</span>
              <span className="value">+91 91715 26303</span>
              <Arrow />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/mayank-chouhan-721306221/" target="_blank" rel="noreferrer">
              <span className="caps">LinkedIn</span>
              <span className="value">mayank-chouhan</span>
              <Arrow />
            </a>
          </li>
          <li>
            <a href="https://github.com/Mayank-Singh-Chouhan" target="_blank" rel="noreferrer">
              <span className="caps">GitHub</span>
              <span className="value">Mayank-Singh-Chouhan</span>
              <Arrow />
            </a>
          </li>
          <li>
            <a href="https://x.com/Mayank_S_C" target="_blank" rel="noreferrer">
              <span className="caps">X</span>
              <span className="value">@Mayank_S_C</span>
              <Arrow />
            </a>
          </li>
          <li>
            <a href="https://docs.google.com/document/d/1Lkkw7uibnV-RCDj3k_vS8dihuktliYT5ixVEpIaL40g" target="_blank" rel="noreferrer">
              <span className="caps">Résumé</span>
              <span className="value">Read the full résumé</span>
              <Arrow />
            </a>
          </li>
        </ul>
        <p className="visit-note">Based in Bengaluru, India.</p>
      </div>
      <div className="credits caps">
        <span>Photographs from Wikimedia Commons, all CC0 (public domain dedication)</span>
        <span>
          {[
            ['Antinous, National Archaeological Museum, Athens', 'Antinous_detail_bust_NAMAthens.jpg'],
            ['Laocoön group, Vatican', 'Laoco%C3%B6n_and_his_sons_group.jpg'],
            ['Nike of Samothrace, Louvre', 'Nike_of_Samothrace_from_Paris.jpg'],
            ['Venus de Milo, Louvre', 'Venus_de_Milo_from_Paris_Project,_44.jpg'],
          ].map(([label, file], i) => (
            <span key={file}>
              {i > 0 && ' · '}
              <a href={`https://commons.wikimedia.org/wiki/File:${file}`} target="_blank" rel="noreferrer">
                {label}
              </a>
            </span>
          ))}
        </span>
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <Inks />
      <Nav />
      <main>
        <Hall />
        <Exhibits />
        <Materials />
        <Desk />
      </main>
    </>
  )
}

// HashRouter: GitHub Pages has no SPA fallback, so history routing would 404 on refresh
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}
