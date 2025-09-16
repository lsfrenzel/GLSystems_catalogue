import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone").default(""),
  systemOfInterest: text("system_of_interest").default(""),
  message: text("message").default(""),
  acceptsMarketing: text("accepts_marketing").default("false"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Inventory Management Tables
export const suppliers = pgTable("suppliers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  rating: numeric("rating", { precision: 2, scale: 1 }).default("0"),
  deliveryDays: integer("delivery_days").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  categoryId: varchar("category_id").references(() => categories.id),
  supplierId: varchar("supplier_id").references(() => suppliers.id),
  price: numeric("price", { precision: 10, scale: 2 }).default("0"),
  currentStock: integer("current_stock").default(0),
  minimumStock: integer("minimum_stock").default(0),
  unit: text("unit").default("un"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const stockMovements = pgTable("stock_movements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull().references(() => products.id),
  type: text("type").notNull(), // 'entrada' or 'saida'
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).default("0"),
  totalValue: numeric("total_value", { precision: 10, scale: 2 }).default("0"),
  reason: text("reason"), // Reason for the movement
  responsible: text("responsible"), // Who made the movement
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z.string().email("E-mail inválido"),
  company: z.string().min(2, "Nome da empresa deve ter pelo menos 2 caracteres").max(100, "Nome da empresa deve ter no máximo 100 caracteres"),
  phone: z.string().max(20, "Telefone deve ter no máximo 20 caracteres").optional(),
  systemOfInterest: z.string().optional(),
  message: z.string().max(1000, "Mensagem deve ter no máximo 1000 caracteres").optional(),
  acceptsMarketing: z.enum(["true", "false"]).default("false"),
});

// Inventory schemas
export const insertSupplierSchema = createInsertSchema(suppliers).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z.string().email("E-mail inválido").optional(),
  phone: z.string().max(20, "Telefone deve ter no máximo 20 caracteres").optional(),
  address: z.string().max(500, "Endereço deve ter no máximo 500 caracteres").optional(),
  rating: z.string().optional(),
  deliveryDays: z.number().int().min(0, "Dias de entrega deve ser maior ou igual a 0").optional(),
  isActive: z.boolean().default(true),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z.string().max(500, "Descrição deve ter no máximo 500 caracteres").optional(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  code: z.string().min(2, "Código deve ter pelo menos 2 caracteres").max(50, "Código deve ter no máximo 50 caracteres"),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(200, "Nome deve ter no máximo 200 caracteres"),
  description: z.string().max(1000, "Descrição deve ter no máximo 1000 caracteres").optional(),
  categoryId: z.string().optional(),
  supplierId: z.string().optional(),
  price: z.string().optional(),
  currentStock: z.number().int().min(0, "Estoque atual deve ser maior ou igual a 0").optional(),
  minimumStock: z.number().int().min(0, "Estoque mínimo deve ser maior ou igual a 0").optional(),
  unit: z.string().max(10, "Unidade deve ter no máximo 10 caracteres").optional(),
  isActive: z.boolean().default(true),
});

export const insertStockMovementSchema = createInsertSchema(stockMovements).omit({
  id: true,
  createdAt: true,
}).extend({
  productId: z.string().min(1, "ID do produto é obrigatório"),
  type: z.enum(["entrada", "saida"], { errorMap: () => ({ message: "Tipo deve ser 'entrada' ou 'saida'" }) }),
  quantity: z.number().int().min(1, "Quantidade deve ser maior que 0"),
  unitPrice: z.string().optional(),
  totalValue: z.string().optional(),
  reason: z.string().max(200, "Motivo deve ter no máximo 200 caracteres").optional(),
  responsible: z.string().max(100, "Responsável deve ter no máximo 100 caracteres").optional(),
  notes: z.string().max(500, "Observações devem ter no máximo 500 caracteres").optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Inventory types
export type InsertSupplier = z.infer<typeof insertSupplierSchema>;
export type Supplier = typeof suppliers.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertStockMovement = z.infer<typeof insertStockMovementSchema>;
export type StockMovement = typeof stockMovements.$inferSelect;
