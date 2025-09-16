import { Link } from "wouter";
import glSystemsLogo from "@assets/Gemini_Generated_Image_h0faeuh0faeuh0fa-removebg-preview_1758033345801.png";

export default function Header() {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-4">
              <img 
                src={glSystemsLogo} 
                alt="G&L Systems Logo" 
                className="w-16 h-16 object-contain"
                data-testid="company-logo"
              />
              <div className="text-left">
                <h1 className="text-3xl font-bold text-foreground raleway" data-testid="company-name">G&L Systems</h1>
                <p className="text-sm text-muted-foreground open-sans">Líder em soluções tecnológicas empresariais</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
