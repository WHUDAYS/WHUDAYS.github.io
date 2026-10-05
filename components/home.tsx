import { HomeLayout } from '@fumadocs/base-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { SiteFooter } from './site-footer';

type Hero = { name?: string; text?: string; tagline?: string; image?: { src: string; alt?: string }; actions?: { text: string; link: string; theme?: string }[] };
type Feature = { title: string; details?: string; link?: string };
export function Home({ hero, features = [] }: { hero: Hero; features?: Feature[] }) {
  return <HomeLayout {...baseOptions()}>
    <main id="main-content" className="site-home" data-search-content>
      <section className="home-hero">
        <div className="hero-copy">
          <h1><span className="hero-name">{hero.name}</span><span>{hero.text}</span></h1>
          <p className="hero-tagline">{hero.tagline}</p>
          <div className="hero-actions">{hero.actions?.map((action) => <a className={`hero-action ${action.theme ?? 'alt'}`} href={action.link} key={action.link}>{action.text}</a>)}</div>
        </div>
        {hero.image && <div className="hero-image"><img src={hero.image.src} alt={hero.image.alt ?? hero.name} width={320} height={320} /></div>}
      </section>
      <section className="home-features" aria-label="社团动态">{features.map((feature) => <a className="home-feature" key={feature.title} href={feature.link}>
        <h2>{feature.title}</h2><p>{feature.details}</p>
      </a>)}</section>
      <span data-search-content-end />
    </main>
    <SiteFooter />
  </HomeLayout>;
}
