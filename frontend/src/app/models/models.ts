export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar_color: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  skill_count: number;
}

export type SkillKind = 'offer' | 'request';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Skill {
  id: number;
  owner: User;
  category: Category;
  title: string;
  description: string;
  kind: SkillKind;
  kind_display: string;
  level: SkillLevel;
  level_display: string;
  is_remote: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewSkillPayload {
  title: string;
  description: string;
  kind: SkillKind;
  level: SkillLevel;
  is_remote: boolean;
  category_id: number;
}

/** DRF */
export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface AuthTokens {
  access: string;
  refresh: string;
}
