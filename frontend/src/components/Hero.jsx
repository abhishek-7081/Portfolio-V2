import React, { useEffect, useMemo, useState } from 'react';
import ProfileAuraImage from './ProfileAuraImage';
import { DEFAULT_PORTFOLIO_INFO, getMarkdownExcerpt } from '../lib/portfolioInfo';
import '../styles/global.css';

const TYPING_SPEED = 95;
const DELETING_SPEED = 55;
const HOLD_DURATION = 1800;

const Hero = ({ info }) => {
  const roles = useMemo(
    () => (info?.hero_roles?.length ? info.hero_roles : DEFAULT_PORTFOLIO_INFO.hero_roles),
    [info?.hero_roles]
  );
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const activeRole = roles[roleIndex] || '';

    if (!activeRole) return undefined;

    if (roles.length === 1 && typedRole === activeRole) {
      return undefined;
    }

    const shouldPause = !isDeleting && typedRole === activeRole;
    const shouldAdvance = isDeleting && typedRole.length === 0;
    const delay = shouldPause ? HOLD_DURATION : isDeleting ? DELETING_SPEED : TYPING_SPEED;

    const timeoutId = window.setTimeout(() => {
      if (shouldPause) {
        setIsDeleting(true);
        return;
      }

      if (shouldAdvance) {
        setIsDeleting(false);
        setRoleIndex((previous) => (previous + 1) % roles.length);
        return;
      }

      setTypedRole(
        isDeleting
          ? activeRole.slice(0, typedRole.length - 1)
          : activeRole.slice(0, typedRole.length + 1)
      );
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [typedRole, isDeleting, roleIndex, roles]);

  const heroDescription =
    getMarkdownExcerpt(info?.about_text, 170) ||
    'Crafting digital experiences with precision and passion. Specialist in building high-performance web applications using modern technologies.';

  return (
    <section id="home" className="hero-section">
      <div
        className="container fade-in"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: '4rem'
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I&apos;m <span className="highlight">Abhishek Tripathi</span>
          </h1>

          <div className="hero-typing-shell" aria-label="Current role">
            <span className="hero-typing-text">{typedRole || roles[roleIndex]}</span>
            <span className="hero-typing-caret" aria-hidden="true" />
          </div>

          <p className="hero-description">{heroDescription}</p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              My Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get in Touch
            </a>
          </div>
        </div>

        <div className="hero-image-container">
          <ProfileAuraImage
            src={info?.profile_image_url}
            alt="Profile"
            variant="hero"
            fallbackLabel="AT"
          />
        </div>

        <style>{`
          .hero-content {
            position: relative;
          }

          .hero-content::before {
            content: '';
            position: absolute;
            inset: auto auto 5rem -3rem;
            width: 16rem;
            height: 16rem;  
            background: radial-gradient(circle, rgba(var(--primary-rgb), 0.14) 0%, transparent 72%);
            filter: blur(18px);
            z-index: -1;
          }

          .hero-title {
            font-size: clamp(2.8rem, 6vw, 4.5rem);
            line-height: 0.95;
            letter-spacing: -0.06em;
            max-width: 15ch;
          }

          .hero-typing-shell {
            min-height: 3.5rem;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            margin: 0.25rem 0 0.25rem;
            font-size: clamp(1.25rem, 2vw, 2.5rem);
            font-weight: 700;
            color: var(--text-muted);
            letter-spacing: -0.03em;
          }

          .hero-typing-text {
            display: inline-block;
          }

          .hero-typing-caret {
            width: 3px;
            height: 0.95em;
            border-radius: 999px;
            background: var(--typing-caret);
            box-shadow: 0 0 12px var(--typing-caret);
            animation: caretBlink 1s step-end infinite;
          }

          .hero-description {
            max-width: 40rem;
            font-size: 1.1rem;
            line-height: 1.5;
            color: var(--text-muted);
            margin-bottom: 2.5rem;
          }

          .hero-image-container {
            min-width: min(440px, 82vw);
          }

          @media (max-width: 992px) {
            .hero-section {
              padding-top: 6rem;
              min-height: auto;
            }

            .hero-title {
              max-width: none;
            }

            .hero-typing-shell {
              justify-content: center;
            }

            .hero-description {
              margin-left: auto;
              margin-right: auto;
            }

            .hero-image-container {
              margin-top: 2rem;
              min-width: 0;
            }
          }

          @media (max-width: 640px) {
            .hero-title {
              font-size: 2.85rem;
            }

            .hero-typing-shell {
              min-height: 2.8rem;
              font-size: 1.65rem;
              margin-top: 1.25rem;
            }

            .hero-description {
              font-size: 1.05rem;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Hero;
