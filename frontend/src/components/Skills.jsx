import React from 'react';
import { Zap } from 'lucide-react';
import {
  SiCss,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite
} from 'react-icons/si';
import '../styles/global.css';

const SKILL_ICON_MAP = [
  { match: /react/, Icon: SiReact, color: '#61DAFB', surface: 'rgba(97, 218, 251, 0.14)' },
  { match: /node/, Icon: SiNodedotjs, color: '#83CD29', surface: 'rgba(131, 205, 41, 0.14)' },
  { match: /express/, Icon: SiExpress, color: '#E5E7EB', surface: 'rgba(229, 231, 235, 0.12)' },
  { match: /mongo/, Icon: SiMongodb, color: '#47A248', surface: 'rgba(71, 162, 72, 0.14)' },
  { match: /supabase/, Icon: SiSupabase, color: '#3ECF8E', surface: 'rgba(62, 207, 142, 0.14)' },
  { match: /firebase/, Icon: SiFirebase, color: '#FFCA28', surface: 'rgba(255, 202, 40, 0.14)' },
  { match: /javascript|\bjs\b/, Icon: SiJavascript, color: '#F7DF1E', surface: 'rgba(247, 223, 30, 0.14)' },
  { match: /typescript|\bts\b/, Icon: SiTypescript, color: '#3178C6', surface: 'rgba(49, 120, 198, 0.14)' },
  { match: /tailwind/, Icon: SiTailwindcss, color: '#38BDF8', surface: 'rgba(56, 189, 248, 0.14)' },
  { match: /redux/, Icon: SiRedux, color: '#764ABC', surface: 'rgba(118, 74, 188, 0.14)' },
  { match: /^git$|git\s|github/, Icon: SiGit, color: '#F05032', surface: 'rgba(240, 80, 50, 0.14)' },
  { match: /github/, Icon: SiGithub, color: '#FFFFFF', surface: 'rgba(255, 255, 255, 0.1)' },
  { match: /next/, Icon: SiNextdotjs, color: '#FFFFFF', surface: 'rgba(255, 255, 255, 0.1)' },
  { match: /postgres|postgresql|sql/, Icon: SiPostgresql, color: '#336791', surface: 'rgba(51, 103, 145, 0.14)' },
  { match: /prisma/, Icon: SiPrisma, color: '#5A67D8', surface: 'rgba(90, 103, 216, 0.14)' },
  { match: /docker/, Icon: SiDocker, color: '#2496ED', surface: 'rgba(36, 150, 237, 0.14)' },
  { match: /figma/, Icon: SiFigma, color: '#F24E1E', surface: 'rgba(242, 78, 30, 0.14)' },
  { match: /vite/, Icon: SiVite, color: '#A855F7', surface: 'rgba(168, 85, 247, 0.14)' },
  { match: /html/, Icon: SiHtml5, color: '#E34F26', surface: 'rgba(227, 79, 38, 0.14)' },
  { match: /css/, Icon: SiCss, color: '#1572B6', surface: 'rgba(21, 114, 182, 0.14)' },
  { match: /material ui|mui/, Icon: SiMui, color: '#007FFF', surface: 'rgba(0, 127, 255, 0.14)' },
  { match: /postman|api|rest/, Icon: SiPostman, color: '#FF6C37', surface: 'rgba(255, 108, 55, 0.14)' }
];

const getSkillMeta = (skillName) => {
  const normalized = skillName.toLowerCase();
  const match = SKILL_ICON_MAP.find((entry) => entry.match.test(normalized));

  if (match) {
    return match;
  }

  return {
    Icon: Zap,
    color: '#FFD700',
    surface: 'rgba(255, 215, 0, 0.14)'
  };
};

const Skills = ({ skills }) => {
  const displaySkills =
    skills?.length > 0
      ? skills
      : ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript', 'Supabase', 'Tailwind CSS'];

  return (
    <section id="skills" className="skills-section">
      <div className="container fade-in">
        <h2 className="section-title">Technical Expertise</h2>
        <div className="skills-grid">
          {displaySkills.map((skill) => {
            const { Icon, color, surface } = getSkillMeta(skill);

            return (
              <div key={skill} className="skill-card glass-card hover-glow">
                <div className="skill-icon-wrapper" style={{ background: surface, boxShadow: `inset 0 0 0 1px ${surface}` }}>
                  <Icon size={34} color={color} />
                </div>
                <h3 className="skill-name">{skill}</h3>
              </div>
            );
          })}
        </div>

        <style>{`
          .skill-card {
            padding: 1.35rem;
            gap: 1rem;
          }

          .skill-icon-wrapper {
            width: 78px;
            height: 78px;
            border-radius: 22px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.35rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .skill-card:hover .skill-icon-wrapper {
            transform: translateY(-4px) scale(1.04);
            box-shadow: 0 16px 28px rgba(15, 23, 42, 0.24);
          }

          .skill-name {
            text-align: center;
            font-size: 1rem;
          }

          @media (max-width: 480px) {
            .skills-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
            }

            .skill-card {
              padding: 1rem;
            }

            .skill-icon-wrapper {
              width: 64px;
              height: 64px;
              border-radius: 18px;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Skills;
