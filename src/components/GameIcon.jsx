import React, { useState, useEffect } from 'react';

// Module-level cache persists across component re-renders within the session
const iconCache = new Map();
const pendingFetches = new Map();

// Known iTunes App IDs for popular titles — guarantees the correct icon
// instead of relying on fuzzy search results.
const KNOWN_ITUNES_IDS = {
  'Genshin Impact':        '1517783697',
  'Roblox':                '431946152',
  'PUBG Mobile':           '1330123889',
  'Coin Master':           '406889139',
  'Royal Match':           '1482155847',
  'Subway Surfers':        '512939461',
  'Candy Crush Saga':      '553834731',
  'Honor of Kings':        '1598505024',
  'Honkai: Star Rail':     '1614401138',
  'Monopoly GO!':          '1621704780',
  'Clash of Clans':        '529479190',
  'Clash Royale':          '1053012308',
  'Pokémon GO':            '1094591345',
  'Among Us':              '1351568542',
  'Minecraft':             '479516143',
  'Brawl Stars':           '1261853421',
  'Free Fire':             '1300146617',
  'ChatGPT':               '6448311069',
  'TikTok':                '835599320',
  'Instagram':             '389801252',
  'Facebook':              '284882215',
  'YouTube':               '544007664',
  'Snapchat':              '447188370',
  'WhatsApp':              '310633997',
  'Netflix':               '363590051',
  'Spotify':               '324684580',
  'Google Gemini':         '6472707253',
  'Duolingo':              '570060128',
};

/**
 * GameIcon — fetches the real App Store icon for a game/app.
 * Uses known iTunes App IDs for popular titles (accurate).
 * Falls back to fuzzy iTunes search, then emoji fallback.
 */
const GameIcon = ({ name, fallback = '🎮', color = '#8b5cf6', size = 48, borderRadius = 12 }) => {
  const [iconUrl, setIconUrl] = useState(() => iconCache.has(name) ? iconCache.get(name) : null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (iconCache.has(name)) {
      setIconUrl(iconCache.get(name));
      return;
    }

    if (pendingFetches.has(name)) {
      pendingFetches.get(name).then(url => setIconUrl(url));
      return;
    }

    const knownId = KNOWN_ITUNES_IDS[name];
    const fetchUrl = knownId
      ? `https://itunes.apple.com/lookup?id=${knownId}`
      : `https://itunes.apple.com/search?term=${encodeURIComponent(name.replace(/[!':#]/g, '').trim())}&media=software&limit=3&entity=software`;

    const promise = fetch(fetchUrl, { signal: AbortSignal.timeout(5000) })
      .then(r => r.json())
      .then(data => {
        let url = null;
        if (data.results && data.results.length > 0) {
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
