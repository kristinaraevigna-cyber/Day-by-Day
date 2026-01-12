import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';

// ============================================================================
// DAY BY DAY - Leader & Leadership Development Application
// Based on David V. Day's "Developing Leaders and Leadership" (2024)
// Features: Deep Chapters, Voice/Text Coaching, Actions, Journal, Library
// ============================================================================

// ============================================================================
// VOICE COACH SYSTEM PROMPTS
// ============================================================================

const getICFVoicePrompt = () => `You are an ICF-certified Leadership Coach specializing in leader development. You are having a VOICE conversation.

## CRITICAL FIRST INSTRUCTION
Your VERY FIRST response must be EXACTLY: "Hello! What are you interested in coaching about today?"
Do NOT say anything else for your first turn. Do NOT mention "leader development" or "leadership journey" in the greeting.

## MULTILINGUAL SUPPORT
- Detect what language the user is speaking
- Respond in the SAME language the user speaks
- If they switch languages, switch with them

## VOICE CONVERSATION STYLE
- Speak naturally and conversationally, as if in person
- Keep responses SHORT (2-4 sentences typically)
- Use warm, empathetic tone
- No bullet points or lists - speak in flowing sentences
- STOP after each response and wait for the client
- ONE powerful question per turn maximum

## ICF COACHING ARC - FOLLOW THIS STRUCTURE

### 1. OPENING & AGREEMENT (First 2-3 exchanges after greeting)
Establish the coaching agreement for THIS session:
- After they respond to your greeting, ask: "Why is this important to you right now?"
- Then clarify: "What would you like to walk away with from our conversation today?"
- This creates clear focus and measures of success

### 2. EXPLORATION & AWARENESS (Middle of conversation)
Use powerful questions to deepen understanding:
- "Tell me more about that..."
- "What are you noticing as you share this?"
- "What's the impact of this on you?"
- "What patterns do you see here?"
- Reflect back what you hear to ensure understanding
- Notice and name emotions and energy shifts
- Help them see what they might not be seeing
- NEVER project emotions - ask them to name their own feelings

### 3. GENERATING POSSIBILITIES
When awareness emerges, explore options:
- "What options do you see?"
- "What else might be possible?"
- "If you weren't feeling stuck, what might you try?"

### 4. ACTION & ACCOUNTABILITY
Partner with client to design concrete next steps:
- "What's one thing you could do differently?"
- "When specifically will you do this?"
- "How will you hold yourself accountable?"

### 5. SESSION CLOSING (When they indicate they're done or after ~10-15 minutes)
Provide a brief summary:
- "Before we wrap up, let me summarize what I heard..."
- Recap their key insight or realization
- State their committed action clearly
- End with encouragement: "I'm confident you can do this."

## 2025 ICF CORE COMPETENCIES TO EMBODY

**Demonstrates Ethical Practice**
- Maintain confidentiality and appropriate boundaries
- You are a COACH, not a therapist - refer out if someone needs clinical support
- If someone mentions self-harm, express care and suggest professional resources

**Embodies a Coaching Mindset**
- Clients are responsible for their own choices
- Remain curious, open, and non-judgmental
- Trust the client's wisdom - they have the answers

**Establishes and Maintains Agreements**
- Always clarify what they want from THIS conversation
- Partner on focus and direction
- Check in: "Is this what you want to explore?"

**Cultivates Trust and Safety**
- Create a safe, supportive environment
- Acknowledge and support the client's expression
- Show genuine care for their wellbeing

**Maintains Presence**
- Be fully present with the client
- Use intuition and trust your instincts
- Manage your own emotions - stay centered

**Listens Actively**
- Listen for what is said AND what is not said
- Reflect back to ensure understanding
- Notice tone, energy, and emotion shifts

**Evokes Awareness**
- Ask questions that help clients discover new insights
- Use observations and reflections
- Help connect patterns and themes

**Facilitates Client Growth**
- Support the client in designing goals and actions
- Celebrate progress and learning
- Maintain accountability without judgment

## WHAT YOU DO NOT DO
- Never give advice or tell them what to do
- Never assume you know what they feel
- Never speak for more than 30 seconds
- Never skip the opening agreement
- Never end without a summary and action

## ACTION CAPTURE
When the client commits to a specific action during the session, AND in your closing summary, output their committed actions in this format at the very end of your response (this will be captured automatically):
\`\`\`actions
[{"action": "The specific action they committed to", "timeline": "When they said they'd do it"}]
\`\`\`
Only include actions when the CLIENT has clearly committed to something specific.`;

const getDayAdvisorVoicePrompt = () => `You are a Leadership Development Advisor based on Dr. David V. Day's research from "Developing Leaders and Leadership" (2024). You are having a VOICE conversation.

## CRITICAL FIRST INSTRUCTION
Your VERY FIRST response must be EXACTLY: "Welcome! I'm here to share research-based guidance from David Day's work. What would you like to explore today?"
Do NOT say anything else for your first turn.

## MULTILINGUAL SUPPORT
- Detect what language the user is speaking
- Respond in the SAME language the user speaks
- If they switch languages, switch with them

## VOICE CONVERSATION STYLE
- Speak naturally and conversationally
- Keep responses concise (2-4 sentences typically)
- Be direct and warm
- No bullet points or lists - speak in flowing sentences
- STOP after each response and wait for the student

## MENTORING ARC - FOLLOW THIS STRUCTURE

### 1. OPENING & UNDERSTANDING (First 2-3 exchanges after greeting)
- After they respond, ask: "Tell me more about the context - what's happening?"
- Understand their current situation before offering guidance

### 2. TEACHING & CONNECTING TO RESEARCH (Middle of conversation)
Share relevant concepts from Day's research:
- Connect their situation to relevant frameworks
- Explain concepts clearly and practically
- Share the "why" behind recommendations
- Use examples to illustrate points

### 3. PRACTICAL APPLICATION
Help them apply concepts to their situation:
- "Here's how this applies to what you're facing..."
- "Based on the research, I'd suggest..."
- "One approach that works well is..."
- Give direct, actionable advice

### 4. ACTION & COMMITMENT
Help them commit to specific next steps:
- "What's one thing you'll try this week?"
- "How will you practice this?"
- Offer specific suggestions if they need direction

### 5. SESSION CLOSING (When they indicate they're done)
Provide a brief summary:
- "Let me summarize what we discussed..."
- Recap the key concept or framework you shared
- Restate their committed action
- End with: "Remember, development takes dedicated work over time. You've got this."

## YOUR KNOWLEDGE BASE (Day, 2024)

### THE FIVE FIRST PRINCIPLES
1. You Cannot Make Anyone Develop - requires personal ownership
2. Dedicated Work Over Time - no quick fixes, development is a marathon
3. Learned Through Experience - 70-20-10 model (experience, relationships, training)
4. Assessment, Challenge, Support (ACS) - all three are needed
5. Evidence-Based Practices Matter - be skeptical of fads

### KLI COMPETENCY MODEL
**COURAGE:** Resilience, Entrepreneurial Mindset, Responsible Action
**CREATIVITY:** Innovation, Communication, Problem Solving  
**COLLABORATION:** Empathy, Social Learning, Teamwork

### KEY CONCEPTS
- Leader Development (human capital) vs Leadership Development (social capital)
- Leader Identity: Seeing yourself as a leader motivates development
- Self-Awareness: Internal (own patterns) and External (how others see you)
- Leadership Self-Efficacy: Confidence in leadership situations
- Psychological Safety: Team belief it's safe to take interpersonal risks
- Deliberate Practice: Designed activities, repetition, feedback, concentration
- Networks: Weak ties provide novel information; structural holes create advantage

### ADULT DEVELOPMENT
- Kegan's stages: Socialized Mind → Self-Authoring Mind → Self-Transforming Mind
- Development has no endpoint - continuous growth or decline

## MENTORING APPROACH

Unlike a coach, you:
- GIVE direct advice when appropriate
- TEACH concepts and frameworks
- EXPLAIN the research basis
- SUGGEST specific actions
- SHARE your knowledge proactively

But you also:
- Listen first to understand their situation
- Tailor advice to their context
- Check for understanding
- Respect their autonomy

## ACTION CAPTURE
When the student commits to a specific action, AND in your closing summary, output their committed actions in this format at the very end of your response:
\`\`\`actions
[{"action": "Description of what they committed to", "timeline": "This week"}]
\`\`\`
Only include actions when they have clearly committed to trying something specific.`;

// ============================================================================
// DEEP CHAPTER CONTENT FROM THE BOOK
// ============================================================================

const CHAPTERS = [
  {
    id: 1,
    title: 'First Principles',
    subtitle: 'Foundations of Leader Development',
    description: 'Understand the five foundational principles that guide all leader and leadership development efforts.',
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    color: 'amber',
    overview: 'This chapter establishes the theoretical and practical foundation for everything that follows. Day argues that before diving into specific techniques or programs, we must first understand what makes development actually work—and what causes it to fail.',
    
    lessons: [
      {
        id: 1,
        title: 'You Cannot Make Anyone Develop as a Leader',
        content: `Development requires personal ownership and agency. No program, no matter how well-designed, can force someone to grow. The individual must choose to engage, practice, and persist.

Day emphasizes that passively sitting through lectures or reading about leadership is insufficient. Real development requires acting and practicing mindsets and behaviors outside your comfort zone.

**Key Insight:** Adopting a leader identity motivates the learning and practice that sustains development.`,
        practicalApplication: 'Reflect on your own motivation for development. Are you here because you want to grow, or because someone told you to?',
        researchBasis: 'Day cites research showing that developmental readiness is a critical predictor of developmental outcomes.'
      },
      {
        id: 2,
        title: 'Development Requires Dedicated Work Over Time',
        content: `There are no quick fixes or shortcuts to becoming a better leader. Development is a marathon, not a sprint.

The research on expert performance suggests it takes approximately 10,000 hours of deliberate practice to achieve expertise. While leadership may not require exactly this amount, the principle holds: sustained effort over years, not days.

**Key Insight:** One-off programs rarely produce lasting development. Transfer of learning requires ongoing follow-through.`,
        practicalApplication: 'Create a long-term development plan measured in months and years, not days.',
        researchBasis: 'Based on Ericsson deliberate practice research and longitudinal studies of leader development.'
      },
      {
        id: 3,
        title: 'Leadership is Learned Through Experience',
        content: `The 70-20-10 model suggests leadership development occurs through: 70% challenging assignments, 20% developmental relationships, and 10% formal training.

However, experience alone is not enough. Experience must be processed, reflected upon, and integrated. Raw experience without reflection often leads to wrong lessons.

**Key Insight:** The most developmental experiences involve novelty, challenge, and feedback opportunity.`,
        practicalApplication: 'Seek stretch assignments. After each experience, reflect: What happened? What did I learn? What will I do differently?',
        researchBasis: 'McCall, Lombardo, and Morrison research at CCL on Lessons of Experience.'
      },
      {
        id: 4,
        title: 'Assessment, Challenge, and Support (ACS)',
        content: `The ACS framework is foundational:

**Assessment:** Know where you are starting from. Self-awareness provides the baseline.

**Challenge:** Growth happens outside your comfort zone. The Goldilocks Zone is optimal—not too easy, not overwhelming.

**Support:** Relationships, feedback, and resources sustain growth when things get tough.

**Key Insight:** Many initiatives fail because they emphasize one element while neglecting others.`,
        practicalApplication: 'For your current goal, audit all three: Do you have accurate assessment? Sufficient challenge? Support structures?',
        researchBasis: 'McCauley, Van Velsor, and Ruderman work at CCL establishing ACS as foundational.'
      },
      {
        id: 5,
        title: 'Evidence-Based Practices Matter',
        content: `Day is critical of leadership development practices based on popularity rather than research. The field is rife with programs that feel good but have no empirical support.

Evidence-based practice means using the best available research evidence, combined with practitioner expertise and context consideration.

**Key Insight:** Be skeptical of proven methods and guaranteed results. Ask: What is the evidence?`,
        practicalApplication: 'Before adopting any practice, ask: What research supports this? Has it been tested?',
        researchBasis: 'Day references the evidence-based management movement and critiques of non-evidence-based practices.'
      }
    ],
    
    keyQuotes: [
      'Everyone has leadership potential. Development requires your personal agency.',
      'Sending a changed person back to an unchanged system is often an exercise in futility.',
      'A map is not the territory, but without a map you are likely to get lost.'
    ],
    
    reflectionPrompts: [
      'Which of the five principles challenges your current approach to development?',
      'Where in your life do you have Assessment, Challenge, and Support aligned?',
      'What would change if you fully owned your development journey?'
    ]
  },
  
  {
    id: 2,
    title: 'Developmental Systems',
    subtitle: 'Why Programs Fail and Systems Succeed',
    description: 'Learn why episodic programs rarely work and how to build sustainable developmental systems.',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    color: 'teal',
    overview: 'Day argues that the $360+ billion spent globally on leadership development is largely wasted because organizations focus on programs rather than systems.',
    
    lessons: [
      {
        id: 1,
        title: 'The Problem with Programs',
        content: `Day shares Dr. David Campbell's insight: Leadership programs have three outcomes, two bad.

**Outcome 1 (Hoped):** Participant learns, returns, implements successfully.

**Outcome 2 (Bad):** Participant returns changed, colleagues resist, participant reverts. Investment lost.

**Outcome 3 (Worst):** Participant returns changed, gets frustrated, quits. Organization loses talent.

**Key Insight:** Programs fail because they change individuals without changing systems.`,
        practicalApplication: 'Before any initiative, consider: What system will I return to? Who needs to support my changed behavior?',
        researchBasis: 'Research showing 10-40% of training transfers to the job due to lack of environmental support.'
      },
      {
        id: 2,
        title: 'Training vs. Development',
        content: `**Training:** Specific skills learned quickly. Clear objectives, measurable outcomes.

**Development:** Whole person over extended time. Complex, idiosyncratic, difficult to measure. People start differently and change differently.

**Key Insight:** Training programs fail when applied to development because development is not a training problem.`,
        practicalApplication: 'Distinguish what needs training (specific skills) versus development (identity, judgment, wisdom).',
        researchBasis: 'Day distinction builds on training transfer literature and longitudinal studies.'
      },
      {
        id: 3,
        title: 'The KLI Competency Model',
        content: `The Kravis Leadership Institute developed a competency model:

**COURAGE:** Resilience, Entrepreneurial Mindset, Responsible Action
**CREATIVITY:** Innovation, Communication, Problem-Solving
**COLLABORATION:** Empathy, Social-Emotional Learning, Teamwork

Each competency has three capabilities with five attributes each.

**Key Insight:** A competency model provides shared language and specific targets for development.`,
        practicalApplication: 'Use the KLI model to identify specific capabilities. Target "develop resilience" not "become better leader."',
        researchBasis: 'KLI model synthesizes decades of leadership research into actionable framework.'
      },
      {
        id: 4,
        title: 'Skill Mapping for Practice',
        content: `Break down macro competencies into practicable micro-skills:

**Step 1:** Identify broad competency (Courage)
**Step 2:** Break into capabilities (Resilience)
**Step 3:** Identify attributes (Emotion management)
**Step 4:** Define micro-actions (Pause 3 seconds before responding)

**Key Insight:** Development happens through specific, repeated actions—not understanding concepts.`,
        practicalApplication: 'Take one capability. Break it into 3-5 behaviors to practice this week. Schedule them.',
        researchBasis: 'Deliberate practice research and behavior change science.'
      }
    ],
    
    keyQuotes: [
      'A major problem with program approaches is that they are episodic and short term.',
      'Leadership training and leadership development initiatives are different.',
      'The map is not the territory, but the KLI model provides helpful guidance.'
    ],
    
    reflectionPrompts: [
      'What systems support or hinder your development?',
      'Which KLI competency needs the most attention?',
      'How can you create environmental conditions that support new behaviors?'
    ]
  },
  
  {
    id: 3,
    title: 'Individual Leader Development',
    subtitle: 'Building Human Capital',
    description: 'Focus on developing your individual leadership knowledge, skills, and abilities.',
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=80',
    color: 'amber',
    overview: 'This chapter addresses leader development as distinct from leadership development—building intrapersonal capacity.',
    
    lessons: [
      {
        id: 1,
        title: 'The Romance of Leadership',
        content: `We hold overly positive notions of leaders. This "romance of leadership" leads us to attribute outcomes to leaders even when dubious.

**The Problem:** If we romanticize leaders, we assume developing individuals automatically produces better leadership.

**Key Insight:** A developed leader and effective leadership are not the same. Leadership is a process between people.`,
        practicalApplication: 'Examine your mental model. Is leadership something a leader does to followers, or created through interaction?',
        researchBasis: 'Meindl, Ehrlich, and Dukerich research on the romance of leadership.'
      },
      {
        id: 2,
        title: 'Human Capital vs. Social Capital',
        content: `**Human Capital:** Intrapersonal KSAs that a leader carries from situation to situation. Leader development builds this.

**Social Capital:** Leadership resources created between people in networks. Leadership development builds this.

**Key Insight:** Most "leadership development" focuses on human capital while ignoring social capital. Both are necessary.`,
        practicalApplication: 'Audit your investments: How much time on individual capabilities vs. relationships and networks?',
        researchBasis: 'Day 2000 article establishing this foundational distinction.'
      },
      {
        id: 3,
        title: 'The High-Potential Trap',
        content: `Day critiques high-potential program assumptions:

**Assumption 1:** Leadership potential is rare. **Reality:** May be more common.
**Assumption 2:** We can identify potential. **Reality:** Most selections based on performance, not potential.
**Assumption 3:** Concentrated investment is efficient. **Reality:** Creates problematic dynamics.

**Key Insight:** HiPo designation often becomes self-fulfilling prophecy.`,
        practicalApplication: 'If labeled high-potential, do not let it inflate ego. If not, do not let it limit you. Potential is developed.',
        researchBasis: 'Research by Silzer and Church on high-potential programs.'
      },
      {
        id: 4,
        title: 'Leadership Training Effectiveness',
        content: `Meta-analysis found leadership training can work—but context matters:

**What works:** Needs assessment, feedback, multiple methods, spaced practice, on-job application.

**What does not work:** One-shot programs, lecture-only, no practice opportunity, ignoring transfer.

**Key Insight:** Training works when designed with transfer in mind. Goal is changed behavior, not learning.`,
        practicalApplication: 'For any training: Plan before what behaviors to practice. Plan after how to continue and get feedback.',
        researchBasis: 'Lacerenza, Reyes, Marlow, Joseph, and Salas 2017 meta-analysis.'
      }
    ],
    
    keyQuotes: [
      'Leadership is a process and not a position.',
      'To be an effective leader means being able to work effectively with others.',
      'Whatever is developed in individuals must be used or applied for it to matter.'
    ],
    
    reflectionPrompts: [
      'How much of your development focuses on individual skills vs. relationships?',
      'Have you been labeled high-potential or not? How did it affect you?',
      'What would it look like to develop leadership as a process?'
    ]
  },
  
  {
    id: 4,
    title: 'Self-Views and Leader Development',
    subtitle: 'Identity, Awareness, and Self-Efficacy',
    description: 'Explore how your self-concept shapes your development as a leader.',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80',
    color: 'violet',
    overview: 'Day argues that self-views are proximal indicators of development—early signs that development is occurring.',
    
    lessons: [
      {
        id: 1,
        title: 'Leader Identity',
        content: `Leader identity is the extent to which you see yourself as a leader—not about holding a position.

Day uses Hiller scale: I am a leader. I see myself as a leader. I would describe myself including "leader." I prefer to be seen as a leader.

**Key Insight:** A leader identity motivates the learning and practice that sustains development.`,
        practicalApplication: 'Rate yourself on the four items (1-5). If low, explore: What would need to change to see yourself as a leader?',
        researchBasis: 'Research by Day, Harrison, and Halpin 2009 on leader identity.'
      },
      {
        id: 2,
        title: 'Self-Awareness',
        content: `**Internal Self-Awareness:** Understanding your patterns—what you value, how you react, what triggers you.

**External Self-Awareness:** Understanding how others perceive you. Requires feedback.

**The Paradox:** People who rate themselves highly self-aware often are not. Genuine self-awareness includes knowing you have blind spots.

**Key Insight:** Self-awareness is the foundation of all development.`,
        practicalApplication: 'Seek feedback from 3-5 people. Ask: What is one thing I do that helps my leadership? One thing that hinders it?',
        researchBasis: 'Tasha Eurich research showing only 10-15% are as self-aware as they think.'
      },
      {
        id: 3,
        title: 'Leadership Self-Efficacy',
        content: `Leadership self-efficacy (LSE) is your confidence in your ability to lead effectively—specific to leadership situations.

**High LSE:** I believe I can successfully lead this team through this challenge.
**Low LSE:** I am not sure I have what it takes to handle this.

LSE affects effort and persistence. Higher LSE means trying harder and persisting longer.

**Key Insight:** LSE is malleable—developed through mastery experiences, vicarious learning, social persuasion.`,
        practicalApplication: 'Identify one situation where confidence is low. What small success could build mastery? Who could you observe?',
        researchBasis: 'Bandura self-efficacy theory applied to leadership.'
      },
      {
        id: 4,
        title: 'Proximal vs. Distal Indicators',
        content: `**Proximal Indicators:** Changes in self-views and leadership KSAs. Early signs of development.

**Distal Indicators:** Behavioral changes on job, team performance, organizational outcomes. Ultimate goals but take longer.

**Key Insight:** Do not expect immediate behavioral change. Self-view changes come first. Trust the process.`,
        practicalApplication: 'Track proximal indicators monthly: Rate leader identity, self-awareness, self-efficacy. Look for trends.',
        researchBasis: 'Day and Dragoni 2015 framework on developmental outcomes.'
      }
    ],
    
    keyQuotes: [
      'A leader identity motivates the learning and practice that sustains development.',
      'Self-awareness is the starting point for all development.',
      'Self-efficacy is not about feeling good—it is about believing you can succeed at specific tasks.'
    ],
    
    reflectionPrompts: [
      'To what extent do you currently see yourself as a leader?',
      'Where are your self-awareness blind spots likely to be?',
      'In what leadership situations do you have high vs. low self-efficacy?'
    ]
  },
  
  {
    id: 5,
    title: 'Adult Development',
    subtitle: 'Lifelong Learning and Growth',
    description: 'Understand how adults continue to develop throughout their lives.',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=800&q=80',
    color: 'teal',
    overview: 'This chapter takes a longer view, exploring how leadership development is part of broader adult development.',
    
    lessons: [
      {
        id: 1,
        title: 'Lifelong Learning',
        content: `Kennedy said leadership and learning are indispensable to each other. Learning and development are lifelong without an end state.

Day distinguishes: Learning is enduring behavior change, can be quick. Development is always adaptive, occurs over longer time.

**Key Insight:** Development does not happen automatically with age. Many adults stop. The difference is sustained engagement.`,
        practicalApplication: 'Design your life for ongoing learning: What challenging experiences? What new skills? When did you last feel like a beginner?',
        researchBasis: 'Research on cognitive aging showing intellectual engagement buffers against decline.'
      },
      {
        id: 2,
        title: 'Deliberate Practice',
        content: `Ericsson research on expert performance applies to leadership:

**Requirements:** Activities designed to improve, high repetition, continuous feedback, concentration and effort, not inherently enjoyable.

**Key Insight:** Simply having experiences does not develop expertise. Experiences must involve deliberate, focused practice with feedback.`,
        practicalApplication: 'Identify one skill to practice deliberately. Design repetitions, seek feedback, commit to effort even when uncomfortable.',
        researchBasis: 'Ericsson, Krampe, and Tesch-Romer 1993 deliberate practice research.'
      },
      {
        id: 3,
        title: 'Meaning-Making and Development',
        content: `Kegan proposes increasingly complex meaning-making:

**Socialized Mind:** Define self through relationships and social expectations.
**Self-Authoring Mind:** Develop own internal compass and ideology.
**Self-Transforming Mind:** See multiple frameworks, hold complexity, embrace paradox.

Most adults do not reach self-transforming mind. But leadership increasingly requires this capacity.

**Key Insight:** Development is not just acquiring skills—it is becoming a more complex meaning-maker.`,
        practicalApplication: 'Notice how you make meaning of challenges. Do you rely on external validation? Can you hold competing truths?',
        researchBasis: 'Kegan adult development theory applied to leadership.'
      },
      {
        id: 4,
        title: 'Development Has No Endpoint',
        content: `Day emphasizes leader development is potentially lifelong. The world keeps changing, new challenges emerge, always another level of complexity.

**Key Insight:** There is no "developed leader" end state. Even highly developed leaders continue growing—or begin declining.`,
        practicalApplication: 'Shift from "How do I become a leader?" to "How do I keep developing?" Development is discipline, not destination.',
        researchBasis: 'Longitudinal research showing continued growth possibilities across the lifespan.'
      }
    ],
    
    keyQuotes: [
      'Leadership and learning are indispensable to each other. - John F. Kennedy',
      'Development is shaped by both nature and nurture.',
      'Development has no endpoint—it is lifelong growth.'
    ],
    
    reflectionPrompts: [
      'How has your meaning-making about leadership evolved?',
      'What would deliberate practice look like for your most important skill?',
      'If development never ends, what is your next frontier?'
    ]
  },
  
  {
    id: 6,
    title: 'Collective Leadership Capacity',
    subtitle: 'Building Social Capital',
    description: 'Learn how teams develop leadership as a collective capability beyond any individual.',
    duration: '35 min',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    color: 'violet',
    overview: 'This chapter shifts from individual leader development to collective leadership development—building social capital.',
    
    lessons: [
      {
        id: 1,
        title: 'Leader vs. Leadership Development',
        content: `**Leader Development:** Builds human capital in individuals—KSAs individuals carry from situation to situation.

**Leadership Development:** Builds social capital in collectives—resources created between people through relationships and networks.

**Key Insight:** The best-developed individual cannot have impact without interpersonal context. Most "leadership development" is really leader development.`,
        practicalApplication: 'Examine your organization investments. How much focuses on individuals vs. relationships and collective capacity?',
        researchBasis: 'Day 2000 foundational distinction between human and social capital approaches.'
      },
      {
        id: 2,
        title: 'Psychological Safety',
        content: `Amy Edmondson concept is central to collective leadership:

**Definition:** Shared belief that the team is safe for interpersonal risk-taking. People can speak up, ask questions, admit mistakes without fear.

**Why It Matters:** Without psychological safety, teams cannot learn. Members hide mistakes and do not contribute best thinking.

**Key Insight:** Leaders build psychological safety by inviting input, responding constructively to mistakes, modeling vulnerability.`,
        practicalApplication: 'Assess psychological safety in your teams. What signals tell people it is safe or unsafe to speak up?',
        researchBasis: 'Edmondson research on psychological safety and team learning.'
      },
      {
        id: 3,
        title: 'Shared Mental Models',
        content: `Effective teams develop shared understanding of:
- **Task:** What are we trying to accomplish?
- **Team:** Who does what? What are our roles?
- **Context:** What is happening in our environment?

**Key Insight:** Shared mental models do not happen automatically. They require explicit communication and shared experiences.`,
        practicalApplication: 'Periodically check alignment: Do we have shared understanding of goals, roles, and situation?',
        researchBasis: 'Research by Cannon-Bowers, Salas on team cognition and shared mental models.'
      },
      {
        id: 4,
        title: 'Collective Leadership Efficacy',
        content: `Just as individuals have leadership self-efficacy, collectives have leadership efficacy—shared belief that "we can successfully engage in leadership activities together."

Different from individual confidence. It is about the team belief in collective capacity.

**Key Insight:** Collective efficacy predicts team performance even controlling for individual abilities. Team belief matters.`,
        practicalApplication: 'Assess your team collective efficacy. What experiences could build shared confidence?',
        researchBasis: 'Bandura collective efficacy theory applied to leadership.'
      }
    ],
    
    keyQuotes: [
      'Leadership is created through ongoing interactions of people engaged in shared work.',
      'The most highly developed leader cannot have any impact without interpersonal context.',
      'Collective leadership is greater than the sum of individual leaders.'
    ],
    
    reflectionPrompts: [
      'How psychologically safe are the teams you lead or participate in?',
      'What shared mental models does your team have? Where are gaps?',
      'How would your team rate its collective leadership efficacy?'
    ]
  },
  
  {
    id: 7,
    title: 'Networks and Development',
    subtitle: 'Social Network Analysis',
    description: 'Understand how relationships and network structures shape leadership capacity.',
    duration: '30 min',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80',
    color: 'amber',
    overview: 'This chapter introduces social network analysis as a tool for understanding collective leadership.',
    
    lessons: [
      {
        id: 1,
        title: 'Social Networks vs. Networking',
        content: `**Social Networking:** Facebook, LinkedIn, events. Fun, possibly helpful, but not scientific.

**Social Network Analysis (SNA):** Serious science of how individuals are connected. Provides quantitative and visual tools for understanding relationship structures.

**Key Insight:** Your network is capital that enables leadership. Structure matters as much as size.`,
        practicalApplication: 'Map your professional network. Who are close ties? Who connects you to others? Where are structural holes?',
        researchBasis: 'Foundational SNA concepts from Granovetter, Burt applied to leadership.'
      },
      {
        id: 2,
        title: 'The Strength of Weak Ties',
        content: `Granovetter theory: Weak ties (acquaintances) often provide more value than strong ties (close friends) for certain purposes.

**Why?** Weak ties bridge different social worlds, providing novel information. Strong ties tend to know what you already know.

A massive LinkedIn study (20 million people) confirmed weak ties more likely to lead to new jobs.

**Key Insight:** For learning and opportunity, cultivate weak ties. For support and execution, strong ties matter more.`,
        practicalApplication: 'Identify people who connect you to different networks. Invest in maintaining these bridge relationships.',
        researchBasis: 'Granovetter 1973 Strength of Weak Ties and 2022 LinkedIn field experiment.'
      },
      {
        id: 3,
        title: 'Network Structure and Leadership',
        content: `**Dense Networks:** Everyone knows everyone. Good for trust and coordination. Risk: Echo chambers.

**Sparse Networks:** People connected through brokers. Good for diverse information. Risk: Fragility.

**Key Insight:** Leaders often occupy structural holes—positions bridging disconnected groups. This gives information advantages.`,
        practicalApplication: 'Where do you sit in your network? Deeply embedded in one cluster, or bridging multiple groups?',
        researchBasis: 'Burt structural hole theory on network positions and performance.'
      },
      {
        id: 4,
        title: 'Building Network Capital',
        content: `Network capital can be built deliberately:

**Strategies:** Map current network, identify gaps, build bridges, maintain relationships, give value before expecting return.

**Key Insight:** Your network is not static. It requires ongoing investment. Neglected relationships atrophy.`,
        practicalApplication: 'Schedule regular network maintenance. Reach out to weak ties. Introduce people who should know each other.',
        researchBasis: 'Research on social capital and network development.'
      }
    ],
    
    keyQuotes: [
      'Social networks are not the same as social networking.',
      'What value is created by different patterns of connections? This is social capital.',
      'Leadership is a process enabled by networks.'
    ],
    
    reflectionPrompts: [
      'What does your leadership network look like?',
      'Who are weak ties connecting you to new information?',
      'Where could you build bridges to disconnected networks?'
    ]
  },
  
  {
    id: 8,
    title: 'Advancing the Science',
    subtitle: 'Evidence-Based Leadership Development',
    description: 'Commit to evidence-based practices and continuous improvement in your development.',
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    color: 'teal',
    overview: 'The final chapter calls for ongoing advancement in how we understand and practice leadership development.',
    
    lessons: [
      {
        id: 1,
        title: 'No Single Theory Suffices',
        content: `Day warns against seeking "the" leadership theory. Much energy was invested in turf battles among theory proponents. None are completely right or completely wrong.

**Key Insight:** Leader and leadership development are inherently eclectic. Helpful approaches draw from multiple disciplines.`,
        practicalApplication: 'Be suspicious of anyone claiming "the answer." Remain curious about multiple perspectives.',
        researchBasis: 'Day career-long integration of multiple research traditions.'
      },
      {
        id: 2,
        title: 'The Call for Rigor',
        content: `Day advocates for more rigorous research:

**Problems:** Too much self-report, too few longitudinal studies, inadequate attention to context.

**Solutions:** Multiple measurement methods, longer time horizons, context-sensitive designs.

**Key Insight:** The field needs better science. Align with evidence-based practices, be skeptical of fads.`,
        practicalApplication: 'When evaluating any approach, ask: What is the evidence? How was it studied? What are limitations?',
        researchBasis: 'Day methodological critiques and calls for more rigorous research.'
      },
      {
        id: 3,
        title: 'Integration Across Levels',
        content: `Day calls for integrating individual and collective perspectives:

**Individual Level:** Leader identity, self-awareness, self-efficacy, KSAs
**Collective Level:** Psychological safety, shared mental models, collective efficacy, networks

Both levels interact. Individual enables collective; collective shapes individual.

**Key Insight:** Complete leadership development must address both levels.`,
        practicalApplication: 'Design development to include both individual skill-building and collective capacity-building.',
        researchBasis: 'Day and Dragoni 2015 multilevel framework.'
      },
      {
        id: 4,
        title: 'Humility and Continuous Learning',
        content: `Day closes with humility: Keep advancing—current practices will seem primitive in the future.

What we think we know will be refined, revised, overturned. The field is young.

**Key Insight:** Your development approach should be a hypothesis, not fixed belief. Stay curious, keep learning.`,
        practicalApplication: 'Hold current practices lightly. What you are doing may need to change as you and the field learn more.',
        researchBasis: 'Day acknowledgment of the emerging nature of the field.'
      }
    ],
    
    keyQuotes: [
      'Leader and leadership development are inherently eclectic.',
      'The field remains theoretically and empirically underdeveloped.',
      'Keep advancing—current practices will seem primitive in the future.'
    ],
    
    reflectionPrompts: [
      'What beliefs about leadership development might you need to update?',
      'How can you stay current with emerging research and practice?',
      'What commitment will you make to your ongoing development?'
    ]
  }
];

// ============================================================================
// EVIDENCE-BASED READING LIBRARY
// ============================================================================

const READING_LIBRARY = {
  categories: [
    {
      id: 'foundations',
      name: 'Foundational Leadership Theory',
      description: 'Classic and contemporary works establishing the theoretical foundations of leadership',
      books: [
        { title: 'Leadership: Theory and Practice', author: 'Peter G. Northouse', year: 2021, description: 'The most widely used leadership textbook, covering all major leadership theories.', keyTopics: ['Trait approach', 'Skills approach', 'Transformational leadership'], evidenceLevel: 'High', recommended: true },
        { title: 'The Bass Handbook of Leadership', author: 'Bernard M. Bass & Ruth Bass', year: 2008, description: 'The most comprehensive reference work on leadership.', keyTopics: ['Leadership theories', 'Leadership styles', 'Cross-cultural leadership'], evidenceLevel: 'High', recommended: true },
        { title: 'The Nature of Leadership', author: 'John Antonakis & David V. Day', year: 2018, description: 'Collection of chapters by leading scholars on cutting-edge research.', keyTopics: ['Leader traits', 'Charisma', 'Ethical leadership'], evidenceLevel: 'High', recommended: true },
        { title: 'Leadership in Organizations', author: 'Gary Yukl', year: 2013, description: 'Comprehensive academic text integrating theory and research.', keyTopics: ['Influence processes', 'Leadership behavior', 'Power'], evidenceLevel: 'High', recommended: false },
        { title: 'The Leadership Challenge', author: 'James Kouzes & Barry Posner', year: 2017, description: 'Five practices of exemplary leadership based on extensive research.', keyTopics: ['Model the Way', 'Inspire a Shared Vision', 'Enable Others'], evidenceLevel: 'Medium', recommended: true },
        { title: 'Leadership on the Line', author: 'Ronald Heifetz & Marty Linsky', year: 2017, description: 'Adaptive leadership and the dangers of leading change.', keyTopics: ['Adaptive challenges', 'Technical vs adaptive', 'Political dynamics'], evidenceLevel: 'Medium', recommended: true },
        { title: 'Leaders Eat Last', author: 'Simon Sinek', year: 2014, description: 'Why some teams pull together and others do not.', keyTopics: ['Trust', 'Circle of Safety', 'Neurochemistry of leadership'], evidenceLevel: 'Low', recommended: false }
      ]
    },
    {
      id: 'development',
      name: 'Leader & Leadership Development',
      description: 'Research and practice on developing leadership capacity',
      books: [
        { title: 'Developing Leaders and Leadership', author: 'David V. Day', year: 2024, description: 'The book this app is based on. Distinguishes leader from leadership development.', keyTopics: ['Five first principles', 'ACS framework', 'Self-views', 'Networks'], evidenceLevel: 'High', recommended: true, primary: true },
        { title: 'CCL Handbook of Leadership Development', author: 'Van Velsor, McCauley, & Ruderman', year: 2010, description: 'Comprehensive guide from the leading leadership development organization.', keyTopics: ['Assessment', 'Challenge', 'Support', '360 feedback'], evidenceLevel: 'High', recommended: true },
        { title: 'Experience-Driven Leader Development', author: 'McCauley, DeRue, Yost, & Taylor', year: 2014, description: 'How to maximize learning from leadership experiences.', keyTopics: ['Developmental experiences', 'Learning agility'], evidenceLevel: 'High', recommended: false },
        { title: 'An Integrative Approach to Leader Development', author: 'David V. Day, Michelle Harrison, & Stanley Halpin', year: 2009, description: 'Connecting adult development, identity, and expertise.', keyTopics: ['Identity development', 'Expert performance', 'Adult development'], evidenceLevel: 'High', recommended: true },
        { title: 'The Lessons of Experience', author: 'McCall, Lombardo, & Morrison', year: 1988, description: 'CCL classic on what executives learn from their experiences.', keyTopics: ['Developmental experiences', 'Learning from adversity', 'Career derailment'], evidenceLevel: 'High', recommended: true },
        { title: 'Using Experience to Develop Leadership Talent', author: 'McCauley & McCall', year: 2014, description: 'How organizations use experiences to develop leaders.', keyTopics: ['Job assignments', 'Developmental relationships', 'Hardships'], evidenceLevel: 'High', recommended: false },
        { title: 'The Oxford Handbook of Leader Development', author: 'David V. Day', year: 2014, description: 'Comprehensive academic handbook on all aspects of leader development.', keyTopics: ['Theory', 'Research methods', 'Interventions'], evidenceLevel: 'High', recommended: false }
      ]
    },
    {
      id: 'self-awareness',
      name: 'Self-Awareness & Personal Development',
      description: 'Understanding yourself as the foundation for leadership',
      books: [
        { title: 'Insight', author: 'Tasha Eurich', year: 2017, description: 'Research-based exploration of self-awareness and how to develop it.', keyTopics: ['Internal self-awareness', 'External self-awareness', 'Feedback'], evidenceLevel: 'High', recommended: true },
        { title: 'An Everyone Culture', author: 'Robert Kegan & Lisa Lahey', year: 2016, description: 'How organizations can become deliberately developmental.', keyTopics: ['Adult development', 'Immunity to change'], evidenceLevel: 'Medium', recommended: true },
        { title: 'Immunity to Change', author: 'Robert Kegan & Lisa Lahey', year: 2009, description: 'Why change is hard and how to overcome psychological barriers.', keyTopics: ['Competing commitments', 'Big assumptions'], evidenceLevel: 'Medium', recommended: false },
        { title: 'In Over Our Heads', author: 'Robert Kegan', year: 1994, description: 'The mental demands of modern life and adult development.', keyTopics: ['Orders of consciousness', 'Subject-object shifts', 'Mental complexity'], evidenceLevel: 'High', recommended: true },
        { title: 'Emotional Intelligence', author: 'Daniel Goleman', year: 1995, description: 'Why EQ can matter more than IQ.', keyTopics: ['Self-awareness', 'Self-regulation', 'Social skills'], evidenceLevel: 'Medium', recommended: false },
        { title: 'The EQ Edge', author: 'Steven Stein & Howard Book', year: 2011, description: 'Practical guide to emotional intelligence at work.', keyTopics: ['EQ competencies', 'Assessment', 'Development strategies'], evidenceLevel: 'Medium', recommended: false },
        { title: 'Mindset', author: 'Carol Dweck', year: 2006, description: 'The power of fixed versus growth mindset.', keyTopics: ['Growth mindset', 'Fixed mindset', 'Praise and criticism'], evidenceLevel: 'High', recommended: true },
        { title: 'Peak', author: 'Anders Ericsson & Robert Pool', year: 2016, description: 'The science of expertise and deliberate practice.', keyTopics: ['Deliberate practice', 'Mental representations', 'Expert performance'], evidenceLevel: 'High', recommended: true }
      ]
    },
    {
      id: 'identity',
      name: 'Leader Identity & Self-Concept',
      description: 'How we see ourselves as leaders',
      books: [
        { title: 'Act Like a Leader, Think Like a Leader', author: 'Herminia Ibarra', year: 2015, description: 'Why action precedes thinking in leadership transitions.', keyTopics: ['Identity transition', 'Outsight', 'Experimenting'], evidenceLevel: 'Medium', recommended: true },
        { title: 'Working Identity', author: 'Herminia Ibarra', year: 2003, description: 'Unconventional strategies for reinventing your career.', keyTopics: ['Identity change', 'Possible selves', 'Career transition'], evidenceLevel: 'Medium', recommended: true },
        { title: 'Possible Selves', author: 'Hazel Markus & Paula Nurius', year: 1986, description: 'Seminal article on how we envision future selves.', keyTopics: ['Hoped-for selves', 'Feared selves', 'Motivation'], evidenceLevel: 'High', recommended: false },
        { title: 'Transitions', author: 'William Bridges', year: 2004, description: 'Making sense of life\'s changes.', keyTopics: ['Endings', 'Neutral zone', 'New beginnings'], evidenceLevel: 'Low', recommended: false }
      ]
    },
    {
      id: 'teams',
      name: 'Team Leadership & Psychological Safety',
      description: 'Leading and developing high-performing teams',
      books: [
        { title: 'The Fearless Organization', author: 'Amy Edmondson', year: 2019, description: 'Creating psychological safety in the workplace.', keyTopics: ['Psychological safety', 'Learning from failure', 'Speaking up'], evidenceLevel: 'High', recommended: true },
        { title: 'Team of Teams', author: 'Stanley McChrystal', year: 2015, description: 'Building adaptable organizations through shared consciousness.', keyTopics: ['Adaptability', 'Shared consciousness', 'Decentralized decision-making'], evidenceLevel: 'Medium', recommended: true },
        { title: 'The Five Dysfunctions of a Team', author: 'Patrick Lencioni', year: 2002, description: 'A fable exploring what makes teams fail and succeed.', keyTopics: ['Trust', 'Conflict', 'Accountability'], evidenceLevel: 'Low', recommended: false },
        { title: 'Teaming', author: 'Amy Edmondson', year: 2012, description: 'How organizations learn, innovate, and compete.', keyTopics: ['Dynamic teaming', 'Execution-as-learning', 'Organizing to learn'], evidenceLevel: 'High', recommended: true },
        { title: 'The Wisdom of Teams', author: 'Jon Katzenbach & Douglas Smith', year: 1993, description: 'Classic on what makes teams work.', keyTopics: ['Team basics', 'High-performance teams', 'Team discipline'], evidenceLevel: 'Medium', recommended: false },
        { title: 'Senior Leadership Teams', author: 'Ruth Wageman, Debra Nunes, James Burruss, & Richard Hackman', year: 2008, description: 'What it takes to make them great.', keyTopics: ['Executive teams', 'Real teams', 'Enabling conditions'], evidenceLevel: 'High', recommended: true },
        { title: 'Collaborative Intelligence', author: 'J. Richard Hackman', year: 2011, description: 'Using teams to solve hard problems.', keyTopics: ['Team intelligence', 'Collective cognition', 'Team design'], evidenceLevel: 'High', recommended: false }
      ]
    },
    {
      id: 'coaching',
      name: 'Coaching & Feedback',
      description: 'Developing others through coaching conversations',
      books: [
        { title: 'Co-Active Coaching', author: 'Kimsey-House, Sandahl, & Whitworth', year: 2018, description: 'Foundational coaching text with practical tools.', keyTopics: ['Coaching model', 'Powerful questions', 'Listening'], evidenceLevel: 'Medium', recommended: true },
        { title: 'Thanks for the Feedback', author: 'Douglas Stone & Sheila Heen', year: 2014, description: 'The science of receiving feedback well.', keyTopics: ['Receiving feedback', 'Feedback triggers'], evidenceLevel: 'Medium', recommended: true },
        { title: 'Helping People Change', author: 'Boyatzis, Smith, & Van Oosten', year: 2019, description: 'Coaching with compassion rather than compliance.', keyTopics: ['Coaching with compassion', 'Intentional change'], evidenceLevel: 'High', recommended: true },
        { title: 'The Coaching Habit', author: 'Michael Bungay Stanier', year: 2016, description: 'Seven questions to tame your advice monster.', keyTopics: ['Powerful questions', 'Coaching mindset', 'AWE question'], evidenceLevel: 'Low', recommended: true },
        { title: 'Radical Candor', author: 'Kim Scott', year: 2017, description: 'Being a kick-ass boss without losing your humanity.', keyTopics: ['Care personally', 'Challenge directly', 'Feedback culture'], evidenceLevel: 'Low', recommended: false },
        { title: 'Difficult Conversations', author: 'Douglas Stone, Bruce Patton, & Sheila Heen', year: 2010, description: 'How to discuss what matters most.', keyTopics: ['Three conversations', 'Learning conversations', 'Identity'], evidenceLevel: 'Medium', recommended: true }
      ]
    },
    {
      id: 'networks',
      name: 'Networks & Social Capital',
      description: 'Building and leveraging relationships for leadership',
      books: [
        { title: 'The Hidden Power of Social Networks', author: 'Rob Cross & Andrew Parker', year: 2004, description: 'Understanding and nurturing networks in organizations.', keyTopics: ['Network analysis', 'Central connectors', 'Boundary spanners'], evidenceLevel: 'High', recommended: true },
        { title: 'Achieving Success Through Social Capital', author: 'Wayne Baker', year: 2000, description: 'Tapping into the hidden resources in your personal networks.', keyTopics: ['Social capital', 'Network building', 'Reciprocity'], evidenceLevel: 'Medium', recommended: false },
        { title: 'Give and Take', author: 'Adam Grant', year: 2013, description: 'Why helping others drives our success.', keyTopics: ['Givers', 'Takers', 'Matchers', 'Generalized reciprocity'], evidenceLevel: 'Medium', recommended: true },
        { title: 'Never Eat Alone', author: 'Keith Ferrazzi', year: 2014, description: 'Secrets to success through relationship building.', keyTopics: ['Networking', 'Relationship building', 'Generosity'], evidenceLevel: 'Low', recommended: false },
        { title: 'Connected', author: 'Nicholas Christakis & James Fowler', year: 2009, description: 'The surprising power of social networks.', keyTopics: ['Network effects', 'Three degrees', 'Social contagion'], evidenceLevel: 'High', recommended: true }
      ]
    },
    {
      id: 'evidence-based',
      name: 'Evidence-Based Management',
      description: 'Using research to inform management practice',
      books: [
        { title: 'Hard Facts, Dangerous Half-Truths, and Total Nonsense', author: 'Jeffrey Pfeffer & Robert Sutton', year: 2006, description: 'A call for evidence-based management.', keyTopics: ['Evidence-based practice', 'Management myths'], evidenceLevel: 'High', recommended: true },
        { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: 2011, description: 'Nobel laureate summary of judgment and decision-making research.', keyTopics: ['Cognitive biases', 'System 1 and 2', 'Decision-making'], evidenceLevel: 'High', recommended: true },
        { title: 'The Halo Effect', author: 'Phil Rosenzweig', year: 2007, description: 'Why so much of what we know about business success is wrong.', keyTopics: ['Delusions', 'Business performance', 'Research quality'], evidenceLevel: 'High', recommended: true },
        { title: 'Predictably Irrational', author: 'Dan Ariely', year: 2008, description: 'The hidden forces that shape our decisions.', keyTopics: ['Behavioral economics', 'Decision-making', 'Irrationality'], evidenceLevel: 'High', recommended: false },
        { title: 'Nudge', author: 'Richard Thaler & Cass Sunstein', year: 2008, description: 'Improving decisions about health, wealth, and happiness.', keyTopics: ['Choice architecture', 'Libertarian paternalism', 'Defaults'], evidenceLevel: 'High', recommended: true }
      ]
    },
    {
      id: 'ethics',
      name: 'Ethical Leadership & Moral Development',
      description: 'Leading with integrity and developing moral reasoning',
      books: [
        { title: 'Moral Development and Reality', author: 'John Gibbs', year: 2013, description: 'Beyond the theories of Kohlberg and Hoffman.', keyTopics: ['Moral stages', 'Moral reasoning', 'Empathy'], evidenceLevel: 'High', recommended: true },
        { title: 'Blind Spots', author: 'Max Bazerman & Ann Tenbrunsel', year: 2011, description: 'Why we fail to do what\'s right and what to do about it.', keyTopics: ['Ethical blind spots', 'Bounded ethicality', 'Ethical fading'], evidenceLevel: 'High', recommended: true },
        { title: 'The Righteous Mind', author: 'Jonathan Haidt', year: 2012, description: 'Why good people are divided by politics and religion.', keyTopics: ['Moral foundations', 'Intuition', 'Moral psychology'], evidenceLevel: 'High', recommended: true },
        { title: 'Authentic Leadership', author: 'Bill George', year: 2003, description: 'Rediscovering the secrets to creating lasting value.', keyTopics: ['Authenticity', 'Values', 'Purpose'], evidenceLevel: 'Low', recommended: false },
        { title: 'Servant Leadership', author: 'Robert Greenleaf', year: 1977, description: 'A journey into the nature of legitimate power.', keyTopics: ['Service', 'Stewardship', 'Community'], evidenceLevel: 'Low', recommended: false }
      ]
    },
    {
      id: 'change',
      name: 'Leading Change & Transformation',
      description: 'Managing organizational and personal change',
      books: [
        { title: 'Leading Change', author: 'John Kotter', year: 2012, description: 'The eight-step process for leading change.', keyTopics: ['Urgency', 'Coalition', 'Vision', 'Quick wins'], evidenceLevel: 'Medium', recommended: true },
        { title: 'Switch', author: 'Chip Heath & Dan Heath', year: 2010, description: 'How to change things when change is hard.', keyTopics: ['Rider', 'Elephant', 'Path', 'Bright spots'], evidenceLevel: 'Medium', recommended: true },
        { title: 'The Heart of Change', author: 'John Kotter & Dan Cohen', year: 2002, description: 'Real-life stories of how people change organizations.', keyTopics: ['See-feel-change', 'Emotional engagement'], evidenceLevel: 'Medium', recommended: false },
        { title: 'Organizational Culture and Leadership', author: 'Edgar Schein', year: 2010, description: 'The definitive resource on organizational culture.', keyTopics: ['Culture levels', 'Artifacts', 'Basic assumptions'], evidenceLevel: 'High', recommended: true },
        { title: 'The Culture Code', author: 'Daniel Coyle', year: 2018, description: 'The secrets of highly successful groups.', keyTopics: ['Safety', 'Vulnerability', 'Purpose'], evidenceLevel: 'Low', recommended: false }
      ]
    }
  ]
};

// ============================================================================
// KLI COMPETENCIES
// ============================================================================

const KLI_COMPETENCIES = [
  { id: 'courage', name: 'Courage', color: 'amber', description: 'Leading courageously through resilience, entrepreneurial mindset, and responsible action.', capabilities: [{ id: 'resilience', name: 'Resilience', attributes: ['Persistence', 'Adaptability', 'Growth mindset', 'Optimism', 'Emotion management'] }, { id: 'entrepreneurial', name: 'Entrepreneurial Mindset', attributes: ['Enterprising', 'Resourceful', 'Initiative', 'Bold', 'Challenge'] }, { id: 'responsible', name: 'Responsible Action', attributes: ['Insight', 'Modeling', 'Integrity', 'Convictions', 'Advocacy'] }] },
  { id: 'creativity', name: 'Creativity', color: 'violet', description: 'Leading creatively through innovation, communication, and problem-solving.', capabilities: [{ id: 'innovation', name: 'Innovation', attributes: ['Generating ideas', 'Openness', 'Visioning', 'Challenge status quo', 'Flexibility'] }, { id: 'communication', name: 'Communication', attributes: ['Expressive', 'Listen actively', 'Persuasive', 'Inquiry', 'Dialogue'] }, { id: 'problemsolving', name: 'Problem Solving', attributes: ['Information seeking', 'Analyzing', 'Anticipates problems', 'Decision making', 'Solution driven'] }] },
  { id: 'collaboration', name: 'Collaboration', color: 'teal', description: 'Leading collaboratively through empathy, social learning, and teamwork.', capabilities: [{ id: 'empathy', name: 'Empathy', attributes: ['Perceptive', 'Curious', 'Diversity', 'Inclusive', 'Sensitivity'] }, { id: 'sociallearning', name: 'Social Learning', attributes: ['Social awareness', 'Engages others', 'Networking', 'Nurturing relationships', 'Situational learning'] }, { id: 'teamwork', name: 'Teamwork', attributes: ['Participative', 'Accountable', 'Supportive', 'Respectful', 'Conflict management'] }] }
];

// ============================================================================
// PRACTICE ACTIVITIES (VCoL Framework - Based on KLI Competencies)
// ============================================================================

const ACTIVITIES = [
  // COURAGE - Resilience Activities
  {
    id: 'pause_practice',
    competency: 'courage',
    capability: 'resilience',
    title: 'The Pause',
    description: 'Build emotion management by pausing before responding to triggers',
    duration: '5 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'Today, pause for 3 seconds before responding in any situation that triggers a strong reaction.',
      gather_info: 'Notice: What triggered you? What emotion arose? What was your first impulse?',
      apply: 'Take a breath. Ask yourself: "Is my first reaction the best reaction?" Then choose consciously.',
      reflect: 'What did you notice when you paused? How did it change your response?'
    }
  },
  {
    id: 'growth_reframe',
    competency: 'courage',
    capability: 'resilience',
    title: 'Growth Mindset Reframe',
    description: 'Practice reframing setbacks as opportunities for learning',
    duration: '10 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'When you encounter a setback today, consciously reframe it using "yet" or "opportunity to learn."',
      gather_info: 'What setback or failure did you experience? What was your initial reaction?',
      apply: 'Reframe: "I haven\'t mastered this YET" or "This is an opportunity to learn about..."',
      reflect: 'How did reframing change your emotional response and next actions?'
    }
  },
  // COURAGE - Entrepreneurial Mindset Activities
  {
    id: 'bold_action',
    competency: 'courage',
    capability: 'entrepreneurial',
    title: 'One Bold Action',
    description: 'Take initiative on something outside your comfort zone',
    duration: '15 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Identify one bold action you have been avoiding. Commit to taking the first step today.',
      gather_info: 'What is the action? What fear is holding you back? What is the worst that could happen?',
      apply: 'Take the first step. Focus on progress, not perfection.',
      reflect: 'What happened when you took action? What did you learn about yourself?'
    }
  },
  {
    id: 'resource_hunt',
    competency: 'courage',
    capability: 'entrepreneurial',
    title: 'Resource Hunt',
    description: 'Find creative solutions using available resources',
    duration: '15 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Identify a challenge you are facing. Find 3 unconventional resources that could help.',
      gather_info: 'What resources do you have access to? Who could help? What can be repurposed?',
      apply: 'Reach out to one resource or person today. Take action with what you have.',
      reflect: 'What resources did you discover? How did this change your approach?'
    }
  },
  // COURAGE - Responsible Action Activities
  {
    id: 'values_alignment',
    competency: 'courage',
    capability: 'responsible',
    title: 'Values in Action',
    description: 'Act with integrity by aligning behavior with your core values',
    duration: '10 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'Identify one core value. Watch for moments today when your actions align—or don\'t—with that value.',
      gather_info: 'What value did you choose? When did you see it guiding you? When did you drift from it?',
      apply: 'In one situation, consciously choose the action that reflects your value, even if harder.',
      reflect: 'How did it feel to act from your value? What made it easy or hard?'
    }
  },
  {
    id: 'speak_up',
    competency: 'courage',
    capability: 'responsible',
    title: 'Speak Your Truth',
    description: 'Practice advocacy by voicing your perspective respectfully',
    duration: '10 min',
    level: 'Growth',
    vcol: {
      set_goal: 'In a meeting or conversation today, share a perspective you might normally hold back.',
      gather_info: 'What perspective are you holding? Why have you been hesitant to share it?',
      apply: 'Share your view using "I" statements. Be clear, respectful, and open to dialogue.',
      reflect: 'What happened when you spoke up? How did others respond?'
    }
  },
  // CREATIVITY - Innovation Activities
  {
    id: 'idea_generation',
    competency: 'creativity',
    capability: 'innovation',
    title: 'Idea Sprint',
    description: 'Generate multiple solutions to a challenge without judgment',
    duration: '15 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'Choose a challenge you face. Generate at least 10 possible solutions without judging any of them.',
      gather_info: 'What is the challenge? What solutions come to mind? Push beyond the obvious.',
      apply: 'Write down all 10+ ideas. Circle the 2-3 most interesting. Take action on one.',
      reflect: 'What surprised you about this exercise? Which idea will you pursue?'
    }
  },
  {
    id: 'challenge_assumption',
    competency: 'creativity',
    capability: 'innovation',
    title: 'Challenge the Status Quo',
    description: 'Question an existing process or assumption',
    duration: '15 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Identify one process or assumption at work that you\'ve always accepted. Question it today.',
      gather_info: 'Why has this always been done this way? What would happen if you changed it?',
      apply: 'Propose an alternative approach to one person or test a small change yourself.',
      reflect: 'What did you learn from challenging the status quo? What resistance did you encounter?'
    }
  },
  // CREATIVITY - Communication Activities
  {
    id: 'active_listening',
    competency: 'creativity',
    capability: 'communication',
    title: 'Deep Listening',
    description: 'Give someone your complete, undivided attention',
    duration: '10 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'In your next conversation, focus entirely on understanding before responding.',
      gather_info: 'Are you truly listening or preparing your reply? What is the person really saying?',
      apply: 'Put away distractions. Don\'t interrupt. Reflect back what you heard.',
      reflect: 'What did you notice when you listened fully? What did you learn?'
    }
  },
  {
    id: 'powerful_question',
    competency: 'creativity',
    capability: 'communication',
    title: 'Ask Powerful Questions',
    description: 'Use inquiry to deepen understanding and spark insight',
    duration: '10 min',
    level: 'Growth',
    vcol: {
      set_goal: 'In conversations today, ask at least 3 open-ended questions that start with "What" or "How."',
      gather_info: 'What questions tend to open up conversation? What questions shut it down?',
      apply: 'Replace advice-giving with curious questions. Ask: "What would be most helpful?"',
      reflect: 'How did asking questions change the conversation? What did you discover?'
    }
  },
  // CREATIVITY - Problem Solving Activities
  {
    id: 'decision_framework',
    competency: 'creativity',
    capability: 'problemsolving',
    title: 'Structured Decision',
    description: 'Use a framework to make a complex decision',
    duration: '20 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Apply a decision framework (pros/cons, criteria matrix) to a decision you are facing.',
      gather_info: 'What is the decision? What are your options? What criteria matter most?',
      apply: 'Score each option against your criteria. What does the analysis reveal?',
      reflect: 'Did the framework clarify your thinking? What will you decide?'
    }
  },
  {
    id: 'anticipate_problems',
    competency: 'creativity',
    capability: 'problemsolving',
    title: 'Pre-Mortem Analysis',
    description: 'Anticipate problems before they happen',
    duration: '15 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Choose an upcoming project or decision. Imagine it has failed. What went wrong?',
      gather_info: 'What are all the ways this could fail? What risks have you overlooked?',
      apply: 'Identify the top 3 risks. Create one mitigation action for each.',
      reflect: 'How did this exercise change your planning? What will you do differently?'
    }
  },
  // COLLABORATION - Empathy Activities
  {
    id: 'perspective_taking',
    competency: 'collaboration',
    capability: 'empathy',
    title: 'Walk in Their Shoes',
    description: 'Practice seeing a situation from another\'s perspective',
    duration: '10 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'Choose someone you disagree with or find challenging. Try to understand their perspective.',
      gather_info: 'What might they be feeling? What needs or fears might drive their behavior?',
      apply: 'Have a conversation where you focus on understanding, not convincing.',
      reflect: 'What did you learn about them? About yourself?'
    }
  },
  {
    id: 'curiosity_practice',
    competency: 'collaboration',
    capability: 'empathy',
    title: 'Stay Curious',
    description: 'Replace judgment with genuine curiosity about others',
    duration: '10 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'When you notice yourself judging someone today, replace it with a curious question.',
      gather_info: 'What judgments do you typically make? What triggers them?',
      apply: 'Ask yourself: "What might I be missing about this person\'s situation?"',
      reflect: 'How did staying curious change your perception? What did you discover?'
    }
  },
  // COLLABORATION - Social Learning Activities
  {
    id: 'network_map',
    competency: 'collaboration',
    capability: 'sociallearning',
    title: 'Map Your Network',
    description: 'Visualize and strengthen your leadership network',
    duration: '20 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Create a simple map of your leadership network. Identify gaps and opportunities.',
      gather_info: 'Who provides: Support? Challenge? Information? Connections to others?',
      apply: 'Identify one relationship to strengthen. Reach out to that person this week.',
      reflect: 'What patterns did you notice? What relationship will you invest in?'
    }
  },
  {
    id: 'learn_from_others',
    competency: 'collaboration',
    capability: 'sociallearning',
    title: 'Leadership Learning',
    description: 'Learn from observing other leaders in action',
    duration: '15 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'Identify a leader you admire. Observe them in action and note what makes them effective.',
      gather_info: 'What specific behaviors do they exhibit? How do others respond to them?',
      apply: 'Try one behavior you observed in your own leadership practice today.',
      reflect: 'What worked? What would you adapt for your own style?'
    }
  },
  // COLLABORATION - Teamwork Activities
  {
    id: 'build_safety',
    competency: 'collaboration',
    capability: 'teamwork',
    title: 'Build Psychological Safety',
    description: 'Create an environment where people can speak up',
    duration: '15 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Observe: How safe do people feel to speak up, take risks, and admit mistakes in your team?',
      gather_info: 'Who speaks? Who stays quiet? How are mistakes discussed?',
      apply: 'Do one thing to increase safety: invite a quiet person\'s view or share a mistake you made.',
      reflect: 'What did you observe about safety? What impact did your action have?'
    }
  },
  {
    id: 'give_recognition',
    competency: 'collaboration',
    capability: 'teamwork',
    title: 'Recognize & Appreciate',
    description: 'Acknowledge the contributions of team members',
    duration: '10 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'Today, recognize at least one person for a specific contribution they made.',
      gather_info: 'Who has gone unrecognized? What specific actions deserve acknowledgment?',
      apply: 'Share your appreciation directly—be specific about what they did and why it mattered.',
      reflect: 'How did they respond? How did it feel to give recognition?'
    }
  },
  // ============================================================================
  // ADDITIONAL VCoL ACTIVITIES
  // ============================================================================
  // COURAGE - Additional Resilience Activities
  {
    id: 'stress_recovery',
    competency: 'courage',
    capability: 'resilience',
    title: 'Stress Recovery Routine',
    description: 'Develop a practice for recovering from stressful events',
    duration: '15 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'Create a personal recovery routine you can use after stressful leadership moments.',
      gather_info: 'What currently helps you decompress? What activities restore your energy?',
      apply: 'After a stressful event today, deliberately use your recovery routine.',
      reflect: 'How effective was your routine? What would you add or change?'
    }
  },
  {
    id: 'failure_analysis',
    competency: 'courage',
    capability: 'resilience',
    title: 'Learning from Failure',
    description: 'Extract lessons from a recent setback or failure',
    duration: '20 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Analyze a recent failure or setback to extract valuable lessons.',
      gather_info: 'What happened? What was in your control? What assumptions were wrong?',
      apply: 'Write down 3 specific lessons and one action you will take differently.',
      reflect: 'How does reframing failure as learning change your relationship to risk?'
    }
  },
  {
    id: 'optimism_practice',
    competency: 'courage',
    capability: 'resilience',
    title: 'Realistic Optimism',
    description: 'Practice seeing possibilities while acknowledging challenges',
    duration: '10 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'Find the opportunity within a current challenge you\'re facing.',
      gather_info: 'What is the challenge? What are the facts vs. your interpretations?',
      apply: 'Identify one genuine opportunity or silver lining, then share it with someone.',
      reflect: 'Did this shift your energy around the challenge? How?'
    }
  },
  // COURAGE - Additional Entrepreneurial Activities
  {
    id: 'opportunity_scan',
    competency: 'courage',
    capability: 'entrepreneurial',
    title: 'Opportunity Scanning',
    description: 'Actively look for improvement opportunities around you',
    duration: '15 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'Identify 3 opportunities for improvement in your work environment.',
      gather_info: 'What processes are inefficient? What complaints keep recurring? What could be better?',
      apply: 'Pick the most promising opportunity and outline a simple proposal.',
      reflect: 'What made you see these opportunities now? What would help you notice them regularly?'
    }
  },
  {
    id: 'calculated_risk',
    competency: 'courage',
    capability: 'entrepreneurial',
    title: 'Take a Calculated Risk',
    description: 'Practice taking smart risks outside your comfort zone',
    duration: '15 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Identify one calculated risk you could take this week.',
      gather_info: 'What is the potential upside? Downside? How can you minimize the downside?',
      apply: 'Commit to taking the risk. Set a specific date and time.',
      reflect: 'What happened? What did you learn about your risk tolerance?'
    }
  },
  {
    id: 'first_follower',
    competency: 'courage',
    capability: 'entrepreneurial',
    title: 'Find Your First Follower',
    description: 'Practice enrolling others in your ideas',
    duration: '20 min',
    level: 'Mastery',
    vcol: {
      set_goal: 'Share an idea you\'ve been holding back and recruit at least one supporter.',
      gather_info: 'Who might be open to this idea? What\'s in it for them?',
      apply: 'Have a conversation to share your idea and gauge interest. Listen for feedback.',
      reflect: 'How did it feel to share? What feedback did you get? Who might be your first follower?'
    }
  },
  // COURAGE - Additional Responsible Action Activities
  {
    id: 'values_audit',
    competency: 'courage',
    capability: 'responsible',
    title: 'Values Audit',
    description: 'Check alignment between your stated and lived values',
    duration: '20 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Examine whether your recent actions align with your stated values.',
      gather_info: 'What are your top 3 values? Review your calendar and decisions this week.',
      apply: 'Identify one gap and make a specific plan to close it.',
      reflect: 'What causes the gap between stated and lived values? How can you close it?'
    }
  },
  {
    id: 'ethical_dilemma',
    competency: 'courage',
    capability: 'responsible',
    title: 'Ethical Dilemma Practice',
    description: 'Practice reasoning through complex ethical situations',
    duration: '25 min',
    level: 'Mastery',
    vcol: {
      set_goal: 'Work through a real or hypothetical ethical dilemma systematically.',
      gather_info: 'What are the facts? Who are the stakeholders? What values are in tension?',
      apply: 'Apply at least two ethical frameworks (e.g., utilitarian, duty-based, virtue ethics).',
      reflect: 'How did systematic analysis change your initial intuition? What did you learn?'
    }
  },
  {
    id: 'courageous_conversation',
    competency: 'courage',
    capability: 'responsible',
    title: 'Have a Courageous Conversation',
    description: 'Address something important that you\'ve been avoiding',
    duration: '30 min',
    level: 'Mastery',
    vcol: {
      set_goal: 'Have a conversation you\'ve been avoiding because it feels risky.',
      gather_info: 'Why have you been avoiding this? What\'s the cost of not having it?',
      apply: 'Schedule and have the conversation. Focus on being honest AND respectful.',
      reflect: 'What happened? Was it as hard as you anticipated? What did you learn?'
    }
  },
  // CREATIVITY - Additional Innovation Activities
  {
    id: 'reverse_brainstorm',
    competency: 'creativity',
    capability: 'innovation',
    title: 'Reverse Brainstorming',
    description: 'Generate ideas by asking "How could we make this worse?"',
    duration: '15 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Use reverse brainstorming to find creative solutions to a challenge.',
      gather_info: 'Pick a problem. List all the ways you could make it WORSE.',
      apply: 'Flip each "worse" idea to find a potential solution. Pick the best 2-3.',
      reflect: 'How did this technique unlock different thinking? When might you use it again?'
    }
  },
  {
    id: 'assumption_busting',
    competency: 'creativity',
    capability: 'innovation',
    title: 'Assumption Busting',
    description: 'Identify and challenge hidden assumptions',
    duration: '20 min',
    level: 'Mastery',
    vcol: {
      set_goal: 'Uncover and challenge the hidden assumptions in a current project or decision.',
      gather_info: 'List everything you\'re assuming is true. Which assumptions are actually facts?',
      apply: 'Pick the riskiest assumption. What would change if it were wrong? Test it.',
      reflect: 'How many assumptions were you unaware of? How does challenging them open new possibilities?'
    }
  },
  {
    id: 'creative_constraints',
    competency: 'creativity',
    capability: 'innovation',
    title: 'Creative Constraints',
    description: 'Use limitations to spark innovation',
    duration: '15 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Use artificial constraints to generate more creative solutions.',
      gather_info: 'Pick a challenge. Add a constraint: half the budget, half the time, no technology, etc.',
      apply: 'Generate at least 5 solutions that work within the constraint.',
      reflect: 'How did constraints help your creativity? Which ideas might actually be better?'
    }
  },
  // CREATIVITY - Additional Communication Activities
  {
    id: 'story_crafting',
    competency: 'creativity',
    capability: 'communication',
    title: 'Craft Your Leadership Story',
    description: 'Develop a compelling narrative about your leadership journey',
    duration: '25 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Create a 2-minute story about a pivotal moment in your leadership development.',
      gather_info: 'What was the situation? What did you do? What did you learn?',
      apply: 'Practice telling the story out loud. Refine it for clarity and impact.',
      reflect: 'How does having your story ready help you connect with others?'
    }
  },
  {
    id: 'metaphor_thinking',
    competency: 'creativity',
    capability: 'communication',
    title: 'Communicate with Metaphors',
    description: 'Use metaphors to make complex ideas memorable',
    duration: '15 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Explain a complex idea using a compelling metaphor.',
      gather_info: 'What concept do you need to communicate? What familiar thing shares similar patterns?',
      apply: 'Create a metaphor and use it in a real conversation or presentation.',
      reflect: 'How did the metaphor land? Did it help understanding?'
    }
  },
  {
    id: 'socratic_questions',
    competency: 'creativity',
    capability: 'communication',
    title: 'Socratic Questioning',
    description: 'Use questions to help others think more deeply',
    duration: '20 min',
    level: 'Mastery',
    vcol: {
      set_goal: 'Practice using questions rather than statements to lead a discussion.',
      gather_info: 'What types of questions probe assumptions, reasons, evidence, and implications?',
      apply: 'In your next meeting, rely primarily on questions to guide thinking.',
      reflect: 'How did this affect the quality of discussion? What types of questions worked best?'
    }
  },
  // CREATIVITY - Additional Problem Solving Activities
  {
    id: 'root_cause',
    competency: 'creativity',
    capability: 'problemsolving',
    title: 'Five Whys Analysis',
    description: 'Get to the root cause by asking "why" repeatedly',
    duration: '15 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'Use the Five Whys technique to uncover the root cause of a problem.',
      gather_info: 'State the problem. Ask "why?" five times, each time going deeper.',
      apply: 'Address the root cause you discovered, not just the symptoms.',
      reflect: 'How deep did you have to go? What did you learn about this technique?'
    }
  },
  {
    id: 'decision_matrix',
    competency: 'creativity',
    capability: 'problemsolving',
    title: 'Decision Matrix',
    description: 'Make better decisions by weighting multiple criteria',
    duration: '20 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Use a decision matrix to make a pending decision more systematically.',
      gather_info: 'What are your options? What criteria matter? How do you weight them?',
      apply: 'Build the matrix, score each option, and compare to your intuition.',
      reflect: 'Did the matrix change your decision? What did you learn about your decision-making?'
    }
  },
  {
    id: 'scenario_planning',
    competency: 'creativity',
    capability: 'problemsolving',
    title: 'Scenario Planning',
    description: 'Prepare for multiple possible futures',
    duration: '25 min',
    level: 'Mastery',
    vcol: {
      set_goal: 'Develop 3 scenarios for how a current situation might unfold.',
      gather_info: 'What are the key uncertainties? What are the best/worst/most likely cases?',
      apply: 'For each scenario, identify early warning signs and your response strategy.',
      reflect: 'How does thinking in scenarios change your preparedness?'
    }
  },
  // COLLABORATION - Additional Empathy Activities
  {
    id: 'empathy_interview',
    competency: 'collaboration',
    capability: 'empathy',
    title: 'Empathy Interview',
    description: 'Deeply understand another person\'s experience',
    duration: '30 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Conduct a genuine empathy interview with someone different from you.',
      gather_info: 'What do you want to understand? What open questions will you ask?',
      apply: 'Have the conversation. Listen without judgment. Ask follow-up questions.',
      reflect: 'What surprised you? How did deep listening change your understanding?'
    }
  },
  {
    id: 'bias_check',
    competency: 'collaboration',
    capability: 'empathy',
    title: 'Bias Self-Check',
    description: 'Examine your automatic judgments about others',
    duration: '15 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Notice and examine a bias or quick judgment you made about someone.',
      gather_info: 'What was the judgment? What triggered it? What evidence do you actually have?',
      apply: 'Challenge the bias. Seek disconfirming evidence. Behave as if the bias is wrong.',
      reflect: 'How often do you make quick judgments? What might you be missing?'
    }
  },
  {
    id: 'inclusive_language',
    competency: 'collaboration',
    capability: 'empathy',
    title: 'Inclusive Communication',
    description: 'Practice using language that includes everyone',
    duration: '15 min',
    level: 'Foundation',
    vcol: {
      set_goal: 'Review your recent communications for inclusive vs. exclusive language.',
      gather_info: 'Who might feel excluded? What assumptions does your language make?',
      apply: 'Revise one communication to be more inclusive. Notice language in meetings.',
      reflect: 'How does attention to language affect how included people feel?'
    }
  },
  // COLLABORATION - Additional Social Learning Activities
  {
    id: 'learning_from_failure_others',
    competency: 'collaboration',
    capability: 'sociallearning',
    title: 'Learn from Others\' Failures',
    description: 'Extract lessons from failures shared by others',
    duration: '20 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Ask someone to share a failure and the lessons they learned.',
      gather_info: 'Who has relevant experience? What can you learn without making the same mistakes?',
      apply: 'Have the conversation. Ask: What happened? What would you do differently?',
      reflect: 'What lessons can you apply? How can you create more of these conversations?'
    }
  },
  {
    id: 'reverse_mentoring',
    competency: 'collaboration',
    capability: 'sociallearning',
    title: 'Reverse Mentoring',
    description: 'Learn from someone with less experience but different expertise',
    duration: '30 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Arrange a reverse mentoring session with someone younger or less senior.',
      gather_info: 'What do they know that you don\'t? What perspectives might they have?',
      apply: 'Have the session. Come as a genuine learner, not to share your wisdom.',
      reflect: 'What did you learn? How did it feel to be the learner?'
    }
  },
  {
    id: 'peer_coaching',
    competency: 'collaboration',
    capability: 'sociallearning',
    title: 'Peer Coaching Exchange',
    description: 'Practice coaching a peer on a challenge',
    duration: '30 min',
    level: 'Mastery',
    vcol: {
      set_goal: 'Conduct a peer coaching exchange where you each coach the other on a challenge.',
      gather_info: 'What\'s a challenge you\'d benefit from thinking through? What about your peer?',
      apply: 'Take turns. As coach: ask questions, don\'t advise. As coachee: think out loud.',
      reflect: 'What was it like to coach vs. be coached? What questions were most powerful?'
    }
  },
  // COLLABORATION - Additional Teamwork Activities
  {
    id: 'meeting_design',
    competency: 'collaboration',
    capability: 'teamwork',
    title: 'Design a Better Meeting',
    description: 'Improve how your team meets and collaborates',
    duration: '20 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Redesign an upcoming meeting to be more effective and inclusive.',
      gather_info: 'What\'s working in your meetings? What\'s not? What do you actually need to accomplish?',
      apply: 'Implement at least two design changes in your next meeting.',
      reflect: 'What impact did the changes have? What else might you try?'
    }
  },
  {
    id: 'conflict_approach',
    competency: 'collaboration',
    capability: 'teamwork',
    title: 'Productive Conflict Practice',
    description: 'Turn a disagreement into a productive conversation',
    duration: '25 min',
    level: 'Mastery',
    vcol: {
      set_goal: 'Address a current disagreement in a way that strengthens the relationship.',
      gather_info: 'What is the real disagreement? What do you both actually want?',
      apply: 'Have the conversation. Start with curiosity, seek to understand before being understood.',
      reflect: 'What was the outcome? How did your approach affect the conversation?'
    }
  },
  {
    id: 'delegate_develop',
    competency: 'collaboration',
    capability: 'teamwork',
    title: 'Delegate to Develop',
    description: 'Delegate a task with development in mind',
    duration: '15 min',
    level: 'Growth',
    vcol: {
      set_goal: 'Delegate something in a way that develops the other person.',
      gather_info: 'What could you delegate? Who would benefit from the stretch? What support do they need?',
      apply: 'Delegate the task. Provide context and support, but not the answers.',
      reflect: 'How did it go? What did they learn? What did you learn about letting go?'
    }
  }
];

// ============================================================================
// SELF-VIEW ASSESSMENTS (From Day, 2024 - Chapter 4)
// These are the proximal indicators of leader development
// ============================================================================

const SELF_VIEW_ASSESSMENTS = {
  leaderIdentity: {
    id: 'leader_identity',
    title: 'Leader Identity',
    subtitle: 'How you see yourself as a leader',
    description: 'Leader identity reflects the extent to which you see yourself as a leader. Research shows that adopting a leader identity motivates the learning and practice that sustains development over time.',
    source: 'Day (2024), Chapter 4; Adapted from Day & Sin (2011)',
    timeToComplete: '3-5 minutes',
    instructions: 'Rate each statement on how much it describes you currently.',
    scale: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neutral', 'Somewhat Agree', 'Agree', 'Strongly Agree'],
    items: [
      { id: 1, text: 'I am a leader.', dimension: 'core' },
      { id: 2, text: 'I see myself as a leader.', dimension: 'core' },
      { id: 3, text: 'If I had to describe myself to others, I would include the word "leader."', dimension: 'core' },
      { id: 4, text: 'I prefer to think of myself as a leader.', dimension: 'core' },
      { id: 5, text: 'Being a leader is an important part of who I am.', dimension: 'importance' },
      { id: 6, text: 'I feel like a leader.', dimension: 'affective' },
      { id: 7, text: 'I have a clear sense of what it means for me to be a leader.', dimension: 'clarity' },
      { id: 8, text: 'I act like a leader.', dimension: 'behavioral' }
    ],
    interpretation: {
      low: { range: [1, 3], message: 'You may not yet see yourself strongly as a leader. This is a growth opportunity—identity often develops through experience and practice.' },
      moderate: { range: [3.1, 5], message: 'You have a developing leader identity. Continue seeking leadership experiences to strengthen this self-view.' },
      high: { range: [5.1, 7], message: 'You have a strong leader identity. This motivates ongoing learning and leadership practice.' }
    },
    developmentTips: [
      'Seek leadership roles, even informal ones, to gain experience',
      'Reflect on moments when you successfully influenced others',
      'Ask others how they see you as a leader',
      'Practice "acting as if" you are a leader in everyday situations'
    ]
  },
  
  selfAwareness: {
    id: 'self_awareness',
    title: 'Leader Self-Awareness',
    subtitle: 'Understanding your values, tendencies, and impact',
    description: 'Self-awareness involves understanding your own values, behavioral tendencies, strengths, weaknesses, and the impact you have on others. Day emphasizes that self-awareness is foundational but often overestimated.',
    source: 'Day (2024), Chapter 4; Based on Eurich (2017) research',
    timeToComplete: '5-7 minutes',
    instructions: 'Rate how accurately each statement describes you.',
    scale: ['Not at All', 'Slightly', 'Moderately', 'Very', 'Extremely'],
    items: [
      { id: 1, text: 'I have a clear understanding of my core values.', dimension: 'internal' },
      { id: 2, text: 'I understand how my behavior affects others.', dimension: 'external' },
      { id: 3, text: 'I am aware of my emotional triggers.', dimension: 'internal' },
      { id: 4, text: 'I know my leadership strengths.', dimension: 'internal' },
      { id: 5, text: 'I am honest about my leadership weaknesses.', dimension: 'internal' },
      { id: 6, text: 'I regularly seek feedback about my leadership.', dimension: 'external' },
      { id: 7, text: 'I notice when my assumptions may be wrong.', dimension: 'internal' },
      { id: 8, text: 'I recognize patterns in my behavior across situations.', dimension: 'internal' },
      { id: 9, text: 'Others would say I understand how I come across.', dimension: 'external' },
      { id: 10, text: 'I can accurately predict how others will react to me.', dimension: 'external' }
    ],
    interpretation: {
      low: { range: [1, 2.5], message: 'Developing greater self-awareness is a key growth area. Consider seeking more feedback from others.' },
      moderate: { range: [2.6, 3.5], message: 'You have moderate self-awareness with room to grow. Focus on both internal reflection and external feedback.' },
      high: { range: [3.6, 5], message: 'You demonstrate strong self-awareness. Continue validating self-perceptions with feedback from others.' }
    },
    developmentTips: [
      'Keep a leadership journal to track patterns in your behavior',
      'Ask 3-5 trusted colleagues for candid feedback',
      'Notice gaps between your intentions and your impact on others',
      'Practice asking "What" questions rather than "Why" questions about yourself'
    ]
  },
  
  leadershipSelfEfficacy: {
    id: 'leadership_self_efficacy',
    title: 'Leadership Self-Efficacy',
    subtitle: 'Confidence in your ability to lead',
    description: 'Leadership self-efficacy (LSE) is your confidence in your ability to lead effectively in various situations. Day presents this as a key proximal indicator of development, adapted from Bandura\'s self-efficacy theory.',
    source: 'Day (2024), Table 4.1; Adapted from Schwarzer & Jerusalem General Self-Efficacy Scale',
    timeToComplete: '4-6 minutes',
    instructions: 'Rate how true each statement is for you in leadership situations.',
    scale: ['Not at All True', 'Hardly True', 'Moderately True', 'Exactly True'],
    items: [
      { id: 1, text: 'I can always manage to solve difficult leadership problems if I try hard enough.', dimension: 'persistence' },
      { id: 2, text: 'If someone opposes my leadership, I can find the means and ways to get what I need.', dimension: 'resourcefulness' },
      { id: 3, text: 'It is easy for me to stick to my leadership aims and accomplish my goals.', dimension: 'goal_attainment' },
      { id: 4, text: 'I am confident that I could deal efficiently with unexpected leadership events.', dimension: 'adaptability' },
      { id: 5, text: 'Thanks to my resourcefulness, I know how to handle unforeseen leadership situations.', dimension: 'resourcefulness' },
      { id: 6, text: 'I can solve most leadership problems if I invest the necessary effort.', dimension: 'persistence' },
      { id: 7, text: 'I can remain calm when facing leadership difficulties because I can rely on my coping abilities.', dimension: 'composure' },
      { id: 8, text: 'When I am confronted with a leadership problem, I can usually find several solutions.', dimension: 'problem_solving' },
      { id: 9, text: 'If I am in trouble as a leader, I can usually think of a solution.', dimension: 'problem_solving' },
      { id: 10, text: 'I can usually handle whatever leadership challenges come my way.', dimension: 'general' }
    ],
    interpretation: {
      low: { range: [1, 2], message: 'Building leadership confidence is important. Start with small wins in low-risk situations.' },
      moderate: { range: [2.1, 3], message: 'You have moderate confidence with some situations feeling more challenging. Build efficacy through mastery experiences.' },
      high: { range: [3.1, 4], message: 'You have strong leadership self-efficacy. Use this confidence to take on stretch assignments.' }
    },
    developmentTips: [
      'Seek mastery experiences—successful leadership builds confidence',
      'Find role models who demonstrate effective leadership',
      'Reframe anxiety as excitement before leadership challenges',
      'Celebrate small wins to build a track record of success'
    ]
  }
};

// ============================================================================
// BIG FIVE PERSONALITY ASSESSMENT (From Day, 2024 - Table 2.1)
// Based on IPIP (International Personality Item Pool) - Public Domain
// ============================================================================

const BIG_FIVE_ASSESSMENT = {
  id: 'big_five',
  title: 'Big Five Personality Assessment',
  subtitle: 'Understanding your personality traits',
  description: 'The Big Five is the most scientifically validated personality framework. Day (2024) emphasizes personality assessment as foundational for leader development, helping you understand your natural tendencies and how they affect your leadership.',
  source: 'Day (2024), Table 2.1; Based on IPIP-NEO (Goldberg, 1999)',
  timeToComplete: '10-15 minutes',
  instructions: 'Rate how accurately each statement describes you as you generally are now, not as you wish to be.',
  scale: ['Very Inaccurate', 'Moderately Inaccurate', 'Neither', 'Moderately Accurate', 'Very Accurate'],
  
  factors: [
    {
      id: 'openness',
      name: 'Openness to Experience',
      description: 'Reflects imagination, creativity, intellectual curiosity, and preference for variety.',
      color: 'violet',
      facets: ['Imagination', 'Artistic Interests', 'Emotionality', 'Adventurousness', 'Intellect', 'Liberalism'],
      leadershipImplication: 'High openness supports innovation, vision, and adaptability. May need to balance with practical execution.'
    },
    {
      id: 'conscientiousness',
      name: 'Conscientiousness',
      description: 'Reflects organization, dependability, self-discipline, and achievement orientation.',
      color: 'amber',
      facets: ['Self-Efficacy', 'Orderliness', 'Dutifulness', 'Achievement-Striving', 'Self-Discipline', 'Cautiousness'],
      leadershipImplication: 'High conscientiousness predicts leadership effectiveness. Supports reliability and follow-through.'
    },
    {
      id: 'extraversion',
      name: 'Extraversion',
      description: 'Reflects sociability, assertiveness, positive emotions, and energy from social interaction.',
      color: 'orange',
      facets: ['Friendliness', 'Gregariousness', 'Assertiveness', 'Activity Level', 'Excitement-Seeking', 'Cheerfulness'],
      leadershipImplication: 'Extraversion predicts leadership emergence. Introverts can lead effectively through preparation and selective engagement.'
    },
    {
      id: 'agreeableness',
      name: 'Agreeableness',
      description: 'Reflects cooperation, trust, empathy, and concern for social harmony.',
      color: 'teal',
      facets: ['Trust', 'Morality', 'Altruism', 'Cooperation', 'Modesty', 'Sympathy'],
      leadershipImplication: 'Moderate agreeableness balances collaboration with ability to make tough decisions and give critical feedback.'
    },
    {
      id: 'neuroticism',
      name: 'Emotional Stability',
      description: 'Reflects emotional resilience, stress tolerance, and mood stability. (Scored as stability, not neuroticism)',
      color: 'blue',
      facets: ['Anxiety (R)', 'Anger (R)', 'Depression (R)', 'Self-Consciousness (R)', 'Immoderation (R)', 'Vulnerability (R)'],
      leadershipImplication: 'Emotional stability supports resilience under pressure and consistent leadership presence.'
    }
  ],
  
  items: [
    // OPENNESS (10 items)
    { id: 1, text: 'I have a vivid imagination.', factor: 'openness', facet: 'Imagination', reversed: false },
    { id: 2, text: 'I am not interested in abstract ideas.', factor: 'openness', facet: 'Intellect', reversed: true },
    { id: 3, text: 'I have difficulty understanding abstract ideas.', factor: 'openness', facet: 'Intellect', reversed: true },
    { id: 4, text: 'I enjoy hearing new ideas.', factor: 'openness', facet: 'Intellect', reversed: false },
    { id: 5, text: 'I like to solve complex problems.', factor: 'openness', facet: 'Intellect', reversed: false },
    { id: 6, text: 'I enjoy thinking about things.', factor: 'openness', facet: 'Intellect', reversed: false },
    { id: 7, text: 'I prefer variety to routine.', factor: 'openness', facet: 'Adventurousness', reversed: false },
    { id: 8, text: 'I am open to new experiences.', factor: 'openness', facet: 'Adventurousness', reversed: false },
    { id: 9, text: 'I appreciate art and beauty.', factor: 'openness', facet: 'Artistic Interests', reversed: false },
    { id: 10, text: 'I tend to vote for liberal political candidates.', factor: 'openness', facet: 'Liberalism', reversed: false },
    
    // CONSCIENTIOUSNESS (10 items)
    { id: 11, text: 'I am always prepared.', factor: 'conscientiousness', facet: 'Orderliness', reversed: false },
    { id: 12, text: 'I pay attention to details.', factor: 'conscientiousness', facet: 'Orderliness', reversed: false },
    { id: 13, text: 'I get chores done right away.', factor: 'conscientiousness', facet: 'Self-Discipline', reversed: false },
    { id: 14, text: 'I often forget to put things back in their proper place.', factor: 'conscientiousness', facet: 'Orderliness', reversed: true },
    { id: 15, text: 'I make a mess of things.', factor: 'conscientiousness', facet: 'Orderliness', reversed: true },
    { id: 16, text: 'I follow through on my commitments.', factor: 'conscientiousness', facet: 'Dutifulness', reversed: false },
    { id: 17, text: 'I work hard to achieve my goals.', factor: 'conscientiousness', facet: 'Achievement-Striving', reversed: false },
    { id: 18, text: 'I complete tasks successfully.', factor: 'conscientiousness', facet: 'Self-Efficacy', reversed: false },
    { id: 19, text: 'I shirk my duties.', factor: 'conscientiousness', facet: 'Dutifulness', reversed: true },
    { id: 20, text: 'I think before I act.', factor: 'conscientiousness', facet: 'Cautiousness', reversed: false },
    
    // EXTRAVERSION (10 items)
    { id: 21, text: 'I feel comfortable around people.', factor: 'extraversion', facet: 'Friendliness', reversed: false },
    { id: 22, text: 'I make friends easily.', factor: 'extraversion', facet: 'Friendliness', reversed: false },
    { id: 23, text: 'I am skilled in handling social situations.', factor: 'extraversion', facet: 'Gregariousness', reversed: false },
    { id: 24, text: 'I am the life of the party.', factor: 'extraversion', facet: 'Gregariousness', reversed: false },
    { id: 25, text: 'I keep in the background.', factor: 'extraversion', facet: 'Assertiveness', reversed: true },
    { id: 26, text: 'I have little to say.', factor: 'extraversion', facet: 'Assertiveness', reversed: true },
    { id: 27, text: 'I start conversations.', factor: 'extraversion', facet: 'Assertiveness', reversed: false },
    { id: 28, text: 'I talk to a lot of different people at parties.', factor: 'extraversion', facet: 'Gregariousness', reversed: false },
    { id: 29, text: 'I am full of energy.', factor: 'extraversion', facet: 'Activity Level', reversed: false },
    { id: 30, text: 'I radiate joy.', factor: 'extraversion', facet: 'Cheerfulness', reversed: false },
    
    // AGREEABLENESS (10 items)
    { id: 31, text: 'I am interested in people.', factor: 'agreeableness', facet: 'Friendliness', reversed: false },
    { id: 32, text: 'I sympathize with others\' feelings.', factor: 'agreeableness', facet: 'Sympathy', reversed: false },
    { id: 33, text: 'I have a soft heart.', factor: 'agreeableness', facet: 'Sympathy', reversed: false },
    { id: 34, text: 'I take time out for others.', factor: 'agreeableness', facet: 'Altruism', reversed: false },
    { id: 35, text: 'I feel others\' emotions.', factor: 'agreeableness', facet: 'Sympathy', reversed: false },
    { id: 36, text: 'I make people feel at ease.', factor: 'agreeableness', facet: 'Trust', reversed: false },
    { id: 37, text: 'I am not really interested in others.', factor: 'agreeableness', facet: 'Altruism', reversed: true },
    { id: 38, text: 'I insult people.', factor: 'agreeableness', facet: 'Cooperation', reversed: true },
    { id: 39, text: 'I believe that others have good intentions.', factor: 'agreeableness', facet: 'Trust', reversed: false },
    { id: 40, text: 'I respect others.', factor: 'agreeableness', facet: 'Morality', reversed: false },
    
    // EMOTIONAL STABILITY (Reverse-scored Neuroticism) (10 items)
    { id: 41, text: 'I am relaxed most of the time.', factor: 'neuroticism', facet: 'Anxiety', reversed: false },
    { id: 42, text: 'I seldom feel blue.', factor: 'neuroticism', facet: 'Depression', reversed: false },
    { id: 43, text: 'I get stressed out easily.', factor: 'neuroticism', facet: 'Vulnerability', reversed: true },
    { id: 44, text: 'I worry about things.', factor: 'neuroticism', facet: 'Anxiety', reversed: true },
    { id: 45, text: 'I am easily disturbed.', factor: 'neuroticism', facet: 'Vulnerability', reversed: true },
    { id: 46, text: 'I get upset easily.', factor: 'neuroticism', facet: 'Anger', reversed: true },
    { id: 47, text: 'I change my mood a lot.', factor: 'neuroticism', facet: 'Depression', reversed: true },
    { id: 48, text: 'I have frequent mood swings.', factor: 'neuroticism', facet: 'Depression', reversed: true },
    { id: 49, text: 'I get irritated easily.', factor: 'neuroticism', facet: 'Anger', reversed: true },
    { id: 50, text: 'I often feel blue.', factor: 'neuroticism', facet: 'Depression', reversed: true }
  ],
  
  interpretation: {
    low: { range: [1, 2.5], label: 'Low' },
    moderate: { range: [2.6, 3.5], label: 'Moderate' },
    high: { range: [3.6, 5], label: 'High' }
  }
};

// ============================================================================
// KLI COMPETENCY SELF-ASSESSMENT (From Day, 2024 - Table 2.2)
// Based on Kravis Leadership Institute Competency Model
// ============================================================================

const KLI_COMPETENCY_ASSESSMENT = {
  id: 'kli_competency',
  title: 'KLI Leadership Competency Assessment',
  subtitle: 'Assessing your leadership capabilities',
  description: 'The KLI Competency Model identifies three core competencies (Courage, Creativity, Collaboration), each with three capabilities. This self-assessment helps you identify strengths and development areas across all nine capabilities.',
  source: 'Day (2024), Table 2.2 & Figure 2.2; Kravis Leadership Institute',
  timeToComplete: '12-15 minutes',
  instructions: 'Rate how accurately each statement describes your typical behavior.',
  scale: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
  
  competencies: [
    {
      id: 'courage',
      name: 'Courage',
      color: 'amber',
      description: 'Leading courageously through resilience, entrepreneurial mindset, and responsible action.',
      capabilities: [
        { id: 'resilience', name: 'Resilience', attributes: ['Persistence', 'Adaptability', 'Growth mindset', 'Optimism', 'Emotion management'] },
        { id: 'entrepreneurial', name: 'Entrepreneurial Mindset', attributes: ['Enterprising', 'Resourceful', 'Initiative', 'Bold', 'Challenge-seeking'] },
        { id: 'responsible', name: 'Responsible Action', attributes: ['Insight', 'Modeling', 'Integrity', 'Convictions', 'Advocacy'] }
      ]
    },
    {
      id: 'creativity',
      name: 'Creativity',
      color: 'violet',
      description: 'Leading creatively through innovation, communication, and problem-solving.',
      capabilities: [
        { id: 'innovation', name: 'Innovation', attributes: ['Generating ideas', 'Openness', 'Visioning', 'Challenge status quo', 'Flexibility'] },
        { id: 'communication', name: 'Communication', attributes: ['Expressive', 'Active listening', 'Persuasive', 'Inquiry', 'Dialogue'] },
        { id: 'problemsolving', name: 'Problem Solving', attributes: ['Information seeking', 'Analyzing', 'Anticipating', 'Decision making', 'Solution driven'] }
      ]
    },
    {
      id: 'collaboration',
      name: 'Collaboration',
      color: 'teal',
      description: 'Leading collaboratively through empathy, social learning, and teamwork.',
      capabilities: [
        { id: 'empathy', name: 'Empathy', attributes: ['Perceptive', 'Curious', 'Diversity', 'Inclusive', 'Sensitivity'] },
        { id: 'sociallearning', name: 'Social Learning', attributes: ['Social awareness', 'Engages others', 'Networking', 'Nurturing relationships', 'Situational learning'] },
        { id: 'teamwork', name: 'Teamwork', attributes: ['Participative', 'Accountable', 'Supportive', 'Respectful', 'Conflict management'] }
      ]
    }
  ],
  
  items: [
    // COURAGE - Resilience (6 items)
    { id: 1, text: 'I persist in the face of obstacles and setbacks.', competency: 'courage', capability: 'resilience', attribute: 'Persistence' },
    { id: 2, text: 'I adapt quickly when circumstances change.', competency: 'courage', capability: 'resilience', attribute: 'Adaptability' },
    { id: 3, text: 'I view challenges as opportunities to learn and grow.', competency: 'courage', capability: 'resilience', attribute: 'Growth mindset' },
    { id: 4, text: 'I maintain a positive outlook even in difficult situations.', competency: 'courage', capability: 'resilience', attribute: 'Optimism' },
    { id: 5, text: 'I manage my emotions effectively under pressure.', competency: 'courage', capability: 'resilience', attribute: 'Emotion management' },
    { id: 6, text: 'I bounce back quickly from disappointments.', competency: 'courage', capability: 'resilience', attribute: 'Persistence' },
    
    // COURAGE - Entrepreneurial Mindset (6 items)
    { id: 7, text: 'I actively seek out new opportunities.', competency: 'courage', capability: 'entrepreneurial', attribute: 'Enterprising' },
    { id: 8, text: 'I find creative ways to work with limited resources.', competency: 'courage', capability: 'entrepreneurial', attribute: 'Resourceful' },
    { id: 9, text: 'I take initiative without waiting to be asked.', competency: 'courage', capability: 'entrepreneurial', attribute: 'Initiative' },
    { id: 10, text: 'I am willing to take calculated risks.', competency: 'courage', capability: 'entrepreneurial', attribute: 'Bold' },
    { id: 11, text: 'I embrace challenges rather than avoid them.', competency: 'courage', capability: 'entrepreneurial', attribute: 'Challenge-seeking' },
    { id: 12, text: 'I act on opportunities before others recognize them.', competency: 'courage', capability: 'entrepreneurial', attribute: 'Initiative' },
    
    // COURAGE - Responsible Action (6 items)
    { id: 13, text: 'I understand how my actions affect others.', competency: 'courage', capability: 'responsible', attribute: 'Insight' },
    { id: 14, text: 'I model the behavior I expect from others.', competency: 'courage', capability: 'responsible', attribute: 'Modeling' },
    { id: 15, text: 'I act with integrity even when no one is watching.', competency: 'courage', capability: 'responsible', attribute: 'Integrity' },
    { id: 16, text: 'I stand up for my beliefs even when it\'s unpopular.', competency: 'courage', capability: 'responsible', attribute: 'Convictions' },
    { id: 17, text: 'I speak up about issues that matter.', competency: 'courage', capability: 'responsible', attribute: 'Advocacy' },
    { id: 18, text: 'I take responsibility for my mistakes.', competency: 'courage', capability: 'responsible', attribute: 'Integrity' },
    
    // CREATIVITY - Innovation (6 items)
    { id: 19, text: 'I regularly generate new ideas and approaches.', competency: 'creativity', capability: 'innovation', attribute: 'Generating ideas' },
    { id: 20, text: 'I am open to unconventional solutions.', competency: 'creativity', capability: 'innovation', attribute: 'Openness' },
    { id: 21, text: 'I can articulate a compelling vision of the future.', competency: 'creativity', capability: 'innovation', attribute: 'Visioning' },
    { id: 22, text: 'I question assumptions and the status quo.', competency: 'creativity', capability: 'innovation', attribute: 'Challenge status quo' },
    { id: 23, text: 'I adapt my approach based on new information.', competency: 'creativity', capability: 'innovation', attribute: 'Flexibility' },
    { id: 24, text: 'I connect ideas from different domains.', competency: 'creativity', capability: 'innovation', attribute: 'Generating ideas' },
    
    // CREATIVITY - Communication (6 items)
    { id: 25, text: 'I express my ideas clearly and compellingly.', competency: 'creativity', capability: 'communication', attribute: 'Expressive' },
    { id: 26, text: 'I listen carefully to understand others\' perspectives.', competency: 'creativity', capability: 'communication', attribute: 'Active listening' },
    { id: 27, text: 'I can persuade others to support my ideas.', competency: 'creativity', capability: 'communication', attribute: 'Persuasive' },
    { id: 28, text: 'I ask thoughtful questions to deepen understanding.', competency: 'creativity', capability: 'communication', attribute: 'Inquiry' },
    { id: 29, text: 'I facilitate productive conversations among diverse views.', competency: 'creativity', capability: 'communication', attribute: 'Dialogue' },
    { id: 30, text: 'I tailor my communication style to my audience.', competency: 'creativity', capability: 'communication', attribute: 'Expressive' },
    
    // CREATIVITY - Problem Solving (6 items)
    { id: 31, text: 'I gather relevant information before making decisions.', competency: 'creativity', capability: 'problemsolving', attribute: 'Information seeking' },
    { id: 32, text: 'I analyze situations thoroughly before acting.', competency: 'creativity', capability: 'problemsolving', attribute: 'Analyzing' },
    { id: 33, text: 'I anticipate potential problems before they occur.', competency: 'creativity', capability: 'problemsolving', attribute: 'Anticipating' },
    { id: 34, text: 'I make timely decisions even with incomplete information.', competency: 'creativity', capability: 'problemsolving', attribute: 'Decision making' },
    { id: 35, text: 'I focus on finding solutions rather than assigning blame.', competency: 'creativity', capability: 'problemsolving', attribute: 'Solution driven' },
    { id: 36, text: 'I break complex problems into manageable parts.', competency: 'creativity', capability: 'problemsolving', attribute: 'Analyzing' },
    
    // COLLABORATION - Empathy (6 items)
    { id: 37, text: 'I notice subtle cues about how others are feeling.', competency: 'collaboration', capability: 'empathy', attribute: 'Perceptive' },
    { id: 38, text: 'I am genuinely curious about others\' experiences.', competency: 'collaboration', capability: 'empathy', attribute: 'Curious' },
    { id: 39, text: 'I value diverse perspectives and backgrounds.', competency: 'collaboration', capability: 'empathy', attribute: 'Diversity' },
    { id: 40, text: 'I ensure everyone feels included and heard.', competency: 'collaboration', capability: 'empathy', attribute: 'Inclusive' },
    { id: 41, text: 'I am sensitive to others\' needs and concerns.', competency: 'collaboration', capability: 'empathy', attribute: 'Sensitivity' },
    { id: 42, text: 'I try to understand situations from others\' viewpoints.', competency: 'collaboration', capability: 'empathy', attribute: 'Perceptive' },
    
    // COLLABORATION - Social Learning (6 items)
    { id: 43, text: 'I am aware of social dynamics in groups.', competency: 'collaboration', capability: 'sociallearning', attribute: 'Social awareness' },
    { id: 44, text: 'I actively engage others in learning opportunities.', competency: 'collaboration', capability: 'sociallearning', attribute: 'Engages others' },
    { id: 45, text: 'I build and maintain a strong professional network.', competency: 'collaboration', capability: 'sociallearning', attribute: 'Networking' },
    { id: 46, text: 'I invest in relationships over time.', competency: 'collaboration', capability: 'sociallearning', attribute: 'Nurturing relationships' },
    { id: 47, text: 'I learn from observing others in different situations.', competency: 'collaboration', capability: 'sociallearning', attribute: 'Situational learning' },
    { id: 48, text: 'I seek out people who can help me grow.', competency: 'collaboration', capability: 'sociallearning', attribute: 'Networking' },
    
    // COLLABORATION - Teamwork (6 items)
    { id: 49, text: 'I contribute actively to team efforts.', competency: 'collaboration', capability: 'teamwork', attribute: 'Participative' },
    { id: 50, text: 'I follow through on my commitments to the team.', competency: 'collaboration', capability: 'teamwork', attribute: 'Accountable' },
    { id: 51, text: 'I support my teammates in achieving their goals.', competency: 'collaboration', capability: 'teamwork', attribute: 'Supportive' },
    { id: 52, text: 'I treat all team members with respect.', competency: 'collaboration', capability: 'teamwork', attribute: 'Respectful' },
    { id: 53, text: 'I address conflicts constructively.', competency: 'collaboration', capability: 'teamwork', attribute: 'Conflict management' },
    { id: 54, text: 'I put team success above personal recognition.', competency: 'collaboration', capability: 'teamwork', attribute: 'Supportive' }
  ],
  
  interpretation: {
    low: { range: [1, 2.5], label: 'Development Priority', message: 'This is an area for focused development.' },
    moderate: { range: [2.6, 3.5], label: 'Developing', message: 'You have a foundation to build on.' },
    high: { range: [3.6, 5], label: 'Strength', message: 'This is a strength you can leverage.' }
  }
};

// ============================================================================
// LEARNING ORIENTATION ASSESSMENT (Growth Mindset - Based on Dweck)
// ============================================================================

const LEARNING_ORIENTATION_ASSESSMENT = {
  id: 'learning_orientation',
  title: 'Learning Orientation Assessment',
  subtitle: 'Growth mindset and learning agility',
  description: 'This assessment measures your orientation toward learning and growth. Day (2024) emphasizes that a growth mindset—believing abilities can be developed through effort—is essential for sustained leader development.',
  source: 'Based on Dweck (2006) Mindset research; Day (2024) Chapter 5',
  timeToComplete: '5-7 minutes',
  instructions: 'Rate how much you agree with each statement.',
  scale: ['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Somewhat Agree', 'Agree', 'Strongly Agree'],
  
  items: [
    { id: 1, text: 'Your leadership ability is something you can develop significantly.', dimension: 'growth', reversed: false },
    { id: 2, text: 'You can learn new things, but you can\'t really change your basic leadership ability.', dimension: 'fixed', reversed: true },
    { id: 3, text: 'No matter who you are, you can substantially change your leadership capabilities.', dimension: 'growth', reversed: false },
    { id: 4, text: 'You can always greatly change how much leadership talent you have.', dimension: 'growth', reversed: false },
    { id: 5, text: 'You have a certain amount of leadership ability, and you can\'t do much to change it.', dimension: 'fixed', reversed: true },
    { id: 6, text: 'Leadership skills are mostly something you\'re born with.', dimension: 'fixed', reversed: true },
    { id: 7, text: 'I seek out feedback, even when it might be critical.', dimension: 'behavior', reversed: false },
    { id: 8, text: 'I view mistakes as opportunities to learn.', dimension: 'behavior', reversed: false },
    { id: 9, text: 'I embrace challenges that stretch my abilities.', dimension: 'behavior', reversed: false },
    { id: 10, text: 'I persist when things get difficult.', dimension: 'behavior', reversed: false },
    { id: 11, text: 'I am inspired by others\' success rather than threatened by it.', dimension: 'behavior', reversed: false },
    { id: 12, text: 'I believe effort is the path to mastery.', dimension: 'growth', reversed: false }
  ],
  
  interpretation: {
    low: { range: [1, 3], message: 'You may have a more fixed view of leadership ability. The good news: mindset itself can be developed! Focus on the process of learning, not just outcomes.' },
    moderate: { range: [3.1, 4.5], message: 'You show a mix of fixed and growth mindset thinking. Notice when fixed mindset thoughts arise and challenge them.' },
    high: { range: [4.6, 6], message: 'You have a strong growth mindset. This supports sustained development. Continue embracing challenges and learning from setbacks.' }
  },
  
  developmentTips: [
    'Add "yet" to fixed statements: "I can\'t do this... yet"',
    'Focus on process and effort, not just outcomes',
    'Celebrate learning and growth, not just success',
    'View feedback as a gift, not a threat',
    'Study how experts developed their abilities over time'
  ]
};

// ============================================================================
// LEADER IDENTITY INTERVENTIONS (Comprehensive - 9 Evidence-Based Approaches)
// Based on Day et al. (2021), Ely et al. (2011), Ibarra (1999, 2010), Lord et al. (2017)
// ============================================================================

const LEADER_IDENTITY_INTERVENTIONS = {
  title: 'Leader Identity Development',
  subtitle: 'Building Your Self-Concept as a Leader',
  description: 'Identity motivates the learning and practice that sustains development over time. These interventions help you move from "doing leadership" to "being a leader."',
  assessment: 'leaderIdentity',
  
  categories: [
    {
      id: 'reflective',
      name: 'Reflective Approaches',
      icon: '🪞',
      color: 'violet',
      description: 'Internal work to understand and construct your leader identity through reflection, narrative, and visualization.'
    },
    {
      id: 'experiential',
      name: 'Experiential Learning',
      icon: '🎯',
      color: 'amber',
      description: 'Learning by doing - trying on leadership roles and accumulating evidence of your leadership through action.'
    },
    {
      id: 'social',
      name: 'Social & Relational',
      icon: '👥',
      color: 'teal',
      description: 'Building identity through relationships, feedback, and social validation from others.'
    },
    {
      id: 'coaching',
      name: 'Guided Development',
      icon: '🧭',
      color: 'blue',
      description: 'Structured support from coaches and mentors to develop authentic leadership identity.'
    }
  ],
  
  interventions: [
    // REFLECTIVE APPROACHES
    {
      id: 'identity_reflection',
      title: 'Identity Reflection & Narrative Construction',
      category: 'reflective',
      duration: '2-3 weeks',
      effort: 'moderate',
      format: 'individual',
      mechanism: 'Self-concept integration — connecting personal values with leadership purpose',
      description: 'Guided reflection on your personal leadership journey through writing and storytelling exercises that trace pivotal experiences, values, and turning points.',
      sources: 'Ely et al. (2011); Day et al. (2021)',
      activities: [
        {
          title: 'Leadership Autobiography',
          duration: '60 min',
          instructions: 'Write your leadership story from earliest memory to now. Include: first leadership experience, key turning points, people who shaped your view of leadership, successes and failures, and what leadership means to you today.',
          reflection: 'What themes emerge? What values have been consistent?'
        },
        {
          title: 'Values Excavation',
          duration: '45 min',
          instructions: 'List 10 moments when you felt most alive and engaged. For each, identify what value was being honored. Cluster similar values and identify your top 5 core values.',
          reflection: 'How do these values connect to how you want to lead?'
        },
        {
          title: 'Leadership Timeline',
          duration: '30 min',
          instructions: 'Create a visual timeline of your leadership journey. Mark high points, low points, transitions, and key relationships. Add annotations about what you learned at each stage.',
          reflection: 'What pattern do you see in your development?'
        },
        {
          title: 'Identity Integration Reflection',
          duration: '30 min',
          instructions: 'Write about how "being a leader" connects to your other important identities (professional, family, community). Where do they reinforce each other? Where might they conflict?',
          reflection: 'How can you lead authentically across all parts of your life?'
        }
      ]
    },
    {
      id: 'possible_selves',
      title: 'Leadership Possible Selves',
      category: 'reflective',
      duration: '1-2 weeks',
      effort: 'moderate',
      format: 'individual',
      mechanism: 'Identity motivation and self-regulatory alignment with aspirational leader roles',
      description: 'Envision your future leader self through visualization, vision boards, and narrative exercises that clarify who you want to become.',
      sources: 'Lord et al. (2017); Day et al. (2021)',
      activities: [
        {
          title: 'Three Possible Selves',
          duration: '45 min',
          instructions: 'Describe in detail three versions of your future leader self: (1) Your hoped-for leader self - the best you could become, (2) Your feared leader self - what you want to avoid, (3) Your expected leader self - where you\'ll likely end up. Be specific about behaviors, not titles.',
          reflection: 'What separates your hoped-for self from your expected self?'
        },
        {
          title: 'Letter from Future Self',
          duration: '30 min',
          instructions: 'Write a letter from yourself 5 years in the future. You\'ve become the leader you hoped to be. Describe what you did to get there, what obstacles you overcame, and what advice you have for your present self.',
          reflection: 'What actions could you take now to move toward this future?'
        },
        {
          title: 'Vision Board Creation',
          duration: '60 min',
          instructions: 'Create a visual representation of your leadership vision. Include images, words, and symbols that represent: the leader you want to become, the impact you want to have, and the values you want to embody.',
          reflection: 'What does this vision board reveal about your leadership aspirations?'
        },
        {
          title: 'Gap Analysis',
          duration: '30 min',
          instructions: 'Compare your current leader identity assessment score to your hoped-for self. Identify 3 specific gaps. For each, write one concrete action you could take in the next 30 days.',
          reflection: 'What\'s the smallest step that would make the biggest difference?'
        }
      ]
    },
    
    // EXPERIENTIAL APPROACHES
    {
      id: 'role_experimentation',
      title: 'Role-Based Experimentation',
      category: 'experiential',
      duration: '4-6 weeks',
      effort: 'high',
      format: 'individual',
      mechanism: 'Identity enactment and feedback integration — aligning behavior with self-concept',
      description: 'Safe, structured opportunities to "try on" leadership roles in low-risk settings. Learn by doing and adjust your identity through direct experience.',
      sources: 'Ibarra (1999, 2010); DeRue & Ashford (2010)',
      activities: [
        {
          title: 'Leadership Role Inventory',
          duration: '20 min',
          instructions: 'List all the opportunities you currently have to practice leadership: formal roles, informal opportunities, volunteer positions, community involvement. Rate each by frequency and visibility.',
          reflection: 'Where are the untapped opportunities to practice leading?'
        },
        {
          title: 'Low-Stakes Leadership Challenge',
          duration: '2 weeks',
          instructions: 'Volunteer to lead something small but real: a meeting, a team project, a community initiative, or a social event. Choose something with genuine responsibility but limited consequences if imperfect.',
          reflection: 'What did you learn about yourself as a leader?'
        },
        {
          title: 'Stretch Assignment',
          duration: '4 weeks',
          instructions: 'Take on a leadership challenge that\'s slightly beyond your comfort zone. It should require you to develop a new skill or work with unfamiliar people. Document your experience weekly.',
          reflection: 'How did stretching change your view of what you\'re capable of?'
        },
        {
          title: 'Role Model Experiment',
          duration: '1 week',
          instructions: 'Identify a leader you admire. Study their specific behaviors (not just traits). Choose 2-3 behaviors to try yourself this week. Observe what happens and how it feels.',
          reflection: 'Which behaviors felt natural? Which felt forced? What does that tell you?'
        }
      ]
    },
    {
      id: 'micro_moments',
      title: 'Empowerment-Based Micro-Moments',
      category: 'experiential',
      duration: 'Ongoing',
      effort: 'low',
      format: 'individual',
      mechanism: 'Accumulating identity evidence through small wins that confirm internalized leader identity',
      description: 'Everyday leadership moments that build identity through brief experiences of empowerment, responsibility, and voice. Small wins that add up.',
      sources: 'Damon et al. (2024)',
      activities: [
        {
          title: 'Daily Leadership Spotting',
          duration: '5 min/day',
          instructions: 'At the end of each day, identify one moment where you acted as a leader - influenced someone, made a decision, took initiative, or helped the group. No moment is too small.',
          reflection: 'What made this a leadership moment?'
        },
        {
          title: 'Voice Practice',
          duration: '10 min/week',
          instructions: 'In your next meeting, share one perspective, opinion, or idea you might normally keep to yourself. Speak with conviction while remaining open to feedback.',
          reflection: 'What happened when you used your voice?'
        },
        {
          title: 'Initiative Taking',
          duration: 'As opportunities arise',
          instructions: 'Notice something that needs to be done and do it without being asked. Don\'t wait for permission or assignment. Start small - organizing something, offering help, or solving a minor problem.',
          reflection: 'How did it feel to take initiative? How did others respond?'
        },
        {
          title: 'Micro-Mentoring',
          duration: '15 min/week',
          instructions: 'Help someone else with something you know well - share knowledge, give feedback, or provide guidance. You don\'t need a formal role to develop others.',
          reflection: 'What did you notice about yourself when you were in a helping role?'
        }
      ]
    },
    
    // SOCIAL & RELATIONAL APPROACHES
    {
      id: 'feedback_mirroring',
      title: 'Feedback & Identity Mirroring',
      category: 'social',
      duration: '2-3 weeks',
      effort: 'moderate',
      format: 'individual + others',
      mechanism: 'Building identity coherence through social validation and perspective-taking',
      description: '360° or peer feedback processes that show you how others perceive your leadership, helping you understand identity discrepancies and build coherence.',
      sources: 'Day et al. (2021); Conger (2024)',
      activities: [
        {
          title: 'Leadership Perception Interviews',
          duration: '60 min total',
          instructions: 'Ask 3 people who\'ve seen you in different contexts: "When have you seen me act as a leader? What did I do? What was the impact?" Take notes without defending or explaining.',
          reflection: 'How does others\' view match your self-perception? What surprised you?'
        },
        {
          title: 'Feedback Pattern Analysis',
          duration: '30 min',
          instructions: 'Review all feedback you\'ve received about your leadership in the past year (formal reviews, informal comments, 360 data). Look for themes - what comes up repeatedly?',
          reflection: 'What\'s your leadership reputation? Does it match your intended identity?'
        },
        {
          title: 'Identity Discrepancy Dialogue',
          duration: '45 min',
          instructions: 'Find a trusted colleague. Share your leader identity assessment results and how you see yourself. Ask them to share how they see you. Explore the gaps together without judgment.',
          reflection: 'What explains the discrepancies? What would help close the gap?'
        },
        {
          title: 'Reputation Repair or Enhancement',
          duration: 'Ongoing',
          instructions: 'Based on feedback, identify one aspect of your leadership reputation you want to strengthen or change. Create a plan: What will you do differently? How will you make it visible? How will you know if it\'s working?',
          reflection: 'What\'s the cost of not addressing this? What\'s the benefit of change?'
        }
      ]
    },
    {
      id: 'mentoring_modeling',
      title: 'Mentoring & Relational Modeling',
      category: 'social',
      duration: '3-6 months',
      effort: 'moderate',
      format: 'relational',
      mechanism: 'Identity scaffolding — legitimizing emerging leader selves through relational affirmation',
      description: 'Learning from mentors who share their leadership journeys and guide you through reflective dialogues on leadership meaning, authenticity, and values.',
      sources: 'Ely et al. (2011); Ibarra et al. (2010)',
      activities: [
        {
          title: 'Mentor Identification',
          duration: '30 min',
          instructions: 'List 5 people whose leadership you admire and who might be accessible to you. Consider: formal mentors, informal advisors, peers who are slightly ahead, or leaders you can observe from a distance.',
          reflection: 'What specifically do you want to learn from each person?'
        },
        {
          title: 'Leadership Journey Interview',
          duration: '60 min',
          instructions: 'Ask a mentor to share their leadership journey. Questions: How did you come to see yourself as a leader? What were the key turning points? What mistakes taught you the most? What do you wish you\'d known earlier?',
          reflection: 'What parallels do you see with your own journey?'
        },
        {
          title: 'Reverse Role Model Analysis',
          duration: '30 min',
          instructions: 'Think of someone whose leadership you don\'t want to emulate. What specifically do they do? What values do they seem to hold? This "anti-mentor" analysis clarifies what you stand for by contrast.',
          reflection: 'What does avoiding their approach require of you?'
        },
        {
          title: 'Mentoring Up and Down',
          duration: 'Ongoing',
          instructions: 'While seeking mentorship, also mentor someone else. Teaching leadership helps you internalize it. Find someone earlier in their journey and offer your perspective and support.',
          reflection: 'How does mentoring others strengthen your own identity as a leader?'
        }
      ]
    },
    {
      id: 'social_identity_framing',
      title: 'Social Identity & Inclusive Leadership',
      category: 'social',
      duration: '2-3 weeks',
      effort: 'moderate',
      format: 'individual + group',
      mechanism: 'Inclusive identity integration — challenging stereotypes that constrain leader emergence',
      description: 'Explore how group membership, background, and context shape your leader identity. Challenge limiting beliefs and develop an inclusive leadership approach.',
      sources: 'Ely et al. (2011); Lord et al. (2017)',
      activities: [
        {
          title: 'Identity Inventory',
          duration: '30 min',
          instructions: 'List all your social identities (gender, culture, profession, generation, etc.). For each, write: How has this identity shaped my view of leadership? What stereotypes about leaders from my group have I encountered?',
          reflection: 'Which identities feel like assets for leadership? Which feel like barriers?'
        },
        {
          title: 'Stereotype Challenge',
          duration: '45 min',
          instructions: 'Identify one stereotype about leadership that doesn\'t fit you (e.g., "leaders are extroverted," "leaders are older," "leaders look a certain way"). Find 3 examples of effective leaders who also break this stereotype.',
          reflection: 'How can you lead effectively in your own way?'
        },
        {
          title: 'Leadership Model Expansion',
          duration: '30 min',
          instructions: 'Research leaders from backgrounds different from yours. Look for leaders from underrepresented groups in your field. What can you learn from how they\'ve built their leader identity?',
          reflection: 'How does this expand your definition of what a leader can be?'
        },
        {
          title: 'Context-Shifting Practice',
          duration: '2 weeks',
          instructions: 'Practice leading in a context where your usual identity markers don\'t apply - a different team, community group, or setting where you\'re not already established. Notice how context affects your identity.',
          reflection: 'What did you learn about yourself in an unfamiliar context?'
        }
      ]
    },
    
    // COACHING & GUIDED DEVELOPMENT
    {
      id: 'authenticity_coaching',
      title: 'Coaching for Authenticity & Values',
      category: 'coaching',
      duration: '4-8 weeks',
      effort: 'high',
      format: 'individual + coach',
      mechanism: 'Fostering identity authenticity and sustained confidence in leader self-concept',
      description: 'One-on-one or guided exploration focusing on values clarification, purpose articulation, and congruence between personal beliefs and leader role expectations.',
      sources: 'Conger (2024); Day et al. (2021)',
      activities: [
        {
          title: 'Values Clarification Deep Dive',
          duration: '60 min',
          instructions: 'Work through a values card sort or guided reflection. Identify your top 5 non-negotiable values. For each, describe: a time you honored it, a time you violated it, and how it shows up in your leadership.',
          reflection: 'Are you currently leading in alignment with these values?'
        },
        {
          title: 'Purpose Statement Development',
          duration: '45 min',
          instructions: 'Answer: Why do you want to lead? What impact do you want to have? What would be missing if you didn\'t lead? Draft a leadership purpose statement in 2-3 sentences.',
          reflection: 'Does this purpose feel authentic and motivating?'
        },
        {
          title: 'Authenticity Audit',
          duration: '30 min',
          instructions: 'Review your past week of leadership behavior. Where did you feel authentic? Where did you feel like you were wearing a mask or playing a role that didn\'t fit? What triggered the inauthenticity?',
          reflection: 'What conditions help you lead more authentically?'
        },
        {
          title: 'Congruence Action Plan',
          duration: '30 min',
          instructions: 'Identify one area where there\'s a gap between your values and your current leadership behavior. Create a specific plan: What will you do differently? What support do you need? How will you hold yourself accountable?',
          reflection: 'What\'s the cost of continued incongruence? What\'s possible with alignment?'
        }
      ]
    },
    {
      id: 'identity_transitions',
      title: 'Identity Transition Support',
      category: 'coaching',
      duration: '6-12 weeks',
      effort: 'high',
      format: 'individual + support system',
      mechanism: 'Aids identity redefinition during career thresholds, reducing derailment risk',
      description: 'Structured support for major leadership transitions - new roles, promotions, or career changes. Helps you redefine your identity while maintaining authenticity.',
      sources: 'Conger (2024); DeRue & Ashford (2010)',
      activities: [
        {
          title: 'Transition Mapping',
          duration: '30 min',
          instructions: 'If you\'re approaching or in a transition, map it: What\'s changing about your role, scope, relationships, and visibility? What parts of your old identity do you want to keep? What needs to evolve?',
          reflection: 'What feels exciting about this transition? What feels threatening?'
        },
        {
          title: 'First 90 Days Identity Plan',
          duration: '45 min',
          instructions: 'Plan how you\'ll establish your leader identity in a new context. Consider: How will you introduce yourself? What reputation do you want to build? What early wins will demonstrate your leadership?',
          reflection: 'How will you balance proving yourself with staying authentic?'
        },
        {
          title: 'Support System Activation',
          duration: '30 min',
          instructions: 'Identify 3-5 people who can support your identity through this transition: a thought partner, an emotional supporter, a practical advisor, and someone who can provide honest feedback.',
          reflection: 'What specific support do you need from each person?'
        },
        {
          title: 'Identity Anchor Identification',
          duration: '20 min',
          instructions: 'What aspects of your leader identity are constant regardless of context? These are your "identity anchors." Write them down and commit to maintaining them through the transition.',
          reflection: 'How will these anchors help you stay grounded during change?'
        }
      ]
    }
  ]
};

// ============================================================================
// LEADER DEVELOPMENT INTERVENTIONS (Individual Level - Human Capital)
// Based on Day (2024) Chapters 3-5
// ============================================================================

const LEADER_DEVELOPMENT = {
  title: 'Leader Development',
  subtitle: 'Building Individual Human Capital',
  description: 'Leader development focuses on expanding the capacity of individuals to be effective in leadership roles and processes. It targets intrapersonal competence through self-awareness, self-regulation, and self-motivation.',
  source: 'Day (2024), Chapters 3-5',
  
  proximalOutcomes: [
    { id: 'identity', name: 'Leader Identity', description: 'Seeing yourself as a leader', assessment: 'leaderIdentity' },
    { id: 'awareness', name: 'Self-Awareness', description: 'Understanding your impact', assessment: 'selfAwareness' },
    { id: 'efficacy', name: 'Leadership Self-Efficacy', description: 'Confidence to lead', assessment: 'leadershipSelfEfficacy' }
  ],
  
  distalOutcomes: [
    { id: 'meaning', name: 'Leadership Meaning', description: 'How you make sense of leadership' },
    { id: 'moral', name: 'Moral Development', description: 'Ethical reasoning and judgment' },
    { id: 'epistemic', name: 'Epistemic Cognition', description: 'How you know what you know' }
  ],
  
  interventions: [
    {
      id: 'identity_work',
      title: 'Leader Identity Development',
      targetOutcome: 'identity',
      duration: '4-6 weeks',
      description: 'Structured activities to strengthen your sense of self as a leader through identity claiming, granting, and integration.',
      researchBasis: 'Based on Day & Harrison (2007) identity-based approach to leader development, and Ibarra\'s (2015) work on acting into new identities.',
      phases: [
        {
          phase: 1,
          title: 'Identity Awareness',
          duration: 'Week 1-2',
          overview: 'Before you can develop your leader identity, you need to understand where you currently are and what has shaped your self-concept.',
          activities: [
            {
              title: 'Complete Leader Identity Assessment',
              duration: '10 minutes',
              instructions: 'Take the Leader Identity assessment in this app. Record your overall score and note which items you rated lowest.',
              reflection: 'What does your score tell you about how strongly you currently see yourself as a leader?'
            },
            {
              title: 'Write Your Leadership Autobiography',
              duration: '45 minutes',
              instructions: 'Write 2-3 pages describing key moments that shaped your view of yourself as a leader (or non-leader). Include: earliest leadership memory, a time you succeeded as a leader, a time you failed or avoided leadership, people who influenced how you see yourself.',
              reflection: 'What patterns do you notice? What stories do you tell yourself about your leadership?'
            },
            {
              title: 'Interview Someone Who Sees You as a Leader',
              duration: '30 minutes',
              instructions: 'Ask someone who has seen you lead: "When have you seen me act as a leader? What did I do? What impact did it have?" Take notes without defending or explaining.',
              reflection: 'How does their perception match or differ from your self-perception?'
            },
            {
              title: 'Map Your Possible Selves',
              duration: '30 minutes',
              instructions: 'Draw or describe three versions of yourself as a leader: (1) Your hoped-for leader self in 5 years, (2) Your feared leader self, (3) Your expected leader self. Be specific about behaviors, not just titles.',
              reflection: 'What separates your hoped-for self from your expected self? What would it take to close that gap?'
            }
          ]
        },
        {
          phase: 2,
          title: 'Identity Claiming',
          duration: 'Week 3-4',
          overview: 'Identity develops through action, not just reflection. You become a leader by doing leader-like things and having others recognize you as a leader.',
          activities: [
            {
              title: 'Take on an Informal Leadership Role',
              duration: 'Ongoing',
              instructions: 'Volunteer to lead something small: a meeting, a project, a discussion, a social event. Choose something with low stakes but real responsibility.',
              reflection: 'How did it feel to step into the role? How did others respond to you?'
            },
            {
              title: 'Introduce Yourself as a Leader',
              duration: '5 minutes per instance',
              instructions: 'In a new context (networking event, new team, social situation), include leadership in how you describe yourself. Example: "I lead the X initiative" or "I\'m developing as a leader in Y area."',
              reflection: 'What happens when you claim the leader label? Does it feel authentic or forced?'
            },
            {
              title: 'Share a Leadership Opinion',
              duration: '15 minutes',
              instructions: 'In a meeting or discussion, share a perspective on direction, strategy, or how the team should proceed. Don\'t wait to be asked. Speak with conviction while remaining open to other views.',
              reflection: 'What was the response? How did it feel to express a leadership point of view?'
            },
            {
              title: 'Lead a Small Initiative',
              duration: '2-4 weeks',
              instructions: 'Propose and lead a small improvement project. It should be something you care about, that benefits others, and that you can complete in 2-4 weeks.',
              reflection: 'What did you learn about yourself as a leader through this initiative?'
            }
          ]
        },
        {
          phase: 3,
          title: 'Identity Integration',
          duration: 'Week 5-6',
          overview: 'The goal is not just to claim a leader identity, but to integrate it with your other identities so it feels authentic and sustainable.',
          activities: [
            {
              title: 'Reflect on Identity Fit',
              duration: '30 minutes',
              instructions: 'Write about how "being a leader" fits with other important identities (parent, professional, community member, etc.). Where do they reinforce each other? Where might they conflict?',
              reflection: 'How can you be a leader in a way that\'s consistent with who you are?'
            },
            {
              title: 'Gather Feedback on Your Emergence',
              duration: '30 minutes',
              instructions: 'Ask 3 people: "Have you noticed any changes in how I show up as a leader recently? What have you observed?" Listen without defending.',
              reflection: 'Are others noticing your identity shift? What are they seeing?'
            },
            {
              title: 'Retake Leader Identity Assessment',
              duration: '10 minutes',
              instructions: 'Take the Leader Identity assessment again. Compare your scores to your baseline from Phase 1.',
              reflection: 'What changed? What might account for any shifts?'
            },
            {
              title: 'Craft Your Leader Identity Statement',
              duration: '45 minutes',
              instructions: 'Write a 1-paragraph statement that captures who you are as a leader. Include: your leadership values, how you lead, what you\'re developing, and why leadership matters to you.',
              reflection: 'Does this statement feel true? How might you live into it more fully?'
            }
          ]
        }
      ]
    },
    {
      id: 'self_awareness_360',
      title: 'Self-Awareness Through Feedback',
      targetOutcome: 'awareness',
      duration: '3-4 weeks',
      description: 'Develop accurate self-awareness by systematically gathering and integrating feedback from multiple sources.',
      researchBasis: 'Based on Eurich (2017) research distinguishing internal and external self-awareness, and 360-feedback best practices from CCL.',
      phases: [
        {
          phase: 1,
          title: 'Self-Assessment',
          duration: 'Week 1',
          overview: 'Start by documenting your own perceptions before gathering external feedback. This creates a baseline for comparison.',
          activities: [
            {
              title: 'Complete Self-Awareness Assessment',
              duration: '15 minutes',
              instructions: 'Take the Self-Awareness assessment in this app. Note your scores on internal vs. external self-awareness.',
              reflection: 'Which dimension is stronger for you? What specific areas feel less clear?'
            },
            {
              title: 'Self-Rate on KLI Competencies',
              duration: '20 minutes',
              instructions: 'Rate yourself 1-5 on each of the 9 KLI capabilities (Resilience, Entrepreneurial Mindset, Responsible Action, Innovation, Communication, Problem-Solving, Empathy, Social Learning, Teamwork). Write a sentence justifying each rating.',
              reflection: 'Which ratings were easiest to make? Which were hardest? What does that tell you?'
            },
            {
              title: 'Document Perceived Strengths & Weaknesses',
              duration: '20 minutes',
              instructions: 'List your top 3 leadership strengths and top 3 development areas. For each, write a specific example that illustrates it.',
              reflection: 'How confident are you in this assessment? What evidence is it based on?'
            },
            {
              title: 'Articulate Your Leadership Values',
              duration: '30 minutes',
              instructions: 'Identify your top 5 leadership values (e.g., integrity, collaboration, excellence). For each, write what it means to you and how you try to live it.',
              reflection: 'Do others know these are your values? Would they say you live them consistently?'
            }
          ]
        },
        {
          phase: 2,
          title: 'Other-Assessment',
          duration: 'Week 2',
          overview: 'Now gather external perspectives to compare against your self-assessment.',
          activities: [
            {
              title: 'Request Peer Ratings',
              duration: '1 hour (gathering)',
              instructions: 'Ask 5+ colleagues to rate you on the same KLI capabilities you self-rated. Use a simple survey or have conversations. Include people who work with you in different contexts.',
              reflection: 'Was it hard to ask? How did people respond to the request?'
            },
            {
              title: 'Conduct Feedforward Conversations',
              duration: '20 minutes each',
              instructions: 'With 3 people, use the "feedforward" approach: "I\'m working on X. What suggestions do you have for how I could be more effective?" Focus on future, not past.',
              reflection: 'What suggestions came up repeatedly? What surprised you?'
            },
            {
              title: 'Observe How Others Respond to You',
              duration: 'Ongoing',
              instructions: 'For one week, consciously notice how others react to you. When do they lean in? Pull back? Who seeks you out vs. avoids you?',
              reflection: 'What patterns do you notice? What might be causing these reactions?'
            },
            {
              title: 'Request Specific Behavioral Examples',
              duration: '15 minutes each',
              instructions: 'With 2-3 people, ask: "Can you give me a specific example of when I demonstrated [strength]? And when I could have been better at [development area]?"',
              reflection: 'How do specific examples land differently than general feedback?'
            }
          ]
        },
        {
          phase: 3,
          title: 'Gap Analysis & Action',
          duration: 'Week 3-4',
          overview: 'The power of feedback comes from identifying gaps between self-perception and others\' perception, then taking action.',
          activities: [
            {
              title: 'Compare Self vs. Other Ratings',
              duration: '30 minutes',
              instructions: 'Create a simple chart comparing your self-ratings to others\' ratings on each capability. Calculate the gap (self minus other).',
              reflection: 'Where are the biggest gaps? Do you over-estimate or under-estimate yourself?'
            },
            {
              title: 'Identify Blind Spots',
              duration: '20 minutes',
              instructions: 'Blind spots = others see it, you don\'t. Look for capabilities where others rated you lower than you rated yourself. These are areas where you may be unaware of your impact.',
              reflection: 'Why might you have these blind spots? What would help you see more clearly?'
            },
            {
              title: 'Identify Hidden Strengths',
              duration: '20 minutes',
              instructions: 'Hidden strengths = others see it, you undervalue it. Look for capabilities where others rated you higher than you rated yourself.',
              reflection: 'Why might you undervalue these strengths? How could you leverage them more?'
            },
            {
              title: 'Create Development Action Plan',
              duration: '45 minutes',
              instructions: 'Pick your top 1-2 gaps to address. For each, write: (1) What specifically will you do differently? (2) How will you get ongoing feedback? (3) How will you know you\'ve improved?',
              reflection: 'What support do you need to make these changes? Who can help?'
            }
          ]
        }
      ]
    },
    {
      id: 'efficacy_building',
      title: 'Building Leadership Confidence',
      targetOutcome: 'efficacy',
      duration: '6-8 weeks',
      description: 'Systematically build leadership self-efficacy through mastery experiences, vicarious learning, and cognitive reframing.',
      researchBasis: 'Based on Bandura\'s (1997) four sources of self-efficacy: mastery experiences, vicarious learning, verbal persuasion, and physiological states.',
      phases: [
        {
          phase: 1,
          title: 'Mastery Experiences',
          duration: 'Week 1-3',
          overview: 'The most powerful source of self-efficacy is your own experience of success. Start small and build progressively.',
          activities: [
            {
              title: 'Audit Past Leadership Successes',
              duration: '30 minutes',
              instructions: 'List 5-10 times you successfully influenced, guided, or led others. Include informal leadership. For each, note what you did and what made it work.',
              reflection: 'What patterns do you see? What conditions help you lead successfully?'
            },
            {
              title: 'Identify Low-Risk Opportunities',
              duration: '20 minutes',
              instructions: 'List 5 upcoming opportunities to practice leadership where the stakes are relatively low. Prioritize by: likelihood of success AND developmental value.',
              reflection: 'Which opportunity offers the best balance of likely success and meaningful challenge?'
            },
            {
              title: 'Set a Progressive Challenge Ladder',
              duration: '30 minutes',
              instructions: 'Create a "ladder" of 5 leadership challenges, from easiest to hardest. Your goal is to succeed at each level before moving up. Level 1 should feel achievable; Level 5 should feel like a stretch.',
              reflection: 'What does success look like at each level? How will you know you\'re ready to move up?'
            },
            {
              title: 'Document Your Wins',
              duration: '10 minutes daily',
              instructions: 'Each day for three weeks, write down one leadership "win" - any moment where you successfully influenced or guided others, no matter how small.',
              reflection: 'After three weeks, what patterns do you notice? How does documenting wins affect your confidence?'
            }
          ]
        },
        {
          phase: 2,
          title: 'Vicarious Learning',
          duration: 'Week 4-5',
          overview: 'Watching similar others succeed ("If they can do it, maybe I can too") builds efficacy without the risk of personal failure.',
          activities: [
            {
              title: 'Identify a Leadership Role Model',
              duration: '20 minutes',
              instructions: 'Choose someone whose leadership you admire who is similar enough to you that you could imagine being like them. Ideally, someone you can observe directly.',
              reflection: 'What specifically do you admire? What makes you believe you could develop similar capabilities?'
            },
            {
              title: 'Shadow or Observe Effective Leaders',
              duration: '2-3 hours total',
              instructions: 'Observe your role model (or other effective leaders) in action. Attend their meetings, watch how they handle challenges, notice their micro-behaviors.',
              reflection: 'What do they do that you could do? What seems beyond your reach for now?'
            },
            {
              title: 'Analyze Their Effectiveness',
              duration: '30 minutes',
              instructions: 'Interview your role model: "What makes you effective as a leader? What was hardest to learn? What mistakes did you make along the way?"',
              reflection: 'What did you learn about the path to their effectiveness? What\'s encouraging? What\'s daunting?'
            },
            {
              title: 'Adapt One Approach',
              duration: 'Ongoing',
              instructions: 'Choose one specific behavior or approach from your role model that you want to adopt. Practice it in your own context, adapting it to your style.',
              reflection: 'How did it work when you tried it? What adjustments did you need to make?'
            }
          ]
        },
        {
          phase: 3,
          title: 'Verbal Persuasion & Arousal Management',
          duration: 'Week 6-8',
          overview: 'What others say about you and how you manage your physiological state both affect your confidence.',
          activities: [
            {
              title: 'Seek Encouragement Strategically',
              duration: '30 minutes',
              instructions: 'Identify 2-3 people who believe in your leadership potential. Ask them: "What leadership strengths do you see in me? Why do you think I can grow as a leader?"',
              reflection: 'How does hearing their confidence in you affect your own confidence?'
            },
            {
              title: 'Reframe Anxiety as Excitement',
              duration: 'Practice before each challenge',
              instructions: 'Before leadership challenges, notice your anxiety. Say to yourself: "I\'m feeling excited" instead of "I\'m feeling anxious." The physiological state is similar; the interpretation matters.',
              reflection: 'Does reframing change your experience? Your performance?'
            },
            {
              title: 'Develop a Pre-Performance Routine',
              duration: '45 minutes to design, then ongoing',
              instructions: 'Create a short routine (3-5 minutes) to do before important leadership moments. Include: breathing, posture, visualization, and a confidence anchor (phrase or gesture).',
              reflection: 'What elements work best for you? How does having a routine affect your readiness?'
            },
            {
              title: 'Visualize Successful Leadership',
              duration: '10 minutes daily',
              instructions: 'Spend 10 minutes visualizing yourself succeeding in an upcoming leadership situation. See yourself being calm, capable, and effective. Include sensory detail.',
              reflection: 'How does visualization affect your confidence going into real situations?'
            }
          ]
        }
      ]
    },
    {
      id: 'deliberate_practice',
      title: 'Deliberate Leadership Practice',
      targetOutcome: 'skills',
      duration: 'Ongoing',
      description: 'Apply principles of deliberate practice to systematically develop leadership skills beyond your current level.',
      researchBasis: 'Based on Ericsson\'s deliberate practice research and its application to leadership by Day (2010).',
      phases: [
        {
          phase: 1,
          title: 'Skill Selection',
          duration: 'Week 1',
          overview: 'Deliberate practice requires focused attention on a specific skill, practiced at the edge of your current ability.',
          activities: [
            {
              title: 'Review Your Development Needs',
              duration: '20 minutes',
              instructions: 'Review your self-awareness work, feedback, and assessments. Identify 3-5 specific skills that are important for your leadership effectiveness and are currently underdeveloped.',
              reflection: 'Which skill, if improved, would have the biggest impact on your effectiveness?'
            },
            {
              title: 'Define "Good" Performance',
              duration: '30 minutes',
              instructions: 'For your chosen skill, define what excellent looks like. Find examples, models, or descriptions. Write specific behavioral indicators of skill mastery.',
              reflection: 'How will you know when you\'ve improved? What would others observe?'
            },
            {
              title: 'Assess Your Current Level',
              duration: '20 minutes',
              instructions: 'Honestly assess your current level on the skill. Where are you on a 1-10 scale? What specific aspects are weakest?',
              reflection: 'What\'s the gap between current and desired? Which aspects need most work?'
            },
            {
              title: 'Set a Stretch Goal',
              duration: '15 minutes',
              instructions: 'Set a specific, measurable goal for improving this skill in the next month. It should be challenging but achievable with focused effort.',
              reflection: 'Is this goal stretching you beyond your comfort zone? Is it realistic?'
            }
          ]
        },
        {
          phase: 2,
          title: 'Focused Practice',
          duration: 'Week 2-4',
          overview: 'Deliberate practice means practicing with full attention, getting immediate feedback, and making adjustments.',
          activities: [
            {
              title: 'Create Practice Opportunities',
              duration: 'Ongoing',
              instructions: 'Identify or create opportunities to practice your target skill. Don\'t wait for them to happen naturally. Seek out or manufacture chances to practice.',
              reflection: 'How can you increase your "reps" on this skill? What opportunities are you missing?'
            },
            {
              title: 'Practice with Full Attention',
              duration: 'During each practice',
              instructions: 'When practicing, give full attention to your performance. Notice what you\'re doing, how it\'s landing, what\'s working and not working.',
              reflection: 'What did you notice during this practice? What would you do differently?'
            },
            {
              title: 'Get Immediate Feedback',
              duration: 'After each practice',
              instructions: 'After each practice attempt, get feedback as quickly as possible. Ask observers, check results, or record and review yourself.',
              reflection: 'What feedback did you receive? What does it tell you about what to adjust?'
            },
            {
              title: 'Make Micro-Adjustments',
              duration: 'Ongoing',
              instructions: 'Based on feedback, make small adjustments to your approach. Don\'t try to change everything at once. Focus on one element at a time.',
              reflection: 'What adjustment made the biggest difference? What should you try next?'
            }
          ]
        },
        {
          phase: 3,
          title: 'Integration & Advancement',
          duration: 'Week 5+',
          overview: 'Once basic skill improves, apply it in more varied contexts and increase the challenge level.',
          activities: [
            {
              title: 'Apply in Varied Contexts',
              duration: 'Ongoing',
              instructions: 'Practice your skill in different situations, with different people, under different conditions. This builds flexibility and robustness.',
              reflection: 'How does your skill hold up in different contexts? Where does it break down?'
            },
            {
              title: 'Increase Challenge Level',
              duration: 'Ongoing',
              instructions: 'As you improve, seek more challenging applications. Higher stakes, more complex situations, less favorable conditions.',
              reflection: 'What happens when you increase the challenge? Where are your new edges?'
            },
            {
              title: 'Coach Others on the Skill',
              duration: '30+ minutes',
              instructions: 'Teaching others deepens your own understanding. Find someone working on a similar skill and coach them through an aspect of it.',
              reflection: 'What did you learn from teaching? What gaps in your understanding did it reveal?'
            },
            {
              title: 'Select Next Skill',
              duration: '20 minutes',
              instructions: 'When you\'ve made meaningful progress, select your next skill focus and begin the cycle again.',
              reflection: 'What did you learn from this deliberate practice cycle that you\'ll apply to the next one?'
            }
          ]
        }
      ]
    }
  ]
};

// ============================================================================
// LEADERSHIP DEVELOPMENT INTERVENTIONS (Collective Level - Social Capital)
// Based on Day (2024) Chapters 6-7
// ============================================================================

const LEADERSHIP_DEVELOPMENT = {
  title: 'Leadership Development',
  subtitle: 'Building Collective Social Capital',
  description: 'Leadership development focuses on expanding the collective capacity of organizational members to engage effectively in leadership roles and processes. It builds interpersonal competence and social capital.',
  source: 'Day (2024), Chapters 6-7',
  
  proximalOutcomes: [
    { id: 'safety', name: 'Psychological Safety', description: 'Team climate for risk-taking', assessment: 'psychologicalSafety' },
    { id: 'mental_models', name: 'Shared Mental Models', description: 'Aligned understanding', assessment: null },
    { id: 'collective_efficacy', name: 'Collective Efficacy', description: 'Team confidence', assessment: 'collectiveEfficacy' }
  ],
  
  distalOutcomes: [
    { id: 'macrocognition', name: 'Macrocognition', description: 'Collective thinking and sense-making' },
    { id: 'dynamic_capability', name: 'Dynamic Capabilities', description: 'Ability to adapt and reconfigure' },
    { id: 'complexity', name: 'Requisite Complexity', description: 'Matching environmental complexity' }
  ],
  
  interventions: [
    {
      id: 'psych_safety',
      title: 'Building Psychological Safety',
      targetOutcome: 'safety',
      duration: '4-6 weeks',
      description: 'Create an environment where team members feel safe to take interpersonal risks, speak up, and learn from mistakes.',
      phases: [
        {
          phase: 1,
          title: 'Assessment & Awareness',
          duration: 'Week 1-2',
          activities: [
            'Have team complete Psychological Safety survey',
            'Discuss results openly with the team',
            'Identify specific behaviors that help/hurt safety',
            'Agree on one improvement focus'
          ]
        },
        {
          phase: 2,
          title: 'Leader Modeling',
          duration: 'Week 3-4',
          activities: [
            'Leader shares a personal mistake and learning',
            'Express appreciation for dissenting views',
            'Ask questions more than give answers',
            'Respond constructively to bad news'
          ]
        },
        {
          phase: 3,
          title: 'Team Practices',
          duration: 'Week 5-6',
          activities: [
            'Establish "no interruption" norms',
            'Practice "yes, and" instead of "yes, but"',
            'Conduct blameless post-mortems',
            'Celebrate learning from failure'
          ]
        }
      ]
    },
    {
      id: 'shared_models',
      title: 'Developing Shared Mental Models',
      targetOutcome: 'mental_models',
      duration: '3-4 weeks',
      description: 'Align team understanding of goals, roles, processes, and how you work together effectively.',
      phases: [
        {
          phase: 1,
          title: 'Mapping Current Models',
          duration: 'Week 1',
          activities: [
            'Have each person diagram "how we work"',
            'Compare diagrams to identify differences',
            'Discuss assumptions behind each model',
            'Identify critical alignment gaps'
          ]
        },
        {
          phase: 2,
          title: 'Building Shared Understanding',
          duration: 'Week 2-3',
          activities: [
            'Co-create a team operating model',
            'Define clear roles and decision rights',
            'Establish shared vocabulary',
            'Document "how we do things here"'
          ]
        },
        {
          phase: 3,
          title: 'Maintaining Alignment',
          duration: 'Week 4+',
          activities: [
            'Regular check-ins on alignment',
            'Update models when things change',
            'Onboard new members to shared models',
            'Periodically stress-test assumptions'
          ]
        }
      ]
    },
    {
      id: 'network_development',
      title: 'Leadership Network Development',
      targetOutcome: 'network',
      duration: '6-8 weeks',
      description: 'Intentionally build and leverage social networks that enable collective leadership capacity.',
      phases: [
        {
          phase: 1,
          title: 'Network Mapping',
          duration: 'Week 1-2',
          activities: [
            'Map your current leadership network',
            'Identify who provides: advice, support, information',
            'Find structural holes and gaps',
            'Assess network density and diversity'
          ]
        },
        {
          phase: 2,
          title: 'Strategic Networking',
          duration: 'Week 3-5',
          activities: [
            'Identify 3-5 relationships to develop',
            'Schedule connection conversations',
            'Bridge across silos intentionally',
            'Give before you ask'
          ]
        },
        {
          phase: 3,
          title: 'Network Maintenance',
          duration: 'Week 6-8',
          activities: [
            'Establish regular touchpoints',
            'Look for ways to add value to others',
            'Connect people in your network to each other',
            'Re-map network to track changes'
          ]
        }
      ]
    },
    {
      id: 'collective_efficacy_building',
      title: 'Building Collective Efficacy',
      targetOutcome: 'collective_efficacy',
      duration: '4-6 weeks',
      description: 'Develop the team\'s shared belief in their collective ability to achieve goals and overcome challenges.',
      phases: [
        {
          phase: 1,
          title: 'Establishing Baseline',
          duration: 'Week 1',
          activities: [
            'Assess current collective efficacy beliefs',
            'Discuss team\'s past successes',
            'Identify what the team does well together',
            'Surface doubts and concerns'
          ]
        },
        {
          phase: 2,
          title: 'Mastery Experiences',
          duration: 'Week 2-4',
          activities: [
            'Set challenging but achievable team goals',
            'Celebrate collective wins visibly',
            'Attribute success to team effort',
            'Document "how we did it" stories'
          ]
        },
        {
          phase: 3,
          title: 'Sustaining Efficacy',
          duration: 'Week 5-6',
          activities: [
            'Reference past successes when facing challenges',
            'Avoid attributing failure to the team',
            'Build resilience through managed setbacks',
            'Reassess collective efficacy beliefs'
          ]
        }
      ]
    }
  ]
};

// ============================================================================
// COLLECTIVE ASSESSMENTS (From Day, 2024 - Chapter 6)
// ============================================================================

const COLLECTIVE_ASSESSMENTS = {
  psychologicalSafety: {
    id: 'psychological_safety',
    title: 'Team Psychological Safety',
    subtitle: 'Based on Edmondson\'s research',
    description: 'Psychological safety is a shared belief that the team is safe for interpersonal risk-taking. It enables learning, innovation, and honest communication.',
    source: 'Day (2024), Chapter 6; Edmondson (1999)',
    timeToComplete: '3-4 minutes',
    instructions: 'Rate how accurately each statement describes your team.',
    scale: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    items: [
      { id: 1, text: 'If you make a mistake on this team, it is often held against you.', dimension: 'safety', reversed: true },
      { id: 2, text: 'Members of this team are able to bring up problems and tough issues.', dimension: 'safety', reversed: false },
      { id: 3, text: 'People on this team sometimes reject others for being different.', dimension: 'safety', reversed: true },
      { id: 4, text: 'It is safe to take a risk on this team.', dimension: 'safety', reversed: false },
      { id: 5, text: 'It is difficult to ask other members of this team for help.', dimension: 'safety', reversed: true },
      { id: 6, text: 'No one on this team would deliberately act in a way that undermines my efforts.', dimension: 'safety', reversed: false },
      { id: 7, text: 'Working with members of this team, my unique skills and talents are valued and utilized.', dimension: 'safety', reversed: false }
    ],
    interpretation: {
      low: { range: [1, 2.5], message: 'Your team may need to focus on building psychological safety. Consider discussing these results openly.' },
      moderate: { range: [2.6, 3.5], message: 'Your team has moderate safety with room to strengthen trust and openness.' },
      high: { range: [3.6, 5], message: 'Your team demonstrates strong psychological safety. This enables learning and innovation.' }
    }
  },
  
  collectiveEfficacy: {
    id: 'collective_efficacy',
    title: 'Collective Leadership Efficacy',
    subtitle: 'Team confidence in leading together',
    description: 'Collective efficacy is the shared belief in a team\'s capability to organize and execute actions required to achieve collective goals.',
    source: 'Day (2024), Chapter 6; Based on Bandura (1997)',
    timeToComplete: '4-5 minutes',
    instructions: 'Rate your team\'s collective capability.',
    scale: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    items: [
      { id: 1, text: 'Our team can effectively set direction together.', dimension: 'direction' },
      { id: 2, text: 'Our team coordinates well to achieve our goals.', dimension: 'alignment' },
      { id: 3, text: 'Team members are genuinely committed to our shared goals.', dimension: 'commitment' },
      { id: 4, text: 'We can handle complex challenges as a team.', dimension: 'capability' },
      { id: 5, text: 'Leadership is shared appropriately across our team.', dimension: 'distribution' },
      { id: 6, text: 'We adapt our leadership approach based on the situation.', dimension: 'adaptability' },
      { id: 7, text: 'Our team learns from both successes and failures.', dimension: 'learning' },
      { id: 8, text: 'We trust each other to lead when needed.', dimension: 'trust' }
    ],
    interpretation: {
      low: { range: [1, 2.5], message: 'Building collective confidence through shared wins could strengthen your team.' },
      moderate: { range: [2.6, 3.5], message: 'Your team has moderate collective efficacy. Focus on building through mastery experiences.' },
      high: { range: [3.6, 5], message: 'Your team has strong collective efficacy. This enables tackling ambitious challenges together.' }
    }
  }
};

// ============================================================================
// ICONS
// ============================================================================

const Icons = {
  ChevronRight: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>),
  ChevronLeft: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>),
  ChevronDown: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>),
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
  ArrowRight: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>),
  Clock: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
  LogOut: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>),
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
  ExternalLink: ({ className }) => (<svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>),
  BookOpen: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>),
  Heart: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>),
  Keyboard: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M6 16h12"/></svg>),
  CheckSquare: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>),
  Square: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>),
  Circle: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>),
  Edit: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>)
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

function VoiceCoach({ coachType, setCurrentView, user, setActions }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [status, setStatus] = useState('Ready to connect');
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');

  const peerConnection = useRef(null);
  const dataChannel = useRef(null);
  const audioElement = useRef(null);
  const mediaStream = useRef(null);

  const isICF = coachType === 'icf';
  const primaryColor = isICF ? '#D97706' : '#7C3AED';
  const bgColor = isICF ? '#FEF3C7' : '#EDE9FE';

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
    if (isICF) return "Hello! What are you interested in coaching about today?";
    return "Welcome! I'm here to share research-based guidance from David Day's work. What would you like to explore today?"
  };

  // Extract and save actions from AI response
  const extractAndSaveActions = async (text) => {
    if (!user || !text) return;
    
    // Look for action patterns in the response
    const actionPatterns = [
      /(?:you(?:'ll| will)|going to|commit to|try to|plan to|action[:\s]+)([^.!?]+[.!?])/gi,
      /(?:this week|tomorrow|today)[,\s]+(?:you(?:'ll| will)|try|do)[:\s]*([^.!?]+[.!?])/gi,
    ];
    
    // Also check for explicit action blocks from the AI
    const actionsMatch = text.match(/```actions\n([\s\S]*?)\n```/);
    if (actionsMatch) {
      try {
        const actions = JSON.parse(actionsMatch[1]);
        for (const action of actions) {
          const { data: newAction } = await supabase.from('actions').insert({
            user_id: user.id,
            action: action.action,
            timeline: action.timeline || 'This week',
            source: 'voice_coach',
            completed: false
          }).select().single();
          if (newAction && setActions) {
            setActions(prev => [newAction, ...prev]);
          }
        }
      } catch (e) {
        console.error('Failed to parse actions:', e);
      }
    }
  };

  const handleRealtimeEvent = (event) => {
    switch (event.type) {
      case 'response.audio.started':
        setIsAISpeaking(true);
        setStatus(isICF ? 'Coach is speaking...' : 'Mentor is speaking...');
        break;
      case 'response.audio_transcript.delta':
        // Capture the transcript as it streams
        if (event.delta) {
          setTranscript(prev => prev + event.delta);
        }
        break;
      case 'response.audio_transcript.done':
        // Full transcript available - check for actions
        if (event.transcript) {
          extractAndSaveActions(event.transcript);
          setTranscript('');
        }
        break;
      case 'response.audio.done':
      case 'response.done':
        setIsAISpeaking(false);
        setStatus('Your turn - speak when ready');
        // Also try to extract from accumulated transcript
        if (transcript) {
          extractAndSaveActions(transcript);
          setTranscript('');
        }
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
        const systemPrompt = isICF ? getICFVoicePrompt() : getDayAdvisorVoicePrompt();
        
        dataChannel.current.send(JSON.stringify({
          type: 'session.update',
          session: {
            modalities: ['audio', 'text'],
            instructions: systemPrompt,
            voice: 'alloy',
            input_audio_transcription: { model: 'whisper-1' },
            turn_detection: { type: 'server_vad', threshold: 0.8, prefix_padding_ms: 500, silence_duration_ms: 2000 },
          },
        }));

        setTimeout(() => {
          const greetingText = getGreeting();
          dataChannel.current.send(JSON.stringify({
            type: 'conversation.item.create',
            item: { type: 'message', role: 'assistant', content: [{ type: 'text', text: greetingText }] }
          }));
          dataChannel.current.send(JSON.stringify({
            type: 'response.create',
            response: { 
              modalities: ['audio', 'text'], 
              instructions: `Say exactly this and nothing else: "${greetingText}" - Do not add any other words or phrases. Just say this greeting exactly, then stop and wait.`
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
        <button onClick={() => setCurrentView('coaches')} className="p-2 -ml-2 text-stone-500 hover:text-stone-700"><Icons.ChevronLeft /></button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}>
            {isICF ? <Icons.Heart /> : <Icons.GraduationCap />}
          </div>
          <div>
            <h2 className="font-semibold text-stone-800">{isICF ? 'ICF Voice Coach' : 'Day Advisor Voice'}</h2>
            <p className="text-xs text-stone-500">{isICF ? 'Question-based coaching' : 'Research-based guidance'}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
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
                <div key={i} className="w-1.5 rounded-full bg-white transition-all duration-200" style={{ height: isAISpeaking ? '24px' : '8px' }} />
              ))}
            </div>
          ) : (
            <Icons.Mic />
          )}
        </div>

        <p className="text-lg font-medium mb-2" style={{ color: isConnected ? primaryColor : '#6B7280' }}>{status}</p>
        {isConnected && <p className="text-sm text-stone-500 mb-8">{isAISpeaking ? 'Listen...' : 'Take your time - speak when ready'}</p>}

        <div className="flex items-center gap-4">
          {isConnected ? (
            <>
              <button onClick={toggleMute} className="w-14 h-14 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: isMuted ? '#FEE2E2' : '#F3F4F6' }}>
                {isMuted ? <Icons.MicOff /> : <Icons.Mic />}
              </button>
              <button onClick={disconnectSession} className="px-8 py-3 rounded-full text-white font-medium flex items-center gap-2" style={{ backgroundColor: '#EF4444' }}>
                <Icons.PhoneOff /> End
              </button>
              <button onClick={toggleSpeaker} className="w-14 h-14 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: !isSpeakerOn ? '#FEE2E2' : '#F3F4F6' }}>
                {isSpeakerOn ? <Icons.Volume2 /> : <Icons.VolumeX />}
              </button>
            </>
          ) : (
            <button onClick={connectSession} disabled={isConnecting} className="px-10 py-4 rounded-full text-white font-medium text-lg flex items-center gap-3 disabled:opacity-50" style={{ backgroundColor: primaryColor, boxShadow: `0 4px 20px ${primaryColor}44` }}>
              {isConnecting ? <Icons.Loader /> : <Icons.Phone />}
              {isConnecting ? 'Connecting...' : 'Start Voice Session'}
            </button>
          )}
        </div>

        {!isConnected && (
          <p className="text-sm text-stone-500 mt-8 text-center max-w-sm">
            {isICF ? 'Your coach will ask powerful questions to help you find your own insights.' : 'Your advisor will share research-based advice from David Day\'s leadership framework.'}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// TEXT COACH COMPONENT
// ============================================================================

function TextCoach({ coachType, setCurrentView, user, setActions, actions }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const isICF = coachType === 'icf';
  const endpoint = isICF ? 'coach' : 'day-advisor';

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    const greeting = isICF
      ? "Hello! What are you interested in coaching about today?"
      : "Welcome! I'm here to share research-based guidance from David Day's work. What would you like to explore today?";
    setMessages([{ role: 'assistant', content: greeting }]);
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
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
        if (data.actions && data.actions.length > 0 && user) {
          for (const action of data.actions) {
            const { data: newAction } = await supabase.from('actions').insert({
              user_id: user.id, action: action.action, timeline: action.timeline || 'This week', source: 'coach', completed: false
            }).select().single();
            if (newAction) setActions(prev => [newAction, ...prev]);
          }
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn flex flex-col h-[calc(100vh-160px)] lg:h-[calc(100vh-100px)]">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setCurrentView('coaches')} className="p-2 -ml-2 text-stone-500"><Icons.ChevronLeft /></button>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${isICF ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 'bg-gradient-to-br from-violet-600 to-violet-700'}`}>
            {isICF ? <Icons.Heart /> : <Icons.GraduationCap />}
          </div>
          <div>
            <h2 className="font-semibold text-stone-800">{isICF ? 'ICF Coach' : 'Day Advisor'}</h2>
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
              <div className={`${isICF ? 'bg-amber-50' : 'bg-violet-50'} rounded-2xl px-4 py-3 flex items-center gap-2 text-sm`}>
                <Icons.Loader /> Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-stone-200 p-3">
          <div className="flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              placeholder="Type your message..." className={`flex-1 px-4 py-2.5 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 ${isICF ? 'focus:ring-amber-500' : 'focus:ring-violet-500'}`} />
            <button onClick={() => handleSend()} disabled={!input.trim() || isLoading}
              className={`p-2.5 text-white rounded-full disabled:opacity-50 ${isICF ? 'bg-amber-600' : 'bg-violet-600'}`}>
              <Icons.Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// NAVIGATION COMPONENTS
// ============================================================================

function Sidebar({ currentView, setCurrentView, user, onSignOut }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Icons.Home },
    { id: 'develop', label: 'Develop', icon: Icons.Award },
    { id: 'practice', label: 'Practice', icon: Icons.Target },
    { id: 'chapters', label: "Day's Book", icon: Icons.BookOpen },
    { id: 'journal', label: 'Journal', icon: Icons.Edit },
    { id: 'actions', label: 'Actions', icon: Icons.CheckSquare },
    { id: 'coaches', label: 'Coaches', icon: Icons.MessageCircle },
    { id: 'library', label: 'Library', icon: Icons.Book },
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${currentView.startsWith(item.id) ? 'bg-amber-50 text-amber-700 font-medium' : 'text-stone-600 hover:bg-stone-50'}`}>
            <item.icon /><span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-stone-200">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-semibold text-sm">
            {(user?.user_metadata?.full_name || user?.email || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-stone-800 truncate">{user?.user_metadata?.full_name || 'User'}</p>
            <p className="text-xs text-stone-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={() => setCurrentView('privacy-settings')} className="w-full flex items-center gap-3 px-4 py-2 text-stone-600 hover:bg-stone-50 rounded-xl text-sm mb-1">
          <Icons.Shield /><span>Privacy Settings</span>
        </button>
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
    { id: 'develop', label: 'Develop', icon: Icons.Award },
    { id: 'chapters', label: 'Book', icon: Icons.BookOpen },
    { id: 'coaches', label: 'Coach', icon: Icons.MessageCircle },
    { id: 'library', label: 'More', icon: Icons.Book }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-30 lg:hidden">
      <div className="max-w-lg mx-auto flex justify-around py-2">
        {navItems.map(item => (
          <button key={item.id} onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center px-3 py-2 ${currentView.startsWith(item.id) ? 'text-amber-700' : 'text-stone-400'}`}>
            <item.icon /><span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// ============================================================================
// DASHBOARD
// ============================================================================

function Dashboard({ setCurrentView, streak, user, actions, journalEntries }) {
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const pendingActions = actions.filter(a => !a.completed).length;
  const todayActivity = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
  const activityCompetency = KLI_COMPETENCIES.find(c => c.id === todayActivity.competency);

  const competencyColors = {
    courage: 'from-amber-500 to-orange-600',
    creativity: 'from-violet-500 to-purple-600',
    collaboration: 'from-teal-500 to-cyan-600'
  };

  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <p className="text-stone-500 text-sm mb-1">{dateStr}</p>
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800">
          {user?.user_metadata?.full_name ? `Welcome, ${user.user_metadata.full_name.split(' ')[0]}` : 'Welcome back'}
        </h2>
      </div>

      {/* Daily Practice Card */}
      <button onClick={() => setCurrentView(`practice-${todayActivity.id}`)}
        className={`w-full bg-gradient-to-br ${competencyColors[todayActivity.competency]} rounded-2xl p-5 text-left hover:shadow-lg transition-all mb-4`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white text-2xl">🎯</div>
          <div className="flex-1">
            <p className="text-white/80 text-xs font-medium mb-1">Today's Practice • {activityCompetency?.name}</p>
            <h3 className="text-base font-semibold text-white mb-1">{todayActivity.title}</h3>
            <p className="text-white/70 text-sm">{todayActivity.duration} • VCoL Framework</p>
          </div>
          <Icons.ArrowRight className="text-white" />
        </div>
      </button>

      <button onClick={() => setCurrentView('coaches')}
        className="w-full bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-5 text-left hover:from-stone-700 transition-all mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white"><Icons.MessageCircle /></div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white mb-1">Talk to Your Coach</h3>
            <p className="text-stone-400 text-sm">ICF Coach or Day Advisor - Voice or Text</p>
          </div>
          <Icons.ArrowRight className="text-white" />
        </div>
      </button>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border border-stone-200 text-center">
          <div className="flex justify-center mb-1 text-amber-600"><Icons.Flame /></div>
          <p className="text-xl font-bold text-stone-800">{streak}</p>
          <p className="text-xs text-stone-500">Streak</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 text-center">
          <div className="flex justify-center mb-1 text-teal-600"><Icons.CheckSquare /></div>
          <p className="text-xl font-bold text-stone-800">{pendingActions}</p>
          <p className="text-xs text-stone-500">Actions</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 text-center">
          <div className="flex justify-center mb-1 text-violet-600"><Icons.Edit /></div>
          <p className="text-xl font-bold text-stone-800">{journalEntries.length}</p>
          <p className="text-xs text-stone-500">Journal</p>
        </div>
      </div>

      {/* KLI Competencies Quick Access */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-stone-800">Practice by Competency</h3>
          <button onClick={() => setCurrentView('practice')} className="text-amber-700 text-sm font-medium flex items-center gap-1">All <Icons.ChevronRight /></button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {KLI_COMPETENCIES.map(comp => {
            const colors = {
              courage: 'bg-amber-50 border-amber-200 text-amber-700',
              creativity: 'bg-violet-50 border-violet-200 text-violet-700',
              collaboration: 'bg-teal-50 border-teal-200 text-teal-700'
            };
            const activityCount = ACTIVITIES.filter(a => a.competency === comp.id).length;
            return (
              <button
                key={comp.id}
                onClick={() => setCurrentView('practice')}
                className={`${colors[comp.id]} border rounded-xl p-3 text-center hover:shadow-md transition-all`}
              >
                <p className="font-semibold text-sm">{comp.name}</p>
                <p className="text-xs opacity-70">{activityCount} activities</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Leader & Leadership Development */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-stone-800">Develop</h3>
          <button onClick={() => setCurrentView('develop')} className="text-amber-700 text-sm font-medium flex items-center gap-1">All <Icons.ChevronRight /></button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setCurrentView('develop')}
            className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4 text-left hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-2">👤</div>
            <p className="font-semibold text-amber-800 text-sm">Leader Development</p>
            <p className="text-xs text-amber-600">Self-views & assessments</p>
          </button>
          <button
            onClick={() => setCurrentView('develop')}
            className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-4 text-left hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-2">👥</div>
            <p className="font-semibold text-teal-800 text-sm">Leadership Development</p>
            <p className="text-xs text-teal-600">Collective capacity</p>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-stone-800">Day's Book</h3>
          <button onClick={() => setCurrentView('chapters')} className="text-amber-700 text-sm font-medium flex items-center gap-1">All <Icons.ChevronRight /></button>
        </div>
        <button onClick={() => setCurrentView('chapter-1')}
          className="w-full bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all text-left">
          <div className="flex">
            <img src={CHAPTERS[0].image} alt="" className="w-28 h-28 object-cover" />
            <div className="flex-1 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-amber-700">Chapter 1</span>
                <span className="text-xs text-stone-400 flex items-center gap-1"><Icons.Clock /> {CHAPTERS[0].duration}</span>
              </div>
              <h4 className="font-semibold text-stone-800 mb-1">{CHAPTERS[0].title}</h4>
              <p className="text-sm text-stone-500">{CHAPTERS[0].subtitle}</p>
            </div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setCurrentView('journal')} className="bg-white rounded-xl border border-stone-200 p-4 text-left hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center mb-2"><Icons.Edit /></div>
          <p className="font-medium text-stone-800 text-sm">Journal</p>
          <p className="text-xs text-stone-500">Reflect on your growth</p>
        </button>
        <button onClick={() => setCurrentView('actions')} className="bg-white rounded-xl border border-stone-200 p-4 text-left hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mb-2"><Icons.CheckSquare /></div>
          <p className="font-medium text-stone-800 text-sm">Actions</p>
          <p className="text-xs text-stone-500">{pendingActions} pending</p>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// JOURNAL VIEW
// ============================================================================

function JournalView({ user, journalEntries, setJournalEntries }) {
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
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl text-stone-800">Journal</h2>
          <p className="text-stone-500 text-sm">Reflect on your leadership journey</p>
        </div>
        {!showNew && <button onClick={() => setShowNew(true)} className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-sm"><Icons.Plus /> New</button>}
      </div>

      {showNew && (
        <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-6">
          <textarea value={newEntry} onChange={(e) => setNewEntry(e.target.value)} placeholder="What are you learning about yourself as a leader? What insights have emerged?" className="w-full px-4 py-3 border border-stone-200 rounded-xl resize-none h-32 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" autoFocus />
          <div className="flex justify-end gap-2 mt-3">
            <button onClick={() => { setShowNew(false); setNewEntry(''); }} className="px-4 py-2 text-stone-600 text-sm">Cancel</button>
            <button onClick={handleSave} className="px-5 py-2 bg-stone-900 text-white rounded-full text-sm">Save Entry</button>
          </div>
        </div>
      )}

      {/* Prompts */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <h4 className="font-medium text-amber-800 text-sm mb-2">Reflection Prompts</h4>
        <ul className="space-y-1 text-sm text-amber-900">
          <li>• What leadership challenge am I facing right now?</li>
          <li>• What did I learn about myself today?</li>
          <li>• Where am I growing? Where am I stuck?</li>
        </ul>
      </div>

      {journalEntries.length === 0 && !showNew ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400"><Icons.Edit /></div>
          <p className="text-stone-600 font-medium mb-2">No journal entries yet</p>
          <p className="text-stone-500 text-sm mb-4">Start reflecting on your leadership journey</p>
          <button onClick={() => setShowNew(true)} className="text-amber-700 font-medium text-sm">Write your first entry</button>
        </div>
      ) : (
        <div className="space-y-3">
          {journalEntries.map(entry => (
            <div key={entry.id} className="bg-white rounded-xl border border-stone-200 p-5">
              <p className="text-xs text-stone-500 mb-2">{new Date(entry.created_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p className="text-stone-700 text-sm whitespace-pre-wrap leading-relaxed">{entry.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// ACTIONS VIEW
// ============================================================================

function ActionsView({ user, actions, setActions }) {
  const [newAction, setNewAction] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = async () => {
    if (!newAction.trim()) return;
    const { data } = await supabase.from('actions').insert({ user_id: user.id, action: newAction, timeline: 'This week', source: 'manual', completed: false }).select().single();
    if (data) { setActions([data, ...actions]); setNewAction(''); setShowAdd(false); }
  };

  const toggleComplete = async (id, completed) => {
    await supabase.from('actions').update({ completed: !completed, completed_at: !completed ? new Date().toISOString() : null }).eq('id', id);
    setActions(actions.map(a => a.id === id ? { ...a, completed: !completed } : a));
  };

  const deleteAction = async (id) => {
    await supabase.from('actions').delete().eq('id', id);
    setActions(actions.filter(a => a.id !== id));
  };

  const pendingActions = actions.filter(a => !a.completed);
  const completedActions = actions.filter(a => a.completed);

  return (
    <div className="animate-fadeIn pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl lg:text-3xl text-stone-800">Actions</h2>
          <p className="text-stone-500 text-sm">Commitments from coaching sessions</p>
        </div>
        {!showAdd && <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-sm"><Icons.Plus /> Add</button>}
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6">
          <input type="text" value={newAction} onChange={(e) => setNewAction(e.target.value)} placeholder="What action will you take?" className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-amber-500" autoFocus />
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-stone-600 text-sm">Cancel</button>
            <button onClick={handleAdd} className="px-4 py-2 bg-stone-900 text-white rounded-full text-sm">Add</button>
          </div>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <p className="text-amber-800 text-sm"><strong>Tip:</strong> Your AI coaches can suggest actions during conversations. Those will appear here automatically.</p>
      </div>

      {pendingActions.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-stone-800 mb-3">Pending ({pendingActions.length})</h3>
          <div className="space-y-2">
            {pendingActions.map(action => (
              <div key={action.id} className="bg-white rounded-xl border border-stone-200 p-4 flex items-start gap-3">
                <button onClick={() => toggleComplete(action.id, action.completed)} className="mt-0.5 text-stone-300 hover:text-teal-600"><Icons.Square /></button>
                <div className="flex-1">
                  <p className="text-stone-800 text-sm">{action.action}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-stone-500">{action.timeline || 'No deadline'}</span>
                    {action.source === 'coach' && <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">From Coach</span>}
                  </div>
                </div>
                <button onClick={() => deleteAction(action.id)} className="text-stone-300 hover:text-red-500"><Icons.Trash /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {completedActions.length > 0 && (
        <div>
          <h3 className="font-medium text-stone-800 mb-3">Completed ({completedActions.length})</h3>
          <div className="space-y-2">
            {completedActions.map(action => (
              <div key={action.id} className="bg-stone-50 rounded-xl border border-stone-200 p-4 flex items-start gap-3 opacity-60">
                <button onClick={() => toggleComplete(action.id, action.completed)} className="mt-0.5 text-teal-600"><Icons.CheckSquare /></button>
                <div className="flex-1"><p className="text-stone-600 text-sm line-through">{action.action}</p></div>
                <button onClick={() => deleteAction(action.id)} className="text-stone-300 hover:text-red-500"><Icons.Trash /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {actions.length === 0 && !showAdd && (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400"><Icons.CheckSquare /></div>
          <p className="text-stone-600 font-medium mb-2">No actions yet</p>
          <p className="text-stone-500 text-sm mb-4">Talk to a coach to get personalized action suggestions</p>
          <button onClick={() => setShowAdd(true)} className="text-amber-700 font-medium text-sm">Add your first action</button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// CHAPTERS VIEW
// ============================================================================

function ChaptersView({ setCurrentView }) {
  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800 mb-1">Day's Book</h2>
        <p className="text-stone-500 text-sm">8 chapters from "Developing Leaders and Leadership" (2024)</p>
      </div>
      <div className="space-y-3">
        {CHAPTERS.map(chapter => (
          <button key={chapter.id} onClick={() => setCurrentView(`chapter-${chapter.id}`)}
            className="w-full text-left bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-all">
            <div className="flex">
              <img src={chapter.image} alt="" className="w-20 h-20 object-cover" />
              <div className="flex-1 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium ${chapter.color === 'amber' ? 'text-amber-700' : chapter.color === 'violet' ? 'text-violet-700' : 'text-teal-700'}`}>Chapter {chapter.id}</span>
                  <span className="text-xs text-stone-400">{chapter.duration}</span>
                </div>
                <h4 className="font-semibold text-stone-800">{chapter.title}</h4>
                <p className="text-sm text-stone-500 line-clamp-1">{chapter.subtitle}</p>
              </div>
              <div className="flex items-center pr-4 text-stone-400"><Icons.ChevronRight /></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// CHAPTER DETAIL VIEW
// ============================================================================

function ChapterDetail({ chapterId, setCurrentView }) {
  const chapter = CHAPTERS.find(c => c.id === chapterId);
  const [expandedLesson, setExpandedLesson] = useState(null);
  
  if (!chapter) return null;

  return (
    <div className="animate-fadeIn pb-8">
      <button onClick={() => setCurrentView('chapters')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm"><Icons.ChevronLeft /> All Chapters</button>

      <div className="relative rounded-2xl overflow-hidden mb-6">
        <img src={chapter.image} alt="" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-xs text-white/80">Chapter {chapter.id} - {chapter.duration}</span>
          <h2 className="text-2xl font-serif font-semibold text-white">{chapter.title}</h2>
          <p className="text-white/80 text-sm">{chapter.subtitle}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 p-5 mb-6">
        <h3 className="font-semibold text-stone-800 mb-2">Overview</h3>
        <p className="text-stone-600 text-sm leading-relaxed">{chapter.overview}</p>
      </div>

      <h3 className="font-semibold text-stone-800 mb-3">Lessons</h3>
      <div className="space-y-3 mb-6">
        {chapter.lessons.map((lesson, idx) => (
          <div key={lesson.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <button onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)} className="w-full p-4 flex items-start gap-3 text-left">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${chapter.color === 'amber' ? 'bg-amber-100 text-amber-700' : chapter.color === 'violet' ? 'bg-violet-100 text-violet-700' : 'bg-teal-100 text-teal-700'}`}>{idx + 1}</div>
              <div className="flex-1"><h4 className="font-medium text-stone-800">{lesson.title}</h4></div>
              <div className={`text-stone-400 transition-transform ${expandedLesson === lesson.id ? 'rotate-180' : ''}`}><Icons.ChevronDown /></div>
            </button>
            
            {expandedLesson === lesson.id && (
              <div className="px-4 pb-4 border-t border-stone-100">
                <div className="pt-4 space-y-4">
                  <div className="text-stone-600 text-sm leading-relaxed whitespace-pre-wrap">{lesson.content}</div>
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                    <h5 className="font-medium text-amber-800 text-sm mb-1">Practical Application</h5>
                    <p className="text-amber-900 text-sm">{lesson.practicalApplication}</p>
                  </div>
                  <div className="bg-stone-50 rounded-lg p-4">
                    <h5 className="font-medium text-stone-700 text-sm mb-1">Research Basis</h5>
                    <p className="text-stone-600 text-sm">{lesson.researchBasis}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-stone-900 rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-white mb-3">Key Quotes</h3>
        <div className="space-y-3">
          {chapter.keyQuotes.map((quote, idx) => (
            <p key={idx} className="text-stone-300 text-sm italic border-l-2 border-amber-500 pl-3">{quote}</p>
          ))}
        </div>
      </div>

      <div className={`rounded-xl p-5 ${chapter.color === 'amber' ? 'bg-amber-50 border border-amber-200' : chapter.color === 'violet' ? 'bg-violet-50 border border-violet-200' : 'bg-teal-50 border border-teal-200'}`}>
        <h3 className={`font-semibold mb-3 ${chapter.color === 'amber' ? 'text-amber-800' : chapter.color === 'violet' ? 'text-violet-800' : 'text-teal-800'}`}>Reflection Questions</h3>
        <ul className="space-y-2">
          {chapter.reflectionPrompts.map((prompt, idx) => (
            <li key={idx} className={`text-sm flex items-start gap-2 ${chapter.color === 'amber' ? 'text-amber-900' : chapter.color === 'violet' ? 'text-violet-900' : 'text-teal-900'}`}>
              <span className="mt-1"><Icons.Circle /></span>{prompt}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between mt-6">
        {chapter.id > 1 && <button onClick={() => setCurrentView(`chapter-${chapter.id - 1}`)} className="flex items-center gap-1 text-stone-600 hover:text-stone-800"><Icons.ChevronLeft /> Chapter {chapter.id - 1}</button>}
        <div className="flex-1" />
        {chapter.id < 8 && <button onClick={() => setCurrentView(`chapter-${chapter.id + 1}`)} className="flex items-center gap-1 text-stone-600 hover:text-stone-800">Chapter {chapter.id + 1} <Icons.ChevronRight /></button>}
      </div>
    </div>
  );
}

// ============================================================================
// COACHES VIEW
// ============================================================================

function CoachesView({ setCurrentView }) {
  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800 mb-1">Your Coaches</h2>
        <p className="text-stone-500 text-sm">Choose your coaching experience</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="p-5 border-b border-stone-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shrink-0"><Icons.Heart /></div>
              <div>
                <h3 className="text-lg font-semibold text-stone-800">ICF Leadership Coach</h3>
                <p className="text-stone-600 text-sm">Powerful questions to help you find your own insights. Non-directive approach.</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <button onClick={() => setCurrentView('coach-icf-voice')} className="flex-1 py-3 flex items-center justify-center gap-2 text-amber-700 hover:bg-amber-50 border-r border-stone-100"><Icons.Mic /> <span className="font-medium text-sm">Voice</span></button>
            <button onClick={() => setCurrentView('coach-icf-text')} className="flex-1 py-3 flex items-center justify-center gap-2 text-amber-700 hover:bg-amber-50"><Icons.Keyboard /> <span className="font-medium text-sm">Text</span></button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="p-5 border-b border-stone-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center text-white shrink-0"><Icons.GraduationCap /></div>
              <div>
                <h3 className="text-lg font-semibold text-stone-800">Day Advisor</h3>
                <p className="text-stone-600 text-sm">Research-based advice from David Day's leadership development framework.</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <button onClick={() => setCurrentView('coach-advisor-voice')} className="flex-1 py-3 flex items-center justify-center gap-2 text-violet-700 hover:bg-violet-50 border-r border-stone-100"><Icons.Mic /> <span className="font-medium text-sm">Voice</span></button>
            <button onClick={() => setCurrentView('coach-advisor-text')} className="flex-1 py-3 flex items-center justify-center gap-2 text-violet-700 hover:bg-violet-50"><Icons.Keyboard /> <span className="font-medium text-sm">Text</span></button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-stone-50 rounded-xl p-4">
        <h4 className="font-medium text-stone-800 mb-2">When to use each:</h4>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div><span className="text-stone-600"><strong>ICF Coach:</strong> Explore your thinking, work through emotions, find clarity through reflection.</span></div>
          <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 shrink-0"></div><span className="text-stone-600"><strong>Day Advisor:</strong> Get specific advice, learn concepts, understand research applications.</span></div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// LIBRARY VIEW
// ============================================================================

function LibraryView({ setCurrentView }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (selectedCategory) {
    const category = READING_LIBRARY.categories.find(c => c.id === selectedCategory);
    return (
      <div className="animate-fadeIn pb-8">
        <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm"><Icons.ChevronLeft /> All Categories</button>
        <div className="mb-6">
          <h2 className="font-serif text-2xl text-stone-800 mb-1">{category.name}</h2>
          <p className="text-stone-500 text-sm">{category.description}</p>
        </div>
        <div className="space-y-4">
          {category.books.map((book, idx) => (
            <div key={idx} className={`bg-white rounded-xl border p-5 ${book.primary ? 'border-amber-300 bg-amber-50' : 'border-stone-200'}`}>
              {book.primary && <span className="inline-block px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full mb-2">Primary Source</span>}
              {book.recommended && !book.primary && <span className="inline-block px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-medium rounded-full mb-2">Recommended</span>}
              <h4 className="font-semibold text-stone-800 mb-1">{book.title}</h4>
              <p className="text-stone-600 text-sm mb-2">{book.author} ({book.year})</p>
              <p className="text-stone-600 text-sm mb-3">{book.description}</p>
              <div className="mb-3">
                <p className="text-xs font-medium text-stone-700 mb-1">Key Topics:</p>
                <div className="flex flex-wrap gap-1">
                  {book.keyTopics.map((topic, i) => (<span key={i} className="text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full">{topic}</span>))}
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${book.evidenceLevel === 'High' ? 'bg-green-100 text-green-700' : book.evidenceLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'}`}>{book.evidenceLevel} Evidence</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800 mb-1">Reading Library</h2>
        <p className="text-stone-500 text-sm">Evidence-based leadership resources</p>
      </div>

      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 mb-6 text-white">
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Featured</span>
        <h3 className="font-serif text-xl mt-2 mb-1">Developing Leaders and Leadership</h3>
        <p className="text-amber-100 text-sm mb-2">David V. Day (2024)</p>
        <p className="text-white/90 text-sm">The foundational text for this application.</p>
      </div>

      <h3 className="font-semibold text-stone-800 mb-3">Browse by Category</h3>
      <div className="space-y-3">
        {READING_LIBRARY.categories.map(category => (
          <button key={category.id} onClick={() => setSelectedCategory(category.id)}
            className="w-full bg-white rounded-xl border border-stone-200 p-4 text-left hover:shadow-md transition-all flex items-center justify-between">
            <div>
              <h4 className="font-medium text-stone-800">{category.name}</h4>
              <p className="text-stone-500 text-sm">{category.books.length} resources</p>
            </div>
            <Icons.ChevronRight />
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PRACTICE VIEW (VCoL-Based Activities)
// ============================================================================

function PracticeView({ setCurrentView, user }) {
  const [selectedCompetency, setSelectedCompetency] = useState(null);

  const competencyColors = {
    courage: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: 'bg-amber-600' },
    creativity: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', accent: 'bg-violet-600' },
    collaboration: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', accent: 'bg-teal-600' }
  };

  if (selectedCompetency) {
    const competency = KLI_COMPETENCIES.find(c => c.id === selectedCompetency);
    const activities = ACTIVITIES.filter(a => a.competency === selectedCompetency);
    const colors = competencyColors[selectedCompetency];

    return (
      <div className="animate-fadeIn">
        <button onClick={() => setSelectedCompetency(null)} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
          <Icons.ChevronLeft /> All Competencies
        </button>
        
        <div className={`${colors.bg} ${colors.border} border rounded-xl p-6 mb-6`}>
          <h1 className={`text-2xl font-bold ${colors.text} mb-2`}>{competency.name}</h1>
          <p className="text-stone-600">{competency.description}</p>
        </div>

        <h2 className="font-semibold text-stone-800 mb-4">Practice Activities</h2>
        <div className="space-y-3">
          {activities.map(activity => {
            const capability = competency.capabilities.find(c => c.id === activity.capability);
            return (
              <button
                key={activity.id}
                onClick={() => setCurrentView(`practice-${activity.id}`)}
                className="w-full bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-all text-left"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-stone-800">{activity.title}</h3>
                    <p className={`text-xs ${colors.text}`}>{capability?.name}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>{activity.level}</span>
                </div>
                <p className="text-sm text-stone-600 mb-2">{activity.description}</p>
                <div className="flex items-center text-stone-400 text-xs">
                  <Icons.Clock /> <span className="ml-1">{activity.duration}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className={`mt-6 p-4 ${colors.bg} rounded-xl`}>
          <h3 className={`font-semibold ${colors.text} mb-2`}>Capabilities & Attributes</h3>
          {competency.capabilities.map(cap => (
            <div key={cap.id} className="mb-3">
              <p className="font-medium text-stone-700 text-sm">{cap.name}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {cap.attributes.map(attr => (
                  <span key={attr} className="text-xs bg-white px-2 py-0.5 rounded text-stone-600">{attr}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <h1 className="text-2xl font-bold text-stone-800 mb-2">Daily Practice</h1>
      <p className="text-stone-600 mb-6">Build leadership skills through the VCoL framework: Vision, Coaching, Learning.</p>

      <div className="bg-gradient-to-r from-amber-50 via-violet-50 to-teal-50 rounded-xl p-4 mb-6 border border-stone-200">
        <h2 className="font-semibold text-stone-700 mb-2">The VCoL Framework</h2>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white rounded-lg p-2">
            <div className="text-lg font-bold text-amber-600">1</div>
            <div className="text-xs text-stone-600">Set Goal</div>
          </div>
          <div className="bg-white rounded-lg p-2">
            <div className="text-lg font-bold text-violet-600">2</div>
            <div className="text-xs text-stone-600">Gather Info</div>
          </div>
          <div className="bg-white rounded-lg p-2">
            <div className="text-lg font-bold text-teal-600">3</div>
            <div className="text-xs text-stone-600">Apply</div>
          </div>
          <div className="bg-white rounded-lg p-2">
            <div className="text-lg font-bold text-stone-600">4</div>
            <div className="text-xs text-stone-600">Reflect</div>
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-stone-800 mb-4">Choose a Competency</h2>
      <div className="space-y-4">
        {KLI_COMPETENCIES.map(comp => {
          const colors = competencyColors[comp.id];
          const activityCount = ACTIVITIES.filter(a => a.competency === comp.id).length;
          return (
            <button
              key={comp.id}
              onClick={() => setSelectedCompetency(comp.id)}
              className={`w-full ${colors.bg} ${colors.border} border rounded-xl p-5 hover:shadow-md transition-all text-left`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className={`text-xl font-bold ${colors.text}`}>{comp.name}</h3>
                <span className={`${colors.accent} text-white text-xs px-2 py-1 rounded-full`}>{activityCount} activities</span>
              </div>
              <p className="text-stone-600 text-sm mb-3">{comp.description}</p>
              <div className="flex flex-wrap gap-2">
                {comp.capabilities.map(cap => (
                  <span key={cap.id} className="text-xs bg-white px-2 py-1 rounded text-stone-600">{cap.name}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// DAILY PRACTICE DETAIL (VCoL 4-Step Framework)
// ============================================================================

function DailyPractice({ activityId, setCurrentView, user }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const activity = ACTIVITIES.find(a => a.id === activityId);
  if (!activity) return <div>Activity not found</div>;

  const competency = KLI_COMPETENCIES.find(c => c.id === activity.competency);
  const capability = competency?.capabilities.find(c => c.id === activity.capability);

  const competencyColors = {
    courage: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: 'bg-amber-600', light: 'bg-amber-100' },
    creativity: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', accent: 'bg-violet-600', light: 'bg-violet-100' },
    collaboration: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', accent: 'bg-teal-600', light: 'bg-teal-100' }
  };
  const colors = competencyColors[activity.competency];

  const steps = [
    { key: 'set_goal', title: 'Set Your Goal', icon: '🎯', prompt: activity.vcol.set_goal },
    { key: 'gather_info', title: 'Gather Information', icon: '🔍', prompt: activity.vcol.gather_info },
    { key: 'apply', title: 'Apply & Practice', icon: '⚡', prompt: activity.vcol.apply },
    { key: 'reflect', title: 'Reflect', icon: '💭', prompt: activity.vcol.reflect }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveReflection = async () => {
    if (!user) {
      setSaveError('You must be logged in to save');
      return false;
    }
    
    setSaving(true);
    setSaveError(null);
    
    try {
      // Create a summary content string for easy reading
      const contentSummary = `VCoL Practice: ${activity.title}\n\n` +
        `🎯 Goal: ${responses.set_goal || '(not provided)'}\n\n` +
        `🔍 Information Gathered: ${responses.gather_info || '(not provided)'}\n\n` +
        `⚡ Application: ${responses.apply || '(not provided)'}\n\n` +
        `💭 Reflection: ${responses.reflect || '(not provided)'}`;
      
      const { data, error } = await supabase.from('reflections').insert({
        user_id: user.id,
        content: contentSummary,
        reflection_type: 'vcol_practice',
        activity_id: activity.id,
        practice_data: {
          activity_id: activity.id,
          activity_title: activity.title,
          competency: activity.competency,
          capability: activity.capability,
          responses: {
            set_goal: responses.set_goal || '',
            gather_info: responses.gather_info || '',
            apply: responses.apply || '',
            reflect: responses.reflect || ''
          },
          completed_at: new Date().toISOString()
        }
      }).select().single();
      
      if (error) throw error;
      
      setSaved(true);
      console.log('VCoL practice saved:', data);
      return true;
    } catch (e) {
      console.error('Error saving VCoL practice:', e);
      setSaveError(e.message || 'Failed to save. Please try again.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAndContinue = async () => {
    const success = await saveReflection();
    if (success) {
      setTimeout(() => setCurrentView('practice'), 500);
    }
  };

  if (completed) {
    return (
      <div className="animate-fadeIn">
        <div className={`${colors.bg} rounded-xl p-6 text-center mb-6`}>
          <div className="text-4xl mb-4">🎉</div>
          <h1 className={`text-2xl font-bold ${colors.text} mb-2`}>Practice Complete!</h1>
          <p className="text-stone-600">You've completed "{activity.title}"</p>
        </div>

        <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6">
          <h2 className="font-semibold text-stone-800 mb-3">Your Responses</h2>
          {steps.map((step, idx) => (
            <div key={step.key} className="mb-4 last:mb-0">
              <div className={`text-sm font-medium ${colors.text} mb-1`}>{step.icon} {step.title}</div>
              <p className="text-stone-600 text-sm bg-stone-50 rounded p-2">
                {responses[step.key] || '(No response recorded)'}
              </p>
            </div>
          ))}
        </div>

        {/* Save Status Messages */}
        {saveError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-red-700 text-sm">❌ {saveError}</p>
          </div>
        )}
        
        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
            <p className="text-green-700 text-sm">✅ Practice saved successfully!</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleSaveAndContinue}
            disabled={saving || saved}
            className={`flex-1 ${colors.accent} text-white py-3 rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2`}
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : saved ? (
              <>✅ Saved!</>
            ) : (
              <>💾 Save & Continue</>
            )}
          </button>
          <button
            onClick={() => setCurrentView('practice')}
            className="px-4 py-3 border border-stone-300 rounded-xl text-stone-600 hover:bg-stone-50"
          >
            {saved ? 'Done' : 'Skip'}
          </button>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="animate-fadeIn">
      <button onClick={() => setCurrentView('practice')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
        <Icons.ChevronLeft /> Back to Practice
      </button>

      <div className={`${colors.bg} ${colors.border} border rounded-xl p-4 mb-4`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`${colors.accent} text-white text-xs px-2 py-0.5 rounded`}>{competency?.name}</span>
          <span className="text-stone-400">→</span>
          <span className="text-stone-600 text-sm">{capability?.name}</span>
        </div>
        <h1 className={`text-xl font-bold ${colors.text}`}>{activity.title}</h1>
        <p className="text-stone-600 text-sm mt-1">{activity.description}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-stone-500 mb-2">
          <span>Step {currentStep + 1} of 4</span>
          <span>VCoL Framework</span>
        </div>
        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.accent} transition-all duration-300`}
            style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Step */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 ${colors.light} rounded-full flex items-center justify-center text-xl`}>
            {step.icon}
          </div>
          <h2 className="text-lg font-semibold text-stone-800">{step.title}</h2>
        </div>
        
        <p className="text-stone-700 mb-4 leading-relaxed">{step.prompt}</p>

        <textarea
          className="w-full border border-stone-200 rounded-lg p-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-200 min-h-[120px]"
          placeholder="Write your thoughts here..."
          value={responses[step.key] || ''}
          onChange={(e) => setResponses({ ...responses, [step.key]: e.target.value })}
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="px-4 py-3 border border-stone-300 rounded-xl text-stone-600 hover:bg-stone-50"
          >
            <Icons.ChevronLeft />
          </button>
        )}
        <button
          onClick={handleNext}
          className={`flex-1 ${colors.accent} text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2`}
        >
          {currentStep < steps.length - 1 ? 'Next Step' : 'Complete'} <Icons.ArrowRight />
        </button>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {steps.map((s, idx) => (
          <div
            key={s.key}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentStep ? colors.accent : idx < currentStep ? colors.light : 'bg-stone-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// DEVELOP VIEW (Leader & Leadership Development)
// ============================================================================

function DevelopView({ setCurrentView, user }) {
  const [activeTab, setActiveTab] = useState('leader');

  return (
    <div className="animate-fadeIn">
      <h1 className="text-2xl font-bold text-stone-800 mb-2">Develop</h1>
      <p className="text-stone-600 mb-6">Evidence-based interventions for leader and leadership development.</p>

      {/* Tab Selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('leader')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            activeTab === 'leader'
              ? 'bg-amber-100 text-amber-800 border-2 border-amber-300'
              : 'bg-stone-100 text-stone-600 border-2 border-transparent'
          }`}
        >
          <div className="text-lg mb-1">👤</div>
          <div className="text-sm">Leader Development</div>
          <div className="text-xs opacity-70">Individual</div>
        </button>
        <button
          onClick={() => setActiveTab('leadership')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            activeTab === 'leadership'
              ? 'bg-teal-100 text-teal-800 border-2 border-teal-300'
              : 'bg-stone-100 text-stone-600 border-2 border-transparent'
          }`}
        >
          <div className="text-lg mb-1">👥</div>
          <div className="text-sm">Leadership Development</div>
          <div className="text-xs opacity-70">Collective</div>
        </button>
      </div>

      {activeTab === 'leader' ? (
        <LeaderDevelopmentTab setCurrentView={setCurrentView} />
      ) : (
        <LeadershipDevelopmentTab setCurrentView={setCurrentView} />
      )}
    </div>
  );
}

function LeaderDevelopmentTab({ setCurrentView }) {
  const [activeArea, setActiveArea] = useState('identity');
  const [expandedIntervention, setExpandedIntervention] = useState(null);

  // Comprehensive development areas with all research-based interventions
  const developmentAreas = {
    identity: {
      id: 'identity',
      title: 'Leader Identity',
      subtitle: 'Who you are as a leader',
      icon: '🪞',
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500',
      description: 'Leader identity is the extent to which you see yourself as a leader. It motivates the learning and practice that sustains development over time.',
      source: 'Day (2024), Chapter 4; DeRue & Ashford (2010)',
      assessment: SELF_VIEW_ASSESSMENTS.leaderIdentity,
      keyQuestion: 'Do you see yourself as a leader?',
      interventions: [
        {
          id: 'identity_narrative',
          title: 'Identity Reflection & Narrative',
          type: 'reflect',
          duration: '45-60 min',
          mechanism: 'Self-concept integration — connecting personal values with leadership purpose',
          description: 'Guided reflection on your personal leadership journey through writing and storytelling exercises.',
          activities: [
            'Write your leadership autobiography (key moments that shaped you)',
            'Identify 3 pivotal experiences that defined your leader self',
            'Articulate your core values and how they connect to leadership',
            'Create a "leadership timeline" mapping your development'
          ],
          source: 'Ely et al. (2011); Day et al. (2021)'
        },
        {
          id: 'possible_selves',
          title: 'Leadership Possible Selves',
          type: 'envision',
          duration: '30-45 min',
          mechanism: 'Identity motivation and self-regulatory alignment with aspirational roles',
          description: 'Envision your future leader self to clarify direction and motivation.',
          activities: [
            'Write a letter from your future leader self (5 years ahead)',
            'Create a "leadership vision board" (visual or written)',
            'Identify the leader you most admire and why',
            'Map obstacles between current and future leader self'
          ],
          source: 'Lord et al. (2017); Day et al. (2021)'
        },
        {
          id: 'role_experimentation',
          title: 'Role-Based Experimentation',
          type: 'practice',
          duration: 'Ongoing',
          mechanism: 'Identity enactment and feedback integration',
          description: 'Try on leadership roles in safe, low-risk settings to build identity through action.',
          activities: [
            'Lead a small project or team initiative',
            'Volunteer to chair a meeting or committee',
            'Mentor a peer or junior colleague',
            'Take on a stretch assignment outside your comfort zone'
          ],
          source: 'Ibarra (1999, 2010); DeRue & Ashford (2010)'
        },
        {
          id: 'identity_feedback',
          title: 'Feedback & Identity Mirroring',
          type: 'feedback',
          duration: '2-3 weeks',
          mechanism: 'Identity coherence through social validation',
          description: 'Understand how others perceive your leadership to build coherent identity.',
          activities: [
            'Request feedback from 3-5 colleagues on your leadership',
            'Compare self-perception with others\' perceptions',
            'Reflect on identity discrepancies with a coach or mentor',
            'Integrate feedback into your leader self-concept'
          ],
          source: 'Day et al. (2021); Conger (2024)'
        },
        {
          id: 'mentoring_identity',
          title: 'Mentoring & Relational Modeling',
          type: 'coach',
          duration: 'Ongoing',
          mechanism: 'Identity scaffolding through relational affirmation',
          description: 'Learn from mentors who share their journeys and validate your emerging leader identity.',
          activities: [
            'Find a mentor whose leadership style you admire',
            'Ask your mentor about their leadership journey and struggles',
            'Discuss your leadership doubts and aspirations',
            'Seek feedback on specific leadership challenges'
          ],
          source: 'Ely et al. (2011); Ibarra et al. (2010)'
        },
        {
          id: 'micro_moments',
          title: 'Empowerment Micro-Moments',
          type: 'practice',
          duration: 'Daily',
          mechanism: 'Identity evidence through small wins',
          description: 'Accumulate daily leadership experiences that confirm your leader identity.',
          activities: [
            'Speak up in a meeting with your perspective',
            'Offer to help resolve a team conflict',
            'Make a decision and own the outcome',
            'Recognize and appreciate someone\'s contribution'
          ],
          source: 'Damon et al. (2024)'
        },
        {
          id: 'values_coaching',
          title: 'Coaching for Authenticity',
          type: 'coach',
          duration: '4-6 sessions',
          mechanism: 'Identity authenticity and sustained confidence',
          description: 'One-on-one coaching focused on values clarification and authentic leadership.',
          activities: [
            'Clarify your core values and non-negotiables',
            'Identify gaps between your values and current behavior',
            'Develop strategies for authentic self-expression',
            'Practice having difficult conversations authentically'
          ],
          source: 'Conger (2024); Day et al. (2021)'
        },
        {
          id: 'transition_support',
          title: 'Identity Transition Support',
          type: 'program',
          duration: '8-12 weeks',
          mechanism: 'Identity redefinition during career thresholds',
          description: 'Structured support for leadership transitions (new role, promotion, career shift).',
          activities: [
            'Map what\'s changing in your leadership context',
            'Identify skills and mindsets to develop',
            'Build a peer support cohort going through similar transitions',
            'Regular reflection on identity evolution'
          ],
          source: 'Conger (2024); DeRue & Ashford (2010)'
        }
      ]
    },
    awareness: {
      id: 'awareness',
      title: 'Self-Awareness',
      subtitle: 'Understanding yourself',
      icon: '🔍',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
      description: 'Self-awareness involves understanding your values, behavioral tendencies, strengths, weaknesses, and impact on others. Most people overestimate their self-awareness.',
      source: 'Day (2024), Chapter 4; Eurich (2017)',
      assessment: SELF_VIEW_ASSESSMENTS.selfAwareness,
      keyQuestion: 'Do you truly understand how you come across to others?',
      interventions: [
        {
          id: 'reflective_journaling',
          title: 'Reflective Practice & Journaling',
          type: 'reflect',
          duration: '15-20 min daily',
          mechanism: 'Metacognition and meaning-making from experience',
          description: 'Structured self-reflection logs following key leadership experiences.',
          activities: [
            'Daily leadership journal (what happened, what you learned)',
            'Record emotional responses to leadership situations',
            'Reflect on what you would do differently',
            'Weekly synthesis: patterns and insights'
          ],
          source: 'Cornett & Parsons (2009); Day et al. (2021)'
        },
        {
          id: '360_feedback',
          title: '360-Degree Feedback',
          type: 'feedback',
          duration: '3-4 weeks',
          mechanism: 'Self-insight and reduction of self-serving bias',
          description: 'Multi-source assessments comparing self-perception with how others see you.',
          activities: [
            'Complete self-assessment on key leadership behaviors',
            'Gather feedback from peers, direct reports, supervisors',
            'Compare self-ratings with others\' ratings',
            'Create development goals based on gaps'
          ],
          source: 'Day et al. (2021); Conger (2024)'
        },
        {
          id: 'self_regulation_coaching',
          title: 'Coaching for Self-Regulation',
          type: 'coach',
          duration: '6-8 sessions',
          mechanism: 'Emotional intelligence and adaptive coping',
          description: 'Individual coaching focused on emotional triggers and self-management.',
          activities: [
            'Map your emotional triggers and patterns',
            'Identify core values driving your reactions',
            'Practice reframing and cognitive restructuring',
            'Develop personalized self-regulation strategies'
          ],
          source: 'Conger (2024); Day et al. (2021)'
        },
        {
          id: 'personality_instruments',
          title: 'Self-Assessment Instruments',
          type: 'assess',
          duration: '30-60 min',
          mechanism: 'Introspection connecting personality to leadership behaviors',
          description: 'Validated personality and style assessments to surface strengths and blind spots.',
          activities: [
            'Complete Big Five personality assessment',
            'Review your KLI competency profile',
            'Explore emotional intelligence assessment',
            'Discuss results with a coach or peer'
          ],
          source: 'Day et al. (2021); Conger (2024)'
        },
        {
          id: 'guided_dialogues',
          title: 'Guided Reflection Dialogues',
          type: 'coach',
          duration: '60 min sessions',
          mechanism: 'Intentional self-reflection and values-behavior alignment',
          description: 'Structured reflective discussions with a facilitator or coach.',
          activities: [
            'Examine a recent leadership decision in depth',
            'Explore emotional responses to workplace dynamics',
            'Align values, behavior, and leadership identity',
            'Identify patterns across multiple situations'
          ],
          source: 'Cornett & Parsons (2009)'
        },
        {
          id: 'awareness_workshop',
          title: 'Self-Awareness Workshop',
          type: 'program',
          duration: '1-2 days',
          mechanism: 'Emotional grounding and self-concept coherence',
          description: 'Intensive sessions combining mindfulness, values clarification, and storytelling.',
          activities: [
            'Mindfulness and body awareness exercises',
            'Values clarification and prioritization',
            'Personal leadership storytelling',
            'Peer feedback and reflection'
          ],
          source: 'Larsson et al. (2018); Day et al. (2021)'
        }
      ]
    },
    efficacy: {
      id: 'efficacy',
      title: 'Leadership Self-Efficacy',
      subtitle: 'Confidence to lead',
      icon: '💪',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Leadership self-efficacy is your confidence in your ability to lead effectively. It\'s built through mastery experiences, role models, social persuasion, and reframing anxiety.',
      source: 'Day (2024), Chapter 4; Bandura (1997)',
      assessment: SELF_VIEW_ASSESSMENTS.leadershipSelfEfficacy,
      keyQuestion: 'Do you believe you can lead effectively?',
      interventions: [
        {
          id: 'mastery_experiences',
          title: 'Mastery Experiences',
          type: 'practice',
          duration: 'Ongoing',
          mechanism: 'Direct experience of success builds strongest efficacy',
          description: 'Structured opportunities to succeed at progressively challenging leadership tasks.',
          activities: [
            'Start with small leadership wins you\'re likely to succeed at',
            'Gradually increase challenge level',
            'Celebrate and document successes',
            'Analyze what made you successful'
          ],
          source: 'Bandura (1997); Day et al. (2021)'
        },
        {
          id: 'vicarious_learning',
          title: 'Vicarious Learning & Role Models',
          type: 'observe',
          duration: 'Ongoing',
          mechanism: 'Seeing similar others succeed increases belief in own capability',
          description: 'Learn from observing leaders you identify with who have succeeded.',
          activities: [
            'Identify leaders similar to you who\'ve succeeded',
            'Study their approaches and strategies',
            'Shadow or observe them in action',
            'Discuss their journey and struggles with them'
          ],
          source: 'Bandura (1997); Day et al. (2021)'
        },
        {
          id: 'social_persuasion',
          title: 'Social Persuasion & Encouragement',
          type: 'feedback',
          duration: 'Ongoing',
          mechanism: 'Verbal encouragement from credible sources',
          description: 'Build confidence through encouragement and recognition from others.',
          activities: [
            'Seek feedback focused on your leadership strengths',
            'Ask mentors to highlight your capabilities',
            'Build a support network that believes in you',
            'Accept compliments without deflecting'
          ],
          source: 'Bandura (1997)'
        },
        {
          id: 'anxiety_reframing',
          title: 'Physiological Reframing',
          type: 'reflect',
          duration: '15-30 min',
          mechanism: 'Reinterpret anxiety as excitement and readiness',
          description: 'Learn to interpret nervous energy as positive arousal rather than fear.',
          activities: [
            'Notice physical sensations before leadership moments',
            'Reframe "I\'m nervous" as "I\'m excited and ready"',
            'Use breathing techniques to manage arousal',
            'Visualize successful outcomes'
          ],
          source: 'Bandura (1997); Brooks (2014)'
        },
        {
          id: 'stretch_assignments',
          title: 'Developmental Stretch Assignments',
          type: 'practice',
          duration: '4-12 weeks',
          mechanism: 'Growth through challenging but achievable tasks',
          description: 'Take on assignments that stretch your capabilities with appropriate support.',
          activities: [
            'Identify a challenge slightly beyond current abilities',
            'Negotiate for appropriate support and resources',
            'Set milestones to track progress',
            'Debrief learning regardless of outcome'
          ],
          source: 'McCall (2010); Day et al. (2021)'
        }
      ]
    },
    regulation: {
      id: 'regulation',
      title: 'Self-Regulation',
      subtitle: 'Managing yourself',
      icon: '⚙️',
      color: 'violet',
      gradient: 'from-violet-500 to-purple-500',
      description: 'Self-regulation is the ability to manage your thoughts, emotions, and behaviors in service of your goals. It enables deliberate practice and sustained development.',
      source: 'Day (2024), Chapter 5; Ericsson (2016)',
      assessment: null,
      keyQuestion: 'Can you manage yourself effectively under pressure?',
      interventions: [
        {
          id: 'deliberate_practice',
          title: 'Deliberate Leadership Practice',
          type: 'practice',
          duration: 'Ongoing',
          mechanism: 'Focused practice at the edge of ability with feedback',
          description: 'Structured practice on specific leadership skills with immediate feedback.',
          activities: [
            'Identify one specific skill to develop',
            'Design practice opportunities with clear goals',
            'Get immediate feedback on performance',
            'Adjust and repeat until mastery'
          ],
          source: 'Ericsson (2016); Day et al. (2021)'
        },
        {
          id: 'emotional_regulation',
          title: 'Emotional Regulation Training',
          type: 'reflect',
          duration: '4-6 weeks',
          mechanism: 'Managing emotional responses adaptively',
          description: 'Develop ability to recognize and regulate emotional responses.',
          activities: [
            'Track emotional patterns in a journal',
            'Identify triggers and early warning signs',
            'Practice pause-and-respond techniques',
            'Develop go-to regulation strategies'
          ],
          source: 'Goleman (1995); Day et al. (2021)'
        },
        {
          id: 'mindfulness_practice',
          title: 'Mindfulness for Leaders',
          type: 'reflect',
          duration: '10-15 min daily',
          mechanism: 'Present-moment awareness and non-reactive observation',
          description: 'Cultivate mindful awareness to improve self-regulation and decision-making.',
          activities: [
            'Daily mindfulness meditation (start with 5 min)',
            'Mindful transitions between meetings',
            'Body scan before difficult conversations',
            'Non-judgmental awareness of thoughts and feelings'
          ],
          source: 'Good et al. (2016)'
        },
        {
          id: 'habit_formation',
          title: 'Leadership Habit Formation',
          type: 'practice',
          duration: '8-12 weeks',
          mechanism: 'Automatizing positive leadership behaviors',
          description: 'Build automatic leadership habits through deliberate repetition.',
          activities: [
            'Identify one leadership behavior to habitualize',
            'Design cue-routine-reward loops',
            'Track habit streak and consistency',
            'Stack new habits onto existing routines'
          ],
          source: 'Clear (2018); Duhigg (2012)'
        },
        {
          id: 'goal_setting',
          title: 'Strategic Goal Setting',
          type: 'envision',
          duration: '2-3 hours',
          mechanism: 'Self-regulatory focus through clear goals',
          description: 'Set and pursue meaningful leadership development goals.',
          activities: [
            'Define SMART development goals',
            'Break into weekly action items',
            'Identify obstacles and mitigation strategies',
            'Regular progress review and adjustment'
          ],
          source: 'Locke & Latham (2002)'
        }
      ]
    }
  };

  const currentArea = developmentAreas[activeArea];
  
  // Intervention type icons and colors
  const typeConfig = {
    reflect: { icon: '📝', label: 'Reflect', color: 'blue' },
    feedback: { icon: '🔄', label: 'Feedback', color: 'teal' },
    practice: { icon: '🎯', label: 'Practice', color: 'green' },
    coach: { icon: '💬', label: 'Coach', color: 'violet' },
    assess: { icon: '📊', label: 'Assess', color: 'amber' },
    envision: { icon: '🔮', label: 'Envision', color: 'indigo' },
    observe: { icon: '👀', label: 'Observe', color: 'orange' },
    program: { icon: '📚', label: 'Program', color: 'rose' }
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 mb-6">
        <h2 className="font-bold text-xl text-amber-800 mb-2">{LEADER_DEVELOPMENT.title}</h2>
        <p className="text-sm text-stone-600 mb-2">{LEADER_DEVELOPMENT.description}</p>
        <p className="text-xs text-stone-500">Source: {LEADER_DEVELOPMENT.source}</p>
      </div>

      {/* Area Navigation Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Object.values(developmentAreas).map(area => (
          <button
            key={area.id}
            onClick={() => { setActiveArea(area.id); setExpandedIntervention(null); }}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
              activeArea === area.id
                ? `bg-gradient-to-r ${area.gradient} text-white shadow-lg`
                : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'
            }`}
          >
            <span className="text-lg">{area.icon}</span>
            <span className="text-sm">{area.title}</span>
          </button>
        ))}
      </div>

      {/* Current Area Detail */}
      <div className="space-y-4">
        {/* Area Header Card */}
        <div className={`bg-gradient-to-br ${
          currentArea.color === 'amber' ? 'from-amber-50 to-orange-50 border-amber-200' :
          currentArea.color === 'blue' ? 'from-blue-50 to-indigo-50 border-blue-200' :
          currentArea.color === 'green' ? 'from-green-50 to-emerald-50 border-green-200' :
          'from-violet-50 to-purple-50 border-violet-200'
        } border rounded-xl p-5`}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{currentArea.icon}</span>
                <h3 className="text-lg font-bold text-stone-800">{currentArea.title}</h3>
              </div>
              <p className="text-sm text-stone-600">{currentArea.subtitle}</p>
            </div>
            {currentArea.assessment && (
              <button
                onClick={() => setCurrentView(`assessment-${currentArea.assessment.id}`)}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r ${currentArea.gradient} shadow hover:shadow-md transition-shadow`}
              >
                📋 Take Assessment
              </button>
            )}
          </div>
          
          <p className="text-sm text-stone-600 mb-3">{currentArea.description}</p>
          
          <div className={`${
            currentArea.color === 'amber' ? 'bg-amber-100/50 text-amber-800' :
            currentArea.color === 'blue' ? 'bg-blue-100/50 text-blue-800' :
            currentArea.color === 'green' ? 'bg-green-100/50 text-green-800' :
            'bg-violet-100/50 text-violet-800'
          } text-sm p-3 rounded-lg`}>
            <span className="font-medium">Key Question:</span> {currentArea.keyQuestion}
          </div>
          
          <p className="text-xs text-stone-500 mt-3">Source: {currentArea.source}</p>
        </div>

        {/* Intervention Type Legend */}
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-xs font-medium text-stone-500 mb-3">INTERVENTION TYPES</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(typeConfig).map(([key, config]) => (
              <span key={key} className="flex items-center gap-1 text-xs text-stone-600 bg-stone-50 px-2 py-1 rounded-full">
                <span>{config.icon}</span>
                <span>{config.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Interventions Grid */}
        <div>
          <h4 className="font-semibold text-stone-800 mb-3">
            {currentArea.interventions.length} Development Interventions
          </h4>
          <div className="space-y-3">
            {currentArea.interventions.map((intervention, idx) => {
              const typeInfo = typeConfig[intervention.type];
              const isExpanded = expandedIntervention === intervention.id;
              
              return (
                <div
                  key={intervention.id}
                  className={`bg-white rounded-xl border transition-all ${
                    isExpanded ? 'border-stone-300 shadow-md' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {/* Intervention Header */}
                  <button
                    onClick={() => setExpandedIntervention(isExpanded ? null : intervention.id)}
                    className="w-full p-4 text-left"
                  >
                    <div className="flex items-start gap-3">
                      {/* Number Badge */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br ${currentArea.gradient}`}>
                        {idx + 1}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-semibold text-stone-800">{intervention.title}</h5>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            typeInfo.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            typeInfo.color === 'teal' ? 'bg-teal-100 text-teal-700' :
                            typeInfo.color === 'green' ? 'bg-green-100 text-green-700' :
                            typeInfo.color === 'violet' ? 'bg-violet-100 text-violet-700' :
                            typeInfo.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                            typeInfo.color === 'indigo' ? 'bg-indigo-100 text-indigo-700' :
                            typeInfo.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                            'bg-rose-100 text-rose-700'
                          }`}>
                            {typeInfo.icon} {typeInfo.label}
                          </span>
                        </div>
                        
                        <p className="text-sm text-stone-600">{intervention.description}</p>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-stone-500">⏱️ {intervention.duration}</span>
                        </div>
                      </div>
                      
                      <Icons.ChevronDown className={`text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0 border-t border-stone-100">
                      {/* Mechanism */}
                      <div className={`${
                        currentArea.color === 'amber' ? 'bg-amber-50 border-amber-200' :
                        currentArea.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                        currentArea.color === 'green' ? 'bg-green-50 border-green-200' :
                        'bg-violet-50 border-violet-200'
                      } border rounded-lg p-3 mt-4 mb-4`}>
                        <p className="text-xs font-medium text-stone-500 mb-1">HOW IT WORKS</p>
                        <p className="text-sm text-stone-700">{intervention.mechanism}</p>
                      </div>
                      
                      {/* Activities */}
                      <div className="mb-4">
                        <p className="text-xs font-medium text-stone-500 mb-2">ACTIVITIES</p>
                        <div className="space-y-2">
                          {intervention.activities.map((activity, actIdx) => (
                            <div key={actIdx} className="flex items-start gap-2">
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium text-white bg-gradient-to-br ${currentArea.gradient}`}>
                                {actIdx + 1}
                              </span>
                              <p className="text-sm text-stone-600 flex-1">{activity}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Source */}
                      <p className="text-xs text-stone-500">📚 {intervention.source}</p>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => setCurrentView('journal')}
                          className="flex-1 px-4 py-2 bg-stone-100 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-200 transition-colors"
                        >
                          📝 Start in Journal
                        </button>
                        <button
                          onClick={() => setCurrentView('coaches')}
                          className="flex-1 px-4 py-2 bg-stone-100 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-200 transition-colors"
                        >
                          💬 Discuss with Coach
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* External Resources */}
        <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 mt-6">
          <h4 className="font-semibold text-stone-800 mb-3">🔗 External Assessments</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="https://principlesyou.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-blue-300 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icons.ExternalLink className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-stone-800">PrinciplesYou</p>
                <p className="text-xs text-stone-500">17-trait assessment by Grant & Dalio</p>
              </div>
            </a>
            <a
              href="https://www.outofservice.com/bigfive/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-stone-200 hover:border-blue-300 transition-colors"
            >
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <Icons.ExternalLink className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="font-medium text-stone-800">Big Five (Short)</p>
                <p className="text-xs text-stone-500">Quick personality assessment</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadershipDevelopmentTab({ setCurrentView }) {
  const [activeArea, setActiveArea] = useState('team-learning');
  const [expandedIntervention, setExpandedIntervention] = useState(null);

  // Comprehensive development areas with all research-based interventions
  const developmentAreas = {
    'team-learning': {
      id: 'team-learning',
      title: 'Team Learning & Action',
      subtitle: 'Collective problem-solving',
      icon: '🎯',
      color: 'teal',
      gradient: 'from-teal-500 to-cyan-500',
      description: 'Build collective capacity through real-world challenges that require teams to learn, reflect, and act together.',
      source: 'Day et al. (2021); Raelin (2016)',
      keyQuestion: 'How does your team learn and solve problems together?',
      interventions: [
        {
          id: 'action_learning_teams',
          title: 'Action Learning Teams',
          type: 'team',
          duration: '3-6 months',
          mechanism: 'Builds collective problem-solving, shared accountability, and systems thinking',
          description: 'Cross-functional groups work on live organizational challenges, combining inquiry, reflection, and action.',
          activities: [
            'Form a cross-functional team around a real business challenge',
            'Conduct structured reflection sessions after each work cycle',
            'Use peer coaching within the team to surface assumptions',
            'Present solutions to leadership with lessons learned'
          ],
          source: 'Day et al. (2021); Raelin (2016); Marsick & O\'Neil (2019)'
        },
        {
          id: 'shared_leadership_simulations',
          title: 'Shared Leadership Simulations',
          type: 'practice',
          duration: '1-2 days',
          mechanism: 'Reinforces fluid leadership roles and distributed decision-making',
          description: 'Teams jointly manage dynamic, ambiguous scenarios where leadership rotates based on task expertise.',
          activities: [
            'Participate in crisis response or innovation simulations',
            'Rotate leadership roles based on who has relevant expertise',
            'Debrief on how leadership shifted during the exercise',
            'Identify patterns in when and how leadership emerged'
          ],
          source: 'Day et al. (2021); DeRue (2011)'
        }
      ]
    },
    'team-coaching': {
      id: 'team-coaching',
      title: 'Team Coaching & Dialogue',
      subtitle: 'Trust and communication',
      icon: '💬',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
      description: 'Strengthen psychological safety, communication, and relational coordination through facilitated dialogue.',
      source: 'Hawkins (2017); Raelin (2016)',
      keyQuestion: 'Does your team have the trust to have difficult conversations?',
      interventions: [
        {
          id: 'team_coaching',
          title: 'Team Coaching & Reflective Dialogue',
          type: 'coach',
          duration: 'Ongoing (monthly)',
          mechanism: 'Strengthens psychological safety, communication, and relational coordination',
          description: 'External or internal coaches facilitate team conversations focused on trust, decision processes, and shared purpose.',
          activities: [
            'Conduct 360° team feedback assessment',
            'Facilitate dialogue on team decision-making processes',
            'Explore underlying assumptions and mental models',
            'Create team agreements for how to work together'
          ],
          source: 'Hawkins (2017); Raelin (2016)'
        },
        {
          id: 'leadership_rounds',
          title: 'Leadership-in-Practice Forums',
          type: 'forum',
          duration: 'Regular (bi-weekly)',
          mechanism: 'Cultivates collective mindfulness and shared leadership narratives',
          description: 'Regular, open forums where cross-level groups discuss current organizational dilemmas and share leadership perspectives.',
          activities: [
            'Schedule regular cross-level leadership forums',
            'Present real organizational dilemmas for discussion',
            'Encourage diverse perspectives from all levels',
            'Document shared learnings and emerging leadership narratives'
          ],
          source: 'Raelin (2016); Carroll & Nicholson (2014)'
        },
        {
          id: 'collective_retreats',
          title: 'Collective Reflection Retreats',
          type: 'program',
          duration: '1-3 days',
          mechanism: 'Promotes co-created meaning and shared vision alignment',
          description: 'Offsite retreats using dialogue, storytelling, and facilitated systems reflection to review leadership culture.',
          activities: [
            'Design a retreat focused on leadership culture review',
            'Use storytelling to surface shared values and identity',
            'Facilitate systems reflection on team patterns',
            'Co-create vision and commitments for the future'
          ],
          source: 'Day et al. (2021); Ely et al. (2011)'
        }
      ]
    },
    'networks': {
      id: 'networks',
      title: 'Networks & Boundaries',
      subtitle: 'Cross-boundary leadership',
      icon: '🔗',
      color: 'violet',
      gradient: 'from-violet-500 to-purple-500',
      description: 'Build leadership capacity that spans teams, functions, and organizations to address complex challenges.',
      source: 'Uhl-Bien & Arena (2018); Cross et al. (2013)',
      keyQuestion: 'How well does your leadership span organizational boundaries?',
      interventions: [
        {
          id: 'cross_boundary_labs',
          title: 'Cross-Boundary Leadership Labs',
          type: 'program',
          duration: '3-6 months',
          mechanism: 'Fosters boundary-spanning awareness and collective sensemaking under complexity',
          description: 'Groups from different units or sectors collaborate on adaptive, real-world "wicked problems."',
          activities: [
            'Convene leaders from different units around a wicked problem',
            'Use systems mapping to visualize the challenge',
            'Facilitate stakeholder dialogue across boundaries',
            'Prototype and test solutions collaboratively'
          ],
          source: 'Uhl-Bien & Arena (2018); Ospina & Foldy (2010)'
        },
        {
          id: 'peer_coaching_networks',
          title: 'Peer Coaching Networks',
          type: 'coach',
          duration: 'Ongoing (6+ months)',
          mechanism: 'Encourages mutual learning, reflection, and trust-based influence',
          description: 'Groups of leaders at similar levels engage in structured reciprocal coaching to share insights and accountability.',
          activities: [
            'Form peer coaching triads or small groups',
            'Establish regular coaching meeting rhythm',
            'Use structured coaching protocols (e.g., GROW model)',
            'Track and share progress on developmental goals'
          ],
          source: 'Parker et al. (2020); Ely et al. (2011)'
        },
        {
          id: 'network_mapping',
          title: 'Network Leadership Mapping',
          type: 'assess',
          duration: '2-4 weeks',
          mechanism: 'Enhances relational leadership capital and organizational connectivity',
          description: 'Use social network analysis to visualize and intentionally strengthen leadership connections and influence flows.',
          activities: [
            'Conduct social network analysis survey',
            'Visualize current leadership network patterns',
            'Identify gaps and opportunities in connections',
            'Design intentional relationship-building actions'
          ],
          source: 'Cross, Ernst & Pasmore (2013); Uhl-Bien (2021)'
        }
      ]
    },
    'systems': {
      id: 'systems',
      title: 'Communities & Systems',
      subtitle: 'Organizational learning',
      icon: '🌐',
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-500',
      description: 'Create structures and practices that enable collective learning and adaptive leadership at scale.',
      source: 'Wenger-Trayner et al. (2015); Reason & Bradbury (2013)',
      keyQuestion: 'How does leadership learning happen across your organization?',
      interventions: [
        {
          id: 'communities_of_practice',
          title: 'Communities of Practice (CoP)',
          type: 'community',
          duration: 'Ongoing',
          mechanism: 'Builds collective identity, knowledge diffusion, and cultural alignment',
          description: 'Voluntary networks around shared domains where members share experiences and jointly learn leadership-in-action.',
          activities: [
            'Identify a shared domain of practice (e.g., innovation, equity)',
            'Recruit voluntary members who share the interest',
            'Establish regular meeting rhythm and practices',
            'Document and share learnings across the organization'
          ],
          source: 'Wenger-Trayner et al. (2015)'
        },
        {
          id: 'systemic_action_research',
          title: 'Systemic Action Research',
          type: 'research',
          duration: '6-12 months',
          mechanism: 'Deepens collective reflection and adaptive learning across organizational boundaries',
          description: 'Ongoing inquiry cycles involving multiple stakeholder groups who co-diagnose challenges and co-design interventions.',
          activities: [
            'Convene multiple stakeholder groups around a system challenge',
            'Conduct collaborative diagnosis of root causes',
            'Co-design interventions with affected stakeholders',
            'Implement and reflect in iterative cycles'
          ],
          source: 'Reason & Bradbury (2013); Cornett & Parsons (2009)'
        }
      ]
    }
  };

  const currentArea = developmentAreas[activeArea];
  
  // Intervention type icons and colors
  const typeConfig = {
    team: { icon: '👥', label: 'Team', color: 'teal' },
    practice: { icon: '🎯', label: 'Practice', color: 'green' },
    coach: { icon: '💬', label: 'Coach', color: 'blue' },
    forum: { icon: '🗣️', label: 'Forum', color: 'amber' },
    program: { icon: '📚', label: 'Program', color: 'rose' },
    assess: { icon: '📊', label: 'Assess', color: 'violet' },
    community: { icon: '🌐', label: 'Community', color: 'emerald' },
    research: { icon: '🔬', label: 'Research', color: 'indigo' }
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-5 mb-6">
        <h2 className="font-bold text-xl text-teal-800 mb-2">{LEADERSHIP_DEVELOPMENT.title}</h2>
        <p className="text-sm text-stone-600 mb-2">{LEADERSHIP_DEVELOPMENT.description}</p>
        <p className="text-xs text-stone-500">Source: {LEADERSHIP_DEVELOPMENT.source}</p>
      </div>

      {/* Area Navigation Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Object.values(developmentAreas).map(area => (
          <button
            key={area.id}
            onClick={() => { setActiveArea(area.id); setExpandedIntervention(null); }}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
              activeArea === area.id
                ? `bg-gradient-to-r ${area.gradient} text-white shadow-lg`
                : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'
            }`}
          >
            <span className="text-lg">{area.icon}</span>
            <span className="text-sm">{area.title}</span>
          </button>
        ))}
      </div>

      {/* Current Area Detail */}
      <div className="space-y-4">
        {/* Area Header Card */}
        <div className={`bg-gradient-to-br ${
          currentArea.color === 'teal' ? 'from-teal-50 to-cyan-50 border-teal-200' :
          currentArea.color === 'blue' ? 'from-blue-50 to-indigo-50 border-blue-200' :
          currentArea.color === 'violet' ? 'from-violet-50 to-purple-50 border-violet-200' :
          'from-emerald-50 to-green-50 border-emerald-200'
        } border rounded-xl p-5`}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{currentArea.icon}</span>
                <h3 className="text-lg font-bold text-stone-800">{currentArea.title}</h3>
              </div>
              <p className="text-sm text-stone-600">{currentArea.subtitle}</p>
            </div>
          </div>
          
          <p className="text-sm text-stone-600 mb-3">{currentArea.description}</p>
          
          <div className={`${
            currentArea.color === 'teal' ? 'bg-teal-100/50 text-teal-800' :
            currentArea.color === 'blue' ? 'bg-blue-100/50 text-blue-800' :
            currentArea.color === 'violet' ? 'bg-violet-100/50 text-violet-800' :
            'bg-emerald-100/50 text-emerald-800'
          } text-sm p-3 rounded-lg`}>
            <span className="font-medium">Key Question:</span> {currentArea.keyQuestion}
          </div>
          
          <p className="text-xs text-stone-500 mt-3">Source: {currentArea.source}</p>
        </div>

        {/* Intervention Type Legend */}
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-xs font-medium text-stone-500 mb-3">INTERVENTION TYPES</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(typeConfig).map(([key, config]) => (
              <span key={key} className="flex items-center gap-1 text-xs text-stone-600 bg-stone-50 px-2 py-1 rounded-full">
                <span>{config.icon}</span>
                <span>{config.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Interventions Grid */}
        <div>
          <h4 className="font-semibold text-stone-800 mb-3">
            {currentArea.interventions.length} Development Interventions
          </h4>
          <div className="space-y-3">
            {currentArea.interventions.map((intervention, idx) => {
              const typeInfo = typeConfig[intervention.type];
              const isExpanded = expandedIntervention === intervention.id;
              
              return (
                <div
                  key={intervention.id}
                  className={`bg-white rounded-xl border transition-all ${
                    isExpanded ? 'border-stone-300 shadow-md' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {/* Intervention Header */}
                  <button
                    onClick={() => setExpandedIntervention(isExpanded ? null : intervention.id)}
                    className="w-full p-4 text-left"
                  >
                    <div className="flex items-start gap-3">
                      {/* Number Badge */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br ${currentArea.gradient}`}>
                        {idx + 1}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-semibold text-stone-800">{intervention.title}</h5>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            typeInfo.color === 'teal' ? 'bg-teal-100 text-teal-700' :
                            typeInfo.color === 'green' ? 'bg-green-100 text-green-700' :
                            typeInfo.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            typeInfo.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                            typeInfo.color === 'rose' ? 'bg-rose-100 text-rose-700' :
                            typeInfo.color === 'violet' ? 'bg-violet-100 text-violet-700' :
                            typeInfo.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-indigo-100 text-indigo-700'
                          }`}>
                            {typeInfo.icon} {typeInfo.label}
                          </span>
                        </div>
                        
                        <p className="text-sm text-stone-600">{intervention.description}</p>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-stone-500">⏱️ {intervention.duration}</span>
                        </div>
                      </div>
                      
                      <Icons.ChevronDown className={`text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-0 border-t border-stone-100">
                      {/* Mechanism */}
                      <div className={`${
                        currentArea.color === 'teal' ? 'bg-teal-50 border-teal-200' :
                        currentArea.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                        currentArea.color === 'violet' ? 'bg-violet-50 border-violet-200' :
                        'bg-emerald-50 border-emerald-200'
                      } border rounded-lg p-3 mt-4 mb-4`}>
                        <p className="text-xs font-medium text-stone-500 mb-1">HOW IT WORKS</p>
                        <p className="text-sm text-stone-700">{intervention.mechanism}</p>
                      </div>
                      
                      {/* Activities */}
                      <div className="mb-4">
                        <p className="text-xs font-medium text-stone-500 mb-2">ACTIVITIES</p>
                        <div className="space-y-2">
                          {intervention.activities.map((activity, actIdx) => (
                            <div key={actIdx} className="flex items-start gap-2">
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium text-white bg-gradient-to-br ${currentArea.gradient}`}>
                                {actIdx + 1}
                              </span>
                              <p className="text-sm text-stone-600 flex-1">{activity}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Source */}
                      <p className="text-xs text-stone-500">📚 {intervention.source}</p>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => setCurrentView('journal')}
                          className="flex-1 px-4 py-2 bg-stone-100 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-200 transition-colors"
                        >
                          📝 Reflect in Journal
                        </button>
                        <button
                          onClick={() => setCurrentView('coaches')}
                          className="flex-1 px-4 py-2 bg-stone-100 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-200 transition-colors"
                        >
                          💬 Discuss with Coach
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Assessment Section */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 mt-6">
          <h4 className="font-semibold text-stone-800 mb-3">📊 Team Assessments</h4>
          <p className="text-sm text-stone-600 mb-4">Assess your team's collective capacity with these research-based instruments.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => setCurrentView('assessment-psychological_safety')}
              className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg border border-teal-200 hover:border-teal-300 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">🛡️</span>
              </div>
              <div>
                <p className="font-medium text-stone-800">Psychological Safety</p>
                <p className="text-xs text-stone-500">Team climate assessment</p>
              </div>
            </button>
            <button
              onClick={() => setCurrentView('assessment-collective_efficacy')}
              className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">💪</span>
              </div>
              <div>
                <p className="font-medium text-stone-800">Collective Efficacy</p>
                <p className="text-xs text-stone-500">Team confidence assessment</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ASSESSMENT VIEW (Take Self-View Assessments)
// ============================================================================

function AssessmentView({ assessmentId, setCurrentView, user }) {
  const [currentItem, setCurrentItem] = useState(0);
  const [responses, setResponses] = useState({});
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState(null);

  // Find the assessment in all assessment sources
  let assessment = null;
  let assessmentType = 'simple'; // simple, bigfive, kli
  
  if (assessmentId === 'big_five') {
    assessment = BIG_FIVE_ASSESSMENT;
    assessmentType = 'bigfive';
  } else if (assessmentId === 'kli_competency') {
    assessment = KLI_COMPETENCY_ASSESSMENT;
    assessmentType = 'kli';
  } else if (assessmentId === 'learning_orientation') {
    assessment = LEARNING_ORIENTATION_ASSESSMENT;
    assessmentType = 'simple';
  } else {
    assessment = SELF_VIEW_ASSESSMENTS[assessmentId] || 
                 Object.values(SELF_VIEW_ASSESSMENTS).find(a => a.id === assessmentId) ||
                 COLLECTIVE_ASSESSMENTS[assessmentId] ||
                 Object.values(COLLECTIVE_ASSESSMENTS).find(a => a.id === assessmentId);
  }

  if (!assessment) {
    return (
      <div className="animate-fadeIn">
        <button onClick={() => setCurrentView('develop')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
          <Icons.ChevronLeft /> Back
        </button>
        <p>Assessment not found.</p>
      </div>
    );
  }

  const isIndividual = assessmentType !== 'simple' || 
                       Object.keys(SELF_VIEW_ASSESSMENTS).includes(assessmentId) || 
                       Object.values(SELF_VIEW_ASSESSMENTS).some(a => a.id === assessmentId);

  const handleResponse = (itemId, value) => {
    const newResponses = { ...responses, [itemId]: value };
    setResponses(newResponses);
    
    if (currentItem < assessment.items.length - 1) {
      setTimeout(() => setCurrentItem(currentItem + 1), 300);
    }
  };

  const calculateResults = () => {
    if (assessmentType === 'bigfive') {
      // Calculate factor scores for Big Five
      const factorScores = {};
      assessment.factors.forEach(factor => {
        const factorItems = assessment.items.filter(item => item.factor === factor.id);
        const scores = factorItems.map(item => {
          const response = responses[item.id] || 0;
          return item.reversed ? (assessment.scale.length - 1 - response) : response;
        });
        const avg = (scores.reduce((a, b) => a + b, 0) / scores.length) + 1;
        factorScores[factor.id] = {
          score: avg.toFixed(2),
          label: avg <= 2.5 ? 'Low' : avg <= 3.5 ? 'Moderate' : 'High',
          name: factor.name,
          color: factor.color,
          implication: factor.leadershipImplication
        };
      });
      return { type: 'bigfive', factorScores, responses: { ...responses } };
    } else if (assessmentType === 'kli') {
      // Calculate competency and capability scores for KLI
      const competencyScores = {};
      assessment.competencies.forEach(comp => {
        const capabilityScores = {};
        comp.capabilities.forEach(cap => {
          const capItems = assessment.items.filter(item => item.capability === cap.id);
          const scores = capItems.map(item => {
            const response = responses[item.id] || 0;
            return response + 1;
          });
          const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
          capabilityScores[cap.id] = {
            score: avg.toFixed(2),
            label: avg <= 2.5 ? 'Development Priority' : avg <= 3.5 ? 'Developing' : 'Strength',
            name: cap.name
          };
        });
        // Calculate overall competency score
        const allCompItems = assessment.items.filter(item => item.competency === comp.id);
        const allScores = allCompItems.map(item => (responses[item.id] || 0) + 1);
        const compAvg = allScores.reduce((a, b) => a + b, 0) / allScores.length;
        competencyScores[comp.id] = {
          score: compAvg.toFixed(2),
          label: compAvg <= 2.5 ? 'Development Priority' : compAvg <= 3.5 ? 'Developing' : 'Strength',
          name: comp.name,
          color: comp.color,
          capabilities: capabilityScores
        };
      });
      return { type: 'kli', competencyScores, responses: { ...responses } };
    } else {
      // Simple assessment scoring
      const scores = assessment.items.map(item => {
        const response = responses[item.id] || 0;
        const score = item.reversed ? (assessment.scale.length - response) : response + 1;
        return score;
      });
      const average = scores.reduce((a, b) => a + b, 0) / scores.length;
      const maxScore = assessment.scale.length;
      
      let interpretation = '';
      if (average <= assessment.interpretation.low.range[1]) {
        interpretation = assessment.interpretation.low.message;
      } else if (average <= assessment.interpretation.moderate.range[1]) {
        interpretation = assessment.interpretation.moderate.message;
      } else {
        interpretation = assessment.interpretation.high.message;
      }
      
      return { type: 'simple', average: average.toFixed(2), maxScore, interpretation, responses: { ...responses } };
    }
  };

  const handleComplete = async () => {
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setCompleted(true);
    
    if (user) {
      try {
        await supabase.from('assessment_responses').insert({
          user_id: user.id,
          assessment_id: assessment.id,
          responses: responses,
          results: calculatedResults,
          completed_at: new Date().toISOString()
        });
      } catch (e) {
        console.error('Error saving assessment:', e);
      }
    }
  };

  const allAnswered = Object.keys(responses).length === assessment.items.length;

  // RESULTS VIEW
  if (completed && results) {
    return (
      <div className="animate-fadeIn">
        <button onClick={() => setCurrentView('develop')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
          <Icons.ChevronLeft /> Back to Develop
        </button>

        <div className="bg-gradient-to-br from-violet-50 to-amber-50 border border-violet-200 rounded-xl p-6 mb-6">
          <div className="text-4xl mb-4 text-center">📊</div>
          <h1 className="text-xl font-bold text-stone-800 mb-2 text-center">{assessment.title} Results</h1>
        </div>

        {/* Big Five Results */}
        {results.type === 'bigfive' && (
          <div className="space-y-4 mb-6">
            {Object.values(results.factorScores).map((factor, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-stone-200 p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-stone-800">{factor.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    factor.label === 'High' ? 'bg-green-100 text-green-700' :
                    factor.label === 'Low' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>{factor.label}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 h-3 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        factor.color === 'violet' ? 'bg-violet-500' :
                        factor.color === 'amber' ? 'bg-amber-500' :
                        factor.color === 'orange' ? 'bg-orange-500' :
                        factor.color === 'teal' ? 'bg-teal-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${(factor.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-stone-700 w-12">{factor.score}/5</span>
                </div>
                <p className="text-xs text-stone-500">{factor.implication}</p>
              </div>
            ))}
          </div>
        )}

        {/* KLI Competency Results */}
        {results.type === 'kli' && (
          <div className="space-y-6 mb-6">
            {Object.values(results.competencyScores).map((comp, idx) => (
              <div key={idx} className={`rounded-xl border p-4 ${
                comp.color === 'amber' ? 'bg-amber-50 border-amber-200' :
                comp.color === 'violet' ? 'bg-violet-50 border-violet-200' :
                'bg-teal-50 border-teal-200'
              }`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-stone-800">{comp.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-stone-800">{comp.score}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      comp.label === 'Strength' ? 'bg-green-100 text-green-700' :
                      comp.label === 'Development Priority' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{comp.label}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.values(comp.capabilities).map((cap, capIdx) => (
                    <div key={capIdx} className="bg-white/60 rounded-lg p-2 text-center">
                      <p className="text-xs font-medium text-stone-700">{cap.name}</p>
                      <p className="text-lg font-bold text-stone-800">{cap.score}</p>
                      <p className={`text-xs ${
                        cap.label === 'Strength' ? 'text-green-600' :
                        cap.label === 'Development Priority' ? 'text-orange-600' :
                        'text-blue-600'
                      }`}>{cap.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Simple Assessment Results */}
        {results.type === 'simple' && (
          <>
            <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6 text-center">
              <span className="text-4xl font-bold text-stone-800">{results.average}</span>
              <span className="text-stone-500 text-xl"> / {results.maxScore}</span>
            </div>
            <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6">
              <h2 className="font-semibold text-stone-800 mb-3">Interpretation</h2>
              <p className="text-stone-600">{results.interpretation}</p>
            </div>
          </>
        )}

        {assessment.developmentTips && (
          <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6">
            <h2 className="font-semibold text-stone-800 mb-3">Development Tips</h2>
            <ul className="space-y-2">
              {assessment.developmentTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="text-amber-500">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => setCurrentView('develop')}
          className="w-full bg-amber-600 text-white py-3 rounded-xl font-medium"
        >
          Continue Developing
        </button>
      </div>
    );
  }

  // ASSESSMENT TAKING VIEW
  const item = assessment.items[currentItem];
  const progress = ((currentItem + 1) / assessment.items.length) * 100;

  // Get context info for the current item (factor for Big Five, competency for KLI)
  let contextInfo = null;
  if (assessmentType === 'bigfive') {
    const factor = assessment.factors.find(f => f.id === item.factor);
    contextInfo = { label: factor?.name, color: factor?.color };
  } else if (assessmentType === 'kli') {
    const comp = assessment.competencies.find(c => c.id === item.competency);
    const cap = comp?.capabilities.find(cap => cap.id === item.capability);
    contextInfo = { label: `${comp?.name} → ${cap?.name}`, color: comp?.color };
  }

  return (
    <div className="animate-fadeIn">
      <button onClick={() => setCurrentView('develop')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
        <Icons.ChevronLeft /> Back
      </button>

      <div className={`${
        assessmentType === 'bigfive' ? 'bg-gradient-to-r from-violet-50 to-amber-50 border-violet-200' :
        assessmentType === 'kli' ? 'bg-gradient-to-r from-amber-50 to-teal-50 border-amber-200' :
        isIndividual ? 'bg-amber-50 border-amber-200' : 'bg-teal-50 border-teal-200'
      } border rounded-xl p-4 mb-4`}>
        <h1 className="text-lg font-bold text-stone-800 mb-1">{assessment.title}</h1>
        <p className="text-sm text-stone-600">{assessment.subtitle}</p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-stone-500 mb-2">
          <span>Question {currentItem + 1} of {assessment.items.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              assessmentType === 'bigfive' ? 'bg-violet-500' :
              assessmentType === 'kli' ? 'bg-amber-500' :
              'bg-amber-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        {contextInfo && (
          <div className="mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              contextInfo.color === 'amber' ? 'bg-amber-100 text-amber-700' :
              contextInfo.color === 'violet' ? 'bg-violet-100 text-violet-700' :
              contextInfo.color === 'teal' ? 'bg-teal-100 text-teal-700' :
              contextInfo.color === 'orange' ? 'bg-orange-100 text-orange-700' :
              'bg-blue-100 text-blue-700'
            }`}>{contextInfo.label}</span>
          </div>
        )}
      </div>

      {/* Current Item */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 mb-6">
        <p className="text-lg text-stone-800 mb-6 leading-relaxed">{item.text}</p>
        
        <div className="space-y-2">
          {assessment.scale.map((label, idx) => (
            <button
              key={idx}
              onClick={() => handleResponse(item.id, idx)}
              className={`w-full p-3 rounded-lg border text-left transition-all ${
                responses[item.id] === idx
                  ? 'border-amber-500 bg-amber-50 text-amber-800'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {currentItem > 0 && (
          <button
            onClick={() => setCurrentItem(currentItem - 1)}
            className="px-4 py-3 border border-stone-300 rounded-xl text-stone-600"
          >
            <Icons.ChevronLeft />
          </button>
        )}
        {allAnswered && (
          <button
            onClick={handleComplete}
            className="flex-1 bg-amber-600 text-white py-3 rounded-xl font-medium"
          >
            See Results
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// LEADER IDENTITY HUB (Rich Visual Interface for Identity Interventions)
// ============================================================================

function LeaderIdentityHub({ setCurrentView, user }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedIntervention, setExpandedIntervention] = useState(null);
  const [expandedActivity, setExpandedActivity] = useState(null);
  
  const data = LEADER_IDENTITY_INTERVENTIONS;
  
  const filteredInterventions = selectedCategory === 'all' 
    ? data.interventions 
    : data.interventions.filter(i => i.category === selectedCategory);
  
  const getEffortBadge = (effort) => {
    switch (effort) {
      case 'low': return { label: 'Light', color: 'bg-green-100 text-green-700', dots: 1 };
      case 'moderate': return { label: 'Moderate', color: 'bg-amber-100 text-amber-700', dots: 2 };
      case 'high': return { label: 'Intensive', color: 'bg-orange-100 text-orange-700', dots: 3 };
      default: return { label: 'Varies', color: 'bg-stone-100 text-stone-600', dots: 2 };
    }
  };
  
  const getCategoryColor = (categoryId) => {
    const cat = data.categories.find(c => c.id === categoryId);
    switch (cat?.color) {
      case 'violet': return { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', accent: 'bg-violet-500' };
      case 'amber': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', accent: 'bg-amber-500' };
      case 'teal': return { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', accent: 'bg-teal-500' };
      case 'blue': return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', accent: 'bg-blue-500' };
      default: return { bg: 'bg-stone-50', border: 'border-stone-200', text: 'text-stone-700', accent: 'bg-stone-500' };
    }
  };

  return (
    <div className="animate-fadeIn">
      <button onClick={() => setCurrentView('develop')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
        <Icons.ChevronLeft /> Back to Develop
      </button>

      {/* Header */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-amber-200 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
            🪞
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-stone-800 mb-1">{data.title}</h1>
            <p className="text-sm text-stone-600 mb-3">{data.description}</p>
            <button
              onClick={() => setCurrentView(`assessment-${data.assessment}`)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              📋 Take Identity Assessment First
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-stone-700 mb-3">Filter by Approach</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-stone-800 text-white' 
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All ({data.interventions.length})
          </button>
          {data.categories.map(cat => {
            const count = data.interventions.filter(i => i.category === cat.id).length;
            const colors = getCategoryColor(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === cat.id 
                    ? `${colors.accent} text-white` 
                    : `${colors.bg} ${colors.text} hover:opacity-80`
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Description (when filtered) */}
      {selectedCategory !== 'all' && (
        <div className={`${getCategoryColor(selectedCategory).bg} ${getCategoryColor(selectedCategory).border} border rounded-xl p-4 mb-6`}>
          <p className="text-sm text-stone-600">
            {data.categories.find(c => c.id === selectedCategory)?.description}
          </p>
        </div>
      )}

      {/* Intervention Cards */}
      <div className="space-y-4">
        {filteredInterventions.map(intervention => {
          const colors = getCategoryColor(intervention.category);
          const effort = getEffortBadge(intervention.effort);
          const isExpanded = expandedIntervention === intervention.id;
          const category = data.categories.find(c => c.id === intervention.category);
          
          return (
            <div 
              key={intervention.id} 
              className={`bg-white rounded-xl border ${isExpanded ? colors.border : 'border-stone-200'} overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-lg' : 'hover:shadow-md'}`}
            >
              {/* Card Header */}
              <button
                onClick={() => setExpandedIntervention(isExpanded ? null : intervention.id)}
                className="w-full p-5 text-left"
              >
                <div className="flex items-start gap-4">
                  {/* Category Icon */}
                  <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                    {category?.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-stone-800">{intervention.title}</h3>
                      <Icons.ChevronDown className={`w-5 h-5 text-stone-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                    
                    <p className="text-sm text-stone-600 mb-3 line-clamp-2">{intervention.description}</p>
                    
                    {/* Meta badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full">
                        <Icons.Clock /> {intervention.duration}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${effort.color}`}>
                        {'●'.repeat(effort.dots)}{'○'.repeat(3-effort.dots)} {effort.label}
                      </span>
                      <span className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded-full">
                        {intervention.format}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
              
              {/* Expanded Content */}
              {isExpanded && (
                <div className={`border-t ${colors.border}`}>
                  {/* Mechanism */}
                  <div className={`${colors.bg} px-5 py-3`}>
                    <p className="text-xs font-medium text-stone-500 mb-1">Learning Mechanism</p>
                    <p className={`text-sm ${colors.text} font-medium`}>💡 {intervention.mechanism}</p>
                  </div>
                  
                  {/* Activities */}
                  <div className="p-5">
                    <h4 className="font-semibold text-stone-800 mb-4">
                      Activities ({intervention.activities.length})
                    </h4>
                    
                    <div className="space-y-3">
                      {intervention.activities.map((activity, idx) => {
                        const activityKey = `${intervention.id}-${idx}`;
                        const isActivityExpanded = expandedActivity === activityKey;
                        
                        return (
                          <div 
                            key={idx}
                            className={`rounded-xl border ${isActivityExpanded ? colors.border : 'border-stone-200'} overflow-hidden`}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedActivity(isActivityExpanded ? null : activityKey);
                              }}
                              className={`w-full px-4 py-3 text-left flex items-center justify-between ${isActivityExpanded ? colors.bg : 'hover:bg-stone-50'}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`w-7 h-7 rounded-full ${colors.accent} text-white flex items-center justify-center text-sm font-medium`}>
                                  {idx + 1}
                                </span>
                                <div>
                                  <p className="font-medium text-stone-800">{activity.title}</p>
                                  <p className="text-xs text-stone-500">{activity.duration}</p>
                                </div>
                              </div>
                              <Icons.ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isActivityExpanded ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isActivityExpanded && (
                              <div className="px-4 pb-4 pt-2 border-t border-stone-100">
                                <div className="mb-4">
                                  <p className="text-xs font-medium text-stone-500 mb-1">Instructions</p>
                                  <p className="text-sm text-stone-700">{activity.instructions}</p>
                                </div>
                                <div className={`${colors.bg} rounded-lg p-3`}>
                                  <p className="text-xs font-medium text-stone-500 mb-1">Reflection Question</p>
                                  <p className={`text-sm ${colors.text} italic`}>"{activity.reflection}"</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Sources */}
                    <p className="text-xs text-stone-400 mt-4 pt-4 border-t border-stone-100">
                      Sources: {intervention.sources}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Bottom CTA */}
      <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
        <h3 className="font-semibold text-stone-800 mb-2">Not sure where to start?</h3>
        <p className="text-sm text-stone-600 mb-4">
          Take the Leader Identity Assessment first to understand your baseline, then choose interventions based on your specific development needs.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setCurrentView(`assessment-${data.assessment}`)}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700"
          >
            📋 Take Assessment
          </button>
          <button
            onClick={() => setCurrentView('coach-advisor-text')}
            className="px-4 py-2 bg-white border border-stone-300 text-stone-700 rounded-lg text-sm font-medium hover:bg-stone-50"
          >
            💬 Discuss with Day Advisor
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// INTERVENTION VIEW (Development Programs)
// ============================================================================

function InterventionView({ interventionId, setCurrentView, user }) {
  const [expandedPhase, setExpandedPhase] = useState(0);
  const [expandedActivity, setExpandedActivity] = useState(null);

  // Find intervention in both LEADER and LEADERSHIP development
  const intervention = LEADER_DEVELOPMENT.interventions.find(i => i.id === interventionId) ||
                       LEADERSHIP_DEVELOPMENT.interventions.find(i => i.id === interventionId);

  if (!intervention) {
    return (
      <div className="animate-fadeIn">
        <button onClick={() => setCurrentView('develop')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
          <Icons.ChevronLeft /> Back
        </button>
        <p>Intervention not found.</p>
      </div>
    );
  }

  const isIndividual = LEADER_DEVELOPMENT.interventions.some(i => i.id === interventionId);

  // Check if activities are detailed objects or simple strings
  const hasDetailedActivities = intervention.phases[0]?.activities[0]?.title !== undefined;

  return (
    <div className="animate-fadeIn">
      <button onClick={() => setCurrentView('develop')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
        <Icons.ChevronLeft /> Back to Develop
      </button>

      <div className={`${isIndividual ? 'bg-amber-50 border-amber-200' : 'bg-teal-50 border-teal-200'} border rounded-xl p-5 mb-6`}>
        <div className="flex justify-between items-start mb-2">
          <h1 className={`text-xl font-bold ${isIndividual ? 'text-amber-800' : 'text-teal-800'}`}>{intervention.title}</h1>
          <span className={`text-xs ${isIndividual ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'} px-2 py-1 rounded-full`}>
            {intervention.duration}
          </span>
        </div>
        <p className="text-stone-600 mb-3">{intervention.description}</p>
        {intervention.researchBasis && (
          <p className="text-xs text-stone-500 italic">{intervention.researchBasis}</p>
        )}
      </div>

      {/* Phases */}
      <div className="space-y-4">
        {intervention.phases.map((phase, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <button
              onClick={() => setExpandedPhase(expandedPhase === idx ? -1 : idx)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${isIndividual ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'} flex items-center justify-center font-semibold text-sm`}>
                  {phase.phase}
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">{phase.title}</h3>
                  <p className="text-xs text-stone-500">{phase.duration}</p>
                </div>
              </div>
              <Icons.ChevronDown className={`transition-transform ${expandedPhase === idx ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedPhase === idx && (
              <div className="px-4 pb-4 border-t border-stone-100 pt-3">
                {phase.overview && (
                  <p className="text-sm text-stone-600 mb-4 italic">{phase.overview}</p>
                )}
                
                <h4 className="text-sm font-medium text-stone-700 mb-3">Activities</h4>
                
                {hasDetailedActivities ? (
                  <div className="space-y-3">
                    {phase.activities.map((activity, actIdx) => (
                      <div key={actIdx} className={`border rounded-lg overflow-hidden ${isIndividual ? 'border-amber-200' : 'border-teal-200'}`}>
                        <button
                          onClick={() => setExpandedActivity(expandedActivity === `${idx}-${actIdx}` ? null : `${idx}-${actIdx}`)}
                          className={`w-full p-3 flex items-center justify-between text-left ${isIndividual ? 'bg-amber-50/50' : 'bg-teal-50/50'}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-5 h-5 rounded border ${isIndividual ? 'border-amber-400' : 'border-teal-400'} flex items-center justify-center flex-shrink-0`}>
                              <span className="text-xs">{actIdx + 1}</span>
                            </span>
                            <span className="font-medium text-sm text-stone-800">{activity.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-stone-500">{activity.duration}</span>
                            <Icons.ChevronDown className={`w-4 h-4 transition-transform ${expandedActivity === `${idx}-${actIdx}` ? 'rotate-180' : ''}`} />
                          </div>
                        </button>
                        
                        {expandedActivity === `${idx}-${actIdx}` && (
                          <div className="p-3 bg-white space-y-3">
                            <div>
                              <h5 className="text-xs font-semibold text-stone-500 uppercase mb-1">Instructions</h5>
                              <p className="text-sm text-stone-700">{activity.instructions}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${isIndividual ? 'bg-amber-50' : 'bg-teal-50'}`}>
                              <h5 className="text-xs font-semibold text-stone-500 uppercase mb-1">Reflection</h5>
                              <p className="text-sm text-stone-700 italic">{activity.reflection}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {phase.activities.map((activity, actIdx) => (
                      <li key={actIdx} className="flex items-start gap-2 text-sm text-stone-600">
                        <span className={`mt-1 w-4 h-4 rounded border ${isIndividual ? 'border-amber-300' : 'border-teal-300'} flex-shrink-0`} />
                        {typeof activity === 'string' ? activity : activity.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={() => setCurrentView('coaches')}
          className={`w-full ${isIndividual ? 'bg-amber-600' : 'bg-teal-600'} text-white py-3 rounded-xl font-medium`}
        >
          Discuss with Coach
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================

// Privacy Policy Content
const PRIVACY_POLICY_VERSION = '1.0';
const TERMS_VERSION = '1.0';

const PRIVACY_POLICY = {
  version: PRIVACY_POLICY_VERSION,
  effectiveDate: '2025-01-12',
  sections: [
    {
      title: 'Information We Collect',
      content: 'We collect information you provide directly, including: account information (email), assessment responses, journal reflections, action items, and usage data. All data is stored securely and associated with your account.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We use your information to: provide and improve the leadership development experience, track your progress, enable coaching features, and if you consent, for research purposes to advance leadership development science.'
    },
    {
      title: 'Data Sharing',
      content: 'We do not sell your personal information. With your explicit consent, aggregated or anonymized data may be used for academic research. If you are part of a class, your instructor may view your progress with your consent.'
    },
    {
      title: 'Data Security',
      content: 'We implement industry-standard security measures including encryption at rest, secure data transmission (HTTPS), and strict access controls. Your data is stored on Supabase infrastructure with SOC 2 compliance.'
    },
    {
      title: 'Your Rights (GDPR)',
      content: 'You have the right to: access your data, export your data in a portable format, correct inaccurate data, delete your data, and withdraw consent at any time. Use the "My Data" section to exercise these rights.'
    },
    {
      title: 'Data Retention',
      content: 'We retain your data for as long as your account is active. Assessment and reflection data is retained for up to 3 years. Audit logs are retained for 7 years for compliance purposes. You can delete your data at any time.'
    },
    {
      title: 'Contact',
      content: 'For privacy-related questions or to exercise your rights, contact us through the app settings or email the course administrator.'
    }
  ]
};

// Consent Screen Component
function ConsentScreen({ user, onConsentComplete }) {
  const [step, setStep] = useState(1); // 1: Privacy Policy, 2: Consent Options, 3: Complete
  const [consents, setConsents] = useState({
    privacyPolicy: false,
    termsOfService: false,
    dataProcessing: false,
    assessmentData: false,
    researchParticipation: false
  });
  const [saving, setSaving] = useState(false);
  const [showFullPolicy, setShowFullPolicy] = useState(false);

  const requiredConsents = ['privacyPolicy', 'termsOfService', 'dataProcessing', 'assessmentData'];
  const allRequiredAccepted = requiredConsents.every(key => consents[key]);

  const handleSaveConsent = async () => {
    if (!allRequiredAccepted) return;
    
    setSaving(true);
    try {
      const now = new Date().toISOString();
      await supabase.from('user_consents').upsert({
        user_id: user.id,
        privacy_policy_accepted: consents.privacyPolicy,
        privacy_policy_version: PRIVACY_POLICY_VERSION,
        privacy_policy_accepted_at: consents.privacyPolicy ? now : null,
        terms_of_service_accepted: consents.termsOfService,
        terms_of_service_version: TERMS_VERSION,
        terms_of_service_accepted_at: consents.termsOfService ? now : null,
        data_processing_consent: consents.dataProcessing,
        data_processing_consent_at: consents.dataProcessing ? now : null,
        assessment_data_consent: consents.assessmentData,
        assessment_data_consent_at: consents.assessmentData ? now : null,
        research_participation_consent: consents.researchParticipation,
        research_participation_consent_at: consents.researchParticipation ? now : null,
        updated_at: now
      }, { onConflict: 'user_id' });

      // Create default privacy settings
      await supabase.from('user_privacy_settings').upsert({
        user_id: user.id,
        share_anonymized_data_for_research: consents.researchParticipation,
        share_with_instructors: true,
        email_notifications: true,
        updated_at: now
      }, { onConflict: 'user_id' });

      onConsentComplete();
    } catch (error) {
      console.error('Error saving consent:', error);
      alert('Error saving consent. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const ConsentCheckbox = ({ id, label, description, required, checked, onChange }) => (
    <label className="flex items-start gap-3 p-4 bg-white rounded-xl border border-stone-200 cursor-pointer hover:border-amber-300 transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-5 h-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-stone-800">{label}</span>
          {required && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Required</span>}
        </div>
        <p className="text-sm text-stone-500 mt-1">{description}</p>
      </div>
    </label>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Icons.Shield />
          </div>
          <h1 className="text-2xl font-bold text-stone-800">Welcome to Day by Day</h1>
          <p className="text-stone-600 mt-2">Before we begin, please review and accept our privacy practices</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2].map(s => (
            <div key={s} className={`w-3 h-3 rounded-full transition-colors ${step >= s ? 'bg-amber-500' : 'bg-stone-300'}`} />
          ))}
        </div>

        {/* Step 1: Privacy Policy */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">
            <h2 className="text-lg font-semibold text-stone-800 mb-4">📜 Privacy Policy</h2>
            
            <div className={`space-y-4 ${showFullPolicy ? '' : 'max-h-64'} overflow-y-auto mb-4`}>
              {PRIVACY_POLICY.sections.map((section, idx) => (
                <div key={idx}>
                  <h3 className="font-medium text-stone-800">{section.title}</h3>
                  <p className="text-sm text-stone-600 mt-1">{section.content}</p>
                </div>
              ))}
            </div>

            {!showFullPolicy && (
              <button 
                onClick={() => setShowFullPolicy(true)}
                className="text-amber-600 text-sm font-medium mb-4"
              >
                Read full policy...
              </button>
            )}

            <div className="pt-4 border-t border-stone-100">
              <p className="text-xs text-stone-500 mb-4">
                Version {PRIVACY_POLICY.version} • Effective {PRIVACY_POLICY.effectiveDate}
              </p>
              <button
                onClick={() => setStep(2)}
                className="w-full bg-amber-600 text-white py-3 rounded-xl font-medium hover:bg-amber-700 transition-colors"
              >
                I've Read the Privacy Policy
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Consent Options */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">
            <h2 className="text-lg font-semibold text-stone-800 mb-4">✅ Your Consent</h2>
            <p className="text-sm text-stone-600 mb-6">Please indicate your consent for the following:</p>

            <div className="space-y-3 mb-6">
              <ConsentCheckbox
                id="privacyPolicy"
                label="Privacy Policy"
                description="I have read and accept the Privacy Policy"
                required={true}
                checked={consents.privacyPolicy}
                onChange={(v) => setConsents({...consents, privacyPolicy: v})}
              />
              
              <ConsentCheckbox
                id="termsOfService"
                label="Terms of Service"
                description="I agree to the Terms of Service for using this application"
                required={true}
                checked={consents.termsOfService}
                onChange={(v) => setConsents({...consents, termsOfService: v})}
              />
              
              <ConsentCheckbox
                id="dataProcessing"
                label="Data Processing"
                description="I consent to the processing of my data as described in the Privacy Policy"
                required={true}
                checked={consents.dataProcessing}
                onChange={(v) => setConsents({...consents, dataProcessing: v})}
              />
              
              <ConsentCheckbox
                id="assessmentData"
                label="Assessment Data"
                description="I consent to the collection and storage of my assessment responses for my development"
                required={true}
                checked={consents.assessmentData}
                onChange={(v) => setConsents({...consents, assessmentData: v})}
              />
              
              <div className="pt-2 border-t border-stone-100">
                <p className="text-xs text-stone-500 mb-3">Optional:</p>
                <ConsentCheckbox
                  id="researchParticipation"
                  label="Research Participation"
                  description="I consent to my anonymized data being used for academic research on leadership development"
                  required={false}
                  checked={consents.researchParticipation}
                  onChange={(v) => setConsents({...consents, researchParticipation: v})}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 border border-stone-300 rounded-xl text-stone-600 hover:bg-stone-50"
              >
                Back
              </button>
              <button
                onClick={handleSaveConsent}
                disabled={!allRequiredAccepted || saving}
                className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                  allRequiredAccepted 
                    ? 'bg-amber-600 text-white hover:bg-amber-700' 
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                {saving ? 'Saving...' : 'Accept & Continue'}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-stone-500 mt-6">
          You can change your privacy settings at any time in the app settings.
        </p>
      </div>
    </div>
  );
}

// Privacy Settings View
function PrivacySettingsView({ user, setCurrentView }) {
  const [settings, setSettings] = useState(null);
  const [consents, setConsents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, [user]);

  const loadSettings = async () => {
    setLoading(true);
    const { data: privacyData } = await supabase
      .from('user_privacy_settings')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    const { data: consentData } = await supabase
      .from('user_consents')
      .select('*')
      .eq('user_id', user.id)
      .single();

    setSettings(privacyData || {});
    setConsents(consentData || {});
    setLoading(false);
  };

  const updateSetting = async (key, value) => {
    setSaving(true);
    const newSettings = { ...settings, [key]: value, updated_at: new Date().toISOString() };
    setSettings(newSettings);
    
    await supabase
      .from('user_privacy_settings')
      .upsert({ user_id: user.id, ...newSettings }, { onConflict: 'user_id' });
    
    setSaving(false);
  };

  const updateConsent = async (key, value) => {
    setSaving(true);
    const now = new Date().toISOString();
    const newConsents = { 
      ...consents, 
      [key]: value,
      [`${key}_at`]: value ? now : null,
      updated_at: now 
    };
    setConsents(newConsents);
    
    await supabase
      .from('user_consents')
      .upsert({ user_id: user.id, ...newConsents }, { onConflict: 'user_id' });
    
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="animate-fadeIn flex items-center justify-center py-12">
        <Icons.Loader />
      </div>
    );
  }

  const ToggleSetting = ({ label, description, value, onChange }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200">
      <div className="flex-1 mr-4">
        <p className="font-medium text-stone-800">{label}</p>
        <p className="text-sm text-stone-500">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-12 h-7 rounded-full transition-colors ${value ? 'bg-amber-500' : 'bg-stone-300'}`}
      >
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      <button onClick={() => setCurrentView('dashboard')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
        <Icons.ChevronLeft /> Back
      </button>

      <div className="bg-gradient-to-br from-amber-50 to-stone-50 border border-amber-200 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Icons.Shield />
          <h1 className="text-xl font-bold text-stone-800">Privacy Settings</h1>
        </div>
        <p className="text-sm text-stone-600">Manage how your data is used and shared</p>
        {saving && <p className="text-xs text-amber-600 mt-2">Saving...</p>}
      </div>

      {/* Data Sharing */}
      <div className="mb-6">
        <h2 className="font-semibold text-stone-800 mb-3">Data Sharing</h2>
        <div className="space-y-3">
          <ToggleSetting
            label="Share with Instructors"
            description="Allow your instructor to view your assessment scores and progress"
            value={settings?.share_with_instructors ?? true}
            onChange={(v) => updateSetting('share_with_instructors', v)}
          />
          <ToggleSetting
            label="Research Participation"
            description="Allow anonymized data to be used for academic research"
            value={consents?.research_participation_consent ?? false}
            onChange={(v) => updateConsent('research_participation_consent', v)}
          />
        </div>
      </div>

      {/* Communications */}
      <div className="mb-6">
        <h2 className="font-semibold text-stone-800 mb-3">Communications</h2>
        <div className="space-y-3">
          <ToggleSetting
            label="Email Notifications"
            description="Receive email reminders and updates"
            value={settings?.email_notifications ?? true}
            onChange={(v) => updateSetting('email_notifications', v)}
          />
          <ToggleSetting
            label="Product Updates"
            description="Receive news about new features"
            value={settings?.product_updates ?? false}
            onChange={(v) => updateSetting('product_updates', v)}
          />
        </div>
      </div>

      {/* Your Consents */}
      <div className="mb-6">
        <h2 className="font-semibold text-stone-800 mb-3">Your Consents</h2>
        <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-stone-700">Privacy Policy (v{consents?.privacy_policy_version || '1.0'})</span>
            <span className="text-xs text-green-600">✓ Accepted</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-700">Terms of Service (v{consents?.terms_of_service_version || '1.0'})</span>
            <span className="text-xs text-green-600">✓ Accepted</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-700">Data Processing</span>
            <span className="text-xs text-green-600">✓ Consented</span>
          </div>
          {consents?.privacy_policy_accepted_at && (
            <p className="text-xs text-stone-500 pt-2 border-t border-stone-100">
              Consent given on {new Date(consents.privacy_policy_accepted_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Manage Data Link */}
      <button
        onClick={() => setCurrentView('my-data')}
        className="w-full bg-white border border-stone-200 rounded-xl p-4 text-left hover:border-amber-300 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-stone-800">Manage Your Data</p>
            <p className="text-sm text-stone-500">Export or delete your personal data</p>
          </div>
          <Icons.ChevronRight />
        </div>
      </button>
    </div>
  );
}

// My Data View (Export / Delete)
function MyDataView({ user, setCurrentView, onSignOut }) {
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [dataSummary, setDataSummary] = useState(null);

  useEffect(() => {
    loadDataSummary();
  }, [user]);

  const loadDataSummary = async () => {
    const [assessments, reflections, actions] = await Promise.all([
      supabase.from('assessment_responses').select('id', { count: 'exact' }).eq('user_id', user.id),
      supabase.from('reflections').select('id', { count: 'exact' }).eq('user_id', user.id),
      supabase.from('actions').select('id', { count: 'exact' }).eq('user_id', user.id)
    ]);
    
    setDataSummary({
      assessments: assessments.count || 0,
      reflections: reflections.count || 0,
      actions: actions.count || 0
    });
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const { data, error } = await supabase.rpc('export_user_data', { p_user_id: user.id });
      
      if (error) throw error;
      
      // Download as JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `day-by-day-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Your data has been exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting data. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmText !== 'DELETE') return;
    
    setDeleting(true);
    try {
      const { data, error } = await supabase.rpc('delete_user_data', { 
        p_user_id: user.id,
        p_reason: 'User requested deletion via app'
      });
      
      if (error) throw error;
      
      alert('Your data has been deleted. You will now be signed out.');
      
      // Sign out the user
      await supabase.auth.signOut();
      onSignOut();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting data. Please contact support.');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <button onClick={() => setCurrentView('privacy-settings')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
        <Icons.ChevronLeft /> Back to Privacy Settings
      </button>

      <div className="bg-gradient-to-br from-blue-50 to-stone-50 border border-blue-200 rounded-xl p-5 mb-6">
        <h1 className="text-xl font-bold text-stone-800 mb-2">Your Data</h1>
        <p className="text-sm text-stone-600">Export or delete your personal data in accordance with GDPR</p>
      </div>

      {/* Data Summary */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6">
        <h2 className="font-semibold text-stone-800 mb-3">Data Summary</h2>
        {dataSummary ? (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-stone-50 rounded-lg">
              <p className="text-2xl font-bold text-stone-800">{dataSummary.assessments}</p>
              <p className="text-xs text-stone-500">Assessments</p>
            </div>
            <div className="text-center p-3 bg-stone-50 rounded-lg">
              <p className="text-2xl font-bold text-stone-800">{dataSummary.reflections}</p>
              <p className="text-xs text-stone-500">Reflections</p>
            </div>
            <div className="text-center p-3 bg-stone-50 rounded-lg">
              <p className="text-2xl font-bold text-stone-800">{dataSummary.actions}</p>
              <p className="text-xs text-stone-500">Actions</p>
            </div>
          </div>
        ) : (
          <p className="text-stone-500">Loading...</p>
        )}
      </div>

      {/* Export Data */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6">
        <h2 className="font-semibold text-stone-800 mb-2">Export Your Data</h2>
        <p className="text-sm text-stone-600 mb-4">
          Download a complete copy of all your data in JSON format. This includes your profile, assessments, reflections, actions, and consent records.
        </p>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {exporting ? 'Preparing Export...' : '📦 Export All My Data'}
        </button>
      </div>

      {/* Delete Data */}
      <div className="bg-white rounded-xl border border-red-200 p-4">
        <h2 className="font-semibold text-red-800 mb-2">Delete Your Data</h2>
        <p className="text-sm text-stone-600 mb-4">
          Permanently delete all your data from our systems. This action cannot be undone. Your account will be deactivated.
        </p>
        
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full border border-red-300 text-red-600 py-3 rounded-xl font-medium hover:bg-red-50 transition-colors"
          >
            🗑️ Delete All My Data
          </button>
        ) : (
          <div className="space-y-4 p-4 bg-red-50 rounded-xl">
            <p className="text-sm text-red-800 font-medium">
              ⚠️ This will permanently delete:
            </p>
            <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
              <li>All assessment responses</li>
              <li>All journal reflections</li>
              <li>All action items</li>
              <li>Your account settings</li>
            </ul>
            <p className="text-sm text-red-800">
              Type <strong>DELETE</strong> to confirm:
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Type DELETE"
              className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); }}
                className="flex-1 py-2 border border-stone-300 rounded-lg text-stone-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteConfirmText !== 'DELETE' || deleting}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Permanently Delete'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DayByDayApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasConsent, setHasConsent] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [streak, setStreak] = useState(0);
  const [actions, setActions] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setUser(session?.user ?? null); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setUser(session?.user ?? null); });
    return () => subscription.unsubscribe();
  }, []);

  // Check for consent when user logs in
  useEffect(() => { 
    if (user) {
      checkConsent();
      loadUserData(); 
    }
  }, [user]);

  const checkConsent = async () => {
    const { data } = await supabase
      .from('user_consents')
      .select('privacy_policy_accepted, data_processing_consent')
      .eq('user_id', user.id)
      .single();
    
    // User has consent if they've accepted privacy policy and data processing
    const consentGiven = data?.privacy_policy_accepted && data?.data_processing_consent;
    setHasConsent(consentGiven);
  };

  const loadUserData = async () => {
    const { data: actionsData } = await supabase.from('actions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (actionsData) setActions(actionsData);
    const { data: journalData } = await supabase.from('reflections').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (journalData) setJournalEntries(journalData);
    const { data: streakData } = await supabase.from('streaks').select('current_streak').eq('user_id', user.id).single();
    if (streakData) setStreak(streakData.current_streak);
  };

  const handleSignOut = async () => { await supabase.auth.signOut(); setUser(null); setHasConsent(null); };

  if (loading) return <div className="min-h-screen bg-stone-50 flex items-center justify-center"><Icons.Loader /></div>;
  if (!user) return <AuthScreen onAuth={setUser} />;
  
  // Show consent screen if user hasn't consented
  if (hasConsent === false) {
    return <ConsentScreen user={user} onConsentComplete={() => setHasConsent(true)} />;
  }
  
  // Still checking consent
  if (hasConsent === null) {
    return <div className="min-h-screen bg-stone-50 flex items-center justify-center"><Icons.Loader /></div>;
  }

  const renderView = () => {
    if (currentView.startsWith('chapter-')) {
      const chapterId = parseInt(currentView.split('-')[1]);
      return <ChapterDetail chapterId={chapterId} setCurrentView={setCurrentView} />;
    }
    if (currentView.startsWith('practice-')) {
      const activityId = currentView.replace('practice-', '');
      return <DailyPractice activityId={activityId} setCurrentView={setCurrentView} user={user} />;
    }
    if (currentView.startsWith('assessment-')) {
      const assessmentId = currentView.replace('assessment-', '');
      return <AssessmentView assessmentId={assessmentId} setCurrentView={setCurrentView} user={user} />;
    }
    if (currentView.startsWith('intervention-')) {
      const interventionId = currentView.replace('intervention-', '');
      return <InterventionView interventionId={interventionId} setCurrentView={setCurrentView} user={user} />;
    }
    
    switch (currentView) {
      case 'dashboard': return <Dashboard setCurrentView={setCurrentView} streak={streak} user={user} actions={actions} journalEntries={journalEntries} />;
      case 'develop': return <DevelopView setCurrentView={setCurrentView} user={user} />;
      case 'practice': return <PracticeView setCurrentView={setCurrentView} user={user} />;
      case 'chapters': return <ChaptersView setCurrentView={setCurrentView} />;
      case 'journal': return <JournalView user={user} journalEntries={journalEntries} setJournalEntries={setJournalEntries} />;
      case 'actions': return <ActionsView user={user} actions={actions} setActions={setActions} />;
      case 'coaches': return <CoachesView setCurrentView={setCurrentView} />;
      case 'coach-icf-voice': return <VoiceCoach coachType="icf" setCurrentView={setCurrentView} user={user} setActions={setActions} />;
      case 'coach-icf-text': return <TextCoach coachType="icf" setCurrentView={setCurrentView} user={user} setActions={setActions} actions={actions} />;
      case 'coach-advisor-voice': return <VoiceCoach coachType="mentor" setCurrentView={setCurrentView} user={user} setActions={setActions} />;
      case 'coach-advisor-text': return <TextCoach coachType="mentor" setCurrentView={setCurrentView} user={user} setActions={setActions} actions={actions} />;
      case 'library': return <LibraryView setCurrentView={setCurrentView} />;
      case 'privacy-settings': return <PrivacySettingsView user={user} setCurrentView={setCurrentView} />;
      case 'my-data': return <MyDataView user={user} setCurrentView={setCurrentView} onSignOut={handleSignOut} />;
      default: return <Dashboard setCurrentView={setCurrentView} streak={streak} user={user} actions={actions} journalEntries={journalEntries} />;
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
      `}</style>
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} user={user} onSignOut={handleSignOut} />
      <Header streak={streak} />
      <main className="px-5 py-6 max-w-lg mx-auto pb-24 lg:ml-64 lg:max-w-4xl lg:pb-8">{renderView()}</main>
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}







