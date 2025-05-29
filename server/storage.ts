import { 
  users, clients, interactions, followUps, notes,
  type User, type InsertUser, type Client, type InsertClient,
  type Interaction, type InsertInteraction, type FollowUp, type InsertFollowUp,
  type Note, type InsertNote
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Client methods
  getAllClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined>;
  
  // Interaction methods
  getInteractionsByClient(clientId: number): Promise<Interaction[]>;
  getAllInteractions(): Promise<Interaction[]>;
  createInteraction(interaction: InsertInteraction): Promise<Interaction>;
  
  // Follow-up methods
  getAllFollowUps(): Promise<FollowUp[]>;
  getFollowUpsByClient(clientId: number): Promise<FollowUp[]>;
  createFollowUp(followUp: InsertFollowUp): Promise<FollowUp>;
  updateFollowUp(id: number, followUp: Partial<InsertFollowUp>): Promise<FollowUp | undefined>;
  
  // Note methods
  getNotesByClient(clientId: number): Promise<Note[]>;
  createNote(note: InsertNote): Promise<Note>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private clients: Map<number, Client>;
  private interactions: Map<number, Interaction>;
  private followUps: Map<number, FollowUp>;
  private notes: Map<number, Note>;
  private currentUserId: number;
  private currentClientId: number;
  private currentInteractionId: number;
  private currentFollowUpId: number;
  private currentNoteId: number;

  constructor() {
    this.users = new Map();
    this.clients = new Map();
    this.interactions = new Map();
    this.followUps = new Map();
    this.notes = new Map();
    this.currentUserId = 1;
    this.currentClientId = 1;
    this.currentInteractionId = 1;
    this.currentFollowUpId = 1;
    this.currentNoteId = 1;
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize mock clients
    const mockClients = [
      { name: "Sarah Johnson", email: "sarah@luxebeauty.com", company: "Luxe Beauty Salon", leadScore: 94, tags: ["VIP", "Active"] },
      { name: "Michael Chen", email: "michael@chenlaw.com", company: "Chen & Associates Law", leadScore: 76, tags: ["Contract Renewal", "Follow-up"] },
      { name: "Emma Rodriguez", email: "emma@strategicconsult.com", company: "Strategic Consulting Group", leadScore: 58, tags: ["Needs Attention", "Inactive"] },
    ];

    mockClients.forEach(client => {
      const id = this.currentClientId++;
      this.clients.set(id, {
        id,
        ...client,
        createdAt: new Date(),
      });
    });

    // Initialize mock interactions
    const mockInteractions = [
      { clientId: 1, type: "email", title: "Email sent to Sarah Johnson", description: "Follow-up regarding hair appointment scheduling for next month's color treatment.", duration: null },
      { clientId: 2, type: "phone", title: "Phone call with Michael Chen", description: "Discussed upcoming contract renewal and additional legal services needed for Q2.", duration: "25 mins" },
      { clientId: 3, type: "meeting", title: "Meeting with Emma Rodriguez", description: "Strategic consultation session to review Q1 performance and plan marketing initiatives.", duration: "1 hour" },
    ];

    mockInteractions.forEach(interaction => {
      const id = this.currentInteractionId++;
      this.interactions.set(id, {
        id,
        ...interaction,
        createdAt: new Date(),
      });
    });

    // Initialize mock follow-ups
    const mockFollowUps = [
      { clientId: 1, type: "email", message: "Follow-up on hair appointment booking", scheduledDate: new Date(Date.now() - 86400000), completed: false, reminder: true },
      { clientId: 2, type: "sms", message: "Contract renewal reminder", scheduledDate: new Date(), completed: false, reminder: true },
      { clientId: 3, type: "email", message: "Quarterly strategy review meeting reminder", scheduledDate: new Date(Date.now() + 604800000), completed: false, reminder: true },
    ];

    mockFollowUps.forEach(followUp => {
      const id = this.currentFollowUpId++;
      this.followUps.set(id, {
        id,
        ...followUp,
        createdAt: new Date(),
      });
    });

    // Initialize mock notes
    const mockNotes = [
      { clientId: 1, content: "Prefers morning appointments. Interested in expanding to a second location. Mentioned budget concerns for new equipment." },
      { clientId: 1, content: "Excellent response rate to follow-up emails. Provided referrals to two other salon owners in the area." },
      { clientId: 2, content: "Contract expires end of Q2. Interested in expanding services to include IP law consultations. Mentioned potential for long-term partnership." },
      { clientId: 2, content: "Prompt payment history. Always responds to communications within 24 hours. Appreciates detailed documentation." },
      { clientId: 3, content: "Has not responded to last three follow-up attempts. Consider alternative communication methods or re-qualification." },
      { clientId: 3, content: "Previously very engaged and responsive. Last meaningful interaction was two months ago regarding marketing strategy." },
    ];

    mockNotes.forEach(note => {
      const id = this.currentNoteId++;
      this.notes.set(id, {
        id,
        ...note,
        createdAt: new Date(),
      });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Client methods
  async getAllClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = this.currentClientId++;
    const client: Client = { ...insertClient, id, createdAt: new Date() };
    this.clients.set(id, client);
    return client;
  }

  async updateClient(id: number, clientUpdate: Partial<InsertClient>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;
    
    const updatedClient = { ...client, ...clientUpdate };
    this.clients.set(id, updatedClient);
    return updatedClient;
  }

  // Interaction methods
  async getInteractionsByClient(clientId: number): Promise<Interaction[]> {
    return Array.from(this.interactions.values()).filter(
      (interaction) => interaction.clientId === clientId
    );
  }

  async getAllInteractions(): Promise<Interaction[]> {
    return Array.from(this.interactions.values());
  }

  async createInteraction(insertInteraction: InsertInteraction): Promise<Interaction> {
    const id = this.currentInteractionId++;
    const interaction: Interaction = { ...insertInteraction, id, createdAt: new Date() };
    this.interactions.set(id, interaction);
    return interaction;
  }

  // Follow-up methods
  async getAllFollowUps(): Promise<FollowUp[]> {
    return Array.from(this.followUps.values());
  }

  async getFollowUpsByClient(clientId: number): Promise<FollowUp[]> {
    return Array.from(this.followUps.values()).filter(
      (followUp) => followUp.clientId === clientId
    );
  }

  async createFollowUp(insertFollowUp: InsertFollowUp): Promise<FollowUp> {
    const id = this.currentFollowUpId++;
    const followUp: FollowUp = { ...insertFollowUp, id, createdAt: new Date() };
    this.followUps.set(id, followUp);
    return followUp;
  }

  async updateFollowUp(id: number, followUpUpdate: Partial<InsertFollowUp>): Promise<FollowUp | undefined> {
    const followUp = this.followUps.get(id);
    if (!followUp) return undefined;
    
    const updatedFollowUp = { ...followUp, ...followUpUpdate };
    this.followUps.set(id, updatedFollowUp);
    return updatedFollowUp;
  }

  // Note methods
  async getNotesByClient(clientId: number): Promise<Note[]> {
    return Array.from(this.notes.values()).filter(
      (note) => note.clientId === clientId
    );
  }

  async createNote(insertNote: InsertNote): Promise<Note> {
    const id = this.currentNoteId++;
    const note: Note = { ...insertNote, id, createdAt: new Date() };
    this.notes.set(id, note);
    return note;
  }
}

export const storage = new MemStorage();
