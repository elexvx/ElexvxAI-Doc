import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import type { AppLocale } from '@/lib/i18n';

type LocalizedText = {
  zh: string;
  en: string;
};

export type ResearchersPageCopy = {
  title: string;
  description: string;
  featuredLabel: string;
  listTitle: string;
  detailCta: string;
  expertiseLabel: string;
  experienceLabel: string;
  joinedLabel: string;
  sectionQualification: string;
  sectionAchievements: string;
  sectionProjects: string;
  sectionContact: string;
};

type ResearcherItem = {
  slug: string;
  name: string;
  role: LocalizedText;
  summary: LocalizedText;
  expertise: string[];
  experience: string;
  joined: string;
  location: LocalizedText;
  email: string;
  education: LocalizedText;
  achievements: LocalizedText[];
  projects: LocalizedText[];
  accent: string;
};

export type ResearcherListItem = {
  slug: string;
  name: string;
  role: string;
  summary: string;
  expertise: string[];
  experience: string;
  joined: string;
  accent: string;
};

export type ResearcherDetail = ResearcherListItem & {
  location: string;
  email: string;
  education: string;
  achievements: string[];
  projects: string[];
};

type ResearchersYaml = {
  copy: Record<AppLocale, ResearchersPageCopy>;
  members: ResearcherItem[];
};

function getResearchersYamlPath() {
  return path.join(process.cwd(), 'data', 'yaml', 'researchers', 'researchers.yaml');
}

async function readResearchersYaml(): Promise<ResearchersYaml> {
  const file = await readFile(getResearchersYamlPath(), 'utf8');
  return parse(file) as ResearchersYaml;
}

function mapResearcherListItem(member: ResearcherItem, locale: AppLocale): ResearcherListItem {
  return {
    slug: member.slug,
    name: member.name,
    role: member.role[locale],
    summary: member.summary[locale],
    expertise: member.expertise,
    experience: member.experience,
    joined: member.joined,
    accent: member.accent,
  };
}

function mapResearcherDetail(member: ResearcherItem, locale: AppLocale): ResearcherDetail {
  return {
    ...mapResearcherListItem(member, locale),
    location: member.location[locale],
    email: member.email,
    education: member.education[locale],
    achievements: member.achievements.map((item) => item[locale]),
    projects: member.projects.map((item) => item[locale]),
  };
}

export async function getResearchersPageCopy(locale: AppLocale): Promise<ResearchersPageCopy> {
  const data = await readResearchersYaml();
  return data.copy[locale];
}

export async function getAllResearchers(locale: AppLocale): Promise<ResearcherListItem[]> {
  const data = await readResearchersYaml();

  return data.members
    .map((member) => mapResearcherListItem(member, locale))
    .sort((a, b) => Number(b.joined) - Number(a.joined));
}

export async function getResearcherBySlug(slug: string, locale: AppLocale): Promise<ResearcherDetail | undefined> {
  const data = await readResearchersYaml();
  const member = data.members.find((item) => item.slug === slug);
  if (!member) return undefined;
  return mapResearcherDetail(member, locale);
}

export async function getResearcherSlugs(): Promise<string[]> {
  const data = await readResearchersYaml();
  return data.members.map((member) => member.slug);
}
