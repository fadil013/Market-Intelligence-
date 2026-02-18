/**
 * Real-world styled mock data for Market Intelligence Dashboard
 * Populated with actual top-performing mobile games
 */

export const kpiSummary = {
    totalDownloads: '2.4B',
    monthlyActiveUsers: '850M',
    totalRevenue: '$4.2B',
    avgRating: '4.6',
    topBooster: 'Honkai: Star Rail',
    topBoosterGain: '+45%'
};

export const platformComparisonData = [
    { month: 'Sep', googlePlay: 4200, appStore: 3800, amazon: 1200 },
    { month: 'Oct', googlePlay: 4350, appStore: 3950, amazon: 1300 },
    { month: 'Nov', googlePlay: 4800, appStore: 4100, amazon: 1400 },
    { month: 'Dec', googlePlay: 5200, appStore: 4900, amazon: 1800 }, // Holiday spike
    { month: 'Jan', googlePlay: 5100, appStore: 4700, amazon: 1700 }, // Post-holiday retention
    { month: 'Feb', googlePlay: 5400, appStore: 4850, amazon: 1900 },
];

export const allGames = [
    { id: 1, name: 'Honor of Kings', studioRegion: 'China', genre: 'MOBA', platform: 'App Store', monthlyDownloads: 12500000, monthlyRevenue: 220000000, rating: 4.8, boostScore: 15, businessModel: 'Freemium', icon: '👑', color: '#fbbf24', storeUrl: 'https://apps.apple.com/app/honor-of-kings', velocityScore: 68, rankHistory: { '24h': -8, '7d': -28, '30d': -75 }, acceleration: 'medium', platformPresence: { googlePlay: { rank: 3, change: -5 }, appStore: { rank: 2, change: -8 } }, velocityTrend: 'rising' },
    { id: 2, name: 'PUBG Mobile', studioRegion: 'China', genre: 'Shooter', platform: 'Google Play', monthlyDownloads: 18000000, monthlyRevenue: 175000000, rating: 4.5, boostScore: 12, businessModel: 'Battle Pass', icon: '🍳', color: '#10b981', storeUrl: 'https://play.google.com/store/apps/details?id=com.tencent.ig', velocityScore: 55, rankHistory: { '24h': -3, '7d': -15, '30d': -42 }, acceleration: 'medium', platformPresence: { googlePlay: { rank: 5, change: -2 }, appStore: { rank: 8, change: -4 } }, velocityTrend: 'rising' },
    { id: 3, name: 'Genshin Impact', studioRegion: 'China', genre: 'RPG', platform: 'Cross-Platform', monthlyDownloads: 9000000, monthlyRevenue: 140000000, rating: 4.7, boostScore: 22, businessModel: 'Gacha', icon: '🌌', color: '#8b5cf6', storeUrl: 'https://genshin.hoyoverse.com', velocityScore: 72, rankHistory: { '24h': -10, '7d': -38, '30d': -95 }, acceleration: 'high', platformPresence: { googlePlay: { rank: 7, change: -6 }, appStore: { rank: 6, change: -8 }, amazon: { rank: 12, change: -4 } }, velocityTrend: 'rising' },
    { id: 4, name: 'Royal Match', studioRegion: 'Turkey', genre: 'Puzzle', platform: 'App Store', monthlyDownloads: 15000000, monthlyRevenue: 110000000, rating: 4.9, boostScore: 35, businessModel: 'Freemium', icon: '🏰', color: '#f59e0b', storeUrl: 'https://apps.apple.com/app/royal-match', velocityScore: 87, rankHistory: { '24h': -18, '7d': -65, '30d': -178 }, acceleration: 'explosive', platformPresence: { googlePlay: { rank: 4, change: -12 }, appStore: { rank: 3, change: -15 }, amazon: { rank: 8, change: -8 } }, velocityTrend: 'surging' },
    { id: 5, name: 'Roblox', studioRegion: 'USA', genre: 'Sandbox', platform: 'Google Play', monthlyDownloads: 22000000, monthlyRevenue: 105000000, rating: 4.4, boostScore: 8, businessModel: 'UGC', icon: '🟥', color: '#ef4444', storeUrl: 'https://play.google.com/store/apps/details?id=com.roblox.client', velocityScore: 48, rankHistory: { '24h': -2, '7d': -8, '30d': -18 }, acceleration: 'stable', platformPresence: { googlePlay: { rank: 6, change: -1 }, appStore: { rank: 5, change: -2 }, amazon: { rank: 10, change: 0 } }, velocityTrend: 'stable' },
    { id: 6, name: 'Candy Crush Saga', studioRegion: 'UK', genre: 'Puzzle', platform: 'Google Play', monthlyDownloads: 11000000, monthlyRevenue: 95000000, rating: 4.6, boostScore: 5, businessModel: 'Freemium', icon: '🍬', color: '#ec4899', storeUrl: 'https://play.google.com/store/apps/details?id=com.king.candycrushsaga', velocityScore: 32, rankHistory: { '24h': 3, '7d': 12, '30d': 28 }, acceleration: 'declining', platformPresence: { googlePlay: { rank: 35, change: 2 }, appStore: { rank: 42, change: 5 }, amazon: { rank: 28, change: 3 } }, velocityTrend: 'declining' },
    { id: 7, name: 'Coin Master', studioRegion: 'Israel', genre: 'Casual', platform: 'Google Play', monthlyDownloads: 6000000, monthlyRevenue: 85000000, rating: 4.5, boostScore: 9, businessModel: 'Gacha', icon: '🐷', color: '#fcd34d', storeUrl: 'https://play.google.com/store/apps/details?id=com.moonactive.coinmaster', velocityScore: 58, rankHistory: { '24h': -5, '7d': -18, '30d': -45 }, acceleration: 'medium', platformPresence: { googlePlay: { rank: 15, change: -3 }, appStore: { rank: 18, change: -5 } }, velocityTrend: 'rising' },
    { id: 8, name: 'Honkai: Star Rail', studioRegion: 'China', genre: 'RPG', platform: 'App Store', monthlyDownloads: 5000000, monthlyRevenue: 80000000, rating: 4.8, boostScore: 45, businessModel: 'Gacha', icon: '🚆', color: '#6366f1', storeUrl: 'https://apps.apple.com/app/honkai-star-rail', velocityScore: 91, rankHistory: { '24h': -32, '7d': -128, '30d': -345 }, acceleration: 'explosive', platformPresence: { googlePlay: { rank: 2, change: -22 }, appStore: { rank: 1, change: -28 } }, velocityTrend: 'surging' },
    { id: 9, name: 'Monopoly GO!', studioRegion: 'USA', genre: 'Casual', platform: 'App Store', monthlyDownloads: 14000000, monthlyRevenue: 120000000, rating: 4.7, boostScore: 28, businessModel: 'Freemium', icon: '🎲', color: '#10b981', storeUrl: 'https://apps.apple.com/app/monopoly-go', velocityScore: 84, rankHistory: { '24h': -22, '7d': -85, '30d': -215 }, acceleration: 'explosive', platformPresence: { googlePlay: { rank: 1, change: -18 }, appStore: { rank: 4, change: -20 }, amazon: { rank: 5, change: -12 } }, velocityTrend: 'surging' },
    { id: 10, name: 'Clash of Clans', studioRegion: 'Finland', genre: 'Strategy', platform: 'Google Play', monthlyDownloads: 4000000, monthlyRevenue: 60000000, rating: 4.6, boostScore: 4, businessModel: 'Freemium', icon: '⚔️', color: '#f97316', storeUrl: 'https://play.google.com/store/apps/details?id=com.supercell.clashofclans', velocityScore: 38, rankHistory: { '24h': 1, '7d': 5, '30d': 15 }, acceleration: 'stable', platformPresence: { googlePlay: { rank: 28, change: 1 }, appStore: { rank: 32, change: 2 } }, velocityTrend: 'stable' },
];

// Game Rankings
export const gameRankings = {
    topFree: [
        { id: 'gf1', name: 'Honkai: Star Rail', publisher: 'HoYoverse', downloads: '5,000,000', change: '+45%', velocityScore: 91, rankHistory: { '24h': -32, '7d': -128, '30d': -345 }, icon: '🚆', color: '#6366f1', type: 'game', storeUrl: 'https://apps.apple.com/app/honkai-star-rail' },
        { id: 'gf2', name: 'Royal Match', publisher: 'Dream Games', downloads: '15,000,000', change: '+35%', velocityScore: 87, rankHistory: { '24h': -18, '7d': -65, '30d': -178 }, icon: '🏰', color: '#f59e0b', type: 'game', storeUrl: 'https://apps.apple.com/app/royal-match' },
        { id: 'gf3', name: 'Monopoly GO!', publisher: 'Scopely', downloads: '14,000,000', change: '+28%', velocityScore: 84, rankHistory: { '24h': -22, '7d': -85, '30d': -215 }, icon: '🎲', color: '#10b981', type: 'game', storeUrl: 'https://apps.apple.com/app/monopoly-go' },
        { id: 'gf4', name: 'Roblox', publisher: 'Roblox Corp', downloads: '22,000,000', change: '+8%', velocityScore: 48, rankHistory: { '24h': -2, '7d': -8, '30d': -18 }, icon: '🟥', color: '#ef4444', type: 'game', storeUrl: 'https://play.google.com/store/apps/details?id=com.roblox.client' },
        { id: 'gf5', name: 'Genshin Impact', publisher: 'HoYoverse', downloads: '9,000,000', change: '+22%', velocityScore: 72, rankHistory: { '24h': -10, '7d': -38, '30d': -95 }, icon: '🌌', color: '#8b5cf6', type: 'game', storeUrl: 'https://genshin.hoyoverse.com' },
    ],
    topGrossing: [
        { id: 'gg1', name: 'Honor of Kings', publisher: 'Tencent', revenue: '$220,000,000', change: '+15%', velocityScore: 68, rankHistory: { '24h': -8, '7d': -28, '30d': -75 }, icon: '👑', color: '#fbbf24', type: 'game', storeUrl: 'https://apps.apple.com/app/honor-of-kings' },
        { id: 'gg2', name: 'PUBG Mobile', publisher: 'Tencent', revenue: '$175,000,000', change: '+12%', velocityScore: 55, rankHistory: { '24h': -3, '7d': -15, '30d': -42 }, icon: '🍳', color: '#10b981', type: 'game', storeUrl: 'https://play.google.com/store/apps/details?id=com.tencent.ig' },
        { id: 'gg3', name: 'Genshin Impact', publisher: 'HoYoverse', revenue: '$140,000,000', change: '+22%', velocityScore: 72, rankHistory: { '24h': -10, '7d': -38, '30d': -95 }, icon: '🌌', color: '#8b5cf6', type: 'game', storeUrl: 'https://genshin.hoyoverse.com' },
        { id: 'gg4', name: 'Monopoly GO!', publisher: 'Scopely', revenue: '$120,000,000', change: '+28%', velocityScore: 84, rankHistory: { '24h': -22, '7d': -85, '30d': -215 }, icon: '🎲', color: '#10b981', type: 'game', storeUrl: 'https://apps.apple.com/app/monopoly-go' },
        { id: 'gg5', name: 'Royal Match', publisher: 'Dream Games', revenue: '$110,000,000', change: '+35%', velocityScore: 87, rankHistory: { '24h': -18, '7d': -65, '30d': -178 }, icon: '🏰', color: '#f59e0b', type: 'game', storeUrl: 'https://apps.apple.com/app/royal-match' },
    ],
    topFeatured: [
        { id: 'gfu1', name: 'Honkai: Star Rail', score: 945, velocityScore: 91, rankHistory: { '24h': -32, '7d': -128, '30d': -345 }, icon: '🚆', color: '#6366f1', type: 'game', storeUrl: 'https://apps.apple.com/app/honkai-star-rail' },
        { id: 'gfu2', name: 'Royal Match', score: 890, velocityScore: 87, rankHistory: { '24h': -18, '7d': -65, '30d': -178 }, icon: '🏰', color: '#f59e0b', type: 'game', storeUrl: 'https://apps.apple.com/app/royal-match' },
        { id: 'gfu3', name: 'Monopoly GO!', score: 835, velocityScore: 84, rankHistory: { '24h': -22, '7d': -85, '30d': -215 }, icon: '🎲', color: '#10b981', type: 'game', storeUrl: 'https://apps.apple.com/app/monopoly-go' },
        { id: 'gfu4', name: 'Candy Crush Saga', score: 720, velocityScore: 32, rankHistory: { '24h': 3, '7d': 12, '30d': 28 }, icon: '🍬', color: '#ec4899', type: 'game', storeUrl: 'https://play.google.com/store/apps/details?id=com.king.candycrushsaga' },
        { id: 'gfu5', name: 'Coin Master', score: 685, velocityScore: 58, rankHistory: { '24h': -5, '7d': -18, '30d': -45 }, icon: '🐷', color: '#fcd34d', type: 'game', storeUrl: 'https://play.google.com/store/apps/details?id=com.moonactive.coinmaster' },
    ]
};

// App Rankings
export const appRankings = {
    topFree: [
        { id: 'af1', name: 'ChatGPT', publisher: 'OpenAI', downloads: '20,000,000', change: '+5%', icon: '🤖', color: '#10b981', type: 'app', storeUrl: 'https://apps.apple.com/app/chatgpt' },
        { id: 'af2', name: 'TikTok', publisher: 'Bytedance', downloads: '22,000,000', change: '+2%', icon: '🎵', color: '#000000', type: 'app', storeUrl: 'https://www.tiktok.com' },
        { id: 'af3', name: 'Google Gemini', publisher: 'Google LLC', downloads: '10,000,000', change: '+12%', icon: '✨', color: '#4285f4', type: 'app', storeUrl: 'https://play.google.com/store/apps/details?id=com.google.android.apps.bard' },
        { id: 'af4', name: 'Instagram', publisher: 'Meta', downloads: '18,000,000', change: '-1%', icon: '📸', color: '#e1306c', type: 'app', storeUrl: 'https://www.instagram.com' },
        { id: 'af5', name: 'Facebook', publisher: 'Meta', downloads: '15,000,000', change: '0%', icon: '👥', color: '#1877f2', type: 'app', storeUrl: 'https://www.facebook.com' },
    ],
    topGrossing: [
        { id: 'ag1', name: 'TikTok', publisher: 'Bytedance', revenue: '$120,000,000', change: '+8%', icon: '🎵', color: '#000000', type: 'app', storeUrl: 'https://www.tiktok.com' },
        { id: 'ag2', name: 'ChatGPT', publisher: 'OpenAI', revenue: '$110,000,000', change: '+15%', icon: '🤖', color: '#10b981', type: 'app', storeUrl: 'https://apps.apple.com/app/chatgpt' },
        { id: 'ag3', name: 'Google One', publisher: 'Google LLC', revenue: '$85,000,000', change: '+3%', icon: '☁️', color: '#34a853', type: 'app', storeUrl: 'https://one.google.com' },
        { id: 'ag4', name: 'YouTube', publisher: 'Google LLC', revenue: '$75,000,000', change: '+5%', icon: '📺', color: '#ff0000', type: 'app', storeUrl: 'https://www.youtube.com' },
        { id: 'ag5', name: 'Spotify', publisher: 'Spotify AB', revenue: '$65,000,000', change: '+7%', icon: '🎧', color: '#1db954', type: 'app', storeUrl: 'https://www.spotify.com' },
    ],
    topFeatured: [
        { id: 'afu1', name: 'YouTube Kids', score: 890, icon: '🧒', color: '#ff0000', type: 'app', storeUrl: 'https://www.youtubekids.com' },
        { id: 'afu2', name: 'Toca Boca World', score: 766, icon: '🏠', color: '#f43f5e', type: 'app', storeUrl: 'https://tocaboca.com' },
        { id: 'afu3', name: 'Disney+', score: 720, icon: '🏰', color: '#06b6d4', type: 'app', storeUrl: 'https://www.disneyplus.com' },
        { id: 'afu4', name: 'CapCut', score: 648, icon: '🎬', color: '#000000', type: 'app', storeUrl: 'https://www.capcut.com' },
        { id: 'afu5', name: 'Duolingo', score: 554, icon: '🦉', color: '#84cc16', type: 'app', storeUrl: 'https://www.duolingo.com' },
    ]
};

// Default to game rankings (backwards compatibility)
export const storeRankings = gameRankings;

export const appDetailsData = {
    'TikTok': {
        revenue: '$120,000,000',
        downloads: '50,000,000',
        category: 'Social Media / Video',
        studio: 'Bytedance',
        rating: 4.7,
        geoDist: [
            { region: 'United States', percentage: 32, color: '#3b82f6' },
            { region: 'China', percentage: 25, color: '#ef4444' },
            { region: 'Japan', percentage: 12, color: '#f59e0b' },
            { region: 'Others', percentage: 31, color: '#64748b' }
        ],
        performanceHistory: [
            { day: 'Mon', revenue: 3.2, downloads: 1.2 },
            { day: 'Tue', revenue: 3.5, downloads: 1.3 },
            { day: 'Wed', revenue: 3.1, downloads: 1.1 },
            { day: 'Thu', revenue: 3.8, downloads: 1.4 },
            { day: 'Fri', revenue: 4.2, downloads: 1.6 },
            { day: 'Sat', revenue: 4.5, downloads: 1.8 },
            { day: 'Sun', revenue: 4.1, downloads: 1.5 }
        ]
    },
    'ChatGPT': {
        revenue: '$20,000,000',
        downloads: '20,000,000',
        category: 'Productivity / AI',
        studio: 'OpenAI',
        rating: 4.8,
        geoDist: [
            { region: 'USA', percentage: 45, color: '#3b82f6' },
            { region: 'Europe', percentage: 30, color: '#10b981' },
            { region: 'India', percentage: 15, color: '#f59e0b' },
            { region: 'Others', percentage: 10, color: '#64748b' }
        ],
        performanceHistory: [
            { day: 'Mon', revenue: 0.5, downloads: 0.2 },
            { day: 'Tue', revenue: 0.6, downloads: 0.3 },
            { day: 'Wed', revenue: 0.5, downloads: 0.2 },
            { day: 'Thu', revenue: 0.7, downloads: 0.4 },
            { day: 'Fri', revenue: 0.8, downloads: 0.5 },
            { day: 'Sat', revenue: 1.0, downloads: 0.7 },
            { day: 'Sun', revenue: 0.9, downloads: 0.6 }
        ]
    },
    'Google Gemini': {
        revenue: '$5,000,000',
        downloads: '10,000,000',
        category: 'Tools / AI',
        studio: 'Google LLC',
        rating: 4.6,
        geoDist: [
            { region: 'USA', percentage: 50, color: '#3b82f6' },
            { region: 'Japan', percentage: 20, color: '#f59e0b' },
            { region: 'Others', percentage: 30, color: '#64748b' }
        ],
        performanceHistory: [
            { day: 'Mon', revenue: 0.1, downloads: 0.1 },
            { day: 'Tue', revenue: 0.2, downloads: 0.2 },
            { day: 'Wed', revenue: 0.2, downloads: 0.1 },
            { day: 'Thu', revenue: 0.3, downloads: 0.3 },
            { day: 'Fri', revenue: 0.4, downloads: 0.4 },
            { day: 'Sat', revenue: 0.5, downloads: 0.5 },
            { day: 'Sun', revenue: 0.4, downloads: 0.4 }
        ]
    }
};

export const genres = ['MOBA', 'Shooter', 'RPG', 'Puzzle', 'Strategy', 'Casual', 'Action', 'Sim', 'ARCADE'];
export const businessModels = ['Freemium', 'Battle Pass', 'Gacha', 'Ads', 'Hybrid', 'Skins', 'UGC'];

// Predictive Data (Mocked but Realistic curve)
export const predictiveData = [
    { month: 'Sep', actual: 450, forecast: 440, confidence: 95 },
    { month: 'Oct', actual: 480, forecast: 470, confidence: 94 },
    { month: 'Nov', actual: 520, forecast: 510, confidence: 92 },
    { month: 'Dec', actual: 600, forecast: 590, confidence: 90 },
    { month: 'Jan', actual: 580, forecast: 590, confidence: 88 },
    { month: 'Feb', actual: 610, forecast: 600, confidence: 85 }, // Current
    { month: 'Mar', actual: null, forecast: 630, confidence: 75 },
    { month: 'Apr', actual: null, forecast: 650, confidence: 70 },
    { month: 'May', actual: null, forecast: 680, confidence: 65 },
];

export const aiSuggestions = [
    {
        id: 1,
        title: "Implement Battle Pass Season 4",
        description: "Based on 'Royal Match' success, introducing a 30-day seasonal pass could boost retention by 15%.",
        category: "Monetization",
        confidence: 94,
        relevantGenres: ["Puzzle", "Casual"]
    },
    {
        id: 2,
        title: "Gacha Probability Adjustment",
        description: "Competitors like 'Honkai: Star Rail' show that a 0.6% drop rate with a 50-pull pity system maximizes revenue.",
        category: "Engagement",
        confidence: 89,
        relevantGenres: ["RPG", "Strategy"]
    },
    {
        id: 3,
        title: "Cross-Platform Sync Event",
        description: "Enable PC/Mobile progression sync. 'Genshin Impact' sees 40% higher LTV from cross-platform users.",
        category: "Retention",
        confidence: 91,
        relevantGenres: ["RPG", "Action"]
    }
];

// Regional Growth Data (Phase 3)
export const regionalGrowth = [
    {
        name: 'North America',
        growthRate: 45,
        downloads: 85000000,
        revenue: 420000000,
        marketShare: 28,
        trend: 'up',
        isEmerging: false,
        countries: ['USA', 'Canada', 'Mexico'],
        topGames: [
            { name: 'Roblox', icon: '🟥', downloads: 22000000 },
            { name: 'ChatGPT', icon: '🤖', downloads: 20000000 },
            { name: 'Monopoly GO!', icon: '🎲', downloads: 14000000 }
        ]
    },
    {
        name: 'Asia Pacific',
        growthRate: 68,
        downloads: 180000000,
        revenue: 850000000,
        marketShare: 42,
        trend: 'up',
        isEmerging: false,
        countries: ['China', 'Japan', 'South Korea', 'India', 'Southeast Asia'],
        topGames: [
            { name: 'Honor of Kings', icon: '👑', downloads: 12500000 },
            { name: 'PUBG Mobile', icon: '🍳', downloads: 18000000 },
            { name: 'Genshin Impact', icon: '🌌', downloads: 9000000 }
        ]
    },
    {
        name: 'Europe',
        growthRate: 38,
        downloads: 65000000,
        revenue: 310000000,
        marketShare: 18,
        trend: 'up',
        isEmerging: false,
        countries: ['UK', 'Germany', 'France', 'Italy', 'Spain'],
        topGames: [
            { name: 'Royal Match', icon: '🏰', downloads: 15000000 },
            { name: 'Candy Crush Saga', icon: '🍬', downloads: 11000000 },
            { name: 'Subway Surfers', icon: '🚇', downloads: 7000000 }
        ]
    },
    {
        name: 'Latin America',
        growthRate: 92,
        downloads: 45000000,
        revenue: 85000000,
        marketShare: 8,
        trend: 'up',
        isEmerging: true,
        countries: ['Brazil', 'Argentina', 'Colombia', 'Chile'],
        topGames: [
            { name: 'Subway Surfers', icon: '🚇', downloads: 7000000 },
            { name: 'Coin Master', icon: '🐷', downloads: 6000000 },
            { name: 'PUBG Mobile', icon: '🍳', downloads: 5500000 }
        ]
    },
    {
        name: 'Middle East',
        growthRate: 78,
        downloads: 38000000,
        revenue: 120000000,
        marketShare: 6,
        trend: 'up',
        isEmerging: true,
        countries: ['UAE', 'Saudi Arabia', 'Turkey', 'Egypt'],
        topGames: [
            { name: 'Royal Match', icon: '🏰', downloads: 8000000 },
            { name: 'PUBG Mobile', icon: '🍳', downloads: 6500000 },
            { name: 'Coin Master', icon: '🐷', downloads: 4200000 }
        ]
    },
    {
        name: 'Africa',
        growthRate: 125,
        downloads: 22000000,
        revenue: 35000000,
        marketShare: 3,
        trend: 'up',
        isEmerging: true,
        countries: ['South Africa', 'Nigeria', 'Kenya', 'Egypt'],
        topGames: [
            { name: 'Subway Surfers', icon: '🚇', downloads: 4500000 },
            { name: 'Candy Crush Saga', icon: '🍬', downloads: 3800000 },
            { name: 'PUBG Mobile', icon: '🍳', downloads: 3200000 }
        ]
    },
    {
        name: 'Southeast Asia',
        growthRate: 105,
        downloads: 72000000,
        revenue: 180000000,
        marketShare: 12,
        trend: 'up',
        isEmerging: true,
        countries: ['Indonesia', 'Philippines', 'Thailand', 'Vietnam', 'Malaysia'],
        topGames: [
            { name: 'PUBG Mobile', icon: '🍳', downloads: 12000000 },
            { name: 'Genshin Impact', icon: '🌌', downloads: 5500000 },
            { name: 'Roblox', icon: '🟥', downloads: 8500000 }
        ]
    },
    {
        name: 'Oceania',
        growthRate: 32,
        downloads: 12000000,
        revenue: 58000000,
        marketShare: 2,
        trend: 'up',
        isEmerging: false,
        countries: ['Australia', 'New Zealand'],
        topGames: [
            { name: 'Roblox', icon: '🟥', downloads: 3200000 },
            { name: 'Candy Crush Saga', icon: '🍬', downloads: 2800000 },
            { name: 'Royal Match', icon: '🏰', downloads: 2500000 }
        ]
    }
];

// Genre Intelligence Data (Phase 4)
export const genreIntelligence = [
    {
        name: 'RPG',
        icon: '⚔️',
        subGenre: 'Action RPG, Turn-Based, MMO',
        growthRate: 58,
        gameCount: 145,
        totalDownloads: 95000000,
        totalRevenue: 580000000,
        isHybrid: false,
        mechanics: [
            { name: 'Gacha System', popularity: 92 },
            { name: 'Character Progression', popularity: 88 },
            { name: 'Turn-Based Combat', popularity: 65 },
            { name: 'Open World', popularity: 72 }
        ],
        topGames: [
            { name: 'Genshin Impact', icon: '🌌' },
            { name: 'Honkai: Star Rail', icon: '🚆' }
        ]
    },
    {
        name: 'Puzzle',
        icon: '🧩',
        subGenre: 'Match-3, Physics, Logic',
        growthRate: 42,
        gameCount: 320,
        totalDownloads: 125000000,
        totalRevenue: 420000000,
        isHybrid: false,
        mechanics: [
            { name: 'Match-3', popularity: 85 },
            { name: 'Power-Ups', popularity: 78 },
            { name: 'Daily Challenges', popularity: 82 },
            { name: 'Lives System', popularity: 90 }
        ],
        topGames: [
            { name: 'Royal Match', icon: '🏰' },
            { name: 'Candy Crush Saga', icon: '🍬' }
        ]
    },
    {
        name: 'Casual',
        icon: '🎲',
        subGenre: 'Hypercasual, Idle, Merge',
        growthRate: 78,
        gameCount: 580,
        totalDownloads: 180000000,
        totalRevenue: 320000000,
        isHybrid: false,
        mechanics: [
            { name: 'One-Tap Gameplay', popularity: 95 },
            { name: 'Idle Mechanics', popularity: 68 },
            { name: 'Daily Rewards', popularity: 88 },
            { name: 'Ad-Based Boosts', popularity: 75 }
        ],
        topGames: [
            { name: 'Monopoly GO!', icon: '🎲' },
            { name: 'Coin Master', icon: '🐷' }
        ]
    },
    {
        name: 'MOBA',
        icon: '👑',
        subGenre: '5v5, MOBA Lite, Auto-Chess',
        growthRate: 35,
        gameCount: 42,
        totalDownloads: 65000000,
        totalRevenue: 650000000,
        isHybrid: true,
        hybridComponents: ['Strategy', 'Action'],
        mechanics: [
            { name: '5v5 Battles', popularity: 90 },
            { name: 'Hero Collection', popularity: 85 },
            { name: 'Ranked System', popularity: 92 },
            { name: 'Team Synergy', popularity: 78 }
        ],
        topGames: [
            { name: 'Honor of Kings', icon: '👑' },
            { name: 'Mobile Legends', icon: '⚡' }
        ]
    },
    {
        name: 'Shooter',
        icon: '🔫',
        subGenre: 'Battle Royale, FPS, TPS',
        growthRate: 48,
        gameCount: 95,
        totalDownloads: 110000000,
        totalRevenue: 480000000,
        isHybrid: true,
        hybridComponents: ['Action', 'Strategy'],
        mechanics: [
            { name: 'Battle Royale', popularity: 88 },
            { name: 'Weapon Customization', popularity: 82 },
            { name: 'Squad System', popularity: 85 },
            { name: 'Loot System', popularity: 90 }
        ],
        topGames: [
            { name: 'PUBG Mobile', icon: '🍳' },
            { name: 'Call of Duty Mobile', icon: '🎯' }
        ]
    },
    {
        name: 'Strategy',
        icon: '🏰',
        subGenre: 'Tower Defense, 4X, RTS',
        growthRate: 38,
        gameCount: 125,
        totalDownloads: 55000000,
        totalRevenue: 280000000,
        isHybrid: false,
        mechanics: [
            { name: 'Base Building', popularity: 88 },
            { name: 'Resource Management', popularity: 92 },
            { name: 'Alliance System', popularity: 75 },
            { name: 'PvP Battles', popularity: 80 }
        ],
        topGames: [
            { name: 'Clash of Clans', icon: '⚔️' },
            { name: 'Rise of Kingdoms', icon: '🏛️' }
        ]
    },
    {
        name: 'Action',
        icon: '⚡',
        subGenre: 'Platformer, Fighting, Brawler',
        growthRate: 52,
        gameCount: 210,
        totalDownloads: 88000000,
        totalRevenue: 340000000,
        isHybrid: false,
        mechanics: [
            { name: 'Real-Time Combat', popularity: 90 },
            { name: 'Combo System', popularity: 75 },
            { name: 'Boss Battles', popularity: 82 },
            { name: 'Skill Trees', popularity: 70 }
        ],
        topGames: [
            { name: 'Brawl Stars', icon: '🌟' },
            { name: 'Stumble Guys', icon: '🏃' }
        ]
    },
    {
        name: 'Simulation',
        icon: '🏡',
        subGenre: 'Life Sim, Business Sim, Sports Sim',
        growthRate: 45,
        gameCount: 165,
        totalDownloads: 72000000,
        totalRevenue: 220000000,
        isHybrid: false,
        mechanics: [
            { name: 'Sandbox Building', popularity: 85 },
            { name: 'Time Management', popularity: 78 },
            { name: 'Career Progression', popularity: 68 },
            { name: 'Social Interaction', popularity: 82 }
        ],
        topGames: [
            { name: 'The Sims Mobile', icon: '👨‍👩‍👧‍👦' },
            { name: 'Farming Simulator', icon: '🚜' }
        ]
    },
    {
        name: 'Sports',
        icon: '⚽',
        subGenre: 'Soccer, Basketball, Racing',
        growthRate: 32,
        gameCount: 88,
        totalDownloads: 48000000,
        totalRevenue: 195000000,
        isHybrid: false,
        mechanics: [
            { name: 'Team Management', popularity: 88 },
            { name: 'Career Mode', popularity: 82 },
            { name: 'Ultimate Team', popularity: 92 },
            { name: 'Online Multiplayer', popularity: 85 }
        ],
        topGames: [
            { name: 'FIFA Mobile', icon: '⚽' },
            { name: 'NBA 2K Mobile', icon: '🏀' }
        ]
    },
    {
        name: 'Sandbox',
        icon: '🟥',
        subGenre: 'Creative, Building, UGC',
        growthRate: 68,
        gameCount: 45,
        totalDownloads: 95000000,
        totalRevenue: 420000000,
        isHybrid: true,
        hybridComponents: ['Simulation', 'Social'],
        mechanics: [
            { name: 'User-Generated Content', popularity: 98 },
            { name: 'Building Tools', popularity: 90 },
            { name: 'Multiplayer Worlds', popularity: 95 },
            { name: 'Avatar Customization', popularity: 88 }
        ],
        topGames: [
            { name: 'Roblox', icon: '🟥' },
            { name: 'Minecraft', icon: '⛏️' }
        ]
    }
];

// Monetization Analysis Data (Phase 5)
export const monetizationData = [
    {
        name: 'Genshin Impact',
        icon: '🌌',
        genre: 'RPG',
        businessModel: 'Gacha',
        arpu: 72.50,
        iapRatio: 95,
        adsRatio: 5,
        payingUserPercentage: 15.2,
        avgPurchaseSize: 45.80,
        ltv: 185.30,
        paywallDepth: 'soft',
        firstPaywallTime: '15-20 min',
        paywallDescription: 'Generous free content with optional gacha wishes. Soft paywall after first region exploration.'
    },
    {
        name: 'Royal Match',
        icon: '🏰',
        genre: 'Puzzle',
        businessModel: 'Freemium',
        arpu: 38.20,
        iapRatio: 75,
        adsRatio: 25,
        payingUserPercentage: 8.5,
        avgPurchaseSize: 12.99,
        ltv: 125.40,
        paywallDepth: 'moderate',
        firstPaywallTime: '5-8 levels',
        paywallDescription: 'Strategic paywalls at difficulty spikes. Boosters and extra lives offered when players fail levels.'
    },
    {
        name: 'PUBG Mobile',
        icon: '🍳',
        genre: 'Shooter',
        businessModel: 'Battle Pass',
        arpu: 48.60,
        iapRatio: 85,
        adsRatio: 15,
        payingUserPercentage: 12.3,
        avgPurchaseSize: 24.99,
        ltv: 142.80,
        paywallDepth: 'soft',
        firstPaywallTime: 'After 3-5 matches',
        paywallDescription: 'Cosmetic-only IAP with seasonal battle pass. No pay-to-win mechanics.'
    },
    {
        name: 'Coin Master',
        icon: '🐷',
        genre: 'Casual',
        businessModel: 'Gacha',
        arpu: 32.40,
        iapRatio: 60,
        adsRatio: 40,
        payingUserPercentage: 6.8,
        avgPurchaseSize: 8.99,
        ltv: 85.20,
        paywallDepth: 'aggressive',
        firstPaywallTime: '2-3 min',
        paywallDescription: 'Frequent spin shortages trigger paywall. Heavy ad integration with rewarded videos.'
    },
    {
        name: 'Roblox',
        icon: '🟥',
        genre: 'Sandbox',
        businessModel: 'UGC',
        arpu: 55.80,
        iapRatio: 90,
        adsRatio: 10,
        payingUserPercentage: 22.5,
        avgPurchaseSize: 19.99,
        ltv: 220.50,
        paywallDepth: 'soft',
        firstPaywallTime: '10-15 min',
        paywallDescription: 'Economy driven by Robux purchases for avatar items and game passes. User-created monetization.'
    },
    {
        name: 'Candy Crush Saga',
        icon: '🍬',
        genre: 'Puzzle',
        businessModel: 'Freemium',
        arpu: 28.90,
        iapRatio: 70,
        adsRatio: 30,
        payingUserPercentage: 5.2,
        avgPurchaseSize: 9.99,
        ltv: 92.60,
        paywallDepth: 'moderate',
        firstPaywallTime: 'Level 10-15',
        paywallDescription: 'Lives system creates natural paywalls. Boosters and gold bars offered at difficulty spikes.'
    },
    {
        name: 'Honor of Kings',
        icon: '👑',
        genre: 'MOBA',
        businessModel: 'Freemium',
        arpu: 65.30,
        iapRatio: 92,
        adsRatio: 8,
        payingUserPercentage: 18.7,
        avgPurchaseSize: 32.50,
        ltv: 195.80,
        paywallDepth: 'soft',
        firstPaywallTime: 'After 5 matches',
        paywallDescription: 'Hero and skin purchases drive revenue. Competitive integrity maintained with no pay-to-win.'
    },
    {
        name: 'Monopoly GO!',
        icon: '🎲',
        genre: 'Casual',
        businessModel: 'Freemium',
        arpu: 42.70,
        iapRatio: 65,
        adsRatio: 35,
        payingUserPercentage: 9.8,
        avgPurchaseSize: 14.99,
        ltv: 118.40,
        paywallDepth: 'moderate',
        firstPaywallTime: '10-12 rounds',
        paywallDescription: 'Dice roll shortages and event participation drive IAP. Rewarded ads for extra rolls.'
    },
    {
        name: 'Subway Surfers',
        icon: '🚇',
        genre: 'Arcade',
        businessModel: 'Freemium',
        arpu: 18.50,
        iapRatio: 45,
        adsRatio: 55,
        payingUserPercentage: 3.2,
        avgPurchaseSize: 5.99,
        ltv: 48.30,
        paywallDepth: 'soft',
        firstPaywallTime: 'After 5-10 runs',
        paywallDescription: 'Ad-heavy monetization with optional IAP for character unlocks and powerups.'
    },
    {
        name: 'Clash of Clans',
        icon: '⚔️',
        genre: 'Strategy',
        businessModel: 'Freemium',
        arpu: 52.10,
        iapRatio: 88,
        adsRatio: 12,
        payingUserPercentage: 14.5,
        avgPurchaseSize: 28.99,
        ltv: 168.70,
        paywallDepth: 'moderate',
        firstPaywallTime: 'Town Hall 3-4',
        paywallDescription: 'Time-based building creates natural friction. Gem purchases accelerate progression.'
    },
    {
        name: 'Honkai: Star Rail',
        icon: '🚆',
        genre: 'RPG',
        businessModel: 'Gacha',
        arpu: 68.90,
        iapRatio: 94,
        adsRatio: 6,
        payingUserPercentage: 16.8,
        avgPurchaseSize: 42.50,
        ltv: 178.60,
        paywallDepth: 'soft',
        firstPaywallTime: '20-25 min',
        paywallDescription: 'Premium gacha with generous pity system. Story content fully accessible F2P.'
    },
    {
        name: 'ChatGPT',
        icon: '🤖',
        genre: 'Productivity',
        businessModel: 'Subscription',
        arpu: 15.80,
        iapRatio: 95,
        adsRatio: 5,
        payingUserPercentage: 4.2,
        avgPurchaseSize: 20.00,
        ltv: 240.00,
        paywallDepth: 'soft',
        firstPaywallTime: 'After 10-15 queries',
        paywallDescription: 'Freemium with $20/month Plus subscription for GPT-4 access and priority.'
    }
];

// Creative & Marketing Intelligence Data
export const marketingData = [
    {
        gameName: 'Genshin Impact',
        icon: '🌌',
        adCreativeBreakdown: {
            playable: { usage: '20%', effectiveness: 'high' },
            ugc: { usage: '40%', effectiveness: 'high' },
            video: { usage: '35%', effectiveness: 'high' },
            static: { usage: '5%', effectiveness: 'medium' }
        },
        topAdNetworks: [
            { network: 'Meta Ads', spend: '$2.5M', installs: '850K', cpi: '$2.94' },
            { network: 'TikTok Ads', spend: '$1.8M', installs: '720K', cpi: '$2.50' },
            { network: 'Google Ads', spend: '$1.2M', installs: '500K', cpi: '$2.40' }
        ],
        cpiData: {
            global: '$2.67',
            byCountry: {
                'USA': '$8.50',
                'Japan': '$6.20',
                'China': '$4.80',
                'UK': '$5.50',
                'Germany': '$4.90',
                'South Korea': '$5.30',
                'Brazil': '$1.80',
                'India': '$0.65'
            }
        },
        growthType: {
            viral: 45,
            paid: 55,
            kFactor: 1.8
        }
    },
    {
        gameName: 'Roblox',
        icon: '🟦',
        adCreativeBreakdown: {
            playable: { usage: '15%', effectiveness: 'medium' },
            ugc: { usage: '55%', effectiveness: 'high' },
            video: { usage: '25%', effectiveness: 'high' },
            static: { usage: '5%', effectiveness: 'low' }
        },
        topAdNetworks: [
            { network: 'Meta Ads', spend: '$3.2M', installs: '1.2M', cpi: '$2.67' },
            { network: 'Google Ads', spend: '$2.1M', installs: '850K', cpi: '$2.47' },
            { network: 'TikTok Ads', spend: '$1.5M', installs: '680K', cpi: '$2.21' }
        ],
        cpiData: {
            global: '$2.45',
            byCountry: {
                'USA': '$7.80',
                'UK': '$5.20',
                'Japan': '$4.50',
                'China': '$3.80',
                'Germany': '$4.60',
                'South Korea': '$4.20',
                'Brazil': '$1.50',
                'India': '$0.55'
            }
        },
        growthType: {
            viral: 62,
            paid: 38,
            kFactor: 2.3
        }
    },
    {
        gameName: 'PUBG Mobile',
        icon: '🎮',
        adCreativeBreakdown: {
            playable: { usage: '30%', effectiveness: 'high' },
            ugc: { usage: '25%', effectiveness: 'medium' },
            video: { usage: '40%', effectiveness: 'high' },
            static: { usage: '5%', effectiveness: 'low' }
        },
        topAdNetworks: [
            { network: 'Google Ads', spend: '$2.8M', installs: '1.1M', cpi: '$2.55' },
            { network: 'Meta Ads', spend: '$2.3M', installs: '920K', cpi: '$2.50' },
            { network: 'Unity Ads', spend: '$1.4M', installs: '580K', cpi: '$2.41' }
        ],
        cpiData: {
            global: '$2.52',
            byCountry: {
                'USA': '$9.20',
                'China': '$5.50',
                'Japan': '$7.10',
                'UK': '$6.30',
                'Germany': '$5.80',
                'South Korea': '$6.50',
                'Brazil': '$2.10',
                'India': '$0.70'
            }
        },
        growthType: {
            viral: 38,
            paid: 62,
            kFactor: 1.5
        }
    },
    {
        gameName: 'Coin Master',
        icon: '🎰',
        adCreativeBreakdown: {
            playable: { usage: '25%', effectiveness: 'medium' },
            ugc: { usage: '15%', effectiveness: 'low' },
            video: { usage: '50%', effectiveness: 'high' },
            static: { usage: '10%', effectiveness: 'low' }
        },
        topAdNetworks: [
            { network: 'Meta Ads', spend: '$4.2M', installs: '1.5M', cpi: '$2.80' },
            { network: 'ironSource', spend: '$2.5M', installs: '950K', cpi: '$2.63' },
            { network: 'Unity Ads', spend: '$1.8M', installs: '720K', cpi: '$2.50' }
        ],
        cpiData: {
            global: '$2.72',
            byCountry: {
                'USA': '$10.50',
                'UK': '$7.20',
                'Germany': '$6.50',
                'Japan': '$5.80',
                'China': '$4.20',
                'South Korea': '$5.20',
                'Brazil': '$2.30',
                'India': '$0.85'
            }
        },
        growthType: {
            viral: 22,
            paid: 78,
            kFactor: 0.8
        }
    },
    {
        gameName: 'Royal Match',
        icon: '👑',
        adCreativeBreakdown: {
            playable: { usage: '45%', effectiveness: 'high' },
            ugc: { usage: '10%', effectiveness: 'low' },
            video: { usage: '40%', effectiveness: 'high' },
            static: { usage: '5%', effectiveness: 'low' },
            fake: { usage: '15%', effectiveness: 'medium' }
        },
        topAdNetworks: [
            { network: 'Meta Ads', spend: '$5.8M', installs: '2.1M', cpi: '$2.76' },
            { network: 'Google Ads', spend: '$3.2M', installs: '1.3M', cpi: '$2.46' },
            { network: 'Unity Ads', spend: '$2.1M', installs: '850K', cpi: '$2.47' }
        ],
        cpiData: {
            global: '$2.65',
            byCountry: {
                'USA': '$11.20',
                'UK': '$7.80',
                'Germany': '$6.90',
                'Japan': '$5.50',
                'China': '$3.90',
                'South Korea': '$4.80',
                'Brazil': '$2.00',
                'India': '$0.75'
            }
        },
        growthType: {
            viral: 18,
            paid: 82,
            kFactor: 0.6
        }
    },
    {
        gameName: 'Subway Surfers',
        icon: '🛹',
        adCreativeBreakdown: {
            playable: { usage: '35%', effectiveness: 'high' },
            ugc: { usage: '30%', effectiveness: 'medium' },
            video: { usage: '30%', effectiveness: 'high' },
            static: { usage: '5%', effectiveness: 'low' }
        },
        topAdNetworks: [
            { network: 'Unity Ads', spend: '$1.8M', installs: '920K', cpi: '$1.96' },
            { network: 'Meta Ads', spend: '$1.5M', installs: '780K', cpi: '$1.92' },
            { network: 'AppLovin', spend: '$1.2M', installs: '640K', cpi: '$1.88' }
        ],
        cpiData: {
            global: '$1.95',
            byCountry: {
                'USA': '$6.50',
                'UK': '$4.20',
                'Germany': '$3.90',
                'Japan': '$3.50',
                'China': '$2.80',
                'South Korea': '$3.20',
                'Brazil': '$1.20',
                'India': '$0.45'
            }
        },
        growthType: {
            viral: 52,
            paid: 48,
            kFactor: 1.9
        }
    },
    {
        gameName: 'Candy Crush Saga',
        icon: '🍬',
        adCreativeBreakdown: {
            playable: { usage: '50%', effectiveness: 'high' },
            ugc: { usage: '5%', effectiveness: 'low' },
            video: { usage: '40%', effectiveness: 'high' },
            static: { usage: '5%', effectiveness: 'low' }
        },
        topAdNetworks: [
            { network: 'Meta Ads', spend: '$3.5M', installs: '1.4M', cpi: '$2.50' },
            { network: 'Google Ads', spend: '$2.2M', installs: '950K', cpi: '$2.32' },
            { network: 'ironSource', spend: '$1.6M', installs: '680K', cpi: '$2.35' }
        ],
        cpiData: {
            global: '$2.42',
            byCountry: {
                'USA': '$9.80',
                'UK': '$6.50',
                'Germany': '$5.80',
                'Japan': '$4.90',
                'China': '$3.50',
                'South Korea': '$4.20',
                'Brazil': '$1.70',
                'India': '$0.60'
            }
        },
        growthType: {
            viral: 28,
            paid: 72,
            kFactor: 1.1
        }
    },
    {
        gameName: 'Honor of Kings',
        icon: '👑',
        adCreativeBreakdown: {
            playable: { usage: '25%', effectiveness: 'high' },
            ugc: { usage: '35%', effectiveness: 'high' },
            video: { usage: '35%', effectiveness: 'high' },
            static: { usage: '5%', effectiveness: 'medium' }
        },
        topAdNetworks: [
            { network: 'TikTok Ads', spend: '$3.8M', installs: '1.5M', cpi: '$2.53' },
            { network: 'Meta Ads', spend: '$2.9M', installs: '1.2M', cpi: '$2.42' },
            { network: 'Google Ads', spend: '$1.8M', installs: '780K', cpi: '$2.31' }
        ],
        cpiData: {
            global: '$2.45',
            byCountry: {
                'China': '$5.20',
                'USA': '$8.90',
                'Japan': '$6.80',
                'South Korea': '$6.20',
                'UK': '$5.50',
                'Germany': '$4.90',
                'Brazil': '$1.90',
                'India': '$0.68'
            }
        },
        growthType: {
            viral: 48,
            paid: 52,
            kFactor: 1.7
        }
    },
    {
        gameName: 'Monopoly GO!',
        icon: '🎲',
        adCreativeBreakdown: {
            playable: { usage: '40%', effectiveness: 'high' },
            ugc: { usage: '20%', effectiveness: 'medium' },
            video: { usage: '35%', effectiveness: 'high' },
            static: { usage: '5%', effectiveness: 'low' }
        },
        topAdNetworks: [
            { network: 'Meta Ads', spend: '$4.5M', installs: '1.8M', cpi: '$2.50' },
            { network: 'Google Ads', spend: '$3.1M', installs: '1.3M', cpi: '$2.38' },
            { network: 'Unity Ads', spend: '$2.2M', installs: '920K', cpi: '$2.39' }
        ],
        cpiData: {
            global: '$2.48',
            byCountry: {
                'USA': '$10.20',
                'UK': '$7.10',
                'Germany': '$6.20',
                'Japan': '$5.20',
                'China': '$3.80',
                'South Korea': '$4.50',
                'Brazil': '$1.80',
                'India': '$0.72'
            }
        },
        growthType: {
            viral: 32,
            paid: 68,
            kFactor: 1.3
        }
    },
    {
        gameName: 'Clash of Clans',
        icon: '⚔️',
        adCreativeBreakdown: {
            playable: { usage: '30%', effectiveness: 'high' },
            ugc: { usage: '25%', effectiveness: 'high' },
            video: { usage: '40%', effectiveness: 'high' },
            static: { usage: '5%', effectiveness: 'low' }
        },
        topAdNetworks: [
            { network: 'Meta Ads', spend: '$2.8M', installs: '1.1M', cpi: '$2.55' },
            { network: 'Google Ads', spend: '$2.1M', installs: '880K', cpi: '$2.39' },
            { network: 'ironSource', spend: '$1.5M', installs: '620K', cpi: '$2.42' }
        ],
        cpiData: {
            global: '$2.48',
            byCountry: {
                'USA': '$9.50',
                'UK': '$6.80',
                'Germany': '$5.90',
                'Japan': '$5.50',
                'China': '$4.10',
                'South Korea': '$4.80',
                'Brazil': '$1.90',
                'India': '$0.70'
            }
        },
        growthType: {
            viral: 42,
            paid: 58,
            kFactor: 1.6
        }
    },
    {
        gameName: 'Honkai: Star Rail',
        icon: '🚆',
        adCreativeBreakdown: {
            playable: { usage: '25%', effectiveness: 'high' },
            ugc: { usage: '38%', effectiveness: 'high' },
            video: { usage: '32%', effectiveness: 'high' },
            static: { usage: '5%', effectiveness: 'medium' }
        },
        topAdNetworks: [
            { network: 'TikTok Ads', spend: '$2.3M', installs: '920K', cpi: '$2.50' },
            { network: 'Meta Ads', spend: '$1.9M', installs: '780K', cpi: '$2.44' },
            { network: 'Google Ads', spend: '$1.4M', installs: '590K', cpi: '$2.37' }
        ],
        cpiData: {
            global: '$2.46',
            byCountry: {
                'USA': '$8.20',
                'Japan': '$6.50',
                'China': '$5.10',
                'UK': '$5.80',
                'Germany': '$5.20',
                'South Korea': '$5.60',
                'Brazil': '$1.70',
                'India': '$0.62'
            }
        },
        growthType: {
            viral: 44,
            paid: 56,
            kFactor: 1.7
        }
    },
    {
        gameName: 'ChatGPT',
        icon: '🤖',
        adCreativeBreakdown: {
            playable: { usage: '10%', effectiveness: 'low' },
            ugc: { usage: '45%', effectiveness: 'high' },
            video: { usage: '40%', effectiveness: 'high' },
            static: { usage: '5%', effectiveness: 'medium' }
        },
        topAdNetworks: [
            { network: 'Google Ads', spend: '$1.8M', installs: '950K', cpi: '$1.89' },
            { network: 'Meta Ads', spend: '$1.3M', installs: '720K', cpi: '$1.81' },
            { network: 'TikTok Ads', spend: '$0.9M', installs: '480K', cpi: '$1.88' }
        ],
        cpiData: {
            global: '$1.86',
            byCountry: {
                'USA': '$5.80',
                'UK': '$4.20',
                'Germany': '$3.80',
                'Japan': '$3.50',
                'China': '$2.90',
                'South Korea': '$3.20',
                'Brazil': '$1.10',
                'India': '$0.42'
            }
        },
        growthType: {
            viral: 68,
            paid: 32,
            kFactor: 2.5
        }
    }
];

// Gameplay Mechanic Tagging Data
export const mechanicData = {
    mechanics: [
        {
            name: 'gacha system',
            popularity: 85,
            trend: 28,
            gameCount: 342,
            category: 'Monetization',
            exampleGames: ['Genshin Impact', 'Honkai: Star Rail', 'Fate/Grand Order']
        },
        {
            name: 'merge mechanic',
            popularity: 78,
            trend: 42,
            gameCount: 256,
            category: 'Core Loop',
            exampleGames: ['Merge Dragons', 'Merge Mansion', 'Merge Gardens']
        },
        {
            name: 'idle progression',
            popularity: 72,
            trend: -15,
            gameCount: 418,
            category: 'Core Loop',
            exampleGames: ['AFK Arena', 'Idle Heroes', 'Almost a Hero']
        },
        {
            name: 'battle pass',
            popularity: 68,
            trend: 18,
            gameCount: 189,
            category: 'Monetization',
            exampleGames: ['PUBG Mobile', 'Call of Duty Mobile', 'Fortnite']
        },
        {
            name: 'character collection',
            popularity: 65,
            trend: 22,
            gameCount: 324,
            category: 'Progression',
            exampleGames: ['Genshin Impact', 'Marvel Strike Force', 'AFK Arena']
        },
        {
            name: 'base building',
            popularity: 62,
            trend: -8,
            gameCount: 283,
            category: 'Progression',
            exampleGames: ['Clash of Clans', 'Rise of Kingdoms', 'State of Survival']
        },
        {
            name: 'pvp arena',
            popularity: 58,
            trend: 12,
            gameCount: 267,
            category: 'Social',
            exampleGames: ['Brawl Stars', 'Clash Royale', 'PUBG Mobile']
        },
        {
            name: 'auto-battler',
            popularity: 55,
            trend: 35,
            gameCount: 142,
            category: 'Core Loop',
            exampleGames: ['Auto Chess', 'Teamfight Tactics', 'Dota Underlords']
        },
        {
            name: 'deckbuilding',
            popularity: 52,
            trend: 16,
            gameCount: 178,
            category: 'Core Loop',
            exampleGames: ['Hearthstone', 'Marvel Snap', 'Legends of Runeterra']
        },
        {
            name: 'roguelike',
            popularity: 48,
            trend: 24,
            gameCount: 156,
            category: 'Core Loop',
            exampleGames: ['Hades', 'Dead Cells', 'Slay the Spire']
        },
        {
            name: 'city builder',
            popularity: 45,
            trend: 42,
            gameCount: 198,
            category: 'Progression',
            exampleGames: ['SimCity BuildIt', 'Township', 'City Island']
        },
        {
            name: 'guild system',
            popularity: 42,
            trend: 8,
            gameCount: 245,
            category: 'Social',
            exampleGames: ['Clash of Clans', 'Summoners War', 'RAID: Shadow Legends']
        },
        {
            name: 'energy system',
            popularity: 40,
            trend: -12,
            gameCount: 356,
            category: 'Monetization',
            exampleGames: ['Candy Crush', 'Coin Master', 'Homescapes']
        },
        {
            name: 'prestige system',
            popularity: 38,
            trend: 10,
            gameCount: 167,
            category: 'Progression',
            exampleGames: ['Cookie Clicker', 'Adventure Capitalist', 'Egg Inc']
        },
        {
            name: 'co-op raids',
            popularity: 35,
            trend: 18,
            gameCount: 134,
            category: 'Social',
            exampleGames: ['Genshin Impact', 'Destiny 2', 'Monster Hunter']
        },
        {
            name: 'extraction loop',
            popularity: 32,
            trend: 45,
            gameCount: 89,
            category: 'Core Loop',
            exampleGames: ['Escape from Tarkov Mobile', 'The Cycle', 'Dark and Darker']
        },
        {
            name: 'skill tree',
            popularity: 30,
            trend: 5,
            gameCount: 212,
            category: 'Progression',
            exampleGames: ['Path of Exile', 'Diablo Immortal', 'Borderlands']
        },
        {
            name: 'leaderboards',
            popularity: 28,
            trend: -5,
            gameCount: 387,
            category: 'Social',
            exampleGames: ['Subway Surfers', 'Temple Run', 'Candy Crush']
        },
        {
            name: 'loot boxes',
            popularity: 25,
            trend: -18,
            gameCount: 178,
            category: 'Monetization',
            exampleGames: ['FIFA Mobile', 'NBA 2K Mobile', 'Overwatch']
        },
        {
            name: 'season pass',
            popularity: 22,
            trend: 14,
            gameCount: 145,
            category: 'Monetization',
            exampleGames: ['Apex Legends Mobile', 'PUBG Mobile', 'Free Fire']
        }
    ],
    combinations: [
        { combination: 'Merge + City Builder', gameCount: 45, avgRevenue: 12.5, trend: 42 },
        { combination: 'Gacha + RPG', gameCount: 78, avgRevenue: 28.3, trend: 28 },
        { combination: 'Idle + Collection', gameCount: 62, avgRevenue: 8.7, trend: -8 },
        { combination: 'Auto-Battler + Deckbuilding', gameCount: 34, avgRevenue: 15.2, trend: 35 },
        { combination: 'Base Building + PvP', gameCount: 56, avgRevenue: 18.9, trend: 12 },
        { combination: 'Roguelike + Deckbuilding', gameCount: 42, avgRevenue: 9.4, trend: 24 },
        { combination: 'Extraction + Battle Royale', gameCount: 28, avgRevenue: 22.1, trend: 45 },
        { combination: 'Gacha + Auto-Battler', gameCount: 38, avgRevenue: 16.8, trend: 31 },
        { combination: 'City Builder + Match-3', gameCount: 51, avgRevenue: 11.3, trend: 18 },
        { combination: 'Idle + Prestige', gameCount: 67, avgRevenue: 6.2, trend: 10 },
        { combination: 'PvP + Guild System', gameCount: 49, avgRevenue: 14.6, trend: 8 },
        { combination: 'Co-op + Raid Mechanics', gameCount: 31, avgRevenue: 19.7, trend: 18 }
    ],
    trendAlerts: [
        {
            message: "Merge + City Builder is trending +42% WoW 🔥",
            details: "45 games with this combination averaging $12.5M revenue"
        },
        {
            message: "Extraction loop mechanics surging +45% 📈",
            details: "New genre emerging with high engagement rates"
        },
        {
            message: "Gacha systems in puzzle games up +28% 🎰",
            details: "Traditional puzzle games adopting collection mechanics"
        },
        {
            message: "Idle progression mechanics declining -15% 📉",
            details: "Market showing fatigue, active gameplay trending up"
        },
        {
            message: "Auto-Battler + Gacha combination hot +31% 🚀",
            details: "38 games leveraging this combo with strong monetization"
        }
    ]
};


