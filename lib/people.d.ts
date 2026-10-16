export interface Person {
  avatar: string;
  github?: string;
  mapByNameAliases?: string[];
  mapByEmailAliases?: string[];
}

export const people: Record<string, Person>;
export const PLACEHOLDER_AVATAR: string;
export function QQ(uin: string | number, size?: number): string;
export function QQGroup(uin: string | number, size?: number): string;
export function avatarOf(name: string): string;
export function memberOf<T extends Record<string, unknown> = Record<never, never>>(name: string, extras?: T): { avatar: string; name: string } & T;
export function buildAuthorMappings(): import('fumadocs-page-history/git').AuthorMapping[];
