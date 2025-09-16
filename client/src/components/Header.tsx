import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground raleway" data-testid="company-name">Catálogo de Soluções Digitais</h1>
              <p className="text-sm text-muted-foreground open-sans">Soluções empresariais modernas</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
