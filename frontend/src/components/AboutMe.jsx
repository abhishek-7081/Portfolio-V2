import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ProfileAuraImage from './ProfileAuraImage';
import { DEFAULT_PORTFOLIO_INFO } from '../lib/portfolioInfo';

const AboutMe = ({
  aboutText,
  resumeUrl,
  profileImageUrl,
  yearsExperience = 0,
  projectsCompleted = 0
}) => {
  const markdown = aboutText || DEFAULT_PORTFOLIO_INFO.about_text;
  const stats = [
    {
      value: `${yearsExperience}${yearsExperience > 0 ? '+' : ''}`,
      label: 'Years Experience'
    },
    {
      value: `${projectsCompleted}${projectsCompleted > 0 ? '+' : ''}`,
      label: 'Projects Completed'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container fade-in">
        <h2 className="section-title">About Me</h2>

        <div className="about-content about-content-enhanced">
          <div className="about-text">
            <div className="glass-card about-markdown-panel">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ ...props }) => <a {...props} target="_blank" rel="noreferrer" />,
                  code: ({ inline, children, ...props }) =>
                    inline ? (
                      <code className="about-inline-code" {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className="about-block-code" {...props}>
                        {children}
                      </code>
                    )
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>


          </div>

          <div className="about-visual-stack">
            <div className="glass-card about-image-card imggayab">
              <ProfileAuraImage
                src={profileImageUrl}
                alt="About profile"
                variant="about"
                fallbackLabel="AT"
              />
            </div>

            <div className="about-stats about-stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="stat glass-card">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}


              {/* resume button  */}
              <div className="about-actions" style={{ marginTop: '2rem' }}>
                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    download
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Resume
                  </a>
                )}
              </div>

            </div>

          </div>
        </div>

        <style>{`
          .about-content-enhanced {
            align-items: stretch;
          }

          .about-markdown-panel {
            padding: 2rem;
            height: 100%;
          }

          .about-markdown-panel p,
          .about-markdown-panel li,
          .about-markdown-panel blockquote {
            font-size: 1.05rem;
            line-height: 1.85;
            color: var(--text-muted);
          }

          .about-markdown-panel p + p,
          .about-markdown-panel ul,
          .about-markdown-panel ol,
          .about-markdown-panel blockquote {
            margin-top: 1rem;
          }

          .about-markdown-panel ul,
          .about-markdown-panel ol {
            padding-left: 1.35rem;
          }

          .about-markdown-panel li + li {
            margin-top: 0.5rem;
          }

          .about-markdown-panel strong {
            color: var(--text-main);
          }

          .about-markdown-panel a {
            color: var(--primary);
            text-decoration: underline;
            text-underline-offset: 0.2rem;
          }

          .about-markdown-panel blockquote {
            border-left: 3px solid var(--primary);
            padding-left: 1rem;
          }

          .about-markdown-panel pre {
            margin-top: 1rem;
          }

          .about-inline-code,
          .about-block-code {
            font-family: 'Consolas', 'Monaco', monospace;
            background: rgba(var(--primary-rgb), 0.12);
            color: var(--text-main);
            border-radius: 8px;
          }

          .about-inline-code {
            padding: 0.15rem 0.4rem;
          }

          .about-block-code {
            display: block;
            white-space: pre-wrap;
            padding: 1rem;
            margin-top: 1rem;
          }

          .about-visual-stack {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            min-width: min(360px, 100%);
          }

          .about-image-card {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 26rem;
            overflow: hidden;
          }

          .about-stats-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
          }

          .stat.glass-card {
            padding: 1.6rem;
          }

          @media (max-width: 1024px) {
          .about-stats-grid {
            grid-template-columns: 2fr;
          }


          .imggayab{
            display: none;
            }
          .about-markdown-panel{
          width: 100%;
          }




            .about-visual-stack {
              min-width: 0;
            }
              
          }

          @media (max-width: 768px) {

          .imggayab{
            display: none;
            }
            .about-content-enhanced {
              gap: 2rem;
            }

            .about-markdown-panel,
            .about-image-card {
              padding: 1.5rem;
            }

            .about-image-card {
              min-height: 20rem;
            }
          }

          @media (max-width: 520px) {
            .about-stats-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default AboutMe;
