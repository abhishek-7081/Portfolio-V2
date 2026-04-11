import React from 'react';

const ProfileAuraImage = ({ src, alt = 'Profile image', variant = 'hero', fallbackLabel = 'AT' }) => {
  return (
    <div className={`profile-aura profile-aura--${variant}`}>
      <div className="profile-aura__glow" aria-hidden="true" />
      <div className="profile-aura__halo" aria-hidden="true" />
      <div className="profile-aura__frame">
        {src ? (
          <img src={src} alt={alt} className="profile-aura__image" />
        ) : (
          <div className="profile-aura__fallback" aria-label={alt}>
            {fallbackLabel}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAuraImage;
