import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AppShell from "@/components/layout/AppShell";
import { useLanguage } from "@/contexts/LanguageContext";
import CustomSystemsMessage from "@/components/CustomSystemsMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { Product, Supplier, Category, StockMovement } from "@shared/schema";
import { insertProductSchema, insertSupplierSchema, insertCategorySchema, insertStockMovementSchema } from "@shared/schema";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Form Components
function CategoryForm({ onSubmit }: { onSubmit: (data: z.infer<typeof insertCategorySchema>) => void }) {
  const form = useForm<z.infer<typeof insertCategorySchema>>({
    resolver: zodResolver(insertCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof insertCategorySchema>) => {
    console.log('CategoryForm: Submitting data:', data);
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Electronics" {...field} data-testid="input-category-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Category description" {...field} data-testid="textarea-category-description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full" 
          data-testid="button-submit-category"
          onClick={() => console.log('CategoryForm: Submit button clicked', form.formState)}
        >
          Add Category
        </Button>
      </form>
    </Form>
  );
}

function ProductForm({ 
  onSubmit, 
  suppliers, 
  categories,
  defaultValues
}: { 
  onSubmit: (data: z.infer<typeof insertProductSchema>) => void;
  suppliers: Supplier[];
  categories: Category[];
  defaultValues?: Partial<z.infer<typeof insertProductSchema>>;
}) {
  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      code: defaultValues?.code || "",
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      categoryId: defaultValues?.categoryId || "",
      supplierId: defaultValues?.supplierId || "",
      price: defaultValues?.price || "0",
      currentStock: defaultValues?.currentStock || 0,
      minimumStock: defaultValues?.minimumStock || 0,
      unit: defaultValues?.unit || "un",
      isActive: defaultValues?.isActive ?? true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. PRD001" {...field} data-testid="input-product-code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. pcs, kg, L" {...field} data-testid="input-product-unit" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Dell XPS 13 Laptop" {...field} data-testid="input-product-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} data-testid="textarea-product-description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-product-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="supplierId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-product-supplier">
                      <SelectValue placeholder="Select a supplier" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.00" {...field} data-testid="input-product-price" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="currentStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Stock</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    data-testid="input-product-stock"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="minimumStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Stock</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    data-testid="input-product-minimum-stock"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full" data-testid="button-submit-product">
          Add Product
        </Button>
      </form>
    </Form>
  );
}

function SupplierForm({ 
  onSubmit,
  defaultValues 
}: { 
  onSubmit: (data: z.infer<typeof insertSupplierSchema>) => void;
  defaultValues?: Partial<z.infer<typeof insertSupplierSchema>>;
}) {
  const form = useForm<z.infer<typeof insertSupplierSchema>>({
    resolver: zodResolver(insertSupplierSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      address: defaultValues?.address || "",
      rating: defaultValues?.rating || "5",
      deliveryDays: defaultValues?.deliveryDays || 7,
      isActive: defaultValues?.isActive ?? true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. TechSupplies Inc." {...field} data-testid="input-supplier-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contact@supplier.com" {...field} data-testid="input-supplier-email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" {...field} data-testid="input-supplier-phone" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Complete address" {...field} data-testid="textarea-supplier-address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (1-5)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    max="5" 
                    step="0.1" 
                    placeholder="5.0" 
                    {...field} 
                    data-testid="input-supplier-rating"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="deliveryDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Time (days)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="7" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    data-testid="input-supplier-delivery-days"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full" data-testid="button-submit-supplier">
          Add Supplier
        </Button>
      </form>
    </Form>
  );
}

function MovementForm({ 
  onSubmit, 
  products,
  defaultValues 
}: { 
  onSubmit: (data: z.infer<typeof insertStockMovementSchema>) => void;
  products: Product[];
  defaultValues?: Partial<z.infer<typeof insertStockMovementSchema>>;
}) {
  const form = useForm<z.infer<typeof insertStockMovementSchema>>({
    resolver: zodResolver(insertStockMovementSchema),
    defaultValues: {
      productId: defaultValues?.productId || "",
      type: defaultValues?.type || "inbound",
      quantity: defaultValues?.quantity || 1,
      unitPrice: defaultValues?.unitPrice || "0",
      totalValue: defaultValues?.totalValue || "0",
      reason: defaultValues?.reason || "",
      responsible: defaultValues?.responsible || "",
      notes: defaultValues?.notes || "",
    },
  });

  const watchedQuantity = form.watch("quantity");
  const watchedUnitPrice = form.watch("unitPrice");

  useEffect(() => {
    const quantity = watchedQuantity || 0;
    const unitPrice = parseFloat(watchedUnitPrice || "0");
    const totalValue = (quantity * unitPrice).toString();
    form.setValue("totalValue", totalValue);
  }, [watchedQuantity, watchedUnitPrice, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-movement-product">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - {product.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Movement Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-movement-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="inbound">Inbound</SelectItem>
                    <SelectItem value="outbound">Outbound</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1" 
                    placeholder="1" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    data-testid="input-movement-quantity"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="unitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Price</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00" 
                    {...field} 
                    data-testid="input-movement-unit-price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="totalValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Value</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00" 
                    {...field} 
                    disabled 
                    data-testid="input-movement-total-value"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Purchase, Sale, Adjustment" {...field} data-testid="input-movement-reason" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="responsible"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsible</FormLabel>
                <FormControl>
                  <Input placeholder="Responsible person's name" {...field} data-testid="input-movement-responsible" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional notes" {...field} data-testid="textarea-movement-notes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" data-testid="button-submit-movement">
          Register Movement
        </Button>
      </form>
    </Form>
  );
}

export default function DemoInventory() {
  const { t } = useLanguage();
  const [selectedModule, setSelectedModule] = useState('dashboard');
  const [isDialogOpen, setIsDialogOpen] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{type: string, id: string, name: string} | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Chart colors
  const CHART_COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

  // API Queries
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['/api/products']
  });

  const { data: suppliers = [], isLoading: isLoadingSuppliers } = useQuery<Supplier[]>({
    queryKey: ['/api/suppliers']
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ['/api/categories']
  });

  const { data: movements = [], isLoading: isLoadingMovements } = useQuery<StockMovement[]>({
    queryKey: ['/api/movements']
  });

  const { data: lowStockProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products/low-stock']
  });

  // Chart data calculations
  const chartData = useMemo(() => {
    // Stock by category chart data
    const stockByCategory = categories.map(category => {
      const categoryProducts = products.filter(p => p.categoryId === category.id);
      const totalStock = categoryProducts.reduce((sum, p) => sum + (p.currentStock || 0), 0);
      const totalValue = categoryProducts.reduce((sum, p) => {
        const price = parseFloat(p.price || '0');
        const stock = p.currentStock || 0;
        return sum + (isNaN(price) ? 0 : price) * stock;
      }, 0);
      return {
        name: category.name || 'No category',
        stock: totalStock,
        value: Math.round(totalValue * 100) / 100, // Round to 2 decimal places
        products: categoryProducts.length
      };
    });

    // Stock movements over time (last 7 days)
    const movementsOverTime = (() => {
      // Sort movements by date first
      const sortedMovements = [...movements].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateA - dateB;
      });

      // Create a map for aggregating movements by date
      const movementsByDate = new Map();
      
      sortedMovements.forEach(movement => {
        if (!movement.createdAt) return; // Skip movements without dates
        
        const date = new Date(movement.createdAt).toLocaleDateString('en-US');
        if (!movementsByDate.has(date)) {
          movementsByDate.set(date, { date, entradas: 0, saidas: 0 });
        }
        
        const dayData = movementsByDate.get(date);
        if (movement.type === 'entrada') {
          dayData.entradas += movement.quantity || 0;
        } else {
          dayData.saidas += movement.quantity || 0;
        }
      });

      // Convert to array and get last 7 days with data
      return Array.from(movementsByDate.values()).slice(-7);
    })();

    // Stock value distribution by category
    const stockValueDistribution = stockByCategory.filter(cat => cat.value > 0).map((category, index) => ({
      name: category.name,
      value: category.value,
      color: CHART_COLORS[index % CHART_COLORS.length]
    }));

    // Supplier performance (products count and average delivery days)
    const supplierPerformance = suppliers.map(supplier => {
      const supplierProducts = products.filter(p => p.supplierId === supplier.id);
      const totalValue = supplierProducts.reduce((sum, p) => {
        const price = parseFloat(p.price || '0');
        const stock = p.currentStock || 0;
        return sum + (isNaN(price) ? 0 : price) * stock;
      }, 0);
      const rating = parseFloat(supplier.rating || '0');
      
      return {
        name: supplier.name || 'Fornecedor',
        produtos: supplierProducts.length,
        prazoMedio: supplier.deliveryDays || 0,
        avaliacao: isNaN(rating) ? 0 : Math.round(rating * 10) / 10, // Round to 1 decimal
        valor: Math.round(totalValue * 100) / 100 // Round to 2 decimal places
      };
    }).filter(s => s.produtos > 0);

    return {
      stockByCategory,
      movementsOverTime,
      stockValueDistribution,
      supplierPerformance
    };
  }, [products, categories, movements, suppliers]);

  // Mutations
  const createProductMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertProductSchema>) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao criar produto');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products/low-stock'] });
      toast({ title: "Product created successfully!" });
      setIsDialogOpen(null);
    },
    onError: () => {
      toast({ title: "Error creating product", variant: "destructive" });
    },
  });

  const createSupplierMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertSupplierSchema>) => {
      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao criar fornecedor');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/suppliers'] });
      toast({ title: "Supplier created successfully!" });
      setIsDialogOpen(null);
    },
    onError: () => {
      toast({ title: "Error creating supplier", variant: "destructive" });
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertCategorySchema>) => {
      console.log('createCategoryMutation: Starting mutation with data:', data);
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log('createCategoryMutation: Response received:', response.status, response.ok);
      if (!response.ok) throw new Error('Erro ao criar categoria');
      const result = await response.json();
      console.log('createCategoryMutation: Response data:', result);
      return result;
    },
    onSuccess: () => {
      console.log('createCategoryMutation: Success callback triggered');
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      toast({ title: "Category created successfully!" });
      setIsDialogOpen(null);
    },
    onError: (error) => {
      console.error('createCategoryMutation: Error callback triggered:', error);
      toast({ title: "Error creating category", variant: "destructive" });
    },
  });

  const createMovementMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertStockMovementSchema>) => {
      const response = await fetch('/api/movements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao criar movimentação');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/movements'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products/low-stock'] });
      toast({ title: "Movement registered successfully!" });
      setIsDialogOpen(null);
    },
    onError: () => {
      toast({ title: "Error registering movement", variant: "destructive" });
    },
  });

  // Update mutations
  const updateSupplierMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<z.infer<typeof insertSupplierSchema>> }) => {
      const response = await fetch(`/api/suppliers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao atualizar fornecedor');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/suppliers'] });
      setEditingItem(null);
      setIsDialogOpen(null);
      toast({ title: "Supplier updated successfully!" });
    },
    onError: () => {
      toast({ title: "Error updating supplier", variant: "destructive" });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<z.infer<typeof insertProductSchema>> }) => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao atualizar produto');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products/low-stock'] });
      setEditingItem(null);
      setIsDialogOpen(null);
      toast({ title: "Product updated successfully!" });
    },
    onError: () => {
      toast({ title: "Error updating product", variant: "destructive" });
    },
  });

  const updateMovementMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<z.infer<typeof insertStockMovementSchema>> }) => {
      const response = await fetch(`/api/movements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao atualizar movimentação');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/movements'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products/low-stock'] });
      setEditingItem(null);
      setIsDialogOpen(null);
      toast({ title: "Movement updated successfully!" });
    },
    onError: () => {
      toast({ title: "Error updating movement", variant: "destructive" });
    },
  });

  // Delete mutations
  const deleteSupplierMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/suppliers/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao excluir fornecedor');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/suppliers'] });
      setDeleteConfirm(null);
      toast({ title: "Supplier deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Error deleting supplier", variant: "destructive" });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao excluir produto');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products/low-stock'] });
      setDeleteConfirm(null);
      toast({ title: "Product deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Error deleting product", variant: "destructive" });
    },
  });

  const deleteMovementMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/movements/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao excluir movimentação');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/movements'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products/low-stock'] });
      setDeleteConfirm(null);
      toast({ title: "Movement deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Error deleting movement", variant: "destructive" });
    },
  });

  // Calculate dashboard data from real API data
  const inventoryData = {
    totalItens: products.reduce((sum, p) => sum + (p.currentStock || 0), 0).toLocaleString(),
    valorEstoque: new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(
      products.reduce((sum, p) => sum + (p.currentStock || 0) * parseFloat(p.price || '0'), 0)
    ),
    produtosAtivos: products.filter(p => p.isActive).length.toLocaleString(),
    alertasEstoque: lowStockProducts.length,
    entradas: movements.filter(m => m.type === 'entrada').length.toString(),
    saidas: movements.filter(m => m.type === 'saida').length.toString(),
    rotatividade: "4.2x"
  };

  const navItems = [
    {
      id: 'dashboard',
      label: t('demo.nav.dashboard'),
      icon: 'fas fa-tachometer-alt',
      onClick: () => setSelectedModule('dashboard'),
      isActive: selectedModule === 'dashboard'
    },
    {
      id: 'estoque',
      label: t('demo.nav.estoque'),
      icon: 'fas fa-warehouse',
      onClick: () => setSelectedModule('estoque'),
      isActive: selectedModule === 'estoque'
    },
    {
      id: 'movimentacoes',
      label: t('demo.nav.movimentacoes'),
      icon: 'fas fa-exchange-alt',
      onClick: () => setSelectedModule('movimentacoes'),
      isActive: selectedModule === 'movimentacoes'
    },
    {
      id: 'fornecedores',
      label: t('demo.nav.fornecedores'),
      icon: 'fas fa-truck',
      onClick: () => setSelectedModule('fornecedores'),
      isActive: selectedModule === 'fornecedores'
    }
  ];

  return (
    <AppShell
      title={t('demo.inventory.title')}
      subtitle={t('demo.inventory.subtitle')}
      systemIcon="fas fa-boxes"
      systemColor="from-yellow-600 to-yellow-500"
      backHref="/sistema/inventory"
      statusBadge={t('demo.inventory.badge')}
      navItems={navItems}
    >
      {/* Custom Systems Message */}
      <div className="mb-6">
        <CustomSystemsMessage variant="compact" />
      </div>
            {selectedModule === 'dashboard' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 raleway">Stock Dashboard</h2>
                  <p className="text-slate-600 dark:text-slate-400">General control of inventory and movements</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-cubes text-white"></i>
                      </div>
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">+{inventoryData.entradas}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{inventoryData.totalItens}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Total Items</p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-dollar-sign text-white"></i>
                      </div>
                      <span className="text-green-600 dark:text-green-400 text-sm font-medium">+12.5%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{inventoryData.valorEstoque}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Stock Value</p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-exclamation-triangle text-white"></i>
                      </div>
                      <span className="text-red-600 dark:text-red-400 text-sm font-medium">Urgent</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{inventoryData.alertasEstoque}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Stock Alerts</p>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <i className="fas fa-sync-alt text-white"></i>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{inventoryData.rotatividade}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Average Turnover</p>
                    <p className="text-purple-600 dark:text-purple-400 text-xs mt-2">Per year</p>
                  </div>
                </div>

                {/* Interactive Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Stock by Category Chart */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Stock by Category</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData.stockByCategory}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fontSize: 12 }}
                            className="fill-slate-600 dark:fill-slate-400"
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                            className="fill-slate-600 dark:fill-slate-400"
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'var(--background)',
                              border: '1px solid var(--border)',
                              borderRadius: '8px'
                            }}
                            formatter={(value: any, name: string) => [
                              name === 'stock' ? `${value} units` : `${value} produtos`,
                              name === 'stock' ? 'Estoque Total' : 'Produtos'
                            ]}
                          />
                          <Legend />
                          <Bar dataKey="stock" fill="#3B82F6" name="Estoque" radius={[2, 2, 0, 0]} />
                          <Bar dataKey="products" fill="#10B981" name="Produtos" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Stock Movements Over Time Chart */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Movements (Last 7 days)</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData.movementsOverTime}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 12 }}
                            className="fill-slate-600 dark:fill-slate-400"
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                            className="fill-slate-600 dark:fill-slate-400"
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'var(--background)',
                              border: '1px solid var(--border)',
                              borderRadius: '8px'
                            }}
                            formatter={(value: any, name: string) => [
                              `${value} units`,
                              name === 'entradas' ? 'Entradas' : 'Saídas'
                            ]}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="entradas" 
                            stroke="#10B981" 
                            strokeWidth={3}
                            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                            name="Entradas"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="saidas" 
                            stroke="#EF4444" 
                            strokeWidth={3}
                            dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                            name="Saídas"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Stock Value Distribution Chart */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Stock Value Distribution</h3>
                    <div className="h-64">
                      {chartData.stockValueDistribution.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chartData.stockValueDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {chartData.stockValueDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: 'var(--background)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px'
                              }}
                              formatter={(value: any) => [
                                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value),
                                'Valor'
                              ]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-slate-500 dark:text-slate-400 text-center">
                            No stock data available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Supplier Performance Chart */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Supplier Performance</h3>
                    <div className="h-64">
                      {chartData.supplierPerformance.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData.supplierPerformance} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                            <XAxis 
                              type="number"
                              tick={{ fontSize: 12 }}
                              className="fill-slate-600 dark:fill-slate-400"
                            />
                            <YAxis 
                              type="category"
                              dataKey="name" 
                              tick={{ fontSize: 12 }}
                              className="fill-slate-600 dark:fill-slate-400"
                              width={80}
                            />
                            <Tooltip 
                              contentStyle={{
                                backgroundColor: 'var(--background)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px'
                              }}
                              formatter={(value: any, name: string) => [
                                name === 'produtos' ? `${value} produtos` : 
                                name === 'prazoMedio' ? `${value} dias` :
                                `${value.toFixed(1)}/5`,
                                name === 'produtos' ? 'Produtos' : 
                                name === 'prazoMedio' ? 'Prazo Médio' : 'Avaliação'
                              ]}
                            />
                            <Legend />
                            <Bar dataKey="produtos" fill="#3B82F6" name="Produtos" />
                            <Bar dataKey="prazoMedio" fill="#F59E0B" name="Prazo (dias)" />
                            <Bar dataKey="avaliacao" fill="#10B981" name="Avaliação" />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-slate-500 dark:text-slate-400 text-center">
                            No suppliers with products available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Low Stock and Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Low Stock</h3>
                    <div className="space-y-4">
                      {lowStockProducts.length > 0 ? lowStockProducts.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{item.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.code}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">{item.currentStock || 0} units</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              (item.currentStock || 0) <= (item.minimumStock || 0) / 2 ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                              'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400'
                            }`}>
                              {(item.currentStock || 0) <= (item.minimumStock || 0) / 2 ? 'Crítico' : 'Baixo'}
                            </span>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mín: {item.minimumStock || 0}</p>
                          </div>
                        </div>
                      )) : (
                        <p className="text-center text-slate-500 dark:text-slate-400">No products with low stock</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Categorias Principais</h3>
                    <div className="space-y-4">
                      {categories.length > 0 ? categories.slice(0, 4).map((cat, index) => {
                        const categoryProducts = products.filter(p => p.categoryId === cat.id);
                        const categoryValue = categoryProducts.reduce((sum, p) => sum + (p.currentStock || 0) * parseFloat(p.price || '0'), 0);
                        return (
                          <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                            <div>
                              <p className="font-medium text-slate-900 dark:text-slate-100">{cat.name}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{categoryProducts.length} itens</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-slate-900 dark:text-slate-100">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(categoryValue)}
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Giro: 3.2x</p>
                            </div>
                          </div>
                        );
                      }) : (
                        <p className="text-center text-slate-500 dark:text-slate-400">Nenhuma categoria cadastrada</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recent Movements and Warehouses */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Movimentações Recentes</h3>
                    <div className="space-y-3">
                      {movements.length > 0 ? movements.slice(0, 4).map((mov, index) => {
                        const product = products.find(p => p.id === mov.productId);
                        return (
                          <div key={index} className="flex items-center space-x-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              mov.type === 'entrada' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                            }`}>
                              <i className={`${
                                mov.type === 'entrada' ? 'fas fa-arrow-down text-green-600 dark:text-green-400' : 'fas fa-arrow-up text-red-600 dark:text-red-400'
                              }`}></i>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-slate-900 dark:text-slate-100">{product?.name || 'Product'}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {mov.quantity} units • {mov.responsible || 'System'} • {new Date(mov.createdAt || '').toLocaleDateString('en-US')}
                              </p>
                            </div>
                            <span className={`font-semibold ${
                              mov.type === 'entrada' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(mov.totalValue || '0'))}
                            </span>
                          </div>
                        );
                      }) : (
                        <p className="text-center text-slate-500 dark:text-slate-400">Nenhuma movimentação registrada</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Estoque por Categorias</h3>
                    <div className="space-y-4">
                      {categories.length > 0 ? categories.slice(0, 3).map((category, index) => {
                        const categoryProducts = products.filter(p => p.categoryId === category.id);
                        const totalItems = categoryProducts.reduce((sum, p) => sum + (p.currentStock || 0), 0);
                        const totalValue = categoryProducts.reduce((sum, p) => sum + (p.currentStock || 0) * parseFloat(p.price || '0'), 0);
                        const capacityPercentage = Math.min(100, (totalItems / 1000) * 100); // Assuming max 1000 items per category
                        
                        return (
                          <div key={index} className="p-4 bg-gradient-to-r from-slate-50 to-zinc-50 dark:from-slate-700 dark:to-slate-600 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-slate-900 dark:text-slate-100">{category.name}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                capacityPercentage > 80 ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                                capacityPercentage > 60 ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400' :
                                'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                              }`}>
                                {Math.round(capacityPercentage)}% estoque
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{category.description || 'Categoria de produtos'}</p>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600 dark:text-slate-400">{totalItems.toLocaleString()} itens</span>
                              <span className="font-semibold text-slate-900 dark:text-slate-100">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}
                              </span>
                            </div>
                          </div>
                        );
                      }) : (
                        <p className="text-center text-slate-500 dark:text-slate-400">Nenhuma categoria cadastrada</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'stock' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 raleway">Controle de Estoque</h2>
                  <div className="flex gap-2">
                    <Dialog open={isDialogOpen === 'categoria'} onOpenChange={(open) => setIsDialogOpen(open ? 'categoria' : null)}>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700" data-testid="button-add-categoria">
                          <i className="fas fa-plus mr-2"></i>
                          Categoria
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adicionar Categoria</DialogTitle>
                        </DialogHeader>
                        <CategoryForm onSubmit={createCategoryMutation.mutate} />
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog open={isDialogOpen === 'produto'} onOpenChange={(open) => {
                      if (!open) {
                        setEditingItem(null);
                        setIsDialogOpen(null);
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700" data-testid="button-add-produto">
                          <i className="fas fa-plus mr-2"></i>
                          Produto
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{editingItem ? 'Editar Produto' : 'Adicionar Produto'}</DialogTitle>
                        </DialogHeader>
                        <ProductForm 
                          onSubmit={(data) => {
                            if (editingItem) {
                              updateProductMutation.mutate({ id: editingItem.id, data });
                            } else {
                              createProductMutation.mutate(data);
                            }
                          }} 
                          suppliers={suppliers} 
                          categories={categories}
                          defaultValues={editingItem || undefined}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Products List */}
                  <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Produtos em Estoque</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {isLoadingProducts ? (
                        <div className="text-center py-4">
                          <i className="fas fa-spinner fa-spin text-slate-400"></i>
                          <p className="text-slate-500 dark:text-slate-400 mt-2">Carregando produtos...</p>
                        </div>
                      ) : products.length > 0 ? products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                          <div className="flex-1">
                            <p className="font-medium text-slate-900 dark:text-slate-100">{product.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{product.code} • {product.unit || 'un'}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(product.price || '0'))}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-semibold text-slate-900 dark:text-slate-100">{product.currentStock || 0} units</p>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                (product.currentStock || 0) <= (product.minimumStock || 0) ? 
                                  'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' :
                                  'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                              }`}>
                                Mín: {product.minimumStock || 0}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingItem(product);
                                  setIsDialogOpen('produto');
                                }}
                                className="h-8 w-8 p-0 border-blue-300 hover:bg-blue-50 dark:border-blue-600 dark:hover:bg-blue-900/20"
                                data-testid={`button-edit-product-${product.id}`}
                              >
                                <i className="fas fa-edit text-blue-600 dark:text-blue-400 text-sm"></i>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setDeleteConfirm({ type: 'produto', id: product.id, name: product.name })}
                                className="h-8 w-8 p-0 border-red-300 hover:bg-red-50 dark:border-red-600 dark:hover:bg-red-900/20"
                                data-testid={`button-delete-product-${product.id}`}
                              >
                                <i className="fas fa-trash text-red-600 dark:text-red-400 text-sm"></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-8">
                          <i className="fas fa-box-open text-4xl text-slate-400 mb-4"></i>
                          <p className="text-slate-500 dark:text-slate-400">No product cadastrado</p>
                          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Adicione produtos para começar</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Categories List */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Categorias</h3>
                    <div className="space-y-3">
                      {isLoadingCategories ? (
                        <div className="text-center py-4">
                          <i className="fas fa-spinner fa-spin text-slate-400"></i>
                        </div>
                      ) : categories.length > 0 ? categories.map((category, index) => {
                        const categoryProductCount = products.filter(p => p.categoryId === category.id).length;
                        return (
                          <div key={index} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                            <p className="font-medium text-slate-900 dark:text-slate-100">{category.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{categoryProductCount} produtos</p>
                          </div>
                        );
                      }) : (
                        <div className="text-center py-4">
                          <i className="fas fa-tags text-2xl text-slate-400 mb-2"></i>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">Nenhuma categoria</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'movements' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 raleway">Movimentações</h2>
                  <Dialog open={isDialogOpen === 'movimentacao'} onOpenChange={(open) => {
                    if (!open) {
                      setEditingItem(null);
                      setIsDialogOpen(null);
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button className="bg-purple-600 hover:bg-purple-700" data-testid="button-add-movimentacao">
                        <i className="fas fa-plus mr-2"></i>
                        Nova Movimentação
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{editingItem ? 'Editar Movimentação' : 'Registrar Movimentação'}</DialogTitle>
                      </DialogHeader>
                      <MovementForm 
                        onSubmit={(data) => {
                          if (editingItem) {
                            updateMovementMutation.mutate({ id: editingItem.id, data });
                          } else {
                            createMovementMutation.mutate(data);
                          }
                        }} 
                        products={products}
                        defaultValues={editingItem || undefined}
                      />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 raleway">Histórico de Movimentações</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {isLoadingMovements ? (
                      <div className="text-center py-4">
                        <i className="fas fa-spinner fa-spin text-slate-400"></i>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Carregando movimentações...</p>
                      </div>
                    ) : movements.length > 0 ? movements.map((movement, index) => {
                      const product = products.find(p => p.id === movement.productId);
                      return (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            movement.type === 'entrada' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                          }`}>
                            <i className={`${
                              movement.type === 'entrada' ? 'fas fa-arrow-down text-green-600 dark:text-green-400' : 'fas fa-arrow-up text-red-600 dark:text-red-400'
                            } text-lg`}></i>
                          </div>
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <p className="font-medium text-slate-900 dark:text-slate-100">{product?.name || 'Product'}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{product?.code || movement.productId}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Quantidade</p>
                              <p className="font-medium text-slate-900 dark:text-slate-100">{movement.quantity} {product?.unit || 'un'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Responsável</p>
                              <p className="font-medium text-slate-900 dark:text-slate-100">{movement.responsible || 'System'}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {new Date(movement.createdAt || '').toLocaleDateString('en-US')}
                              </p>
                              <p className={`font-semibold ${
                                movement.type === 'entrada' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(movement.totalValue || '0'))}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingItem(movement);
                                setIsDialogOpen('movimentacao');
                              }}
                              className="h-8 w-8 p-0 border-blue-300 hover:bg-blue-50 dark:border-blue-600 dark:hover:bg-blue-900/20"
                              data-testid={`button-edit-movement-${movement.id}`}
                            >
                              <i className="fas fa-edit text-blue-600 dark:text-blue-400 text-sm"></i>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setDeleteConfirm({ type: 'movimentacao', id: movement.id, name: `${movement.type} - ${product?.name}` })}
                              className="h-8 w-8 p-0 border-red-300 hover:bg-red-50 dark:border-red-600 dark:hover:bg-red-900/20"
                              data-testid={`button-delete-movement-${movement.id}`}
                            >
                              <i className="fas fa-trash text-red-600 dark:text-red-400 text-sm"></i>
                            </Button>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-center py-8">
                        <i className="fas fa-exchange-alt text-4xl text-slate-400 mb-4"></i>
                        <p className="text-slate-500 dark:text-slate-400">Nenhuma movimentação registrada</p>
                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Registre movimentações para acompanhar o estoque</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedModule === 'suppliers' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 raleway">Gestão de Fornecedores</h2>
                  <Dialog open={isDialogOpen === 'fornecedor'} onOpenChange={(open) => {
                    if (!open) {
                      setEditingItem(null);
                      setIsDialogOpen(null);
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button className="bg-orange-600 hover:bg-orange-700" data-testid="button-add-fornecedor">
                        <i className="fas fa-plus mr-2"></i>
                        Novo Fornecedor
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{editingItem ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</DialogTitle>
                      </DialogHeader>
                      <SupplierForm 
                        onSubmit={(data) => {
                          if (editingItem) {
                            updateSupplierMutation.mutate({ id: editingItem.id, data });
                          } else {
                            createSupplierMutation.mutate(data);
                          }
                        }}
                        defaultValues={editingItem || undefined}
                      />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isLoadingSuppliers ? (
                    <div className="col-span-2 text-center py-8">
                      <i className="fas fa-spinner fa-spin text-slate-400 text-2xl"></i>
                      <p className="text-slate-500 dark:text-slate-400 mt-2">Carregando fornecedores...</p>
                    </div>
                  ) : suppliers.length > 0 ? suppliers.map((supplier, index) => {
                    const supplierProducts = products.filter(p => p.supplierId === supplier.id);
                    const supplierValue = supplierProducts.reduce((sum, p) => sum + (p.currentStock || 0) * parseFloat(p.price || '0'), 0);
                    
                    return (
                      <div key={index} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{supplier.name}</h3>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fas fa-star text-sm ${
                                  i < Math.floor(parseFloat(supplier.rating || '0')) ? 'text-yellow-500' : 'text-slate-300 dark:text-slate-600'
                                }`}></i>
                              ))}
                              <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">{supplier.rating || '0'}</span>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingItem(supplier);
                                  setIsDialogOpen('fornecedor');
                                }}
                                className="h-8 w-8 p-0 border-blue-300 hover:bg-blue-50 dark:border-blue-600 dark:hover:bg-blue-900/20"
                                data-testid={`button-edit-supplier-${supplier.id}`}
                              >
                                <i className="fas fa-edit text-blue-600 dark:text-blue-400 text-sm"></i>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setDeleteConfirm({ type: 'fornecedor', id: supplier.id, name: supplier.name })}
                                className="h-8 w-8 p-0 border-red-300 hover:bg-red-50 dark:border-red-600 dark:hover:bg-red-900/20"
                                data-testid={`button-delete-supplier-${supplier.id}`}
                              >
                                <i className="fas fa-trash text-red-600 dark:text-red-400 text-sm"></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {supplier.email && (
                          <div className="mb-2">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              <i className="fas fa-envelope mr-2"></i>
                              {supplier.email}
                            </p>
                          </div>
                        )}
                        
                        {supplier.phone && (
                          <div className="mb-4">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              <i className="fas fa-phone mr-2"></i>
                              {supplier.phone}
                            </p>
                          </div>
                        )}
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Produtos:</span>
                            <span className="font-medium text-slate-900 dark:text-slate-100">{supplierProducts.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Valor Total:</span>
                            <span className="font-medium text-slate-900 dark:text-slate-100">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(supplierValue)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Prazo Médio:</span>
                            <span className="font-medium text-slate-900 dark:text-slate-100">{supplier.deliveryDays || 0} dias</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Status:</span>
                            <span className={`font-medium ${
                              supplier.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                              {supplier.isActive ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="col-span-2 text-center py-8">
                      <i className="fas fa-truck text-4xl text-slate-400 mb-4"></i>
                      <p className="text-slate-500 dark:text-slate-400">No supplier cadastrado</p>
                      <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Adicione fornecedores para gerenciar a cadeia de suprimentos</p>
                    </div>
                  )}
                </div>
              </div>
            )}
      
      {/* Confirmação de exclusão */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-slate-700 dark:text-slate-300">
              Tem certeza que deseja excluir <span className="font-semibold">{deleteConfirm?.name}</span>?
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Esta ação não pode ser desfeita.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setDeleteConfirm(null)}
              data-testid="button-cancel-delete"
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (!deleteConfirm) return;
                
                if (deleteConfirm.type === 'produto') {
                  deleteProductMutation.mutate(deleteConfirm.id);
                } else if (deleteConfirm.type === 'fornecedor') {
                  deleteSupplierMutation.mutate(deleteConfirm.id);
                } else if (deleteConfirm.type === 'movimentacao') {
                  deleteMovementMutation.mutate(deleteConfirm.id);
                }
              }}
              data-testid="button-confirm-delete"
            >
              <i className="fas fa-trash mr-2"></i>
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}