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
    { id: 1, name: 'Honor of Kings', studioRegion: 'China', genre: 'MOBA', platform: 'App Store', monthlyDownloads: 12500000, monthlyRevenue: 220000000, rating: 4.8, boostScore: 15, businessModel: 'Freemium', icon: '👑', color: '#fbbf24', storeUrl: 'https://apps.apple.com/app/honor-of-kings' },
    { id: 2, name: 'PUBG Mobile', studioRegion: 'China', genre: 'Shooter', platform: 'Google Play', monthlyDownloads: 18000000, monthlyRevenue: 175000000, rating: 4.5, boostScore: 12, businessModel: 'Battle Pass', icon: '🍳', color: '#10b981', storeUrl: 'https://play.google.com/store/apps/details?id=com.tencent.ig' },
    { id: 3, name: 'Genshin Impact', studioRegion: 'China', genre: 'RPG', platform: 'Cross-Platform', monthlyDownloads: 9000000, monthlyRevenue: 140000000, rating: 4.7, boostScore: 22, businessModel: 'Gacha', icon: '🌌', color: '#8b5cf6', storeUrl: 'https://genshin.hoyoverse.com' },
    { id: 4, name: 'Royal Match', studioRegion: 'Turkey', genre: 'Puzzle', platform: 'App Store', monthlyDownloads: 15000000, monthlyRevenue: 110000000, rating: 4.9, boostScore: 35, businessModel: 'Freemium', icon: '🏰', color: '#f59e0b', storeUrl: 'https://apps.apple.com/app/royal-match' },
    { id: 5, name: 'Roblox', studioRegion: 'USA', genre: 'Sandbox', platform: 'Google Play', monthlyDownloads: 22000000, monthlyRevenue: 105000000, rating: 4.4, boostScore: 8, businessModel: 'UGC', icon: '🟥', color: '#ef4444', storeUrl: 'https://play.google.com/store/apps/details?id=com.roblox.client' },
    { id: 6, name: 'Candy Crush Saga', studioRegion: 'UK', genre: 'Puzzle', platform: 'Google Play', monthlyDownloads: 11000000, monthlyRevenue: 95000000, rating: 4.6, boostScore: 5, businessModel: 'Freemium', icon: '🍬', color: '#ec4899', storeUrl: 'https://play.google.com/store/apps/details?id=com.king.candycrushsaga' },
    { id: 7, name: 'Coin Master', studioRegion: 'Israel', genre: 'Casual', platform: 'Google Play', monthlyDownloads: 6000000, monthlyRevenue: 85000000, rating: 4.5, boostScore: 9, businessModel: 'Gacha', icon: '🐷', color: '#fcd34d', storeUrl: 'https://play.google.com/store/apps/details?id=com.moonactive.coinmaster' },
    { id: 8, name: 'Honkai: Star Rail', studioRegion: 'China', genre: 'RPG', platform: 'App Store', monthlyDownloads: 5000000, monthlyRevenue: 80000000, rating: 4.8, boostScore: 45, businessModel: 'Gacha', icon: '🚆', color: '#6366f1', storeUrl: 'https://apps.apple.com/app/honkai-star-rail' },
    { id: 9, name: 'Monopoly GO!', studioRegion: 'USA', genre: 'Casual', platform: 'App Store', monthlyDownloads: 14000000, monthlyRevenue: 120000000, rating: 4.7, boostScore: 28, businessModel: 'Freemium', icon: '🎲', color: '#10b981', storeUrl: 'https://apps.apple.com/app/monopoly-go' },
    { id: 10, name: 'Clash of Clans', studioRegion: 'Finland', genre: 'Strategy', platform: 'Google Play', monthlyDownloads: 4000000, monthlyRevenue: 60000000, rating: 4.6, boostScore: 4, businessModel: 'Freemium', icon: '⚔️', color: '#f97316', storeUrl: 'https://play.google.com/store/apps/details?id=com.supercell.clashofclans' },
];

// Game Rankings
export const gameRankings = {
    topFree: [
        { id: 'gf1', name: 'Honkai: Star Rail', publisher: 'HoYoverse', downloads: '5,000,000', change: '+45%', icon: '🚆', color: '#6366f1', type: 'game', storeUrl: 'https://apps.apple.com/app/honkai-star-rail' },
        { id: 'gf2', name: 'Royal Match', publisher: 'Dream Games', downloads: '15,000,000', change: '+35%', icon: '🏰', color: '#f59e0b', type: 'game', storeUrl: 'https://apps.apple.com/app/royal-match' },
        { id: 'gf3', name: 'Monopoly GO!', publisher: 'Scopely', downloads: '14,000,000', change: '+28%', icon: '🎲', color: '#10b981', type: 'game', storeUrl: 'https://apps.apple.com/app/monopoly-go' },
        { id: 'gf4', name: 'Roblox', publisher: 'Roblox Corp', downloads: '22,000,000', change: '+8%', icon: '🟥', color: '#ef4444', type: 'game', storeUrl: 'https://play.google.com/store/apps/details?id=com.roblox.client' },
        { id: 'gf5', name: 'Genshin Impact', publisher: 'HoYoverse', downloads: '9,000,000', change: '+22%', icon: '🌌', color: '#8b5cf6', type: 'game', storeUrl: 'https://genshin.hoyoverse.com' },
    ],
    topGrossing: [
        { id: 'gg1', name: 'Honor of Kings', publisher: 'Tencent', revenue: '$220,000,000', change: '+15%', icon: '👑', color: '#fbbf24', type: 'game', storeUrl: 'https://apps.apple.com/app/honor-of-kings' },
        { id: 'gg2', name: 'PUBG Mobile', publisher: 'Tencent', revenue: '$175,000,000', change: '+12%', icon: '🍳', color: '#10b981', type: 'game', storeUrl: 'https://play.google.com/store/apps/details?id=com.tencent.ig' },
        { id: 'gg3', name: 'Genshin Impact', publisher: 'HoYoverse', revenue: '$140,000,000', change: '+22%', icon: '🌌', color: '#8b5cf6', type: 'game', storeUrl: 'https://genshin.hoyoverse.com' },
        { id: 'gg4', name: 'Monopoly GO!', publisher: 'Scopely', revenue: '$120,000,000', change: '+28%', icon: '🎲', color: '#10b981', type: 'game', storeUrl: 'https://apps.apple.com/app/monopoly-go' },
        { id: 'gg5', name: 'Royal Match', publisher: 'Dream Games', revenue: '$110,000,000', change: '+35%', icon: '🏰', color: '#f59e0b', type: 'game', storeUrl: 'https://apps.apple.com/app/royal-match' },
    ],
    topFeatured: [
        { id: 'gfu1', name: 'Honkai: Star Rail', score: 945, icon: '🚆', color: '#6366f1', type: 'game', storeUrl: 'https://apps.apple.com/app/honkai-star-rail' },
        { id: 'gfu2', name: 'Royal Match', score: 890, icon: '🏰', color: '#f59e0b', type: 'game', storeUrl: 'https://apps.apple.com/app/royal-match' },
        { id: 'gfu3', name: 'Monopoly GO!', score: 835, icon: '🎲', color: '#10b981', type: 'game', storeUrl: 'https://apps.apple.com/app/monopoly-go' },
        { id: 'gfu4', name: 'Candy Crush Saga', score: 720, icon: '🍬', color: '#ec4899', type: 'game', storeUrl: 'https://play.google.com/store/apps/details?id=com.king.candycrushsaga' },
        { id: 'gfu5', name: 'Coin Master', score: 685, icon: '🐷', color: '#fcd34d', type: 'game', storeUrl: 'https://play.google.com/store/apps/details?id=com.moonactive.coinmaster' },
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

