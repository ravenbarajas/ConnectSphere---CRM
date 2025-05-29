import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  leadScore: integer("lead_score").default(0),
  tags: text("tags").array().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const interactions = pgTable("interactions", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  type: text("type").notNull(), // email, phone, meeting, sms
  title: text("title").notNull(),
  description: text("description"),
  duration: text("duration"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const followUps = pgTable("follow_ups", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  type: text("type").notNull(), // email, sms
  message: text("message").notNull(),
  scheduledDate: timestamp("scheduled_date").notNull(),
  completed: boolean("completed").default(false),
  reminder: boolean("reminder").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
});

export const insertInteractionSchema = createInsertSchema(interactions).omit({
  id: true,
  createdAt: true,
});

export const insertFollowUpSchema = createInsertSchema(followUps).omit({
  id: true,
  createdAt: true,
});

export const insertNoteSchema = createInsertSchema(notes).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;
export type InsertInteraction = z.infer<typeof insertInteractionSchema>;
export type Interaction = typeof interactions.$inferSelect;
export type InsertFollowUp = z.infer<typeof insertFollowUpSchema>;
export type FollowUp = typeof followUps.$inferSelect;
export type InsertNote = z.infer<typeof insertNoteSchema>;
export type Note = typeof notes.$inferSelect;
