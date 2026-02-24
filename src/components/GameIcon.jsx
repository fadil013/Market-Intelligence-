import React, { useState, useEffect } from 'react';

// Session-level in-memory cache
const iconCache = new Map();
const pendingFetches = new Map();

const LS_PREFIX = 'gameicon_v6_';

// ── HARDCODED icon URLs — no API calls needed for these, load instantly ──────
const STATIC_ICON_URLS = {
  'Genshin Impact':     'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d3/f5/2a/d3f52a60-8dd5-e433-226a-5468f9bcfd0f/AppIcon-0-0-1x_U007epad-0-1-85-220.png/256x256bb.jpg',
  'Roblox':             'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f7/f6/3d/f7f63dc8-8ee2-8128-d681-1859535e95f0/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/256x256bb.jpg',
  'PUBG Mobile':        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ca/e5/2f/cae52f82-4e0d-b5c7-91c1-384d83e1d742/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/256x256bb.jpg',
  'Coin Master':        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/4f/c7/70/4fc770bb-2a54-a009-2416-290969953e46/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/256x256bb.jpg',
  'Royal Match':        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/20/76/ca/2076ca78-a84d-d309-d87c-6d77834c44a0/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/256x256bb.jpg',
  'Subway Surfers':     'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ac/fe/37/acfe372d-b304-c2a4-5ac1-b374d00b84d8/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/256x256bb.jpg',
  'Candy Crush Saga':   'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/70/95/79/70957916-1024-5cd7-156e-058193251eca/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/256x256bb.jpg',
  'Honor of Kings':     'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/5e/41/31/5e413126-7b5a-982e-6069-33a66e775097/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/256x256bb.jpg',
  'Honkai: Star Rail':  'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/c4/80/aa/c480aab0-bbcd-2487-68bc-e69ad9c5d677/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/256x256bb.jpg',
  'Monopoly GO!':       'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4b/68/49/4b6849bb-b35b-9300-fa94-a2a25970ba4c/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/256x256bb.jpg',
  'Clash of Clans':     'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/0b/a8/68/0ba868f8-1fcd-c461-1ce5-24d72cd405b7/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/256x256bb.jpg',
  'Clash Royale':       'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/07/e6/2c/07e62c14-7adc-a4ef-a390-17be4ccddb98/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/256x256bb.jpg',
  'Pokémon GO':         'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/67/c4/3f/67c43f35-4482-857d-1348-7337cb313024/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/256x256bb.jpg',
  'Among Us':           'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6c/8f/fb/6c8ffb21-53c4-1fae-7095-d3224c584a1b/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/256x256bb.jpg',
  'Minecraft':          'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a2/38/7e/a2387e22-fd28-6b3b-691d-dd07a837fcad/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/256x256bb.jpg',
  'Brawl Stars':        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/27/e0/90/27e090b3-46c8-2ff8-85b1-30dc2618584f/AppIcon-0-0-1x_U007epad-0-1-85-220.png/256x256bb.jpg',
  'Free Fire':          'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4b/8d/ba/4b8dba37-a240-f450-9f99-c3a611c96536/AppIcon-1767797054-1x_U007emarketing-0-8-0-85-220-0.png/256x256bb.jpg',
  'ChatGPT':            'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/08/57/30/0857301d-c153-efb2-4965-bbee96afac38/AppIcon-0-0-1x_U007epad-0-0-0-1-0-0-P3-85-220.png/256x256bb.jpg',
  'TikTok':             'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/1f/c5/ca/1fc5ca5b-7bca-34ff-d5d5-f48292fc79f7/AppIcon_TikTok-0-0-1x_U007epad-0-1-0-0-85-220.png/256x256bb.jpg',
  'Instagram':          'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4a/37/c3/4a37c3f9-5f06-e885-2c3e-03e8dcd698aa/Prod-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/256x256bb.jpg',
  'Facebook':           'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/e7/dd/ea/e7ddeaa1-8a5f-afe4-72e3-fae43b514c3c/Icon-Production-0-0-1x_U007epad-0-1-0-85-220.png/256x256bb.jpg',
  'YouTube':            'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/8b/d1/36/8bd136c3-1844-128e-41c0-472731be32b8/logo_youtube_2024_q4_color-0-0-1x_U007emarketing-0-0-0-7-0-0-0-85-220.png/256x256bb.jpg',
  'Snapchat':           'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/80/1a/fe/801afe49-b131-c1a3-8b1f-7dbcbfb825ea/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/256x256bb.jpg',
  'WhatsApp':           'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/de/08/3f/de083fa7-c179-9c25-7093-576eb965123e/AppIcon-0-0-1x_U007epad-0-0-0-1-0-0-sRGB-0-85-220.png/256x256bb.jpg',
  'Netflix':            'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/73/12/96/731296b0-5306-4402-04ad-99193aeaf6e8/AppIcon-0-0-1x_U007emarketing-0-11-0-sRGB-0-85-220.png/256x256bb.jpg',
  'Spotify':            'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/1c/38/91/1c3891a1-9f3b-374e-c7a4-f2132560de4e/AppIcon-0-0-1x_U007epad-0-1-0-0-sRGB-85-220.png/256x256bb.jpg',
  'Google Gemini':      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6a/38/34/6a38349f-c454-7abe-427b-822af16c459d/AppIcon-0-1x_U007epad-0-0-0-1-0-0-0-0-85-220-0.png/256x256bb.jpg',
  'Duolingo':           'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/8c/2e/fc/8c2efc2c-1efc-50ea-a0b1-16ab54db9102/AppIcon-0-0-1x_U007epad-0-1-85-220.png/256x256bb.jpg',
  // Beta game icons (mapped to same-genre published games)
  'Racing Rivals':      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ac/49/b0/ac49b0bb-d225-fa41-2d99-8e4fbfe0de99/AppIcon-1x_U007emarketing-0-11-0-85-220-0.png/256x256bb.jpg',
  'Idle Fortress':      'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/de/4f/e2/de4fe2a0-99c7-197a-6d8b-d584e52f444e/AppIcon-1x_U007emarketing-0-11-0-85-220-0.png/256x256bb.jpg',
  'Tower Defense X':    'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d0/04/96/d0049697-4c34-48ae-47b9-d614731a279c/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/256x256bb.jpg',
  'Merge Empire':       'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b5/02/1c/b5021c21-b7a7-2262-dee4-c9c0ac7a125b/AppIcon-0-0-1x_U007emarketing-0-9-0-85-220.png/256x256bb.jpg',
  'Battle Legends':     'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f2/e3/5c/f2e35c33-e65d-66fd-76eb-ffd126142934/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/256x256bb.jpg',
  'Puzzle Quest Heroes':'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c0/43/e5/c043e5c8-ac77-0611-27dd-05dfc4143f47/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/256x256bb.jpg',
  'Card Clash':         'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/21/7b/b7/217bb7d8-7206-27f9-590b-42ac11f7e6c5/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/256x256bb.jpg',
  'Project Stellar':    'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/27/e0/90/27e090b3-46c8-2ff8-85b1-30dc2618584f/AppIcon-0-0-1x_U007epad-0-1-85-220.png/256x256bb.jpg',
};

// Pre-cache all static URLs immediately — no API needed, no rate-limiting ever
for (const [name, url] of Object.entries(STATIC_ICON_URLS)) {
  iconCache.set(name, url);
}

// ── Simple request queue for unknown games only (80ms between requests) ───────
const requestQueue = [];
let queueRunning = false;

function enqueueRequest(fn) {
  return new Promise((resolve, reject) => {
    requestQueue.push(() => fn().then(resolve).catch(reject));
    if (!queueRunning) drainQueue();
  });
}

function drainQueue() {
  if (requestQueue.length === 0) { queueRunning = false; return; }
  queueRunning = true;
  const next = requestQueue.shift();
  next().finally(() => setTimeout(drainQueue, 80));
}

function fetchIconUrl(name) {
  // Static URL available — return immediately, no API call
  if (STATIC_ICON_URLS[name]) return Promise.resolve(STATIC_ICON_URLS[name]);
  if (pendingFetches.has(name)) return pendingFetches.get(name);

  const promise = enqueueRequest(() => {
    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(name.replace(/[!':#]/g, '').trim())}&media=software&limit=1&entity=software`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    return fetch(apiUrl, { signal: controller.signal })
      .then(r => r.json())
      .then(data => {
        clearTimeout(timer);
        let url = null;
        if (data.results?.length > 0) {
          const result = data.results[0];
          const raw = result.artworkUrl512 || result.artworkUrl100;
          url = raw ? raw.replace(/\d+x\d+bb/, '256x256bb') : null;
        }
        iconCache.set(name, url);
        try { localStorage.setItem(LS_PREFIX + name, url ?? 'null'); } catch (_) {}
        return url;
      })
      .catch(() => { clearTimeout(timer); return null; });
  }).finally(() => pendingFetches.delete(name));

  pendingFetches.set(name, promise);
  return promise;
}

/**
 * GameIcon — shows the real App Store icon for a game/app.
 * Known games use hardcoded CDN URLs — zero API calls, instant load.
 * Unknown games fall back to throttled iTunes search.
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
