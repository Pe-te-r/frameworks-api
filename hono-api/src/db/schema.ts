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
  id: t.integer("id").primaryKey().references(() => users.id),
  password: t.text("password").notNull()
});

export const notes = sqliteTable("notes", {
  id: t.integer("id").primaryKey({ autoIncrement: true }),
  userId: t.integer("user_id").references(() => users.id),
  note: t.text("note")
});