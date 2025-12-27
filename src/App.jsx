import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';

// ============================================================================
// DAY BY DAY - Leader & Leadership Development Application
// Based on David V. Day's "Developing Leaders and Leadership" (2024)
// Featuring: ICF Leadership Coach + Day Mentor Coach
// ============================================================================

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
  ChevronRight: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>),
  ChevronLeft: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>),
  Check: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>),
  Send: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>),
  Loader: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>),
  Home: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>),
  Book: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>),
  Target: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>),
  User: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>),
  Plus: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>),
  Trash: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>),
  Circle: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>),
  CheckCircle: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>),
  Compass: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>),
  Flame: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>),
  Award: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>),
  Brain: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54"/></svg>),
  ArrowRight: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>),
  Calendar: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>),
  Clock: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
  LogOut: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>),
  Mail: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>),
  Lock: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>),
  Shield: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
  Lightbulb: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>),
  Users: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
  GraduationCap: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>),
  MessageCircle: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>),
  BookOpen: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>),
  Star: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  Heart: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>)
};

// ============================================================================
// PHOTOS
// ============================================================================

const PHOTOS = {
  courage: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=80',
  creativity: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80',
  collaboration: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
  resilience: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&q=80',
  entrepreneurial: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&q=80',
  responsible: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=600&q=80',
  innovation: 'https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=600&q=80',
  communication: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
  problemsolving: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=600&q=80',
  empathy: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80',
  sociallearning: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80',
  teamwork: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  chapter1: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
  chapter2: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
};

// ============================================================================
// KLI COMPETENCIES
// ============================================================================

const KLI_COMPETENCIES = [
  {
    id: 'courage',
    name: 'Courage',
    color: 'amber',
    description: 'Leading courageously means having the resilience to bounce back from setbacks, the entrepreneurial mindset to take bold risks, and the integrity to act responsibly.',
    icon: Icons.Shield,
    image: PHOTOS.courage,
    capabilities: [
      { id: 'resilience', name: 'Resilience', description: 'Courage to bounce back and learn from setbacks', image: PHOTOS.resilience, attributes: ['Persistence', 'Adaptability', 'Growth mindset', 'Optimism', 'Emotion management'] },
      { id: 'entrepreneurial', name: 'Entrepreneurial Mindset', description: 'Courage to take risks and act boldly', image: PHOTOS.entrepreneurial, attributes: ['Enterprising', 'Resourceful', 'Initiative', 'Bold', 'Challenge'] },
      { id: 'responsible', name: 'Responsible Action', description: 'Courage to act in accordance with your values', image: PHOTOS.responsible, attributes: ['Insight', 'Modeling', 'Integrity', 'Convictions', 'Advocacy'] }
    ]
  },
  {
    id: 'creativity',
    name: 'Creativity',
    color: 'violet',
    description: 'Leading creatively means innovating with new ideas, communicating effectively to inspire others, and solving problems with analytical thinking.',
    icon: Icons.Lightbulb,
    image: PHOTOS.creativity,
    capabilities: [
      { id: 'innovation', name: 'Innovation', description: 'Generate new ideas and challenge the status quo', image: PHOTOS.innovation, attributes: ['Generating ideas', 'Openness to change', 'Visioning', 'Challenge status quo', 'Flexibility'] },
      { id: 'communication', name: 'Communication', description: 'Express ideas clearly and listen actively', image: PHOTOS.communication, attributes: ['Expressive', 'Listen actively', 'Persuasive', 'Inquiry', 'Dialogue'] },
      { id: 'problemsolving', name: 'Problem Solving', description: 'Analyze situations and make sound decisions', image: PHOTOS.problemsolving, attributes: ['Information seeking', 'Analyzing data', 'Anticipates problems', 'Decision making', 'Solution driven'] }
    ]
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    color: 'teal',
    description: 'Leading collaboratively means showing empathy for others, developing social and emotional intelligence, and working effectively in teams.',
    icon: Icons.Users,
    image: PHOTOS.collaboration,
    capabilities: [
      { id: 'empathy', name: 'Empathy', description: 'Understand and connect with others perspectives', image: PHOTOS.empathy, attributes: ['Perceptive', 'Curious', 'Diversity', 'Inclusive', 'Sensitivity'] },
      { id: 'sociallearning', name: 'Social & Emotional Learning', description: 'Build relationships and navigate social situations', image: PHOTOS.sociallearning, attributes: ['Social awareness', 'Engages others', 'Networking', 'Nurturing relationships', 'Situational learning'] },
      { id: 'teamwork', name: 'Teamwork', description: 'Work effectively with others toward shared goals', image: PHOTOS.teamwork, attributes: ['Participative', 'Accountable', 'Supportive', 'Respectful', 'Conflict management'] }
    ]
  }
];

// ============================================================================
// CHAPTERS
// ============================================================================

const CHAPTERS = [
  { id: 1, title: 'First Principles', subtitle: 'Foundations of Leader Development', description: 'Understand the five foundational principles that guide all leader and leadership development.', duration: '25 min', icon: Icons.BookOpen, image: PHOTOS.chapter1, principles: [{ number: 1, title: 'You Cannot Make Anyone Develop as a Leader', summary: 'Development requires ownership and personal agency.' }, { number: 2, title: 'Development Requires Dedicated Work Over Time', summary: 'There are no quick fixes. Development is a marathon.' }, { number: 3, title: 'Leadership is Learned Through Experience', summary: 'Passive learning is not enough. You need to practice.' }, { number: 4, title: 'Assessment, Challenge, and Support', summary: 'The ACS framework is foundational.' }, { number: 5, title: 'Evidence-Based Practices Matter', summary: 'Use practices supported by research.' }], keyInsight: 'Everyone has leadership potential. Development requires your personal agency.', reflection: 'Which principle resonates most with you?' },
  { id: 2, title: 'Developmental Systems', subtitle: 'Assessment, Challenge, and Support', description: 'Learn why programs alone fail and how developmental systems create lasting change.', duration: '30 min', icon: Icons.Target, image: PHOTOS.chapter2, principles: [{ number: 1, title: 'The Problem with Programs', summary: 'One-off programs rarely produce lasting development.' }, { number: 2, title: 'Assessment', summary: 'Know where you are starting from.' }, { number: 3, title: 'Challenge', summary: 'Growth happens outside your comfort zone.' }, { number: 4, title: 'Support', summary: 'Relationships and resources sustain growth.' }], keyInsight: 'A map is not the territory, but the KLI model provides helpful guidance.', reflection: 'Where do you get assessment, challenge, and support?' },
  { id: 3, title: 'Individual Leader Development', subtitle: 'Building Human Capital', description: 'Focus on developing your individual leadership skills and capabilities.', duration: '35 min', icon: Icons.User, image: PHOTOS.courage, principles: [{ number: 1, title: 'Leadership Training Effectiveness', summary: 'Training can work with proper transfer.' }, { number: 2, title: 'Skill Mapping', summary: 'Break down competencies into micro-skills.' }, { number: 3, title: 'Personal Trajectories', summary: 'Everyone develops differently.' }], keyInsight: 'Focus on micro-actions outside your comfort zone.', reflection: 'What specific skill could you practice this week?' },
  { id: 4, title: 'Self-Views and Leader Development', subtitle: 'Identity, Awareness, and Self-Efficacy', description: 'Explore how your self-concept shapes your development as a leader.', duration: '30 min', icon: Icons.Brain, image: PHOTOS.creativity, principles: [{ number: 1, title: 'Leader Identity', summary: 'Seeing yourself as a leader motivates practice.' }, { number: 2, title: 'Self-Awareness', summary: 'Know your values and tendencies.' }, { number: 3, title: 'Leadership Self-Efficacy', summary: 'Confidence to lead effectively.' }], keyInsight: 'A leader identity motivates sustained development.', reflection: 'To what extent do you see yourself as a leader?' },
  { id: 5, title: 'Adult Development', subtitle: 'Lifelong Learning and Growth', description: 'Understand how adults continue to develop throughout their lives.', duration: '30 min', icon: Icons.Star, image: PHOTOS.innovation, principles: [{ number: 1, title: 'Deliberate Practice', summary: 'Purposeful practice with feedback.' }, { number: 2, title: 'Moral Development', summary: 'Ethical reasoning develops in stages.' }, { number: 3, title: 'Meaning-Making', summary: 'How you make sense of leadership evolves.' }], keyInsight: 'Development has no endpoint—it is lifelong.', reflection: 'What does leadership mean to you now?' },
  { id: 6, title: 'Collective Leadership Capacity', subtitle: 'Building Social Capital', description: 'Learn how teams develop leadership as a collective capability.', duration: '35 min', icon: Icons.Users, image: PHOTOS.collaboration, principles: [{ number: 1, title: 'Psychological Safety', summary: 'Teams need safety to learn together.' }, { number: 2, title: 'Shared Mental Models', summary: 'Aligned understanding helps coordination.' }, { number: 3, title: 'Collective Efficacy', summary: 'The teams belief in success.' }], keyInsight: 'Collective leadership is greater than individual leaders.', reflection: 'How safe do people feel in your team?' },
  { id: 7, title: 'Networks and Development', subtitle: 'Social Network Analysis', description: 'Understand how relationships shape leadership capacity.', duration: '30 min', icon: Icons.Heart, image: PHOTOS.sociallearning, principles: [{ number: 1, title: 'Social Capital', summary: 'Your network enables leadership.' }, { number: 2, title: 'Network Structure', summary: 'Different structures serve different purposes.' }, { number: 3, title: 'Network Change', summary: 'Building relationships is ongoing work.' }], keyInsight: 'Leadership is a process enabled by networks.', reflection: 'Map your leadership network.' },
  { id: 8, title: 'Advancing the Science', subtitle: 'Evidence-Based Leadership Development', description: 'Commit to evidence-based practices for your development.', duration: '25 min', icon: Icons.Award, image: PHOTOS.teamwork, principles: [{ number: 1, title: 'Five Truths', summary: 'Core truths about leader development.' }, { number: 2, title: 'Continuous Learning', summary: 'Stay curious and keep learning.' }, { number: 3, title: 'Your Development Journey', summary: 'Create your personal plan.' }], keyInsight: 'Keep advancing—current practices will seem primitive.', reflection: 'What commitment will you make?' }
];

// ============================================================================
// ACTIVITIES
// ============================================================================

const ACTIVITIES = [
  { id: 'pause_practice', competency: 'courage', capability: 'resilience', title: 'The Pause', description: 'Build emotion management by pausing before responding', duration: '5 min', level: 'Foundation', image: PHOTOS.resilience, step_set_goal: 'Today, pause for 3 seconds before responding to triggers.', step_gather_info: 'Notice: What triggered you? What emotion arose?', step_apply: 'Take a breath. Ask: "Is my first reaction the best reaction?"', step_reflect_prompt: 'What did you notice when you paused?' },
  { id: 'growth_reframe', competency: 'courage', capability: 'resilience', title: 'Growth Mindset Reframe', description: 'Reframe setbacks as learning opportunities', duration: '10 min', level: 'Foundation', image: PHOTOS.resilience, step_set_goal: 'Reframe a setback using "yet" or "opportunity to learn."', step_gather_info: 'What setback did you experience? Initial reaction?', step_apply: 'Reframe: "I havent mastered this YET."', step_reflect_prompt: 'How did reframing change your response?' },
  { id: 'bold_action', competency: 'courage', capability: 'entrepreneurial', title: 'One Bold Action', description: 'Take initiative outside your comfort zone', duration: '15 min', level: 'Growth', image: PHOTOS.entrepreneurial, step_set_goal: 'Identify one bold action youve been avoiding.', step_gather_info: 'What fear is holding you back?', step_apply: 'Take the first step. Focus on progress.', step_reflect_prompt: 'What happened when you took action?' },
  { id: 'values_alignment', competency: 'courage', capability: 'responsible', title: 'Values in Action', description: 'Align behavior with your core values', duration: '10 min', level: 'Foundation', image: PHOTOS.responsible, step_set_goal: 'Identify one core value to honor today.', step_gather_info: 'When did you align with it? When did you drift?', step_apply: 'Choose the action that reflects your value.', step_reflect_prompt: 'How did it feel to act from your value?' },
  { id: 'idea_generation', competency: 'creativity', capability: 'innovation', title: 'Idea Sprint', description: 'Generate multiple solutions without judgment', duration: '15 min', level: 'Foundation', image: PHOTOS.innovation, step_set_goal: 'Generate 10+ solutions to a challenge.', step_gather_info: 'What solutions come to mind?', step_apply: 'Write all ideas. Circle the most interesting.', step_reflect_prompt: 'What surprised you?' },
  { id: 'active_listening', competency: 'creativity', capability: 'communication', title: 'Deep Listening', description: 'Give someone your complete attention', duration: '10 min', level: 'Foundation', image: PHOTOS.communication, step_set_goal: 'Focus entirely on understanding before responding.', step_gather_info: 'Are you truly listening?', step_apply: 'Dont interrupt. Reflect back what you heard.', step_reflect_prompt: 'What did you notice?' },
  { id: 'perspective_taking', competency: 'collaboration', capability: 'empathy', title: 'Walk in Their Shoes', description: 'See a situation from anothers perspective', duration: '10 min', level: 'Foundation', image: PHOTOS.empathy, step_set_goal: 'Choose someone you find challenging.', step_gather_info: 'What might they be feeling?', step_apply: 'Have a conversation focused on understanding.', step_reflect_prompt: 'What did you learn about them?' },
  { id: 'build_safety', competency: 'collaboration', capability: 'teamwork', title: 'Build Psychological Safety', description: 'Create an environment where people speak up', duration: '15 min', level: 'Growth', image: PHOTOS.teamwork, step_set_goal: 'Observe: How safe do people feel?', step_gather_info: 'Who speaks? Who stays quiet?', step_apply: 'Invite a quiet persons view or share a mistake.', step_reflect_prompt: 'What impact did your action have?' }
];

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
        const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
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
          <p className="text-stone-600 text-sm">Leader & Leadership Development</p>
          <p className="text-stone-500 text-xs mt-1">Based on David V. Day's KLI Framework</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-800 mb-6">{isLogin ? 'Welcome back' : 'Create your account'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">Name</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"><Icons.User /></div>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" placeholder="Your name" required={!isLogin} />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"><Icons.Mail /></div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"><Icons.Lock /></div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" placeholder="Min 6 characters" required minLength={6} />
              </div>
            </div>
            {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
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
// SIDEBAR & NAV
// ============================================================================

function Sidebar({ currentView, setCurrentView, user, onSignOut }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Icons.Home },
    { id: 'chapters', label: 'Learn', icon: Icons.BookOpen },
    { id: 'competencies', label: 'Competencies', icon: Icons.Target },
    { id: 'journal', label: 'Journal', icon: Icons.Book },
    { id: 'coaches', label: 'Coaches', icon: Icons.MessageCircle },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-stone-200 min-h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-stone-200">
        <h1 className="font-serif text-xl font-semibold text-stone-800">Day by Day</h1>
        <p className="text-xs text-stone-500 mt-1">KLI Leadership Development</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const isActive = currentView === item.id || currentView.startsWith(item.id.slice(0, -1));
          return (
            <button key={item.id} onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${isActive ? 'bg-amber-50 text-amber-700 font-medium' : 'text-stone-600 hover:bg-stone-50'}`}>
              <item.icon /><span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-stone-200">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400"><Icons.User /></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-stone-800 truncate">{user?.user_metadata?.full_name || 'User'}</p>
            <p className="text-xs text-stone-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={onSignOut} className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm">
          <Icons.LogOut /><span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

function Header({ streak }) {
  return (
    <header className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-30 lg:hidden">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <h1 className="font-serif text-xl font-semibold text-stone-800">Day by Day</h1>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200">
            <Icons.Flame /><span className="font-semibold text-sm">{streak} days</span>
          </div>
        )}
      </div>
    </header>
  );
}

function BottomNav({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Icons.Home },
    { id: 'chapters', label: 'Learn', icon: Icons.BookOpen },
    { id: 'competencies', label: 'Skills', icon: Icons.Target },
    { id: 'coaches', label: 'Coach', icon: Icons.MessageCircle },
    { id: 'profile', label: 'Profile', icon: Icons.User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-30 lg:hidden">
      <div className="max-w-lg mx-auto flex justify-around py-2">
        {navItems.map(item => {
          const isActive = currentView === item.id || currentView.startsWith(item.id.slice(0, -1));
          return (
            <button key={item.id} onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center px-4 py-2 rounded-xl transition-colors ${isActive ? 'text-amber-700' : 'text-stone-400'}`}>
              <item.icon /><span className="text-xs mt-1 font-medium">{item.label}</span>
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

function Dashboard({ setCurrentView, setSelectedChapter, setSelectedActivity, setSelectedCompetency, streak, user, completedActivities, journalEntries }) {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const currentChapter = CHAPTERS[0];
  const todayActivity = ACTIVITIES[0];

  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <p className="text-stone-500 text-sm mb-1">{dateStr}</p>
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800">
          {user?.user_metadata?.full_name ? `Welcome, ${user.user_metadata.full_name.split(' ')[0]}` : 'Welcome back'}
        </h2>
      </div>

      {/* Two Coach Cards */}
      <div className="mb-6 space-y-3">
        {/* ICF Leadership Coach */}
        <button onClick={() => setCurrentView('coach-icf')}
          className="w-full bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-5 text-left hover:from-stone-700 hover:to-stone-800 transition-all group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shrink-0 text-white"><Icons.Heart /></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-white">ICF Leadership Coach</h3>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">ICF</span>
              </div>
              <p className="text-stone-400 text-sm mb-2">Question-based coaching to help you find your own answers and insights.</p>
              <div className="flex items-center gap-2 text-amber-400 font-medium text-sm group-hover:gap-3 transition-all">
                <span>Start session</span><Icons.ArrowRight />
              </div>
            </div>
          </div>
        </button>

        {/* Day Mentor Coach */}
        <button onClick={() => setCurrentView('coach-mentor')}
          className="w-full bg-gradient-to-br from-violet-700 to-violet-900 rounded-2xl p-5 text-left hover:from-violet-600 hover:to-violet-800 transition-all group">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 text-violet-700"><Icons.GraduationCap /></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-white">Day Mentor</h3>
                <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-medium rounded-full">KLI</span>
              </div>
              <p className="text-violet-200 text-sm mb-2">Research-based advice and teaching from David Day's leadership framework.</p>
              <div className="flex items-center gap-2 text-white font-medium text-sm group-hover:gap-3 transition-all">
                <span>Get guidance</span><Icons.ArrowRight />
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
          <p className="text-xs text-stone-500">Practices</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 text-center">
          <div className="flex justify-center mb-1 text-violet-600"><Icons.Book /></div>
          <p className="text-xl font-bold text-stone-800">{journalEntries.length}</p>
          <p className="text-xs text-stone-500">Reflections</p>
        </div>
      </div>

      {/* Current Chapter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-stone-800">Continue Learning</h3>
          <button onClick={() => setCurrentView('chapters')} className="text-amber-700 text-sm font-medium flex items-center gap-1">All <Icons.ChevronRight /></button>
        </div>
        <button onClick={() => { setSelectedChapter(currentChapter); setCurrentView('chapter-detail'); }}
          className="w-full bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all text-left">
          <div className="flex">
            <img src={currentChapter.image} alt="" className="w-28 h-28 object-cover" />
            <div className="flex-1 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-amber-700">Chapter {currentChapter.id}</span>
                <span className="text-xs text-stone-400 flex items-center gap-1"><Icons.Clock /> {currentChapter.duration}</span>
              </div>
              <h4 className="font-semibold text-stone-800 mb-1">{currentChapter.title}</h4>
              <p className="text-sm text-stone-500 line-clamp-2">{currentChapter.subtitle}</p>
            </div>
          </div>
        </button>
      </div>

      {/* KLI Competencies */}
      <div>
        <h3 className="font-semibold text-stone-800 mb-3">KLI Competencies</h3>
        <div className="grid grid-cols-3 gap-3">
          {KLI_COMPETENCIES.map(comp => (
            <button key={comp.id} onClick={() => { setSelectedCompetency(comp); setCurrentView('competency-detail'); }}
              className="bg-white rounded-xl border border-stone-200 p-4 text-center hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center ${comp.color === 'amber' ? 'bg-amber-100 text-amber-600' : comp.color === 'violet' ? 'bg-violet-100 text-violet-600' : 'bg-teal-100 text-teal-600'}`}>
                <comp.icon />
              </div>
              <p className="font-medium text-stone-800 text-sm">{comp.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COACHES SELECTION VIEW
// ============================================================================

function CoachesView({ setCurrentView }) {
  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800 mb-1">Your Coaches</h2>
        <p className="text-stone-500 text-sm">Choose the type of support you need</p>
      </div>

      <div className="space-y-4">
        {/* ICF Leadership Coach */}
        <button onClick={() => setCurrentView('coach-icf')}
          className="w-full bg-white rounded-2xl border border-stone-200 p-6 text-left hover:shadow-lg hover:border-amber-200 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shrink-0 text-white">
              <Icons.Heart />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-stone-800">ICF Leadership Coach</h3>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">ICF Certified</span>
              </div>
              <p className="text-stone-600 text-sm mb-3">Uses powerful questions to help you discover your own insights. Non-directive approach based on ICF 2025 Core Competencies.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full">Deep exploration</span>
                <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full">Self-discovery</span>
                <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full">Powerful questions</span>
              </div>
            </div>
          </div>
        </button>

        {/* Day Mentor Coach */}
        <button onClick={() => setCurrentView('coach-mentor')}
          className="w-full bg-white rounded-2xl border border-stone-200 p-6 text-left hover:shadow-lg hover:border-violet-200 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center shrink-0 text-white">
              <Icons.GraduationCap />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-stone-800">Day Mentor</h3>
                <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-medium rounded-full">KLI Framework</span>
              </div>
              <p className="text-stone-600 text-sm mb-3">Provides research-based advice and teaching from David Day's "Developing Leaders and Leadership." Direct guidance using the KLI competency model.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full">Research-based</span>
                <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full">Direct advice</span>
                <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full">KLI competencies</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Comparison */}
      <div className="mt-6 bg-stone-50 rounded-xl p-4">
        <h4 className="font-medium text-stone-800 mb-3">When to use each:</h4>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
            <div>
              <span className="font-medium text-stone-700">ICF Coach:</span>
              <span className="text-stone-600"> When you want to explore your own thinking, work through emotions, or find clarity through reflection.</span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 shrink-0"></div>
            <div>
              <span className="font-medium text-stone-700">Day Mentor:</span>
              <span className="text-stone-600"> When you want specific advice, to learn concepts, or understand how research applies to your situation.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ICF LEADERSHIP COACH
// ============================================================================

function ICFCoach({ setCurrentView }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "I'm facing a difficult decision at work",
    "Help me reflect on my leadership style",
    "I want to build more self-awareness"
  ];

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: `Hello! I'm glad you're here.\n\nAs your ICF-certified coach, I'm here to support your exploration and help you discover your own insights. I won't give you advice—instead, I'll ask questions that help you think more deeply.\n\nHow are you arriving today, and what would you like to explore?` }]);
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
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/coach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ messages: chatHistory })
      });
      const data = await response.json();
      if (data.content) setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      else throw new Error(data.error);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn flex flex-col h-[calc(100vh-160px)] lg:h-[calc(100vh-100px)]">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setCurrentView('coaches')} className="p-2 -ml-2 text-stone-500 hover:text-stone-700"><Icons.ChevronLeft /></button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white"><Icons.Heart /></div>
          <div>
            <h2 className="font-semibold text-stone-800">ICF Leadership Coach</h2>
            <p className="text-xs text-stone-500">Question-based • Non-directive</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-stone-200 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => (
            <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'bg-stone-900 text-white rounded-2xl rounded-br-md' : 'bg-amber-50 text-stone-800 rounded-2xl rounded-bl-md border border-amber-100'}`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-amber-50 text-stone-600 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2 text-sm border border-amber-100"><Icons.Loader /> Reflecting...</div>
            </div>
          )}
          {messages.length === 1 && !isLoading && (
            <div className="pt-2">
              <p className="text-xs text-stone-500 mb-2">You might explore:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, idx) => (
                  <button key={idx} onClick={() => handleSend(prompt)} className="text-xs px-3 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-700 hover:bg-amber-100">{prompt}</button>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-stone-200 p-3">
          <div className="flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Share what's on your mind..." disabled={isLoading}
              className="flex-1 px-4 py-2.5 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <button onClick={() => handleSend()} disabled={!input.trim() || isLoading}
              className="p-2.5 bg-amber-600 text-white rounded-full hover:bg-amber-500 disabled:opacity-50">
              <Icons.Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// DAY MENTOR COACH
// ============================================================================

function DayMentorCoach({ setCurrentView }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "How do I start developing as a leader?",
    "Explain the five first principles",
    "What is the KLI competency model?"
  ];

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: `Welcome! I'm your Day Mentor, here to share research-based insights from David Day's work on leader and leadership development.\n\nUnlike a traditional coach who asks questions, I'll give you direct advice, explain concepts, and help you apply the KLI framework to your situation.\n\n**Remember the first principle:** You must own your development. No one can make you develop as a leader—it requires your personal agency.\n\nWhat would you like to learn about or work on?` }]);
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
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/day-mentor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ messages: chatHistory })
      });
      const data = await response.json();
      if (data.content) setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      else throw new Error(data.error);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn flex flex-col h-[calc(100vh-160px)] lg:h-[calc(100vh-100px)]">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setCurrentView('coaches')} className="p-2 -ml-2 text-stone-500 hover:text-stone-700"><Icons.ChevronLeft /></button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center text-white"><Icons.GraduationCap /></div>
          <div>
            <h2 className="font-semibold text-stone-800">Day Mentor</h2>
            <p className="text-xs text-stone-500">Research-based • KLI Framework</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-stone-200 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => (
            <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'bg-stone-900 text-white rounded-2xl rounded-br-md' : 'bg-violet-50 text-stone-800 rounded-2xl rounded-bl-md border border-violet-100'}`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-violet-50 text-stone-600 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2 text-sm border border-violet-100"><Icons.Loader /> Preparing guidance...</div>
            </div>
          )}
          {messages.length === 1 && !isLoading && (
            <div className="pt-2">
              <p className="text-xs text-stone-500 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, idx) => (
                  <button key={idx} onClick={() => handleSend(prompt)} className="text-xs px-3 py-2 bg-violet-50 border border-violet-200 rounded-full text-violet-700 hover:bg-violet-100">{prompt}</button>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-stone-200 p-3">
          <div className="flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Ask about leadership development..." disabled={isLoading}
              className="flex-1 px-4 py-2.5 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            <button onClick={() => handleSend()} disabled={!input.trim() || isLoading}
              className="p-2.5 bg-violet-600 text-white rounded-full hover:bg-violet-500 disabled:opacity-50">
              <Icons.Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// OTHER VIEWS (Chapters, Competencies, Journal, Practice, Profile)
// ============================================================================

function ChaptersView({ setCurrentView, setSelectedChapter }) {
  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800 mb-1">Learn</h2>
        <p className="text-stone-500 text-sm">8 chapters from "Developing Leaders and Leadership"</p>
      </div>
      <div className="space-y-3">
        {CHAPTERS.map(chapter => (
          <button key={chapter.id} onClick={() => { setSelectedChapter(chapter); setCurrentView('chapter-detail'); }}
            className="w-full text-left bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 shrink-0 font-bold">{chapter.id}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-stone-800">{chapter.title}</h4>
                <p className="text-sm text-stone-500">{chapter.subtitle}</p>
              </div>
              <Icons.ChevronRight />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChapterDetail({ chapter, setCurrentView }) {
  const [showReflection, setShowReflection] = useState(false);
  if (!chapter) return null;

  return (
    <div className="animate-fadeIn pb-8">
      <button onClick={() => setCurrentView('chapters')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm"><Icons.ChevronLeft /> Back</button>
      <div className="relative rounded-2xl overflow-hidden mb-6">
        <img src={chapter.image} alt="" className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="text-xs text-white/80">Chapter {chapter.id}</span>
          <h2 className="text-xl font-semibold text-white">{chapter.title}</h2>
        </div>
      </div>
      <p className="text-stone-600 mb-6">{chapter.description}</p>
      <h3 className="font-semibold text-stone-800 mb-3">Key Concepts</h3>
      <div className="space-y-3 mb-6">
        {chapter.principles.map((p, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-stone-200 p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0">{p.number}</div>
              <div>
                <h4 className="font-medium text-stone-800 mb-1">{p.title}</h4>
                <p className="text-sm text-stone-600">{p.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">💡 Key Insight</h4>
        <p className="text-amber-900 text-sm">{chapter.keyInsight}</p>
      </div>
      <button onClick={() => setShowReflection(!showReflection)} className="w-full bg-stone-900 text-white py-3 rounded-xl font-medium">
        {showReflection ? 'Hide Reflection' : 'Reflect on This Chapter'}
      </button>
      {showReflection && (
        <div className="mt-4 bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-stone-700 font-medium mb-3">{chapter.reflection}</p>
          <textarea placeholder="Write your reflection..." className="w-full px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 h-32 text-sm" />
          <button className="mt-3 px-5 py-2 bg-amber-600 text-white rounded-full font-medium text-sm">Save Reflection</button>
        </div>
      )}
    </div>
  );
}

function CompetenciesView({ setCurrentView, setSelectedCompetency }) {
  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800 mb-1">KLI Competencies</h2>
        <p className="text-stone-500 text-sm">Courage, Creativity, and Collaboration</p>
      </div>
      {KLI_COMPETENCIES.map(comp => (
        <button key={comp.id} onClick={() => { setSelectedCompetency(comp); setCurrentView('competency-detail'); }}
          className="w-full text-left rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-lg transition-all mb-4">
          <div className="relative h-24 overflow-hidden">
            <img src={comp.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${comp.color === 'amber' ? 'bg-amber-500' : comp.color === 'violet' ? 'bg-violet-500' : 'bg-teal-500'} text-white`}><comp.icon /></div>
              <h3 className="text-lg font-semibold text-white">{comp.name}</h3>
            </div>
          </div>
          <div className="p-4"><p className="text-stone-600 text-sm">{comp.description}</p></div>
        </button>
      ))}
    </div>
  );
}

function CompetencyDetail({ competency, setCurrentView, setSelectedActivity }) {
  if (!competency) return null;
  const activities = ACTIVITIES.filter(a => a.competency === competency.id);

  return (
    <div className="animate-fadeIn pb-8">
      <button onClick={() => setCurrentView('competencies')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm"><Icons.ChevronLeft /> Back</button>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${competency.color === 'amber' ? 'bg-amber-100 text-amber-600' : competency.color === 'violet' ? 'bg-violet-100 text-violet-600' : 'bg-teal-100 text-teal-600'}`}><competency.icon /></div>
        <div>
          <h2 className="font-serif text-2xl text-stone-800">{competency.name}</h2>
          <p className="text-stone-500 text-sm">Leading {competency.name.toLowerCase()}ly</p>
        </div>
      </div>
      <p className="text-stone-600 mb-6">{competency.description}</p>
      <h3 className="font-semibold text-stone-800 mb-3">Capabilities</h3>
      <div className="space-y-3 mb-6">
        {competency.capabilities.map(cap => (
          <div key={cap.id} className="bg-white rounded-xl border border-stone-200 p-4">
            <h4 className="font-semibold text-stone-800 mb-1">{cap.name}</h4>
            <p className="text-sm text-stone-600 mb-2">{cap.description}</p>
            <div className="flex flex-wrap gap-1">
              {cap.attributes.map((attr, idx) => (<span key={idx} className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full">{attr}</span>))}
            </div>
          </div>
        ))}
      </div>
      <h3 className="font-semibold text-stone-800 mb-3">Practice Activities</h3>
      <div className="space-y-3">
        {activities.map(activity => (
          <button key={activity.id} onClick={() => { setSelectedActivity(activity); setCurrentView('practice'); }}
            className="w-full text-left bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-stone-800">{activity.title}</h4>
                <p className="text-sm text-stone-500">{activity.description}</p>
              </div>
              <Icons.ChevronRight />
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
  const activity = selectedActivity || ACTIVITIES[0];
  const steps = [
    { label: 'Set Goal', content: activity.step_set_goal },
    { label: 'Gather Info', content: activity.step_gather_info },
    { label: 'Apply', content: activity.step_apply },
    { label: 'Reflect', content: activity.step_reflect_prompt, isReflection: true }
  ];

  if (isComplete) {
    return (
      <div className="animate-fadeIn text-center py-12">
        <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6 text-teal-600"><Icons.Award /></div>
        <h2 className="font-serif text-2xl text-stone-800 mb-2">Practice Complete!</h2>
        <p className="text-stone-600 text-sm mb-2">You completed {activity.title}</p>
        <p className="text-stone-500 text-xs mb-8">Development requires dedicated work over time.</p>
        <button onClick={() => { setIsComplete(false); setCurrentStep(0); setReflections({}); setCurrentView('dashboard'); }}
          className="px-6 py-3 bg-stone-900 text-white rounded-full font-medium text-sm">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn pb-8">
      <button onClick={() => setCurrentView('competencies')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm"><Icons.ChevronLeft /> Back</button>
      <div className="mb-6">
        <span className={`text-xs font-medium ${activity.competency === 'courage' ? 'text-amber-700' : activity.competency === 'creativity' ? 'text-violet-700' : 'text-teal-700'}`}>
          {activity.competency.charAt(0).toUpperCase() + activity.competency.slice(1)}
        </span>
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

function Journal({ user, journalEntries, setJournalEntries }) {
  const [newEntry, setNewEntry] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const prompts = ["What did I learn about leadership today?", "How did I practice courage, creativity, or collaboration?", "What does 'owning my development' mean this week?"];

  const handleSave = async () => {
    if (!newEntry.trim() || saving) return;
    setSaving(true);
    const { data, error } = await supabase.from('reflections').insert({ user_id: user.id, content: newEntry, reflection_type: 'journal' }).select().single();
    if (!error && data) { setJournalEntries([data, ...journalEntries]); setNewEntry(''); setShowNew(false); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    await supabase.from('reflections').delete().eq('id', id);
    setJournalEntries(journalEntries.filter(e => e.id !== id));
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="animate-fadeIn pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl text-stone-800">Journal</h2>
          <p className="text-sm text-stone-500">Reflect on your development</p>
        </div>
        {!showNew && (<button onClick={() => setShowNew(true)} className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white rounded-full font-medium text-sm"><Icons.Plus /> New</button>)}
      </div>
      {showNew && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {prompts.map((prompt, idx) => (<button key={idx} onClick={() => setNewEntry(prompt + '\n\n')} className="text-xs px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200">{prompt}</button>))}
          </div>
          <textarea value={newEntry} onChange={(e) => setNewEntry(e.target.value)} placeholder="What's on your mind?" autoFocus className="w-full px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-stone-900 h-32 text-sm" />
          <div className="flex justify-end gap-2 mt-3">
            <button onClick={() => { setShowNew(false); setNewEntry(''); }} className="px-4 py-2 text-stone-600 text-sm">Cancel</button>
            <button onClick={handleSave} disabled={!newEntry.trim() || saving} className="px-5 py-2 bg-stone-900 text-white rounded-full font-medium text-sm disabled:opacity-50 flex items-center gap-2">{saving && <Icons.Loader />} Save</button>
          </div>
        </div>
      )}
      {journalEntries.length === 0 && !showNew ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400"><Icons.Book /></div>
          <p className="text-stone-600 font-medium mb-1">No entries yet</p>
          <button onClick={() => setShowNew(true)} className="text-amber-700 font-medium text-sm">Write your first reflection</button>
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
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
        <h4 className="font-medium text-amber-800 mb-1">💡 Remember</h4>
        <p className="text-amber-900 text-sm">Development has no endpoint—it is lifelong growth.</p>
      </div>
      <button onClick={() => setCurrentView('coaches')} className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600"><Icons.MessageCircle /></div>
          <span className="font-medium text-stone-800 text-sm">Talk to a Coach</span>
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
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedCompetency, setSelectedCompetency] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [streak, setStreak] = useState(0);
  const [completedActivities, setCompletedActivities] = useState(0);
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setUser(session?.user ?? null); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setUser(session?.user ?? null); });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => { if (user) loadUserData(); }, [user]);

  const loadUserData = async () => {
    const { data: journalData } = await supabase.from('reflections').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (journalData) setJournalEntries(journalData);
    const { data: streakData } = await supabase.from('streaks').select('current_streak').eq('user_id', user.id).single();
    if (streakData) setStreak(streakData.current_streak);
    const { count } = await supabase.from('practice_logs').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
    if (count) setCompletedActivities(count);
  };

  const handleSignOut = async () => { await supabase.auth.signOut(); setUser(null); setCurrentView('dashboard'); };

  if (loading) return <div className="min-h-screen bg-stone-50 flex items-center justify-center"><Icons.Loader /></div>;
  if (!user) return <AuthScreen onAuth={setUser} />;

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard setCurrentView={setCurrentView} setSelectedChapter={setSelectedChapter} setSelectedActivity={setSelectedActivity} setSelectedCompetency={setSelectedCompetency} streak={streak} user={user} completedActivities={completedActivities} journalEntries={journalEntries} />;
      case 'chapters': return <ChaptersView setCurrentView={setCurrentView} setSelectedChapter={setSelectedChapter} />;
      case 'chapter-detail': return <ChapterDetail chapter={selectedChapter} setCurrentView={setCurrentView} />;
      case 'competencies': return <CompetenciesView setCurrentView={setCurrentView} setSelectedCompetency={setSelectedCompetency} />;
      case 'competency-detail': return <CompetencyDetail competency={selectedCompetency} setCurrentView={setCurrentView} setSelectedActivity={setSelectedActivity} />;
      case 'practice': return <DailyPractice selectedActivity={selectedActivity} setCurrentView={setCurrentView} />;
      case 'journal': return <Journal user={user} journalEntries={journalEntries} setJournalEntries={setJournalEntries} />;
      case 'coaches': return <CoachesView setCurrentView={setCurrentView} />;
      case 'coach-icf': return <ICFCoach setCurrentView={setCurrentView} />;
      case 'coach-mentor': return <DayMentorCoach setCurrentView={setCurrentView} />;
      case 'profile': return <Profile user={user} onSignOut={handleSignOut} setCurrentView={setCurrentView} />;
      default: return <Dashboard setCurrentView={setCurrentView} setSelectedChapter={setSelectedChapter} setSelectedActivity={setSelectedActivity} setSelectedCompetency={setSelectedCompetency} streak={streak} user={user} completedActivities={completedActivities} journalEntries={journalEntries} />;
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
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} user={user} onSignOut={handleSignOut} />
      <Header streak={streak} />
      <main className="px-5 py-6 max-w-lg mx-auto pb-24 lg:ml-64 lg:max-w-4xl lg:pb-8">{renderView()}</main>
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}

        description: 'Work effectively with others toward shared goals',
        image: PHOTOS.teamwork,
        attributes: ['Participative', 'Accountable', 'Supportive', 'Respectful', 'Conflict management']
      }
    ]
  }
];

// ============================================================================
// BOOK CHAPTERS (Day, 2024)
// ============================================================================

const CHAPTERS = [
  {
    id: 1,
    title: 'First Principles',
    subtitle: 'Foundations of Leader Development',
    description: 'Understand the five foundational principles that guide all leader and leadership development.',
    duration: '25 min',
    icon: Icons.BookOpen,
    image: PHOTOS.chapter1,
    principles: [
      { number: 1, title: 'You Cannot Make Anyone Develop as a Leader', summary: 'Development requires ownership and personal agency. You must own your development.' },
      { number: 2, title: 'Development Requires Dedicated Work Over Time', summary: 'There are no quick fixes. Development is a marathon, not a sprint.' },
      { number: 3, title: 'Leadership is Learned Through Experience', summary: 'Passive learning is not enough. You need to practice and act.' },
      { number: 4, title: 'Assessment, Challenge, and Support', summary: 'The ACS framework is foundational to any meaningful developmental experience.' },
      { number: 5, title: 'Evidence-Based Practices Matter', summary: 'Use practices supported by research, not just popular opinion.' }
    ],
    keyInsight: 'Everyone has leadership potential. Development in the adult years is not a given, but it can occur with dedicated effort.',
    reflection: 'Which principle resonates most with you? What does "owning your development" mean in your life?'
  },
  {
    id: 2,
    title: 'Developmental Systems',
    subtitle: 'Assessment, Challenge, and Support',
    description: 'Learn why programs alone fail and how developmental systems create lasting change.',
    duration: '30 min',
    icon: Icons.BarChart,
    image: PHOTOS.chapter2,
    principles: [
      { number: 1, title: 'The Problem with Programs', summary: 'One-off programs rarely produce lasting development. Systems thinking is required.' },
      { number: 2, title: 'Assessment', summary: 'Know where you are starting from. Self-awareness is the foundation of development.' },
      { number: 3, title: 'Challenge', summary: 'Growth happens outside your comfort zone. Seek the "Goldilocks Zone" of optimal challenge.' },
      { number: 4, title: 'Support', summary: 'Development requires relationships, feedback, and resources to sustain growth.' }
    ],
    keyInsight: 'A map is not the territory, but sometimes a map can be helpful. The KLI competency model provides that map.',
    reflection: 'Where do you currently get assessment, challenge, and support in your leadership journey?'
  },
  {
    id: 3,
    title: 'Individual Leader Development',
    subtitle: 'Building Human Capital',
    description: 'Focus on developing your individual leadership skills, competencies, and capabilities.',
    duration: '35 min',
    icon: Icons.User,
    image: PHOTOS.courage,
    principles: [
      { number: 1, title: 'Leadership Training Effectiveness', summary: 'Training can work, but transfer to real situations is the challenge.' },
      { number: 2, title: 'Skill Mapping', summary: 'Break down competencies into specific, practicable micro-skills.' },
      { number: 3, title: 'Personal Trajectories', summary: 'Everyone develops differently. Understand your unique growth pattern.' }
    ],
    keyInsight: 'Rather than trying to address a macro competency directly, focus on micro-actions outside your comfort zone.',
    reflection: 'What specific leadership skill could you practice this week? How will you know if you improved?'
  },
  {
    id: 4,
    title: 'Self-Views and Leader Development',
    subtitle: 'Identity, Awareness, and Self-Efficacy',
    description: 'Explore how your self-concept shapes your development as a leader.',
    duration: '30 min',
    icon: Icons.Brain,
    image: PHOTOS.creativity,
    principles: [
      { number: 1, title: 'Leader Identity', summary: 'Coming to see yourself as a leader motivates learning and practice.' },
      { number: 2, title: 'Self-Awareness', summary: 'Know your values, behavioral tendencies, strengths, and weaknesses.' },
      { number: 3, title: 'Leadership Self-Efficacy', summary: 'Confidence in your ability to lead effectively in various situations.' }
    ],
    keyInsight: 'Thinking is for doing. A leader identity motivates the kind of learning and practice that sustains development.',
    reflection: 'To what extent do you see yourself as a leader? How might this self-view change your behavior?'
  },
  {
    id: 5,
    title: 'Adult Development',
    subtitle: 'Lifelong Learning and Growth',
    description: 'Understand how adults continue to develop throughout their lives.',
    duration: '30 min',
    icon: Icons.Target,
    image: PHOTOS.innovation,
    principles: [
      { number: 1, title: 'Deliberate Practice', summary: 'Purposeful practice with feedback is key to expert performance.' },
      { number: 2, title: 'Moral Development', summary: 'Ethical reasoning develops in stages over the lifespan.' },
      { number: 3, title: 'Meaning-Making', summary: 'How you make sense of leadership evolves as you develop.' }
    ],
    keyInsight: 'Development has no endpoint. It is about ongoing, lifelong growth and learning.',
    reflection: 'What does leadership mean to you now? How has that meaning changed over time?'
  },
  {
    id: 6,
    title: 'Collective Leadership Capacity',
    subtitle: 'Building Social Capital',
    description: 'Learn how teams and organizations develop leadership as a collective capability.',
    duration: '35 min',
    icon: Icons.Users,
    image: PHOTOS.collaboration,
    principles: [
      { number: 1, title: 'Psychological Safety', summary: 'Teams need safety to take risks, speak up, and learn together.' },
      { number: 2, title: 'Shared Mental Models', summary: 'Aligned understanding helps teams coordinate effectively.' },
      { number: 3, title: 'Collective Efficacy', summary: 'The teams belief in its ability to succeed together.' }
    ],
    keyInsight: 'Leadership development at the collective level is greater than the sum of its individual leaders.',
    reflection: 'How psychologically safe do people feel to speak up in your team? What could increase safety?'
  },
  {
    id: 7,
    title: 'Networks and Development',
    subtitle: 'Social Network Analysis',
    description: 'Understand how your relationships and networks shape leadership capacity.',
    duration: '30 min',
    icon: Icons.Network,
    image: PHOTOS.sociallearning,
    principles: [
      { number: 1, title: 'Social Capital', summary: 'Your network relationships are a form of capital that enables leadership.' },
      { number: 2, title: 'Network Structure', summary: 'Dense, sparse, and core-periphery networks serve different purposes.' },
      { number: 3, title: 'Network Change', summary: 'Networks are dynamic. Building and maintaining relationships is ongoing work.' }
    ],
    keyInsight: 'Leadership is a process, not a position. Networks enable that process to unfold.',
    reflection: 'Map your leadership network. Who provides support? Challenge? Information?'
  },
  {
    id: 8,
    title: 'Advancing the Science',
    subtitle: 'Evidence-Based Leadership Development',
    description: 'Integrate everything learned and commit to evidence-based practices.',
    duration: '25 min',
    icon: Icons.Star,
    image: PHOTOS.teamwork,
    principles: [
      { number: 1, title: 'Five Truths', summary: 'Core truths about what we know works in leader development.' },
      { number: 2, title: 'Continuous Learning', summary: 'The science is evolving. Stay curious and keep learning.' },
      { number: 3, title: 'Your Development Journey', summary: 'Create your personal development plan based on principles, not fads.' }
    ],
    keyInsight: 'In the mid-twenty-first century, people will look back on our present practices as primitive. Keep advancing.',
    reflection: 'What is one commitment you will make to your ongoing development as a leader?'
  }
];

// ============================================================================
// PRACTICE ACTIVITIES (Based on KLI Competencies)
// ============================================================================

const ACTIVITIES = [
  // COURAGE Activities
  {
    id: 'pause_practice',
    competency: 'courage',
    capability: 'resilience',
    title: 'The Pause',
    description: 'Build emotion management by pausing before responding to triggers',
    duration: '5 min',
    level: 'Foundation',
    image: PHOTOS.resilience,
    step_set_goal: 'Today, pause for 3 seconds before responding in any situation that triggers a strong reaction.',
    step_gather_info: 'Notice: What triggered you? What emotion arose? What was your first impulse?',
    step_apply: 'Take a breath. Ask yourself: "Is my first reaction the best reaction?" Then choose consciously.',
    step_reflect_prompt: 'What did you notice when you paused? How did it change your response?'
  },
  {
    id: 'growth_reframe',
    competency: 'courage',
    capability: 'resilience',
    title: 'Growth Mindset Reframe',
    description: 'Practice reframing setbacks as opportunities for learning',
    duration: '10 min',
    level: 'Foundation',
    image: PHOTOS.resilience,
    step_set_goal: 'When you encounter a setback today, consciously reframe it using "yet" or "opportunity to learn."',
    step_gather_info: 'What setback or failure did you experience? What was your initial reaction?',
    step_apply: 'Reframe: "I havent mastered this YET" or "This is an opportunity to learn about..."',
    step_reflect_prompt: 'How did reframing change your emotional response and next actions?'
  },
  {
    id: 'bold_action',
    competency: 'courage',
    capability: 'entrepreneurial',
    title: 'One Bold Action',
    description: 'Take initiative on something outside your comfort zone',
    duration: '15 min',
    level: 'Growth',
    image: PHOTOS.entrepreneurial,
    step_set_goal: 'Identify one bold action you have been avoiding. Commit to taking the first step today.',
    step_gather_info: 'What is the action? What fear is holding you back? What is the worst that could happen?',
    step_apply: 'Take the first step. Focus on progress, not perfection.',
    step_reflect_prompt: 'What happened when you took action? What did you learn about yourself?'
  },
  {
    id: 'values_alignment',
    competency: 'courage',
    capability: 'responsible',
    title: 'Values in Action',
    description: 'Act with integrity by aligning behavior with your core values',
    duration: '10 min',
    level: 'Foundation',
    image: PHOTOS.responsible,
    step_set_goal: 'Identify one core value. Watch for moments today when your actions align—or dont—with that value.',
    step_gather_info: 'What value did you choose? When did you see it guiding you? When did you drift from it?',
    step_apply: 'In one situation, consciously choose the action that reflects your value, even if harder.',
    step_reflect_prompt: 'How did it feel to act from your value? What made it easy or hard?'
  },
  // CREATIVITY Activities
  {
    id: 'idea_generation',
    competency: 'creativity',
    capability: 'innovation',
    title: 'Idea Sprint',
    description: 'Generate multiple solutions to a challenge without judgment',
    duration: '15 min',
    level: 'Foundation',
    image: PHOTOS.innovation,
    step_set_goal: 'Choose a challenge you face. Generate at least 10 possible solutions without judging any of them.',
    step_gather_info: 'What is the challenge? What solutions come to mind? Push beyond the obvious.',
    step_apply: 'Write down all 10+ ideas. Circle the 2-3 most interesting. Take action on one.',
    step_reflect_prompt: 'What surprised you about this exercise? Which idea will you pursue?'
  },
  {
    id: 'active_listening',
    competency: 'creativity',
    capability: 'communication',
    title: 'Deep Listening',
    description: 'Give someone your complete, undivided attention',
    duration: '10 min',
    level: 'Foundation',
    image: PHOTOS.communication,
    step_set_goal: 'In your next conversation, focus entirely on understanding before responding.',
    step_gather_info: 'Are you truly listening or preparing your reply? What is the person really saying?',
    step_apply: 'Put away distractions. Dont interrupt. Reflect back what you heard.',
    step_reflect_prompt: 'What did you notice when you listened fully? What did you learn?'
  },
  {
    id: 'decision_framework',
    competency: 'creativity',
    capability: 'problemsolving',
    title: 'Structured Decision',
    description: 'Use a framework to make a complex decision',
    duration: '20 min',
    level: 'Growth',
    image: PHOTOS.problemsolving,
    step_set_goal: 'Apply a decision framework (pros/cons, criteria matrix) to a decision you are facing.',
    step_gather_info: 'What is the decision? What are your options? What criteria matter most?',
    step_apply: 'Score each option against your criteria. What does the analysis reveal?',
    step_reflect_prompt: 'Did the framework clarify your thinking? What will you decide?'
  },
  // COLLABORATION Activities
  {
    id: 'perspective_taking',
    competency: 'collaboration',
    capability: 'empathy',
    title: 'Walk in Their Shoes',
    description: 'Practice seeing a situation from anothers perspective',
    duration: '10 min',
    level: 'Foundation',
    image: PHOTOS.empathy,
    step_set_goal: 'Choose someone you disagree with or find challenging. Try to understand their perspective.',
    step_gather_info: 'What might they be feeling? What needs or fears might drive their behavior?',
    step_apply: 'Have a conversation where you focus on understanding, not convincing.',
    step_reflect_prompt: 'What did you learn about them? About yourself?'
  },
  {
    id: 'build_safety',
    competency: 'collaboration',
    capability: 'teamwork',
    title: 'Build Psychological Safety',
    description: 'Create an environment where people can speak up',
    duration: '15 min',
    level: 'Growth',
    image: PHOTOS.teamwork,
    step_set_goal: 'Observe: How safe do people feel to speak up, take risks, and admit mistakes in your team?',
    step_gather_info: 'Who speaks? Who stays quiet? How are mistakes discussed?',
    step_apply: 'Do one thing to increase safety: invite a quiet persons view or share a mistake you made.',
    step_reflect_prompt: 'What did you observe about safety? What impact did your action have?'
  },
  {
    id: 'network_map',
    competency: 'collaboration',
    capability: 'sociallearning',
    title: 'Map Your Network',
    description: 'Visualize and strengthen your leadership network',
    duration: '20 min',
    level: 'Growth',
    image: PHOTOS.sociallearning,
    step_set_goal: 'Create a simple map of your leadership network. Identify gaps and opportunities.',
    step_gather_info: 'Who provides: Support? Challenge? Information? Connections to others?',
    step_apply: 'Identify one relationship to strengthen. Reach out to that person this week.',
    step_reflect_prompt: 'What patterns did you notice? What relationship will you invest in?'
  }
];

// ============================================================================
// SELF-ASSESSMENTS (Based on Day, 2024)
// ============================================================================

const ASSESSMENTS = {
  leaderIdentity: {
    title: 'Leader Identity',
    description: 'To what extent do you see yourself as a leader?',
    items: [
      'I am a leader',
      'I see myself as a leader',
      'I describe myself to others as a "leader"',
      'I prefer to be seen by others as a leader'
    ]
  },
  selfEfficacy: {
    title: 'Leadership Self-Efficacy',
    description: 'How confident are you in your ability to lead effectively?',
    items: [
      'I can solve most leadership challenges if I invest the necessary effort',
      'I can find the means and ways to influence others when faced with opposition',
      'It is easy for me to stick to my leadership aims and accomplish my goals',
      'I am confident that I can deal efficiently with unexpected leadership situations',
      'I can remain calm when facing leadership difficulties because I can rely on my abilities',
      'When I am confronted with a leadership challenge, I can usually find several solutions'
    ]
  }
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
          email, password,
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
          <p className="text-stone-600 text-sm">Leader & Leadership Development</p>
          <p className="text-stone-500 text-xs mt-1">Based on David V. Day's KLI Framework</p>
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
// SIDEBAR (Desktop)
// ============================================================================

function Sidebar({ currentView, setCurrentView, user, onSignOut }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Icons.Home },
    { id: 'chapters', label: 'Learn', icon: Icons.BookOpen },
    { id: 'competencies', label: 'Competencies', icon: Icons.Target },
    { id: 'journal', label: 'Journal', icon: Icons.Book },
    { id: 'coach', label: 'Coach', icon: Icons.Brain },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-stone-200 min-h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-stone-200">
        <h1 className="font-serif text-xl font-semibold text-stone-800">Day by Day</h1>
        <p className="text-xs text-stone-500 mt-1">KLI Leadership Development</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const isActive = currentView === item.id || 
            (item.id === 'chapters' && currentView.startsWith('chapter')) ||
            (item.id === 'competencies' && (currentView === 'competency-detail' || currentView === 'practice'));
          return (
            <button key={item.id} onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left
                ${isActive ? 'bg-amber-50 text-amber-700 font-medium' : 'text-stone-600 hover:bg-stone-50'}`}>
              <item.icon />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-stone-200">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400"><Icons.User /></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-stone-800 truncate">{user?.user_metadata?.full_name || 'User'}</p>
            <p className="text-xs text-stone-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={onSignOut} className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm">
          <Icons.LogOut /><span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

// ============================================================================
// HEADER & BOTTOM NAV (Mobile)
// ============================================================================

function Header({ streak }) {
  return (
    <header className="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-30 lg:hidden">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <h1 className="font-serif text-xl font-semibold text-stone-800">Day by Day</h1>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200">
            <Icons.Flame /><span className="font-semibold text-sm">{streak} days</span>
          </div>
        )}
      </div>
    </header>
  );
}

function BottomNav({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Icons.Home },
    { id: 'chapters', label: 'Learn', icon: Icons.BookOpen },
    { id: 'competencies', label: 'Skills', icon: Icons.Target },
    { id: 'journal', label: 'Journal', icon: Icons.Book },
    { id: 'profile', label: 'Profile', icon: Icons.User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-30 lg:hidden">
      <div className="max-w-lg mx-auto flex justify-around py-2">
        {navItems.map(item => {
          const isActive = currentView === item.id || 
            (item.id === 'chapters' && currentView.startsWith('chapter')) ||
            (item.id === 'competencies' && (currentView === 'competency-detail' || currentView === 'practice'));
          return (
            <button key={item.id} onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center px-4 py-2 rounded-xl transition-colors
                ${isActive ? 'text-amber-700' : 'text-stone-400'}`}>
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

function Dashboard({ setCurrentView, setSelectedChapter, setSelectedActivity, setSelectedCompetency, streak, user, completedActivities, journalEntries }) {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const currentChapter = CHAPTERS[0];
  const todayActivity = ACTIVITIES[0];

  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <p className="text-stone-500 text-sm mb-1">{dateStr}</p>
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800">
          {user?.user_metadata?.full_name ? `Welcome, ${user.user_metadata.full_name.split(' ')[0]}` : 'Welcome back'}
        </h2>
      </div>

      {/* AI Coach Card */}
      <div className="mb-6">
        <button onClick={() => setCurrentView('coach')}
          className="w-full bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-6 text-left hover:from-stone-700 hover:to-stone-800 transition-all group">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0 text-white"><Icons.Brain /></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-white">Your Leadership Coach</h3>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">ICF</span>
              </div>
              <p className="text-stone-300 text-sm mb-3">Get personalized guidance based on David Day's research and the KLI framework.</p>
              <div className="flex items-center gap-2 text-amber-400 font-medium text-sm group-hover:gap-3 transition-all">
                <span>Start a conversation</span><Icons.ArrowRight />
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
          <p className="text-xs text-stone-500">Practices</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 text-center">
          <div className="flex justify-center mb-1 text-violet-600"><Icons.Book /></div>
          <p className="text-xl font-bold text-stone-800">{journalEntries.length}</p>
          <p className="text-xs text-stone-500">Reflections</p>
        </div>
      </div>

      {/* Current Chapter */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-stone-800">Continue Learning</h3>
          <button onClick={() => setCurrentView('chapters')} className="text-amber-700 text-sm font-medium flex items-center gap-1">
            All Chapters <Icons.ChevronRight />
          </button>
        </div>
        <button onClick={() => { setSelectedChapter(currentChapter); setCurrentView('chapter-detail'); }}
          className="w-full bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all text-left">
          <div className="flex">
            <img src={currentChapter.image} alt="" className="w-28 lg:w-40 h-28 object-cover" />
            <div className="flex-1 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-amber-700">Chapter {currentChapter.id}</span>
                <span className="text-xs text-stone-400 flex items-center gap-1"><Icons.Clock /> {currentChapter.duration}</span>
              </div>
              <h4 className="font-semibold text-stone-800 mb-1">{currentChapter.title}</h4>
              <p className="text-sm text-stone-500 line-clamp-2">{currentChapter.subtitle}</p>
            </div>
          </div>
        </button>
      </div>

      {/* Today's Practice */}
      <div className="mb-6">
        <h3 className="font-semibold text-stone-800 mb-3">Today's Practice</h3>
        <button onClick={() => { setSelectedActivity(todayActivity); setCurrentView('practice'); }}
          className="w-full bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all text-left">
          <div className="flex">
            <img src={todayActivity.image} alt="" className="w-28 h-28 object-cover" />
            <div className="flex-1 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium ${todayActivity.competency === 'courage' ? 'text-amber-700' : todayActivity.competency === 'creativity' ? 'text-violet-700' : 'text-teal-700'}`}>
                  {todayActivity.competency.charAt(0).toUpperCase() + todayActivity.competency.slice(1)}
                </span>
                <span className="text-xs text-stone-400 flex items-center gap-1"><Icons.Clock /> {todayActivity.duration}</span>
              </div>
              <h4 className="font-semibold text-stone-800 mb-1">{todayActivity.title}</h4>
              <p className="text-sm text-stone-500 line-clamp-2">{todayActivity.description}</p>
            </div>
          </div>
        </button>
      </div>

      {/* KLI Competencies */}
      <div>
        <h3 className="font-semibold text-stone-800 mb-3">KLI Competencies</h3>
        <div className="grid grid-cols-3 gap-3">
          {KLI_COMPETENCIES.map(comp => (
            <button key={comp.id} onClick={() => { setSelectedCompetency(comp); setCurrentView('competency-detail'); }}
              className="bg-white rounded-xl border border-stone-200 p-4 text-center hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center ${comp.color === 'amber' ? 'bg-amber-100 text-amber-600' : comp.color === 'violet' ? 'bg-violet-100 text-violet-600' : 'bg-teal-100 text-teal-600'}`}>
                <comp.icon />
              </div>
              <p className="font-medium text-stone-800 text-sm">{comp.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CHAPTERS VIEW
// ============================================================================

function ChaptersView({ setCurrentView, setSelectedChapter }) {
  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800 mb-1">Learn</h2>
        <p className="text-stone-500 text-sm">8 chapters based on "Developing Leaders and Leadership" by David V. Day</p>
      </div>
      <div className="space-y-3">
        {CHAPTERS.map(chapter => (
          <button key={chapter.id} onClick={() => { setSelectedChapter(chapter); setCurrentView('chapter-detail'); }}
            className="w-full text-left bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                <span className="font-bold">{chapter.id}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-stone-800">{chapter.title}</h4>
                <p className="text-sm text-stone-500">{chapter.subtitle}</p>
              </div>
              <div className="text-stone-400"><Icons.ChevronRight /></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// CHAPTER DETAIL
// ============================================================================

function ChapterDetail({ chapter, setCurrentView }) {
  const [showReflection, setShowReflection] = useState(false);

  if (!chapter) return null;

  return (
    <div className="animate-fadeIn pb-8">
      <button onClick={() => setCurrentView('chapters')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
        <Icons.ChevronLeft /> Back to Chapters
      </button>
      
      <div className="relative rounded-2xl overflow-hidden mb-6">
        <img src={chapter.image} alt="" className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="text-xs text-white/80">Chapter {chapter.id}</span>
          <h2 className="text-xl font-semibold text-white">{chapter.title}</h2>
        </div>
      </div>

      <p className="text-stone-600 mb-6">{chapter.description}</p>

      <h3 className="font-semibold text-stone-800 mb-3">Key Concepts</h3>
      <div className="space-y-3 mb-6">
        {chapter.principles.map((principle, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-stone-200 p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm shrink-0">
                {principle.number}
              </div>
              <div>
                <h4 className="font-medium text-stone-800 mb-1">{principle.title}</h4>
                <p className="text-sm text-stone-600">{principle.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">💡 Key Insight</h4>
        <p className="text-amber-900 text-sm">{chapter.keyInsight}</p>
      </div>

      <button onClick={() => setShowReflection(!showReflection)}
        className="w-full bg-stone-900 text-white py-3 rounded-xl font-medium hover:bg-stone-800 transition-colors">
        {showReflection ? 'Hide Reflection' : 'Reflect on This Chapter'}
      </button>

      {showReflection && (
        <div className="mt-4 bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-stone-700 font-medium mb-3">{chapter.reflection}</p>
          <textarea placeholder="Write your reflection..."
            className="w-full px-4 py-3 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 h-32 text-sm" />
          <button className="mt-3 px-5 py-2 bg-amber-600 text-white rounded-full font-medium text-sm hover:bg-amber-500">
            Save Reflection
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// COMPETENCIES VIEW
// ============================================================================

function CompetenciesView({ setCurrentView, setSelectedCompetency, setSelectedActivity }) {
  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800 mb-1">KLI Competencies</h2>
        <p className="text-stone-500 text-sm">Courage, Creativity, and Collaboration for Responsible Leadership</p>
      </div>
      
      {KLI_COMPETENCIES.map(comp => (
        <div key={comp.id} className="mb-6">
          <button onClick={() => { setSelectedCompetency(comp); setCurrentView('competency-detail'); }}
            className="w-full text-left rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-lg transition-all mb-3">
            <div className="relative h-24 overflow-hidden">
              <img src={comp.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${comp.color === 'amber' ? 'bg-amber-500' : comp.color === 'violet' ? 'bg-violet-500' : 'bg-teal-500'} text-white`}>
                  <comp.icon />
                </div>
                <h3 className="text-lg font-semibold text-white">{comp.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-stone-600 text-sm">{comp.description}</p>
            </div>
          </button>
          
          <div className="grid grid-cols-3 gap-2">
            {comp.capabilities.map(cap => (
              <div key={cap.id} className="bg-stone-50 rounded-lg p-2 text-center">
                <p className="text-xs font-medium text-stone-700">{cap.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// COMPETENCY DETAIL
// ============================================================================

function CompetencyDetail({ competency, setCurrentView, setSelectedActivity }) {
  if (!competency) return null;

  const activities = ACTIVITIES.filter(a => a.competency === competency.id);

  return (
    <div className="animate-fadeIn pb-8">
      <button onClick={() => setCurrentView('competencies')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
        <Icons.ChevronLeft /> Back
      </button>
      
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${competency.color === 'amber' ? 'bg-amber-100 text-amber-600' : competency.color === 'violet' ? 'bg-violet-100 text-violet-600' : 'bg-teal-100 text-teal-600'}`}>
          <competency.icon />
        </div>
        <div>
          <h2 className="font-serif text-2xl text-stone-800">{competency.name}</h2>
          <p className="text-stone-500 text-sm">Leading {competency.name.toLowerCase()}ly</p>
        </div>
      </div>

      <p className="text-stone-600 mb-6">{competency.description}</p>

      <h3 className="font-semibold text-stone-800 mb-3">Capabilities</h3>
      <div className="space-y-3 mb-6">
        {competency.capabilities.map(cap => (
          <div key={cap.id} className="bg-white rounded-xl border border-stone-200 p-4">
            <h4 className="font-semibold text-stone-800 mb-1">{cap.name}</h4>
            <p className="text-sm text-stone-600 mb-2">{cap.description}</p>
            <div className="flex flex-wrap gap-1">
              {cap.attributes.map((attr, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full">{attr}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 className="font-semibold text-stone-800 mb-3">Practice Activities</h3>
      <div className="space-y-3">
        {activities.map(activity => (
          <button key={activity.id} onClick={() => { setSelectedActivity(activity); setCurrentView('practice'); }}
            className="w-full text-left bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-stone-800">{activity.title}</h4>
                <p className="text-sm text-stone-500">{activity.description}</p>
              </div>
              <Icons.ChevronRight />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// DAILY PRACTICE (VCoL)
// ============================================================================

function DailyPractice({ selectedActivity, setCurrentView }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [reflections, setReflections] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const activity = selectedActivity || ACTIVITIES[0];
  
  const steps = [
    { label: 'Set Goal', content: activity.step_set_goal },
    { label: 'Gather Info', content: activity.step_gather_info },
    { label: 'Apply', content: activity.step_apply },
    { label: 'Reflect', content: activity.step_reflect_prompt, isReflection: true }
  ];

  if (isComplete) {
    return (
      <div className="animate-fadeIn text-center py-12">
        <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6 text-teal-600"><Icons.Award /></div>
        <h2 className="font-serif text-2xl text-stone-800 mb-2">Practice Complete!</h2>
        <p className="text-stone-600 text-sm mb-2">You completed {activity.title}</p>
        <p className="text-stone-500 text-xs mb-8">Remember: Development requires dedicated work over time.</p>
        <button onClick={() => { setIsComplete(false); setCurrentStep(0); setReflections({}); setCurrentView('dashboard'); }}
          className="px-6 py-3 bg-stone-900 text-white rounded-full font-medium text-sm">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn pb-8">
      <button onClick={() => setCurrentView('competencies')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
        <Icons.ChevronLeft /> Back
      </button>
      
      <div className="mb-6">
        <span className={`text-xs font-medium ${activity.competency === 'courage' ? 'text-amber-700' : activity.competency === 'creativity' ? 'text-violet-700' : 'text-teal-700'}`}>
          {activity.competency.charAt(0).toUpperCase() + activity.competency.slice(1)} • {activity.capability}
        </span>
        <h2 className="font-serif text-2xl text-stone-800">{activity.title}</h2>
      </div>

      <div className="flex gap-1.5 mb-6">
        {steps.map((_, idx) => (<div key={idx} className={`flex-1 h-1.5 rounded-full ${idx <= currentStep ? 'bg-amber-500' : 'bg-stone-200'}`} />))}
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6">
        <p className="text-xs text-stone-500 mb-1">Step {currentStep + 1} of 4 • VCoL Framework</p>
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
// JOURNAL
// ============================================================================

function Journal({ user, journalEntries, setJournalEntries }) {
  const [newEntry, setNewEntry] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const prompts = [
    "What did I learn about leadership today?",
    "How did I practice courage, creativity, or collaboration?",
    "What does 'owning my development' mean this week?"
  ];

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
          <h2 className="font-serif text-2xl lg:text-3xl text-stone-800">Journal</h2>
          <p className="text-sm text-stone-500">Reflect on your development journey</p>
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
          <p className="text-stone-500 text-sm mb-3">Learning is the cornerstone of development.</p>
          <button onClick={() => setShowNew(true)} className="text-amber-700 font-medium text-sm">Write your first reflection</button>
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
// AI COACH (with Day's Framework)
// ============================================================================

function AICoach({ setCurrentView }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "Help me understand the first principles",
    "How can I develop more courage?",
    "What does 'owning my development' mean?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: `Hello! I'm here to support your leadership development journey based on David Day's research and the KLI framework.\n\nThe first principle to remember: You must own your development. No one can make you develop as a leader—it requires your personal agency and commitment.\n\nWhat aspect of your leadership would you like to explore today?` }]);
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
    <div className="animate-fadeIn flex flex-col h-[calc(100vh-160px)] lg:h-[calc(100vh-100px)]">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setCurrentView('dashboard')} className="p-2 -ml-2 text-stone-500 hover:text-stone-700 lg:hidden"><Icons.ChevronLeft /></button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white"><Icons.Brain /></div>
          <div>
            <h2 className="font-semibold text-stone-800">Leadership Coach</h2>
            <p className="text-xs text-stone-500">KLI Framework • ICF Approach</p>
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
                  <button key={idx} onClick={() => handleSend(prompt)} className="text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-full text-stone-600 hover:bg-stone-100">{prompt}</button>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-stone-200 p-3">
          <div className="flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Ask about leadership development..." disabled={isLoading}
              className="flex-1 px-4 py-2.5 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <button onClick={() => handleSend()} disabled={!input.trim() || isLoading}
              className="p-2.5 bg-amber-600 text-white rounded-full hover:bg-amber-500 disabled:opacity-50">
              <Icons.Send />
            </button>
          </div>
        </div>
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

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
        <h4 className="font-medium text-amber-800 mb-1">💡 Remember</h4>
        <p className="text-amber-900 text-sm">Development has no endpoint. It is about ongoing, lifelong growth and learning.</p>
      </div>

      <button onClick={() => setCurrentView('coach')} className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600"><Icons.Brain /></div>
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
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedCompetency, setSelectedCompetency] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [streak, setStreak] = useState(0);
  const [completedActivities, setCompletedActivities] = useState(0);
  const [journalEntries, setJournalEntries] = useState([]);

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
      case 'dashboard': return <Dashboard setCurrentView={setCurrentView} setSelectedChapter={setSelectedChapter} setSelectedActivity={setSelectedActivity} setSelectedCompetency={setSelectedCompetency} streak={streak} user={user} completedActivities={completedActivities} journalEntries={journalEntries} />;
      case 'chapters': return <ChaptersView setCurrentView={setCurrentView} setSelectedChapter={setSelectedChapter} />;
      case 'chapter-detail': return <ChapterDetail chapter={selectedChapter} setCurrentView={setCurrentView} />;
      case 'competencies': return <CompetenciesView setCurrentView={setCurrentView} setSelectedCompetency={setSelectedCompetency} setSelectedActivity={setSelectedActivity} />;
      case 'competency-detail': return <CompetencyDetail competency={selectedCompetency} setCurrentView={setCurrentView} setSelectedActivity={setSelectedActivity} />;
      case 'practice': return <DailyPractice selectedActivity={selectedActivity} setCurrentView={setCurrentView} />;
      case 'journal': return <Journal user={user} journalEntries={journalEntries} setJournalEntries={setJournalEntries} />;
      case 'coach': return <AICoach setCurrentView={setCurrentView} />;
      case 'profile': return <Profile user={user} onSignOut={handleSignOut} setCurrentView={setCurrentView} />;
      default: return <Dashboard setCurrentView={setCurrentView} setSelectedChapter={setSelectedChapter} setSelectedActivity={setSelectedActivity} setSelectedCompetency={setSelectedCompetency} streak={streak} user={user} completedActivities={completedActivities} journalEntries={journalEntries} />;
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
      
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} user={user} onSignOut={handleSignOut} />
      <Header streak={streak} />
      <main className="px-5 py-6 max-w-lg mx-auto pb-24 lg:ml-64 lg:max-w-4xl lg:pb-8">
        {renderView()}
      </main>
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}

