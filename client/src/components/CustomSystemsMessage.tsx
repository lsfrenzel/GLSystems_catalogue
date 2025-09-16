import { Target } from "lucide-react";

interface CustomSystemsMessageProps {
  className?: string;
  variant?: 'default' | 'compact' | 'banner';
}

export default function CustomSystemsMessage({ className = "", variant = 'default' }: CustomSystemsMessageProps) {
  if (variant === 'compact') {
    return (
      <div className={`bg-primary/5 border border-primary/20 rounded-lg p-3 ${className}`} data-testid="custom-systems-message">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
          <p className="text-primary font-medium text-sm">
            Desenvolvemos sistemas personalizados de acordo com as necessidades específicas da sua empresa
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20 rounded-xl p-6 ${className}`} data-testid="custom-systems-message">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <Target className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-primary font-bold text-lg mb-1">
              Soluções Personalizadas
            </h3>
            <p className="text-primary/80 font-medium">
              Desenvolvemos sistemas personalizados de acordo com as necessidades específicas da sua empresa
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-primary/10 border border-primary/20 rounded-lg p-4 ${className}`} data-testid="custom-systems-message">
      <div className="flex items-center gap-3">
        <Target className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true" />
        <p className="text-primary font-semibold text-lg">
          🎯 Desenvolvemos sistemas personalizados de acordo com as necessidades específicas da sua empresa
        </p>
      </div>
    </div>
  );
}