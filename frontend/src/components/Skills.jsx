import React from 'react';
import { 
  Code2, 
  Database, 
  Server, 
  Zap, 
  Wind, 
  Layers, 
  GitBranch, 
  Globe, 
  Cpu,
  Terminal,
  Blocks
} from 'lucide-react';
import '../styles/global.css';

const getIcon = (skillName) => {
  const name = skillName.toLowerCase();
  const size = 32; // Slightly larger for better visibility

  if (name.includes('react')) return <Blocks size={size} color="#61DAFB" />;
  if (name.includes('node')) return <Server size={size} color="#339933" />;
  if (name.includes('express')) return <Cpu size={size} color="#ffffff" />;
  if (name.includes('mongo')) return <Database size={size} color="#47A248" />;
  if (name.includes('sql') || name.includes('db')) return <Database size={size} color="#00758F" />;
  if (name.includes('supabase')) return <Zap size={size} color="#3ECF8E" />;
  if (name.includes('firebase')) return <Zap size={size} color="#FFCA28" />;
  if (name.includes('javascript') || name.includes('js')) return <Code2 size={size} color="#F7DF1E" />;
  if (name.includes('typescript') || name.includes('ts')) return <Code2 size={size} color="#3178C6" />;
  if (name.includes('tailwind')) return <Wind size={size} color="#38B2AC" />;
  if (name.includes('css')) return <Wind size={size} color="#1572B6" />;
  if (name.includes('redux')) return <Layers size={size} color="#764ABC" />;
  if (name.includes('git')) return <GitBranch size={size} color="#F05032" />;
  if (name.includes('api') || name.includes('rest') || name.includes('globe')) return <Globe size={size} color="#4479A1" />;
  if (name.includes('terminal') || name.includes('shell')) return <Terminal size={size} color="#4D4D4D" />;
  
  return <Zap size={size} color="#FFD700" />; // Default Gold
};

const Skills = ({ skills }) => {
  const displaySkills = skills?.length > 0 ? skills.map(name => ({ name, icon: getIcon(name) })) : [
    { name: 'MongoDB', icon: getIcon('MongoDB') },
    { name: 'Express.js', icon: getIcon('Express.js') },
    { name: 'React', icon: getIcon('React') },
    { name: 'Node.js', icon: getIcon('Node.js') },
    { name: 'JavaScript', icon: getIcon('JavaScript') },
    { name: 'Supabase', icon: getIcon('Supabase') },
    { name: 'Tailwind CSS', icon: getIcon('Tailwind CSS') }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container fade-in">
        <h2 className="section-title">Technical Expertise</h2>
        <div className="skills-grid">
          {displaySkills.map((skill, index) => (
            <div key={index} className="skill-card glass-card hover-glow">
              <div className="skill-icon-wrapper" style={{ 
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'inline-flex'
              }}>
                {skill.icon}
              </div>
              <h3 className="skill-name">{skill.name}</h3>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 480px) {
            .skills-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
            }
            .skill-card {
              padding: 1rem;
            }
            .skill-icon-wrapper {
              padding: 0.8rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Skills;
