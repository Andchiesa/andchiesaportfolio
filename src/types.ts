export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  link?: string;
  youtubeId?: string; // YouTube Video ID (e.g. 'JkUfreQSzXM')
  ytVideos?: { label: string; id: string; buyUrl?: string }[]; // Multiple YouTube videos for toggle
  buyUrl?: string; // Direct purchase or explore URL
  client?: string; // Associated corporate partner/brand
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'tools';
  level: number; // 0 to 100
  yearExperience: number;
}

export interface TimelineEvent {
  year: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
}
