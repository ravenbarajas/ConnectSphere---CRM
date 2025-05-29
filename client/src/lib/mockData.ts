import type { Client, Interaction, FollowUp, Note } from '@shared/schema';

export const mockClients: Client[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@luxebeauty.com",
    company: "Luxe Beauty Salon",
    leadScore: 94,
    tags: ["VIP", "Active"],
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@chenlaw.com",
    company: "Chen & Associates Law",
    leadScore: 76,
    tags: ["Contract Renewal", "Follow-up"],
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    email: "emma@strategicconsult.com",
    company: "Strategic Consulting Group",
    leadScore: 58,
    tags: ["Needs Attention", "Inactive"],
    createdAt: new Date(),
  },
];

export const mockInteractions: Interaction[] = [
  {
    id: 1,
    clientId: 1,
    type: "email",
    title: "Email sent to Sarah Johnson",
    description: "Follow-up regarding hair appointment scheduling for next month's color treatment.",
    duration: null,
    createdAt: new Date(),
  },
  {
    id: 2,
    clientId: 2,
    type: "phone",
    title: "Phone call with Michael Chen",
    description: "Discussed upcoming contract renewal and additional legal services needed for Q2.",
    duration: "25 mins",
    createdAt: new Date(Date.now() - 86400000), // Yesterday
  },
  {
    id: 3,
    clientId: 3,
    type: "meeting",
    title: "Meeting with Emma Rodriguez",
    description: "Strategic consultation session to review Q1 performance and plan marketing initiatives.",
    duration: "1 hour",
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
  },
];

export const mockFollowUps: FollowUp[] = [
  {
    id: 1,
    clientId: 1,
    type: "email",
    message: "Follow-up on hair appointment booking",
    scheduledDate: new Date(Date.now() - 86400000), // Overdue
    completed: false,
    reminder: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    clientId: 2,
    type: "sms",
    message: "Contract renewal reminder",
    scheduledDate: new Date(), // Today
    completed: false,
    reminder: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    clientId: 3,
    type: "email",
    message: "Quarterly strategy review meeting reminder",
    scheduledDate: new Date(Date.now() + 604800000), // Next week
    completed: false,
    reminder: true,
    createdAt: new Date(),
  },
];

export const mockNotes: Note[] = [
  {
    id: 1,
    clientId: 1,
    content: "Prefers morning appointments. Interested in expanding to a second location. Mentioned budget concerns for new equipment.",
    createdAt: new Date(Date.now() - 172800000),
  },
  {
    id: 2,
    clientId: 1,
    content: "Excellent response rate to follow-up emails. Provided referrals to two other salon owners in the area.",
    createdAt: new Date(Date.now() - 604800000),
  },
  {
    id: 3,
    clientId: 2,
    content: "Contract expires end of Q2. Interested in expanding services to include IP law consultations. Mentioned potential for long-term partnership.",
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    id: 4,
    clientId: 2,
    content: "Prompt payment history. Always responds to communications within 24 hours. Appreciates detailed documentation.",
    createdAt: new Date(Date.now() - 604800000),
  },
  {
    id: 5,
    clientId: 3,
    content: "Has not responded to last three follow-up attempts. Consider alternative communication methods or re-qualification.",
    createdAt: new Date(Date.now() - 259200000),
  },
  {
    id: 6,
    clientId: 3,
    content: "Previously very engaged and responsive. Last meaningful interaction was two months ago regarding marketing strategy.",
    createdAt: new Date(Date.now() - 1209600000),
  },
];
