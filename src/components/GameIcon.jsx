import React, { useState, useEffect } from 'react';

// Module-level cache persists across component re-renders within the session
const iconCache = new Map();
const pendingFetches = new Map();

/**
 * GameIcon — fetches the real App Store icon for a game/app via iTunes Search API.
 * Falls back to an emoji in a styled container if not found.
 */
const GameIcon = ({ name, fallback = '🎮', color = '#8b5cf6', size = 48, borderRadius = 12 }) => {
  const [iconUrl, setIconUrl] = useState(() => iconCache.has(name) ? iconCache.get(name) : null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (iconCache.has(name)) {
      setIconUrl(iconCache.get(name));
      return;
    }

    // If a fetch is already in flight, attach to it
    if (pendingFetches.has(name)) {
      pendingFetches.get(name).then(url => setIconUrl(url));
      return;
    }

    // Clean up the search term (remove punctuation that confounds the API)
    const searchTerm = name
      .replace(/[!':#]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const promise = fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=software&limit=3&entity=software`,
      { signal: AbortSignal.timeout(5000) }
    )
      .then(r => r.json())
      .then(data => {
        let url = null;
        if (data.results && data.results.length > 0) {
          // Prefer the first match; upgrade artwork to 200×200 for sharper display
          const raw = data.results[0].artworkUrl100;
          url = raw ? raw.replace('100x100bb', '200x200bb') : null;
        }
        iconCache.set(name, url);
        return url;
      })
      .catch(() => {
        iconCache.set(name, null);
        return null;
      });

    pendingFetches.set(name, promise);
    promise.then(url => {
      setIconUrl(url);
      pendingFetches.delete(name);
    });
  }, [name]);

  const sharedStyle = {
    width: size,
    height: size,
    borderRadius,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (iconUrl && !imgError) {
    return (
      <img
        src={iconUrl}
        alt={name}
        style={{
          ...sharedStyle,
          objectFit: 'cover',
          boxShadow: `0 4px 14px ${color}50`,
          border: `2px solid ${color}40`,
        }}
        onError={() => setImgError(true)}
      />
    );
  }

  // Emoji fallback with gradient background
  return (
    <span
      style={{
        ...sharedStyle,
        fontSize: size * 0.46,
        background: `linear-gradient(135deg, ${color}40, ${color}20)`,
        border: `2px solid ${color}60`,
        boxShadow: `0 4px 12px ${color}30`,
      }}
    >
      {fallback}
    </span>
  );
};

export default GameIcon;
