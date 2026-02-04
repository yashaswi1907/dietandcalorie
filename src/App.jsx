import { useState, useEffect } from 'react';
import './index.css';
import AnimatedBackground from './components/AnimatedBackground';
import AuthPage from './components/AuthPage';
import ProfileForm from './components/ProfileForm';
import DietPlanSelector from './components/DietPlanSelector';
import MealCustomizer from './components/MealCustomizer';
import PlanSummary from './components/PlanSummary';
import DailyTracker from './components/DailyTracker';
import ProgressDashboard from './components/ProgressDashboard';
import AIChatbot from './components/AIChatbot';
import WorkoutPlanner from './components/WorkoutPlanner';
import { generateDietPlans } from './utils/dietPlanGenerator';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [userProfile, setUserProfile] = useState(null);
  const [dietPlans, setDietPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [finalPlan, setFinalPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('diet'); // 'diet', 'tracker', 'progress', or 'community'

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('stayfit_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('stayfit_current_user');
    setCurrentUser(null);
    setCurrentStep(1);
    setUserProfile(null);
    setDietPlans([]);
    setSelectedPlan(null);
    setFinalPlan(null);
  };

  const handleProfileSubmit = (profile) => {
    setUserProfile(profile);
    const plans = generateDietPlans(profile);
    setDietPlans(plans);
    setCurrentStep(2);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCurrentStep(3);
  };

  const handleCustomizationComplete = (customizedPlan) => {
    setFinalPlan(customizedPlan);
    setCurrentStep(4);
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setUserProfile(null);
    setDietPlans([]);
    setSelectedPlan(null);
    setFinalPlan(null);
  };

  // Show auth page if not logged in
  if (!currentUser) {
    return (
      <>
        <AnimatedBackground />
        <AuthPage onLogin={handleLogin} />
      </>
    );
  }

  const renderContent = () => {
    if (activeTab === 'tracker') {
      return <DailyTracker userProfile={userProfile} />;
    }

    if (activeTab === 'progress') {
      return <ProgressDashboard userProfile={userProfile} />;
    }

    if (activeTab === 'progress') {
      return <ProgressDashboard userProfile={userProfile} />;
    }

    // Default: 'diet' tab content
    return (
      <>
        {currentStep === 1 && (
          <ProfileForm onSubmit={handleProfileSubmit} currentUser={currentUser} onLogout={handleLogout} />
        )}

        {currentStep === 2 && (
          <DietPlanSelector
            userProfile={userProfile}
            dietPlans={dietPlans}
            onSelectPlan={handlePlanSelect}
          />
        )}

        {currentStep === 3 && (
          <MealCustomizer
            selectedPlan={selectedPlan}
            userProfile={userProfile}
            onComplete={handleCustomizationComplete}
          />
        )}

        {currentStep === 4 && (
          <PlanSummary
            finalPlan={finalPlan}
            userProfile={userProfile}
            onStartOver={handleStartOver}
          />
        )}
      </>
    );
  };

  return (
    <>
      <AnimatedBackground />
      <div className="app">
        {/* Navigation Tabs */}
        {userProfile && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            padding: '1rem',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.1)'
          }}>
            <button
              onClick={() => setActiveTab('diet')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                background: activeTab === 'diet' ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'all 0.3s'
              }}
            >
              🍽️ Diet Plan
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                background: activeTab === 'tracker' ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'all 0.3s'
              }}
            >
              📊 Daily Tracker
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                background: activeTab === 'progress' ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'all 0.3s'
              }}
            >
              📈 Progress
            </button>
            <button
              onClick={() => setActiveTab('workout')}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                background: activeTab === 'workout' ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'all 0.3s'
              }}
            >
              💪 Workout
            </button>
          </div>
        )}

        {activeTab === 'workout' ? (
          <WorkoutPlanner userProfile={userProfile} />
        ) : renderContent()}
        <AIChatbot userProfile={userProfile} />
      </div>
    </>
  );
}

export default App;
