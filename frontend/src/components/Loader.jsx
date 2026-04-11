import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/Loader.css';

const Line = ({ className = '', containerClassName = '', ...props }) => (
  <Skeleton
    className={`loader-skeleton ${className}`.trim()}
    containerClassName={`loader-skeleton-container ${containerClassName}`.trim()}
    {...props}
  />
);

const Panel = ({ className = '', children }) => (
  <div className={`loader-panel ${className}`.trim()}>
    {children}
  </div>
);

const SectionHeading = ({ titleWidth = 260 }) => (
  <div className="loader-section-heading">
    <Line width={titleWidth} height={38} />
    <Line width={72} height={4} />
  </div>
);

const HomeSkeleton = () => (
  <div className="loader-home-screen" role="status" aria-label="Loading portfolio">
    <div className="loader-home-nav">
      <div className="loader-home-nav-shell loader-panel">
        <Line width={138} height={28} />
        <div className="loader-home-nav-links">
          {[64, 58, 58, 74, 92, 72].map((width, index) => (
            <Line key={index} width={width} height={16} />
          ))}
        </div>
        <div className="loader-home-nav-actions">
          <Line circle width={30} height={30} />
          <Line circle width={30} height={30} />
          <Line circle width={30} height={30} />
        </div>
      </div>
    </div>

    <main className="loader-home-main">
      <section className="loader-home-section loader-home-hero">
        <div className="loader-home-hero-copy">
          <Line width="32%" height={18} />
          <Line width="88%" height={62} />
          <Line width="52%" height={34} />
          <div className="loader-text-stack">
            <Line height={16} />
            <Line width="92%" height={16} />
            <Line width="74%" height={16} />
          </div>
          <div className="loader-button-row">
            <div className="loader-button-slot">
              <Line height={46} />
            </div>
            <div className="loader-button-slot">
              <Line height={46} />
            </div>
          </div>
        </div>

        <div className="loader-home-hero-visual">
          <div className="loader-home-avatar">
            {/* <Line circle width="50%" height="50%" /> */}
          </div>
          {/* <div className="loader-home-avatar-chip loader-home-avatar-chip--top">
            <Line circle width={72} height={72} />
          </div>
          <div className="loader-home-avatar-chip loader-home-avatar-chip--left">
            <Line circle width={64} height={64} />
          </div>
          <div className="loader-home-avatar-chip loader-home-avatar-chip--right">
            <Line circle width={64} height={64} />
          </div> */}
        </div>
      </section>

      <section className="loader-home-section">
        <SectionHeading titleWidth={220} />
        <div className="loader-about-layout">
          <div className="loader-about-copy">
            <div className="loader-text-stack">
              <Line height={16} />
              <Line height={16} />
              <Line width="86%" height={16} />
              <Line width="94%" height={16} />
              <Line width="64%" height={16} />
            </div>
            <div className="loader-button-slot loader-about-button">
              <Line height={46} />
            </div>
          </div>

          <div className="loader-about-stats">
            {[1, 2].map((item) => (
              <Panel key={item} className="loader-stat-card">
                <Line width="44%" height={42} />
                <Line width="74%" height={16} />
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="loader-home-section">
        <SectionHeading titleWidth={286} />
        <div className="loader-skills-grid">
          {Array.from({ length: 8 }, (_, index) => (
            <Panel key={index} className="loader-skill-card">
              <Line circle width={64} height={64} />
              <Line width="74%" height={18} />
            </Panel>
          ))}
        </div>
      </section>

      <section className="loader-home-section">
        <SectionHeading titleWidth={260} />
        <div className="loader-card-grid">
          {Array.from({ length: 3 }, (_, index) => (
            <Panel key={index} className="loader-showcase-card">
              <Line height={210} />
              <div className="loader-showcase-content">
                <Line width="68%" height={24} />
                <div className="loader-text-stack">
                  <Line height={14} />
                  <Line width="88%" height={14} />
                  <Line width="72%" height={14} />
                </div>
                <div className="loader-tag-row">
                  {[78, 64, 70].map((width, tagIndex) => (
                    <Line key={tagIndex} width={width} height={28} />
                  ))}
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </section>

      <section className="loader-home-section">
        <SectionHeading titleWidth={332} />
        <div className="loader-card-grid">
          {Array.from({ length: 3 }, (_, index) => (
            <Panel key={index} className="loader-showcase-card">
              <Line height={210} />
              <div className="loader-showcase-content">
                <Line width="76%" height={24} />
                <Line width="58%" height={18} />
                <Line width="44%" height={14} />
              </div>
            </Panel>
          ))}
        </div>
      </section>

      <section className="loader-home-section">
        <SectionHeading titleWidth={214} />
        <div className="loader-contact-intro">
          <Line width={420} height={16} />
        </div>
        <div className="loader-contact-grid">
          <div className="loader-contact-cards">
            {Array.from({ length: 3 }, (_, index) => (
              <Panel key={index} className="loader-contact-card">
                <Line circle width={58} height={58} />
                <div className="loader-contact-card-copy">
                  <Line width="46%" height={14} />
                  <Line width="78%" height={18} />
                </div>
              </Panel>
            ))}
          </div>

          <Panel className="loader-contact-form">
            <div className="loader-field-row">
              <div className="loader-field-group">
                <Line width="42%" height={14} />
                <Line height={54} />
              </div>
              <div className="loader-field-group">
                <Line width="48%" height={14} />
                <Line height={54} />
              </div>
            </div>
            <div className="loader-field-group">
              <Line width="26%" height={14} />
              <Line height={54} />
            </div>
            <div className="loader-field-group">
              <Line width="34%" height={14} />
              <Line height={156} />
            </div>
            <div className="loader-button-slot">
              <Line height={54} />
            </div>
          </Panel>
        </div>
      </section>
    </main>

    <footer className="loader-home-footer">
      <Line width={320} height={16} />
    </footer>
  </div>
);

const AdminGridSkeleton = ({ type = 'projects' }) => (
  <div className="loader-admin-grid-surface" role="status" aria-label={`Loading ${type}`}>
    <div className="loader-admin-grid">
      {Array.from({ length: 6 }, (_, index) => (
        <Panel key={index} className="loader-admin-card">
          <Line height={154} />
          <div className="loader-admin-card-copy">
            <Line width={type === 'projects' ? '68%' : '74%'} height={24} />
            <Line width="92%" height={14} />
            <Line width={type === 'projects' ? '78%' : '44%'} height={14} />
            <div className="loader-button-row loader-button-row--compact">
              <div className="loader-button-slot">
                <Line height={38} />
              </div>
              <div className="loader-button-slot">
                <Line height={38} />
              </div>
            </div>
          </div>
        </Panel>
      ))}
    </div>
  </div>
);

const AdminSettingsSkeleton = () => (
  <Panel className="loader-admin-settings" role="status" aria-label="Loading settings">
    <Line width={280} height={34} />
    <Line width={260} height={16} />

    <div className="loader-field-group">
      <Line width={120} height={14} />
      <Line height={164} />
    </div>

    <div className="loader-field-group">
      <Line width={162} height={14} />
      <Line height={54} />
    </div>

    <div className="loader-field-row">
      <div className="loader-field-group">
        <Line width={56} height={14} />
        <Line height={188} />
      </div>
      <div className="loader-field-group">
        <Line width={154} height={14} />
        <Line height={54} />
      </div>
    </div>

    <Line width={168} height={24} />

    <div className="loader-settings-social-grid">
      {['GitHub', 'LinkedIn', 'Twitter'].map((label) => (
        <div key={label} className="loader-field-group">
          <Line width={96} height={14} />
          <Line height={54} />
        </div>
      ))}
    </div>

    <div className="loader-button-slot loader-settings-button">
      <Line height={46} />
    </div>
  </Panel>
);

const LoginSkeletonCard = () => (
  <Panel className="loader-login-card">
    <Line width={220} height={38} />
    <Line width={268} height={16} />

    <div className="loader-login-form">
      <div className="loader-field-group">
        <Line height={54} />
      </div>
      <div className="loader-field-group">
        <Line height={54} />
      </div>
      <div className="loader-button-slot">
        <Line height={50} />
      </div>
    </div>

    <div className="loader-button-slot loader-login-secondary">
      <Line height={42} />
    </div>
  </Panel>
);

const FullScreenLoginSkeleton = () => (
  <div className="loader-fixed-surface" role="status" aria-label="Authenticating">
    <div className="loader-login-shell">
      <LoginSkeletonCard />
    </div>
  </div>
);

const AuthSkeleton = () => (
  <div className="loader-fixed-surface loader-fixed-surface--wide" role="status" aria-label="Loading admin dashboard">
    <div className="loader-auth-shell">
      <aside className="loader-auth-sidebar loader-panel">
        <div className="loader-auth-sidebar-header">
          <Line width={118} height={30} />
          <Line circle width={36} height={36} />
        </div>

        <div className="loader-auth-nav">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="loader-auth-nav-item">
              <Line circle width={20} height={20} />
              <Line width={108} height={18} />
            </div>
          ))}
        </div>

        <div className="loader-auth-sidebar-footer">
          <Line width="82%" height={14} />
          <Line width="54%" height={18} />
        </div>
      </aside>

      <div className="loader-auth-main">
        <div className="loader-auth-header">
          <Line circle width={42} height={42} />
          <Line width={248} height={36} />
        </div>

        <div className="loader-auth-toolbar">
          <Line width={210} height={28} />
          <div className="loader-button-slot loader-auth-toolbar-button">
            <Line height={44} />
          </div>
        </div>

        <AdminGridSkeleton type="projects" />
      </div>
    </div>
  </div>
);

const ImageUploaderSkeleton = () => (
  <div className="loader-upload-overlay" role="status" aria-label="Uploading image">
    <div className="loader-upload-card">
      <Line height={116} />
      <Line width="62%" height={14} />
    </div>
  </div>
);

const InlineSkeleton = () => (
  <div className="loader-inline-surface" role="status" aria-label="Loading content">
    <div className="loader-inline-stack">
      <Line width={220} height={18} />
      <Line width={180} height={14} />
    </div>
  </div>
);

const Loader = ({ variant = 'inline' }) => {
  const renderVariant = () => {
    switch (variant) {
      case 'home':
        return <HomeSkeleton />;
      case 'login':
        return <FullScreenLoginSkeleton />;
      case 'auth':
        return <AuthSkeleton />;
      case 'admin-projects-grid':
        return <AdminGridSkeleton type="projects" />;
      case 'admin-certificates-grid':
        return <AdminGridSkeleton type="certificates" />;
      case 'admin-settings':
        return <AdminSettingsSkeleton />;
      case 'image-uploader':
        return <ImageUploaderSkeleton />;
      default:
        return <InlineSkeleton />;
    }
  };

  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
      duration={1.25}
      borderRadius="16px"
    >
      {renderVariant()}
    </SkeletonTheme>
  );
};

export default Loader;
