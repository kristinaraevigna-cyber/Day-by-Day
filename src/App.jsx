import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';

// ============================================================================
// DAY BY DAY - Leader & Leadership Development Application
// Based on David V. Day's "Developing Leaders and Leadership" (2024)
// Features: ICF Coach (Text + Voice) + Day Mentor (Text + Voice)
// ============================================================================

// ============================================================================
// VOICE COACH SYSTEM PROMPTS
// ============================================================================

const getICFVoicePrompt = (language = 'en') => `You are an ICF-certified Leadership Coach having a VOICE conversation. Respond in ${language === 'en' ? 'English' : language}.

## CRITICAL VOICE RULES - FOLLOW EXACTLY

1. **STOP AFTER EVERY RESPONSE** - After you speak, STOP COMPLETELY. Wait for the client.
2. **ONE QUESTION ONLY** - Each turn: brief acknowledgment + ONE powerful question. Then STOP.
3. **2-3 SENTENCES MAX** - Keep responses very short for voice.
4. **NEVER PROJECT EMOTIONS** - Do NOT assume feelings. Ask them to name their own emotions.

## ICF CORE COMPETENCIES (2025)

You embody:
- Demonstrates Ethical Practice
- Embodies a Coaching Mindset  
- Establishes and Maintains Agreements
- Cultivates Trust and Safety
- Maintains Presence
- Listens Actively
- Evokes Awareness
- Facilitates Client Growth

## COACHING APPROACH

WRONG (giving advice):
- "You should try delegating more."
- "I think you need to set boundaries."

CORRECT (powerful questions):
- "What possibilities do you see?"
- "What would it look like if you tried something different?"
- "What's getting in the way?"

## SAMPLE FLOW

Turn 1: "Hello, I'm here to support your leadership journey. What's on your mind today?" [STOP]
Turn 2: Brief reflection + "What makes this important to you right now?" [STOP]
Turn 3: Brief reflection + "What would you like to be different?" [STOP]

Continue with ONE question per turn:
- "Tell me more about that."
- "What are you noticing?"
- "What does that bring up for you?"
- "What options do you see?"
- "What's one step you could take?"

## RULES
- Never give advice or solutions
- Ask powerful questions
- Trust the client's wisdom
- STOP after speaking and WAIT`;

const getDayMentorVoicePrompt = (language = 'en') => `You are a Leadership Development Mentor based on Dr. David V. Day's research, having a VOICE conversation. Respond in ${language === 'en' ? 'English' : language}.

## CRITICAL VOICE RULES

1. **STOP AFTER EVERY RESPONSE** - After you speak, STOP. Wait for the student.
2. **KEEP IT SHORT** - 2-4 sentences max for voice.
3. **BE DIRECT** - Give advice and teach concepts clearly.
4. **THEN ASK** - End with one question to check understanding or invite application.

## YOUR KNOWLEDGE BASE (Day, 2024)

### THE FIVE FIRST PRINCIPLES
1. You Cannot Make Anyone Develop as a Leader - requires personal ownership
2. Development Requires Dedicated Work Over Time - no quick fixes
3. Leadership is Learned Through Experience - practice matters
4. Assessment, Challenge, and Support (ACS) - the foundation
5. Evidence-Based Practices Matter - use research, not fads

### KLI COMPETENCY MODEL
- COURAGE: Resilience, Entrepreneurial Mindset, Responsible Action
- CREATIVITY: Innovation, Communication, Problem Solving  
- COLLABORATION: Empathy, Social & Emotional Learning, Teamwork

### KEY CONCEPTS
- Leader Development vs Leadership Development (individual vs collective)
- Self-views: Leader Identity, Self-Awareness, Leadership Self-Efficacy
- Skill Mapping: Break competencies into practicable micro-skills
- Goldilocks Zone: Challenges that stretch but don't overwhelm

## MENTORING APPROACH

Unlike a coach, you:
- GIVE direct advice and recommendations
- TEACH concepts from Day's research
- EXPLAIN frameworks and models
- SUGGEST specific actions

## SAMPLE FLOW

Turn 1: "Welcome! I'm here to share research-based guidance on leadership development. What would you like to learn about or work on?" [STOP]

Turn 2: Share relevant concept + "How does that connect to your situation?" [STOP]

Turn 3: Give specific advice + "What's one thing you could try this week?" [STOP]

## RULES
- Be direct and educational
- Reference Day's research and KLI framework
- Give practical recommendations
- Keep it conversational for voice
- STOP after speaking and WAIT`;

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
  Mic: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>),
  MicOff: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>),
  Phone: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>),
  PhoneOff: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="23" y1="1" x2="1" y2="23"/></svg>),
  Volume2: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>),
  VolumeX: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>),
  BookOpen: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>),
  Star: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  Heart: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>),
  Keyboard: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M6 16h12"/></svg>)
};

// ============================================================================
// PHOTOS & DATA
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

const KLI_COMPETENCIES = [
  { id: 'courage', name: 'Courage', color: 'amber', description: 'Leading courageously means having resilience, entrepreneurial mindset, and integrity.', icon: Icons.Shield, image: PHOTOS.courage, capabilities: [{ id: 'resilience', name: 'Resilience', description: 'Bounce back from setbacks', image: PHOTOS.resilience, attributes: ['Persistence', 'Adaptability', 'Growth mindset', 'Optimism', 'Emotion management'] }, { id: 'entrepreneurial', name: 'Entrepreneurial Mindset', description: 'Take risks and act boldly', image: PHOTOS.entrepreneurial, attributes: ['Enterprising', 'Resourceful', 'Initiative', 'Bold', 'Challenge'] }, { id: 'responsible', name: 'Responsible Action', description: 'Act with your values', image: PHOTOS.responsible, attributes: ['Insight', 'Modeling', 'Integrity', 'Convictions', 'Advocacy'] }] },
  { id: 'creativity', name: 'Creativity', color: 'violet', description: 'Leading creatively means innovating, communicating effectively, and solving problems.', icon: Icons.Lightbulb, image: PHOTOS.creativity, capabilities: [{ id: 'innovation', name: 'Innovation', description: 'Generate new ideas', image: PHOTOS.innovation, attributes: ['Generating ideas', 'Openness to change', 'Visioning', 'Challenge status quo', 'Flexibility'] }, { id: 'communication', name: 'Communication', description: 'Express clearly and listen', image: PHOTOS.communication, attributes: ['Expressive', 'Listen actively', 'Persuasive', 'Inquiry', 'Dialogue'] }, { id: 'problemsolving', name: 'Problem Solving', description: 'Analyze and decide', image: PHOTOS.problemsolving, attributes: ['Information seeking', 'Analyzing data', 'Anticipates problems', 'Decision making', 'Solution driven'] }] },
  { id: 'collaboration', name: 'Collaboration', color: 'teal', description: 'Leading collaboratively means showing empathy and working effectively in teams.', icon: Icons.Users, image: PHOTOS.collaboration, capabilities: [{ id: 'empathy', name: 'Empathy', description: 'Connect with others', image: PHOTOS.empathy, attributes: ['Perceptive', 'Curious', 'Diversity', 'Inclusive', 'Sensitivity'] }, { id: 'sociallearning', name: 'Social & Emotional Learning', description: 'Build relationships', image: PHOTOS.sociallearning, attributes: ['Social awareness', 'Engages others', 'Networking', 'Nurturing relationships', 'Situational learning'] }, { id: 'teamwork', name: 'Teamwork', description: 'Work with others', image: PHOTOS.teamwork, attributes: ['Participative', 'Accountable', 'Supportive', 'Respectful', 'Conflict management'] }] }
];

const CHAPTERS = [
  { id: 1, title: 'First Principles', subtitle: 'Foundations of Leader Development', description: 'The five foundational principles.', duration: '25 min', image: PHOTOS.chapter1, principles: [{ number: 1, title: 'Own Your Development', summary: 'No one can make you develop.' }, { number: 2, title: 'Dedicated Work Over Time', summary: 'No quick fixes.' }, { number: 3, title: 'Learned Through Experience', summary: 'Practice matters.' }, { number: 4, title: 'Assessment, Challenge, Support', summary: 'The ACS framework.' }, { number: 5, title: 'Evidence-Based Practices', summary: 'Use research.' }], keyInsight: 'Everyone has leadership potential.', reflection: 'Which principle resonates most?' },
  { id: 2, title: 'Developmental Systems', subtitle: 'ACS Framework', description: 'Why programs fail and systems succeed.', duration: '30 min', image: PHOTOS.chapter2, principles: [{ number: 1, title: 'Problem with Programs', summary: 'One-off programs fail.' }, { number: 2, title: 'Assessment', summary: 'Know your starting point.' }, { number: 3, title: 'Challenge', summary: 'Goldilocks Zone.' }, { number: 4, title: 'Support', summary: 'Relationships sustain growth.' }], keyInsight: 'The KLI model provides a map.', reflection: 'Where do you get ACS?' }
];

const ACTIVITIES = [
  { id: 'pause_practice', competency: 'courage', capability: 'resilience', title: 'The Pause', description: 'Build emotion management', duration: '5 min', image: PHOTOS.resilience, step_set_goal: 'Pause 3 seconds before reacting.', step_gather_info: 'What triggered you?', step_apply: 'Is my first reaction best?', step_reflect_prompt: 'What did you notice?' },
  { id: 'growth_reframe', competency: 'courage', capability: 'resilience', title: 'Growth Mindset', description: 'Reframe setbacks', duration: '10 min', image: PHOTOS.resilience, step_set_goal: 'Use "yet" or "opportunity."', step_gather_info: 'What setback occurred?', step_apply: 'I havent mastered this YET.', step_reflect_prompt: 'How did reframing help?' }
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
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-semibold text-stone-800 mb-2">Day by Day</h1>
          <p className="text-stone-600 text-sm">Leader & Leadership Development</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-stone-800 mb-6">{isLogin ? 'Welcome back' : 'Create account'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" placeholder="Your name" required={!isLogin} />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" placeholder="Min 6 characters" required minLength={6} />
            </div>
            {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && <Icons.Loader />}{isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-amber-700">{isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// VOICE COACH COMPONENT
// ============================================================================

function VoiceCoach({ coachType, setCurrentView }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [status, setStatus] = useState('Ready to connect');
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  const peerConnection = useRef(null);
  const dataChannel = useRef(null);
  const audioElement = useRef(null);
  const mediaStream = useRef(null);

  const isICF = coachType === 'icf';
  const primaryColor = isICF ? '#D97706' : '#7C3AED'; // amber-600 : violet-600
  const bgColor = isICF ? '#FEF3C7' : '#EDE9FE'; // amber-100 : violet-100

  useEffect(() => {
    return () => cleanupConnection();
  }, []);

  const cleanupConnection = () => {
    if (dataChannel.current) { dataChannel.current.close(); dataChannel.current = null; }
    if (peerConnection.current) { peerConnection.current.close(); peerConnection.current = null; }
    if (mediaStream.current) { mediaStream.current.getTracks().forEach(track => track.stop()); mediaStream.current = null; }
    if (audioElement.current) { audioElement.current.srcObject = null; audioElement.current = null; }
  };

  const getGreeting = () => {
    if (isICF) {
      return "Hello, I'm here to support your leadership journey. What's on your mind today?";
    }
    return "Welcome! I'm here to share research-based guidance on leadership development. What would you like to learn about or work on?";
  };

  const handleRealtimeEvent = (event) => {
    switch (event.type) {
      case 'response.audio.started':
        setIsAISpeaking(true);
        setStatus(isICF ? 'Coach is listening...' : 'Mentor is speaking...');
        break;
      case 'response.audio.done':
      case 'response.done':
        setIsAISpeaking(false);
        setStatus('Your turn - speak when ready');
        break;
      case 'input_audio_buffer.speech_started':
        setStatus('Listening...');
        break;
      case 'input_audio_buffer.speech_stopped':
        setStatus('Processing...');
        break;
      case 'error':
        console.error('Realtime error:', event.error);
        break;
    }
  };

  const connectSession = async () => {
    setIsConnecting(true);
    setStatus('Requesting microphone...');

    try {
      mediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 24000 }
      });

      setStatus('Connecting...');

      const tokenResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/voice-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({ language: 'en', coachType })
        }
      );

      if (!tokenResponse.ok) throw new Error('Failed to get session token');
      const { client_secret } = await tokenResponse.json();

      peerConnection.current = new RTCPeerConnection();
      audioElement.current = new Audio();
      audioElement.current.autoplay = true;

      peerConnection.current.ontrack = (event) => {
        if (audioElement.current) audioElement.current.srcObject = event.streams[0];
      };

      mediaStream.current.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, mediaStream.current);
      });

      dataChannel.current = peerConnection.current.createDataChannel('oai-events');

      dataChannel.current.onopen = () => {
        const systemPrompt = isICF ? getICFVoicePrompt('en') : getDayMentorVoicePrompt('en');
        
        dataChannel.current.send(JSON.stringify({
          type: 'session.update',
          session: {
            instructions: systemPrompt,
            voice: 'alloy',
            input_audio_transcription: { model: 'whisper-1' },
            turn_detection: {
              type: 'server_vad',
              threshold: 0.8,
              prefix_padding_ms: 500,
              silence_duration_ms: 2000,
            },
          },
        }));

        setTimeout(() => {
          const greeting = getGreeting();
          dataChannel.current.send(JSON.stringify({
            type: 'conversation.item.create',
            item: {
              type: 'message',
              role: 'assistant',
              content: [{ type: 'text', text: greeting }]
            }
          }));
          dataChannel.current.send(JSON.stringify({
            type: 'response.create',
            response: {
              modalities: ['audio'],
              instructions: 'Say the greeting exactly as provided, then stop completely.'
            },
          }));
        }, 1000);
      };

      dataChannel.current.onmessage = (event) => handleRealtimeEvent(JSON.parse(event.data));

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      const sdpResponse = await fetch('https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${client_secret.value}`, 'Content-Type': 'application/sdp' },
        body: offer.sdp,
      });

      if (!sdpResponse.ok) throw new Error('Failed to connect');

      await peerConnection.current.setRemoteDescription({ type: 'answer', sdp: await sdpResponse.text() });
      setIsConnected(true);
      setStatus('Connected');

    } catch (error) {
      console.error('Connection error:', error);
      setStatus('Error connecting - check console');
      cleanupConnection();
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectSession = () => {
    cleanupConnection();
    setIsConnected(false);
    setIsAISpeaking(false);
    setStatus('Session ended');
  };

  const toggleMute = () => {
    if (mediaStream.current) {
      const track = mediaStream.current.getAudioTracks()[0];
      if (track) { track.enabled = isMuted; setIsMuted(!isMuted); }
    }
  };

  const toggleSpeaker = () => {
    if (audioElement.current) { audioElement.current.muted = isSpeakerOn; setIsSpeakerOn(!isSpeakerOn); }
  };

  return (
    <div className="animate-fadeIn flex flex-col h-[calc(100vh-160px)] lg:h-[calc(100vh-100px)]">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setCurrentView('coaches')} className="p-2 -ml-2 text-stone-500 hover:text-stone-700">
          <Icons.ChevronLeft />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}>
            {isICF ? <Icons.Heart /> : <Icons.GraduationCap />}
          </div>
          <div>
            <h2 className="font-semibold text-stone-800">{isICF ? 'ICF Voice Coach' : 'Day Mentor Voice'}</h2>
            <p className="text-xs text-stone-500">{isICF ? 'Question-based coaching' : 'Research-based guidance'}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Voice Orb */}
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center mb-8 transition-all duration-300"
          style={{
            backgroundColor: isConnected ? (isAISpeaking ? primaryColor : '#374151') : '#E5E7EB',
            boxShadow: isConnected && isAISpeaking ? `0 0 60px ${primaryColor}66` : 'none'
          }}
        >
          {isConnected ? (
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-white transition-all duration-200"
                  style={{
                    height: isAISpeaking ? `${20 + Math.sin(Date.now() / 200 + i) * 15}px` : '8px',
                    animation: isAISpeaking ? `pulse 0.5s ease-in-out infinite ${i * 0.1}s` : 'none'
                  }}
                />
              ))}
            </div>
          ) : (
            <Icons.Mic />
          )}
        </div>

        {/* Status */}
        <p className="text-lg font-medium mb-2" style={{ color: isConnected ? primaryColor : '#6B7280' }}>{status}</p>
        {isConnected && (
          <p className="text-sm text-stone-500 mb-8">
            {isAISpeaking ? 'Listen...' : 'Take your time - speak when ready'}
          </p>
        )}

        {/* Controls */}
        <div className="flex items-center gap-4">
          {isConnected ? (
            <>
              <button
                onClick={toggleMute}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: isMuted ? '#FEE2E2' : '#F3F4F6' }}
              >
                {isMuted ? <Icons.MicOff /> : <Icons.Mic />}
              </button>
              <button
                onClick={disconnectSession}
                className="px-8 py-3 rounded-full text-white font-medium flex items-center gap-2"
                style={{ backgroundColor: '#EF4444' }}
              >
                <Icons.PhoneOff /> End
              </button>
              <button
                onClick={toggleSpeaker}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: !isSpeakerOn ? '#FEE2E2' : '#F3F4F6' }}
              >
                {isSpeakerOn ? <Icons.Volume2 /> : <Icons.VolumeX />}
              </button>
            </>
          ) : (
            <button
              onClick={connectSession}
              disabled={isConnecting}
              className="px-10 py-4 rounded-full text-white font-medium text-lg flex items-center gap-3 disabled:opacity-50"
              style={{ backgroundColor: primaryColor, boxShadow: `0 4px 20px ${primaryColor}44` }}
            >
              {isConnecting ? <Icons.Loader /> : <Icons.Phone />}
              {isConnecting ? 'Connecting...' : 'Start Voice Session'}
            </button>
          )}
        </div>

        {!isConnected && (
          <p className="text-sm text-stone-500 mt-8 text-center max-w-sm">
            {isICF
              ? 'Your coach will ask powerful questions to help you find your own insights.'
              : 'Your mentor will share research-based advice from David Day\'s leadership framework.'}
          </p>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// TEXT CHAT COACH COMPONENT
// ============================================================================

function TextCoach({ coachType, setCurrentView }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const isICF = coachType === 'icf';
  const primaryColor = isICF ? 'amber' : 'violet';
  const endpoint = isICF ? 'coach' : 'day-mentor';

  const suggestedPrompts = isICF
    ? ["I'm facing a difficult decision", "Help me reflect on my leadership", "I want more self-awareness"]
    : ["How do I start developing as a leader?", "Explain the five first principles", "What is the KLI model?"];

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      const greeting = isICF
        ? "Hello! I'm here to support your exploration and help you discover your own insights. What's on your mind today?"
        : "Welcome! I'm here to share research-based insights from David Day's work. What would you like to learn about?";
      setMessages([{ role: 'assistant', content: greeting }]);
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
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ messages: chatHistory })
      });
      const data = await response.json();
      if (data.content) setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn flex flex-col h-[calc(100vh-160px)] lg:h-[calc(100vh-100px)]">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setCurrentView('coaches')} className="p-2 -ml-2 text-stone-500 hover:text-stone-700"><Icons.ChevronLeft /></button>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${isICF ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 'bg-gradient-to-br from-violet-600 to-violet-700'}`}>
            {isICF ? <Icons.Heart /> : <Icons.GraduationCap />}
          </div>
          <div>
            <h2 className="font-semibold text-stone-800">{isICF ? 'ICF Text Coach' : 'Day Mentor Chat'}</h2>
            <p className="text-xs text-stone-500">{isICF ? 'Question-based' : 'Research-based'}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-stone-200 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => (
            <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'bg-stone-900 text-white rounded-2xl rounded-br-md' : `${isICF ? 'bg-amber-50 border-amber-100' : 'bg-violet-50 border-violet-100'} text-stone-800 rounded-2xl rounded-bl-md border`}`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className={`${isICF ? 'bg-amber-50 border-amber-100' : 'bg-violet-50 border-violet-100'} rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2 text-sm border`}>
                <Icons.Loader /> Thinking...
              </div>
            </div>
          )}
          {messages.length === 1 && !isLoading && (
            <div className="pt-2">
              <p className="text-xs text-stone-500 mb-2">Try:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, idx) => (
                  <button key={idx} onClick={() => handleSend(prompt)} className={`text-xs px-3 py-2 rounded-full border ${isICF ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-violet-50 border-violet-200 text-violet-700'}`}>{prompt}</button>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-stone-200 p-3">
          <div className="flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Type your message..." disabled={isLoading}
              className={`flex-1 px-4 py-2.5 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 ${isICF ? 'focus:ring-amber-500' : 'focus:ring-violet-500'}`} />
            <button onClick={() => handleSend()} disabled={!input.trim() || isLoading}
              className={`p-2.5 text-white rounded-full disabled:opacity-50 ${isICF ? 'bg-amber-600 hover:bg-amber-500' : 'bg-violet-600 hover:bg-violet-500'}`}>
              <Icons.Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COACH SELECTION VIEWS
// ============================================================================

function CoachesView({ setCurrentView }) {
  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800 mb-1">Your Coaches</h2>
        <p className="text-stone-500 text-sm">Choose your coaching style</p>
      </div>

      <div className="space-y-4">
        {/* ICF Coach Card */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="p-5 border-b border-stone-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shrink-0">
                <Icons.Heart />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-stone-800">ICF Leadership Coach</h3>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">ICF</span>
                </div>
                <p className="text-stone-600 text-sm">Powerful questions to help you find your own insights. Non-directive approach.</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <button onClick={() => setCurrentView('coach-icf-voice')} className="flex-1 py-3 flex items-center justify-center gap-2 text-amber-700 hover:bg-amber-50 border-r border-stone-100 transition-colors">
              <Icons.Mic /> <span className="font-medium text-sm">Voice</span>
            </button>
            <button onClick={() => setCurrentView('coach-icf-text')} className="flex-1 py-3 flex items-center justify-center gap-2 text-amber-700 hover:bg-amber-50 transition-colors">
              <Icons.Keyboard /> <span className="font-medium text-sm">Text</span>
            </button>
          </div>
        </div>

        {/* Day Mentor Card */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="p-5 border-b border-stone-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center text-white shrink-0">
                <Icons.GraduationCap />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-stone-800">Day Mentor</h3>
                  <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-medium rounded-full">KLI</span>
                </div>
                <p className="text-stone-600 text-sm">Research-based advice from David Day's leadership development framework.</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <button onClick={() => setCurrentView('coach-mentor-voice')} className="flex-1 py-3 flex items-center justify-center gap-2 text-violet-700 hover:bg-violet-50 border-r border-stone-100 transition-colors">
              <Icons.Mic /> <span className="font-medium text-sm">Voice</span>
            </button>
            <button onClick={() => setCurrentView('coach-mentor-text')} className="flex-1 py-3 flex items-center justify-center gap-2 text-violet-700 hover:bg-violet-50 transition-colors">
              <Icons.Keyboard /> <span className="font-medium text-sm">Text</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-stone-50 rounded-xl p-4">
        <h4 className="font-medium text-stone-800 mb-2">When to use each:</h4>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
            <span className="text-stone-600"><strong>ICF Coach:</strong> Explore your thinking, work through emotions, find clarity through reflection.</span>
          </div>
          <div className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 shrink-0"></div>
            <span className="text-stone-600"><strong>Day Mentor:</strong> Get specific advice, learn concepts, understand research applications.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SIMPLIFIED OTHER VIEWS
// ============================================================================

function Dashboard({ setCurrentView, streak, user, completedActivities, journalEntries }) {
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <p className="text-stone-500 text-sm mb-1">{dateStr}</p>
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800">
          {user?.user_metadata?.full_name ? `Welcome, ${user.user_metadata.full_name.split(' ')[0]}` : 'Welcome back'}
        </h2>
      </div>

      {/* Coach Cards */}
      <div className="mb-6 space-y-3">
        <button onClick={() => setCurrentView('coaches')}
          className="w-full bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-5 text-left hover:from-stone-700 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white"><Icons.MessageCircle /></div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-white mb-1">Talk to a Coach</h3>
              <p className="text-stone-400 text-sm">ICF Coach or Day Mentor • Voice or Text</p>
            </div>
            <Icons.ArrowRight className="text-white" />
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

      {/* KLI Competencies */}
      <h3 className="font-semibold text-stone-800 mb-3">KLI Competencies</h3>
      <div className="grid grid-cols-3 gap-3">
        {KLI_COMPETENCIES.map(comp => (
          <button key={comp.id} onClick={() => setCurrentView('competencies')}
            className="bg-white rounded-xl border border-stone-200 p-4 text-center hover:shadow-md transition-all">
            <div className={`w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center ${comp.color === 'amber' ? 'bg-amber-100 text-amber-600' : comp.color === 'violet' ? 'bg-violet-100 text-violet-600' : 'bg-teal-100 text-teal-600'}`}>
              <comp.icon />
            </div>
            <p className="font-medium text-stone-800 text-sm">{comp.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function Sidebar({ currentView, setCurrentView, user, onSignOut }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Icons.Home },
    { id: 'chapters', label: 'Learn', icon: Icons.BookOpen },
    { id: 'competencies', label: 'Skills', icon: Icons.Target },
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
        {navItems.map(item => (
          <button key={item.id} onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${currentView.startsWith(item.id) || currentView === item.id ? 'bg-amber-50 text-amber-700 font-medium' : 'text-stone-600 hover:bg-stone-50'}`}>
            <item.icon /><span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-stone-200">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400"><Icons.User /></div>
          <p className="text-sm font-medium text-stone-800 truncate">{user?.user_metadata?.full_name || 'User'}</p>
        </div>
        <button onClick={onSignOut} className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl text-sm">
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
            <Icons.Flame /><span className="font-semibold text-sm">{streak}</span>
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
        {navItems.map(item => (
          <button key={item.id} onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center px-4 py-2 ${currentView.startsWith(item.id) ? 'text-amber-700' : 'text-stone-400'}`}>
            <item.icon /><span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function Journal({ user, journalEntries, setJournalEntries }) {
  const [newEntry, setNewEntry] = useState('');
  const [showNew, setShowNew] = useState(false);

  const handleSave = async () => {
    if (!newEntry.trim()) return;
    const { data } = await supabase.from('reflections').insert({ user_id: user.id, content: newEntry, reflection_type: 'journal' }).select().single();
    if (data) { setJournalEntries([data, ...journalEntries]); setNewEntry(''); setShowNew(false); }
  };

  return (
    <div className="animate-fadeIn pb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-stone-800">Journal</h2>
        {!showNew && <button onClick={() => setShowNew(true)} className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-sm"><Icons.Plus /> New</button>}
      </div>
      {showNew && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-6">
          <textarea value={newEntry} onChange={(e) => setNewEntry(e.target.value)} placeholder="What's on your mind?" className="w-full px-4 py-3 border border-stone-200 rounded-xl resize-none h-32 text-sm" />
          <div className="flex justify-end gap-2 mt-3">
            <button onClick={() => setShowNew(false)} className="px-4 py-2 text-stone-600 text-sm">Cancel</button>
            <button onClick={handleSave} className="px-5 py-2 bg-stone-900 text-white rounded-full text-sm">Save</button>
          </div>
        </div>
      )}
      {journalEntries.length === 0 && !showNew ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
          <p className="text-stone-600 mb-3">No entries yet</p>
          <button onClick={() => setShowNew(true)} className="text-amber-700 font-medium text-sm">Write your first reflection</button>
        </div>
      ) : (
        <div className="space-y-3">
          {journalEntries.map(entry => (
            <div key={entry.id} className="bg-white rounded-xl border border-stone-200 p-5">
              <p className="text-xs text-stone-500 mb-2">{new Date(entry.created_at).toLocaleDateString()}</p>
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
      <button onClick={() => setCurrentView('coaches')} className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center"><Icons.MessageCircle /></div>
          <span className="font-medium text-stone-800 text-sm">Talk to a Coach</span>
        </div>
        <Icons.ChevronRight />
      </button>
      <button onClick={onSignOut} className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200 text-red-600">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center"><Icons.LogOut /></div>
          <span className="font-medium text-sm">Sign Out</span>
        </div>
      </button>
    </div>
  );
}

function ChaptersView({ setCurrentView }) {
  return (
    <div className="animate-fadeIn pb-8">
      <h2 className="font-serif text-2xl text-stone-800 mb-6">Learn</h2>
      <div className="space-y-3">
        {CHAPTERS.map(chapter => (
          <div key={chapter.id} className="bg-white rounded-xl border border-stone-200 p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center font-bold text-stone-600">{chapter.id}</div>
              <div>
                <h4 className="font-semibold text-stone-800">{chapter.title}</h4>
                <p className="text-sm text-stone-500">{chapter.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompetenciesView({ setCurrentView }) {
  return (
    <div className="animate-fadeIn pb-8">
      <h2 className="font-serif text-2xl text-stone-800 mb-6">KLI Competencies</h2>
      {KLI_COMPETENCIES.map(comp => (
        <div key={comp.id} className="bg-white rounded-2xl border border-stone-200 mb-4 overflow-hidden">
          <div className="relative h-24">
            <img src={comp.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${comp.color === 'amber' ? 'bg-amber-500' : comp.color === 'violet' ? 'bg-violet-500' : 'bg-teal-500'}`}><comp.icon /></div>
              <h3 className="text-lg font-semibold text-white">{comp.name}</h3>
            </div>
          </div>
          <div className="p-4">
            <p className="text-stone-600 text-sm mb-3">{comp.description}</p>
            <div className="flex flex-wrap gap-2">
              {comp.capabilities.map(cap => (
                <span key={cap.id} className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full">{cap.name}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
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
      case 'dashboard': return <Dashboard setCurrentView={setCurrentView} streak={streak} user={user} completedActivities={completedActivities} journalEntries={journalEntries} />;
      case 'chapters': return <ChaptersView setCurrentView={setCurrentView} />;
      case 'competencies': return <CompetenciesView setCurrentView={setCurrentView} />;
      case 'journal': return <Journal user={user} journalEntries={journalEntries} setJournalEntries={setJournalEntries} />;
      case 'coaches': return <CoachesView setCurrentView={setCurrentView} />;
      case 'coach-icf-voice': return <VoiceCoach coachType="icf" setCurrentView={setCurrentView} />;
      case 'coach-icf-text': return <TextCoach coachType="icf" setCurrentView={setCurrentView} />;
      case 'coach-mentor-voice': return <VoiceCoach coachType="mentor" setCurrentView={setCurrentView} />;
      case 'coach-mentor-text': return <TextCoach coachType="mentor" setCurrentView={setCurrentView} />;
      case 'profile': return <Profile user={user} onSignOut={handleSignOut} setCurrentView={setCurrentView} />;
      default: return <Dashboard setCurrentView={setCurrentView} streak={streak} user={user} completedActivities={completedActivities} journalEntries={journalEntries} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} user={user} onSignOut={handleSignOut} />
      <Header streak={streak} />
      <main className="px-5 py-6 max-w-lg mx-auto pb-24 lg:ml-64 lg:max-w-4xl lg:pb-8">{renderView()}</main>
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}



