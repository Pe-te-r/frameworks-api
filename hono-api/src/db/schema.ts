import { relations } from 'drizzle-orm';
import { sqliteTable } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: t.integer("id").primaryKey({ autoIncrement: true }),
  firstName: t.text("first_name"),
  lastName: t.text("last_name"),
  email: t.text().notNull(),
  role: t.text().$type<"user" | "admin">().default("user")
}, (table) => [
  t.uniqueIndex("email_idx").on(table.email)
]);

export const auth = sqliteTable("auth", {
  id: t.integer("id").primaryKey().references(() => users.id,{onDelete:'cascade'}),
  password: t.text("password").notNull()
});

export const notes = sqliteTable("notes", {
  id: t.integer("id").primaryKey({ autoIncrement: true }),
  userId: t.integer("user_id").references(() => users.id,{onDelete:'cascade'}),
  note: t.text("note")
});

export const usersRelations = relations(users, ({ one, many }) => ({
  auth: one(auth, {
    fields: [users.id],
    references: [auth.id],
  }),
  notes: many(notes),
}));

export const authRelations = relations(auth, ({ one }) => ({
  user: one(users, {
    fields: [auth.id],
    references: [users.id],
  }),
}));

export const notesRelations = relations(notes, ({ one }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
}));