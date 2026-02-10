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
    { id: 1, name: 'Honor of Kings', studioRegion: 'China', genre: 'MOBA', platform: 'App Store', monthlyDownloads: 12500000, monthlyRevenue: 220000000, rating: 4.8, boostScore: 15, businessModel: 'Freemium' },
    { id: 2, name: 'PUBG Mobile', studioRegion: 'China', genre: 'Shooter', platform: 'Google Play', monthlyDownloads: 18000000, monthlyRevenue: 175000000, rating: 4.5, boostScore: 12, businessModel: 'Battle Pass' },
    { id: 3, name: 'Genshin Impact', studioRegion: 'China', genre: 'RPG', platform: 'Cross-Platform', monthlyDownloads: 9000000, monthlyRevenue: 140000000, rating: 4.7, boostScore: 22, businessModel: 'Gacha' },
    { id: 4, name: 'Royal Match', studioRegion: 'Turkey', genre: 'Puzzle', platform: 'App Store', monthlyDownloads: 15000000, monthlyRevenue: 110000000, rating: 4.9, boostScore: 35, businessModel: 'Freemium' },
    { id: 5, name: 'Roblox', studioRegion: 'USA', genre: 'Sandbox', platform: 'Google Play', monthlyDownloads: 22000000, monthlyRevenue: 105000000, rating: 4.4, boostScore: 8, businessModel: 'UGC' },
    { id: 6, name: 'Candy Crush Saga', studioRegion: 'UK', genre: 'Puzzle', platform: 'Google Play', monthlyDownloads: 11000000, monthlyRevenue: 95000000, rating: 4.6, boostScore: 5, businessModel: 'Freemium' },
    { id: 7, name: 'Coin Master', studioRegion: 'Israel', genre: 'Casual', platform: 'Google Play', monthlyDownloads: 6000000, monthlyRevenue: 85000000, rating: 4.5, boostScore: 9, businessModel: 'Gacha' },
    { id: 8, name: 'Honkai: Star Rail', studioRegion: 'China', genre: 'RPG', platform: 'App Store', monthlyDownloads: 5000000, monthlyRevenue: 80000000, rating: 4.8, boostScore: 45, businessModel: 'Gacha' },
    { id: 9, name: 'Monopoly GO!', studioRegion: 'USA', genre: 'Casual', platform: 'App Store', monthlyDownloads: 14000000, monthlyRevenue: 120000000, rating: 4.7, boostScore: 28, businessModel: 'Freemium' },
    { id: 10, name: 'Clash of Clans', studioRegion: 'Finland', genre: 'Strategy', platform: 'Google Play', monthlyDownloads: 4000000, monthlyRevenue: 60000000, rating: 4.6, boostScore: 4, businessModel: 'Freemium' },
    { id: 11, name: 'Pokémon GO', studioRegion: 'USA', genre: 'AR', platform: 'App Store', monthlyDownloads: 3500000, monthlyRevenue: 55000000, rating: 4.3, boostScore: 7, businessModel: 'Freemium' },
    { id: 12, name: 'Fate/Grand Order', studioRegion: 'Japan', genre: 'RPG', platform: 'Google Play', monthlyDownloads: 800000, monthlyRevenue: 48000000, rating: 4.6, boostScore: 11, businessModel: 'Gacha' },
    { id: 13, name: 'Free Fire', studioRegion: 'Singapore', genre: 'Shooter', platform: 'Amazon', monthlyDownloads: 25000000, monthlyRevenue: 45000000, rating: 4.2, boostScore: 18, businessModel: 'Battle Pass' },
    { id: 14, name: 'Gardenscapes', studioRegion: 'Russia', genre: 'Puzzle', platform: 'Google Play', monthlyDownloads: 5000000, monthlyRevenue: 42000000, rating: 4.4, boostScore: 6, businessModel: 'Freemium' },
    { id: 15, name: 'Dragon Ball Z Dokkan', studioRegion: 'Japan', genre: 'RPG', platform: 'App Store', monthlyDownloads: 1200000, monthlyRevenue: 38000000, rating: 4.7, boostScore: 14, businessModel: 'Gacha' },
    { id: 16, name: 'Whiteout Survival', studioRegion: 'China', genre: 'Strategy', platform: 'Google Play', monthlyDownloads: 4500000, monthlyRevenue: 75000000, rating: 4.5, boostScore: 32, businessModel: 'Hybrid' },
    { id: 17, name: 'Subway Surfers', studioRegion: 'Denmark', genre: 'Arcade', platform: 'Amazon', monthlyDownloads: 30000000, monthlyRevenue: 2500000, rating: 4.5, boostScore: 3, businessModel: 'Ads' },
    { id: 18, name: 'Brawl Stars', studioRegion: 'Finland', genre: 'Action', platform: 'App Store', monthlyDownloads: 6000000, monthlyRevenue: 52000000, rating: 4.7, boostScore: 21, businessModel: 'Battle Pass' },
    { id: 19, name: 'Call of Duty: Mobile', studioRegion: 'USA', genre: 'Shooter', platform: 'Google Play', monthlyDownloads: 7000000, monthlyRevenue: 45000000, rating: 4.6, boostScore: 10, businessModel: 'Battle Pass' },
    { id: 20, name: 'League of Legends: WR', studioRegion: 'USA', genre: 'MOBA', platform: 'App Store', monthlyDownloads: 3500000, monthlyRevenue: 28000000, rating: 4.4, boostScore: 8, businessModel: 'Skins' },
    { id: 21, name: 'Uma Musume', studioRegion: 'Japan', genre: 'Sim', platform: 'Google Play', monthlyDownloads: 500000, monthlyRevenue: 35000000, rating: 4.8, boostScore: 9, businessModel: 'Gacha' },
    { id: 22, name: 'Eggy Party', studioRegion: 'China', genre: 'Party', platform: 'App Store', monthlyDownloads: 8000000, monthlyRevenue: 30000000, rating: 4.6, boostScore: 40, businessModel: 'Skins' },
    { id: 23, name: 'Monster Strike', studioRegion: 'Japan', genre: 'RPG', platform: 'Google Play', monthlyDownloads: 900000, monthlyRevenue: 32000000, rating: 4.5, boostScore: 5, businessModel: 'Gacha' },
    { id: 24, name: 'Township', studioRegion: 'Russia', genre: 'Sim', platform: 'Amazon', monthlyDownloads: 4000000, monthlyRevenue: 28000000, rating: 4.5, boostScore: 6, businessModel: 'Freemium' },
    { id: 25, name: 'Fishdom', studioRegion: 'Russia', genre: 'Puzzle', platform: 'App Store', monthlyDownloads: 4500000, monthlyRevenue: 26000000, rating: 4.4, boostScore: 7, businessModel: 'Freemium' },
];

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
