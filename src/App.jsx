import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';

// ============================================================================
// DAY BY DAY - Leader & Leadership Development Application
// Based on David V. Day's "Developing Leaders and Leadership" (2024)
// Features: Deep Chapters, Voice/Text Coaching, Actions, Evidence-Based Library
// ============================================================================

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
    overview: `This chapter establishes the theoretical and practical foundation for everything that follows. Day argues that before diving into specific techniques or programs, we must first understand what makes development actually work—and what causes it to fail.`,
    
    lessons: [
      {
        id: 1,
        title: 'You Cannot Make Anyone Develop as a Leader',
        content: `Development requires personal ownership and agency. No program, no matter how well-designed, can force someone to grow. The individual must choose to engage, practice, and persist.

Day emphasizes that passively sitting through lectures or reading about leadership is insufficient. Real development requires acting and practicing mindsets and behaviors outside your comfort zone.

**Key Insight:** Adopting a leader identity motivates the learning and practice that sustains development. When you see yourself as a leader, you're more likely to seek out and engage with developmental experiences.`,
        practicalApplication: 'Reflect on your own motivation for development. Are you here because you want to grow, or because someone told you to? Ownership starts with honest self-assessment.',
        researchBasis: 'Day cites research showing that developmental readiness—the extent to which someone is prepared to engage in development—is a critical predictor of developmental outcomes.'
      },
      {
        id: 2,
        title: 'Development Requires Dedicated Work Over Time',
        content: `There are no quick fixes or shortcuts to becoming a better leader. Development is a marathon, not a sprint. Day is skeptical of programs that promise transformation in a few days.

The research on expert performance suggests it takes approximately 10,000 hours of deliberate practice to achieve expertise in complex domains. While leadership may not require exactly this amount, the principle holds: sustained effort over years, not days.

**Key Insight:** One-off programs rarely produce lasting development. The transfer of learning back to real situations requires ongoing follow-through and support.`,
        practicalApplication: 'Create a long-term development plan measured in months and years, not days. Schedule regular practice and reflection, treating development as an ongoing discipline.',
        researchBasis: 'Based on Ericsson\'s deliberate practice research and longitudinal studies of leader development showing that meaningful change requires sustained effort.'
      },
      {
        id: 3,
        title: 'Leadership is Learned Through Experience',
        content: `The 70-20-10 model suggests that leadership development occurs through: 70% challenging assignments and experiences, 20% developmental relationships (mentors, coaches, peers), and 10% formal training and coursework.

However, experience alone is not enough. Day emphasizes that experience must be processed, reflected upon, and integrated. Raw experience without reflection often leads to the wrong lessons.

**Key Insight:** The most developmental experiences involve novelty, challenge, and the opportunity for feedback. Doing the same thing repeatedly doesn't develop you—stretching into new territory does.`,
        practicalApplication: 'Seek out stretch assignments that push you beyond your current capabilities. After each significant experience, deliberately reflect: What happened? What did I learn? What will I do differently?',
        researchBasis: 'McCall, Lombardo, and Morrison\'s research at CCL on "Lessons of Experience" and subsequent studies validating the primacy of experience in leader development.'
      },
      {
        id: 4,
        title: 'Assessment, Challenge, and Support (ACS)',
        content: `The ACS framework is foundational to any meaningful developmental experience:

**Assessment:** Know where you are starting from. Self-awareness about your current strengths, weaknesses, values, and tendencies provides the baseline for growth.

**Challenge:** Growth happens outside your comfort zone. The "Goldilocks Zone" of challenge is optimal—not so easy it's boring, not so hard it's overwhelming.

**Support:** Relationships, feedback, coaching, and resources sustain growth when the going gets tough. Without support, challenge often leads to burnout rather than development.

**Key Insight:** Many developmental initiatives fail because they emphasize one element while neglecting others. A challenging experience without support leads to failure; support without challenge leads to complacency.`,
        practicalApplication: 'For your current developmental goal, audit all three elements: Do you have accurate assessment of where you stand? Is there sufficient challenge? What support structures are in place?',
        researchBasis: 'McCauley, Van Velsor, and Ruderman\'s work at the Center for Creative Leadership establishing ACS as the foundation of developmental experiences.'
      },
      {
        id: 5,
        title: 'Evidence-Based Practices Matter',
        content: `Day is critical of leadership development practices based on popularity rather than research. The field is rife with programs that "feel good" but have no empirical support.

Evidence-based practice means using the best available research evidence, combined with practitioner expertise and consideration of client values and context. It doesn't mean rigidly following research—it means being informed by it.

**Key Insight:** Be skeptical of "proven methods" and "guaranteed results." Ask: What's the evidence? What does the research actually show? Popular doesn't equal effective.`,
        practicalApplication: 'Before adopting any leadership development practice, ask: What research supports this? Has it been tested? What are the boundary conditions? Develop healthy skepticism toward fads.',
        researchBasis: 'Day references the evidence-based management movement and critiques of non-evidence-based practices proliferating in leadership development.'
      }
    ],
    
    keyQuotes: [
      '"Everyone has leadership potential. Development requires your personal agency."',
      '"Sending a changed person back to an unchanged system is often an exercise in futility."',
      '"A map is not the territory, but without a map you are likely to get lost."'
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
    overview: `Day argues that the $360+ billion spent globally on leadership development is largely wasted because organizations focus on programs rather than systems. This chapter explains the difference and provides a framework for thinking systematically about development.`,
    
    lessons: [
      {
        id: 1,
        title: 'The Problem with Programs',
        content: `Day shares a powerful anecdote from Dr. David Campbell of CCL: Leadership development programs have three possible outcomes, two of which are bad.

**Outcome 1 (Hoped for):** Participant learns, returns, implements successfully. Win-win.

**Outcome 2 (Bad):** Participant returns changed, tries new approaches, colleagues resist ("We want the old you!"), participant reverts. Investment lost.

**Outcome 3 (Worst):** Participant returns changed, colleagues resist, participant gets frustrated, finds new job, quits. Organization loses talent they invested in.

**Key Insight:** Programs fail because they change individuals without changing the systems those individuals operate within. Development must be systemic.`,
        practicalApplication: 'Before any developmental initiative, consider: What system will I return to? Who needs to be involved to support my changed behavior? How can I prepare my environment?',
        researchBasis: 'Research showing that 10-40% of training transfers to the job, with most failing due to lack of environmental support.'
      },
      {
        id: 2,
        title: 'Training vs. Development',
        content: `Day distinguishes leadership training from leadership development:

**Training:** Focuses on specific skills that can be learned relatively quickly. Has clear learning objectives and measurable outcomes. Works well for discrete capabilities.

**Development:** Focuses on the whole person over extended time. More complex, idiosyncratic, and difficult to measure. People start at different places and change in different ways.

**Key Insight:** Training programs often fail when applied to development because development is not a training problem. You cannot "train" someone into being a different person.`,
        practicalApplication: 'Distinguish between what you need to be trained on (specific skills) versus what requires longer-term development (identity, judgment, wisdom). Apply different approaches to each.',
        researchBasis: 'Day\'s distinction builds on the training transfer literature and longitudinal studies of leader development.'
      },
      {
        id: 3,
        title: 'The KLI Competency Model',
        content: `The Kravis Leadership Institute developed a competency model for responsible leadership with three core competencies:

**COURAGE:** Leading courageously through resilience, entrepreneurial mindset, and responsible action.

**CREATIVITY:** Leading creatively through innovation, communication, and problem-solving.

**COLLABORATION:** Leading collaboratively through empathy, social-emotional learning, and teamwork.

Each competency has three capabilities, and each capability has five attributes—creating a detailed map of what "leadership" actually involves.

**Key Insight:** A competency model provides shared language and specific targets for development. Without it, "develop your leadership" is too vague to be actionable.`,
        practicalApplication: 'Use the KLI model to identify specific capabilities and attributes to develop. Rather than "become a better leader," target "develop my resilience" or "improve active listening."',
        researchBasis: 'The KLI model synthesizes decades of leadership research into an actionable framework, drawing on work by Zaccaro, Mumford, and others.'
      },
      {
        id: 4,
        title: 'Skill Mapping for Practice',
        content: `Day advocates for breaking down macro competencies into practicable micro-skills:

**Step 1:** Identify the broad competency (e.g., "Courage")
**Step 2:** Break into capabilities (e.g., "Resilience")
**Step 3:** Identify specific attributes (e.g., "Emotion management")
**Step 4:** Define micro-actions you can practice (e.g., "Pause 3 seconds before responding when triggered")

This creates a bridge between abstract competencies and daily practice.

**Key Insight:** Development happens through specific, repeated actions—not through understanding concepts. The map must become the territory through practice.`,
        practicalApplication: 'Take one capability you want to develop. Break it into 3-5 specific behaviors you can practice this week. Schedule them like appointments.',
        researchBasis: 'Based on deliberate practice research and behavior change science showing that specific, actionable goals outperform vague intentions.'
      }
    ],
    
    keyQuotes: [
      '"A major problem with program approaches to the complex challenge of developing leaders is that they are episodic and tend to be relatively short term."',
      '"Leadership training and leadership development initiatives are different."',
      '"The map is not the territory, but the KLI model provides helpful guidance."'
    ],
    
    reflectionPrompts: [
      'What systems support (or hinder) your development in your current environment?',
      'Which KLI competency needs the most attention in your development?',
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
    overview: `This chapter addresses the individual level of analysis—what Day calls "leader development" as distinct from "leadership development." The focus is on building intrapersonal capacity: the knowledge, skills, and abilities that you carry with you from one situation to another.`,
    
    lessons: [
      {
        id: 1,
        title: 'The Romance of Leadership',
        content: `Day begins with a critique: We tend to hold overly positive, even idealistic notions of leaders. This "romance of leadership" leads us to attribute positive outcomes to visible leaders even when such causal claims are dubious.

This isn't just a Western phenomenon—from "Big Man" leaders in Africa to samurais in Japan to Chinese emperors considered "Sons of Heaven," leader-centrism is universal.

**The Problem:** If we romanticize leaders, we assume that developing individual leaders automatically produces better leadership. This conflates two different things.

**Key Insight:** A developed leader and effective leadership are not the same. Leadership is a process that happens between people, not a property of any individual.`,
        practicalApplication: 'Examine your own mental model of leadership. Do you think of it as something a leader "does to" followers? Or as something created through interaction?',
        researchBasis: 'Meindl, Ehrlich, and Dukerich\'s research on the "romance of leadership" showing systematic overattribution of outcomes to leaders.'
      },
      {
        id: 2,
        title: 'Human Capital vs. Social Capital',
        content: `Day distinguishes two forms of capital in leadership:

**Human Capital:** Intrapersonal KSAs (knowledge, skills, abilities) that a leader takes from one situation to another. This is what leader development builds.

**Social Capital:** Leadership resources created between people in a networked fashion. Leadership resides in relationships, not individuals. This is what leadership development builds.

**Key Insight:** Most "leadership development" focuses on human capital (individual skills) while ignoring social capital (relational capacity). Both are necessary.`,
        practicalApplication: 'Audit your developmental investments: How much time do you spend building your individual capabilities vs. building the quality of your relationships and networks?',
        researchBasis: 'Day\'s 2000 article "Leadership Development: A Review in Context" establishing this foundational distinction.'
      },
      {
        id: 3,
        title: 'The High-Potential Trap',
        content: `Many organizations invest heavily in "high-potential" (HiPo) programs. Day critiques several assumptions:

**Assumption 1:** Leadership potential is rare. **Reality:** It may be more common than we think.

**Assumption 2:** We can identify potential. **Reality:** Most HiPo selections are based on current performance, not future potential.

**Assumption 3:** Concentrated investment is efficient. **Reality:** This creates in-group/out-group dynamics and may miss late bloomers.

**Key Insight:** The HiPo designation often becomes a self-fulfilling prophecy—those labeled high-potential get more opportunities, which makes them appear more capable.`,
        practicalApplication: 'If you\'re labeled "high-potential," don\'t let it inflate your ego. If you\'re not, don\'t let it limit your development. Potential is developed, not just discovered.',
        researchBasis: 'Research by Silzer and Church on high-potential programs and their limitations.'
      },
      {
        id: 4,
        title: 'Leadership Training Effectiveness',
        content: `A meta-analysis by Lacerenza et al. (2017) found that leadership training can be effective—but context matters enormously:

**What works:**
- Needs assessment before training
- Feedback during training
- Multiple delivery methods
- Spaced practice over time
- On-the-job application

**What doesn't work:**
- One-shot programs without follow-up
- Lecture-only formats
- No opportunity for practice
- Ignoring transfer of training issues

**Key Insight:** Training can work, but only when designed with transfer in mind. The goal isn't learning—it's changed behavior on the job.`,
        practicalApplication: 'For any training you attend, plan before: What specific behaviors will I practice? Plan after: How will I continue practicing and get feedback?',
        researchBasis: 'Lacerenza, Reyes, Marlow, Joseph, and Salas (2017) meta-analysis of leadership training interventions.'
      }
    ],
    
    keyQuotes: [
      '"Something to always remember is that leadership is a process and not a position."',
      '"To be an effective leader means being able to work effectively with others. It is not a human capital issue as much as a social capital one."',
      '"Whatever is developed in individuals must be used or applied for it to matter."'
    ],
    
    reflectionPrompts: [
      'How much of your development focuses on individual skills vs. relationships?',
      'Have you ever been labeled high-potential or not? How did it affect you?',
      'What would it look like to develop leadership as a process, not just as personal skills?'
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
    overview: `Day argues that self-views are "proximal indicators" of development—early signs that development is occurring, even before behavioral changes are visible. This chapter explores three critical self-views: leader identity, self-awareness, and leadership self-efficacy.`,
    
    lessons: [
      {
        id: 1,
        title: 'Leader Identity',
        content: `Leader identity is the extent to which you see yourself as a leader. It's not about holding a leadership position—it's about whether "leader" is part of how you define yourself.

Day uses Hiller's (2005) four-item scale:
1. I am a leader
2. I see myself as a leader
3. If I had to describe myself to others, I would include the word "leader"
4. I prefer to be seen by others as a leader

**Key Insight:** A leader identity motivates the learning and practice that sustains development. When you see yourself as a leader, you seek out leadership experiences and persist through challenges.`,
        practicalApplication: 'Rate yourself on the four items above (1-5 scale). If your scores are low, explore: What would need to change for you to see yourself as a leader?',
        researchBasis: 'Research by Day, Harrison, and Halpin (2009) showing leader identity as a foundation for long-term development.'
      },
      {
        id: 2,
        title: 'Self-Awareness',
        content: `Self-awareness involves knowing your values, tendencies, strengths, and limitations. Day distinguishes two types:

**Internal Self-Awareness:** Understanding your own patterns—what you value, how you react, what triggers you, what energizes you.

**External Self-Awareness:** Understanding how others perceive you. This requires feedback and is often where blind spots live.

**The Paradox:** People who rate themselves as highly self-aware are often not. Those with genuine self-awareness know they have blind spots.

**Key Insight:** Self-awareness is the foundation of all development. Without knowing where you are, you can't chart a course to where you want to be.`,
        practicalApplication: 'Seek feedback from 3-5 people who know you well. Ask: "What is one thing I do that helps my leadership? One thing that hinders it?" Look for patterns.',
        researchBasis: 'Tasha Eurich\'s research on self-awareness showing that only 10-15% of people are as self-aware as they think.'
      },
      {
        id: 3,
        title: 'Leadership Self-Efficacy',
        content: `Leadership self-efficacy (LSE) is your confidence in your ability to lead effectively. It's not about being confident in general—it's specific confidence in leadership situations.

**High LSE:** "I believe I can successfully lead this team through this challenge."
**Low LSE:** "I'm not sure I have what it takes to handle this leadership situation."

LSE affects effort and persistence: Those with higher LSE try harder and persist longer when facing leadership challenges.

**Key Insight:** LSE is malleable—it can be developed through mastery experiences, vicarious learning, social persuasion, and managing physiological states.`,
        practicalApplication: 'Identify one leadership situation where your confidence is low. What small success could you create to build mastery? Who could you observe and learn from?',
        researchBasis: 'Bandura\'s self-efficacy theory applied to leadership by Hannah, Avolio, and others.'
      },
      {
        id: 4,
        title: 'Proximal vs. Distal Indicators',
        content: `Day distinguishes between proximal (leading) and distal (lagging) indicators of development:

**Proximal Indicators:** Changes in self-views (identity, awareness, self-efficacy) and leadership KSAs. These are early signs of development.

**Distal Indicators:** Behavioral changes on the job, team performance, organizational outcomes. These are ultimate goals but take longer to manifest.

**Key Insight:** Don't expect immediate behavioral change. Self-view changes come first. Trust the process and track proximal indicators as evidence of progress.`,
        practicalApplication: 'Track your proximal indicators monthly: Rate your leader identity, self-awareness, and self-efficacy. Look for trends over time.',
        researchBasis: 'Day and Dragoni\'s (2015) framework distinguishing proximal and distal developmental outcomes.'
      }
    ],
    
    keyQuotes: [
      '"A leader identity motivates the learning and practice that sustains development."',
      '"Self-awareness is the starting point for all development."',
      '"Self-efficacy is not about feeling good—it\'s about believing you can succeed at specific tasks."'
    ],
    
    reflectionPrompts: [
      'To what extent do you currently see yourself as a leader? What shapes that view?',
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
    overview: `Previous chapters focused on relatively short-term development. This chapter takes a longer view, exploring how leadership development is part of broader adult development that can continue across the entire lifespan.`,
    
    lessons: [
      {
        id: 1,
        title: 'Lifelong Learning',
        content: `John F. Kennedy once said that "leadership and learning are indispensable to each other." Learning and development are lifelong endeavors without an end state.

Day distinguishes learning from development:
- **Learning:** Enduring change in behavior; can be adaptive or maladaptive; occurs relatively quickly
- **Development:** Always adaptive; occurs over longer time scales; shapes how we make meaning

**Key Insight:** Development doesn't happen automatically with age. Many adults stop developing. The difference is sustained engagement with challenging experiences.`,
        practicalApplication: 'Design your life for ongoing learning: What challenging experiences are you engaging with? What new skills are you building? When did you last feel like a beginner?',
        researchBasis: 'Research on cognitive aging showing that intellectual engagement buffers against decline.'
      },
      {
        id: 2,
        title: 'Deliberate Practice',
        content: `Ericsson's research on expert performance applies to leadership:

**Deliberate Practice Requirements:**
1. Activities specifically designed to improve performance
2. Tasks that can be repeated at high volume
3. Continuous feedback on results
4. High levels of concentration and effort
5. It's not inherently enjoyable—it's work

**Key Insight:** Simply having leadership experiences doesn't develop expertise. The experiences must involve deliberate, focused practice with feedback.`,
        practicalApplication: 'Identify one leadership skill to practice deliberately. Design repetitions, seek feedback, and commit to focused effort even when uncomfortable.',
        researchBasis: 'Ericsson, Krampe, and Tesch-Römer\'s (1993) deliberate practice research applied to leadership.'
      },
      {
        id: 3,
        title: 'Meaning-Making and Development',
        content: `Adult development theorists like Kegan propose that development involves increasingly complex ways of making meaning:

**Socialized Mind:** Define self through relationships and social expectations
**Self-Authoring Mind:** Develop own internal compass and ideology
**Self-Transforming Mind:** See multiple frameworks, hold complexity, embrace paradox

Most adults don't reach the self-transforming mind. But leadership increasingly requires this capacity.

**Key Insight:** Development is not just about acquiring skills—it's about becoming a more complex meaning-maker who can handle greater complexity.`,
        practicalApplication: 'Notice how you make meaning of challenging situations. Do you rely on external validation? Can you hold competing truths? Practice perspective-taking on complex issues.',
        researchBasis: 'Kegan\'s adult development theory and its application to leadership by Petrie and others.'
      },
      {
        id: 4,
        title: 'Development Has No Endpoint',
        content: `Day emphasizes that leader development is potentially lifelong:

"Individuals can boost how they perceive and construe the self in relatively short order... Similarly, changes in self-awareness and leadership self-efficacy can occur relatively quickly. Someone can learn and apply a particular leadership skill in a matter of hours or days. So why do some researchers claim that developing as a leader is potentially a lifelong endeavor?"

**The Answer:** Because the world keeps changing, new challenges emerge, and there's always another level of complexity to master.

**Key Insight:** There is no "developed leader" end state. Even highly developed leaders continue growing—or begin declining.`,
        practicalApplication: 'Shift from "How do I become a leader?" to "How do I keep developing as a leader?" Development is a discipline, not a destination.',
        researchBasis: 'Longitudinal research on leader development showing continued growth possibilities across the lifespan.'
      }
    ],
    
    keyQuotes: [
      '"Leadership and learning are indispensable to each other." - John F. Kennedy',
      '"Development is a function of both nature and nurture—shaped by biological and environmental forces."',
      '"Development has no endpoint—it is lifelong growth."'
    ],
    
    reflectionPrompts: [
      'How has your meaning-making about leadership evolved over the years?',
      'What would deliberate practice look like for your most important leadership skill?',
      'If development never ends, what\'s your next developmental frontier?'
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
    overview: `This chapter shifts from individual leader development to collective leadership development. The focus is on building social capital—the resources created through relationships—and developing leadership as a shared capacity.`,
    
    lessons: [
      {
        id: 1,
        title: 'Leader Development vs. Leadership Development',
        content: `Day returns to the fundamental distinction:

**Leader Development:** Builds human capital in individuals—knowledge, skills, abilities that individuals carry from situation to situation.

**Leadership Development:** Builds social capital in collectives—the resources created between people through relationships and networks.

**Key Insight:** The best-developed individual leader cannot have impact without an interpersonal context. Most "leadership development" is really leader development, missing the relational dimension.`,
        practicalApplication: 'Examine your organization\'s development investments. How much focuses on individuals vs. relationships, networks, and collective capacity?',
        researchBasis: 'Day\'s (2000) foundational distinction between human and social capital approaches.'
      },
      {
        id: 2,
        title: 'Psychological Safety',
        content: `Amy Edmondson's concept of psychological safety is central to collective leadership:

**Definition:** A shared belief that the team is safe for interpersonal risk-taking. People feel they can speak up, ask questions, admit mistakes, and offer ideas without fear.

**Why It Matters:** Without psychological safety, teams can't learn. Members hide mistakes, avoid difficult conversations, and don't contribute their best thinking.

**Key Insight:** Leaders build psychological safety by inviting input, responding constructively to mistakes, and modeling vulnerability.`,
        practicalApplication: 'Assess the psychological safety in teams you lead or belong to. What signals tell people it\'s safe (or unsafe) to speak up? What could you do differently?',
        researchBasis: 'Edmondson\'s research on psychological safety and team learning, including her work with surgical teams.'
      },
      {
        id: 3,
        title: 'Shared Mental Models',
        content: `Effective teams develop shared understanding of:
- **Task:** What are we trying to accomplish?
- **Team:** Who does what? What are our roles and capabilities?
- **Context:** What's happening in our environment?

When mental models are shared, coordination improves and teams can adapt more fluidly.

**Key Insight:** Shared mental models don't happen automatically. They require explicit communication, shared experiences, and ongoing calibration.`,
        practicalApplication: 'Periodically check alignment with your team: Do we have shared understanding of our goals, roles, and situation? Where are we misaligned?',
        researchBasis: 'Research by Cannon-Bowers, Salas, and others on team cognition and shared mental models.'
      },
      {
        id: 4,
        title: 'Collective Leadership Efficacy',
        content: `Just as individuals have leadership self-efficacy, collectives have leadership efficacy—the shared belief that "we can successfully engage in leadership activities together."

This is different from individual confidence. It's about the team's belief in its collective capacity.

**Key Insight:** Collective efficacy predicts team performance even controlling for individual member abilities. The team's belief in itself matters.`,
        practicalApplication: 'Assess your team\'s collective leadership efficacy. What experiences could build shared confidence? How can success be made visible and celebrated?',
        researchBasis: 'Bandura\'s collective efficacy theory applied to leadership contexts.'
      }
    ],
    
    keyQuotes: [
      '"Leadership development assumes that leadership is created through the ongoing interactions of people engaged in shared work."',
      '"The most highly developed leader cannot have any impact without an interpersonal context."',
      '"Collective leadership is greater than the sum of individual leaders."'
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
    overview: `This chapter introduces social network analysis (SNA) as a tool for understanding collective leadership. The structure of relationships—who is connected to whom—has profound implications for leadership and development.`,
    
    lessons: [
      {
        id: 1,
        title: 'Social Networks vs. Social Networking',
        content: `Day distinguishes these carefully:

**Social Networking:** Facebook, LinkedIn, events where people make professional connections. Fun, possibly helpful, but not scientific.

**Social Network Analysis (SNA):** The serious science of how individuals are connected and in what ways. Provides quantitative and visual tools for understanding relationship structures.

**Key Insight:** Your network is a form of capital that enables leadership. But not all networks are created equal—structure matters as much as size.`,
        practicalApplication: 'Map your professional network. Who are your close ties? Who connects you to people you wouldn\'t otherwise reach? Where are structural holes?',
        researchBasis: 'Foundational SNA concepts from researchers like Granovetter, Burt, and others applied to leadership.'
      },
      {
        id: 2,
        title: 'The Strength of Weak Ties',
        content: `Granovetter's famous theory: Weak ties (acquaintances, indirect connections) often provide more value than strong ties (close friends, direct connections) for certain purposes.

**Why?** Weak ties bridge different social worlds, providing access to novel information. Strong ties tend to know what you already know.

A massive LinkedIn study (20 million people) confirmed: Weak ties were more likely to lead to new jobs than strong ties.

**Key Insight:** For learning and opportunity, cultivate weak ties deliberately. For support and execution, strong ties matter more.`,
        practicalApplication: 'Identify people who connect you to different networks. Invest in maintaining these "bridge" relationships even if they\'re not close friendships.',
        researchBasis: 'Granovetter\'s (1973) "Strength of Weak Ties" and the 2022 LinkedIn field experiment.'
      },
      {
        id: 3,
        title: 'Network Structure and Leadership',
        content: `Different network structures serve different purposes:

**Dense Networks:** Everyone knows everyone. Good for trust, support, and coordination. Risk: Echo chambers.

**Sparse Networks:** People are connected through brokers who bridge different groups. Good for diverse information and innovation. Risk: Fragility.

**Key Insight:** Leaders often occupy "structural holes"—positions that bridge otherwise disconnected groups. This gives them information advantages and influence.`,
        practicalApplication: 'Where do you sit in your organization\'s network? Are you deeply embedded in one cluster, or do you bridge multiple groups?',
        researchBasis: 'Burt\'s structural hole theory and research on network positions and performance.'
      },
      {
        id: 4,
        title: 'Building Network Capital',
        content: `Network capital—like human capital—can be built deliberately:

**Strategies:**
1. Map your current network
2. Identify gaps and opportunities
3. Build bridges to new networks
4. Maintain existing relationships
5. Give value before expecting return

**Key Insight:** Your network is not static. It requires ongoing investment and cultivation. Neglected relationships atrophy.`,
        practicalApplication: 'Schedule regular time for network maintenance. Reach out to weak ties periodically. Introduce people who should know each other.',
        researchBasis: 'Research on social capital and network development in organizational contexts.'
      }
    ],
    
    keyQuotes: [
      '"Social networks are not the same as social networking."',
      '"What kinds of value are created by different patterns of SNA links or connections? This is the essence of social capital."',
      '"Leadership is a process enabled by networks."'
    ],
    
    reflectionPrompts: [
      'What does your leadership network look like? Map it out.',
      'Who are the weak ties that connect you to new information and opportunities?',
      'Where could you build bridges to currently disconnected networks?'
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
    overview: `The final chapter calls for ongoing advancement in how we understand and practice leadership development. Day argues for eclecticism, rigor, and humility as the field continues to evolve.`,
    
    lessons: [
      {
        id: 1,
        title: 'No Single Theory Suffices',
        content: `Day warns against seeking "the" leadership theory:

"Much scholarly energy was invested in discovering and promoting the leadership theory. This mistake led to an all-or-nothing type of turf battle among proponents of different leadership theories. None of these theories are completely right and none completely wrong."

**Key Insight:** Leader and leadership development are inherently eclectic. Helpful approaches will draw from multiple academic disciplines—psychology, sociology, education, management, and more.`,
        practicalApplication: 'Be suspicious of anyone claiming to have "the answer" to leadership development. Remain curious about multiple perspectives and approaches.',
        researchBasis: 'Day\'s career-long integration of multiple research traditions in studying leadership.'
      },
      {
        id: 2,
        title: 'The Call for Rigor',
        content: `Day advocates for more rigorous research:

**Problems:**
- Too much reliance on self-report
- Too few longitudinal studies
- Inadequate attention to context
- Weak causal inferences

**Solutions:**
- Multiple measurement methods
- Longer time horizons
- Context-sensitive designs
- Experimental approaches where possible

**Key Insight:** The field needs better science. As a practitioner, align with evidence-based practices and be skeptical of fads.`,
        practicalApplication: 'When evaluating any leadership development approach, ask: What\'s the evidence? How was it studied? What are the limitations?',
        researchBasis: 'Day\'s methodological critiques and calls for more rigorous research designs.'
      },
      {
        id: 3,
        title: 'Integration Across Levels',
        content: `Day calls for integrating individual and collective perspectives:

**Individual Level:** Leader identity, self-awareness, self-efficacy, KSAs
**Collective Level:** Psychological safety, shared mental models, collective efficacy, network structures

Both levels interact. Individual development enables collective capacity; collective capacity shapes individual development.

**Key Insight:** Complete leadership development must address both levels. Focusing on one while ignoring the other leaves potential unrealized.`,
        practicalApplication: 'Design your development to include both individual skill-building and collective capacity-building. Neither alone is sufficient.',
        researchBasis: 'Day and Dragoni\'s (2015) multilevel framework for leader/leadership development.'
      },
      {
        id: 4,
        title: 'Humility and Continuous Learning',
        content: `Day closes with humility:

"Keep advancing—current practices will seem primitive in the future."

What we think we know about leadership development today will be refined, revised, and in some cases overturned. The field is young.

**Key Insight:** Your development approach should be a hypothesis, not a fixed belief. Stay curious, keep learning, and be willing to update your understanding.`,
        practicalApplication: 'Hold your current development practices lightly. What you\'re doing may need to change as you and the field learn more.',
        researchBasis: 'Day\'s acknowledgment of the emerging nature of the field and need for ongoing advancement.'
      }
    ],
    
    keyQuotes: [
      '"Leader and leadership development are inherently eclectic, which is why no one theory will suffice."',
      '"The field remains theoretically and empirically underdeveloped compared with the general leadership field."',
      '"Keep advancing—current practices will seem primitive in the future."'
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
        {
          title: 'Leadership: Theory and Practice',
          author: 'Peter G. Northouse',
          year: 2021,
          edition: '9th',
          description: 'The most widely used leadership textbook, covering all major leadership theories with clear explanations and practical applications.',
          keyTopics: ['Trait approach', 'Skills approach', 'Behavioral approach', 'Situational leadership', 'Transformational leadership'],
          evidenceLevel: 'High - Comprehensive review of peer-reviewed research',
          recommended: true
        },
        {
          title: 'The Bass Handbook of Leadership',
          author: 'Bernard M. Bass & Ruth Bass',
          year: 2008,
          edition: '4th',
          description: 'The most comprehensive reference work on leadership, synthesizing decades of research.',
          keyTopics: ['Leadership theories', 'Leadership styles', 'Leadership development', 'Cross-cultural leadership'],
          evidenceLevel: 'High - Encyclopedic review of research literature',
          recommended: true
        },
        {
          title: 'The Nature of Leadership',
          author: 'John Antonakis & David V. Day (Eds.)',
          year: 2018,
          edition: '3rd',
          description: 'Collection of chapters by leading scholars on cutting-edge leadership research.',
          keyTopics: ['Leader traits', 'Charisma', 'Ethical leadership', 'Leadership development'],
          evidenceLevel: 'High - Peer-reviewed scholarly chapters',
          recommended: true
        }
      ]
    },
    {
      id: 'development',
      name: 'Leader & Leadership Development',
      description: 'Research and practice on developing leadership capacity',
      books: [
        {
          title: 'Developing Leaders and Leadership',
          author: 'David V. Day',
          year: 2024,
          description: 'The book this app is based on. Distinguishes leader from leadership development with evidence-based frameworks.',
          keyTopics: ['Five first principles', 'ACS framework', 'Self-views', 'Collective capacity', 'Networks'],
          evidenceLevel: 'High - Primary source for this application',
          recommended: true,
          primary: true
        },
        {
          title: 'The Center for Creative Leadership Handbook of Leadership Development',
          author: 'Ellen Van Velsor, Cynthia McCauley, & Marian Ruderman (Eds.)',
          year: 2010,
          edition: '3rd',
          description: 'Comprehensive guide from the world\'s leading leadership development organization.',
          keyTopics: ['Assessment', 'Challenge', 'Support', '360 feedback', 'Developmental assignments'],
          evidenceLevel: 'High - Research-based practices from CCL',
          recommended: true
        },
        {
          title: 'Experience-Driven Leader Development',
          author: 'Cynthia McCauley, D. Scott DeRue, Paul Yost, & Sylvester Taylor (Eds.)',
          year: 2014,
          description: 'How to maximize learning from leadership experiences.',
          keyTopics: ['Developmental experiences', 'Learning from experience', 'Learning agility'],
          evidenceLevel: 'High - Research-based practitioner guide',
          recommended: false
        }
      ]
    },
    {
      id: 'self-awareness',
      name: 'Self-Awareness & Personal Development',
      description: 'Understanding yourself as the foundation for leadership',
      books: [
        {
          title: 'Insight',
          author: 'Tasha Eurich',
          year: 2017,
          description: 'Research-based exploration of self-awareness: what it is, why it matters, and how to develop it.',
          keyTopics: ['Internal self-awareness', 'External self-awareness', 'Self-deception', 'Feedback'],
          evidenceLevel: 'High - Based on original research with 5,000+ participants',
          recommended: true
        },
        {
          title: 'An Everyone Culture',
          author: 'Robert Kegan & Lisa Laskow Lahey',
          year: 2016,
          description: 'How organizations can become "deliberately developmental" environments.',
          keyTopics: ['Adult development', 'Deliberately developmental organizations', 'Immunity to change'],
          evidenceLevel: 'Medium - Case study based with theoretical grounding',
          recommended: true
        },
        {
          title: 'Immunity to Change',
          author: 'Robert Kegan & Lisa Laskow Lahey',
          year: 2009,
          description: 'Why change is so hard and how to overcome psychological barriers.',
          keyTopics: ['Competing commitments', 'Big assumptions', 'Adaptive challenges'],
          evidenceLevel: 'Medium - Based on adult development theory',
          recommended: false
        }
      ]
    },
    {
      id: 'teams',
      name: 'Team Leadership & Psychological Safety',
      description: 'Leading and developing high-performing teams',
      books: [
        {
          title: 'The Fearless Organization',
          author: 'Amy Edmondson',
          year: 2019,
          description: 'Creating psychological safety in the workplace for learning, innovation, and growth.',
          keyTopics: ['Psychological safety', 'Learning from failure', 'Speaking up', 'Team learning'],
          evidenceLevel: 'High - Based on decades of research',
          recommended: true
        },
        {
          title: 'Team of Teams',
          author: 'General Stanley McChrystal',
          year: 2015,
          description: 'How to build adaptable organizations through shared consciousness and empowered execution.',
          keyTopics: ['Adaptability', 'Shared consciousness', 'Decentralized decision-making'],
          evidenceLevel: 'Medium - Case study based with research context',
          recommended: true
        },
        {
          title: 'The Five Dysfunctions of a Team',
          author: 'Patrick Lencioni',
          year: 2002,
          description: 'A fable-based exploration of what makes teams fail and succeed.',
          keyTopics: ['Trust', 'Conflict', 'Commitment', 'Accountability', 'Results'],
          evidenceLevel: 'Low - Practice-based fable (but widely used)',
          recommended: false
        }
      ]
    },
    {
      id: 'coaching',
      name: 'Coaching & Feedback',
      description: 'Developing others through coaching conversations',
      books: [
        {
          title: 'Co-Active Coaching',
          author: 'Henry Kimsey-House, Karen Kimsey-House, Phillip Sandahl, & Laura Whitworth',
          year: 2018,
          edition: '4th',
          description: 'The foundational text for the coaching profession with practical tools and frameworks.',
          keyTopics: ['Coaching model', 'Powerful questions', 'Listening', 'Coaching presence'],
          evidenceLevel: 'Medium - Practitioner-developed, widely adopted',
          recommended: true
        },
        {
          title: 'Thanks for the Feedback',
          author: 'Douglas Stone & Sheila Heen',
          year: 2014,
          description: 'The science and art of receiving feedback well.',
          keyTopics: ['Receiving feedback', 'Feedback triggers', 'Learning from feedback'],
          evidenceLevel: 'Medium - Research-informed practical guide',
          recommended: true
        },
        {
          title: 'Helping People Change',
          author: 'Richard Boyatzis, Melvin Smith, & Ellen Van Oosten',
          year: 2019,
          description: 'Research-based approach to coaching with compassion rather than compliance.',
          keyTopics: ['Coaching with compassion', 'Positive emotional attractors', 'Intentional change'],
          evidenceLevel: 'High - Based on neuroscience and organizational research',
          recommended: true
        }
      ]
    },
    {
      id: 'ethics',
      name: 'Ethical & Authentic Leadership',
      description: 'Leading with integrity and purpose',
      books: [
        {
          title: 'Authentic Leadership',
          author: 'Bill George',
          year: 2003,
          description: 'A call for leaders to lead with authenticity, values, and purpose.',
          keyTopics: ['Authentic leadership', 'Purpose', 'Values', 'Self-awareness'],
          evidenceLevel: 'Low - Practice-based, influential but limited research base',
          recommended: false
        },
        {
          title: 'The Ethical Leader',
          author: 'Morela Hernandez & Linda Treviño',
          year: 2022,
          description: 'Research-based guide to ethical leadership behavior.',
          keyTopics: ['Ethical decision-making', 'Moral awareness', 'Ethical culture'],
          evidenceLevel: 'High - Research-based',
          recommended: true
        },
        {
          title: 'Dare to Lead',
          author: 'Brené Brown',
          year: 2018,
          description: 'Vulnerability-based leadership drawing on extensive qualitative research.',
          keyTopics: ['Vulnerability', 'Courage', 'Trust', 'Shame resilience'],
          evidenceLevel: 'Medium - Qualitative research based',
          recommended: true
        }
      ]
    },
    {
      id: 'evidence-based',
      name: 'Evidence-Based Management',
      description: 'Using research to inform management practice',
      books: [
        {
          title: 'Hard Facts, Dangerous Half-Truths, and Total Nonsense',
          author: 'Jeffrey Pfeffer & Robert Sutton',
          year: 2006,
          description: 'A call for evidence-based management and critique of management fads.',
          keyTopics: ['Evidence-based practice', 'Management myths', 'Critical thinking'],
          evidenceLevel: 'High - Meta-analysis and research review',
          recommended: true
        },
        {
          title: 'Thinking, Fast and Slow',
          author: 'Daniel Kahneman',
          year: 2011,
          description: 'Nobel laureate\'s summary of decades of research on judgment and decision-making.',
          keyTopics: ['Cognitive biases', 'System 1 and 2', 'Decision-making', 'Heuristics'],
          evidenceLevel: 'High - Summary of Nobel Prize-winning research',
          recommended: true
        },
        {
          title: 'The Oxford Handbook of Evidence-Based Management',
          author: 'Denise Rousseau (Ed.)',
          year: 2012,
          description: 'Comprehensive academic treatment of evidence-based management.',
          keyTopics: ['Evidence-based practice', 'Research synthesis', 'Implementation'],
          evidenceLevel: 'High - Peer-reviewed scholarly chapters',
          recommended: false
        }
      ]
    },
    {
      id: 'articles',
      name: 'Key Research Articles',
      description: 'Foundational peer-reviewed research',
      books: [
        {
          title: 'Leadership Development: A Review in Context',
          author: 'David V. Day',
          year: 2000,
          journal: 'Leadership Quarterly',
          description: 'The foundational article distinguishing leader development from leadership development.',
          keyTopics: ['Human capital', 'Social capital', 'Leader vs. leadership development'],
          evidenceLevel: 'High - Highly cited peer-reviewed article',
          recommended: true
        },
        {
          title: 'Leader Development: A Review of Research',
          author: 'David V. Day, John Fleenor, Leanne Atwater, Rachel Sturm, & Rob McKee',
          year: 2014,
          journal: 'Leadership Quarterly',
          description: 'Comprehensive review of leader development research.',
          keyTopics: ['Self-views', 'Skills', 'Developmental experiences'],
          evidenceLevel: 'High - Peer-reviewed research review',
          recommended: true
        },
        {
          title: 'Leadership Training Design, Delivery, and Implementation: A Meta-Analysis',
          author: 'Christina Lacerenza, Denise Reyes, Shannon Marlow, Dana Joseph, & Eduardo Salas',
          year: 2017,
          journal: 'Journal of Applied Psychology',
          description: 'Meta-analysis of what makes leadership training effective.',
          keyTopics: ['Training effectiveness', 'Needs assessment', 'Delivery methods'],
          evidenceLevel: 'High - Meta-analysis of research literature',
          recommended: true
        }
      ]
    }
  ]
};

// ============================================================================
// KLI COMPETENCIES (Abbreviated for space)
// ============================================================================

const KLI_COMPETENCIES = [
  { id: 'courage', name: 'Courage', color: 'amber', description: 'Leading courageously through resilience, entrepreneurial mindset, and responsible action.', icon: 'Shield', image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=80', capabilities: [{ id: 'resilience', name: 'Resilience', description: 'Bounce back from setbacks', attributes: ['Persistence', 'Adaptability', 'Growth mindset', 'Optimism', 'Emotion management'] }, { id: 'entrepreneurial', name: 'Entrepreneurial Mindset', description: 'Take bold action', attributes: ['Enterprising', 'Resourceful', 'Initiative', 'Bold', 'Challenge'] }, { id: 'responsible', name: 'Responsible Action', description: 'Act with integrity', attributes: ['Insight', 'Modeling', 'Integrity', 'Convictions', 'Advocacy'] }] },
  { id: 'creativity', name: 'Creativity', color: 'violet', description: 'Leading creatively through innovation, communication, and problem-solving.', icon: 'Lightbulb', image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80', capabilities: [{ id: 'innovation', name: 'Innovation', description: 'Generate new ideas', attributes: ['Generating ideas', 'Openness to change', 'Visioning', 'Challenge status quo', 'Flexibility'] }, { id: 'communication', name: 'Communication', description: 'Express and listen', attributes: ['Expressive', 'Listen actively', 'Persuasive', 'Inquiry', 'Dialogue'] }, { id: 'problemsolving', name: 'Problem Solving', description: 'Analyze and decide', attributes: ['Information seeking', 'Analyzing data', 'Anticipates problems', 'Decision making', 'Solution driven'] }] },
  { id: 'collaboration', name: 'Collaboration', color: 'teal', description: 'Leading collaboratively through empathy, social learning, and teamwork.', icon: 'Users', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', capabilities: [{ id: 'empathy', name: 'Empathy', description: 'Connect with others', attributes: ['Perceptive', 'Curious', 'Diversity', 'Inclusive', 'Sensitivity'] }, { id: 'sociallearning', name: 'Social Learning', description: 'Build relationships', attributes: ['Social awareness', 'Engages others', 'Networking', 'Nurturing relationships', 'Situational learning'] }, { id: 'teamwork', name: 'Teamwork', description: 'Work together', attributes: ['Participative', 'Accountable', 'Supportive', 'Respectful', 'Conflict management'] }] }
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
  Phone: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>),
  PhoneOff: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="23" y1="1" x2="1" y2="23"/></svg>),
  BookOpen: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>),
  Star: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  StarOutline: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  Heart: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>),
  Keyboard: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M6 16h12"/></svg>),
  CheckSquare: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>),
  Square: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>),
  Library: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>),
  ExternalLink: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>),
  Circle: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg>)
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
          <p className="text-stone-500 text-xs mt-1">Based on David V. Day's Research</p>
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
// NAVIGATION COMPONENTS
// ============================================================================

function Sidebar({ currentView, setCurrentView, user, onSignOut }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Icons.Home },
    { id: 'chapters', label: 'Learn', icon: Icons.BookOpen },
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
    { id: 'chapters', label: 'Learn', icon: Icons.BookOpen },
    { id: 'actions', label: 'Actions', icon: Icons.CheckSquare },
    { id: 'coaches', label: 'Coach', icon: Icons.MessageCircle },
    { id: 'library', label: 'Library', icon: Icons.Book }
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

  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <p className="text-stone-500 text-sm mb-1">{dateStr}</p>
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800">
          {user?.user_metadata?.full_name ? `Welcome, ${user.user_metadata.full_name.split(' ')[0]}` : 'Welcome back'}
        </h2>
      </div>

      {/* Coach Card */}
      <button onClick={() => setCurrentView('coaches')}
        className="w-full bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-5 text-left hover:from-stone-700 transition-all mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white"><Icons.MessageCircle /></div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white mb-1">Talk to Your Coach</h3>
            <p className="text-stone-400 text-sm">ICF Coach or Day Mentor • Voice or Text</p>
          </div>
          <Icons.ArrowRight className="text-white" />
        </div>
      </button>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border border-stone-200 text-center">
          <div className="flex justify-center mb-1 text-amber-600"><Icons.Flame /></div>
          <p className="text-xl font-bold text-stone-800">{streak}</p>
          <p className="text-xs text-stone-500">Day Streak</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 text-center">
          <div className="flex justify-center mb-1 text-teal-600"><Icons.CheckSquare /></div>
          <p className="text-xl font-bold text-stone-800">{pendingActions}</p>
          <p className="text-xs text-stone-500">Actions</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200 text-center">
          <div className="flex justify-center mb-1 text-violet-600"><Icons.Book /></div>
          <p className="text-xl font-bold text-stone-800">{journalEntries.length}</p>
          <p className="text-xs text-stone-500">Reflections</p>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-stone-800">Continue Learning</h3>
          <button onClick={() => setCurrentView('chapters')} className="text-amber-700 text-sm font-medium flex items-center gap-1">All chapters <Icons.ChevronRight /></button>
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
              <p className="text-sm text-stone-500 line-clamp-2">{CHAPTERS[0].subtitle}</p>
            </div>
          </div>
        </button>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => setCurrentView('library')} className="bg-white rounded-xl border border-stone-200 p-4 text-left hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center mb-2"><Icons.Book /></div>
          <p className="font-medium text-stone-800 text-sm">Reading Library</p>
          <p className="text-xs text-stone-500">Evidence-based resources</p>
        </button>
        <button onClick={() => setCurrentView('actions')} className="bg-white rounded-xl border border-stone-200 p-4 text-left hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mb-2"><Icons.CheckSquare /></div>
          <p className="font-medium text-stone-800 text-sm">My Actions</p>
          <p className="text-xs text-stone-500">{pendingActions} pending</p>
        </button>
      </div>
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
// CHAPTER DETAIL VIEW (Deep Content)
// ============================================================================

function ChapterDetail({ chapterId, setCurrentView }) {
  const chapter = CHAPTERS.find(c => c.id === chapterId);
  const [expandedLesson, setExpandedLesson] = useState(null);
  
  if (!chapter) return null;

  return (
    <div className="animate-fadeIn pb-8">
      <button onClick={() => setCurrentView('chapters')} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
        <Icons.ChevronLeft /> All Chapters
      </button>

      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden mb-6">
        <img src={chapter.image} alt="" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-xs text-white/80">Chapter {chapter.id} • {chapter.duration}</span>
          <h2 className="text-2xl font-serif font-semibold text-white">{chapter.title}</h2>
          <p className="text-white/80 text-sm">{chapter.subtitle}</p>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-xl border border-stone-200 p-5 mb-6">
        <h3 className="font-semibold text-stone-800 mb-2">Overview</h3>
        <p className="text-stone-600 text-sm leading-relaxed">{chapter.overview}</p>
      </div>

      {/* Lessons */}
      <h3 className="font-semibold text-stone-800 mb-3">Lessons</h3>
      <div className="space-y-3 mb-6">
        {chapter.lessons.map((lesson, idx) => (
          <div key={lesson.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <button 
              onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
              className="w-full p-4 flex items-start gap-3 text-left"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${chapter.color === 'amber' ? 'bg-amber-100 text-amber-700' : chapter.color === 'violet' ? 'bg-violet-100 text-violet-700' : 'bg-teal-100 text-teal-700'}`}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-stone-800">{lesson.title}</h4>
              </div>
              <div className={`text-stone-400 transition-transform ${expandedLesson === lesson.id ? 'rotate-180' : ''}`}>
                <Icons.ChevronDown />
              </div>
            </button>
            
            {expandedLesson === lesson.id && (
              <div className="px-4 pb-4 border-t border-stone-100">
                <div className="pt-4 space-y-4">
                  <div className="prose prose-sm text-stone-600">
                    {lesson.content.split('\n\n').map((para, i) => (
                      <p key={i} className="mb-3 leading-relaxed whitespace-pre-wrap">{para}</p>
                    ))}
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                    <h5 className="font-medium text-amber-800 text-sm mb-1">💡 Practical Application</h5>
                    <p className="text-amber-900 text-sm">{lesson.practicalApplication}</p>
                  </div>
                  
                  <div className="bg-stone-50 rounded-lg p-4">
                    <h5 className="font-medium text-stone-700 text-sm mb-1">📚 Research Basis</h5>
                    <p className="text-stone-600 text-sm">{lesson.researchBasis}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Key Quotes */}
      <div className="bg-stone-900 rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-white mb-3">Key Quotes</h3>
        <div className="space-y-3">
          {chapter.keyQuotes.map((quote, idx) => (
            <p key={idx} className="text-stone-300 text-sm italic border-l-2 border-amber-500 pl-3">
              {quote}
            </p>
          ))}
        </div>
      </div>

      {/* Reflection Prompts */}
      <div className={`rounded-xl p-5 ${chapter.color === 'amber' ? 'bg-amber-50 border border-amber-200' : chapter.color === 'violet' ? 'bg-violet-50 border border-violet-200' : 'bg-teal-50 border border-teal-200'}`}>
        <h3 className={`font-semibold mb-3 ${chapter.color === 'amber' ? 'text-amber-800' : chapter.color === 'violet' ? 'text-violet-800' : 'text-teal-800'}`}>Reflection Questions</h3>
        <ul className="space-y-2">
          {chapter.reflectionPrompts.map((prompt, idx) => (
            <li key={idx} className={`text-sm flex items-start gap-2 ${chapter.color === 'amber' ? 'text-amber-900' : chapter.color === 'violet' ? 'text-violet-900' : 'text-teal-900'}`}>
              <span className="mt-1"><Icons.Circle /></span>
              {prompt}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {chapter.id > 1 && (
          <button onClick={() => setCurrentView(`chapter-${chapter.id - 1}`)} className="flex items-center gap-1 text-stone-600 hover:text-stone-800">
            <Icons.ChevronLeft /> Chapter {chapter.id - 1}
          </button>
        )}
        <div className="flex-1" />
        {chapter.id < 8 && (
          <button onClick={() => setCurrentView(`chapter-${chapter.id + 1}`)} className="flex items-center gap-1 text-stone-600 hover:text-stone-800">
            Chapter {chapter.id + 1} <Icons.ChevronRight />
          </button>
        )}
      </div>
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
    const { data } = await supabase.from('actions').insert({
      user_id: user.id,
      action: newAction,
      timeline: 'This week',
      source: 'manual',
      completed: false
    }).select().single();
    if (data) {
      setActions([data, ...actions]);
      setNewAction('');
      setShowAdd(false);
    }
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
        {!showAdd && (
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white rounded-full text-sm">
            <Icons.Plus /> Add
          </button>
        )}
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6">
          <input
            type="text"
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
            placeholder="What action will you take?"
            className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm mb-3"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-stone-600 text-sm">Cancel</button>
            <button onClick={handleAdd} className="px-4 py-2 bg-stone-900 text-white rounded-full text-sm">Add Action</button>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <p className="text-amber-800 text-sm">
          <strong>Tip:</strong> Your AI coaches can suggest actions during conversations. Those actions will automatically appear here.
        </p>
      </div>

      {/* Pending Actions */}
      {pendingActions.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-stone-800 mb-3">Pending ({pendingActions.length})</h3>
          <div className="space-y-2">
            {pendingActions.map(action => (
              <div key={action.id} className="bg-white rounded-xl border border-stone-200 p-4 flex items-start gap-3">
                <button onClick={() => toggleComplete(action.id, action.completed)} className="mt-0.5 text-stone-300 hover:text-teal-600">
                  <Icons.Square />
                </button>
                <div className="flex-1">
                  <p className="text-stone-800 text-sm">{action.action}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-stone-500">{action.timeline || 'No deadline'}</span>
                    {action.source === 'coach' && <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">From Coach</span>}
                  </div>
                </div>
                <button onClick={() => deleteAction(action.id)} className="text-stone-300 hover:text-red-500">
                  <Icons.Trash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Actions */}
      {completedActions.length > 0 && (
        <div>
          <h3 className="font-medium text-stone-800 mb-3">Completed ({completedActions.length})</h3>
          <div className="space-y-2">
            {completedActions.map(action => (
              <div key={action.id} className="bg-stone-50 rounded-xl border border-stone-200 p-4 flex items-start gap-3 opacity-60">
                <button onClick={() => toggleComplete(action.id, action.completed)} className="mt-0.5 text-teal-600">
                  <Icons.CheckSquare />
                </button>
                <div className="flex-1">
                  <p className="text-stone-600 text-sm line-through">{action.action}</p>
                </div>
                <button onClick={() => deleteAction(action.id)} className="text-stone-300 hover:text-red-500">
                  <Icons.Trash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {actions.length === 0 && !showAdd && (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
            <Icons.CheckSquare />
          </div>
          <p className="text-stone-600 font-medium mb-2">No actions yet</p>
          <p className="text-stone-500 text-sm mb-4">Talk to a coach to get personalized action suggestions</p>
          <button onClick={() => setShowAdd(true)} className="text-amber-700 font-medium text-sm">Add your first action</button>
        </div>
      )}
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
        <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-1 text-stone-500 hover:text-stone-700 mb-4 text-sm">
          <Icons.ChevronLeft /> All Categories
        </button>
        
        <div className="mb-6">
          <h2 className="font-serif text-2xl text-stone-800 mb-1">{category.name}</h2>
          <p className="text-stone-500 text-sm">{category.description}</p>
        </div>

        <div className="space-y-4">
          {category.books.map((book, idx) => (
            <div key={idx} className={`bg-white rounded-xl border p-5 ${book.primary ? 'border-amber-300 bg-amber-50' : 'border-stone-200'}`}>
              {book.primary && (
                <span className="inline-block px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full mb-2">Primary Source</span>
              )}
              {book.recommended && !book.primary && (
                <span className="inline-block px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-medium rounded-full mb-2">Recommended</span>
              )}
              <h4 className="font-semibold text-stone-800 mb-1">{book.title}</h4>
              <p className="text-stone-600 text-sm mb-2">{book.author} ({book.year}){book.edition && `, ${book.edition} Edition`}</p>
              {book.journal && <p className="text-stone-500 text-xs mb-2 italic">{book.journal}</p>}
              <p className="text-stone-600 text-sm mb-3">{book.description}</p>
              
              <div className="mb-3">
                <p className="text-xs font-medium text-stone-700 mb-1">Key Topics:</p>
                <div className="flex flex-wrap gap-1">
                  {book.keyTopics.map((topic, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-stone-100 text-stone-600 rounded-full">{topic}</span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${book.evidenceLevel.startsWith('High') ? 'bg-green-100 text-green-700' : book.evidenceLevel.startsWith('Medium') ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'}`}>
                  {book.evidenceLevel.split(' - ')[0]} Evidence
                </span>
              </div>
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
        <p className="text-stone-500 text-sm">Evidence-based leadership and management resources</p>
      </div>

      {/* Featured */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 mb-6 text-white">
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Featured</span>
        <h3 className="font-serif text-xl mt-2 mb-1">Developing Leaders and Leadership</h3>
        <p className="text-amber-100 text-sm mb-2">David V. Day (2024)</p>
        <p className="text-white/90 text-sm">The foundational text for this application. Day distinguishes leader development from leadership development and provides evidence-based frameworks for both.</p>
      </div>

      {/* Categories */}
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

      {/* Evidence Levels */}
      <div className="mt-6 bg-stone-50 rounded-xl p-4">
        <h4 className="font-medium text-stone-800 mb-2">Evidence Levels</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">High</span>
            <span className="text-stone-600">Based on peer-reviewed research or meta-analyses</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">Medium</span>
            <span className="text-stone-600">Research-informed with some empirical support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">Low</span>
            <span className="text-stone-600">Practice-based or anecdotal; limited research</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COACHES VIEW (Simplified for space)
// ============================================================================

function CoachesView({ setCurrentView }) {
  return (
    <div className="animate-fadeIn pb-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl lg:text-3xl text-stone-800 mb-1">Your Coaches</h2>
        <p className="text-stone-500 text-sm">Choose your coaching experience</p>
      </div>

      <div className="space-y-4">
        {/* ICF Coach */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="p-5 border-b border-stone-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shrink-0">
                <Icons.Heart />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-800">ICF Leadership Coach</h3>
                <p className="text-stone-600 text-sm">Powerful questions to help you find your own insights. Non-directive approach.</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <button onClick={() => setCurrentView('coach-icf-voice')} className="flex-1 py-3 flex items-center justify-center gap-2 text-amber-700 hover:bg-amber-50 border-r border-stone-100">
              <Icons.Mic /> <span className="font-medium text-sm">Voice</span>
            </button>
            <button onClick={() => setCurrentView('coach-icf-text')} className="flex-1 py-3 flex items-center justify-center gap-2 text-amber-700 hover:bg-amber-50">
              <Icons.Keyboard /> <span className="font-medium text-sm">Text</span>
            </button>
          </div>
        </div>

        {/* Day Mentor */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="p-5 border-b border-stone-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center text-white shrink-0">
                <Icons.GraduationCap />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-800">Day Mentor</h3>
                <p className="text-stone-600 text-sm">Research-based advice from David Day's leadership development framework.</p>
              </div>
            </div>
          </div>
          <div className="flex">
            <button onClick={() => setCurrentView('coach-mentor-voice')} className="flex-1 py-3 flex items-center justify-center gap-2 text-violet-700 hover:bg-violet-50 border-r border-stone-100">
              <Icons.Mic /> <span className="font-medium text-sm">Voice</span>
            </button>
            <button onClick={() => setCurrentView('coach-mentor-text')} className="flex-1 py-3 flex items-center justify-center gap-2 text-violet-700 hover:bg-violet-50">
              <Icons.Keyboard /> <span className="font-medium text-sm">Text</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TEXT COACH (Simplified version)
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
      ? "Hello! I'm here to support your exploration. What's on your mind today?"
      : "Welcome! I'm here to share research-based guidance. What would you like to work on?";
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
        
        // Extract actions if present
        if (data.actions && data.actions.length > 0) {
          for (const action of data.actions) {
            const { data: newAction } = await supabase.from('actions').insert({
              user_id: user.id,
              action: action.action,
              timeline: action.timeline || 'This week',
              source: 'coach',
              completed: false
            }).select().single();
            if (newAction) setActions([newAction, ...actions]);
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
              placeholder="Type your message..." className="flex-1 px-4 py-2.5 border border-stone-200 rounded-full text-sm" />
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
    
    switch (currentView) {
      case 'dashboard': return <Dashboard setCurrentView={setCurrentView} streak={streak} user={user} actions={actions} journalEntries={journalEntries} />;
      case 'chapters': return <ChaptersView setCurrentView={setCurrentView} />;
      case 'actions': return <ActionsView user={user} actions={actions} setActions={setActions} />;
      case 'coaches': return <CoachesView setCurrentView={setCurrentView} />;
      case 'coach-icf-text': return <TextCoach coachType="icf" setCurrentView={setCurrentView} user={user} setActions={setActions} actions={actions} />;
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
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} user={user} onSignOut={handleSignOut} />
      <Header streak={streak} />
      <main className="px-5 py-6 max-w-lg mx-auto pb-24 lg:ml-64 lg:max-w-4xl lg:pb-8">{renderView()}</main>
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}



