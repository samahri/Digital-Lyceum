import { Button } from "./ui/button";
import { GraduationCap, Scroll } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Scroll className="h-8 w-8 text-primary" />
          <span className="font-semibold text-xl">Aristotle AI</span>
        </div>
        
        <div className="hidden md:flex items-center">
          <span className="text-muted-foreground">Your AI-powered Aristotelian tutor</span>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button variant="outline">
            New Chat
          </Button>
        </div>
      </div>
    </header>
  );
}