export enum ResearchType {
  Foundational = 'Foundational Research',
  Clinical = 'Veterinary Clinical Research',
  Translational = 'Translational Research',
  Social = 'Social Sciences/Pedagogy Research',
  Other = 'Other'
}

export enum PresentationType {
  Poster = 'Poster',
  Oral = 'Oral'
}

export interface Presenter {
  name: string;
  level: string;
  department: string;
}

export interface Abstract {
  id: string;
  title: string;
  authors: string;
  body: string;
  funding?: string;
  presenter: Presenter;
  researchType: ResearchType;
  mentors: string[];
  affiliations: string[];
  presentationType: PresentationType;
  presentationSlot: string; // e.g., "Poster # 1" or "Session 1A, 11:30-11:45 am"
  location?: string;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  location?: string;
  description?: string;
  type: 'general' | 'session' | 'break' | 'social';
}

export interface Sponsor {
  name: string;
  level: 'Gold' | 'Green' | 'Friend';
  url: string;
  logo?: string; // Optional URL/path for logo image
}

export interface AbstractFilters {
  department: string;
  researchType: string;
  mentor: string;
  affiliation: string,
}
