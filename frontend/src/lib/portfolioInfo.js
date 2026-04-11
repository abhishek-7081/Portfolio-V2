export const DEFAULT_PORTFOLIO_INFO = {
  about_text:
    'I am a passionate software developer specializing in the MERN stack. I love building full-stack applications that are scalable, maintainable, and user-friendly.',
  hero_roles: ['MERN Stack Developer', 'Full-Stack Engineer', 'Problem Solver'],
  skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript', 'Supabase', 'Tailwind CSS'],
  social_links: {
    github: '',
    linkedin: '',
    twitter: '',
    instagram: ''
  },
  resume_url: '',
  profile_image_url: '',
  email: '',
  location: '',
  years_experience: 0,
  projects_completed: 0
};

const normalizeStringArray = (value, fallback = []) => {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value.map((item) => `${item ?? ''}`.trim()).filter(Boolean);
  return cleaned.length > 0 ? cleaned : fallback;
};

const normalizeCount = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
};

export const normalizePortfolioInfo = (info = {}) => ({
  ...DEFAULT_PORTFOLIO_INFO,
  ...info,
  about_text: `${info?.about_text ?? DEFAULT_PORTFOLIO_INFO.about_text}`.trim() || DEFAULT_PORTFOLIO_INFO.about_text,
  hero_roles: normalizeStringArray(info?.hero_roles, DEFAULT_PORTFOLIO_INFO.hero_roles),
  skills: normalizeStringArray(info?.skills, DEFAULT_PORTFOLIO_INFO.skills),
  social_links: {
    ...DEFAULT_PORTFOLIO_INFO.social_links,
    ...(info?.social_links ?? {})
  },
  resume_url: `${info?.resume_url ?? ''}`.trim(),
  profile_image_url: `${info?.profile_image_url ?? ''}`.trim(),
  email: `${info?.email ?? ''}`.trim(),
  location: `${info?.location ?? ''}`.trim(),
  years_experience: normalizeCount(info?.years_experience),
  projects_completed: normalizeCount(info?.projects_completed)
});

export const markdownToPlainText = (markdown = '') =>
  markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/^\s*[-+*]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/[#*_~]/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const getMarkdownExcerpt = (markdown = '', limit = 160) => {
  const plainText = markdownToPlainText(markdown);
  if (!plainText) return '';
  if (plainText.length <= limit) return plainText;

  return `${plainText.slice(0, limit).trimEnd()}...`;
};
