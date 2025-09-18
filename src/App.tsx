import { Header } from "../src/components/Header";
import { ChatDemo } from "../src/components/ChatDemo";

export default function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Main Chat Interface */}
      <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
        <ChatDemo />
      </main>
    </div>
  );
}