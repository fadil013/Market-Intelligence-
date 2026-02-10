import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages for performance optimization (Code Splitting)
const Overview = lazy(() => import('./pages/Overview'));
const Trends = lazy(() => import('./pages/Trends'));
const MarketCompare = lazy(() => import('./pages/MarketCompare'));
const PredictiveAI = lazy(() => import('./pages/PredictiveAI'));
const Suggestions = lazy(() => import('./pages/Suggestions'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Overview />
              </Suspense>
            }
          />
          <Route
            path="trends"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Trends />
              </Suspense>
            }
          />
          <Route
            path="market"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <MarketCompare />
              </Suspense>
            }
          />
          <Route
            path="predictive"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <PredictiveAI />
              </Suspense>
            }
          />
          <Route
            path="suggestions"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Suggestions />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
