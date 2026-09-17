import { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

type Distro = {
  name: string
  slug: string
  description: string
  base: string
  desktop: string
  arch: string
  size: string
  categories: string[]
  logo: string
  download: string
  site: string
  docs: string
}

type DistroSeed = Omit<Distro, 'name' | 'slug' | 'description' | 'base' | 'desktop' | 'arch' | 'size' | 'categories' | 'logo' | 'download' | 'site' | 'docs'>

const distros: Distro[] = [
  { name: 'Ubuntu', slug: 'ubuntu', description: 'A polished Debian-based Linux distribution for desktops, servers, and broad hardware support.', base: 'Debian', desktop: 'GNOME', arch: 'x86_64 / ARM64', size: '~5 GB', categories: ['beginner', 'desktop', 'gaming', 'server'], logo: 'https://assets.ubuntu.com/v1/29985a98-ubuntu-logo32.png', download: 'https://ubuntu.com/download/desktop', site: 'https://ubuntu.com/', docs: 'https://help.ubuntu.com/' },
  { name: 'Linux Mint', slug: 'linux-mint', description: 'A comfortable desktop Linux distribution focused on simplicity and an easy transition from Windows.', base: 'Ubuntu / Debian', desktop: 'Cinnamon', arch: 'x86_64', size: '~3 GB', categories: ['beginner', 'desktop', 'lightweight'], logo: 'https://www.linuxmint.com/web/img/logo.png', download: 'https://www.linuxmint.com/download.php', site: 'https://www.linuxmint.com/', docs: 'https://linuxmint.com/documentation.php' },
  { name: 'Fedora', slug: 'fedora', description: 'A community-driven distribution showcasing current Linux technologies and developer tooling.', base: 'Independent', desktop: 'GNOME', arch: 'x86_64 / ARM64', size: '~3 GB', categories: ['desktop', 'gaming', 'server'], logo: 'https://fedoraproject.org/assets/images/logos/fedora-blue.png', download: 'https://fedoraproject.org/workstation/download/', site: 'https://fedoraproject.org/', docs: 'https://docs.fedoraproject.org/' },
  { name: 'Debian', slug: 'debian', description: 'A stable, universal operating system and a foundation of the wider Linux ecosystem.', base: 'Independent', desktop: 'GNOME / KDE / XFCE', arch: 'x86_64 / ARM64 / ARMHF', size: 'Varies', categories: ['server', 'desktop', 'lightweight'], logo: 'https://www.debian.org/logos/openlogo-nd-75.jpg', download: 'https://www.debian.org/download', site: 'https://www.debian.org/', docs: 'https://www.debian.org/doc/' },
  { name: 'Arch Linux', slug: 'arch', description: 'A minimal rolling-release distribution built around simplicity, user control, and extensive documentation.', base: 'Independent', desktop: 'Choose your own', arch: 'x86_64', size: '~1 GB', categories: ['rolling', 'lightweight', 'gaming'], logo: 'https://archlinux.org/static/logos/archlinux-logo-light-scalable.svg', download: 'https://archlinux.org/download/', site: 'https://archlinux.org/', docs: 'https://wiki.archlinux.org/' },
  { name: 'Manjaro', slug: 'manjaro', description: 'An accessible Arch-based distribution with curated desktop editions and rolling releases.', base: 'Arch', desktop: 'XFCE / KDE / GNOME', arch: 'x86_64 / ARM64', size: '~3 GB', categories: ['rolling', 'gaming', 'beginner'], logo: 'https://manjaro.org/img/logo.svg', download: 'https://manjaro.org/products/download/x86', site: 'https://manjaro.org/', docs: 'https://wiki.manjaro.org/' },
  { name: 'Pop!_OS', slug: 'pop-os', description: 'A productivity-focused Ubuntu-based distribution with a polished workflow and strong hardware support.', base: 'Ubuntu', desktop: 'COSMIC', arch: 'x86_64', size: '~3 GB', categories: ['gaming', 'desktop', 'beginner'], logo: 'https://system76.com/_next/static/media/popos-logo.1b4e2b3c.svg', download: 'https://system76.com/pop/download/', site: 'https://system76.com/pop/', docs: 'https://support.system76.com/' },
  { name: 'Zorin OS', slug: 'zorin', description: 'An Ubuntu-based desktop distribution built to make Linux feel familiar, fast, and approachable.', base: 'Ubuntu', desktop: 'Zorin Desktop', arch: 'x86_64', size: '~3 GB', categories: ['beginner', 'desktop', 'lightweight'], logo: 'https://assets.zorincdn.com/images/logo/zorin-icon.svg', download: 'https://zorin.com/os/download/', site: 'https://zorin.com/os/', docs: 'https://help.zorin.com/' },
  { name: 'Kali Linux', slug: 'kali', description: 'A Debian-based security distribution packed with tools for penetration testing and security research.', base: 'Debian', desktop: 'XFCE', arch: 'x86_64 / ARM64', size: '~4 GB', categories: ['security', 'privacy'], logo: 'https://www.kali.org/images/kali-logo.svg', download: 'https://www.kali.org/get-kali/', site: 'https://www.kali.org/', docs: 'https://www.kali.org/docs/' },
  { name: 'openSUSE', slug: 'opensuse', description: 'A powerful Linux ecosystem known for YaST, Btrfs tooling, and fixed or rolling releases.', base: 'Independent', desktop: 'KDE / GNOME', arch: 'x86_64 / ARM64', size: '~4 GB', categories: ['server', 'desktop', 'rolling'], logo: 'https://en.opensuse.org/images/4/49/Geeko-button.png', download: 'https://get.opensuse.org/', site: 'https://www.opensuse.org/', docs: 'https://doc.opensuse.org/' },
  { name: 'EndeavourOS', slug: 'endeavouros', description: 'A lightweight Arch-based distribution keeping the Arch spirit with a friendly installer and community.', base: 'Arch', desktop: 'XFCE / KDE / GNOME', arch: 'x86_64 / ARM64', size: '~2 GB', categories: ['rolling', 'lightweight', 'gaming'], logo: 'https://endeavouros.com/wp-content/uploads/2021/03/cropped-eos-logo.png', download: 'https://endeavouros.com/latest-release/', site: 'https://endeavouros.com/', docs: 'https://discovery.endeavouros.com/' },
  { name: 'MX Linux', slug: 'mx-linux', description: 'A Debian-based desktop distribution focused on stability, efficiency, and practical administration tools.', base: 'Debian', desktop: 'XFCE', arch: 'x86_64 / AHS', size: '~2.5 GB', categories: ['lightweight', 'beginner', 'desktop'], logo: 'https://mxlinux.org/wp-content/uploads/2020/07/mx-logo.png', download: 'https://mxlinux.org/download-links/', site: 'https://mxlinux.org/', docs: 'https://mxlinux.org/wiki/' },
]

const filters = [['All', 'all'], ['Beginner Friendly', 'beginner'], ['Lightweight', 'lightweight'], ['Gaming', 'gaming'], ['Privacy', 'privacy'], ['Security', 'security'], ['Server', 'server'], ['Rolling Release', 'rolling']]
const wizardOptions = ['beginner', 'gaming', 'security', 'lightweight', 'server', 'rolling']

function ExternalLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
}

function App() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Distro | null>(null)
  const [light, setLight] = useState(false)
  const [wizardGoal, setWizardGoal] = useState('beginner')

  const shown = useMemo(() => {
    const query = q.trim().toLowerCase()
    return distros.filter(d => (filter === 'all' || d.categories.includes(filter)) && (!query || [d.name, d.description, d.desktop, d.base, d.categories.join(' ')].join(' ').toLowerCase().includes(query)))
  }, [q, filter])

  const wizardMatches = useMemo(() => distros.filter(d => d.categories.includes(wizardGoal)).slice(0, 4), [wizardGoal])
  const random = () => setSelected(distros[Math.floor(Math.random() * distros.length)])

  return <div className={light ? 'app light' : 'app'}>
    <nav>
      <a className="brand" href="#top"><span aria-hidden="true">🐧</span> DistroOnTheBase</a>
      <div className="navlinks">
        <a href="#distros">Distributions</a>
        <a href="#wizard">Wizard</a>
        <ExternalLink href="https://github.com/leoyeoh-netizen/DOTB">GitHub ↗</ExternalLink>
        <button onClick={() => setLight(!light)} aria-label="Toggle color theme">{light ? '☾' : '☀'} Theme</button>
      </div>
    </nav>

    <header id="top">
      <div className="eyebrow">● OPEN SOURCE · OFFICIAL DOWNLOAD LINKS</div>
      <h1>Your Linux Downloads,<br /><em>All in One Place.</em></h1>
      <p>Browse and download popular Linux distributions from one centralized, open-source hub. No accounts. No popups. Just the distro you came for.</p>
      <div className="searchrow">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search Linux distributions..." aria-label="Search Linux distributions" />
        <button onClick={random} className="secondary">⤨ Random Distro</button>
      </div>
      <div className="filters" role="group" aria-label="Distribution filters">
        {filters.map(([label, value]) => <button className={filter === value ? 'active' : ''} onClick={() => setFilter(value)} key={value}>{label}</button>)}
      </div>
    </header>

    <main id="distros">
      <div className="sectionhead"><div><small>BROWSE</small><h2>Linux distributions</h2><p>{shown.length} projects matching your filters</p></div></div>
      <div className="grid">
        {shown.map(d => <article className="card" key={d.slug} tabIndex={0} onClick={() => setSelected(d)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected(d) }}>
          <div className="cardtop"><div className="logo"><img src={d.logo} alt="" onError={e => { e.currentTarget.style.display = 'none' }} /></div><div><h3>{d.name}</h3><span>{d.base} · {d.desktop}</span></div></div>
          <p>{d.description}</p>
          <div className="meta"><span>{d.arch}</span><span>{d.size}</span></div>
          <div className="actions"><ExternalLink href={d.download} className="download" >Download ↗</ExternalLink><button onClick={e => { e.stopPropagation(); setSelected(d) }}>Details</button></div>
        </article>)}
      </div>
      {!shown.length && <div className="empty">No distributions found. Try a broader search.</div>}

      <section id="wizard" className="wizard">
        <small>DISTRO WIZARD</small>
        <h2>Find distributions that match your needs.</h2>
        <p>Choose a use case and explore matching projects. The wizard is informational, not a universal “best distro” machine.</p>
        <div className="wizardgrid">
          <select value={wizardGoal} onChange={e => setWizardGoal(e.target.value)} aria-label="Choose a distro use case">
            <option value="beginner">Beginner friendly</option><option value="gaming">Gaming</option><option value="security">Security</option><option value="lightweight">Lightweight</option><option value="server">Server</option><option value="rolling">Rolling release</option>
          </select>
          <div className="matches">{wizardMatches.map(d => <button key={d.slug} onClick={() => setSelected(d)}>{d.name}</button>)}</div>
        </div>
      </section>
    </main>

    <footer><span>© 2026 DistroOnTheBase</span><span>Independent project · Linux trademarks belong to their respective owners.</span><ExternalLink href="https://github.com/leoyeoh-netizen/DOTB">Source on GitHub ↗</ExternalLink></footer>

    {selected && <div className="modal" role="presentation" onClick={() => setSelected(null)}>
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="distro-dialog-title" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={() => setSelected(null)} aria-label="Close details">×</button>
        <div className="cardtop"><div className="logo"><img src={selected.logo} alt="" onError={e => { e.currentTarget.style.display = 'none' }} /></div><div><h2 id="distro-dialog-title">{selected.name}</h2><span>{selected.base} · {selected.desktop}</span></div></div>
        <p className="description">{selected.description}</p>
        <div className="detailgrid"><div><small>ARCHITECTURE</small><b>{selected.arch}</b></div><div><small>ISO SIZE</small><b>{selected.size}</b></div><div><small>DOWNLOAD SOURCE</small><b>Official portal / mirror</b></div></div>
        <div className="modalactions"><ExternalLink href={selected.download}>Download ISO ↗</ExternalLink><ExternalLink href={selected.site}>Official Website ↗</ExternalLink><ExternalLink href={selected.docs}>Documentation ↗</ExternalLink></div>
        <p className="note">DistroOnTheBase does not re-host ISO files. Downloads point to official distribution sources or recognized mirrors.</p>
      </div>
    </div>}
  </div>
}

createRoot(document.getElementById('root')!).render(<App />)
