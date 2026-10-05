import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PLACEHOLDER_AVATAR } from '@/lib/people';
import './archive-cards.css';
import './hq-years.css';

export function HQYearGrid({ children }: { children: ReactNode }) {
  return <div className="hq-year-grid archive-card-grid not-prose">{children}</div>;
}

export function HQYearCard({ year, name, avatar }: {
  year: number;
  name?: string;
  avatar?: string;
}) {
  return <article className="hq-year-card archive-card">
    <a className="hq-year-link" href={`/about/hq/${year}/`} aria-label={`${year}学年 HQ 详情页`}>
      <img className="archive-card-avatar" src={avatar || PLACEHOLDER_AVATAR} alt={`${year}学年 HQ 头像`} width={80} height={80} loading="lazy" />
      <h2 className="archive-card-title" id={`_${year}学年`}>{year}学年</h2>
      <p className="hq-year-name archive-card-subtitle">{name}</p>
      <p className="archive-card-term">{year}.6–{year + 1}.6</p>
      <ArrowUpRight className="hq-year-arrow" size={20} aria-hidden="true" />
    </a>
  </article>;
}
