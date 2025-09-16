import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { emailService } from "./email";
import { 
  insertContactSchema,
  insertSupplierSchema,
  insertCategorySchema,
  insertProductSchema,
  insertStockMovementSchema
} from "@shared/schema";
import { z } from "zod";

// Simple rate limiting store
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(ip, { count: 1, lastReset: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Rate limiting check
      const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
      if (!checkRateLimit(clientIP)) {
        return res.status(429).json({
          success: false,
          message: "Muitas solicitações. Tente novamente em alguns minutos."
        });
      }

      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);
      
      // Send emails and handle results properly
      const emailResults = await Promise.allSettled([
        emailService.sendContactNotification(contact),
        emailService.sendContactConfirmation(contact)
      ]);
      
      // Log email sending results
      const [notificationResult, confirmationResult] = emailResults;
      
      if (notificationResult.status === 'rejected') {
        console.error('Failed to send notification email:', notificationResult.reason);
      } else if (!notificationResult.value) {
        console.warn('Notification email was not sent (likely due to configuration)');
      }
      
      if (confirmationResult.status === 'rejected') {
        console.error('Failed to send confirmation email:', confirmationResult.reason);
      } else if (!confirmationResult.value) {
        console.warn('Confirmation email was not sent (likely due to configuration)');
      }
      
      // Return success to user (contact is saved regardless of email status)
      res.status(202).json({ 
        success: true, 
        message: "Solicitação enviada com sucesso! Entraremos em contato em breve.",
        id: contact.id 
      });
    } catch (error) {
      console.error('Contact submission error:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false,
          message: "Dados inválidos",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false,
          message: "Erro interno do servidor" 
        });
      }
    }
  });

  // Get contact submissions (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContactSubmissions();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: "Erro ao buscar contatos" 
      });
    }
  });

  // Inventory Management Routes
  
  // Suppliers
  app.get("/api/suppliers", async (req, res) => {
    try {
      const suppliers = await storage.getSuppliers();
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar fornecedores" });
    }
  });

  app.get("/api/suppliers/:id", async (req, res) => {
    try {
      const supplier = await storage.getSupplier(req.params.id);
      if (!supplier) {
        return res.status(404).json({ success: false, message: "Fornecedor não encontrado" });
      }
      res.json(supplier);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar fornecedor" });
    }
  });

  app.post("/api/suppliers", async (req, res) => {
    try {
      const validatedData = insertSupplierSchema.parse(req.body);
      const supplier = await storage.createSupplier(validatedData);
      res.status(201).json(supplier);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Erro ao criar fornecedor" });
      }
    }
  });

  app.put("/api/suppliers/:id", async (req, res) => {
    try {
      const validatedData = insertSupplierSchema.partial().parse(req.body);
      const supplier = await storage.updateSupplier(req.params.id, validatedData);
      if (!supplier) {
        return res.status(404).json({ success: false, message: "Fornecedor não encontrado" });
      }
      res.json(supplier);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Erro ao atualizar fornecedor" });
      }
    }
  });

  app.delete("/api/suppliers/:id", async (req, res) => {
    try {
      const success = await storage.deleteSupplier(req.params.id);
      if (!success) {
        return res.status(404).json({ success: false, message: "Fornecedor não encontrado" });
      }
      res.json({ success: true, message: "Fornecedor excluído com sucesso" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao excluir fornecedor" });
    }
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar categorias" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ success: false, message: "Categoria não encontrada" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar categoria" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Erro ao criar categoria" });
      }
    }
  });

  app.put("/api/categories/:id", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.partial().parse(req.body);
      const category = await storage.updateCategory(req.params.id, validatedData);
      if (!category) {
        return res.status(404).json({ success: false, message: "Categoria não encontrada" });
      }
      res.json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Erro ao atualizar categoria" });
      }
    }
  });

  app.delete("/api/categories/:id", async (req, res) => {
    try {
      const success = await storage.deleteCategory(req.params.id);
      if (!success) {
        return res.status(404).json({ success: false, message: "Categoria não encontrada" });
      }
      res.json({ success: true, message: "Categoria excluída com sucesso" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao excluir categoria" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar produtos" });
    }
  });

  app.get("/api/products/low-stock", async (req, res) => {
    try {
      const products = await storage.getLowStockProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar produtos com estoque baixo" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Produto não encontrado" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar produto" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Erro ao criar produto" });
      }
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const validatedData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, validatedData);
      if (!product) {
        return res.status(404).json({ success: false, message: "Produto não encontrado" });
      }
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Erro ao atualizar produto" });
      }
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ success: false, message: "Produto não encontrado" });
      }
      res.json({ success: true, message: "Produto excluído com sucesso" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao excluir produto" });
    }
  });

  // Stock Movements
  app.get("/api/movements", async (req, res) => {
    try {
      const movements = await storage.getStockMovements();
      res.json(movements);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar movimentações" });
    }
  });

  app.get("/api/movements/:id", async (req, res) => {
    try {
      const movement = await storage.getStockMovement(req.params.id);
      if (!movement) {
        return res.status(404).json({ success: false, message: "Movimentação não encontrada" });
      }
      res.json(movement);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar movimentação" });
    }
  });

  app.get("/api/products/:id/movements", async (req, res) => {
    try {
      const movements = await storage.getProductMovements(req.params.id);
      res.json(movements);
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar movimentações do produto" });
    }
  });

  app.post("/api/movements", async (req, res) => {
    try {
      const validatedData = insertStockMovementSchema.parse(req.body);
      const movement = await storage.createStockMovement(validatedData);
      res.status(201).json(movement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: (error instanceof Error ? error.message : "Erro ao criar movimentação") });
      }
    }
  });

  app.put("/api/movements/:id", async (req, res) => {
    try {
      const validatedData = insertStockMovementSchema.partial().parse(req.body);
      const movement = await storage.updateStockMovement(req.params.id, validatedData);
      if (!movement) {
        return res.status(404).json({ success: false, message: "Movimentação não encontrada" });
      }
      res.json(movement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Dados inválidos", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: (error instanceof Error ? error.message : "Erro ao atualizar movimentação") });
      }
    }
  });

  app.delete("/api/movements/:id", async (req, res) => {
    try {
      const success = await storage.deleteStockMovement(req.params.id);
      if (!success) {
        return res.status(404).json({ success: false, message: "Movimentação não encontrada" });
      }
      res.json({ success: true, message: "Movimentação excluída com sucesso" });
    } catch (error) {
      res.status(500).json({ success: false, message: (error instanceof Error ? error.message : "Erro ao excluir movimentação") });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
