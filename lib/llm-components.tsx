import { createElement, type ReactNode, type ImgHTMLAttributes } from 'react';
import { parseFragment, type DefaultTreeAdapterMap } from 'parse5';
import { asMarkdown } from 'fumadocs-core/server';
import type { MDXComponents } from 'mdx/types';
import type { BadgeProps, ChatMessageProps, MemberCardProps, TeamMember, TeamPageTitleProps, TeamPageSectionProps } from '@/components/content';

// These HTML strings are authored in the repository. Preserve their text/links,
// then let Fumadocs serialize the React elements into Markdown.
function htmlContent(html: string): ReactNode {
  function convert(node: DefaultTreeAdapterMap['childNode'], index: number): ReactNode {
    if (node.nodeName === '#text') return (node as DefaultTreeAdapterMap['textNode']).value;
    if (!('tagName' in node) || ['script', 'style', 'svg'].includes(node.tagName)) return null;
    const attributes = Object.fromEntries(node.attrs.filter(attr => ['href', 'src', 'alt'].includes(attr.name)).map(attr => [attr.name, attr.value]));
    return createElement(node.tagName, { ...attributes, key: index }, ...node.childNodes.map(convert));
  }
  return parseFragment(html).childNodes.map(convert);
}

function Children({ children }: { children?: ReactNode }) {
  asMarkdown();
  return children;
}
function TeamMembers({ members, variant }: { members: TeamMember[]; variant?: 'person' | 'year' }) {
  asMarkdown();
  return members.filter(member => member.name).map((member, index) => <section key={index}>
    <h3>{variant === 'year' ? `${member.title}学年 · ${member.name}` : member.name}</h3>
    <p>{variant === 'year' ? `${member.title}.6–${Number(member.title) + 1}.6` : member.title}{member.org && <> · {member.orgLink ? <a href={member.orgLink}>{member.org}</a> : member.org}</>}</p>
    {member.desc && <p>{htmlContent(member.desc)}</p>}
    <ul>{member.links?.map((link, i) => <li key={i}><a href={link.link.trim()}>{link.ariaLabel ?? (typeof link.icon === 'string' ? link.icon : link.link.trim())}</a></li>)}</ul>
    {member.sponsor && <p><a href={member.sponsor}>{member.actionText ?? 'Sponsor'}</a></p>}
  </section>);
}
function TeamPageTitle({ title, lead, children }: TeamPageTitleProps) {
  asMarkdown();
  return <><h1>{title}</h1><p>{lead}</p>{children}</>;
}
function TeamPageSection({ title, lead, members, children }: TeamPageSectionProps) {
  asMarkdown();
  return <><h2>{title}</h2><p>{lead}</p>{members ?? children}</>;
}
function ChatMessage({ nickname, message, children }: ChatMessageProps) {
  asMarkdown();
  return <blockquote><p><strong>{nickname}</strong></p>{message === undefined ? children : htmlContent(message)}</blockquote>;
}
function MemberCard({ name, description, link, badges, socials }: MemberCardProps) {
  asMarkdown();
  return <section><h3>{link ? <a href={link}>{name}</a> : name}</h3>
    <p>{description}</p><p>{badges?.map(badge => badge.text).join(' · ')}</p>
    <ul>{socials?.map((social, i) => <li key={i}><a href={social.url}>{social.platform}</a></li>)}</ul>
  </section>;
}
function Callout({ title, children }: { title?: string; children?: ReactNode }) {
  asMarkdown();
  return <blockquote>{title && <p><strong>{title}</strong></p>}{children}</blockquote>;
}
function Badge({ text, children }: BadgeProps) {
  asMarkdown();
  return children ?? text;
}
function Image({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) {
  asMarkdown();
  return <img src={src} alt={alt ?? '图片'} />;
}
function HQYearCard({ year, name }: { year: number; name?: string }) {
  asMarkdown();
  return <p><a href={`/about/hq/${year}/`}>{year}学年{ name ? ` · ${name}` : ''}</a>（{year}.6–{year + 1}.6）</p>;
}

/** Public content only: never pass the personnel registry or author mappings. */
export const llmComponents: MDXComponents = {
  ClientOnly: Children, TeamPage: Children, VPTeamPage: Children, HQYearGrid: Children,
  TeamMembers, VPTeamMembers: TeamMembers, TeamPageTitle, VPTeamPageTitle: TeamPageTitle,
  TeamPageSection, VPTeamPageSection: TeamPageSection, ChatMessage, MemberCard, Callout, Badge,
  ZoomableImage: Image, HQYearCard,
};
