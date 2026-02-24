import React, { useState, useEffect } from 'react';

// Session-level in-memory cache (prevents duplicate fetches within one session)
const iconCache = new Map();
const pendingFetches = new Map();

const LS_PREFIX = 'gameicon_v4_'; // bumped to v4 — clears any stale wrong-icon caches

// Known iTunes App IDs — uses lookup?id= for exact, correct icons
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
  'Duolingo':          '570060128',
};

// Pre-load localStorage cache into memory on module init
for (const name of Object.keys(KNOWN_ITUNES_IDS)) {
  try {
    const stored = localStorage.getItem(LS_PREFIX + name);
    if (stored) iconCache.set(name, stored === 'null' ? null : stored);
  } catch (_) { /* localStorage unavailable */ }
}

function fetchIconUrl(name) {
  if (pendingFetches.has(name)) return pendingFetches.get(name);

  const knownId = KNOWN_ITUNES_IDS[name];
  const apiUrl = knownId
    ? `https://itunes.apple.com/lookup?id=${knownId}&entity=software`
    : `https://itunes.apple.com/search?term=${encodeURIComponent(name.replace(/[!':#]/g, '').trim())}&media=software&limit=1&entity=software`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);

  const promise = fetch(apiUrl, { signal: controller.signal })
    .then(r => r.json())
    .then(data => {
      clearTimeout(timer);
      let url = null;
      if (data.results?.length > 0) {
        const raw = data.results[0].artworkUrl100;
        url = raw ? raw.replace('100x100bb', '256x256bb') : null;
      }
      iconCache.set(name, url);
      try { localStorage.setItem(LS_PREFIX + name, url ?? 'null'); } catch (_) {}
      return url;
    })
    .catch(() => {
      clearTimeout(timer);
      return null; // Don't cache failures — allow retry on next load
    })
    .finally(() => pendingFetches.delete(name));

  pendingFetches.set(name, promise);
  return promise;
}

/**
 * GameIcon — shows the real App Store icon for a game/app.
 * localStorage-persisted: fetched once ever, instant on all subsequent loads.
 * Shows shimmer skeleton while loading, emoji fallback only on failure.
 */
const GameIcon = ({ name, fallback = '🎮', color = '#8b5cf6', size = 48, borderRadius = 12 }) => {
  const cached = iconCache.has(name) ? iconCache.get(name) : undefined;
  const [iconUrl, setIconUrl] = useState(cached ?? undefined);
  const [loading, setLoading] = useState(cached === undefined);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (cached !== undefined) {
      setIconUrl(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchIconUrl(name).then(url => {
      setIconUrl(url);
      setLoading(false);
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

  // Shimmer skeleton while loading
  if (loading) {
    return (
      <span
        style={{
          ...sharedStyle,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.4s infinite',
          border: '2px solid rgba(255,255,255,0.08)',
        }}
      />
    );
  }

  if (iconUrl && !imgError) {
    return (
      <img
        src={iconUrl}
        alt={name}
        style={{
          ...sharedStyle,
          objectFit: 'cover',
          boxShadow: `0 4px 16px ${color}55`,
          border: `2px solid ${color}45`,
        }}
        onError={() => setImgError(true)}
      />
    );
  }

  // Emoji fallback (only shown when fetch failed)
  return (
    <span
      style={{
        ...sharedStyle,
        fontSize: size * 0.46,
        background: `linear-gradient(135deg, ${color}35, ${color}15)`,
        border: `2px solid ${color}50`,
        boxShadow: `0 4px 12px ${color}25`,
      }}
    >
      {fallback}
    </span>
  );
};

export default GameIcon;
