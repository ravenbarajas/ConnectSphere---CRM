import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertClientSchema, insertInteractionSchema, insertFollowUpSchema, insertNoteSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all clients
  app.get("/api/clients", async (req, res) => {
    try {
      const clients = await storage.getAllClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  // Get client by ID
  app.get("/api/clients/:id", async (req, res) => {
    try {
      const client = await storage.getClient(parseInt(req.params.id));
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch client" });
    }
  });

  // Create new client
  app.post("/api/clients", async (req, res) => {
    try {
      const validatedData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(validatedData);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ message: "Invalid client data" });
    }
  });

  // Update client
  app.patch("/api/clients/:id", async (req, res) => {
    try {
      const validatedData = insertClientSchema.partial().parse(req.body);
      const client = await storage.updateClient(parseInt(req.params.id), validatedData);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      res.status(400).json({ message: "Invalid client data" });
    }
  });

  // Get all interactions
  app.get("/api/interactions", async (req, res) => {
    try {
      const interactions = await storage.getAllInteractions();
      res.json(interactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch interactions" });
    }
  });

  // Get interactions by client ID
  app.get("/api/interactions/client/:clientId", async (req, res) => {
    try {
      const interactions = await storage.getInteractionsByClient(parseInt(req.params.clientId));
      res.json(interactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch interactions" });
    }
  });

  // Create new interaction
  app.post("/api/interactions", async (req, res) => {
    try {
      const validatedData = insertInteractionSchema.parse(req.body);
      const interaction = await storage.createInteraction(validatedData);
      res.status(201).json(interaction);
    } catch (error) {
      res.status(400).json({ message: "Invalid interaction data" });
    }
  });

  // Get all follow-ups
  app.get("/api/followups", async (req, res) => {
    try {
      const followUps = await storage.getAllFollowUps();
      res.json(followUps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch follow-ups" });
    }
  });

  // Get follow-ups by client ID
  app.get("/api/followups/client/:clientId", async (req, res) => {
    try {
      const followUps = await storage.getFollowUpsByClient(parseInt(req.params.clientId));
      res.json(followUps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch follow-ups" });
    }
  });

  // Create new follow-up
  app.post("/api/followups", async (req, res) => {
    try {
      const validatedData = insertFollowUpSchema.parse(req.body);
      const followUp = await storage.createFollowUp(validatedData);
      res.status(201).json(followUp);
    } catch (error) {
      res.status(400).json({ message: "Invalid follow-up data" });
    }
  });

  // Update follow-up
  app.patch("/api/followups/:id", async (req, res) => {
    try {
      const validatedData = insertFollowUpSchema.partial().parse(req.body);
      const followUp = await storage.updateFollowUp(parseInt(req.params.id), validatedData);
      if (!followUp) {
        return res.status(404).json({ message: "Follow-up not found" });
      }
      res.json(followUp);
    } catch (error) {
      res.status(400).json({ message: "Invalid follow-up data" });
    }
  });

  // Get notes by client ID
  app.get("/api/notes/client/:clientId", async (req, res) => {
    try {
      const notes = await storage.getNotesByClient(parseInt(req.params.clientId));
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notes" });
    }
  });

  // Create new note
  app.post("/api/notes", async (req, res) => {
    try {
      const validatedData = insertNoteSchema.parse(req.body);
      const note = await storage.createNote(validatedData);
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ message: "Invalid note data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
