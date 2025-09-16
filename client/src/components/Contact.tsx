import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();
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
        title: t('contact.successTitle'),
        description: t('contact.successMessage'),
      });
      form.reset();
      setIsSubmitted(true);
    },
    onError: (error: any) => {
      toast({
        title: t('contact.errorTitle'),
        description: error.message || t('contact.errorMessage'),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  const systemOptions = [
    { value: "erp", labelKey: "contact.systems.erp" },
    { value: "crm", labelKey: "contact.systems.crm" },
    { value: "restaurant", labelKey: "contact.systems.restaurant" },
    { value: "financial", labelKey: "contact.systems.financial" },
    { value: "inventory", labelKey: "contact.systems.inventory" },
    { value: "education", labelKey: "contact.systems.education" },
    { value: "all", labelKey: "contact.systems.all" },
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
                {t('contact.successPageTitle')}
              </h2>
              <p className="text-muted-foreground mb-6" data-testid="success-message">
                {t('contact.successPageMessage')}
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                data-testid="send-another-button"
              >
                {t('contact.sendAnother')}
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
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="contact-subtitle">
            {t('contact.subtitle')}
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
                      <FormLabel className="text-sm font-semibold text-foreground">{t('contact.nameLabel')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder={t('contact.namePlaceholder')}
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
                      <FormLabel className="text-sm font-semibold text-foreground">{t('contact.emailLabel')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          placeholder={t('contact.emailPlaceholder')}
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
                      <FormLabel className="text-sm font-semibold text-foreground">{t('contact.companyLabel')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder={t('contact.companyPlaceholder')}
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
                      <FormLabel className="text-sm font-semibold text-foreground">{t('contact.phoneLabel')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="tel"
                          placeholder={t('contact.phonePlaceholder')}
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
                    <FormLabel className="text-sm font-semibold text-foreground">{t('contact.systemLabel')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-input border-border" data-testid="select-system">
                          <SelectValue placeholder={t('contact.systemPlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {systemOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {t(option.labelKey)}
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
                    <FormLabel className="text-sm font-semibold text-foreground">{t('contact.messageLabel')}</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        rows={4}
                        placeholder={t('contact.messagePlaceholder')}
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
                        {t('contact.marketingAccept')}
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
                {contactMutation.isPending ? t('contact.sending') : t('contact.submitButton')}
              </Button>
            </form>
          </Form>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground mb-4" data-testid="contact-alternative">
              {t('contact.directContact')}
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
                href="mailto:contato@glsystems.com.br" 
                className="flex items-center text-primary hover:text-primary/80 transition-colors"
                data-testid="contact-email"
              >
                <i className="fas fa-envelope mr-2"></i>
                contato@glsystems.com.br
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
