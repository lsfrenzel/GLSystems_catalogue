import nodemailer from 'nodemailer';
import * as he from 'he';
import type { ContactSubmission } from '@shared/schema';

interface EmailConfig {
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_pass: string;
  from_email: string;
  to_email: string;
}

// Default configuration - can be overridden with environment variables
const defaultConfig: EmailConfig = {
  smtp_host: process.env.SMTP_HOST || 'smtp.gmail.com',
  smtp_port: parseInt(process.env.SMTP_PORT || '587'),
  smtp_user: process.env.SMTP_USER || '',
  smtp_pass: process.env.SMTP_PASS || '',
  from_email: process.env.FROM_EMAIL || 'noreply@techsolutions.com.br',
  to_email: process.env.TO_EMAIL || 'contato@techsolutions.com.br'
};

class EmailService {
  private transporter: nodemailer.Transporter;
  private config: EmailConfig;

  constructor(config: EmailConfig = defaultConfig) {
    this.config = config;
    
    // Create transporter
    this.transporter = nodemailer.createTransport({
      host: this.config.smtp_host,
      port: this.config.smtp_port,
      secure: this.config.smtp_port === 465, // true for 465, false for other ports
      auth: {
        user: this.config.smtp_user,
        pass: this.config.smtp_pass,
      },
    });

    // Verify connection on startup if credentials are provided
    if (this.config.smtp_user && this.config.smtp_pass) {
      this.transporter.verify((error, success) => {
        if (error) {
          console.error('SMTP configuration error:', error);
        } else {
          console.log('SMTP server is ready to send emails');
        }
      });
    }
  }

  async sendContactNotification(contact: ContactSubmission): Promise<boolean> {
    try {
      // Skip email sending if SMTP credentials are not configured
      if (!this.config.smtp_user || !this.config.smtp_pass) {
        console.log('SMTP credentials not configured, skipping email send');
        return false;
      }

      // Validate email to prevent header injection
      if (!this.isValidEmail(contact.email)) {
        console.error('Invalid email format detected, rejecting request');
        return false;
      }

      const systemName = this.getSystemDisplayName(contact.systemOfInterest || '');
      
      const mailOptions = {
        from: this.config.from_email,
        to: this.config.to_email,
        replyTo: contact.email,
        subject: `Nova Solicitação de Demonstração - ${he.encode(contact.company)}`,
        html: this.generateContactEmailTemplate(contact, systemName),
        text: this.generateContactEmailText(contact, systemName),
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Contact notification email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending contact notification email:', error);
      return false;
    }
  }

  async sendContactConfirmation(contact: ContactSubmission): Promise<boolean> {
    try {
      // Skip email sending if SMTP credentials are not configured
      if (!this.config.smtp_user || !this.config.smtp_pass || !contact.email) {
        console.log('SMTP credentials not configured or no email provided, skipping confirmation email');
        return false;
      }

      // Validate email to prevent header injection
      if (!this.isValidEmail(contact.email)) {
        console.error('Invalid email format detected, rejecting confirmation email');
        return false;
      }

      const systemName = this.getSystemDisplayName(contact.systemOfInterest || '');
      
      const mailOptions = {
        from: this.config.from_email,
        to: contact.email,
        subject: 'Solicitação Recebida - Catálogo de Soluções Digitais',
        html: this.generateConfirmationEmailTemplate(contact, systemName),
        text: this.generateConfirmationEmailText(contact, systemName),
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Contact confirmation email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending contact confirmation email:', error);
      return false;
    }
  }

  private isValidEmail(email: string): boolean {
    // Basic email validation and header injection prevention
    if (!email || typeof email !== 'string') {
      return false;
    }
    
    // Check for newlines, carriage returns, and other header injection characters
    if (/[\r\n\0]/.test(email)) {
      return false;
    }
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  private getSystemDisplayName(systemId: string): string {
    const systemNames: Record<string, string> = {
      'erp': 'ERP - Gestão Empresarial',
      'crm': 'CRM - Relacionamento com Clientes',
      'restaurant': 'Sistema de Comandas',
      'financial': 'Sistema Financeiro',
      'inventory': 'Estoque e Logística',
      'education': 'Plataforma EAD',
      'all': 'Todos os Sistemas'
    };
    
    return systemNames[systemId] || 'Sistema não especificado';
  }

  private generateContactEmailText(contact: ContactSubmission, systemName: string): string {
    const lines = [
      'NOVA SOLICITAÇÃO DE DEMONSTRAÇÃO',
      '=====================================',
      '',
      `Nome: ${contact.name}`,
      `E-mail: ${contact.email}`,
      `Empresa: ${contact.company}`,
    ];

    if (contact.phone) {
      lines.push(`Telefone: ${contact.phone}`);
    }

    lines.push(`Sistema de Interesse: ${systemName}`);

    if (contact.message) {
      lines.push('', 'Mensagem:', contact.message);
    }

    lines.push(
      '',
      `Aceita Comunicações: ${contact.acceptsMarketing === 'true' ? 'Sim' : 'Não'}`,
      `Data/Hora: ${contact.createdAt ? new Date(contact.createdAt).toLocaleString('pt-BR') : 'N/A'}`,
      '',
      '-------------------------------------',
      'Catálogo de Soluções Digitais - Soluções digitais que transformam seu negócio',
      'Este e-mail foi gerado automaticamente pelo sistema de contato.'
    );

    return lines.join('\n');
  }

  private generateContactEmailTemplate(contact: ContactSubmission, systemName: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Lato', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #e53e3e; color: white; padding: 20px; text-align: center; }
            .content { background: #f8f9fa; padding: 30px; }
            .info-row { margin-bottom: 15px; }
            .label { font-weight: bold; color: #4a5568; }
            .value { margin-left: 10px; color: #2d3748; }
            .footer { background: #2d3748; color: white; padding: 20px; text-align: center; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Nova Solicitação de Demonstração</h2>
            </div>
            <div class="content">
                <h3>Detalhes do Contato</h3>
                
                <div class="info-row">
                    <span class="label">Nome:</span>
                    <span class="value">${he.encode(contact.name)}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">E-mail:</span>
                    <span class="value">${he.encode(contact.email)}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Empresa:</span>
                    <span class="value">${he.encode(contact.company)}</span>
                </div>
                
                ${contact.phone ? `
                <div class="info-row">
                    <span class="label">Telefone:</span>
                    <span class="value">${he.encode(contact.phone)}</span>
                </div>
                ` : ''}
                
                <div class="info-row">
                    <span class="label">Sistema de Interesse:</span>
                    <span class="value">${he.encode(systemName)}</span>
                </div>
                
                ${contact.message ? `
                <div class="info-row">
                    <span class="label">Mensagem:</span>
                    <div class="value" style="margin-top: 10px; padding: 15px; background: white; border-radius: 5px;">
                        ${he.encode(contact.message).replace(/\n/g, '<br>')}
                    </div>
                </div>
                ` : ''}
                
                <div class="info-row">
                    <span class="label">Aceita Comunicações:</span>
                    <span class="value">${contact.acceptsMarketing === 'true' ? 'Sim' : 'Não'}</span>
                </div>
                
                <div class="info-row">
                    <span class="label">Data/Hora:</span>
                    <span class="value">${contact.createdAt ? new Date(contact.createdAt).toLocaleString('pt-BR') : 'N/A'}</span>
                </div>
            </div>
            <div class="footer">
                <p><strong>Catálogo de Soluções Digitais</strong> - Soluções digitais que transformam seu negócio</p>
                <p>Este e-mail foi gerado automaticamente pelo sistema de contato.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  private generateConfirmationEmailText(contact: ContactSubmission, systemName: string): string {
    const lines = [
      'SOLICITAÇÃO RECEBIDA COM SUCESSO!',
      '=================================',
      '',
      `Olá ${contact.name},`,
      '',
      'Obrigado por entrar em contato com o Catálogo de Soluções Digitais!',
      '',
      `Recebemos sua solicitação de demonstração para ${systemName} e nossa equipe entrará em contato com você em breve.`,
      '',
      'PRÓXIMOS PASSOS:',
      '• Nossa equipe comercial analisará suas necessidades',
      '• Entraremos em contato em até 24 horas',
      '• Agendaremos uma demonstração personalizada',
      '• Apresentaremos uma proposta sob medida',
      '',
      'Enquanto isso, que tal conhecer mais sobre nossas soluções?',
      'Visite nosso site: https://techsolutions.com.br',
      '',
      'Se tiver alguma dúvida urgente, entre em contato conosco:',
      '📞 (11) 99999-9999',
      '📧 contato@techsolutions.com.br',
      '',
      '-------------------------------------',
      'Catálogo de Soluções Digitais - Soluções digitais que transformam seu negócio',
      'Rua da Tecnologia, 123 - São Paulo - SP'
    ];

    return lines.join('\n');
  }

  private generateConfirmationEmailTemplate(contact: ContactSubmission, systemName: string): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Lato', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #e53e3e; color: white; padding: 20px; text-align: center; }
            .content { background: #f8f9fa; padding: 30px; }
            .highlight { background: #e2e8f0; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { background: #2d3748; color: white; padding: 20px; text-align: center; font-size: 14px; }
            .btn { background: #e53e3e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Solicitação Recebida com Sucesso!</h2>
            </div>
            <div class="content">
                <p>Olá <strong>${he.encode(contact.name)}</strong>,</p>
                
                <p>Obrigado por entrar em contato com o <strong>Catálogo de Soluções Digitais</strong>!</p>
                
                <p>Recebemos sua solicitação de demonstração para <strong>${he.encode(systemName)}</strong> e nossa equipe entrará em contato com você em breve.</p>
                
                <div class="highlight">
                    <h4>Próximos Passos:</h4>
                    <ul>
                        <li>Nossa equipe comercial analisará suas necessidades</li>
                        <li>Entraremos em contato em até 24 horas</li>
                        <li>Agendaremos uma demonstração personalizada</li>
                        <li>Apresentaremos uma proposta sob medida</li>
                    </ul>
                </div>
                
                <p>Enquanto isso, que tal conhecer mais sobre nossas soluções?</p>
                
                <p style="text-align: center;">
                    <a href="https://techsolutions.com.br" class="btn">Visite nosso site</a>
                </p>
                
                <p>Se tiver alguma dúvida urgente, entre em contato conosco:</p>
                <ul>
                    <li>📞 (11) 99999-9999</li>
                    <li>📧 contato@techsolutions.com.br</li>
                </ul>
            </div>
            <div class="footer">
                <p><strong>Catálogo de Soluções Digitais</strong> - Soluções digitais que transformam seu negócio</p>
                <p>Rua da Tecnologia, 123 - São Paulo - SP</p>
            </div>
        </div>
    </body>
    </html>
    `;
  }
}

export const emailService = new EmailService();