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

## MULTILINGUAL SUPPORT
- Detect what language the user is speaking
- Respond in the SAME language the user speaks
- If they switch languages, switch with them
- Maintain the same coaching quality in all languages
- Supported languages include: English, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, Dutch, Russian, Arabic, Hindi, and more

## VOICE CONVERSATION STYLE
- Speak naturally and conversationally, as if in person
- Keep responses SHORT (2-4 sentences typically)
- Use warm, empathetic tone
- No bullet points or lists - speak in flowing sentences
- STOP after each response and wait for the client
- ONE powerful question per turn maximum

## ICF COACHING ARC - FOLLOW THIS STRUCTURE

### 1. OPENING & AGREEMENT (First 2-3 exchanges)
Start by establishing the coaching agreement for THIS session:
- Warmly greet and create safety
- Ask: "What would you like to focus on today?" or "What's on your mind?"
- Then ask: "Why is this important to you RIGHT NOW?"
- Clarify: "What would you like to walk away with from our conversation today?"
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
- Support reframing perspectives

### 4. ACTION & ACCOUNTABILITY (Final exchanges)
Partner with client to design concrete next steps:
- "What's one thing you could do differently?"
- "When specifically will you do this?"
- "How will you hold yourself accountable?"
- "What support do you need?"
- Acknowledge their progress and insights

### 5. CLOSING
- Briefly summarize key insights from the session
- Acknowledge their work and growth
- End with encouragement

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
- Never end without exploring action

## SAMPLE FLOW
Turn 1: "Hello, I'm here to support your leadership journey. What would you like to focus on today?" [STOP]
Turn 2: Brief reflection + "Why is this important to you right now?" [STOP]
Turn 3: Brief reflection + "What would make this conversation valuable for you?" [STOP]
Then continue exploring with ONE question per turn until action emerges.`;

const getDayMentorVoicePrompt = () => `You are a Leadership Development Mentor based on Dr. David V. Day's research from "Developing Leaders and Leadership" (2024). You are having a VOICE conversation.

## MULTILINGUAL SUPPORT
- Detect what language the user is speaking
- Respond in the SAME language the user speaks
- If they switch languages, switch with them
- Maintain the same mentoring quality in all languages
- Supported languages include: English, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, Dutch, Russian, Arabic, Hindi, and more

## VOICE CONVERSATION STYLE
- Speak naturally and conversationally
- Keep responses concise (2-4 sentences typically)
- Be direct and warm
- No bullet points or lists - speak in flowing sentences
- STOP after each response and wait for the student

## MENTORING ARC - FOLLOW THIS STRUCTURE

### 1. OPENING & UNDERSTANDING (First 2-3 exchanges)
- Warmly greet and establish rapport
- Ask: "What would you like to learn about or work on today?"
- Clarify: "Tell me more about the context - what's happening?"
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

### 4. ACTION & COMMITMENT (Final exchanges)
Help them commit to specific next steps:
- "What's one thing you'll try this week?"
- "How will you practice this?"
- Offer specific suggestions if they need direction

### 5. CLOSING
- Summarize key takeaways
- Encourage their development journey
- Remind them development takes time

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

## SAMPLE FLOW
Turn 1: "Welcome! I'm here to share research-based guidance from David Day's work. What aspect of leader or leadership development would you like to explore today?" [STOP]
Turn 2: Listen, then "That's a great area to focus on. Let me share what the research tells us..." [STOP]
Continue by teaching concepts and helping them apply to their situation.`;

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
        { title: 'The Nature of Leadership', author: 'John Antonakis & David V. Day', year: 2018, description: 'Collection of chapters by leading scholars on cutting-edge research.', keyTopics: ['Leader traits', 'Charisma', 'Ethical leadership'], evidenceLevel: 'High', recommended: true }
      ]
    },
    {
      id: 'development',
      name: 'Leader & Leadership Development',
      description: 'Research and practice on developing leadership capacity',
      books: [
        { title: 'Developing Leaders and Leadership', author: 'David V. Day', year: 2024, description: 'The book this app is based on. Distinguishes leader from leadership development.', keyTopics: ['Five first principles', 'ACS framework', 'Self-views', 'Networks'], evidenceLevel: 'High', recommended: true, primary: true },
        { title: 'CCL Handbook of Leadership Development', author: 'Van Velsor, McCauley, & Ruderman', year: 2010, description: 'Comprehensive guide from the leading leadership development organization.', keyTopics: ['Assessment', 'Challenge', 'Support', '360 feedback'], evidenceLevel: 'High', recommended: true },
        { title: 'Experience-Driven Leader Development', author: 'McCauley, DeRue, Yost, & Taylor', year: 2014, description: 'How to maximize learning from leadership experiences.', keyTopics: ['Developmental experiences', 'Learning agility'], evidenceLevel: 'High', recommended: false }
      ]
    },
    {
      id: 'self-awareness',
      name: 'Self-Awareness & Personal Development',
      description: 'Understanding yourself as the foundation for leadership',
      books: [
        { title: 'Insight', author: 'Tasha Eurich', year: 2017, description: 'Research-based exploration of self-awareness and how to develop it.', keyTopics: ['Internal self-awareness', 'External self-awareness', 'Feedback'], evidenceLevel: 'High', recommended: true },
        { title: 'An Everyone Culture', author: 'Robert Kegan & Lisa Lahey', year: 2016, description: 'How organizations can become deliberately developmental.', keyTopics: ['Adult development', 'Immunity to change'], evidenceLevel: 'Medium', recommended: true },
        { title: 'Immunity to Change', author: 'Robert Kegan & Lisa Lahey', year: 2009, description: 'Why change is hard and how to overcome psychological barriers.', keyTopics: ['Competing commitments', 'Big assumptions'], evidenceLevel: 'Medium', recommended: false }
      ]
    },
    {
      id: 'teams',
      name: 'Team Leadership & Psychological Safety',
      description: 'Leading and developing high-performing teams',
      books: [
        { title: 'The Fearless Organization', author: 'Amy Edmondson', year: 2019, description: 'Creating psychological safety in the workplace.', keyTopics: ['Psychological safety', 'Learning from failure', 'Speaking up'], evidenceLevel: 'High', recommended: true },
        { title: 'Team of Teams', author: 'Stanley McChrystal', year: 2015, description: 'Building adaptable organizations through shared consciousness.', keyTopics: ['Adaptability', 'Shared consciousness', 'Decentralized decision-making'], evidenceLevel: 'Medium', recommended: true },
        { title: 'The Five Dysfunctions of a Team', author: 'Patrick Lencioni', year: 2002, description: 'A fable exploring what makes teams fail and succeed.', keyTopics: ['Trust', 'Conflict', 'Accountability'], evidenceLevel: 'Low', recommended: false }
      ]
    },
    {
      id: 'coaching',
      name: 'Coaching & Feedback',
      description: 'Developing others through coaching conversations',
      books: [
        { title: 'Co-Active Coaching', author: 'Kimsey-House, Sandahl, & Whitworth', year: 2018, description: 'Foundational coaching text with practical tools.', keyTopics: ['Coaching model', 'Powerful questions', 'Listening'], evidenceLevel: 'Medium', recommended: true },
        { title: 'Thanks for the Feedback', author: 'Douglas Stone & Sheila Heen', year: 2014, description: 'The science of receiving feedback well.', keyTopics: ['Receiving feedback', 'Feedback triggers'], evidenceLevel: 'Medium', recommended: true },
        { title: 'Helping People Change', author: 'Boyatzis, Smith, & Van Oosten', year: 2019, description: 'Coaching with compassion rather than compliance.', keyTopics: ['Coaching with compassion', 'Intentional change'], evidenceLevel: 'High', recommended: true }
      ]
    },
    {
      id: 'evidence-based',
      name: 'Evidence-Based Management',
      description: 'Using research to inform management practice',
      books: [
        { title: 'Hard Facts, Dangerous Half-Truths, and Total Nonsense', author: 'Jeffrey Pfeffer & Robert Sutton', year: 2006, description: 'A call for evidence-based management.', keyTopics: ['Evidence-based practice', 'Management myths'], evidenceLevel: 'High', recommended: true },
        { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: 2011, description: 'Nobel laureate summary of judgment and decision-making research.', keyTopics: ['Cognitive biases', 'System 1 and 2', 'Decision-making'], evidenceLevel: 'High', recommended: true }
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
  }
];

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
    if (isICF) return "Hello, I'm here to support your leadership journey. What would you like to focus on today?";
    return "Welcome! I'm here to share research-based guidance from David Day's work. What aspect of leader or leadership development would you like to explore today?";
  };

  const handleRealtimeEvent = (event) => {
    switch (event.type) {
      case 'response.audio.started':
        setIsAISpeaking(true);
        setStatus(isICF ? 'Coach is speaking...' : 'Mentor is speaking...');
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
        const systemPrompt = isICF ? getICFVoicePrompt() : getDayMentorVoicePrompt();
        
        dataChannel.current.send(JSON.stringify({
          type: 'session.update',
          session: {
            instructions: systemPrompt,
            voice: 'alloy',
            input_audio_transcription: { model: 'whisper-1' },
            turn_detection: { type: 'server_vad', threshold: 0.8, prefix_padding_ms: 500, silence_duration_ms: 2000 },
          },
        }));

        setTimeout(() => {
          dataChannel.current.send(JSON.stringify({
            type: 'conversation.item.create',
            item: { type: 'message', role: 'assistant', content: [{ type: 'text', text: getGreeting() }] }
          }));
          dataChannel.current.send(JSON.stringify({
            type: 'response.create',
            response: { modalities: ['audio'], instructions: 'Say the greeting exactly as provided, then stop completely.' },
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
            <h2 className="font-semibold text-stone-800">{isICF ? 'ICF Voice Coach' : 'Day Mentor Voice'}</h2>
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
            {isICF ? 'Your coach will ask powerful questions to help you find your own insights.' : 'Your mentor will share research-based advice from David Day\'s leadership framework.'}
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
  const endpoint = isICF ? 'coach' : 'day-mentor';

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    const greeting = isICF
      ? "Hello! I'm here to support your leadership journey. What would you like to focus on today?"
      : "Welcome! I'm here to share research-based guidance from David Day's work. What aspect of leader or leadership development would you like to explore today?";
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
            <h2 className="font-semibold text-stone-800">{isICF ? 'ICF Coach' : 'Day Mentor'}</h2>
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
    { id: 'practice', label: 'Practice', icon: Icons.Target },
    { id: 'chapters', label: 'Learn', icon: Icons.BookOpen },
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
    { id: 'practice', label: 'Practice', icon: Icons.Target },
    { id: 'chapters', label: 'Learn', icon: Icons.BookOpen },
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
            <p className="text-stone-400 text-sm">ICF Coach or Day Mentor - Voice or Text</p>
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

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-stone-800">Continue Learning</h3>
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
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800 mb-1">Learn</h2>
        <p className="text-stone-500 text-sm">8 chapters from "Developing Leaders and Leadership"</p>
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
                <h3 className="text-lg font-semibold text-stone-800">Day Mentor</h3>
                <p className="text-stone-600 text-sm">Research-based advice from David Day's leadership development framework.</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <button onClick={() => setCurrentView('coach-mentor-voice')} className="flex-1 py-3 flex items-center justify-center gap-2 text-violet-700 hover:bg-violet-50 border-r border-stone-100"><Icons.Mic /> <span className="font-medium text-sm">Voice</span></button>
            <button onClick={() => setCurrentView('coach-mentor-text')} className="flex-1 py-3 flex items-center justify-center gap-2 text-violet-700 hover:bg-violet-50"><Icons.Keyboard /> <span className="font-medium text-sm">Text</span></button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-stone-50 rounded-xl p-4">
        <h4 className="font-medium text-stone-800 mb-2">When to use each:</h4>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div><span className="text-stone-600"><strong>ICF Coach:</strong> Explore your thinking, work through emotions, find clarity through reflection.</span></div>
          <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 shrink-0"></div><span className="text-stone-600"><strong>Day Mentor:</strong> Get specific advice, learn concepts, understand research applications.</span></div>
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
    if (!user) return;
    try {
      await supabase.from('reflections').insert({
        user_id: user.id,
        content: JSON.stringify({ activity: activity.title, responses }),
        reflection_type: 'vcol_practice'
      });
    } catch (e) {
      console.error('Error saving reflection:', e);
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

        <div className="flex gap-3">
          <button
            onClick={() => {
              saveReflection();
              setCurrentView('practice');
            }}
            className={`flex-1 ${colors.accent} text-white py-3 rounded-xl font-medium`}
          >
            Save & Continue
          </button>
          <button
            onClick={() => setCurrentView('practice')}
            className="px-4 py-3 border border-stone-300 rounded-xl text-stone-600"
          >
            Skip
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
// MAIN APP
// ============================================================================

export default function DayByDayApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [streak, setStreak] = useState(0);
  const [actions, setActions] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setUser(session?.user ?? null); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setUser(session?.user ?? null); });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => { if (user) loadUserData(); }, [user]);

  const loadUserData = async () => {
    const { data: actionsData } = await supabase.from('actions').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (actionsData) setActions(actionsData);
    const { data: journalData } = await supabase.from('reflections').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    if (journalData) setJournalEntries(journalData);
    const { data: streakData } = await supabase.from('streaks').select('current_streak').eq('user_id', user.id).single();
    if (streakData) setStreak(streakData.current_streak);
  };

  const handleSignOut = async () => { await supabase.auth.signOut(); setUser(null); };

  if (loading) return <div className="min-h-screen bg-stone-50 flex items-center justify-center"><Icons.Loader /></div>;
  if (!user) return <AuthScreen onAuth={setUser} />;

  const renderView = () => {
    if (currentView.startsWith('chapter-')) {
      const chapterId = parseInt(currentView.split('-')[1]);
      return <ChapterDetail chapterId={chapterId} setCurrentView={setCurrentView} />;
    }
    if (currentView.startsWith('practice-')) {
      const activityId = currentView.replace('practice-', '');
      return <DailyPractice activityId={activityId} setCurrentView={setCurrentView} user={user} />;
    }
    
    switch (currentView) {
      case 'dashboard': return <Dashboard setCurrentView={setCurrentView} streak={streak} user={user} actions={actions} journalEntries={journalEntries} />;
      case 'practice': return <PracticeView setCurrentView={setCurrentView} user={user} />;
      case 'chapters': return <ChaptersView setCurrentView={setCurrentView} />;
      case 'journal': return <JournalView user={user} journalEntries={journalEntries} setJournalEntries={setJournalEntries} />;
      case 'actions': return <ActionsView user={user} actions={actions} setActions={setActions} />;
      case 'coaches': return <CoachesView setCurrentView={setCurrentView} />;
      case 'coach-icf-voice': return <VoiceCoach coachType="icf" setCurrentView={setCurrentView} />;
      case 'coach-icf-text': return <TextCoach coachType="icf" setCurrentView={setCurrentView} user={user} setActions={setActions} actions={actions} />;
      case 'coach-mentor-voice': return <VoiceCoach coachType="mentor" setCurrentView={setCurrentView} />;
      case 'coach-mentor-text': return <TextCoach coachType="mentor" setCurrentView={setCurrentView} user={user} setActions={setActions} actions={actions} />;
      case 'library': return <LibraryView setCurrentView={setCurrentView} />;
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



