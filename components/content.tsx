import type { HTMLAttributes, ReactNode } from 'react';
import { PLACEHOLDER_AVATAR } from '../lib/people.js';
import * as icons from '../lib/icons.js';
import './archive-cards.css';
import './content.css';

const classes = (...values: Array<string | undefined | false>) =>
  values.filter(Boolean).join(' ');

/** The former ClientOnly content is now safe to render on the server. */
export function ClientOnly({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

export interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  avatar?: string;
  nickname?: string;
  /** Trusted, repository-authored HTML, matching the original message format. */
  message?: string;
  position?: 'left' | 'right';
}

export function ChatMessage({
  avatar = PLACEHOLDER_AVATAR,
  nickname,
  message,
  position = 'left',
  className,
  children,
  ...props
}: ChatMessageProps) {
  return (
    <div
      {...props}
      className={classes('ChatMessage', 'not-prose', className)}
      data-position={position}
    >
      <img className="chat-avatar" src={avatar || PLACEHOLDER_AVATAR} alt={nickname || 'Avatar'} width={50} height={50} loading="lazy" />
      <div className="chat-content">
        {nickname && <div className="chat-nickname">{nickname}</div>}
        {message === undefined ? (
          <div className="message-bubble">{children}</div>
        ) : (
          <div className="message-bubble" dangerouslySetInnerHTML={{ __html: message }} />
        )}
      </div>
    </div>
  );
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  text?: string;
  type?: 'info' | 'tip' | 'warning' | 'danger';
}

export function Badge({ text, type = 'tip', className, children, ...props }: BadgeProps) {
  return <span {...props} className={classes('VPBadge', type, className)}>{children ?? text}</span>;
}

export interface MemberSocial {
  platform: string;
  url: string;
  icon: string;
}

export interface MemberCardProps extends HTMLAttributes<HTMLElement> {
  name: string;
  avatar?: string;
  description?: string;
  link?: string;
  badges?: Array<Pick<BadgeProps, 'text' | 'type'>>;
  socials?: MemberSocial[];
}

export function MemberCard({
  name,
  avatar = PLACEHOLDER_AVATAR,
  description,
  link,
  badges = [],
  socials = [],
  className,
  ...props
}: MemberCardProps) {
  return (
    <article {...props} className={classes('member-card-link', 'not-prose', className)}>
      <div className="member-card">
        {/* A stretched sibling link keeps the whole card clickable without nesting social anchors. */}
        {link && <a className="member-card-target" href={link.trim()} aria-label={`${name} 的个人介绍`} />}
        <div className="member-card-top">
          <img className="member-avatar" src={avatar || PLACEHOLDER_AVATAR} alt={name} width={70} height={70} loading="lazy" />
          <div className="member-info">
            <div className="member-name">{name}</div>
            {badges.map((badge, index) => <Badge key={`${badge.text}-${index}`} {...badge} />)}
            {description && <div className="member-description">{description}</div>}
          </div>
        </div>
        {socials.length > 0 && (
          <div className="member-sns">
            {socials.map((social, index) => (
              <a key={`${social.platform}-${index}`} href={social.url.trim()} aria-label={`${name} · ${social.platform}`} title={social.platform}>
                <img src={social.icon} className="member-sns-logo" alt={social.platform} width={32} height={32} loading="lazy" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export interface TeamSocialLink {
  icon: string | { svg?: string };
  link: string;
  ariaLabel?: string;
}

export interface TeamMember {
  avatar?: string;
  name: string;
  title?: string;
  org?: string;
  orgLink?: string;
  /** Trusted HTML from the checked-in member registry or MDX. */
  desc?: string;
  links?: TeamSocialLink[];
  sponsor?: string;
  actionText?: string;
}

const githubIcon = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .75a11.25 11.25 0 0 0-3.558 21.923c.563.105.769-.244.769-.542 0-.267-.01-.975-.015-1.913-3.13.68-3.79-1.51-3.79-1.51-.512-1.3-1.25-1.646-1.25-1.646-1.023-.7.077-.686.077-.686 1.13.08 1.724 1.16 1.724 1.16 1.005 1.722 2.638 1.225 3.281.938.103-.728.393-1.225.715-1.507-2.499-.284-5.126-1.25-5.126-5.566 0-1.23.44-2.232 1.16-3.02-.116-.284-.503-1.43.11-2.98 0 0 .945-.303 3.094 1.154a10.8 10.8 0 0 1 5.626 0c2.149-1.457 3.094-1.154 3.094-1.154.613 1.55.226 2.696.11 2.98.721.788 1.158 1.79 1.158 3.02 0 4.327-2.632 5.28-5.14 5.558.404.35.765 1.042.765 2.1 0 1.517-.014 2.741-.014 3.113 0 .3.203.652.774.541A11.251 11.251 0 0 0 12 .75Z"/></svg>';
const genericLinkIcon = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

function socialIcon(link: TeamSocialLink) {
  return typeof link.icon === 'string'
    ? (link.icon === 'github' ? githubIcon : (icons as Record<string, string>)[link.icon]) || genericLinkIcon
    : link.icon.svg || genericLinkIcon;
}

function socialLabel(link: TeamSocialLink) {
  if (link.ariaLabel) return link.ariaLabel;
  if (typeof link.icon === 'string') return link.icon;
  return link.icon.svg?.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || link.link.trim();
}

function externalLink(href?: string) {
  return href && /^(?:https?:)?\/\//i.test(href.trim())
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
}

export function TeamMembers({
  members,
  size = 'medium',
  variant = 'person',
  className,
  id,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  members: TeamMember[];
  size?: 'small' | 'medium';
  /** Year groups display their academic year above the group name. */
  variant?: 'person' | 'year';
}) {
  return (
    <div {...props} id={id} className={classes('VPTeamMembers', 'not-prose', size, `count-${members.length}`, className)}>
      <div className="team-container archive-card-grid">
        {members.map((member, index) => (
          <div className="team-item" key={`${member.name}-${index}`}>
            <article id={id ? `${id}-member-${index}` : undefined} className={classes('VPTeamMembersItem', 'archive-card', size, variant === 'year' && 'year-group')}>
              <div className="profile">
                <figure className="avatar archive-card-avatar">
                  <img className="avatar-img" src={member.avatar || PLACEHOLDER_AVATAR} alt={member.name} width={80} height={80} loading="lazy" />
                </figure>
                <div className="data">
                  {variant === 'year' && <h3 className="archive-card-title">{member.title}学年</h3>}
                  <h3 className={classes('name', variant === 'year' ? 'archive-card-subtitle' : 'archive-card-title')}>{member.name}</h3>
                  {variant === 'year' && <p className="archive-card-term">{member.title}.6–{Number(member.title) + 1}.6</p>}
                  {variant === 'person' && (member.title || member.org) && (
                    <p className="affiliation archive-card-subtitle">
                      {member.title && <span className="title">{member.title}</span>}
                      {member.title && member.org && <span className="at"> @ </span>}
                      {member.org && (member.orgLink
                        ? <a className="org link" href={member.orgLink.trim()} {...externalLink(member.orgLink)}>{member.org}</a>
                        : <span className="org">{member.org}</span>)}
                    </p>
                  )}
                  {member.desc && <div className="desc" dangerouslySetInnerHTML={{ __html: member.desc }} />}
                  {member.links && member.links.length > 0 && (
                    <div className="links">
                      <div className="VPSocialLinks">
                        {member.links.map((link, linkIndex) => (
                          <a className="VPSocialLink" key={`${link.link}-${linkIndex}`} href={link.link.trim()} {...externalLink(link.link)} aria-label={`${member.name} · ${socialLabel(link)}`} title={socialLabel(link)}>
                            <span className="team-social-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: socialIcon(link) }} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {member.sponsor && (
                <div className="sp">
                  <a className="sp-link link" href={member.sponsor.trim()} {...externalLink(member.sponsor)}>
                    <svg className="sp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>
                    {member.actionText || 'Sponsor'}
                  </a>
                </div>
              )}
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamPage({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={classes('VPTeamPage', 'not-prose', className)}>{children}</div>;
}

export interface TeamPageTitleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  lead?: ReactNode;
}

export function TeamPageTitle({ title, lead, className, children, ...props }: TeamPageTitleProps) {
  return (
    <div {...props} className={classes('VPTeamPageTitle', 'not-prose', className)}>
      {title && <h1 className="title">{title}</h1>}
      {lead && <div className="lead">{lead}</div>}
      {children}
    </div>
  );
}

export interface TeamPageSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  lead?: ReactNode;
  members?: ReactNode;
}

export function TeamPageSection({ title, lead, members, className, children, ...props }: TeamPageSectionProps) {
  return (
    <section {...props} className={classes('VPTeamPageSection', 'not-prose', className)}>
      {title && <div className="title">
        <div className="title-line" aria-hidden="true" />
        <h2 className="title-text">{title}</h2>
      </div>}
      {lead && <div className="lead">{lead}</div>}
      {(members || children) && <div className="members">{members ?? children}</div>}
    </section>
  );
}

// Friendly to older MDX snippets while all page sources use the React names.
export {
  TeamMembers as VPTeamMembers,
  TeamPage as VPTeamPage,
  TeamPageTitle as VPTeamPageTitle,
  TeamPageSection as VPTeamPageSection,
};
