import { Question } from "../types/assessment";

export const questions: Question[] = [
  // A1 Grammar (3)
  {
    id: "q1",
    stem: "She ___ a student.",
    choices: ["am", "is", "are", "be"],
    correctIndex: 1,
    cefrLevel: "A1",
    explanation: "Third person singular uses 'is'.",
    category: "Grammar",
  },
  {
    id: "q2",
    stem: "I ___ from Spain.",
    choices: ["is", "am", "be", "are"],
    correctIndex: 1,
    cefrLevel: "A1",
    explanation: "First person singular uses 'am'.",
    category: "Grammar",
  },
  {
    id: "q3",
    stem: "They ___ watching TV.",
    choices: ["is", "am", "were", "are"],
    correctIndex: 3,
    cefrLevel: "A1",
    explanation: "Plural subjects use 'are' in the present continuous.",
    category: "Grammar",
  },

  // A2 Grammar (3)
  {
    id: "q4",
    stem: "He ___ to the park yesterday.",
    choices: ["go", "goes", "went", "gone"],
    correctIndex: 2,
    cefrLevel: "A2",
    explanation: "Past simple of 'go' is 'went'.",
    category: "Grammar",
  },
  {
    id: "q5",
    stem: "This book is ___ than that one.",
    choices: [
      "most interesting",
      "interesting",
      "more interesting",
      "interestinger",
    ],
    correctIndex: 2,
    cefrLevel: "A2",
    explanation: "Comparative form for longer adjectives uses 'more'.",
    category: "Grammar",
  },
  {
    id: "q6",
    stem: "I ___ my homework.",
    choices: ["has finished", "finished", "have finished", "finish"],
    correctIndex: 2,
    cefrLevel: "A2",
    explanation: "Present perfect with 'I' uses 'have'.",
    category: "Grammar",
  },

  // B1 Grammar (3)
  {
    id: "q7",
    stem: "You ___ smoke here; it's prohibited.",
    choices: ["don't have to", "mustn't", "should", "might not"],
    correctIndex: 1,
    cefrLevel: "B1",
    explanation: "'Mustn't' expresses prohibition.",
    category: "Grammar",
  },
  {
    id: "q8",
    stem: "If it rains, we ___ the picnic.",
    choices: ["cancel", "would cancel", "will cancel", "cancelled"],
    correctIndex: 2,
    cefrLevel: "B1",
    explanation: "First conditional uses 'will' in the main clause.",
    category: "Grammar",
  },
  {
    id: "q9",
    stem: "While I ___ dinner, the phone rang.",
    choices: ["cook", "cooked", "was cooking", "had cooked"],
    correctIndex: 2,
    cefrLevel: "B1",
    explanation: "Past continuous for interrupted actions.",
    category: "Grammar",
  },

  // B2 Grammar (3)
  {
    id: "q10",
    stem: "By the time we arrived, the movie ___.",
    choices: ["started", "has started", "had started", "starts"],
    correctIndex: 2,
    cefrLevel: "B2",
    explanation:
      "Past perfect for actions completed before another past action.",
    category: "Grammar",
  },
  {
    id: "q11",
    stem: "The report ___ by the team last week.",
    choices: ["wrote", "is written", "was written", "written"],
    correctIndex: 2,
    cefrLevel: "B2",
    explanation: "Passive voice for past actions.",
    category: "Grammar",
  },
  {
    id: "q12",
    stem: "If she had studied, she ___ the exam.",
    choices: ["would pass", "passed", "would have passed", "will pass"],
    correctIndex: 2,
    cefrLevel: "B2",
    explanation: "Third conditional uses 'would have + past participle'.",
    category: "Grammar",
  },

  // C1 Grammar (3)
  {
    id: "q13",
    stem: "___ had I left than the phone rang.",
    choices: ["No sooner", "Hardly", "Scarcely", "Never"],
    correctIndex: 0,
    cefrLevel: "C1",
    explanation: "'No sooner...than' is a fixed inversion structure.",
    category: "Grammar",
  },
  {
    id: "q14",
    stem: "___ the door, she screamed.",
    choices: ["Opened", "Having opened", "Opening", "To open"],
    correctIndex: 2,
    cefrLevel: "C1",
    explanation: "Present participle clauses show simultaneous actions.",
    category: "Grammar",
  },
  {
    id: "q15",
    stem: "It's essential that he ___ on time.",
    choices: ["is", "will be", "be", "must be"],
    correctIndex: 2,
    cefrLevel: "C1",
    explanation: "Subjunctive mood uses base form after 'essential'.",
    category: "Grammar",
  },

  // C2 Grammar (3)
  {
    id: "q16",
    stem: "Not only ___ late, but he also forgot the report.",
    choices: ["he was", "was he", "he", "did he"],
    correctIndex: 1,
    cefrLevel: "C2",
    explanation: "Inversion is required after 'not only' in formal contexts.",
    category: "Grammar",
  },
  {
    id: "q17",
    stem: "If I had taken the job, I ___ in a different city now.",
    choices: ["would live", "would have lived", "would be living", "lived"],
    correctIndex: 2,
    cefrLevel: "C2",
    explanation:
      "Mixed conditional combining past condition with present result.",
    category: "Grammar",
  },
  {
    id: "q18",
    stem: "___ the lack of funding that caused the project to fail.",
    choices: ["There was", "It was", "What was", "That was"],
    correctIndex: 1,
    cefrLevel: "C2",
    explanation: "Cleft sentence structure emphasizes the cause.",
    category: "Grammar",
  },

  // B1 Vocabulary (2)
  {
    id: "q19",
    stem: "Which word means 'to look like'?",
    choices: ["reject", "resemble", "respond", "rely"],
    correctIndex: 1,
    cefrLevel: "B1",
    explanation: "'Resemble' means to have a similar appearance.",
    category: "Vocabulary",
  },
  {
    id: "q20",
    stem: "Synonym for 'very old'.",
    choices: ["modern", "current", "ancient", "recent"],
    correctIndex: 2,
    cefrLevel: "B1",
    explanation: "'Ancient' describes something extremely old.",
    category: "Vocabulary",
  },

  // B2 Vocabulary (2)
  {
    id: "q21",
    stem: "Which word means 'hard-working'?",
    choices: ["reluctant", "diligent", "intelligent", "curious"],
    correctIndex: 1,
    cefrLevel: "B2",
    explanation:
      "'Diligent' describes someone who works carefully and persistently.",
    category: "Vocabulary",
  },
  {
    id: "q22",
    stem: "Meaning unclear or having multiple meanings.",
    choices: ["obvious", "ambiguous", "certain", "transparent"],
    correctIndex: 1,
    cefrLevel: "B2",
    explanation: "'Ambiguous' refers to something open to interpretation.",
    category: "Vocabulary",
  },

  // C1 Vocabulary (2)
  {
    id: "q23",
    stem: "Temporary or short-lived.",
    choices: ["eternal", "permanent", "ephemeral", "durable"],
    correctIndex: 2,
    cefrLevel: "C1",
    explanation: "'Ephemeral' describes something lasting a short time.",
    category: "Vocabulary",
  },
  {
    id: "q24",
    stem: "Very careful and detailed.",
    choices: ["careless", "hasty", "meticulous", "rash"],
    correctIndex: 2,
    cefrLevel: "C1",
    explanation: "'Meticulous' means showing great attention to detail.",
    category: "Vocabulary",
  },

  // C2 Vocabulary (2)
  {
    id: "q25",
    stem: "Showy in a vulgar way.",
    choices: ["modest", "ostentatious", "simple", "plain"],
    correctIndex: 1,
    cefrLevel: "C2",
    explanation:
      "'Ostentatious' describes excessive display to impress others.",
    category: "Vocabulary",
  },
  {
    id: "q26",
    stem: "Done without care.",
    choices: ["thorough", "meticulous", "perfunctory", "detailed"],
    correctIndex: 2,
    cefrLevel: "C2",
    explanation: "'Perfunctory' means done with minimal effort.",
    category: "Vocabulary",
  },

  // Idioms (2)
  {
    id: "q27",
    stem: "What does 'hit the hay' mean?",
    choices: ["eat quickly", "go to bed", "start a fight", "run fast"],
    correctIndex: 1,
    cefrLevel: "C1",
    explanation: "The idiom means to go to sleep.",
    category: "Idioms",
  },
  {
    id: "q28",
    stem: "What does 'piece of cake' mean?",
    choices: ["difficult", "easy task", "delicious", "complicated"],
    correctIndex: 1,
    cefrLevel: "B2",
    explanation: "The idiom refers to something easily accomplished.",
    category: "Idioms",
  },

  // Functional (2)
  {
    id: "q29",
    stem: "How to politely decline an invitation?",
    choices: [
      "No way!",
      "I'm sorry, I can't make it.",
      "Maybe next time.",
      "I hate parties!",
    ],
    correctIndex: 1,
    cefrLevel: "B1",
    explanation: "A polite refusal with an apology is socially appropriate.",
    category: "Functional",
  },
  {
    id: "q30",
    stem: "Which phrase asks for clarification?",
    choices: [
      "That's wrong!",
      "I don't care.",
      "Could you repeat that?",
      "Never mind.",
    ],
    correctIndex: 2,
    cefrLevel: "A2",
    explanation:
      "'Could you repeat that?' is a standard clarification request.",
    category: "Functional",
  },
];
