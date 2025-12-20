console.log('DAY BY DAY APP LOADING');
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';

// ============================================================================
// DAY BY DAY - Leader & Leadership Development Application
// With ICF Coaching, Supabase Integration & Authentication
// ============================================================================

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
  ChevronRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Send: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Loader: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
      <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
    </svg>
  ),
  Play: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  Home: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Book: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Target: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  MessageCircle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  ),
  User: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  Circle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  Compass: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  Flame: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  Award: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
    </svg>
  ),
  Brain: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Lightbulb: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18h6"/><path d="M10 22h4"/>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Lock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
};

// ============================================================================
// PHOTOS
// ============================================================================

const PHOTOS = {
  leaderDev: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
  leadershipDev: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  emotions: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&q=80',
  values: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&q=80',
  strengths: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=600&q=80',
  growth: 'https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=600&q=80',
  listening: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
  feedback: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=600&q=80',
  safety: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80',
  team: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80'
};

// ============================================================================
// DATA
// ============================================================================

const PATHS = [
  {
    id: 'leader_development',
    name: 'Leader Development',
    subtitle: 'Build Your Individual Capacity',
    description: 'Develop the skills, self-awareness, and capabilities that make you effective as a leader.',
    image: PHOTOS.leaderDev,
    outcome: 'Human Capital'
  },
  {
    id: 'leadership_development',
    name: 'Leadership Development',
    subtitle: 'Lead Effectively with Others',
    description: 'Apply your capabilities in collective contexts. Build relationships and team dynamics.',
    image: PHOTOS.leadershipDev,
    outcome: 'Social Capital'
  }
];

const ACTIVITIES = {
  leader_development: [
    {
      id: 'the_pause',
      title: 'The Pause',
      description: 'Build self-awareness by noticing reactions before responding',
      image: PHOTOS.emotions,
      duration: '5 min',
      level: 'Foundation',
      category: 'Self-Awareness',
      step_set_goal: 'Today, pause for 3 seconds before responding in any situation that triggers a strong reaction.',
      step_gather_info: 'Notice: What triggered you? What emotion arose? What was your first impulse?',
      step_apply: 'Take a breath. Ask yourself: "Is my first reaction the best reaction?" Then choose consciously.',
      step_reflect_prompt: 'What did you notice when you paused? How did it change your response?'
    },
    {
      id: 'values_clarity',
      title: 'Values in Action',
      description: 'Clarify your core values and notice when you honor them',
      image: PHOTOS.values,
      duration: '10 min',
      level: 'Foundation',
      category: 'Values',
      step_set_goal: 'Identify one core value. Watch for moments today when your actions align—or don\'t—with that value.',
      step_gather_info: 'What value did you choose? When did you see it guiding you? When did you drift from it?',
      step_apply: 'In one situation, consciously choose the action that reflects your value, even if harder.',
      step_reflect_prompt: 'How did it feel to act from your value? What made it easy or hard?'
    },
    {
      id: 'strength_awareness',
      title: 'Spot Your Strengths',
      description: 'Identify when you\'re operating at your best',
      image: PHOTOS.strengths,
      duration: '5 min',
      level: 'Foundation',
      category: 'Self-Awareness',
      step_set_goal: 'Pay attention to moments when you feel energized and effective—when time flies.',
      step_gather_info: 'What were you doing? What strengths were you using? What conditions helped?',
      step_apply: 'Seek out one additional opportunity to use that strength today.',
      step_reflect_prompt: 'What strength did you identify? How might you use it more intentionally?'
    },
    {
      id: 'seek_feedback',
      title: 'Seek Feedback',
      description: 'Actively ask for input to see your blind spots',
      image: PHOTOS.growth,
      duration: '15 min',
      level: 'Growth',
      category: 'Self-Awareness',
      step_set_goal: 'Ask one person: "What\'s one thing I could do differently to be more effective?"',
      step_gather_info: 'Who will you ask? What do you want feedback on? Notice your feelings about asking.',
      step_apply: 'Ask the question. Listen without defending. Thank them genuinely.',
      step_reflect_prompt: 'What did you learn? What was hard about hearing it? What will you do with it?'
    }
  ],
  leadership_development: [
    {
      id: 'deep_listening',
      title: 'Deep Listening',
      description: 'Give someone your complete, undivided attention',
      image: PHOTOS.listening,
      duration: '10 min',
      level: 'Foundation',
      category: 'Relationships',
      step_set_goal: 'In your next conversation, focus entirely on understanding before responding.',
      step_gather_info: 'Are you truly listening or preparing your reply? What is the person really saying?',
      step_apply: 'Put away distractions. Don\'t interrupt. Reflect back what you heard.',
      step_reflect_prompt: 'What did you notice when you listened fully? What did you learn?'
    },
    {
      id: 'psychological_safety',
      title: 'Build Safety',
      description: 'Create an environment where people can speak up',
      image: PHOTOS.safety,
      duration: '15 min',
      level: 'Foundation',
      category: 'Team Dynamics',
      step_set_goal: 'Observe: How safe do people feel to speak up, take risks, and admit mistakes?',
      step_gather_info: 'Who speaks? Who stays quiet? How are mistakes discussed?',
      step_apply: 'Do one thing to increase safety: invite a quiet person\'s view or share a mistake you made.',
      step_reflect_prompt: 'What did you observe about safety? What impact did your action have?'
    },
    {
      id: 'give_feedback',
      title: 'Give Clear Feedback',
      description: 'Use the Situation-Behavior-Impact model',
      image: PHOTOS.feedback,
      duration: '15 min',
      level: 'Growth',
      category: 'Relationships',
      step_set_goal: 'Give one piece of feedback using: Situation, Behavior, Impact.',
      step_gather_info: 'What situation? What specific behavior? What was the impact?',
      step_apply: 'Share: "In [situation], when you [behavior], the impact was [result]."',
      step_reflect_prompt: 'How did it go? What would you do differently?'
    },
    {
      id: 'develop_others',
      title: 'Develop Someone Else',
      description: 'Build leadership capacity in your team',
      image: PHOTOS.team,
      duration: '15 min',
      level: 'Growth',
      category: 'Team Dynamics',
      step_set_goal: 'Find one opportunity to develop someone else\'s leadership instead of doing it yourself.',
      step_gather_info: 'What could you delegate? Who is ready to stretch? What support do they need?',
      step_apply: 'Delegate with clear goals and autonomy. Let them lead.',
      step_reflect_prompt: 'What did you delegate? What did they learn? What did you learn?'
    }
  ]
};

// ============================================================================
// AUTH SCREEN
// ============================================================================

function AuthScreen({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuth(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } }
        });
        if (error) throw error;
        if (data.user) onAuth(data.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-semibold text-stone-800 mb-2">Day by Day</h1>
          <p className="text-stone-600">Leader & Leadership Development</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-800 mb-6">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">Name</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"><Icons.User /></div>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    placeholder="Your name" required={!isLogin} />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"><Icons.Mail /></div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"><Icons.Lock /></div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  placeholder="Min 6 characters" required minLength={6} />
              </div>
            </div>
            {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <Icons.Loader /> : null}
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-amber-700 hover:text-amber-800">
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// HEADER & NAV
// ============================================================================

function Header({ streak }) {
  return (
    <header className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-30">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <h1 className="font-serif text-xl font-semibold text-stone-800">Day by Day</h1>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200">
            <Icons.Flame />
            <span className="font-semibold text-sm">{streak} days</span>
          </div>
        )}
      </div>
    </header>
  );
}

function BottomNav({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Icons.Home },
    { id: 'paths', label: 'Learn', icon: Icons.Compass },
    { id: 'journal', label: 'Journal', icon: Icons.Book },
    { id: 'goals', label: 'Goals', icon: Icons.Target },
    { id: 'profile', label: 'Profile', icon: Icons.User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-30">
      <div className="max-w-lg mx-auto flex justify-around py-2">
        {navItems.map(item => {
          const isActive = currentView === item.id || 
            (item.id === 'paths' && (currentView === 'path-detail' || currentView === 'practice'));
          return (
            <button key={item.id} onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center px-4 py-2 rounded-xl transition-colors
                ${isActive ? 'text-amber-700' : 'text-stone-400 hover:text-stone-600'}`}>
              <item.icon />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ============================================================================
// DASHBOARD
// ============================================================================

function Dashboard({ setCurrentView, setSelectedPath, setSelectedActivity, streak, user, goals, journalEntries, completedActivities }) {
  const todayActivity = ACTIVITIES.leader_development[0];
  const activeGoals = goals.filter(g => !g.completed);
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <p className="text-stone-500 text-sm mb-1">{dateStr}</p>
        <h2 className="font-serif text-2xl text-stone-800">
          {user?.user_metadata?.full_name ? `Welcome, ${user.user_metadata.full_name.split(' ')[0]}` : 'Welcome back'}
        </h2>
      </div>

      {/* AI Coach */}
      <div className="mb-6">
        <button onClick={() => setCurrentView('coach')}
          className="w-full bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-6 text-left hover:from-stone-700 hover:to-stone-800 transition-all group">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0 text-white">
              <Icons.Brain />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-white">Your Leadership Coach</h3>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">ICF</span>
              </div>
              <p className="text-stone-300 text-sm mb-3">Get personalized guidance and accelerate your development.</p>
              <div className="flex items-center gap-2 text-amber-400 font-medium text-sm group-hover:gap-3 transition-all">
                <span>Start a conversation</span>
                <Icons.ArrowRight />
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border border-stone-200 text-center">
          <div className="flex justify-center mb-1 text-amber-600"><Icons.Flame /></div>
          <p className="text-xl font-bold text-stone-800">{streak}</p>
          <p className="text-xs text-stone-500">Streak</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 text-center">
          <div className="flex justify-center mb-1 text-teal-600"><Icons.Award /></div>
          <p className="text-xl font-bold text-stone-800">{completedActivities}</p>
          <p className="text-xs text-stone-500">Done</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 text-center">
          <div className="flex justify-center mb-1 text-violet-600"><Icons.Target /></div>
          <p className="text-xl font-bold text-stone-800">{activeGoals.length}</p>
          <p className="text-xs text-stone-500">Goals</p>
        </div>
      </div>

      {/* Today's Practice */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-stone-800">Today's Practice</h3>
          <button onClick={() => setCurrentView('paths')} className="text-amber-700 text-sm font-medium flex items-center gap-1">
            All <Icons.ChevronRight />
          </button>
        </div>
        <button onClick={() => { setSelectedActivity(todayActivity); setCurrentView('practice'); }}
          className="w-full bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg hover:border-stone-300 transition-all text-left">
          <div className="flex">
            <img src={todayActivity.image} alt="" className="w-28 h-28 object-cover" />
            <div className="flex-1 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-amber-700">{todayActivity.level}</span>
                <span className="text-xs text-stone-400 flex items-center gap-1"><Icons.Clock /> {todayActivity.duration}</span>
              </div>
              <h4 className="font-semibold text-stone-800 mb-1">{todayActivity.title}</h4>
              <p className="text-sm text-stone-500 line-clamp-2">{todayActivity.description}</p>
            </div>
          </div>
        </button>
      </div>

      {/* Paths */}
      <div className="mb-6">
        <h3 className="font-semibold text-stone-800 mb-3">Learning Paths</h3>
        <div className="grid grid-cols-2 gap-3">
          {PATHS.map(path => (
            <button key={path.id} onClick={() => { setSelectedPath(path.id); setCurrentView('path-detail'); }}
              className="text-left rounded-xl overflow-hidden border border-stone-200 bg-white hover:shadow-md transition-all group">
              <div className="relative h-20 overflow-hidden">
                <img src={path.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-3 text-white font-medium text-sm">{path.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setCurrentView('journal')} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 text-left">
          <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600"><Icons.Book /></div>
          <div>
            <p className="font-medium text-stone-800 text-sm">Journal</p>
            <p className="text-xs text-stone-500">{journalEntries.length} entries</p>
          </div>
        </button>
        <button onClick={() => setCurrentView('goals')} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 text-left">
          <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600"><Icons.Target /></div>
          <div>
            <p className="font-medium text-stone-800 text-sm">Goals</p>
            <p className="text-xs text-stone-500">{activeGoals.length} active</p>
          </div>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// JOURNAL
// ============================================================================

function Journal({ user, journalEntries, setJournalEntries }) {
  const [newEntry, setNewEntry] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const prompts = ["What leadership moment stood out today?", "What did I learn about myself?", "What's challenging me right now?"];

  const handleSave = async () => {
    if (!newEntry.trim() || saving) return;
    setSaving(true);
    const { data, error } = await supabase.from('reflections').insert({ user_id: user.id, content: newEntry, reflection_type: 'journal' }).select().single();
    if (!error && data) { setJournalEntries([data, ...journalEntries]); setNewEntry(''); setShowNew(false); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('reflections').delete().eq('id', id);
    if (!error) setJournalEntries(journalEntries.filter(e => e.id !== id));
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="animate-fadeIn pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl text-stone-800">Journal</h2>
          <p className="text-sm text-stone-500">Capture your reflections</p>
        </div>
        {!showNew && (
          <button onClick={() => setShowNew(true)} className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white rounded-full font-medium text-sm">
            <Icons.Plus /> New
          </button>
        )}
      </div>

      {showNew && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {prompts.map((prompt, idx) => (
              <button key={idx} onClick={() => setNewEntry(prompt + '\n\n')} className="text-xs px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200">{prompt}</button>
            ))}
          </div>
          <textarea value={newEntry} onChange={(e) => setNewEntry(e.target.value)} placeholder="What's on your mind?" autoFocus
            className="w-full px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-stone-900 h-32 text-sm" />
          <div className="flex justify-end gap-2 mt-3">
            <button onClick={() => { setShowNew(false); setNewEntry(''); }} className="px-4 py-2 text-stone-600 text-sm">Cancel</button>
            <button onClick={handleSave} disabled={!newEntry.trim() || saving} className="px-5 py-2 bg-stone-900 text-white rounded-full font-medium text-sm disabled:opacity-50 flex items-center gap-2">
              {saving && <Icons.Loader />} Save
            </button>
          </div>
        </div>
      )}

      {journalEntries.length === 0 && !showNew ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400"><Icons.Book /></div>
          <p className="text-stone-600 font-medium mb-1">No entries yet</p>
          <button onClick={() => setShowNew(true)} className="text-amber-700 font-medium text-sm">Write your first entry</button>
        </div>
      ) : (
        <div className="space-y-3">
          {journalEntries.map(entry => (
            <div key={entry.id} className="bg-white rounded-xl border border-stone-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2"><Icons.Calendar /><p className="text-xs text-stone-500">{formatDate(entry.created_at)}</p></div>
                <button onClick={() => handleDelete(entry.id)} className="text-stone-300 hover:text-red-500"><Icons.Trash /></button>
              </div>
              <p className="text-stone-700 text-sm whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// GOALS
// ============================================================================

function Goals({ user, goals, setGoals }) {
  const [showNew, setShowNew] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!newGoal.trim() || saving) return;
    setSaving(true);
    const { data, error } = await supabase.from('goals').insert({ user_id: user.id, title: newGoal }).select().single();
    if (!error && data) { setGoals([data, ...goals]); setNewGoal(''); setShowNew(false); }
    setSaving(false);
  };

  const toggleComplete = async (goal) => {
    const { data, error } = await supabase.from('goals').update({ completed: !goal.completed, completed_at: !goal.completed ? new Date().toISOString() : null }).eq('id', goal.id).select().single();
    if (!error && data) setGoals(goals.map(g => g.id === goal.id ? data : g));
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('goals').delete().eq('id', id);
    if (!error) setGoals(goals.filter(g => g.id !== id));
  };

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  return (
    <div className="animate-fadeIn pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl text-stone-800">Goals</h2>
          <p className="text-sm text-stone-500">Track your development</p>
        </div>
        {!showNew && (
          <button onClick={() => setShowNew(true)} className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white rounded-full font-medium text-sm">
            <Icons.Plus /> New
          </button>
        )}
      </div>

      {showNew && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-6">
          <input type="text" value={newGoal} onChange={(e) => setNewGoal(e.target.value)} placeholder="What do you want to achieve?" autoFocus
            className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 text-sm" />
          <div className="flex justify-end gap-2 mt-3">
            <button onClick={() => { setShowNew(false); setNewGoal(''); }} className="px-4 py-2 text-stone-600 text-sm">Cancel</button>
            <button onClick={handleSave} disabled={!newGoal.trim() || saving} className="px-5 py-2 bg-stone-900 text-white rounded-full font-medium text-sm disabled:opacity-50 flex items-center gap-2">
              {saving && <Icons.Loader />} Save
            </button>
          </div>
        </div>
      )}

      {goals.length === 0 && !showNew ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400"><Icons.Target /></div>
          <p className="text-stone-600 font-medium mb-1">No goals yet</p>
          <button onClick={() => setShowNew(true)} className="text-amber-700 font-medium text-sm">Set your first goal</button>
        </div>
      ) : (
        <>
          {activeGoals.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Active ({activeGoals.length})</p>
              <div className="space-y-2">
                {activeGoals.map(goal => (
                  <div key={goal.id} className="bg-white rounded-xl border border-stone-200 p-4 flex items-center gap-3">
                    <button onClick={() => toggleComplete(goal)} className="text-stone-300 hover:text-teal-500"><Icons.Circle /></button>
                    <span className="flex-1 text-stone-800 text-sm">{goal.title}</span>
                    <button onClick={() => handleDelete(goal.id)} className="text-stone-300 hover:text-red-500"><Icons.Trash /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {completedGoals.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Completed ({completedGoals.length})</p>
              <div className="space-y-2">
                {completedGoals.map(goal => (
                  <div key={goal.id} className="bg-stone-50 rounded-xl border border-stone-100 p-4 flex items-center gap-3">
                    <button onClick={() => toggleComplete(goal)} className="text-teal-500"><Icons.CheckCircle /></button>
                    <span className="flex-1 text-stone-500 text-sm line-through">{goal.title}</span>
                    <button onClick={() => handleDelete(goal.id)} className="text-stone-300 hover:text-red-500"><Icons.Trash /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ============================================================================
// AI COACH - Connected to Supabase Edge Function
// ============================================================================

function AICoach({ setCurrentView }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "I'm struggling with a difficult conversation",
    "Help me reflect on my leadership style",
    "I want to build more self-awareness"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: `Hello! I'm glad you're here.\n\nHow are you arriving today—and what would you like to explore in our conversation?` }]);
    }
  }, []);

  const handleSend = async (text) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;
    
    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages.slice(1), userMessage];
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/coach`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({ messages: chatHistory })
        }
      );
      
      const data = await response.json();
      
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Coach error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="animate-fadeIn flex flex-col h-[calc(100vh-160px)]">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setCurrentView('dashboard')} className="p-2 -ml-2 text-stone-500 hover:text-stone-700"><Icons.ChevronLeft /></button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white"><Icons.Brain /></div>
          <div>
            <h2 className="font-semibold text-stone-800">Leadership Coach</h2>
            <p className="text-xs text-stone-500">ICF Certified Approach</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-stone-200 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => (
            <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'bg-stone-900 text-white rounded-2xl rounded-br-md' : 'bg-stone-100 text-stone-800 rounded-2xl rounded-bl-md'}`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-stone-100 text-stone-600 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2 text-sm"><Icons.Loader /> Thinking...</div>
            </div>
          )}
          {messages.length === 1 && !isLoading && (
            <div className="pt-2">
              <p className="text-xs text-stone-500 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, idx) => (
                  <button key={idx} onClick={() => handleSend(prompt)} className="text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-full text-stone-600 hover:bg-stone-100 transition-colors">{prompt}</button>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-stone-200 p-3">
          <div className="flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Share what's on your mind..." disabled={isLoading}
              className="flex-1 px-4 py-2.5 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <button onClick={() => handleSend()} disabled={!input.trim() || isLoading}
              className="p-2.5 bg-amber-600 text-white rounded-full hover:bg-amber-500 disabled:opacity-50 disabled:hover:bg-amber-600 transition-colors">
              <Icons.Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PATHS & PRACTICE
// ============================================================================

function PathsView({ setCurrentView, setSelectedPath }) {
  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-stone-800 mb-1">Learning Paths</h2>
        <p className="text-stone-500 text-sm">Build yourself first, then lead with others</p>
      </div>
      <div className="space-y-4">
        {PATHS.map(path => (
          <button key={path.id} onClick={() => { setSelectedPath(path.id); setCurrentView('path-detail'); }}
            className="w-full text-left rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-lg transition-all group">
            <div className="relative h-32 overflow-hidden">
              <img src={path.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs text-white/80">{path.outcome}</span>
                <h3 className="text-lg font-semibold text-white">{path.name}</h3>
              </div>
            </div>
            <div className="p-4"><p className="text-stone-600 text-sm">{path.description}</p></div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PathDetail({ pathId, setCurrentView, setSelectedActivity }) {
  const path = PATHS.find(p => p.id === pathId);
  const activities = ACTIVITIES[pathId] || [];
  if (!path) return null;

  return (
    <div className="animate-fadeIn pb-8">
      <button onClick={() => setCurrentView('paths')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm"><Icons.ChevronLeft /> Back</button>
      <div className="relative rounded-2xl overflow-hidden mb-6">
        <img src={path.image} alt="" className="w-full h-36 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="text-xs text-white/80">{path.outcome}</span>
          <h2 className="text-xl font-semibold text-white">{path.name}</h2>
        </div>
      </div>
      <h3 className="font-semibold text-stone-800 mb-3">Activities</h3>
      <div className="space-y-3">
        {activities.map(activity => (
          <button key={activity.id} onClick={() => { setSelectedActivity(activity); setCurrentView('practice'); }}
            className="w-full text-left bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-all">
            <div className="flex">
              <img src={activity.image} alt="" className="w-24 h-24 object-cover" />
              <div className="flex-1 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-amber-700">{activity.level}</span>
                  <span className="text-xs text-stone-400 flex items-center gap-1"><Icons.Clock /> {activity.duration}</span>
                </div>
                <h4 className="font-semibold text-stone-800 text-sm">{activity.title}</h4>
                <p className="text-xs text-stone-500 line-clamp-1">{activity.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DailyPractice({ selectedActivity, setCurrentView }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [reflections, setReflections] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const activity = selectedActivity || ACTIVITIES.leader_development[0];
  const steps = [
    { label: 'Set Goal', content: activity.step_set_goal },
    { label: 'Notice', content: activity.step_gather_info },
    { label: 'Apply', content: activity.step_apply },
    { label: 'Reflect', content: activity.step_reflect_prompt, isReflection: true }
  ];

  if (isComplete) {
    return (
      <div className="animate-fadeIn text-center py-12">
        <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6 text-teal-600"><Icons.Award /></div>
        <h2 className="font-serif text-2xl text-stone-800 mb-2">Well done!</h2>
        <p className="text-stone-600 text-sm mb-8">You completed {activity.title}</p>
        <button onClick={() => { setIsComplete(false); setCurrentStep(0); setReflections({}); setCurrentView('dashboard'); }}
          className="px-6 py-3 bg-stone-900 text-white rounded-full font-medium text-sm">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn pb-8">
      <button onClick={() => setCurrentView('paths')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm"><Icons.ChevronLeft /> Back</button>
      <div className="mb-6">
        <span className="text-xs font-medium text-amber-700">{activity.category}</span>
        <h2 className="font-serif text-2xl text-stone-800">{activity.title}</h2>
      </div>
      <div className="flex gap-1.5 mb-6">
        {steps.map((_, idx) => (<div key={idx} className={`flex-1 h-1.5 rounded-full ${idx <= currentStep ? 'bg-amber-500' : 'bg-stone-200'}`} />))}
      </div>
      <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6">
        <p className="text-xs text-stone-500 mb-1">Step {currentStep + 1} of 4</p>
        <h3 className="font-semibold text-stone-800 mb-3">{steps[currentStep].label}</h3>
        <p className="text-stone-700 text-sm leading-relaxed">{steps[currentStep].content}</p>
        {steps[currentStep].isReflection && (
          <textarea value={reflections[currentStep] || ''} onChange={(e) => setReflections({ ...reflections, [currentStep]: e.target.value })}
            placeholder="Write your reflection..." className="w-full mt-4 px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 h-28 text-sm" />
        )}
      </div>
      <div className="flex justify-between">
        <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}
          className="px-4 py-2 text-stone-600 disabled:opacity-30 flex items-center gap-1 text-sm"><Icons.ChevronLeft /> Back</button>
        {currentStep === steps.length - 1 ? (
          <button onClick={() => setIsComplete(true)} className="px-5 py-2 bg-teal-600 text-white rounded-full font-medium flex items-center gap-1 text-sm">Complete <Icons.Check /></button>
        ) : (
          <button onClick={() => setCurrentStep(currentStep + 1)} className="px-5 py-2 bg-stone-900 text-white rounded-full font-medium flex items-center gap-1 text-sm">Next <Icons.ChevronRight /></button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// PROFILE
// ============================================================================

function Profile({ user, onSignOut, setCurrentView }) {
  return (
    <div className="animate-fadeIn pb-8">
      <h2 className="font-serif text-2xl text-stone-800 mb-6">Profile</h2>
      <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400"><Icons.User /></div>
          <div>
            <p className="font-semibold text-stone-800">{user?.user_metadata?.full_name || 'User'}</p>
            <p className="text-sm text-stone-500">{user?.email}</p>
          </div>
        </div>
      </div>
      <button onClick={() => setCurrentView('coach')} className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600"><Icons.MessageCircle /></div>
          <span className="font-medium text-stone-800 text-sm">Talk to Coach</span>
        </div>
        <Icons.ChevronRight />
      </button>
      <button onClick={onSignOut} className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200 hover:border-red-200 text-red-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center"><Icons.LogOut /></div>
          <span className="font-medium text-sm">Sign Out</span>
        </div>
      </button>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================

export default function DayByDayApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [streak, setStreak] = useState(0);
  const [completedActivities, setCompletedActivities] = useState(0);
  const [journalEntries, setJournalEntries] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) loadUserData();
  }, [user]);

  const loadUserData = async () => {
    const { data: journalData } = await supabase.from('reflections').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (journalData) setJournalEntries(journalData);
    const { data: goalsData } = await supabase.from('goals').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (goalsData) setGoals(goalsData);
    const { data: streakData } = await supabase.from('streaks').select('current_streak').eq('user_id', user.id).single();
    if (streakData) setStreak(streakData.current_streak);
    const { count } = await supabase.from('practice_logs').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
    if (count) setCompletedActivities(count);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentView('dashboard');
  };

  if (loading) return <div className="min-h-screen bg-stone-50 flex items-center justify-center"><Icons.Loader /></div>;
  if (!user) return <AuthScreen onAuth={setUser} />;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard setCurrentView={setCurrentView} setSelectedPath={setSelectedPath} setSelectedActivity={setSelectedActivity} streak={streak} user={user} goals={goals} journalEntries={journalEntries} completedActivities={completedActivities} />;
      case 'paths': return <PathsView setCurrentView={setCurrentView} setSelectedPath={setSelectedPath} />;
      case 'path-detail': return <PathDetail pathId={selectedPath} setCurrentView={setCurrentView} setSelectedActivity={setSelectedActivity} />;
      case 'practice': return <DailyPractice selectedActivity={selectedActivity} setCurrentView={setCurrentView} />;
      case 'journal': return <Journal user={user} journalEntries={journalEntries} setJournalEntries={setJournalEntries} />;
      case 'goals': return <Goals user={user} goals={goals} setGoals={setGoals} />;
      case 'coach': return <AICoach setCurrentView={setCurrentView} />;
      case 'profile': return <Profile user={user} onSignOut={handleSignOut} setCurrentView={setCurrentView} />;
      default: return <Dashboard setCurrentView={setCurrentView} setSelectedPath={setSelectedPath} setSelectedActivity={setSelectedActivity} streak={streak} user={user} goals={goals} journalEntries={journalEntries} completedActivities={completedActivities} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
      <Header streak={streak} />
      <main className="px-5 py-6 max-w-lg mx-auto pb-24">{renderView()}</main>
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
