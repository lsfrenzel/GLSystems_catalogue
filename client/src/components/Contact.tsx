import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactSchema } from "@shared/schema";
import type { InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      systemOfInterest: "",
      message: "",
      acceptsMarketing: "false",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Sucesso!",
        description: "Solicitação enviada com sucesso! Entraremos em contato em breve.",
      });
      form.reset();
      setIsSubmitted(true);
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao enviar solicitação. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const systemOptions = [
    { value: "erp", label: "ERP - Gestão Empresarial" },
    { value: "crm", label: "CRM - Relacionamento com Clientes" },
    { value: "restaurant", label: "Sistema de Comandas" },
    { value: "financial", label: "Sistema Financeiro" },
    { value: "inventory", label: "Estoque e Logística" },
    { value: "education", label: "Plataforma EAD" },
    { value: "all", label: "Todos os Sistemas" },
  ];

  if (isSubmitted) {
    return (
      <section id="contato" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="bg-card border border-border rounded-2xl p-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check text-primary text-2xl"></i>
              </div>
              <h2 className="raleway text-3xl font-bold mb-4" data-testid="success-title">
                Solicitação Enviada com Sucesso!
              </h2>
              <p className="text-muted-foreground mb-6" data-testid="success-message">
                Recebemos sua solicitação e entraremos em contato em breve para agendar sua demonstração gratuita.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                data-testid="send-another-button"
              >
                Enviar Nova Solicitação
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="raleway text-4xl md:text-5xl font-bold mb-6" data-testid="contact-title">
            Entre em Contato
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="contact-subtitle">
            Solicite uma demonstração gratuita e descubra como podemos transformar seu negócio
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 fade-in">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground">Nome Completo</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Seu nome completo"
                          className="bg-input border-border"
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground">E-mail Profissional</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          placeholder="seu@empresa.com.br"
                          className="bg-input border-border"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground">Empresa</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Nome da sua empresa"
                          className="bg-input border-border"
                          data-testid="input-company"
                        />
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
                      <FormLabel className="text-sm font-semibold text-foreground">Telefone</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="tel"
                          placeholder="(11) 99999-9999"
                          className="bg-input border-border"
                          data-testid="input-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="systemOfInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-foreground">Sistema de Interesse</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-input border-border" data-testid="select-system">
                          <SelectValue placeholder="Selecione um sistema" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {systemOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-foreground">Mensagem</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        rows={4}
                        placeholder="Conte-nos mais sobre suas necessidades e objetivos..."
                        className="bg-input border-border resize-none"
                        data-testid="textarea-message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptsMarketing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value === "true"}
                        onCheckedChange={(checked) => field.onChange(checked ? "true" : "false")}
                        data-testid="checkbox-marketing"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-muted-foreground">
                        Aceito receber comunicações sobre soluções e demonstrações
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold transition-all hover:scale-105 hover:shadow-xl"
                disabled={contactMutation.isPending}
                data-testid="submit-button"
              >
                {contactMutation.isPending ? "Enviando..." : "Solicitar Demonstração Gratuita"}
              </Button>
            </form>
          </Form>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground mb-4" data-testid="contact-alternative">
              Ou entre em contato diretamente:
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a 
                href="tel:+551199999999" 
                className="flex items-center text-primary hover:text-primary/80 transition-colors"
                data-testid="contact-phone"
              >
                <i className="fas fa-phone mr-2"></i>
                (11) 99999-9999
              </a>
              <a 
                href="mailto:contato@techsolutions.com.br" 
                className="flex items-center text-primary hover:text-primary/80 transition-colors"
                data-testid="contact-email"
              >
                <i className="fas fa-envelope mr-2"></i>
                contato@techsolutions.com.br
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
