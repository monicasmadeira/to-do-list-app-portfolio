import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const insertTaskSchema = createInsertSchema(tasks)
  .pick({
    title: true,
    description: true,
  })
  .extend({
    title: z.string().min(1, "Título é obrigatório").max(100, "Título muito longo"),
    description: z.string().min(1, "Descrição é obrigatória").max(500, "Descrição muito longa"),
  });

export const updateTaskSchema = createInsertSchema(tasks)
  .pick({
    completed: true,
  })
  .extend({
    completed: z.boolean(),
  });

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;