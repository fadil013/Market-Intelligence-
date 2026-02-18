import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Cpu, Cloud, Package, Code, Smartphone, TrendingUp, DollarSign, Award, Zap, Database } from 'lucide-react';

const TechStackDetection = ({ techStackData }) => {
  const [viewMode, setViewMode] = useState('overview'); // overview, engines, sdks, backend
  const [selectedGame, setSelectedGame] = useState(null);

  // Calculate summary stats
  const engineCount = {};
  const sdkCount = {};
  const cloudCount = {};
  
  techStackData.forEach(game => {
    const engine = game.techStack.engine.split(' ')[0]; // "Unity 2022.3" -> "Unity"
    engineCount[engine] = (engineCount[engine] || 0) + 1;
    
    game.techStack.sdks.forEach(sdk => {
      const sdkName = sdk.name.split(' ')[0]; // "Unity Ads" -> "Unity"
      sdkCount[sdkName] = (sdkCount[sdkName] || 0) + 1;
    });
    
    const cloud = game.techStack.backend.cloud;
    cloudCount[cloud] = (cloudCount[cloud] || 0) + 1;
  });

  const mostPopularEngine = Object.entries(engineCount).sort((a, b) => b[1] - a[1])[0];
  const mostPopularCloud = Object.entries(cloudCount).sort((a, b) => b[1] - a[1])[0];
  const crossPlatformCount = techStackData.filter(g => g.techStack.crossPlatform).length;
  const crossPlatformPercent = Math.round((crossPlatformCount / techStackData.length) * 100);

  // Engine market share data
  const engineShareData = Object.entries(engineCount).map(([name, count]) => ({
    name,
    value: Math.round((count / techStackData.length) * 100),
    count
  }));

  // SDK adoption data
  const sdkAdoptionData = Object.entries(sdkCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({
      name,
      adoption: Math.round((count / techStackData.length) * 100),
      games: count
    }));

  // Cloud provider distribution
  const cloudDistributionData = Object.entries(cloudCount).map(([name, count]) => ({
    name,
    value: Math.round((count / techStackData.length) * 100),
    count
  }));

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#a78bfa'];

  const getEngineIcon = (engine) => {
    const colors = {
      'Unity': 'text-purple-400',
      'Unreal': 'text-blue-400',
      'Native': 'text-green-400',
      'Cocos2d': 'text-yellow-400',
      'Custom': 'text-pink-400'
    };
    return colors[engine] || 'text-gray-400';
  };

  const getCloudIcon = (cloud) => {
    const colors = {
      'AWS': 'text-orange-400',
      'GCP': 'text-blue-400',
      'Azure': 'text-cyan-400',
      'Firebase': 'text-yellow-400'
    };
    return colors[cloud] || 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <p className="text-sm text-gray-400">Top Engine</p>
          </div>
          <p className="text-2xl font-bold text-white">{mostPopularEngine[0]}</p>
          <p className="text-sm text-purple-300">{mostPopularEngine[1]} games</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="w-5 h-5 text-blue-400" />
            <p className="text-sm text-gray-400">Top Cloud</p>
          </div>
          <p className="text-2xl font-bold text-white">{mostPopularCloud[0]}</p>
          <p className="text-sm text-blue-300">{mostPopularCloud[1]} games</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone className="w-5 h-5 text-green-400" />
            <p className="text-sm text-gray-400">Cross-Platform</p>
          </div>
          <p className="text-2xl font-bold text-white">{crossPlatformPercent}%</p>
          <p className="text-sm text-green-300">{crossPlatformCount} of {techStackData.length}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-yellow-400" />
            <p className="text-sm text-gray-400">Avg SDKs</p>
          </div>
          <p className="text-2xl font-bold text-white">
            {Math.round(techStackData.reduce((sum, g) => sum + g.techStack.sdks.length, 0) / techStackData.length)}
          </p>
          <p className="text-sm text-yellow-300">per game</p>
        </div>
      </div>

      {/* View Mode Switcher */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setViewMode('overview')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'overview'
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Cpu className="w-4 h-4 inline mr-2" />
          Overview
        </button>
        <button
          onClick={() => setViewMode('engines')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'engines'
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Code className="w-4 h-4 inline mr-2" />
          Engines
        </button>
        <button
          onClick={() => setViewMode('sdks')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'sdks'
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Package className="w-4 h-4 inline mr-2" />
          SDKs
        </button>
        <button
          onClick={() => setViewMode('backend')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            viewMode === 'backend'
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Cloud className="w-4 h-4 inline mr-2" />
          Backend
        </button>
      </div>

      {/* Overview */}
      {viewMode === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Engine Market Share */}
            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                Engine Market Share
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={engineShareData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {engineShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {engineShareData.map((engine, idx) => (
                  <div key={engine.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-sm text-gray-300">{engine.name}: {engine.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cloud Provider Distribution */}
            <div className="bg-white/5 rounded-lg p-5 border border-white/10">
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-400" />
                Cloud Provider Distribution
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={cloudDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {cloudDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {cloudDistributionData.map((cloud, idx) => (
                  <div key={cloud.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-sm text-gray-300">{cloud.name}: {cloud.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-5 border border-purple-500/30">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Key Technical Insights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                <p className="text-sm">
                  <span className="text-white font-semibold">Unity dominates</span> with {mostPopularEngine[1]} games ({Math.round((mostPopularEngine[1] / techStackData.length) * 100)}%) due to cross-platform efficiency
                </p>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <p className="text-sm">
                  <span className="text-white font-semibold">AWS leads cloud</span> infrastructure with {mostPopularCloud[1]} games for scalability
                </p>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <p className="text-sm">
                  <span className="text-white font-semibold">Cross-platform is standard</span> - {crossPlatformPercent}% target both iOS & Android
                </p>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                <p className="text-sm">
                  <span className="text-white font-semibold">SDK integration heavy</span> - Average game uses {Math.round(techStackData.reduce((sum, g) => sum + g.techStack.sdks.length, 0) / techStackData.length)} SDKs
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Engines View */}
      {viewMode === 'engines' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {techStackData.map((game) => {
              const engine = game.techStack.engine.split(' ')[0];
              const version = game.techStack.engine.split(' ').slice(1).join(' ');
              
              return (
                <div key={game.gameName} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-white/5 ${getEngineIcon(engine)}`}>
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{game.gameName}</h4>
                        <p className="text-sm text-gray-400">{game.techStack.language}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-400">{engine}</p>
                      <p className="text-xs text-gray-400">{version}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white/5 rounded p-2">
                      <p className="text-xs text-gray-400 mb-1">Platforms</p>
                      <p className="text-sm text-white font-medium">
                        {game.techStack.platforms.join(', ')}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded p-2">
                      <p className="text-xs text-gray-400 mb-1">Cross-Platform</p>
                      <p className="text-sm text-white font-medium">
                        {game.techStack.crossPlatform ? '✅ Yes' : '❌ No'}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded p-2">
                      <p className="text-xs text-gray-400 mb-1">Cloud</p>
                      <p className="text-sm text-white font-medium">
                        {game.techStack.backend.cloud}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded p-2">
                      <p className="text-xs text-gray-400 mb-1">SDKs</p>
                      <p className="text-sm text-white font-medium">
                        {game.techStack.sdks.length} integrated
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SDKs View */}
      {viewMode === 'sdks' && (
        <div className="space-y-4">
          {/* SDK Adoption Chart */}
          <div className="bg-white/5 rounded-lg p-5 border border-white/10">
            <h4 className="text-white font-semibold mb-4">SDK Adoption Rates</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sdkAdoptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} label={{ value: '% of Games', angle: -90, position: 'insideLeft', style: { fill: '#9ca3af' } }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="adoption" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                  {sdkAdoptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* SDK Details by Game */}
          <div className="grid grid-cols-1 gap-4">
            {techStackData.map((game) => (
              <div key={game.gameName} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold">{game.gameName}</h4>
                  <span className="text-sm text-gray-400">{game.techStack.sdks.length} SDKs</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {game.techStack.sdks.map((sdk, idx) => (
                    <div key={idx} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-purple-400" />
                        <div className="min-w-0">
                          <p className="text-sm text-white font-medium truncate">{sdk.name}</p>
                          <p className="text-xs text-gray-400">v{sdk.version}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Backend View */}
      {viewMode === 'backend' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {techStackData.map((game) => (
              <div key={game.gameName} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white/5 ${getCloudIcon(game.techStack.backend.cloud)}`}>
                      <Cloud className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{game.gameName}</h4>
                      <p className="text-sm text-gray-400">Backend Infrastructure</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-400">{game.techStack.backend.cloud}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Services Used:</p>
                    <div className="flex flex-wrap gap-2">
                      {game.techStack.backend.services.map((service, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 text-sm">
                          <Database className="w-3 h-3 inline mr-1" />
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {game.insights && (
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-sm text-gray-400 mb-2">Cost Analysis:</p>
                      <p className="text-sm text-gray-300 bg-green-500/10 border border-green-500/20 rounded p-2">
                        <DollarSign className="w-4 h-4 inline text-green-400 mr-1" />
                        {game.insights.costEfficiency}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Backend Insights */}
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-5 border border-blue-500/30">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              Backend Infrastructure Trends
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                <span className="text-white font-semibold">AWS dominates</span> with services like EC2 (compute), S3 (storage), and DynamoDB (database) for scalable multiplayer infrastructure
              </p>
              <p className="text-sm text-gray-300">
                <span className="text-white font-semibold">Firebase popular</span> for indie/mid-size games due to easy authentication, realtime database, and analytics integration
              </p>
              <p className="text-sm text-gray-300">
                <span className="text-white font-semibold">Multi-cloud rare</span> - Most games stick to one provider to reduce complexity and leverage deep service integration
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStackDetection;
