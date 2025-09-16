import { 
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContact,
  type Supplier,
  type InsertSupplier,
  type Category,
  type InsertCategory,
  type Product,
  type InsertProduct,
  type StockMovement,
  type InsertStockMovement
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Suppliers
  getSuppliers(): Promise<Supplier[]>;
  getSupplier(id: string): Promise<Supplier | undefined>;
  createSupplier(supplier: InsertSupplier): Promise<Supplier>;
  updateSupplier(id: string, supplier: Partial<InsertSupplier>): Promise<Supplier | undefined>;
  deleteSupplier(id: string): Promise<boolean>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductByCode(code: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  updateProductStock(id: string, newStock: number): Promise<Product | undefined>;
  getLowStockProducts(): Promise<Product[]>;
  
  // Stock Movements
  getStockMovements(): Promise<StockMovement[]>;
  getStockMovement(id: string): Promise<StockMovement | undefined>;
  getProductMovements(productId: string): Promise<StockMovement[]>;
  createStockMovement(movement: InsertStockMovement): Promise<StockMovement>;
  updateStockMovement(id: string, movement: Partial<InsertStockMovement>): Promise<StockMovement | undefined>;
  deleteStockMovement(id: string): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: User[] = [];
  private contacts: ContactSubmission[] = [];
  private suppliersStore: Supplier[] = [];
  private categoriesStore: Category[] = [];
  private productsStore: Product[] = [];
  private movementsStore: StockMovement[] = [];

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample categories
    this.categoriesStore = [
      {
        id: "cat-1",
        name: "Eletrônicos",
        description: "Equipamentos eletrônicos e acessórios",
        createdAt: new Date('2024-01-15'),
      },
      {
        id: "cat-2", 
        name: "Escritório",
        description: "Material de escritório e papelaria",
        createdAt: new Date('2024-01-16'),
      },
      {
        id: "cat-3",
        name: "Ferramentas",
        description: "Ferramentas e equipamentos industriais",
        createdAt: new Date('2024-01-17'),
      }
    ];

    // Sample suppliers
    this.suppliersStore = [
      {
        id: "sup-1",
        name: "TechSupplies Ltda",
        email: "contato@techsupplies.com.br",
        phone: "(11) 3456-7890",
        address: "Rua das Tecnologias, 123 - São Paulo, SP",
        rating: "4.8",
        deliveryDays: 5,
        isActive: true,
        createdAt: new Date('2024-01-10'),
      },
      {
        id: "sup-2",
        name: "OfficeMax Distribuidora",
        email: "vendas@officemax.com.br", 
        phone: "(11) 2345-6789",
        address: "Av. Comercial, 456 - São Paulo, SP",
        rating: "4.5",
        deliveryDays: 3,
        isActive: true,
        createdAt: new Date('2024-01-11'),
      },
      {
        id: "sup-3",
        name: "Ferramenta Pro Industrial",
        email: "industrial@ferramentapro.com.br",
        phone: "(11) 4567-8901",
        address: "Rua Industrial, 789 - Santo André, SP",
        rating: "4.7",
        deliveryDays: 7,
        isActive: true,
        createdAt: new Date('2024-01-12'),
      }
    ];

    // Sample products
    this.productsStore = [
      {
        id: "prod-1",
        code: "NTB001",
        name: "Notebook Dell Inspiron 15",
        description: "Notebook para uso corporativo com Intel i5, 8GB RAM, 256GB SSD",
        categoryId: "cat-1",
        supplierId: "sup-1", 
        price: "2899.99",
        currentStock: 15,
        minimumStock: 5,
        unit: "un",
        isActive: true,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-12-10'),
      },
      {
        id: "prod-2",
        code: "MSE002",
        name: "Mouse Óptico Logitech",
        description: "Mouse óptico sem fio com receptor USB",
        categoryId: "cat-1",
        supplierId: "sup-1",
        price: "89.90",
        currentStock: 45,
        minimumStock: 10,
        unit: "un",
        isActive: true,
        createdAt: new Date('2024-01-21'),
        updatedAt: new Date('2024-12-08'),
      },
      {
        id: "prod-3",
        code: "PPL003",
        name: "Papel A4 - Resma 500 folhas",
        description: "Papel sulfite branco A4 75g - pacote com 500 folhas",
        categoryId: "cat-2",
        supplierId: "sup-2",
        price: "24.90",
        currentStock: 120,
        minimumStock: 20,
        unit: "resma",
        isActive: true,
        createdAt: new Date('2024-01-22'),
        updatedAt: new Date('2024-12-05'),
      },
      {
        id: "prod-4",
        code: "CAN004",
        name: "Caneta Esferográfica Azul",
        description: "Caneta esferográfica ponta média cor azul",
        categoryId: "cat-2", 
        supplierId: "sup-2",
        price: "1.50",
        currentStock: 8,
        minimumStock: 50,
        unit: "un",
        isActive: true,
        createdAt: new Date('2024-01-23'),
        updatedAt: new Date('2024-12-07'),
      },
      {
        id: "prod-5",
        code: "FUR005",
        name: "Furadeira Elétrica 550W",
        description: "Furadeira elétrica 550W com maleta e brocas",
        categoryId: "cat-3",
        supplierId: "sup-3",
        price: "189.99",
        currentStock: 12,
        minimumStock: 3,
        unit: "un",
        isActive: true,
        createdAt: new Date('2024-01-24'),
        updatedAt: new Date('2024-12-09'),
      },
      {
        id: "prod-6",
        code: "CHV006",
        name: "Chave de Fenda Phillips",
        description: "Conjunto de chaves Phillips tamanhos variados",
        categoryId: "cat-3",
        supplierId: "sup-3",
        price: "35.90",
        currentStock: 2,
        minimumStock: 8,
        unit: "conjunto",
        isActive: true,
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-12-06'),
      }
    ];

    // Sample stock movements
    this.movementsStore = [
      {
        id: "mov-1",
        productId: "prod-1",
        type: "entrada",
        quantity: 20,
        unitPrice: "2800.00",
        totalValue: "56000.00",
        reason: "Compra para estoque",
        responsible: "João Silva",
        notes: "Lote inicial - pedido #001",
        createdAt: new Date('2024-01-20'),
      },
      {
        id: "mov-2",
        productId: "prod-1",
        type: "saida",
        quantity: 5,
        unitPrice: "2899.99",
        totalValue: "14499.95",
        reason: "Venda departamento TI",
        responsible: "Maria Santos",
        notes: "Venda interna - setor financeiro",
        createdAt: new Date('2024-12-10'),
      },
      {
        id: "mov-3",
        productId: "prod-2",
        type: "entrada",
        quantity: 50,
        unitPrice: "75.00",
        totalValue: "3750.00",
        reason: "Reposição estoque",
        responsible: "Carlos Lima",
        notes: "Pedido #002 - promoção fornecedor",
        createdAt: new Date('2024-01-21'),
      },
      {
        id: "mov-4",
        productId: "prod-2",
        type: "saida",
        quantity: 5,
        unitPrice: "89.90",
        totalValue: "449.50",
        reason: "Venda balcão",
        responsible: "Ana Costa",
        notes: "Cliente pessoa física",
        createdAt: new Date('2024-12-08'),
      },
      {
        id: "mov-5",
        productId: "prod-3",
        type: "entrada",
        quantity: 150,
        unitPrice: "20.00",
        totalValue: "3000.00",
        reason: "Compra em grande volume",
        responsible: "Pedro Oliveira",
        notes: "Desconto por quantidade - 20% off",
        createdAt: new Date('2024-01-22'),
      },
      {
        id: "mov-6",
        productId: "prod-3",
        type: "saida",
        quantity: 30,
        unitPrice: "24.90",
        totalValue: "747.00",
        reason: "Uso interno",
        responsible: "Lucia Ferreira",
        notes: "Consumo departamento administrativo",
        createdAt: new Date('2024-12-05'),
      },
      {
        id: "mov-7",
        productId: "prod-4",
        type: "entrada",
        quantity: 100,
        unitPrice: "1.20",
        totalValue: "120.00",
        reason: "Compra regular",
        responsible: "Roberto Alves",
        notes: "Material básico de escritório",
        createdAt: new Date('2024-01-23'),
      },
      {
        id: "mov-8",
        productId: "prod-4",
        type: "saida",
        quantity: 92,
        unitPrice: "1.50",
        totalValue: "138.00",
        reason: "Distribuição departamentos",
        responsible: "Sandra Rocha",
        notes: "Distribuição mensal para todos os setores",
        createdAt: new Date('2024-12-07'),
      },
      {
        id: "mov-9",
        productId: "prod-5",
        type: "entrada",
        quantity: 15,
        unitPrice: "170.00",
        totalValue: "2550.00",
        reason: "Estoque manutenção",
        responsible: "José Santos",
        notes: "Ferramentas para equipe técnica",
        createdAt: new Date('2024-01-24'),
      },
      {
        id: "mov-10",
        productId: "prod-5",
        type: "saida",
        quantity: 3,
        unitPrice: "189.99",
        totalValue: "569.97",
        reason: "Empréstimo técnico",
        responsible: "Fernando Lima",
        notes: "Empréstimo para obra externa",
        createdAt: new Date('2024-12-09'),
      },
      {
        id: "mov-11",
        productId: "prod-6",
        type: "entrada",
        quantity: 10,
        unitPrice: "30.00",
        totalValue: "300.00",
        reason: "Kit ferramentas",
        responsible: "Marcos Silva",
        notes: "Complemento kit manutenção",
        createdAt: new Date('2024-01-25'),
      },
      {
        id: "mov-12",
        productId: "prod-6",
        type: "saida",
        quantity: 8,
        unitPrice: "35.90",
        totalValue: "287.20",
        reason: "Venda técnicos",
        responsible: "Patricia Gomes",
        notes: "Venda para técnicos externos",
        createdAt: new Date('2024-12-06'),
      }
    ];
  }

  // Helper method to generate IDs
  private generateId(): string {
    return crypto.randomUUID();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.generateId(),
    };
    this.users.push(user);
    return user;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const contact: ContactSubmission = {
      ...insertContact,
      id: this.generateId(),
      phone: insertContact.phone || "",
      systemOfInterest: insertContact.systemOfInterest || "",
      message: insertContact.message || "",
      acceptsMarketing: insertContact.acceptsMarketing || "false",
      createdAt: new Date(),
    };
    this.contacts.push(contact);
    return contact;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return [...this.contacts].sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  // Suppliers
  async getSuppliers(): Promise<Supplier[]> {
    return [...this.suppliersStore].sort((a, b) => a.name.localeCompare(b.name));
  }

  async getSupplier(id: string): Promise<Supplier | undefined> {
    return this.suppliersStore.find(supplier => supplier.id === id);
  }

  async createSupplier(insertSupplier: InsertSupplier): Promise<Supplier> {
    const supplier: Supplier = {
      ...insertSupplier,
      id: this.generateId(),
      email: insertSupplier.email || "",
      phone: insertSupplier.phone || "",
      address: insertSupplier.address || "",
      rating: insertSupplier.rating || "0",
      deliveryDays: insertSupplier.deliveryDays || 0,
      isActive: insertSupplier.isActive !== undefined ? insertSupplier.isActive : true,
      createdAt: new Date(),
    };
    this.suppliersStore.push(supplier);
    return supplier;
  }

  async updateSupplier(id: string, updateData: Partial<InsertSupplier>): Promise<Supplier | undefined> {
    const index = this.suppliersStore.findIndex(supplier => supplier.id === id);
    if (index === -1) return undefined;
    
    this.suppliersStore[index] = {
      ...this.suppliersStore[index],
      ...updateData,
    };
    return this.suppliersStore[index];
  }

  async deleteSupplier(id: string): Promise<boolean> {
    const index = this.suppliersStore.findIndex(supplier => supplier.id === id);
    if (index === -1) return false;
    this.suppliersStore.splice(index, 1);
    return true;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return [...this.categoriesStore].sort((a, b) => a.name.localeCompare(b.name));
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categoriesStore.find(category => category.id === id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const category: Category = {
      ...insertCategory,
      id: this.generateId(),
      description: insertCategory.description || "",
      createdAt: new Date(),
    };
    this.categoriesStore.push(category);
    return category;
  }

  async updateCategory(id: string, updateData: Partial<InsertCategory>): Promise<Category | undefined> {
    const index = this.categoriesStore.findIndex(category => category.id === id);
    if (index === -1) return undefined;
    
    this.categoriesStore[index] = {
      ...this.categoriesStore[index],
      ...updateData,
    };
    return this.categoriesStore[index];
  }

  async deleteCategory(id: string): Promise<boolean> {
    const index = this.categoriesStore.findIndex(category => category.id === id);
    if (index === -1) return false;
    this.categoriesStore.splice(index, 1);
    return true;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return [...this.productsStore].sort((a, b) => a.name.localeCompare(b.name));
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.productsStore.find(product => product.id === id);
  }

  async getProductByCode(code: string): Promise<Product | undefined> {
    return this.productsStore.find(product => product.code === code);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = {
      ...insertProduct,
      id: this.generateId(),
      description: insertProduct.description || "",
      price: insertProduct.price || "0",
      currentStock: insertProduct.currentStock || 0,
      minimumStock: insertProduct.minimumStock || 0,
      unit: insertProduct.unit || "un",
      isActive: insertProduct.isActive !== undefined ? insertProduct.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryId: insertProduct.categoryId || null,
      supplierId: insertProduct.supplierId || null,
    };
    this.productsStore.push(product);
    return product;
  }

  async updateProduct(id: string, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const index = this.productsStore.findIndex(product => product.id === id);
    if (index === -1) return undefined;
    
    this.productsStore[index] = {
      ...this.productsStore[index],
      ...updateData,
      updatedAt: new Date(),
    };
    return this.productsStore[index];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const index = this.productsStore.findIndex(product => product.id === id);
    if (index === -1) return false;
    this.productsStore.splice(index, 1);
    return true;
  }

  async updateProductStock(id: string, newStock: number): Promise<Product | undefined> {
    const index = this.productsStore.findIndex(product => product.id === id);
    if (index === -1) return undefined;
    
    this.productsStore[index] = {
      ...this.productsStore[index],
      currentStock: newStock,
      updatedAt: new Date(),
    };
    return this.productsStore[index];
  }

  async getLowStockProducts(): Promise<Product[]> {
    return this.productsStore.filter(product => 
      (product.currentStock || 0) <= (product.minimumStock || 0)
    );
  }

  // Stock Movements
  async getStockMovements(): Promise<StockMovement[]> {
    return [...this.movementsStore].sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getStockMovement(id: string): Promise<StockMovement | undefined> {
    return this.movementsStore.find(movement => movement.id === id);
  }

  async getProductMovements(productId: string): Promise<StockMovement[]> {
    return this.movementsStore
      .filter(movement => movement.productId === productId)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createStockMovement(insertMovement: InsertStockMovement): Promise<StockMovement> {
    const movement: StockMovement = {
      ...insertMovement,
      id: this.generateId(),
      reason: insertMovement.reason || null,
      responsible: insertMovement.responsible || null,
      notes: insertMovement.notes || null,
      unitPrice: insertMovement.unitPrice || null,
      totalValue: insertMovement.totalValue || null,
      createdAt: new Date(),
    };
    
    // Update product stock
    const productIndex = this.productsStore.findIndex(p => p.id === insertMovement.productId);
    if (productIndex !== -1) {
      const currentStock = this.productsStore[productIndex].currentStock || 0;
      const newStock = insertMovement.type === 'entrada' 
        ? currentStock + insertMovement.quantity
        : currentStock - insertMovement.quantity;
      
      this.productsStore[productIndex] = {
        ...this.productsStore[productIndex],
        currentStock: Math.max(0, newStock),
        updatedAt: new Date(),
      };
    }
    
    this.movementsStore.push(movement);
    return movement;
  }

  async updateStockMovement(id: string, updateData: Partial<InsertStockMovement>): Promise<StockMovement | undefined> {
    const index = this.movementsStore.findIndex(movement => movement.id === id);
    if (index === -1) return undefined;
    
    this.movementsStore[index] = {
      ...this.movementsStore[index],
      ...updateData,
    };
    return this.movementsStore[index];
  }

  async deleteStockMovement(id: string): Promise<boolean> {
    const index = this.movementsStore.findIndex(movement => movement.id === id);
    if (index === -1) return false;
    
    const movement = this.movementsStore[index];
    
    // Reverse the stock change
    const productIndex = this.productsStore.findIndex(p => p.id === movement.productId);
    if (productIndex !== -1) {
      const currentStock = this.productsStore[productIndex].currentStock || 0;
      const reversedStock = movement.type === 'entrada' 
        ? currentStock - movement.quantity
        : currentStock + movement.quantity;
      
      if (reversedStock < 0) {
        throw new Error(`Não é possível excluir esta movimentação pois resultaria em estoque negativo. Estoque atual: ${currentStock}`);
      }
      
      this.productsStore[productIndex] = {
        ...this.productsStore[productIndex],
        currentStock: reversedStock,
        updatedAt: new Date(),
      };
    }
    
    this.movementsStore.splice(index, 1);
    return true;
  }
}

// Use MemStorage for the demo as per project guidelines
export const storage = new MemStorage();