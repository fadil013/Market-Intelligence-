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

// Review Sentiment & Feature Mining Data
export const reviewData = [
    {
        gameName: 'Genshin Impact',
        icon: '🌌',
        sentimentScore: 0.82,
        volatility: 'stable',
        churnSignals: ['low'],
        lovedFeatures: [
            { feature: 'Graphics & Visuals', mentions: 2847, sentiment: 0.95 },
            { feature: 'Open World Exploration', mentions: 2156, sentiment: 0.92 },
            { feature: 'Character Design', mentions: 1923, sentiment: 0.91 },
            { feature: 'Story & Lore', mentions: 1654, sentiment: 0.88 }
        ],
        complaints: [
            { issue: 'Gacha Rates', mentions: 1234, sentiment: -0.72 },
            { issue: 'Resin System', mentions: 987, sentiment: -0.68 },
            { issue: 'Artifact RNG', mentions: 654, sentiment: -0.65 }
        ],
        featureRequests: [
            { request: 'More Endgame Content', mentions: 876, votes: 1845 },
            { request: 'Skip Dialogue Option', mentions: 543, votes: 1234 },
            { request: 'Loadout System', mentions: 432, votes: 987 }
        ]
    },
    {
        gameName: 'Roblox',
        icon: '🟦',
        sentimentScore: 0.75,
        volatility: 'volatile',
        churnSignals: ['medium'],
        lovedFeatures: [
            { feature: 'User-Generated Content', mentions: 3421, sentiment: 0.94 },
            { feature: 'Social Features', mentions: 2987, sentiment: 0.89 },
            { feature: 'Variety of Games', mentions: 2345, sentiment: 0.87 },
            { feature: 'Creator Tools', mentions: 1876, sentiment: 0.86 }
        ],
        complaints: [
            { issue: 'Moderation Issues', mentions: 1543, sentiment: -0.78 },
            { issue: 'Exploiters/Hackers', mentions: 1234, sentiment: -0.75 },
            { issue: 'Server Lag', mentions: 876, sentiment: -0.65 }
        ],
        featureRequests: [
            { request: 'Better Moderation Tools', mentions: 987, votes: 1956 },
            { request: 'Voice Chat Improvements', mentions: 765, votes: 1432 },
            { request: 'Cross-Platform Progress', mentions: 654, votes: 1245 }
        ]
    },
    {
        gameName: 'PUBG Mobile',
        icon: '🎮',
        sentimentScore: 0.68,
        volatility: 'volatile',
        churnSignals: ['medium'],
        lovedFeatures: [
            { feature: 'Realistic Gameplay', mentions: 2134, sentiment: 0.88 },
            { feature: 'Graphics Quality', mentions: 1876, sentiment: 0.86 },
            { feature: 'Squad Modes', mentions: 1543, sentiment: 0.84 },
            { feature: 'Map Variety', mentions: 1234, sentiment: 0.82 }
        ],
        complaints: [
            { issue: 'Hackers/Cheaters', mentions: 2345, sentiment: -0.89 },
            { issue: 'Matchmaking Issues', mentions: 1432, sentiment: -0.72 },
            { issue: 'Pay-to-Win Elements', mentions: 987, sentiment: -0.68 }
        ],
        featureRequests: [
            { request: 'Better Anti-Cheat', mentions: 1234, votes: 2567 },
            { request: 'Ranked Mode Improvements', mentions: 876, votes: 1678 },
            { request: 'New Maps', mentions: 765, votes: 1456 }
        ]
    },
    {
        gameName: 'Coin Master',
        icon: '🎰',
        sentimentScore: 0.52,
        volatility: 'crashing',
        churnSignals: ['high'],
        lovedFeatures: [
            { feature: 'Simple Gameplay', mentions: 1234, sentiment: 0.76 },
            { feature: 'Social Raids', mentions: 987, sentiment: 0.74 },
            { feature: 'Collection Aspect', mentions: 876, sentiment: 0.72 },
            { feature: 'Daily Rewards', mentions: 654, sentiment: 0.70 }
        ],
        complaints: [
            { issue: 'Too Many Ads', mentions: 2876, sentiment: -0.92 },
            { issue: 'Progression Too Slow', mentions: 2134, sentiment: -0.85 },
            { issue: 'Pay-to-Win', mentions: 1876, sentiment: -0.82 },
            { issue: 'Repetitive Gameplay', mentions: 1543, sentiment: -0.78 }
        ],
        featureRequests: [
            { request: 'Less Ads', mentions: 1543, votes: 2987 },
            { request: 'More Game Modes', mentions: 987, votes: 1654 },
            { request: 'Better Progression', mentions: 876, votes: 1432 }
        ]
    },
    {
        gameName: 'Royal Match',
        icon: '👑',
        sentimentScore: 0.71,
        volatility: 'stable',
        churnSignals: ['low'],
        lovedFeatures: [
            { feature: 'Visual Polish', mentions: 1876, sentiment: 0.91 },
            { feature: 'Level Design', mentions: 1543, sentiment: 0.87 },
            { feature: 'No Energy System', mentions: 1234, sentiment: 0.89 },
            { feature: 'Fair Monetization', mentions: 987, sentiment: 0.84 }
        ],
        complaints: [
            { issue: 'Difficulty Spikes', mentions: 876, sentiment: -0.68 },
            { issue: 'Repetitive Later Levels', mentions: 654, sentiment: -0.62 },
            { issue: 'Limited Lives', mentions: 543, sentiment: -0.58 }
        ],
        featureRequests: [
            { request: 'More Power-ups', mentions: 765, votes: 1345 },
            { request: 'Daily Challenges', mentions: 654, votes: 1123 },
            { request: 'Friends Leaderboard', mentions: 543, votes: 987 }
        ]
    },
    {
        gameName: 'Subway Surfers',
        icon: '🛹',
        sentimentScore: 0.78,
        volatility: 'stable',
        churnSignals: ['low'],
        lovedFeatures: [
            { feature: 'Fun & Addictive', mentions: 2345, sentiment: 0.93 },
            { feature: 'Smooth Controls', mentions: 1987, sentiment: 0.90 },
            { feature: 'Regular Updates', mentions: 1654, sentiment: 0.88 },
            { feature: 'Character Variety', mentions: 1432, sentiment: 0.86 }
        ],
        complaints: [
            { issue: 'Too Many Ads', mentions: 1234, sentiment: -0.74 },
            { issue: 'Expensive IAPs', mentions: 876, sentiment: -0.66 },
            { issue: 'Repetitive Gameplay', mentions: 654, sentiment: -0.58 }
        ],
        featureRequests: [
            { request: 'New Locations', mentions: 987, votes: 1765 },
            { request: 'Multiplayer Mode', mentions: 765, votes: 1456 },
            { request: 'Daily Missions', mentions: 654, votes: 1234 }
        ]
    },
    {
        gameName: 'Candy Crush Saga',
        icon: '🍬',
        sentimentScore: 0.66,
        volatility: 'stable',
        churnSignals: ['medium'],
        lovedFeatures: [
            { feature: 'Classic Match-3', mentions: 2134, sentiment: 0.85 },
            { feature: 'Level Variety', mentions: 1876, sentiment: 0.82 },
            { feature: 'Satisfying Combos', mentions: 1543, sentiment: 0.84 },
            { feature: 'Colorful Graphics', mentions: 1234, sentiment: 0.81 }
        ],
        complaints: [
            { issue: 'Lives System', mentions: 1987, sentiment: -0.82 },
            { issue: 'Pay-to-Win Levels', mentions: 1654, sentiment: -0.78 },
            { issue: 'Constant IAP Prompts', mentions: 1234, sentiment: -0.75 },
            { issue: 'Difficulty Walls', mentions: 987, sentiment: -0.72 }
        ],
        featureRequests: [
            { request: 'Unlimited Lives Option', mentions: 1234, votes: 2345 },
            { request: 'More Free Boosters', mentions: 987, votes: 1876 },
            { request: 'Skip Tutorial', mentions: 765, votes: 1432 }
        ]
    },
    {
        gameName: 'Honor of Kings',
        icon: '👑',
        sentimentScore: 0.80,
        volatility: 'stable',
        churnSignals: ['low'],
        lovedFeatures: [
            { feature: 'Balanced Gameplay', mentions: 2567, sentiment: 0.91 },
            { feature: 'Hero Diversity', mentions: 2134, sentiment: 0.89 },
            { feature: 'Competitive Scene', mentions: 1876, sentiment: 0.87 },
            { feature: 'Regular Updates', mentions: 1543, sentiment: 0.86 }
        ],
        complaints: [
            { issue: 'Toxic Players', mentions: 1432, sentiment: -0.76 },
            { issue: 'Matchmaking', mentions: 1123, sentiment: -0.68 },
            { issue: 'Server Issues', mentions: 876, sentiment: -0.72 }
        ],
        featureRequests: [
            { request: 'Better Reporting System', mentions: 987, votes: 1876 },
            { request: 'More Game Modes', mentions: 876, votes: 1654 },
            { request: 'Replay System', mentions: 765, votes: 1432 }
        ]
    },
    {
        gameName: 'Monopoly GO!',
        icon: '🎲',
        sentimentScore: 0.69,
        volatility: 'volatile',
        churnSignals: ['medium'],
        lovedFeatures: [
            { feature: 'Monopoly Theme', mentions: 1765, sentiment: 0.86 },
            { feature: 'Social Events', mentions: 1543, sentiment: 0.83 },
            { feature: 'Dice Rolling Fun', mentions: 1234, sentiment: 0.81 },
            { feature: 'Collection Rewards', mentions: 987, sentiment: 0.79 }
        ],
        complaints: [
            { issue: 'Energy System', mentions: 1654, sentiment: -0.78 },
            { issue: 'Too Much Grinding', mentions: 1432, sentiment: -0.74 },
            { issue: 'Expensive Dice Packs', mentions: 1123, sentiment: -0.72 },
            { issue: 'Friend Attacks', mentions: 876, sentiment: -0.65 }
        ],
        featureRequests: [
            { request: 'More Energy', mentions: 1123, votes: 2134 },
            { request: 'Co-op Mode', mentions: 876, votes: 1654 },
            { request: 'Trading System', mentions: 765, votes: 1432 }
        ]
    },
    {
        gameName: 'Clash of Clans',
        icon: '⚔️',
        sentimentScore: 0.76,
        volatility: 'stable',
        churnSignals: ['low'],
        lovedFeatures: [
            { feature: 'Clan System', mentions: 2456, sentiment: 0.92 },
            { feature: 'Strategic Depth', mentions: 2134, sentiment: 0.89 },
            { feature: 'Base Building', mentions: 1876, sentiment: 0.87 },
            { feature: 'Regular Updates', mentions: 1654, sentiment: 0.85 }
        ],
        complaints: [
            { issue: 'Long Upgrade Times', mentions: 1543, sentiment: -0.76 },
            { issue: 'Progression Slowdown', mentions: 1234, sentiment: -0.72 },
            { issue: 'Matchmaking Issues', mentions: 987, sentiment: -0.68 }
        ],
        featureRequests: [
            { request: 'More Builder Options', mentions: 987, votes: 1765 },
            { request: 'Better War Matchmaking', mentions: 876, votes: 1543 },
            { request: 'Quality of Life Updates', mentions: 765, votes: 1376 }
        ]
    },
    {
        gameName: 'Honkai: Star Rail',
        icon: '🚆',
        sentimentScore: 0.84,
        volatility: 'stable',
        churnSignals: ['low'],
        lovedFeatures: [
            { feature: 'Story Quality', mentions: 2678, sentiment: 0.96 },
            { feature: 'Character Writing', mentions: 2345, sentiment: 0.94 },
            { feature: 'Turn-Based Combat', mentions: 2134, sentiment: 0.90 },
            { feature: 'Generous Gacha', mentions: 1876, sentiment: 0.88 }
        ],
        complaints: [
            { issue: 'Stamina System', mentions: 876, sentiment: -0.64 },
            { issue: 'Endgame Content', mentions: 765, sentiment: -0.60 },
            { issue: 'Material Grind', mentions: 654, sentiment: -0.58 }
        ],
        featureRequests: [
            { request: 'More Story Chapters', mentions: 1234, votes: 2456 },
            { request: 'Auto-Battle Improvements', mentions: 876, votes: 1654 },
            { request: 'Skip Animations', mentions: 765, votes: 1432 }
        ]
    },
    {
        gameName: 'ChatGPT',
        icon: '🤖',
        sentimentScore: 0.87,
        volatility: 'stable',
        churnSignals: ['low'],
        lovedFeatures: [
            { feature: 'Helpful Responses', mentions: 4567, sentiment: 0.96 },
            { feature: 'Versatility', mentions: 3876, sentiment: 0.94 },
            { feature: 'Easy to Use', mentions: 3234, sentiment: 0.92 },
            { feature: 'Fast Responses', mentions: 2987, sentiment: 0.90 }
        ],
        complaints: [
            { issue: 'Rate Limits', mentions: 1234, sentiment: -0.72 },
            { issue: 'Occasional Inaccuracies', mentions: 987, sentiment: -0.65 },
            { issue: 'Subscription Cost', mentions: 765, sentiment: -0.58 }
        ],
        featureRequests: [
            { request: 'More Free Messages', mentions: 1432, votes: 2876 },
            { request: 'Image Generation', mentions: 1234, votes: 2456 },
            { request: 'Voice Input', mentions: 987, votes: 1987 }
        ]
    }
];

// Clone & Copycat Detection Data
export const cloneData = [
    {
        trendGame: 'Merge Dragons',
        icon: '🐉',
        cloneAnalysis: {
            similarGamesCount: 63,
            saturationLevel: 'critical',
            topClones: [
                { name: 'Merge Magic', publisher: 'Zynga', similarity: 0.89, launchDate: '45 days after original', performance: 'successful' },
                { name: 'Merge Tales', publisher: 'Gram Games', similarity: 0.85, launchDate: '60 days after original', performance: 'moderate' },
                { name: 'Dragon Merge', publisher: 'Tap Tap Games', similarity: 0.92, launchDate: '30 days after original', performance: 'successful' },
                { name: 'Merge World', publisher: 'Playrix', similarity: 0.81, launchDate: '90 days after original', performance: 'moderate' },
                { name: 'Fantasy Merge', publisher: 'Lion Studios', similarity: 0.87, launchDate: '75 days after original', performance: 'poor' }
            ],
            marketShareDistribution: {
                original: 28,
                topClones: 52,
                others: 20
            },
            recommendation: 'Critical saturation - avoid market entry. Original losing market share to clones.'
        }
    },
    {
        trendGame: 'Among Us',
        icon: '🔴',
        cloneAnalysis: {
            similarGamesCount: 47,
            saturationLevel: 'high',
            topClones: [
                { name: 'Imposter 3D', publisher: 'Voodoo', similarity: 0.84, launchDate: '20 days after viral', performance: 'successful' },
                { name: 'Suspects: Mystery Mansion', publisher: 'Wildlife Studios', similarity: 0.78, launchDate: '40 days after viral', performance: 'moderate' },
                { name: 'Space Mafia', publisher: 'SayGames', similarity: 0.91, launchDate: '15 days after viral', performance: 'successful' },
                { name: 'Crewmate Detective', publisher: 'AppLovin', similarity: 0.86, launchDate: '35 days after viral', performance: 'poor' }
            ],
            marketShareDistribution: {
                original: 45,
                topClones: 35,
                others: 20
            },
            recommendation: 'High saturation but original maintains dominant position. Opportunity for differentiated mechanics.'
        }
    },
    {
        trendGame: 'Wordle',
        icon: '📝',
        cloneAnalysis: {
            similarGamesCount: 89,
            saturationLevel: 'critical',
            topClones: [
                { name: 'Word Master', publisher: 'Zynga', similarity: 0.95, launchDate: '10 days after viral', performance: 'successful' },
                { name: 'Wordly', publisher: 'Gram Games', similarity: 0.93, launchDate: '12 days after viral', performance: 'successful' },
                { name: 'Word Guess', publisher: 'Lion Studios', similarity: 0.90, launchDate: '8 days after viral', performance: 'moderate' },
                { name: 'Daily Word', publisher: 'Voodoo', similarity: 0.88, launchDate: '15 days after viral', performance: 'successful' },
                { name: 'Guess the Word', publisher: 'SayGames', similarity: 0.92, launchDate: '7 days after viral', performance: 'poor' }
            ],
            marketShareDistribution: {
                original: 22,
                topClones: 58,
                others: 20
            },
            recommendation: 'Critical saturation - market completely flooded. Original overtaken by fast followers.'
        }
    },
    {
        trendGame: 'Vampire Survivors',
        icon: '🧛',
        cloneAnalysis: {
            similarGamesCount: 34,
            saturationLevel: 'high',
            topClones: [
                { name: 'Magic Survival', publisher: 'Leme Games', similarity: 0.82, launchDate: '50 days after original', performance: 'successful' },
                { name: 'Survivor.io', publisher: 'Habby', similarity: 0.79, launchDate: '60 days after original', performance: 'successful' },
                { name: 'Archero', publisher: 'Habby', similarity: 0.73, launchDate: '40 days after original', performance: 'successful' },
                { name: 'Death Survivor', publisher: 'Lion Studios', similarity: 0.85, launchDate: '55 days after original', performance: 'moderate' }
            ],
            marketShareDistribution: {
                original: 38,
                topClones: 42,
                others: 20
            },
            recommendation: 'High saturation with successful clones. Strong differentiation required for new entries.'
        }
    },
    {
        trendGame: 'Brawl Stars',
        icon: '⭐',
        cloneAnalysis: {
            similarGamesCount: 28,
            saturationLevel: 'medium',
            topClones: [
                { name: 'Heroes Strike', publisher: 'Wolffun Game', similarity: 0.76, launchDate: '90 days after original', performance: 'moderate' },
                { name: 'Battle Arena', publisher: 'Tap Tap Games', similarity: 0.71, launchDate: '120 days after original', performance: 'poor' },
                { name: 'Squad Busters', publisher: 'Lion Studios', similarity: 0.68, launchDate: '100 days after original', performance: 'poor' },
                { name: 'Arena Heroes', publisher: 'AppLovin', similarity: 0.74, launchDate: '95 days after original', performance: 'moderate' }
            ],
            marketShareDistribution: {
                original: 62,
                topClones: 23,
                others: 15
            },
            recommendation: 'Medium saturation - original dominates. Clone attempts mostly unsuccessful due to strong brand.'
        }
    },
    {
        trendGame: 'Stumble Guys',
        icon: '🏃',
        cloneAnalysis: {
            similarGamesCount: 41,
            saturationLevel: 'high',
            topClones: [
                { name: 'Fun Race 3D', publisher: 'Good Job Games', similarity: 0.80, launchDate: '25 days after original', performance: 'successful' },
                { name: 'Fall Dudes', publisher: 'Voodoo', similarity: 0.88, launchDate: '20 days after original', performance: 'successful' },
                { name: 'Run Royale', publisher: 'Lion Studios', similarity: 0.84, launchDate: '30 days after original', performance: 'moderate' },
                { name: 'Knockout Race', publisher: 'SayGames', similarity: 0.82, launchDate: '35 days after original', performance: 'moderate' }
            ],
            marketShareDistribution: {
                original: 42,
                topClones: 38,
                others: 20
            },
            recommendation: 'High saturation - competitive clone market. Differentiation through IP licensing recommended.'
        }
    },
    {
        trendGame: 'Marvel Snap',
        icon: '🃏',
        cloneAnalysis: {
            similarGamesCount: 18,
            saturationLevel: 'low',
            topClones: [
                { name: 'Card Clash', publisher: 'Tap Tap Games', similarity: 0.65, launchDate: '120 days after original', performance: 'poor' },
                { name: 'Quick Cards', publisher: 'Lion Studios', similarity: 0.62, launchDate: '140 days after original', performance: 'poor' },
                { name: 'Hero Cards', publisher: 'AppLovin', similarity: 0.68, launchDate: '130 days after original', performance: 'moderate' }
            ],
            marketShareDistribution: {
                original: 75,
                topClones: 15,
                others: 10
            },
            recommendation: 'Low saturation - strong IP protection. Clones struggle without licensed characters.'
        }
    },
    {
        trendGame: 'Royal Match',
        icon: '👑',
        cloneAnalysis: {
            similarGamesCount: 52,
            saturationLevel: 'high',
            topClones: [
                { name: 'King\'s Choice', publisher: 'Gram Games', similarity: 0.83, launchDate: '40 days after original', performance: 'successful' },
                { name: 'Castle Crush', publisher: 'Playrix', similarity: 0.79, launchDate: '55 days after original', performance: 'moderate' },
                { name: 'Royal Tiles', publisher: 'Lion Studios', similarity: 0.86, launchDate: '35 days after original', performance: 'successful' },
                { name: 'Match Kingdom', publisher: 'Voodoo', similarity: 0.81, launchDate: '50 days after original', performance: 'moderate' },
                { name: 'Crown Match', publisher: 'SayGames', similarity: 0.84, launchDate: '45 days after original', performance: 'poor' }
            ],
            marketShareDistribution: {
                original: 48,
                topClones: 32,
                others: 20
            },
            recommendation: 'High saturation but original maintains lead through marketing spend. High CPI competition.'
        }
    },
    {
        trendGame: 'State of Survival',
        icon: '🧟',
        cloneAnalysis: {
            similarGamesCount: 37,
            saturationLevel: 'medium',
            topClones: [
                { name: 'Zombie Strike', publisher: 'Tap Tap Games', similarity: 0.77, launchDate: '80 days after original', performance: 'moderate' },
                { name: 'Last Shelter', publisher: 'Long Tech', similarity: 0.74, launchDate: '95 days after original', performance: 'successful' },
                { name: 'Survival Squad', publisher: 'Lion Studios', similarity: 0.79, launchDate: '70 days after original', performance: 'poor' },
                { name: 'Dead Empire', publisher: 'AppLovin', similarity: 0.76, launchDate: '85 days after original', performance: 'moderate' }
            ],
            marketShareDistribution: {
                original: 55,
                topClones: 30,
                others: 15
            },
            recommendation: 'Medium saturation - genre crowded but differentiation through celebrity endorsements works.'
        }
    },
    {
        trendGame: 'Honkai: Star Rail',
        icon: '🚆',
        cloneAnalysis: {
            similarGamesCount: 12,
            saturationLevel: 'low',
            topClones: [
                { name: 'Star Heroes', publisher: 'Tap Tap Games', similarity: 0.58, launchDate: '150 days after original', performance: 'poor' },
                { name: 'Galaxy Turn', publisher: 'Lion Studios', similarity: 0.61, launchDate: '160 days after original', performance: 'poor' },
                { name: 'Space RPG', publisher: 'AppLovin', similarity: 0.64, launchDate: '145 days after original', performance: 'moderate' }
            ],
            marketShareDistribution: {
                original: 82,
                topClones: 10,
                others: 8
            },
            recommendation: 'Low saturation - high production value creates clone barrier. Strong brand loyalty deters copycats.'
        }
    }
];

// Breakout Alerts Data
export const alertsData = [
    {
        type: 'rank',
        severity: 'critical',
        hoursAgo: 2,
        title: 'Honkai: Star Rail - Massive Rank Jump',
        message: 'Game jumped +187 ranks in the last 48 hours across iOS and Android',
        metrics: [
            { label: 'Rank Change', value: '+187', positive: true },
            { label: 'Current Rank', value: '#8', positive: true },
            { label: 'Velocity Score', value: '+320%', positive: true }
        ]
    },
    {
        type: 'revenue',
        severity: 'critical',
        hoursAgo: 5,
        title: 'Monopoly GO! Revenue Milestone',
        message: 'Crossed $15M estimated revenue in the last 7 days - fastest growing board game',
        metrics: [
            { label: 'Est. Revenue', value: '$15.2M', positive: true },
            { label: 'Growth', value: '+245%', positive: true },
            { label: 'ARPU', value: '$42.50', positive: true }
        ]
    },
    {
        type: 'regional',
        severity: 'high',
        hoursAgo: 8,
        title: 'Royal Match Spiking in Southeast Asia',
        message: 'Downloads increased by +380% in Indonesia, Thailand, and Philippines markets',
        metrics: [
            { label: 'Region Growth', value: '+380%', positive: true },
            { label: 'Indonesia', value: '+420%', positive: true },
            { label: 'Market Share', value: '12%', positive: false }
        ]
    },
    {
        type: 'mechanic',
        severity: 'high',
        hoursAgo: 12,
        title: 'Merge + Roguelike Combo Trending',
        message: 'New mechanic combination showing +92% week-over-week growth in adoption',
        metrics: [
            { label: 'WoW Growth', value: '+92%', positive: true },
            { label: 'Games Using', value: '17', positive: false },
            { label: 'Avg Rating', value: '4.6', positive: true }
        ]
    },
    {
        type: 'publisher',
        severity: 'medium',
        hoursAgo: 18,
        title: 'New Publisher "Pocket Gems" Enters Top 20',
        message: 'First time publisher reached Top 20 grossing with "Episode - Choose Your Story"',
        metrics: [
            { label: 'Current Rank', value: '#18', positive: true },
            { label: 'Days to Top 20', value: '45', positive: false },
            { label: 'Est. Revenue', value: '$1.2M', positive: true }
        ]
    },
    {
        type: 'rank',
        severity: 'high',
        hoursAgo: 22,
        title: 'Stumble Guys - Rapid Climb',
        message: 'Jumped +145 ranks in 24 hours following major update with new levels',
        metrics: [
            { label: 'Rank Jump', value: '+145', positive: true },
            { label: 'Update Impact', value: '+89%', positive: true },
            { label: 'New Users', value: '2.3M', positive: true }
        ]
    },
    {
        type: 'revenue',
        severity: 'high',
        hoursAgo: 28,
        title: 'Genshin Impact - Revenue Surge',
        message: 'New banner release generated $8.5M in first 72 hours - strongest banner this year',
        metrics: [
            { label: '72h Revenue', value: '$8.5M', positive: true },
            { label: 'vs Last Banner', value: '+67%', positive: true },
            { label: 'IAP Conversion', value: '18.5%', positive: true }
        ]
    },
    {
        type: 'regional',
        severity: 'medium',
        hoursAgo: 36,
        title: 'Brawl Stars Growing in Latin America',
        message: 'Strong growth in Brazil and Mexico following Spanish language update',
        metrics: [
            { label: 'Brazil Growth', value: '+210%', positive: true },
            { label: 'Mexico Growth', value: '+185%', positive: true },
            { label: 'Retention', value: '68%', positive: true }
        ]
    },
    {
        type: 'mechanic',
        severity: 'medium',
        hoursAgo: 45,
        title: 'Battle Pass Mechanics Gaining Traction',
        message: 'Non-shooter games adopting battle pass seeing +78% ARPU increase',
        metrics: [
            { label: 'ARPU Impact', value: '+78%', positive: true },
            { label: 'Adoption Rate', value: '34%', positive: false },
            { label: 'Player Sentiment', value: 'Mixed', positive: false }
        ]
    },
    {
        type: 'publisher',
        severity: 'low',
        hoursAgo: 52,
        title: 'Supercell Soft Launch Detected',
        message: 'New game "Squad Busters" detected in soft launch - Netherlands and Canada',
        metrics: [
            { label: 'Countries', value: '2', positive: false },
            { label: 'Early Rating', value: '4.3', positive: true },
            { label: 'CPI', value: '$2.80', positive: false }
        ]
    },
    {
        type: 'rank',
        severity: 'critical',
        hoursAgo: 60,
        title: 'Among Us - Viral Resurgence',
        message: 'New update triggered viral moment - jumped +230 ranks in 48 hours',
        metrics: [
            { label: 'Rank Jump', value: '+230', positive: true },
            { label: 'Twitter Mentions', value: '1.2M', positive: true },
            { label: 'DAU Growth', value: '+340%', positive: true }
        ]
    },
    {
        type: 'revenue',
        severity: 'medium',
        hoursAgo: 72,
        title: 'Marvel Snap - First $10M Week',
        message: 'Card battler crossed $10M weekly revenue milestone for first time',
        metrics: [
            { label: 'Week Revenue', value: '$10.3M', positive: true },
            { label: 'vs Last Week', value: '+45%', positive: true },
            { label: 'Whale Spending', value: '$580 avg', positive: true }
        ]
    },
    {
        type: 'regional',
        severity: 'high',
        hoursAgo: 84,
        title: 'Clash Royale Revival in India',
        message: 'Esports tournament in India drove +290% downloads and +180% revenue',
        metrics: [
            { label: 'India Downloads', value: '+290%', positive: true },
            { label: 'India Revenue', value: '+180%', positive: true },
            { label: 'Tournament Views', value: '8.5M', positive: true }
        ]
    },
    {
        type: 'mechanic',
        severity: 'critical',
        hoursAgo: 96,
        title: 'Idle + Gacha Combo Exploding',
        message: 'Mechanic combination showing massive adoption - +145% games using this combo',
        metrics: [
            { label: 'Combo Growth', value: '+145%', positive: true },
            { label: 'Games Using', value: '42', positive: false },
            { label: 'Avg ARPU', value: '$8.50', positive: true }
        ]
    },
    {
        type: 'publisher',
        severity: 'high',
        hoursAgo: 108,
        title: 'Scopely Acquisition Impact',
        message: 'Post-acquisition strategy showing results - 3 games in Top 50 grossing',
        metrics: [
            { label: 'Top 50 Games', value: '3', positive: true },
            { label: 'Revenue Growth', value: '+89%', positive: true },
            { label: 'Market Share', value: '4.2%', positive: true }
        ]
    },
    {
        type: 'rank',
        severity: 'medium',
        hoursAgo: 120,
        title: 'Wordle Clones Fading',
        message: 'Original Wordle maintaining position while clones dropping -120 ranks on average',
        metrics: [
            { label: 'Clone Avg Drop', value: '-120', positive: false },
            { label: 'Original Rank', value: '#12', positive: true },
            { label: 'Market Consolidation', value: '78%', positive: false }
        ]
    },
    {
        type: 'revenue',
        severity: 'low',
        hoursAgo: 132,
        title: 'Diablo Immortal Stabilizing',
        message: 'After 6-month decline, revenue stabilized at $5M/week with new content cadence',
        metrics: [
            { label: 'Weekly Revenue', value: '$5.1M', positive: false },
            { label: 'vs Last Month', value: '+2%', positive: true },
            { label: 'Stability Score', value: '85%', positive: true }
        ]
    },
    {
        type: 'regional',
        severity: 'low',
        hoursAgo: 144,
        title: 'Pokemon GO Asia-Pacific Growth',
        message: 'Community Day event in APAC region drove +150% engagement surge',
        metrics: [
            { label: 'APAC Engagement', value: '+150%', positive: true },
            { label: 'Event Participation', value: '12M', positive: true },
            { label: 'IAP Conversion', value: '8.5%', positive: true }
        ]
    },
    {
        type: 'mechanic',
        severity: 'low',
        hoursAgo: 156,
        title: 'NFT Integration Declining',
        message: 'Games with NFT mechanics seeing -45% player retention compared to traditional games',
        metrics: [
            { label: 'Retention Impact', value: '-45%', positive: false },
            { label: 'Games Removing', value: '8', positive: false },
            { label: 'User Sentiment', value: 'Negative', positive: false }
        ]
    },
    {
        type: 'publisher',
        severity: 'low',
        hoursAgo: 168,
        title: 'Epic Games Mobile Store Launch',
        message: 'Alternative app store launched in EU - early impact shows 2% market share',
        metrics: [
            { label: 'EU Market Share', value: '2%', positive: false },
            { label: 'Available Games', value: '47', positive: false },
            { label: 'Avg CPI', value: '$1.20', positive: true }
        ]
    }
];

// Seasonality & Event Overlay Data
export const seasonalData = [
    {
        date: '2025-01-24',
        type: 'cultural',
        name: 'Lunar New Year',
        description: 'Chinese New Year celebrations drive massive engagement in APAC region',
        impact: 'high',
        gamePerformance: {
            'Asian-themed Games': { spike: '+280%', reason: 'Cultural relevance and themed events' },
            'Casino & Slots': { spike: '+195%', reason: 'Traditional gambling customs' },
            'RPG Games': { spike: '+145%', reason: 'Red envelope promotions and gift mechanics' }
        }
    },
    {
        date: '2025-02-14',
        type: 'holiday',
        name: 'Valentine\'s Day',
        description: 'Romance-themed content and limited events boost engagement',
        impact: 'medium',
        gamePerformance: {
            'Dating Sims': { spike: '+220%', reason: 'Direct thematic alignment' },
            'Puzzle Games': { spike: '+120%', reason: 'Casual gifting and themed content' },
            'Social Games': { spike: '+98%', reason: 'Friend interactions and sharing' }
        }
    },
    {
        date: '2025-03-15',
        type: 'gaming',
        name: 'GDC (Game Developers Conference)',
        description: 'Major industry event with new game announcements and trends',
        impact: 'medium',
        gamePerformance: {
            'Indie Games': { spike: '+165%', reason: 'Showcase exposure and press coverage' },
            'Early Access': { spike: '+134%', reason: 'Developer visibility boost' }
        }
    },
    {
        date: '2025-03-23',
        type: 'platform',
        name: 'Apple Spring Event',
        description: 'Apple product launches typically feature gaming showcases',
        impact: 'high',
        gamePerformance: {
            'Featured Games': { spike: '+320%', reason: 'Direct Apple editorial feature' },
            'AR Games': { spike: '+245%', reason: 'New hardware capabilities showcase' },
            'Premium Games': { spike: '+180%', reason: 'Quality focus messaging' }
        }
    },
    {
        date: '2025-04-01',
        type: 'cultural',
        name: 'April Fools Day',
        description: 'Viral marketing opportunities and playful content updates',
        impact: 'low',
        gamePerformance: {
            'Casual Games': { spike: '+85%', reason: 'Humor and viral sharing potential' },
            'Social Games': { spike: '+72%', reason: 'Meme-worthy content and pranks' }
        }
    },
    {
        date: '2025-05-01',
        type: 'holiday',
        name: 'May Day / Labor Day',
        description: 'Holiday weekend in many countries drives mobile gaming time',
        impact: 'medium',
        gamePerformance: {
            'Strategy Games': { spike: '+142%', reason: 'Extended play sessions on holiday' },
            'Multiplayer Games': { spike: '+128%', reason: 'Social gatherings and co-play' },
            'Puzzle Games': { spike: '+115%', reason: 'Casual weekend entertainment' }
        }
    },
    {
        date: '2025-06-10',
        type: 'gaming',
        name: 'Summer Game Fest',
        description: 'Major gaming showcase event with AAA announcements',
        impact: 'high',
        gamePerformance: {
            'Hyped Releases': { spike: '+295%', reason: 'Pre-launch marketing surge' },
            'Similar Genre Games': { spike: '+185%', reason: 'Spillover interest from announcements' },
            'Indie Showcases': { spike: '+156%', reason: 'Increased visibility from event' }
        }
    },
    {
        date: '2025-07-04',
        type: 'holiday',
        name: 'US Independence Day',
        description: 'Major US holiday with increased leisure time',
        impact: 'medium',
        gamePerformance: {
            'Patriotic Themes': { spike: '+210%', reason: 'Themed content resonates' },
            'Party Games': { spike: '+167%', reason: 'Social gatherings and BBQs' },
            'Casual Games': { spike: '+134%', reason: 'Holiday downtime entertainment' }
        }
    },
    {
        date: '2025-07-15',
        type: 'platform',
        name: 'Steam Summer Sale',
        description: 'Massive PC gaming sale drives wishlists and engagement',
        impact: 'high',
        gamePerformance: {
            'PC-Mobile Cross-Platform': { spike: '+245%', reason: 'Cross-promotion opportunities' },
            'Premium Mobile Ports': { spike: '+198%', reason: 'Purchase intent spillover' },
            'Strategy & Simulation': { spike: '+176%', reason: 'Genre popularity on Steam' }
        }
    },
    {
        date: '2025-08-15',
        type: 'holiday',
        name: 'Back to School Season',
        description: 'Students purchasing new devices and looking for content',
        impact: 'high',
        gamePerformance: {
            'Educational Games': { spike: '+310%', reason: 'Parent purchases for learning' },
            'Puzzle & Brain Training': { spike: '+234%', reason: 'Academic preparation mindset' },
            'Teen-focused Games': { spike: '+187%', reason: 'School social dynamics and new devices' }
        }
    },
    {
        date: '2025-08-25',
        type: 'gaming',
        name: 'Gamescom',
        description: 'Europe\'s largest gaming event with major announcements',
        impact: 'high',
        gamePerformance: {
            'EU Featured Games': { spike: '+265%', reason: 'Regional marketing focus' },
            'Upcoming Releases': { spike: '+223%', reason: 'Demo buzz and streamer coverage' },
            'Indie Darlings': { spike: '+189%', reason: 'Indie showcase exposure' }
        }
    },
    {
        date: '2025-09-10',
        type: 'platform',
        name: 'Apple iPhone Launch',
        description: 'New iPhone models showcase mobile gaming capabilities',
        impact: 'high',
        gamePerformance: {
            'Graphics Showcases': { spike: '+340%', reason: 'Hardware demo prominence' },
            'Apple Arcade': { spike: '+278%', reason: 'Subscription bundling push' },
            'Premium Games': { spike: '+215%', reason: 'Quality gaming messaging' }
        }
    },
    {
        date: '2025-10-15',
        type: 'gaming',
        name: 'Steam Next Fest',
        description: 'Free game demos and indie developer showcase',
        impact: 'medium',
        gamePerformance: {
            'Demo-Available Games': { spike: '+198%', reason: 'Direct trial opportunity' },
            'Wishlist Surges': { spike: '+167%', reason: 'Discovery and interest capture' }
        }
    },
    {
        date: '2025-10-31',
        type: 'holiday',
        name: 'Halloween',
        description: 'Horror and spooky-themed content drives seasonal engagement',
        impact: 'high',
        gamePerformance: {
            'Horror Games': { spike: '+385%', reason: 'Perfect thematic alignment' },
            'Halloween Events': { spike: '+298%', reason: 'Limited-time content urgency' },
            'Dark Fantasy RPGs': { spike: '+214%', reason: 'Atmospheric fit with season' }
        }
    },
    {
        date: '2025-11-11',
        type: 'cultural',
        name: 'Singles Day (11.11)',
        description: 'Massive shopping event in China and APAC region',
        impact: 'high',
        gamePerformance: {
            'In-App Purchase Games': { spike: '+312%', reason: 'Consumer spending mentality peak' },
            'E-commerce Mini-Games': { spike: '+267%', reason: 'Shopping platform integrations' },
            'Gacha Games': { spike: '+234%', reason: 'Sale promotions and discounts' }
        }
    },
    {
        date: '2025-11-24',
        type: 'holiday',
        name: 'Thanksgiving',
        description: 'US holiday weekend with family gatherings and leisure time',
        impact: 'medium',
        gamePerformance: {
            'Family Games': { spike: '+198%', reason: 'Multi-generational play during gatherings' },
            'Puzzle Games': { spike: '+165%', reason: 'Casual entertainment during downtime' },
            'Party Games': { spike: '+147%', reason: 'Social gatherings and co-play' }
        }
    },
    {
        date: '2025-11-28',
        type: 'cultural',
        name: 'Black Friday',
        description: 'Major shopping event with game sales and IAP promotions',
        impact: 'high',
        gamePerformance: {
            'Premium Games': { spike: '+420%', reason: 'Deep discounts drive purchases' },
            'IAP-Heavy Games': { spike: '+345%', reason: 'Bonus currency sales' },
            'New Releases': { spike: '+267%', reason: 'Launch timing strategy' }
        }
    },
    {
        date: '2025-12-10',
        type: 'platform',
        name: 'Game Awards',
        description: 'Industry awards show with major announcements and showcases',
        impact: 'high',
        gamePerformance: {
            'Nominated Games': { spike: '+387%', reason: 'Award recognition buzz' },
            'Announced Games': { spike: '+312%', reason: 'Reveal trailer virality' },
            'Winner Games': { spike: '+445%', reason: 'Post-award surge and sales' }
        }
    },
    {
        date: '2025-12-20',
        type: 'platform',
        name: 'Google Play Winter Sale',
        description: 'Android platform-wide sale driving downloads and revenue',
        impact: 'high',
        gamePerformance: {
            'Featured Android Games': { spike: '+289%', reason: 'Platform editorial promotion' },
            'Premium Games': { spike: '+245%', reason: 'Holiday gift purchases' },
            'Subscription Games': { spike: '+198%', reason: 'Holiday trial offers' }
        }
    },
    {
        date: '2025-12-25',
        type: 'holiday',
        name: 'Christmas',
        description: 'Peak holiday season with new device activations and gift card redemptions',
        impact: 'high',
        gamePerformance: {
            'Top Chart Games': { spike: '+465%', reason: 'New device discovery and downloads' },
            'Family-Friendly': { spike: '+398%', reason: 'Holiday gatherings and all-ages appeal' },
            'Puzzle Games': { spike: '+345%', reason: 'Casual holiday entertainment' },
            'Premium Games': { spike: '+312%', reason: 'Gift card redemptions surge' }
        }
    },
    {
        date: '2026-01-01',
        type: 'holiday',
        name: 'New Year\'s Day',
        description: 'Resolution-focused content and new year engagement spike',
        impact: 'medium',
        gamePerformance: {
            'Fitness Games': { spike: '+287%', reason: 'New Year health resolutions' },
            'Productivity & Brain Training': { spike: '+234%', reason: 'Self-improvement goals' },
            'Habit-Building Games': { spike: '+198%', reason: 'Resolution commitment mechanics' }
        }
    }
];

// AI Opportunity Engine Data
export const opportunityData = [
    {
        niche: 'Idle + Pet Collection + PvP',
        demandScore: 92,
        competitionScore: 18,
        revenuePotential: '$3-7M/month',
        timeToSaturation: '8-12 months',
        recommendation: 'HIGH PRIORITY',
        reasoning: [
            'Rising search volume (+178% MoM)',
            'Only 2 established competitors in top 100',
            'Strong IAP conversion potential (idle + gacha)',
            'PvP adds retention hook missing in pure idle games'
        ],
        comparableGames: ['AFK Arena', 'Idle Heroes', 'Summoners War'],
        suggestedMechanics: ['auto-battle', 'pet evolution', 'guild wars', 'gacha summoning', 'idle rewards']
    },
    {
        niche: 'Roguelike + Deck Building + Co-op',
        demandScore: 88,
        competitionScore: 24,
        revenuePotential: '$2-5M/month',
        timeToSaturation: '6-10 months',
        recommendation: 'HIGH PRIORITY',
        reasoning: [
            'Slay the Spire success proving demand (+$50M revenue)',
            'Mobile co-op roguelikes underserved (only 3 quality titles)',
            'Strong retention from run variety + social play',
            'Premium + cosmetic IAP proven model'
        ],
        comparableGames: ['Slay the Spire', 'Monster Train', 'Dicey Dungeons'],
        suggestedMechanics: ['synergy building', 'shared deck', 'permadeath', 'meta progression', 'daily challenges']
    },
    {
        niche: 'Vampire Survivors + Battle Royale',
        demandScore: 85,
        competitionScore: 15,
        revenuePotential: '$4-8M/month',
        timeToSaturation: '5-8 months',
        recommendation: 'HIGH PRIORITY',
        reasoning: [
            'Bullet heaven genre exploding (+340% search interest)',
            'No established BR variant in top 50 yet',
            'Fast session length perfect for mobile',
            'Weapon skin monetization highly effective'
        ],
        comparableGames: ['Vampire Survivors', 'Brotato', 'Survivor.io'],
        suggestedMechanics: ['auto-aim', 'weapon upgrades', 'last player standing', 'shrinking zone', 'power-up drops']
    },
    {
        niche: 'Merge Mechanics + City Builder + Story',
        demandScore: 81,
        competitionScore: 42,
        revenuePotential: '$2-4M/month',
        timeToSaturation: '4-6 months',
        recommendation: 'MEDIUM PRIORITY',
        reasoning: [
            'Merge games proven $20M+ revenue potential',
            'Narrative layer adds differentiation (only 5 story-driven merge)',
            'Female audience 65% - underserved demographic',
            'Ad + IAP hybrid model performing well'
        ],
        comparableGames: ['Merge Mansion', 'Merge Gardens', 'EverMerge'],
        suggestedMechanics: ['chain merging', 'quest system', 'character unlocks', 'decoration', 'energy system']
    },
    {
        niche: 'Relaxation + ASMR + Puzzle',
        demandScore: 79,
        competitionScore: 28,
        revenuePotential: '$1-3M/month',
        timeToSaturation: '10-14 months',
        recommendation: 'MEDIUM PRIORITY',
        reasoning: [
            'Wellness gaming growing 120% YoY',
            'Low competition for premium ASMR puzzle hybrids',
            'Strong retention (70%+ D7) from stress relief value',
            'Apple Arcade / subscription model fit'
        ],
        comparableGames: ['Unpacking', 'A Little to the Left', 'Monument Valley'],
        suggestedMechanics: ['tactile interactions', 'sound design focus', 'no timers', 'zen mode', 'satisfying animations']
    },
    {
        niche: 'Auto Battler + NFT-Free Web3',
        demandScore: 76,
        competitionScore: 52,
        revenuePotential: '$1-4M/month',
        timeToSaturation: '3-5 months',
        recommendation: 'MEDIUM PRIORITY',
        reasoning: [
            'Web3 gaming recovering from NFT crash',
            'Token-gated tournaments have 85% retention',
            'Axie Infinity proved $3B revenue potential',
            'Must avoid NFT stigma - focus on play-and-earn'
        ],
        comparableGames: ['Axie Infinity', 'Splinterlands', 'Gods Unchained'],
        suggestedMechanics: ['strategic positioning', 'unit synergies', 'seasonal rewards', 'ranked ladder', 'team composition']
    },
    {
        niche: 'Sports Management + Real-Time Sim',
        demandScore: 74,
        competitionScore: 38,
        revenuePotential: '$2-5M/month',
        timeToSaturation: '7-11 months',
        recommendation: 'MEDIUM PRIORITY',
        reasoning: [
            'FIFA Mobile $1B+ revenue proves sports demand',
            'Management sims underserved (only 8 top titles)',
            'Real-time match simulation adds engagement',
            'Licensing deals create moat against clones'
        ],
        comparableGames: ['Top Eleven', 'Football Manager', 'NBA Live Mobile'],
        suggestedMechanics: ['squad building', 'tactics board', 'transfer market', 'live match engine', 'season progression']
    },
    {
        niche: 'Horror + Social Deduction + Mobile',
        demandScore: 82,
        competitionScore: 34,
        revenuePotential: '$3-6M/month',
        timeToSaturation: '6-9 months',
        recommendation: 'HIGH PRIORITY',
        reasoning: [
            'Among Us $200M+ mobile revenue proves model',
            'Horror theme underutilized (only 4 social deduction horror)',
            'Viral potential through streaming/content creation',
            'Cosmetic IAP average $8 ARPU in genre'
        ],
        comparableGames: ['Among Us', 'Project Winter', 'Dead by Daylight Mobile'],
        suggestedMechanics: ['voice chat', 'role assignment', 'voting system', 'task completion', 'elimination rounds']
    },
    {
        niche: 'Factory Builder + Tower Defense',
        demandScore: 77,
        competitionScore: 31,
        revenuePotential: '$1-3M/month',
        timeToSaturation: '9-14 months',
        recommendation: 'MEDIUM PRIORITY',
        reasoning: [
            'Factorio PC success ($500M revenue) untapped on mobile',
            'Hybrid genre gap - no top-tier factory-TD mobile game',
            'Strong retention from optimization gameplay loop',
            'Premium model viable with cosmetic DLC'
        ],
        comparableGames: ['Factorio', 'Mindustry', 'Infinitode 2'],
        suggestedMechanics: ['conveyor belts', 'automated defenses', 'resource chains', 'tech tree', 'wave scaling']
    },
    {
        niche: 'Cozy Game + Life Sim + Multiplayer',
        demandScore: 86,
        competitionScore: 26,
        revenuePotential: '$2-6M/month',
        timeToSaturation: '7-10 months',
        recommendation: 'HIGH PRIORITY',
        reasoning: [
            'Stardew Valley mobile: $150M revenue proves demand',
            'Cozy multiplayer gap (Animal Crossing vibes on mobile)',
            'Female demographic 70% - high spending potential',
            'Cosmetic + expansion pack monetization strong fit'
        ],
        comparableGames: ['Stardew Valley', 'Hay Day', 'Palia'],
        suggestedMechanics: ['farming', 'relationship building', 'home decoration', 'seasonal events', 'co-op activities']
    },
    {
        niche: 'Incremental Clicker + Space Exploration',
        demandScore: 72,
        competitionScore: 45,
        revenuePotential: '$1-2M/month',
        timeToSaturation: '5-7 months',
        recommendation: 'LOW PRIORITY',
        reasoning: [
            'Idle clicker market saturated but space theme less common',
            'Ad revenue model reliable ($1.2 eCPM average)',
            'Low development cost vs potential return',
            'Prestige mechanics drive long-term retention'
        ],
        comparableGames: ['Egg Inc', 'Antimatter Dimensions', 'Space Company'],
        suggestedMechanics: ['exponential growth', 'prestige layers', 'planet colonization', 'research tree', 'offline progress']
    },
    {
        niche: 'Puzzle + Dating Sim + Visual Novel',
        demandScore: 80,
        competitionScore: 36,
        revenuePotential: '$2-4M/month',
        timeToSaturation: '8-12 months',
        recommendation: 'MEDIUM PRIORITY',
        reasoning: [
            'Choices / Episode apps: $300M+ combined revenue',
            'Puzzle layer adds gameplay depth (Puzzle Quest model)',
            'Strong female audience with premium IAP willingness',
            'Chapter/story monetization proven ($5 avg IAP)'
        ],
        comparableGames: ['Choices', 'Episode', 'Puzzle Quest'],
        suggestedMechanics: ['story branches', 'match-3 battles', 'relationship points', 'unlockable endings', 'wardrobe system']
    },
    {
        niche: 'Shooting + Extraction + Mobile-First',
        demandScore: 89,
        competitionScore: 19,
        revenuePotential: '$5-10M/month',
        timeToSaturation: '6-9 months',
        recommendation: 'HIGH PRIORITY',
        reasoning: [
            'Tarkov / DMZ popularized extraction gameplay ($500M+ PC)',
            'No mobile-native extraction shooter in top 50',
            'Battle pass monetization $12+ avg spend per user',
            'Shorter session length (10-15min) perfect for mobile'
        ],
        comparableGames: ['Escape from Tarkov', 'Hunt: Showdown', 'The Cycle'],
        suggestedMechanics: ['loot extraction', 'permadeath risk', 'stash progression', 'tactical movement', 'PvPvE']
    },
    {
        niche: 'Card Battler + Auto Chess',
        demandScore: 78,
        competitionScore: 41,
        revenuePotential: '$2-4M/month',
        timeToSaturation: '5-8 months',
        recommendation: 'LOW PRIORITY',
        reasoning: [
            'Marvel Snap proved fast card battler demand ($200M revenue)',
            'Auto Chess mechanics declining but still 40M MAU',
            'Hybrid underexplored - only 2 notable titles',
            'High churn risk - needs strong IP or innovation'
        ],
        comparableGames: ['Marvel Snap', 'Teamfight Tactics', 'Hearthstone Battlegrounds'],
        suggestedMechanics: ['card drafting', 'board positioning', 'synergy building', 'quick rounds', 'seasonal ranks']
    },
    {
        niche: 'Rhythm Game + Roguelike Progression',
        demandScore: 75,
        competitionScore: 29,
        revenuePotential: '$1-3M/month',
        timeToSaturation: '10-15 months',
        recommendation: 'WATCH',
        reasoning: [
            'Crypt of the NecroDancer proved concept ($5M revenue)',
            'Mobile rhythm market stable but not growing',
            'Niche audience but highly engaged (80% D30 retention)',
            'Music licensing costs limit profitability'
        ],
        comparableGames: ['Crypt of the NecroDancer', 'Beat Saber', 'Geometry Dash'],
        suggestedMechanics: ['beat-synced combat', 'procedural levels', 'unlock progression', 'custom songs', 'combo multipliers']
    }
];


