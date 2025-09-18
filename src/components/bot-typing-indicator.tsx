import { Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function BotTypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <Avatar className="w-9 h-9 border">
        <AvatarFallback>
          <Bot className="w-5 h-5" />
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[75%] p-3 rounded-xl bg-secondary text-secondary-foreground rounded-bl-none shadow-sm">
        <div className="flex items-center justify-center gap-1.5 h-5">
          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
}
